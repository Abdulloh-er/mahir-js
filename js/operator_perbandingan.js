// Operator Perbandingan samdengan
console.log("Operator Perbandingan 3 samadengan");

const umurbudi = 22;
const umurandi = "20";

const check_umur = umurbudi === umurandi;
console.log({ umurbudi, umurandi, check_umur });

// kalo umurnya sama
if (umurbudi === umurandi) {
  console.log("Umur Budi sama dengan umur Andi");
} else {
  console.log("Umur Budi tidak sama dengan umur Andi");
}

if (umurbudi > umurandi) {
  console.log("budi lebih tua");
} else {
  console.log("andi lebih tua");
}

// console.log("---------------------------------------------------")

// console.log("Operator Perbandingan 2 samadengan");

// const umurBudi = 20;
// const umurAndi = "20";

// const cek_umur = umurBudi == umurAndi;
// console.log({ umurBudi, umurAndi, cek_umur });

// // kalo umurnya sama
// if (umurBudi == umurAndi) {
//     console.log("Umur Budi sama dengan umur Andi");
// }
// else {
//     console.log("Umur Budi tidak sama dengan umur Andi");
// }

// if (umurBudi > umurAndi) {
//     console.log("budi lebih tua");
// }
// else {
//     console.log("andi lebih tua");
// }

// Operator Perbandingan tidak samadengan
console.log("---------------------------------------------------");
console.log("Operator Perbandingan tidak samadengan");

const umureman = 22;
const umursupardik = 22;

const verif = umureman != umursupardik;
console.log({ umureman, umursupardik, verif });

// kalo umurnya sama
if (umureman == umursupardik) {
  console.log("Umur Eman sama dengan umur Supardik");
} else {
  console.log("Umur Eman tidak sama dengan umur Supardik");
}

if (umureman > umursupardik) {
  console.log("eman & supardi bedaa💩💩");
} else {
  console.log("eman & supardi samaan💀💀");
}

console.log("-----------------------------------------");
// looping
for (let k = 1; k <= 7; k++) {
  console.log(`halooo ke-${k}`);
  if (k === 5) {
    console.log("ini udah yg ke-5");
  }
}

console.log("-----------------------------------------");
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


console.log("-----------------------------------------");
// date => manipulasi data
const sekarang = new Date();
console.log(sekarang.toString());