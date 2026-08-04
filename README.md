# Belajar Dasar Command Line (Terminal)

> Catatan belajar mandiri mengenai dasar-dasar penggunaan Command Line atau Terminal.

---

# Apa Itu Command Line?

Command Line atau Terminal adalah aplikasi yang digunakan untuk berinteraksi langsung dengan sistem operasi menggunakan perintah (command) dalam bentuk teks.

Kalau biasanya kita membuka folder atau file dengan cara klik menggunakan mouse (Graphical User Interface/GUI), di Terminal semuanya dilakukan menggunakan perintah yang diketik.

Awalnya mungkin terasa lebih sulit karena tidak ada tombol atau ikon yang bisa diklik. Namun setelah terbiasa, Terminal jauh lebih cepat, efisien, dan menjadi salah satu kemampuan dasar yang wajib dimiliki oleh programmer.

Beberapa alasan kenapa programmer menggunakan Terminal:

* Lebih cepat untuk mengelola file dan folder.
* Banyak tools pemrograman dijalankan melalui Terminal.
* Digunakan untuk Git, Node.js, npm, dan berbagai framework.
* Mempermudah otomatisasi pekerjaan.

---

# Membuka Terminal di Sistem Operasi

Setiap sistem operasi memiliki aplikasi Terminal masing-masing.

## Windows

Beberapa pilihan Terminal di Windows:

* Command Prompt (CMD)
* Windows PowerShell
* Windows Terminal (disarankan)

Cara membukanya:

* Tekan **Win**, lalu cari **Windows Terminal** atau **PowerShell**.
* Bisa juga klik kanan tombol Start → **Terminal**.

---

## macOS

Menggunakan aplikasi **Terminal**.

Cara membuka:

* Tekan **Command + Space**
* Ketik **Terminal**
* Tekan **Enter**

---

## Linux

Hampir semua distro Linux sudah menyediakan Terminal.

Biasanya bisa dibuka dengan:

* Shortcut **Ctrl + Alt + T**
* Atau cari aplikasi **Terminal**.

---

# Anatomi Jendela Terminal

Saat Terminal dibuka, biasanya akan muncul tampilan seperti berikut.

```bash
username@computer:~/Documents$
```

Bagian-bagiannya:

* **username** → nama pengguna komputer.
* **computer** → nama perangkat.
* **~/Documents** → lokasi folder saat ini (current directory).
* **$** → tanda bahwa Terminal siap menerima perintah.

Setelah tanda `$`, kita bisa mulai mengetik command.

Contoh:

```bash
pwd
```

Lalu tekan **Enter** untuk menjalankannya.

---

# Navigasi Folder di Terminal

Navigasi berarti berpindah dari satu folder ke folder lainnya.

## Melihat lokasi saat ini

```bash
pwd
```

`pwd` berarti **Print Working Directory**.

Perintah ini menampilkan folder tempat kita sedang berada.

---

## Melihat isi folder

```bash
ls
```

Perintah ini menampilkan semua file dan folder yang ada.

Beberapa variasi:

```bash
ls -a
```

Menampilkan file tersembunyi.

```bash
ls -l
```

Menampilkan informasi lebih lengkap.

---

## Masuk ke folder

```bash
cd nama-folder
```

Contoh:

```bash
cd project
```

---

## Kembali satu folder

```bash
cd ..
```

---

## Kembali ke folder Home

```bash
cd
```

atau

```bash
cd ~
```

---

## Masuk ke folder menggunakan path

Contoh:

```bash
cd Documents/Belajar
```

---

# Membuat Folder dan File

## Membuat folder

```bash
mkdir nama-folder
```

Contoh:

```bash
mkdir latihan-terminal
```

---

## Membuat beberapa folder sekaligus

```bash
mkdir folder1 folder2 folder3
```

---

## Membuat file kosong

Linux/macOS:

```bash
touch index.html
```

Bisa juga sekaligus:

```bash
touch index.html style.css script.js
```

---

Windows PowerShell:

```powershell
New-Item index.html
```

---

# Copy, Paste, dan Ganti Nama

## Menyalin file

```bash
cp file1.txt file2.txt
```

Artinya isi file pertama akan disalin ke file kedua.

---

## Menyalin folder

```bash
cp -r folderlama folderbaru
```

Opsi `-r` berarti menyalin seluruh isi folder secara rekursif.

---

## Memindahkan file

```bash
mv file.txt folder/
```

---

## Mengganti nama file

```bash
mv lama.txt baru.txt
```

Perintah `mv` tidak hanya memindahkan file, tetapi juga digunakan untuk mengganti nama.

---

# Menghapus File dan Folder

## Menghapus file

```bash
rm file.txt
```

---

## Menghapus beberapa file

```bash
rm file1.txt file2.txt
```

---

## Menghapus folder kosong

```bash
rmdir nama-folder
```

---

## Menghapus folder beserta isinya

```bash
rm -r nama-folder
```

---

## Menghapus tanpa konfirmasi

```bash
rm -rf nama-folder
```

Perintah ini sangat berbahaya karena akan langsung menghapus seluruh isi folder tanpa meminta konfirmasi. Sebaiknya digunakan dengan sangat hati-hati.

---

# Perintah Terminal Berguna Lain

## Membersihkan layar

```bash
clear
```

Windows juga bisa menggunakan:

```powershell
cls
```

---

## Menampilkan isi file

```bash
cat nama-file.txt
```

---

## Menampilkan isi file per halaman

```bash
more nama-file.txt
```

atau

```bash
less nama-file.txt
```

---

## Menampilkan tanggal

```bash
date
```

---

## Menampilkan kalender (Linux/macOS)

```bash
cal
```

---

## Mengetahui siapa pengguna yang sedang login

```bash
whoami
```

---

## Menampilkan bantuan command

```bash
man ls
```

atau

```bash
ls --help
```

---

## Mengetahui lokasi suatu command

```bash
which node
```

---

## Menampilkan riwayat command

```bash
history
```

---

# Tips dan Trik Menggunakan Terminal

### Gunakan tombol Tab

Tekan **Tab** agar Terminal melengkapi nama file atau folder secara otomatis.

Contoh:

```bash
cd Doc
```

Tekan **Tab**, maka bisa berubah menjadi:

```bash
cd Documents
```

Ini membuat pekerjaan lebih cepat dan mengurangi typo.

---

### Gunakan tombol panah atas

Tekan tombol **↑** untuk membuka kembali command yang pernah dijalankan sebelumnya.

Tidak perlu mengetik ulang dari awal.

---

### Gunakan Ctrl + C

Jika ada proses yang sedang berjalan dan ingin dihentikan:

```text
Ctrl + C
```

---

### Jangan asal menjalankan command

Selalu baca kembali command sebelum menekan **Enter**, terutama command yang berhubungan dengan `rm`, karena file yang terhapus biasanya tidak masuk ke Recycle Bin.

---

### Biasakan memahami arti command

Jangan hanya menghafal. Pahami fungsi setiap command agar lebih mudah mengingat dan menggunakannya di situasi yang berbeda.

---

# Terminal di VS Code

Visual Studio Code memiliki Terminal bawaan sehingga kita tidak perlu membuka aplikasi Terminal terpisah.

Cara membuka:

Menu:

```
Terminal → New Terminal
```

atau shortcut:

```
Ctrl + `
```

(backtick)

Keuntungan menggunakan Terminal di VS Code:

* Bisa langsung menjalankan project.
* Tidak perlu berpindah aplikasi.
* Lebih praktis saat coding.
* Terintegrasi dengan Git, Node.js, npm, dan berbagai tools lainnya.

---

# Kesimpulan

Command Line adalah salah satu dasar yang penting untuk dipelajari sebelum masuk ke dunia pemrograman yang lebih dalam. Walaupun awalnya terasa asing karena semua dilakukan lewat teks, penggunaan Terminal sebenarnya lebih cepat dan efisien dibandingkan menggunakan mouse.

Materi yang dipelajari meliputi cara membuka Terminal, memahami tampilan jendelanya, berpindah antar folder, membuat serta mengelola file, menyalin dan menghapus data, hingga mengenal beberapa command yang sering digunakan sehari-hari. Selain itu, memahami shortcut dan fitur Terminal di VS Code juga dapat membuat proses belajar dan coding menjadi lebih nyaman.

Setelah menguasai dasar-dasar ini, kita akan lebih mudah mengikuti materi selanjutnya seperti Git, GitHub, Node.js, npm, maupun framework JavaScript modern.

---

# Ringkasan Command

| Command          | Fungsi                             |
| ---------------- | ---------------------------------- |
| `pwd`            | Menampilkan lokasi folder saat ini |
| `ls`             | Melihat isi folder                 |
| `cd`             | Berpindah folder                   |
| `mkdir`          | Membuat folder                     |
| `touch`          | Membuat file kosong                |
| `cp`             | Menyalin file/folder               |
| `mv`             | Memindahkan atau mengganti nama    |
| `rm`             | Menghapus file                     |
| `rm -r`          | Menghapus folder beserta isinya    |
| `clear` / `cls`  | Membersihkan layar Terminal        |
| `cat`            | Menampilkan isi file               |
| `whoami`         | Menampilkan nama pengguna          |
| `history`        | Melihat riwayat command            |
| `which`          | Menampilkan lokasi suatu command   |
| `man` / `--help` | Melihat dokumentasi command        |
