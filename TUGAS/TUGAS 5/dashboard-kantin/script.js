(function () {
  "use strict";

  const products = [
    { id: 1, name: "Nasi ayam", category: "Makanan", price: 18000, stock: 24 },
    { id: 2, name: "Mie goreng", category: "Makanan", price: 15000, stock: 18 },
    { id: 3, name: "Roti cokelat", category: "Snack", price: 8000, stock: 35 },
    { id: 4, name: "Pisang goreng", category: "Snack", price: 7000, stock: 28 },
    { id: 5, name: "Es teh", category: "Minuman", price: 5000, stock: 42 },
    { id: 6, name: "Jus jeruk", category: "Minuman", price: 10000, stock: 20 },
    { id: 7, name: "Air mineral", category: "Minuman", price: 4000, stock: 60 },
    { id: 8, name: "Kentang goreng", category: "Snack", price: 12000, stock: 16 },
  ];
  const promos = [
    { name: "Paket makan siang", detail: "Nasi ayam + es teh", badge: "Hemat 15%", color: "green", emoji: "🍱" },
    { name: "Jumat berkah", detail: "Diskon untuk semua minuman", badge: "Jumat", color: "blue", emoji: "🥤" },
    { name: "Teman belajar", detail: "Roti cokelat + jus jeruk", badge: "Paket", color: "purple", emoji: "🍞" },
  ];
  const storageKey = "kantin-deleted-products";
  const money = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
  const number = new Intl.NumberFormat("id-ID");
  const dateFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function $(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Elemen dashboard tidak ditemukan: ${selector}`);
    return element;
  }

  function toISODate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function dateAtOffset(offset) {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return date;
  }

  function readDeletedProducts() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(saved) || saved.some((id) => !Number.isInteger(id))) {
        console.error("Data produk tersimpan memiliki format yang tidak valid.");
        return new Set();
      }
      return new Set(saved);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error("Data produk tersimpan tidak dapat dibaca.", error);
        return new Set();
      }
      if (error instanceof DOMException && error.name === "SecurityError") {
        console.warn("Penyimpanan lokal tidak tersedia; perubahan hanya berlaku selama halaman dibuka.");
        return new Set();
      }
      throw error;
    }
  }

  const deletedProducts = readDeletedProducts();
  const productById = new Map(products.filter((product) => !deletedProducts.has(product.id)).map((product) => [product.id, product]));
  const transactions = [];

  for (let dayOffset = -6; dayOffset <= 0; dayOffset += 1) {
    const date = toISODate(dateAtOffset(dayOffset));
    const dailyItems = [[1, 2 + ((dayOffset + 7) % 4)], [2, 1 + ((dayOffset + 6) % 3)], [3, 2 + ((dayOffset + 5) % 5)], [5, 2 + ((dayOffset + 4) % 6)], [6, 1 + ((dayOffset + 3) % 3)], [8, 1 + ((dayOffset + 2) % 4)]];
    dailyItems.forEach(([productId, quantity], index) => {
      if ((dayOffset + index) % 5 !== 0) transactions.push({ id: `${date}-${Math.floor(index / 2) + 1}`, date, productId, quantity });
    });
  }

  const state = {
    dateRange: [dateAtOffset(-6), new Date(today)],
    categories: [],
    charts: [],
    table: null,
  };

  function selectedTransactions() {
    const [start, end] = state.dateRange;
    const first = start ? toISODate(start) : "";
    const last = end ? toISODate(end) : first;
    return transactions.filter((entry) => {
      const product = productById.get(entry.productId);
      return product && (!first || entry.date >= first) && (!last || entry.date <= last) &&
        (!state.categories.length || state.categories.includes(product.category));
    });
  }

  function summarize(entries) {
    const productTotals = new Map();
    const dailyTotals = new Map();
    const categoryTotals = new Map();
    const transactionIds = new Set();
    let revenue = 0;
    let items = 0;
    entries.forEach((entry) => {
      const product = productById.get(entry.productId);
      const amount = product.price * entry.quantity;
      revenue += amount;
      items += entry.quantity;
      transactionIds.add(entry.id);
      productTotals.set(product.id, (productTotals.get(product.id) || 0) + entry.quantity);
      dailyTotals.set(entry.date, (dailyTotals.get(entry.date) || 0) + amount);
      categoryTotals.set(product.category, (categoryTotals.get(product.category) || 0) + entry.quantity);
    });
    return { revenue, items, transactionCount: transactionIds.size, productTotals, dailyTotals, categoryTotals };
  }

  function renderPromos() {
    const list = $("#promo");
    list.replaceChildren();
    promos.forEach((promo) => {
      const item = document.createElement("li");
      const emoji = document.createElement("span");
      emoji.className = "p-emoji";
      emoji.setAttribute("aria-hidden", "true");
      emoji.textContent = promo.emoji;
      const body = document.createElement("div");
      body.className = "p-body";
      const title = document.createElement("b");
      title.textContent = promo.name;
      const detail = document.createElement("small");
      detail.textContent = promo.detail;
      body.append(title, detail);
      const badge = document.createElement("span");
      badge.className = `lozenge ${promo.color}`;
      badge.textContent = promo.badge;
      item.append(emoji, body, badge);
      list.append(item);
    });
    $("#pCount").textContent = `${promos.length} promo`;
  }

  function chartColors() {
    return ["#357de8", "#82b536", "#bf63f3", "#f2a900", "#e5484d"];
  }

  function renderChartFallback(canvas, type, labels, values, colors) {
    const context = canvas.getContext("2d");
    const width = canvas.clientWidth || 500;
    const height = canvas.clientHeight || 260;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    context.clearRect(0, 0, width, height);
    context.font = "12px sans-serif";
    const style = getComputedStyle(document.documentElement);
    context.fillStyle = style.getPropertyValue("--ds-text-subtle");
    if (!values.length) {
      context.textAlign = "center";
      context.fillText("Tidak ada data pada filter ini", width / 2, height / 2);
      return;
    }
    const max = Math.max(...values, 1);
    if (type === "bar") {
      const gap = 8;
      const plotHeight = height - 42;
      const barWidth = Math.max(4, (width - gap * (values.length + 1)) / values.length);
      values.forEach((value, index) => {
        const x = gap + index * (barWidth + gap);
        context.fillStyle = colors[index % colors.length];
        context.fillRect(x, plotHeight - (value / max) * (plotHeight - 10), barWidth, (value / max) * (plotHeight - 10));
        if (values.length < 9) {
          context.fillStyle = style.getPropertyValue("--ds-text-subtle");
          context.textAlign = "center";
          context.fillText(labels[index], x + barWidth / 2, height - 12);
        }
      });
      return;
    }
    const total = values.reduce((sum, value) => sum + value, 0);
    const centerX = width / 2;
    const centerY = height / 2 - 8;
    const radius = Math.max(24, Math.min(width, height) * 0.3);
    let angle = -Math.PI / 2;
    values.forEach((value, index) => {
      const nextAngle = angle + (value / total) * Math.PI * 2;
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, angle, nextAngle);
      context.closePath();
      context.fillStyle = colors[index % colors.length];
      context.fill();
      angle = nextAngle;
    });
    context.fillStyle = style.getPropertyValue("--ds-surface-raised");
    context.beginPath();
    context.arc(centerX, centerY, radius * 0.58, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = style.getPropertyValue("--ds-text");
    context.textAlign = "center";
    context.fillText(`${number.format(total)} item`, centerX, centerY + 4);
  }

  function renderCharts(summary) {
    const colors = chartColors();
    const days = [...summary.dailyTotals.entries()].sort(([a], [b]) => a.localeCompare(b));
    const categories = [...summary.categoryTotals.entries()];
    const barCanvas = $("#cBar");
    const donutCanvas = $("#cDn");
    if (!window.Chart) {
      renderChartFallback(barCanvas, "bar", days.map(([date]) => date.slice(5)), days.map(([, value]) => value), colors);
      renderChartFallback(donutCanvas, "doughnut", categories.map(([category]) => category), categories.map(([, value]) => value), colors);
      return;
    }

    const dark = document.documentElement.getAttribute("data-color-mode") === "dark";
    const textColor = dark ? "#cecfd2" : "#505258";
    const gridColor = dark ? "#e3e4f21f" : "#0b120e24";
    const barData = {
      labels: days.map(([date]) => dateFormatter.format(new Date(`${date}T00:00:00`))),
      datasets: [{ label: "Omzet", data: days.map(([, amount]) => amount), backgroundColor: "#357de8", borderRadius: 4, maxBarThickness: 36 }],
    };
    const barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (context) => ` ${money.format(context.parsed.y)}` } },
      },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: { beginAtZero: true, ticks: { color: textColor, callback: (value) => money.format(value) }, grid: { color: gridColor } },
      },
    };
    const donutData = {
      labels: categories.map(([category]) => category),
      datasets: [{ data: categories.map(([, count]) => count), backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }],
    };
    const donutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: { position: "bottom", labels: { color: textColor, usePointStyle: true, padding: 16 } },
        tooltip: { callbacks: { label: (context) => ` ${context.label}: ${number.format(context.parsed)} item` } },
      },
    };
    if (state.charts.length) {
      state.charts[0].data = barData;
      state.charts[0].options = barOptions;
      state.charts[0].update();
      state.charts[1].data = donutData;
      state.charts[1].options = donutOptions;
      state.charts[1].update();
    } else {
      state.charts = [
        new Chart(barCanvas, { type: "bar", data: barData, options: barOptions }),
        new Chart(donutCanvas, { type: "doughnut", data: donutData, options: donutOptions }),
      ];
    }
  }

  function createDeleteButton(product) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn danger";
    button.dataset.deleteProduct = String(product.id);
    button.setAttribute("aria-label", `Hapus ${product.name}`);
    button.textContent = "Hapus";
    return button;
  }

  function renderNativeTable(rows) {
    const container = $("#tProd");
    container.replaceChildren();
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    const headers = ["Produk", "Kategori", "Harga", "Terjual", "Omzet", "Stok", "Aksi"];
    const head = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headers.forEach((label) => {
      const cell = document.createElement("th");
      cell.textContent = label;
      cell.style.textAlign = "left";
      cell.style.padding = "8px";
      headerRow.append(cell);
    });
    head.append(headerRow);
    const body = document.createElement("tbody");
    rows.forEach((product) => {
      const row = document.createElement("tr");
      [product.name, product.category, money.format(product.price), number.format(product.sold), money.format(product.revenue), number.format(product.stock)]
        .forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          cell.style.padding = "8px";
          cell.style.borderTop = "1px solid var(--ds-border)";
          row.append(cell);
        });
      const action = document.createElement("td");
      action.style.padding = "8px";
      action.style.borderTop = "1px solid var(--ds-border)";
      action.append(createDeleteButton(product));
      row.append(action);
      body.append(row);
    });
    table.append(head, body);
    container.append(table);
  }

  function renderTable(summary) {
    const rows = [...productById.values()].map((product) => {
      const sold = summary.productTotals.get(product.id) || 0;
      return { ...product, sold, revenue: sold * product.price };
    });
    $("#tCount").textContent = `${number.format(rows.length)} produk`;
    if (state.table) {
      state.table.replaceData(rows);
    } else if (window.Tabulator) {
      state.table = new Tabulator("#tProd", {
        data: rows,
        index: "id",
        layout: "fitColumns",
        responsiveLayout: "hide",
        pagination: true,
        paginationSize: 6,
        paginationSizeSelector: [6, 10, true],
        placeholder: "Tidak ada produk yang cocok dengan filter.",
        columns: [
          { title: "Produk", field: "name", minWidth: 120 },
          { title: "Kategori", field: "category", minWidth: 90 },
          { title: "Harga", field: "price", hozAlign: "right", formatter: (cell) => money.format(cell.getValue()) },
          { title: "Terjual", field: "sold", hozAlign: "right", formatter: (cell) => number.format(cell.getValue()) },
          { title: "Omzet", field: "revenue", hozAlign: "right", formatter: (cell) => money.format(cell.getValue()) },
          { title: "Stok", field: "stock", width: 70, hozAlign: "right" },
          { title: "Aksi", field: "id", width: 90, headerSort: false, hozAlign: "center", formatter: (cell) => createDeleteButton(cell.getData()) },
        ],
      });
    } else {
      renderNativeTable(rows);
    }
  }

  function renderDashboard() {
    const entries = selectedTransactions();
    const summary = summarize(entries);
    const [start, end] = state.dateRange;
    $("#dRange").textContent = start
      ? `Penjualan ${dateFormatter.format(start)}${end && toISODate(start) !== toISODate(end) ? ` – ${dateFormatter.format(end)}` : ""}`
      : "Pilih tanggal untuk melihat ringkasan penjualan.";
    $("#kOmzet").textContent = money.format(summary.revenue);
    $("#cOmzet").textContent = `${number.format(entries.length)} catatan penjualan`;
    $("#kItem").textContent = number.format(summary.items);
    $("#cItem").textContent = state.categories.length ? state.categories.join(", ") : "Semua kategori";
    $("#kTrx").textContent = number.format(summary.transactionCount);
    $("#cTrx").textContent = "transaksi pada filter ini";
    renderCharts(summary);
    renderTable(summary);
  }

  function initDatePicker() {
    const input = $("#fDate");
    if (window.flatpickr) {
      window.flatpickr(input, {
        mode: "range",
        dateFormat: "d M Y",
        defaultDate: state.dateRange,
        locale: window.flatpickr.l10ns.id,
        disableMobile: true,
        onChange: (dates) => {
          state.dateRange = dates.length === 2 ? dates : dates.length === 1 ? [dates[0], dates[0]] : [null, null];
          renderDashboard();
        },
      });
      input.setAttribute("aria-label", "Pilih rentang tanggal penjualan");
      return;
    }
    input.hidden = true;
    const wrapper = input.parentElement;
    const [start, end] = ["Tanggal mulai", "Tanggal akhir"].map((label) => {
      const field = document.createElement("input");
      field.type = "date";
      field.setAttribute("aria-label", label);
      field.style.cssText = "min-width:0;width:50%;padding:7px 8px;border:0;background:transparent;color:inherit";
      wrapper.append(field);
      return field;
    });
    start.value = toISODate(state.dateRange[0]);
    end.value = toISODate(state.dateRange[1]);
    const update = () => {
      const first = start.value ? new Date(`${start.value}T00:00:00`) : null;
      const last = end.value ? new Date(`${end.value}T00:00:00`) : first;
      if (first && last && first > last) {
        end.setCustomValidity("Tanggal akhir harus sama dengan atau setelah tanggal mulai.");
        end.reportValidity();
        return;
      }
      end.setCustomValidity("");
      state.dateRange = first ? [first, last || first] : [null, null];
      renderDashboard();
    };
    start.addEventListener("change", update);
    end.addEventListener("change", update);
  }

  function initCategories() {
    const select = $("#fKat");
    [...new Set([...productById.values()].map((product) => product.category))].forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      select.append(option);
    });
    const update = (values) => {
      state.categories = Array.isArray(values) ? values : values ? [values] : [];
      renderDashboard();
    };
    if (window.TomSelect) {
      new TomSelect(select, {
        plugins: ["remove_button"],
        closeAfterSelect: false,
        placeholder: "Semua kategori",
        onChange: update,
      });
    } else {
      select.setAttribute("aria-label", "Pilih satu atau beberapa kategori");
      select.addEventListener("change", () => update(Array.from(select.selectedOptions, (option) => option.value)));
    }
  }

  function initTooltips() {
    const tooltip = $("#tooltip");
    document.querySelectorAll("[data-tip]").forEach((button) => {
      button.setAttribute("aria-describedby", "tooltip");
      button.setAttribute("aria-expanded", "false");
      const show = () => {
        tooltip.textContent = button.dataset.tip;
        tooltip.style.opacity = "1";
        button.setAttribute("aria-expanded", "true");
        if (window.FloatingUIDOM) {
          const floating = window.FloatingUIDOM;
          if (!button.stopTooltipUpdate && floating.autoUpdate && floating.computePosition) {
            button.stopTooltipUpdate = floating.autoUpdate(button, tooltip, () => {
              floating.computePosition(button, tooltip, {
                placement: "top",
                middleware: [floating.offset(8), floating.flip(), floating.shift({ padding: 8 })],
              }).then(({ x, y }) => Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` }));
            });
          }
        } else {
          const rect = button.getBoundingClientRect();
          tooltip.style.left = `${Math.max(8, rect.left + rect.width / 2 - 120)}px`;
          tooltip.style.top = `${Math.max(8, rect.top - 32)}px`;
        }
      };
      const hide = () => {
        tooltip.style.opacity = "0";
        button.setAttribute("aria-expanded", "false");
        if (button.stopTooltipUpdate) {
          button.stopTooltipUpdate();
          button.stopTooltipUpdate = null;
        }
      };
      button.addEventListener("mouseenter", show);
      button.addEventListener("mouseleave", hide);
      button.addEventListener("focus", show);
      button.addEventListener("blur", hide);
      button.addEventListener("click", () => button.getAttribute("aria-expanded") === "true" ? hide() : show());
      button.addEventListener("keydown", (event) => {
        if (event.key === "Escape") hide();
      });
    });
  }

  function initDeleteActions() {
    $("#tProd").addEventListener("click", async (event) => {
      const button = event.target.closest("[data-delete-product]");
      if (!button) return;
      const product = productById.get(Number(button.dataset.deleteProduct));
      if (!product) return;
      const confirmed = window.Swal
        ? (await window.Swal.fire({
            title: "Hapus produk?",
            text: `${product.name} akan dihapus dari daftar dan ringkasan penjualan.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: { popup: "ads-modal", confirmButton: "btn danger", cancelButton: "btn" },
            buttonsStyling: false,
          })).isConfirmed
        : window.confirm(`Hapus ${product.name} dari daftar dan ringkasan penjualan?`);
      if (!confirmed) return;
      deletedProducts.add(product.id);
      productById.delete(product.id);
      try {
        localStorage.setItem(storageKey, JSON.stringify([...deletedProducts]));
      } catch (error) {
        console.error("Perubahan produk tidak dapat disimpan ke penyimpanan lokal.", error);
        window.alert("Produk dihapus untuk sesi ini, tetapi perubahan tidak dapat disimpan di browser.");
      }
      if (state.table) {
        state.table.destroy();
        state.table = null;
      }
      renderDashboard();
      if (window.Swal) {
        window.Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Produk berhasil dihapus", showConfirmButton: false, timer: 2200 });
      }
    });
  }

  function initTheme() {
    const button = $("#btnTheme");
    function updateLabel() {
      const dark = document.documentElement.getAttribute("data-color-mode") === "dark";
      button.querySelector("span").textContent = dark ? "Mode terang" : "Mode gelap";
      button.setAttribute("aria-label", dark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
    }
    updateLabel();
    button.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-color-mode") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-color-mode", next);
      try {
        localStorage.setItem("kantin-color-mode", next);
      } catch (error) {
        console.warn("Preferensi tema tidak dapat disimpan.", error);
      }
      updateLabel();
      renderDashboard();
    });
  }

  function initNavigation() {
    const destinations = ["#dashboard", "#products", "#reports", "#btnTheme"];
    const allLinks = document.querySelectorAll(".nav a");
    const main = document.querySelector(".main");
    const sections = document.querySelectorAll(".main .row-2");
    if (main) main.id = "dashboard";
    if (sections[0]) sections[0].id = "reports";
    if (sections[1]) sections[1].id = "products";
    allLinks.forEach((link, index) => link.setAttribute("href", destinations[index]));
    const breadcrumb = document.querySelector(".crumbs a");
    if (breadcrumb) breadcrumb.setAttribute("href", "#dashboard");
    document.querySelectorAll(".task-caption").forEach((caption) => caption.remove());
    const navigableLinks = document.querySelectorAll(".nav a[href^='#']");
    const update = () => {
      const hash = window.location.hash || "#dashboard";
      navigableLinks.forEach((link) => {
        if (link.getAttribute("href") === hash) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    };
    window.addEventListener("hashchange", update);
    navigableLinks.forEach((link) => link.addEventListener("click", () => window.setTimeout(update, 0)));
    update();
  }

  function init() {
    initTheme();
    initNavigation();
    initCategories();
    initDatePicker();
    initTooltips();
    renderPromos();
    initDeleteActions();
    renderDashboard();
  }

  try {
    init();
  } catch (error) {
    console.error("Dashboard Kantin gagal dimuat.", error);
    const message = document.createElement("p");
    message.setAttribute("role", "alert");
    message.textContent = "Dashboard gagal dimuat. Muat ulang halaman atau periksa konsol untuk detail.";
    document.querySelector(".main")?.prepend(message);
  }
})();
