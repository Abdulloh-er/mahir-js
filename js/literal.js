// Objek yang merepresentasikan data seorang siswa
let siswa = {
    namaLengkap: "amelia putri", 
    umur: 17,           
    kelas: "11",
    sudahLulus: false,      
    alamat: {              
        jalan: "Jalan Melati No. 5",
        kota: "Jakarta Selatan",
        kodePos: "12345"
    },
    hobi: ["Membaca", "Bermain Game", "Ngoding"],
    "nama panggilan": "BudBud" 
};
 
console.log(siswa); 

console.log("---------------------------------------------------")

console.log(siswa.namaLengkap);
console.log(siswa.umur);       
console.log(siswa.alamat.kota); 
console.log(siswa.hobi[0]);    

console.log("---------------------------------------------------")
// nambahin data baru ke object
siswa.jurusan = "IPA"; // Menambahkan properti baru 'jurusan' ke objek siswa
console.log("Jurusan: " + siswa.jurusan); // Output: IPA