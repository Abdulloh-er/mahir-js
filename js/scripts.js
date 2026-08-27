console.log("Hello, World!");

let namasantri = "abdulloh";
let umur = 17;

console.log("Nama saya adalah " + namasantri + " dan umur saya adalah " + umur + " tahun.");

umur = 18;
console.log("tapi tahun depan umur saya " + umur + " tahun.");

const angkatan = 4;
console.log("saya dari angkatan ke " + angkatan);

// angkatan = 5; // This will cause an error because 'angkatan' is a constant
// console.log("saya kakel dari angkatan ke " + angkatan);


// typeof operator
console.log("Tipe data dari namasantri (" + namasantri + ") adalah " + typeof namasantri);
console.log("Tipe data dari umur (" + umur + ") adalah " + typeof umur);
console.log("Tipe data dari angkatan (" + angkatan + ") adalah " + typeof angkatan);

console.log("---------------------------------------------------")

const stasiun = "bengawan";
const gerbong = 10;
const kota = "jakarta";
const infokereta = `
      info kereta api
      stasiun : ${stasiun}
      gerbong : ${gerbong}
      kota : ${kota}
`;

console.log(infokereta);

console.log("---------------------------------------------------")
// NaN (Not a Number) - bukan angka
console.log(0 / 0);              // Output: NaN
console.log("Halo" * 5);         // Output: NaN (string dikali angka)
console.log(Math.sqrt(-1));      // Output: NaN (akar dari angka negatif)
console.log(parseInt("bukan angka")); // Output: NaN



console.log("---------------------------------------------------")
// looping
console.log("looping"); 
for (let i = 1; i <= 10; i++) {
    console.log(`halo ke-${i}`);
      if (i === 5) {
        console.log("ini udah yg ke-5");
    }
    }