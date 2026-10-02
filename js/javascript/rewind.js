console.log('Bismillah, Hello World!');
const fullName = 'Muhammad Hadi'; //  camelCase
console.log(fullName);
// const = variabel yg tidak bisa diubah
// let = variabel yg bisa diubah
let firstName = 'Bagus';
firstName = 'Abdullah';
firstName = 10000; // number
console.log(firstName);
const attendStatus = true;
console.log(attendStatus);
// OPERATOR ARITMETIC
const totalScoreA = 10 + 20;
const accumulatedScoreA = totalScoreA * 10;
let randomScore = 50;
const newScore = randomScore + 10;
randomScore += 10; // randomScore = randomScore + 10
randomScore *= 20; // randomScore = randomScore * 10
console.log({
    totalScoreA,
    accumulatedScoreA,
    newScore,
    randomScore
});

let helloMessage = "Welcome Team...";
let newMessage = helloMessage + " to the Galaxy";
helloMessage += " to the World of Code!";
newMessage += " Skuy!";
console.log({
    newMessage,
    helloMessage
});
// OPERATOR PERBANDINGAN (cek nilai boolean)
const ujangAge = 17;
const bagusAge = "17"; // ujicoba ke string
const isUjangOlder = ujangAge > bagusAge;
if (isUjangOlder) {
    console.log('Ujang is older than Bagus');
} else {
    console.log('Ujang is younger than Bagus');
}
// perbedaan == dan === (untuk cek tipe data)
// != ATAU !== (tidak sama dengan)
const isEqualAge = ujangAge === bagusAge;
const isNotEqualAge = ujangAge !== bagusAge;
console.log({
    isEqualAge,
    isNotEqualAge
});

// OPERATOR LOGICAL
const ageStatus = ujangAge > 13;
const raportStatus = 90;
const marriedStatus = "duda";
if (ageStatus && raportStatus > 60 && marriedStatus === "lajang") {
    console.log('Lolos berkas');
} else {
    console.log('Tidak lolos berkas');
}
const isOlyimpiad = false;
if (isOlyimpiad || raportStatus > 95) {
    console.log('Boleh lolos unggulan lah');
} else {
    console.log('Tidak lolos unggulan lah');
}


// looping 

const resep = ["nasi goreng", "mie goreng", "sate ayam", "soto ayam"];
for (let i = 0; i < resep.length; i++) {
    console.log(`Resep ke-${i + 1} adalah ${resep[i]}`);
}

console.log("---------------------------------------------------------");


const resep2 = [
    { name: "nasi goreng", cuisine: "Indonesian", ingredients: ["rice", "egg", "chicken"] },
    { name: "mie goreng", cuisine: "Indonesian", ingredients: ["noodles", "egg", "chicken"] },
    { name: "sate ayam", cuisine: "Indonesian", ingredients: ["chicken", "peanut sauce"] },
    { name: "soto ayam", cuisine: "Indonesian", ingredients: ["chicken", "broth", "noodles"] },
    { name: "rendang", cuisine: "Indonesian", ingredients: ["beef", "coconut milk", "spices"] },
    { name: "pad thai", cuisine: "Thai", ingredients: ["noodles", "tofu", "peanuts"] },
    { name: "ramen", cuisine: "Japanese", ingredients: ["noodles", "broth", "pork"] },
    { name: "tacos", cuisine: "Mexican", ingredients: ["tortilla", "beef", "cheese"] },
    { name: "spaghetti", cuisine: "Italian", ingredients: ["pasta", "tomato sauce", "meatballs"] }
];

for (let i = 0; i < resep2.length; i++) {
    const recipe = resep2[i];
    console.log("Resep ke-" + (i + 1) + ": " + recipe.name);
    console.log("makanan dari : " + recipe.cousine);
    
    console.log("bahan-bahan : " + recipe.ingredients.join(", "));
    
}



// function
console.log("-------------------function------------------");

function hitungluas(panjang, lebar) {
    return panjang * lebar;
}

const luas1 = hitungluas(10, 5);
console.log("Luas kota: " + luas1);