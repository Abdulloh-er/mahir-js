console.log("===================================");
console.log("=============MATERI 4==============");
console.log("===================================");

console.log(document.title)
console.log(document.body)
console.log(document.body.innerHTML)
console.log(document.body.innerText)

const heker = document.getElementById("hengker")
console.log("heker")


// target ubahwarna
const ubahwarna = document.getElementById("ubahwarna")
ubahwarna.onclick = function() {
    document.body.style.border = "2px solid lightblue"
}