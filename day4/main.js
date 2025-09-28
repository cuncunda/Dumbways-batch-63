console.log("Hello world!");

let nama = "cunda";
const umur = 23;

console.log(`Nama saya adalah ${nama}, umur saya sekarang ${umur} tahun`);

let x = 7;
let y = 3;

console.log(x + y);
console.log(x - y);
console.log(x * y);
console.log(x / y);
console.log(x % y);

let angka1 = 10;
let angka2 = "10";

console.log(angka1 == angka2);
console.log(angka1 === angka2);
console.log(angka1 != angka2);
console.log(angka1 !== angka2);

function kaliDua(angka) {
  return angka * 2;
}

console.log(kaliDua(20));

function luasPersegi(p, l) {
  return p * l;
}

console.log(luasPersegi(12, 8));

function hargaDiskon(harga, diskon) {
  return harga - (harga * diskon) / 100;
}

let hargaAwal = 40000;
let diskon = 30;

console.log(`${hargaDiskon(hargaAwal, diskon)}`);

function luasSegitiga(a, t) {
  return (1 / 2) * a * t;
}

console.log(luasSegitiga(4, 6));

function ganjilGenap(angka) {
  if (angka % 2 === 0) {
    console.log(`${angka} merupakan bilangan genap`);
  } else {
    console.log(`${angka} merupakan bilang ganjil`);
  }
}

ganjilGenap(21);

function cekUmur(umur) {
  if (umur >= 13 && umur < 18) {
    console.log(`${umur} tahun berarti remaja`);
  } else if (umur >= 18) {
    console.log(`${umur} tahun berarti dewasa`);
  } else {
    console.log(`${umur} tahun berarti anak-anak`);
  }
}

cekUmur(12);

function hitungDiskon() {
  // 1️⃣ Ambil nilai dari input HTML
  let hargaAwal = document.getElementById("hargaAwal").value;
  let diskon = document.getElementById("diskon").value;

  // 2️⃣ Ubah dari string ke number
  hargaAwal = Number(hargaAwal);
  diskon = Number(diskon);

  // 3️⃣ Hitung harga setelah diskon
  let hargaAkhir = hargaAwal - (hargaAwal * diskon) / 100;

  // 4️⃣ Tampilkan hasil ke <p id="hasil">
  document.getElementById(
    "hasil"
  ).textContent = `Harga setelah diskon: Rp${hargaAkhir}`;
}

function hitungSegitiga() {
  let alas = document.getElementById("alasSegitiga").value;
  let tinggi = document.getElementById("tinggiSegitiga").value;

  alas = Number(alas);
  tinggi = Number(tinggi);

  let jumlah = (1 / 2) * alas * tinggi;

  document.getElementById(
    "jumlah"
  ).textContent = `Luas segitiga dari ukuran di atas adalah ${jumlah} cm²`;

  if (!alas || !tinggi) {
    document.getElementById("jumlah").textContent =
      "Harap masukkan alas dan tinggi!";
    return;
  }
}
