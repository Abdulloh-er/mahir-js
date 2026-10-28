function showDemoError(cardSelector, message) {
    const card = document.querySelector(cardSelector);
    const error = document.createElement("p");
    error.className = "demo-error";
    error.setAttribute("role", "alert");
    error.textContent = message;
    card.querySelector(".recipe-body").append(error);
}

// SweetAlert2
const $deleteButton = document.querySelector("#btn-swal");
$deleteButton.addEventListener("click", async () => {
    if (!window.Swal) {
        showDemoError(".recipe-card:nth-child(1)", "SweetAlert2 belum berhasil dimuat. Periksa koneksi internet lalu muat ulang halaman.");
        return;
    }

    const result = await Swal.fire({
        title: "Hapus demo ini?",
        text: "Ini hanya simulasi; tidak ada data yang benar-benar dihapus.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan",
        cancelButtonText: "Batal",
        confirmButtonColor: "#e21b3c",
        reverseButtons: true
    });

    if (result.isConfirmed) {
        await Swal.fire({
            title: "Berhasil!",
            text: "Simulasi penghapusan selesai.",
            icon: "success",
            confirmButtonText: "Tutup"
        });
    }
});

// Floating UI
const $infoButton = document.querySelector("#info-btn");
const $tooltip = document.querySelector("#tip");
let stopTooltipUpdate = null;

if (window.FloatingUIDOM) {
    const { computePosition, autoUpdate, offset, flip, shift } = window.FloatingUIDOM;

    function updateTooltip() {
        computePosition($infoButton, $tooltip, {
            placement: "top",
            middleware: [offset(8), flip(), shift({ padding: 8 })]
        }).then(({ x, y }) => {
            Object.assign($tooltip.style, { left: `${x}px`, top: `${y}px` });
        });
    }

    function showTooltip() {
        $tooltip.classList.add("show");
        $infoButton.setAttribute("aria-expanded", "true");
        if (!stopTooltipUpdate) {
            stopTooltipUpdate = autoUpdate($infoButton, $tooltip, updateTooltip);
        }
    }

    function hideTooltip() {
        $tooltip.classList.remove("show");
        $infoButton.setAttribute("aria-expanded", "false");
        if (stopTooltipUpdate) {
            stopTooltipUpdate();
            stopTooltipUpdate = null;
        }
    }

    $infoButton.addEventListener("mouseenter", showTooltip);
    $infoButton.addEventListener("mouseleave", hideTooltip);
    $infoButton.addEventListener("focus", showTooltip);
    $infoButton.addEventListener("blur", hideTooltip);
    $infoButton.addEventListener("click", showTooltip);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") hideTooltip();
    });
} else {
    showDemoError(".recipe-card:nth-child(2)", "Floating UI belum berhasil dimuat. Periksa koneksi internet lalu muat ulang halaman.");
}

// Tom Select
const $clubResult = document.querySelector("#klub-result");
if (window.TomSelect) {
    new TomSelect("#klub", {
        persist: false,
        createOnBlur: true,
        create: true,
        plugins: ["remove_button"],
        placeholder: "Cari atau pilih klub...",
        onChange(values) {
            const selected = Array.isArray(values) ? values : values ? [values] : [];
            $clubResult.textContent = selected.length
                ? `Klub dipilih: ${selected.join(", ")}`
                : "Belum ada klub dipilih";
        }
    });
} else {
    showDemoError(".recipe-card:nth-child(3)", "Tom Select belum berhasil dimuat. Periksa koneksi internet lalu muat ulang halaman.");
}

// Flatpickr
const $dateResult = document.querySelector("#tanggal-result");
if (window.flatpickr) {
    const datePicker = flatpickr("#tanggal", {
        mode: "range",
        dateFormat: "d/m/Y",
        disableMobile: true,
        onChange(selectedDates) {
            if (selectedDates.length === 2) {
                const startDate = datePicker.formatDate(selectedDates[0], "d/m/Y");
                const endDate = datePicker.formatDate(selectedDates[1], "d/m/Y");
                $dateResult.textContent = `Rentang: ${startDate} – ${endDate}`;
            } else if (selectedDates.length === 1) {
                $dateResult.textContent = `Tanggal mulai: ${datePicker.formatDate(selectedDates[0], "d/m/Y")}. Pilih tanggal akhir.`;
            } else {
                $dateResult.textContent = "Belum ada tanggal";
            }
        }
    });

    document.querySelector("#btn-reset-tanggal").addEventListener("click", () => datePicker.clear());
} else {
    showDemoError(".recipe-card:nth-child(4)", "Flatpickr belum berhasil dimuat. Periksa koneksi internet lalu muat ulang halaman.");
}

// Chart.js
const $chartCanvas = document.querySelector("#chart");
let salesChart = null;
if (window.Chart) {
    salesChart = new Chart($chartCanvas, {
        type: "doughnut",
        data: {
            labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
            datasets: [{
                label: "Penjualan (ribu rupiah)",
                data: [24, 35, 29, 48, 41, 63, 52],
                backgroundColor: ["#46178f", "#673ab7", "#8e5bd1", "#1368ce", "#f2a900", "#26890c", "#e21b3c"],
                borderColor: "#fff",
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            cutout: "55%",
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: { boxWidth: 12, padding: 8 }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `Rp${(context.parsed * 1000).toLocaleString("id-ID")}`
                    }
                }
            }
        }
    });

    document.querySelector("#btn-chart").addEventListener("click", () => {
        salesChart.data.datasets[0].data = salesChart.data.labels.map(() => Math.floor(Math.random() * 91) + 10);
        salesChart.update();
    });
} else {
    showDemoError(".recipe-card:nth-child(5)", "Chart.js belum berhasil dimuat. Periksa koneksi internet lalu muat ulang halaman.");
}

// Tabulator
if (window.Tabulator) {
    const products = [
        { id: 1, produk: "Kopi Susu", kategori: "Minuman", harga: 18000, stok: 24 },
        { id: 2, produk: "Roti Cokelat", kategori: "Makanan", harga: 12000, stok: 15 },
        { id: 3, produk: "Teh Lemon", kategori: "Minuman", harga: 14000, stok: 32 },
        { id: 4, produk: "Keripik Pisang", kategori: "Snack", harga: 10000, stok: 18 },
        { id: 5, produk: "Nasi Ayam", kategori: "Makanan", harga: 25000, stok: 12 },
        { id: 6, produk: "Jus Alpukat", kategori: "Minuman", harga: 20000, stok: 9 }
    ];

    const productTable = new Tabulator("#tabel", {
        data: products,
        index: "id",
        layout: "fitColumns",
        responsiveLayout: "hide",
        initialSort: [{ column: "produk", dir: "asc" }],
        pagination: true,
        paginationSize: 4,
        paginationSizeSelector: [4, 6],
        columns: [
            { title: "Produk", field: "produk", minWidth: 110, headerSort: true },
            { title: "Kategori", field: "kategori", minWidth: 90, headerSort: true },
            {
                title: "Harga",
                field: "harga",
                minWidth: 95,
                hozAlign: "right",
                formatter: (cell) => `Rp${cell.getValue().toLocaleString("id-ID")}`
            },
            { title: "Stok", field: "stok", width: 70, hozAlign: "right" }
        ],
        placeholder: "Produk tidak ditemukan"
    });

    document.querySelector("#cari-produk").addEventListener("input", (event) => {
        const query = event.target.value.trim().toLocaleLowerCase("id-ID");
        if (!query) {
            productTable.clearFilter();
            return;
        }

        productTable.setFilter((data) =>
            data.produk.toLocaleLowerCase("id-ID").includes(query)
            || data.kategori.toLocaleLowerCase("id-ID").includes(query)
        );
    });
} else {
    showDemoError(".recipe-card:nth-child(6)", "Tabulator belum berhasil dimuat. Periksa koneksi internet lalu muat ulang halaman.");
}
