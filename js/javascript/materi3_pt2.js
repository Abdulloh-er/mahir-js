console.log("=========================================");
console.log("MATERI 3 PT-2 - DATA MANIPULATION (array)");
console.log("=========================================");

const skill = ["HTML", "CSS", "JAVASCRIPT", "PHP", "LARAVEL"];
console.log({ skill });
// akses berdasarkan index
console.log("skill index ke-0 : " + skill[0]);
console.log("skill index ke-1 : " + skill[1]);
console.log("skill index ke-2 : " + skill[2]);
console.log("skill index ke-3 : " + skill[3]);
console.log("skill index ke-4 : " + skill[4]);

// nambahin belakangnya
skill.push("REACT");
console.log({ skill });

// nambahin depan
skill.unshift("VUE");
console.log({ skill });

// hapus belakang
skill.pop();
console.log({ skill });

// hapus depan
skill.shift();
console.log({ skill });

// cek apakah ada skill tertentu
const cekskill = skill.includes("JAVASCRIPT");
console.log({ cekskill })
if (cekskill)
    console.log("ADA");
else
    console.log("TIDAK ADA");


// cariindex berdasarkan value
const indexskill = skill.indexOf("PHP");
console.log({ indexskill });


// join data
const joinskill = skill.join(" | ");
console.log({ joinskill });



// ------------------------------
// DATA PROCESSING
// ------------------------------

const dompet = [100000, 20000, 50000];
const kursUSD = 18000;

const dompetUSD = dompet.map((uang) => uang / kursUSD).map((value) => value.toFixed(2)).map((value) => `$ ${value}`);
console.log({ dompetUSD });

// filter data
const dompetFilter = dompet.filter((uang) => uang > 20000);
console.log({ dompetFilter });

// reduce data
const totalUang = dompet.reduce((total, uang) => total + uang, 0);
console.log({ totalUang });

const totalmurahusd = dompet.map(rupiah => rupiah / kursUSD)
    .filter(usd => usd <= 50)
    .reduce((sum, usd) => sum + usd, 0);
console.log({ totalmurahusd });
