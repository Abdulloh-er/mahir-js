// array data berurutan yg berindex
const data = [
    "budi", 
    "andi", 
    "caca", 
    "didi", 
    "eman", 
    "supardi"
];
console.log(data);
console.log(data[3]);



console.log("-----------------------------------------");
// ngubah nilai array
let warnaFavorit = ["merah", "biru", "hijau"];
console.log("Warna awal:", warnaFavorit); // Output: Warna awal: ["merah", "biru", "hijau"]
 
warnaFavorit[1] = "kuning"; // Ubah elemen di indeks 1 (yang tadinya "biru") jadi "kuning"
console.log("Warna setelah diubah:", warnaFavorit); // Output: Warna setelah diubah: ["merah", "kuning", "hijau"]



console.log("-----------------------------------------");
// length => panjang array
let playlistLagu = ["Lagu A", "Lagu B", "Lagu C", "Lagu D"];
console.log(playlistLagu.length); // Output: 4
 
let dataKosong = [];
console.log(dataKosong.length); // Output: 0



console.log("-----------------------------------------");
// push => men / menambahkan data ke array
let angka = [1, 2, 3];
angka.push(4, 5, 6, 7);
console.log(angka); // Output: [1, 2, 3, 4, 5, 6, 7]

console.log("-----------------------------------------");
// obeject pake { } dan punya key

const profilsaya = {
    nama: "abdulloh",
    umur: 17,
    sekolah: "SMAIT HSI BOARDING SCHOOL",
    angkatan: 4,
    hobi: ["nge-game", "ngedit(foto/video)", "ngoding"]
};
console.log(profilsaya);
console.log(profilsaya.nama);
console.log(profilsaya.umur);