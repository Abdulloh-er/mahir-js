console.log("==================================================")
console.log("\tMATERI 3 PT-1 - DATA MANIPULATION (string)")
console.log("==================================================")

// manipulasi string
const nama = "BEDUL AND THE ONLY ONE EL BEDUL"
console.log({ nama });

const namagede = nama.toLowerCase();
console.log({ namagede });

const namapanggilan = nama.slice(0, 4);
console.log({ namapanggilan });

const cekhaji = nama.includes("H.");
if (cekhaji) {
    console.log("siap 48 pak aji");
}  else {
    console.log("waduhh lain kali haji dlu haji");
}

const namabaru = nama.replaceAll("BEDUL", "AMEL");
console.log({ namabaru });

console.log("==================================================")
console.log("\tMATERI 3 PT-1 - DATA MANIPULATION (angka)")
console.log("==================================================")
// manipulasi angka
const gajiguru = "1000000";
const nominal = Number(gajiguru);
console.log( {gajiguru} );
console.log({ nominal });


console.log("==================================================")
console.log("\tMATERI 3 PT-1 - DATA MANIPULATION (tanggal)")
console.log("==================================================")
const tanggal = new Date();
console.log({ tanggal });
console.log("tanggal sekarang : " + tanggal.getDate() + "/" + (tanggal.getMonth() + 1) + "/" + tanggal.getFullYear());
console.log("jam sekarang : " + tanggal.getHours() + ":" + tanggal.getMinutes() + ":" + tanggal.getSeconds());
