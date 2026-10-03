export interface BankSoalMcItem {
  no: number;
  indikatorKritis: string;
  levelKognitif: string;
  topik: string;
  stimulus: string;
  mathBox?: string;
  pertanyaan: string;
  options: [string, string, string, string];
  kunciIndex: number; // 0 = A, 1 = B, 2 = C, 3 = D
  pembahasan: string;
}

export interface BankSoalEssayItem {
  no: number;
  judulKasus: string;
  indikatorKritis: string;
  levelKognitif: string;
  skorMaksimal: number;
  permasalahan: string;
  rincianPertanyaan: string[];
  langkahPembahasan: string[];
  kesimpulanKunci: string;
}

export interface PaketBankSoal {
  id: 'relasi_fungsi_viii' | 'bilangan_bulat_vii';
  namaPaket: string;
  mataPelajaran: string;
  kelasSemester: string;
  pendekatan: string;
  penyusun: string;
  instansi: string;
  deskripsiSingkat: string;
  pilihanGanda: BankSoalMcItem[];
  uraian: BankSoalEssayItem[];
}

export const BANK_SOAL_RELASI_FUNGSI: PaketBankSoal = {
  id: 'relasi_fungsi_viii',
  namaPaket: 'Paket Soal HOTS & PBL: Mengungkap Rahasia Relasi dan Fungsi',
  mataPelajaran: 'Matematika SMP/MTs',
  kelasSemester: 'Kelas VIII / Fase D / Semester Ganjil',
  pendekatan: 'Problem Based Learning (PBL) · Fokus: Kemampuan Berpikir Kritis',
  penyusun: 'NUR WAKHID, S.Pd',
  instansi: 'SMP Negeri 1 Bantarkawung (Mitra: Drs. PAIYO)',
  deskripsiSingkat:
    'Instrumen evaluasi kemampuan berpikir kritis (Interpretasi, Analisis, Evaluasi, Inferensi, Eksplanasi) berbasis masalah kontekstual pada materi Relasi, Fungsi (Pemetaan), Korespondensi Satu-Satu, dan Rumus Fungsi Linear.',
  pilihanGanda: [
    {
      no: 1,
      indikatorKritis: 'Interpretasi',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Aturan Relasi Dua Himpunan',
      stimulus:
        'Diketahui himpunan P = {2, 3, 5} dan himpunan Q = {4, 6, 9, 10, 15}. Suatu relasi dari himpunan P ke himpunan Q dinyatakan dengan himpunan pasangan berurutan R = {(2, 4), (2, 6), (2, 10), (3, 6), (3, 9), (3, 15), (5, 10), (5, 15)}.',
      mathBox: 'P = {2, 3, 5}  →  Q = {4, 6, 9, 10, 15}',
      pertanyaan:
        'Aturan relasi yang paling tepat untuk menjelaskan hubungan dari himpunan P ke himpunan Q tersebut adalah...',
      options: [
        'Kurang dari',
        'Setengah dari',
        'Faktor prima dari',
        'Kelipatan dari'
      ],
      kunciIndex: 2,
      pembahasan:
        'Semua anggota P = {2, 3, 5} adalah bilangan prima. Angka 2 membagi habis 4, 6, dan 10; angka 3 membagi habis 6, 9, dan 15; angka 5 membagi habis 10 dan 15. Bukan "kurang dari" karena (2, 9) dan (2, 15) tidak termasuk di dalam R. Jadi relasi yang tepat adalah "faktor prima dari".'
    },
    {
      no: 2,
      indikatorKritis: 'Analisis',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Syarat Mutlak Fungsi (Pemetaan)',
      stimulus:
        'Empat kelompok siswa kelas VIII mengumpulkan data pasangan berurutan dari himpunan A = {a, b, c} ke himpunan B = {1, 2, 3}.',
      mathBox:
        'I.   {(a, 1), (b, 2), (b, 3), (c, 1)}\nII.  {(a, 2), (b, 2), (c, 2)}\nIII. {(a, 1), (c, 3)}\nIV.  {(a, 1), (a, 2), (a, 3)}',
      pertanyaan:
        'Manakah di antara keempat himpunan pasangan berurutan tersebut yang MERUPAKAN FUNGSI (Pemetaan) dari himpunan A ke himpunan B?',
      options: [
        'Himpunan I karena semua anggota B terpilih',
        'Himpunan II karena setiap anggota A muncul tepat satu kali sebagai komponen pertama',
        'Himpunan III karena tidak ada anggota A yang bercabang',
        'Himpunan IV karena anggota a berpasangan dengan semua anggota B'
      ],
      kunciIndex: 1,
      pembahasan:
        'Syarat mutlak fungsi dari A = {a, b, c} ke B adalah setiap anggota A wajib memiliki pasangan dan pasangannya harus tunggal (tidak bercabang). Pada Himpunan II {(a,2), (b,2), (c,2)}, anggota a, b, dan c masing-masing muncul tepat satu kali. Himpunan I dan IV gagal karena bercabang, sedangkan Himpunan III gagal karena anggota b tidak memiliki pasangan.'
    },
    {
      no: 3,
      indikatorKritis: 'Interpretasi',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Domain, Kodomain, dan Range',
      stimulus:
        'Suatu fungsi f memetakan himpunan K = {1, 2, 3, 4} ke himpunan L = {3, 5, 7, 9, 11, 13} dengan himpunan pasangan berurutan f = {(1, 3), (2, 5), (3, 7), (4, 9)}.',
      mathBox: 'K = {1, 2, 3, 4} · L = {3, 5, 7, 9, 11, 13}\nf = {(1, 3), (2, 5), (3, 7), (4, 9)}',
      pertanyaan:
        'Pernyataan berikut yang BENAR mengenai Domain, Kodomain, dan Range dari fungsi f tersebut adalah...',
      options: [
        'Domain = {3, 5, 7, 9} dan Range = {1, 2, 3, 4}',
        'Kodomain = {3, 5, 7, 9} dan Range = {3, 5, 7, 9, 11, 13}',
        'Domain = {1, 2, 3, 4} dan Range = {3, 5, 7, 9}',
        'Range = {11, 13} karena tidak memiliki pasangan dari K'
      ],
      kunciIndex: 2,
      pembahasan:
        'Domain (daerah asal) adalah seluruh anggota himpunan K = {1, 2, 3, 4}. Kodomain (daerah kawan) adalah seluruh anggota himpunan L = {3, 5, 7, 9, 11, 13}. Range (daerah hasil) adalah anggota L yang memiliki pasangan dari K, yaitu {3, 5, 7, 9}.'
    },
    {
      no: 4,
      indikatorKritis: 'Analisis',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Banyaknya Pemetaan (Fungsi)',
      stimulus:
        'Diketahui himpunan A = {x | 1 < x < 6, x bilangan asli} dan himpunan B = {huruf vokal dalam kata "MATEMATIKA"}.',
      mathBox: 'A = {2, 3, 4, 5}\nB = {huruf vokal pada "MATEMATIKA"}',
      pertanyaan:
        'Banyaknya semua fungsi (pemetaan) yang mungkin dibuat dari himpunan A ke himpunan B adalah...',
      options: ['64 pemetaan', '81 pemetaan', '12 pemetaan', '27 pemetaan'],
      kunciIndex: 1,
      pembahasan:
        'Anggota A = {2, 3, 4, 5} sehingga n(A) = 4. Huruf vokal dalam kata "MATEMATIKA" adalah A, E, dan I (huruf yang sama hanya ditulis satu kali dalam himpunan), sehingga B = {A, E, I} dan n(B) = 3. Banyaknya fungsi dari A ke B adalah n(B)^n(A) = 3⁴ = 81 pemetaan.'
    },
    {
      no: 5,
      indikatorKritis: 'Evaluasi',
      levelKognitif: 'C5 (Mengevaluasi)',
      topik: 'Korespondensi Satu-Satu dalam Kehidupan Nyata',
      stimulus:
        'Perhatikan empat situasi hubungan di lingkungan SMP Negeri 1 Bantarkawung berikut ini.',
      pertanyaan:
        'Situasi manakah yang PASTI membentuk hubungan Korespondensi Satu-Satu?',
      options: [
        'Relasi antara Siswa Kelas VIII A dengan Bulan Kelahirannya',
        'Relasi antara Siswa Kelas VIII A dengan Ukuran Sepatunya',
        'Relasi antara Siswa Kelas VIII A dengan Nomor Induk Siswa Nasional (NISN) miliknya',
        'Relasi antara Siswa Kelas VIII A dengan Ekstrakurikuler yang diikuti'
      ],
      kunciIndex: 2,
      pembahasan:
        'NISN bersifat unik untuk setiap siswa: 1 siswa memiliki tepat 1 NISN, dan 1 NISN hanya dimiliki oleh tepat 1 siswa. Sedangkan bulan lahir (hanya 12 bulan untuk ~32 siswa) dan ukuran sepatu pasti ada beberapa siswa yang sama.'
    },
    {
      no: 6,
      indikatorKritis: 'Analisis',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Perhitungan Korespondensi Satu-Satu',
      stimulus:
        'Lima orang ketua regu Pramuka akan ditempatkan ke dalam 5 tenda berbeda sehingga memenuhi syarat korespondensi satu-satu.',
      mathBox: 'n(A) = n(B) = 5  ⇒  K = n!',
      pertanyaan:
        'Berapa banyak susunan korespondensi satu-satu yang dapat dibentuk antara ketua regu dan tenda tersebut?',
      options: ['25 susunan', '60 susunan', '120 susunan', '3.125 susunan'],
      kunciIndex: 2,
      pembahasan:
        'Banyaknya korespondensi satu-satu untuk n = 5 adalah 5! = 5 × 4 × 3 × 2 × 1 = 120 susunan.'
    },
    {
      no: 7,
      indikatorKritis: 'Inferensi',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Menentukan Input dari Nilai Fungsi',
      stimulus:
        'Sebuah mesin fungsi ditentukan oleh rumus f(x) = 4x - 7. Ketika suatu bilangan k dimasukkan ke dalam mesin tersebut, keluaran (bayangannya) adalah f(k) = 25.',
      mathBox: 'f(x) = 4x - 7  dan  f(k) = 25',
      pertanyaan:
        'Berapakah nilai bilangan input k yang dimasukkan ke dalam mesin fungsi tersebut?',
      options: ['k = 4,5', 'k = 6', 'k = 8', 'k = 93'],
      kunciIndex: 2,
      pembahasan:
        'Diketahui f(k) = 25, maka 4k - 7 = 25 ⇒ 4k = 25 + 7 ⇒ 4k = 32 ⇒ k = 32 / 4 = 8.'
    },
    {
      no: 8,
      indikatorKritis: 'Analisis',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Transformasi Aljabar pada Fungsi',
      stimulus:
        'Suatu fungsi linear didefinisikan dengan rumus f(x) = 3x + 5 untuk setiap x bilangan real.',
      mathBox: 'f(x) = 3x + 5  →  Tentukan f(2a - 3)',
      pertanyaan: 'Bentuk paling sederhana dari f(2a - 3) adalah...',
      options: ['6a - 4', '6a + 2', '5a + 2', '6a - 9'],
      kunciIndex: 0,
      pembahasan:
        'Substitusikan x = (2a - 3) ke dalam rumus f(x) = 3x + 5:\nf(2a - 3) = 3(2a - 3) + 5 = 6a - 9 + 5 = 6a - 4.'
    },
    {
      no: 9,
      indikatorKritis: 'Inferensi',
      levelKognitif: 'C5 (Mengevaluasi)',
      topik: 'Menyusun Rumus Fungsi Linear f(x) = ax + b',
      stimulus:
        'Suatu fungsi linear f(x) = ax + b memiliki data pengamatan bahwa f(2) = 1 dan f(5) = 10.',
      mathBox: 'f(2) = 1  dan  f(5) = 10  →  f(-2) = ?',
      pertanyaan:
        'Berdasarkan kedua petunjuk tersebut, nilai dari f(-2) adalah...',
      options: ['-11', '-9', '-7', '1'],
      kunciIndex: 0,
      pembahasan:
        'Langkah 1: a = (f(5) - f(2)) / (5 - 2) = (10 - 1) / 3 = 9 / 3 = 3.\nLangkah 2: Substitusi a = 3 ke f(2) = 1 ⇒ 3(2) + b = 1 ⇒ 6 + b = 1 ⇒ b = -5.\nLangkah 3: Rumus fungsi adalah f(x) = 3x - 5.\nLangkah 4: Nilai f(-2) = 3(-2) - 5 = -6 - 5 = -11.'
    },
    {
      no: 10,
      indikatorKritis: 'Eksplanasi',
      levelKognitif: 'C5 (Mengevaluasi)',
      topik: 'Pemodelan Masalah Kontekstual Tarif Perjalanan',
      stimulus:
        'Sebuah perusahaan taksi online di Kabupaten Brebes menetapkan tarif perjalanan mengikuti fungsi linear C(s) = as + b, dengan s adalah jarak tempuh (km). Penumpang A menempuh jarak 4 km dan membayar Rp26.000. Penumpang B menempuh jarak 9 km dan membayar Rp51.000. Budi memiliki saldo dompet digital sebesar Rp80.000 dan ingin menuju lokasi sejauh 14 km.',
      mathBox: 'C(4) = 26.000 · C(9) = 51.000 · Saldo Budi = Rp80.000 · Jarak = 14 km',
      pertanyaan:
        'Evaluasilah apakah saldo Budi cukup untuk membayar perjalanan tersebut, dan berapakah sisa atau kekurangan saldonya?',
      options: [
        'Cukup, tarifnya Rp76.000 sehingga sisa saldo Budi Rp4.000',
        'Cukup, tarifnya Rp70.000 sehingga sisa saldo Budi Rp10.000',
        'Tidak cukup, tarifnya Rp81.000 sehingga Budi kurang Rp1.000',
        'Tidak cukup, tarifnya Rp86.000 sehingga Budi kurang Rp6.000'
      ],
      kunciIndex: 0,
      pembahasan:
        'Selisih jarak 5 km (dari 4 km ke 9 km) menambah tarif sebesar Rp25.000, sehingga tarif per km adalah a = Rp5.000/km dan biaya awal b = 26.000 - 4(5.000) = Rp6.000. Rumus tarif: C(s) = 5.000s + 6.000. Untuk s = 14 km: C(14) = 5.000(14) + 6.000 = Rp76.000. Karena saldo Budi Rp80.000, maka saldonya CUKUP dan bersisa Rp4.000.'
    },
    {
      no: 11,
      indikatorKritis: 'Analisis',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Daerah Hasil (Range) Fungsi Kuadratik',
      stimulus:
        'Suatu fungsi memetakan himpunan A = {-2, -1, 0, 1, 2} ke himpunan bilangan bulat B dengan rumus f(x) = x² - 2.',
      mathBox: 'Domain A = {-2, -1, 0, 1, 2}  ·  f(x) = x² - 2',
      pertanyaan: 'Daerah hasil (Range) dari fungsi tersebut adalah...',
      options: [
        '{-2, -1, 0, 1, 2}',
        '{-2, -1, 2}',
        '{-6, -3, -2, -1, 2}',
        '{-2, 0, 2, 4}'
      ],
      kunciIndex: 1,
      pembahasan:
        'Hitung nilai fungsi untuk setiap x ∈ A:\n• f(-2) = (-2)² - 2 = 4 - 2 = 2\n• f(-1) = (-1)² - 2 = 1 - 2 = -1\n• f(0) = 0² - 2 = -2\n• f(1) = 1² - 2 = -1\n• f(2) = 2² - 2 = 2\nHimpunan hasil uniknya (Range) adalah {-2, -1, 2}.'
    },
    {
      no: 12,
      indikatorKritis: 'Evaluasi',
      levelKognitif: 'C5 (Mengevaluasi)',
      topik: 'Uji Garis Tegak pada Grafik Cartesius',
      stimulus:
        'Seorang detektif matematika menguji 4 kurva pada bidang Cartesius dengan menarik garis vertikal (sejajar sumbu-Y). Pada Kurva P, setiap garis vertikal memotong kurva tepat di 1 titik. Pada Kurva Q (berbentuk lingkaran), ada garis vertikal yang memotong kurva di 2 titik.',
      pertanyaan:
        'Kesimpulan kritis yang tepat mengenai Kurva P dan Kurva Q sebagai fungsi y = f(x) adalah...',
      options: [
        'Kedua kurva merupakan fungsi karena memiliki grafik yang kontinu',
        'Kurva P adalah fungsi karena setiap x memiliki tepat 1 nilai y, sedangkan Kurva Q bukan fungsi karena ada 1 nilai x yang memiliki 2 nilai y',
        'Kurva Q adalah fungsi korespondensi satu-satu karena berbentuk tertutup',
        'Kurva P bukan fungsi karena tidak memotong sumbu-Y dua kali'
      ],
      kunciIndex: 1,
      pembahasan:
        'Pada bidang Cartesius, suatu grafik menyatakan fungsi y = f(x) jika dan hanya jika setiap garis vertikal memotong grafik paling banyak di satu titik (Vertical Line Test). Jika memotong di 2 titik seperti lingkaran Q, berarti satu nilai x (domain) bercabang ke dua nilai y (kodomain).'
    },
    {
      no: 13,
      indikatorKritis: 'Inferensi',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Menentukan Jumlah Anggota Himpunan dari Banyak Pemetaan',
      stimulus:
        'Diketahui banyaknya seluruh fungsi (pemetaan) yang dapat dibuat dari himpunan M ke himpunan N adalah 64. Jika jumlah anggota himpunan N adalah n(N) = 4.',
      mathBox: 'Banyak fungsi M → N = n(N)^n(M) = 64  dengan  n(N) = 4',
      pertanyaan:
        'Berapakah jumlah anggota himpunan M dan berapa banyak fungsi yang dapat dibuat jika arah pemetaannya dibalik dari N ke M?',
      options: [
        'n(M) = 3 dan banyak fungsi N → M adalah 81',
        'n(M) = 16 dan banyak fungsi N → M adalah 64',
        'n(M) = 3 dan banyak fungsi N → M adalah 64',
        'n(M) = 4 dan banyak fungsi N → M adalah 256'
      ],
      kunciIndex: 0,
      pembahasan:
        'Karena banyak fungsi M → N adalah n(N)^n(M) = 64 dan n(N) = 4, maka 4^n(M) = 64 ⇒ 4³ = 64, sehingga n(M) = 3. Jika dibalik dari N ke M, banyak fungsinya adalah n(M)^n(N) = 3⁴ = 81 fungsi.'
    },
    {
      no: 14,
      indikatorKritis: 'Analisis',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Persamaan Dua Fungsi',
      stimulus:
        'Diketahui dua buah fungsi yaitu f(x) = 5x - 3 dan g(x) = 2x + 9.',
      mathBox: 'f(p) = g(p)  ⇔  5p - 3 = 2p + 9',
      pertanyaan:
        'Jika untuk suatu bilangan p berlaku f(p) = g(p), maka nilai p dan bayangan f(p) berturut-turut adalah...',
      options: [
        'p = 2 dan f(p) = 7',
        'p = 4 dan f(p) = 17',
        'p = 4 dan f(p) = 11',
        'p = 3 dan f(p) = 12'
      ],
      kunciIndex: 1,
      pembahasan:
        'Selesaikan persamaan f(p) = g(p):\n5p - 3 = 2p + 9\n5p - 2p = 9 + 3\n3p = 12 ⇒ p = 4.\nSubstitusikan p = 4 ke f(p): f(4) = 5(4) - 3 = 20 - 3 = 17.'
    },
    {
      no: 15,
      indikatorKritis: 'Eksplanasi',
      levelKognitif: 'C6 (Mencipta/Menyimpulkan)',
      topik: 'Sintesis Pola Barisan sebagai Fungsi dari Bilangan Asli',
      stimulus:
        'Siswa kelas VIII menyusun batang korek api membentuk pola segitiga berderet: Pola ke-1 membutuhkan 3 batang, Pola ke-2 membutuhkan 5 batang, Pola ke-3 membutuhkan 7 batang, dan Pola ke-4 membutuhkan 9 batang.',
      mathBox: 'n = 1 → 3 · n = 2 → 5 · n = 3 → 7 · n = 4 → 9',
      pertanyaan:
        'Jika hubungan antara urutan pola (n) dan banyak batang korek api dinyatakan sebagai fungsi f(n), maka rumus f(n) dan banyak batang pada pola ke-25 adalah...',
      options: [
        'f(n) = 2n + 1 dan f(25) = 51 batang',
        'f(n) = 3n dan f(25) = 75 batang',
        'f(n) = 2n + 2 dan f(25) = 52 batang',
        'f(n) = n + 2 dan f(25) = 27 batang'
      ],
      kunciIndex: 0,
      pembahasan:
        'Setiap kenaikan 1 pola, jumlah batang bertambah 2 secara tetap, sehingga koefisien a = 2. Untuk n = 1, f(1) = 2(1) + b = 3 ⇒ b = 1. Jadi rumus fungsinya adalah f(n) = 2n + 1. Untuk pola ke-25: f(25) = 2(25) + 1 = 51 batang korek api.'
    }
  ],
  uraian: [
    {
      no: 1,
      judulKasus: 'Investigasi Syarat Mutlak Fungsi pada Data UKS Sekolah',
      indikatorKritis: 'Interpretasi & Analisis',
      levelKognitif: 'C4 (Menganalisis)',
      skorMaksimal: 20,
      permasalahan:
        'Di SMP Negeri 1 Bantarkawung terdapat himpunan Siswa S = {Aldi, Bela, Ciko, Dini} dan himpunan Golongan Darah G = {A, B, AB, O}. Data pemeriksaan UKS menunjukkan: Aldi bergolongan darah O, Bela bergolongan darah A, Ciko bergolongan darah B, dan Dini bergolongan darah O.',
      rincianPertanyaan: [
        'a) Nyatakan relasi dari himpunan S ke G dalam bentuk Himpunan Pasangan Berurutan!',
        'b) Apakah relasi dari S ke G merupakan suatu Fungsi (Pemetaan)? Jelaskan alasan logisnya!',
        'c) Jika relasinya dibalik dari G ke S, apakah masih merupakan Fungsi? Berikan bukti kritisnya!'
      ],
      langkahPembahasan: [
        'a) Himpunan Pasangan Berurutan dari S ke G = {(Aldi, O), (Bela, A), (Ciko, B), (Dini, O)}.',
        'b) YA, merupakan FUNGSI. Alasannya: setiap anggota domain S (Aldi, Bela, Ciko, Dini) memiliki pasangan di G, dan masing-masing siswa hanya memiliki tepat satu golongan darah.',
        'c) TIDAK, relasi dari G ke S BUKAN FUNGSI. Bukti kritisnya: (1) Anggota G yaitu AB tidak memiliki pasangan di S, dan (2) Anggota G yaitu O bercabang ke dua pasangan di S yaitu (O, Aldi) dan (O, Dini).'
      ],
      kesimpulanKunci:
        'Relasi S → G adalah fungsi, sedangkan kebalikannya G → S bukan fungsi.'
    },
    {
      no: 2,
      judulKasus: 'Analisis Daerah Hasil (Range) pada Fungsi Kuadratik',
      indikatorKritis: 'Analisis & Evaluasi',
      levelKognitif: 'C5 (Mengevaluasi)',
      skorMaksimal: 20,
      permasalahan:
        'Suatu fungsi f didefinisikan dengan rumus f(x) = 2x² - 3x + 1 dengan daerah asal (Domain) A = {-1, 0, 1, 2, 3}.',
      rincianPertanyaan: [
        'a) Hitunglah nilai fungsi untuk setiap anggota domain A!',
        'b) Tentukan Daerah Hasil (Range) dari fungsi f tersebut!',
        'c) Seorang siswa mengklaim bahwa banyaknya anggota Range pasti selalu sama dengan banyaknya anggota Domain. Evaluasilah klaim tersebut!'
      ],
      langkahPembahasan: [
        'a) Substitusi setiap x ∈ A ke f(x) = 2x² - 3x + 1:\n   • x = -1 ⇒ f(-1) = 2(-1)² - 3(-1) + 1 = 2 + 3 + 1 = 6\n   • x = 0  ⇒ f(0) = 2(0)² - 3(0) + 1 = 1\n   • x = 1  ⇒ f(1) = 2(1)² - 3(1) + 1 = 2 - 3 + 1 = 0\n   • x = 2  ⇒ f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3\n   • x = 3  ⇒ f(3) = 2(3)² - 3(3) + 1 = 18 - 9 + 1 = 10',
        'b) Daerah Hasil (Range) Rf = {0, 1, 3, 6, 10}.',
        'c) Klaim siswa tersebut SALAH secara umum. Jika dua anggota domain yang berbeda menghasilkan bayangan yang sama (misal pada g(x) = x² dengan domain {-1, 1}), maka jumlah anggota Range lebih sedikit daripada jumlah anggota Domain, sehingga berlaku n(Range) ≤ n(Domain).'
      ],
      kesimpulanKunci:
        'Range fungsi adalah {0, 1, 3, 6, 10} dan secara umum berlaku n(Range) ≤ n(Domain).'
    },
    {
      no: 3,
      judulKasus: 'Perbandingan Banyak Pemetaan dan Korespondensi Satu-Satu',
      indikatorKritis: 'Evaluasi',
      levelKognitif: 'C5 (Mengevaluasi)',
      skorMaksimal: 20,
      permasalahan:
        'Diketahui himpunan M = {faktor prima dari 30} dan himpunan N = {bilangan ganjil positif kurang dari 7}.',
      rincianPertanyaan: [
        'a) Daftarkan anggota himpunan M dan himpunan N, lalu tentukan n(M) dan n(N)!',
        'b) Berapakah banyaknya seluruh fungsi (pemetaan) yang mungkin dari M ke N?',
        'c) Berapakah banyaknya korespondensi satu-satu yang mungkin antara M dan N?'
      ],
      langkahPembahasan: [
        'a) Faktor prima dari 30 adalah M = {2, 3, 5}, sehingga n(M) = 3. Bilangan ganjil positif kurang dari 7 adalah N = {1, 3, 5}, sehingga n(N) = 3.',
        'b) Banyak fungsi dari M ke N = n(N)^n(M) = 3³ = 27 fungsi.',
        'c) Karena n(M) = n(N) = 3, banyak korespondensi satu-satu = 3! = 3 × 2 × 1 = 6 korespondensi satu-satu.'
      ],
      kesimpulanKunci:
        'Terdapat 27 fungsi total dan 6 di antaranya merupakan korespondensi satu-satu.'
    },
    {
      no: 4,
      judulKasus: 'Rekonstruksi Rumus Fungsi Linear Suhu Pemanasan Cairan',
      indikatorKritis: 'Inferensi',
      levelKognitif: 'C4 (Menganalisis)',
      skorMaksimal: 20,
      permasalahan:
        'Sebuah eksperimen pemanasan cairan di laboratorium IPA mencatat bahwa suhu cairan mengikuti fungsi linear T(t) = at + b, di mana t adalah waktu pemanasan (menit) dan T(t) adalah suhu (°C). Pada menit ke-3 suhu cairan mencapai 36°C, dan pada menit ke-8 suhu cairan mencapai 61°C.',
      rincianPertanyaan: [
        'a) Tentukan nilai a (laju kenaikan suhu per menit) dan b (suhu awal cairan saat t = 0)!',
        'b) Tuliskan rumus fungsi suhu T(t) secara lengkap!',
        'c) Pada menit ke berapakah cairan tersebut akan mencapai titik didih 100°C?'
      ],
      langkahPembahasan: [
        'a) Diketahui T(3) = 36 dan T(8) = 61.\n   Nilai a = (61 - 36) / (8 - 3) = 25 / 5 = 5 °C/menit.\n   Substitusi a = 5 ke T(3) = 36 ⇒ 5(3) + b = 36 ⇒ 15 + b = 36 ⇒ b = 21 °C.',
        'b) Rumus fungsi suhu adalah T(t) = 5t + 21.',
        'c) Mencari t saat T(t) = 100:\n   5t + 21 = 100 ⇒ 5t = 79 ⇒ t = 79 / 5 = 15,8 menit (15 menit 48 detik).'
      ],
      kesimpulanKunci:
        'Rumus fungsi adalah T(t) = 5t + 21 dan suhu 100°C tercapai pada menit ke-15,8.'
    },
    {
      no: 5,
      judulKasus: 'Pengambilan Keputusan Kritis Dua Skema Paket Internet',
      indikatorKritis: 'Eksplanasi & Pengambilan Keputusan',
      levelKognitif: 'C6 (Mengevaluasi & Memutuskan)',
      skorMaksimal: 20,
      permasalahan:
        'Untuk mendukung pembelajaran E-Modul Digital, koperasi menawarkan dua skema paket kuota belajar bulanan:\n• Paket Cerdas A: Biaya langganan tetap Rp15.000 ditambah Rp4.000 per GB.\n• Paket Cerdas B: Tanpa biaya langganan tetap, dengan tarif Rp5.500 per GB.',
      rincianPertanyaan: [
        'a) Nyatakan fungsi biaya bulanan f(x) untuk Paket A dan g(x) untuk Paket B jika x adalah jumlah kuota (GB)!',
        'b) Pada pemakaian berapa GB kedua paket tersebut menghasilkan biaya yang persis sama (titik impas)?',
        'c) Jika seorang siswa kelas VIII rata-rata membutuhkan 12 GB per bulan, paket manakah yang lebih hemat? Buktikan dengan perhitungan!'
      ],
      langkahPembahasan: [
        'a) Rumus fungsi biaya:\n   • Paket A: f(x) = 4.000x + 15.000\n   • Paket B: g(x) = 5.500x',
        'b) Titik impas terjadi saat f(x) = g(x):\n   4.000x + 15.000 = 5.500x ⇒ 15.000 = 1.500x ⇒ x = 10 GB.',
        'c) Untuk pemakaian x = 12 GB:\n   • Biaya Paket A: f(12) = 4.000(12) + 15.000 = 48.000 + 15.000 = Rp63.000.\n   • Biaya Paket B: g(12) = 5.500(12) = Rp66.000.\n   Kesimpulan: Paket Cerdas A lebih hemat Rp3.000 dibandingkan Paket Cerdas B.'
      ],
      kesimpulanKunci:
        'Titik impas pada 10 GB; untuk kebutuhan 12 GB, Paket Cerdas A (Rp63.000) lebih hemat.'
    }
  ]
};

export const BANK_SOAL_BILANGAN_BULAT: PaketBankSoal = {
  id: 'bilangan_bulat_vii',
  namaPaket: 'Paket Soal Pembelajaran Mendalam (RPM): Bab 1 Bilangan Bulat',
  mataPelajaran: 'Matematika SMP/MTs',
  kelasSemester: 'Kelas VII / Fase D / Semester Ganjil',
  pendekatan: 'Deep Learning (Mindful, Meaningful, Joyful Learning) & PBL',
  penyusun: 'Nurul Komariyah, S.Pd.',
  instansi: 'SMP Negeri 1 Sukorame (Kepala Sekolah: Wiwik Pujiati, S.Pd., M.Si.)',
  deskripsiSingkat:
    'Instrumen Asesmen Formatif dan Sumatif Bab 1 Bilangan Bulat mencakup perbandingan bilangan bulat, nilai mutlak, operasi hitung (+, -, ×, ÷), sifat operasi (komutatif, asosiatif, distributif), perpangkatan, operasi hitung campuran, dan pemecahan masalah kontekstual.',
  pilihanGanda: [
    {
      no: 1,
      indikatorKritis: 'Membandingkan & Mengurutkan Bilangan Bulat',
      levelKognitif: 'C2 (Memahami)',
      topik: 'Urutan Bilangan Bulat pada Garis Bilangan',
      stimulus:
        'Perhatikan lima bilangan bulat berikut yang menunjukkan catatan suhu udara (°C) di lima kota berbeda: -11, 5, -8, 0, 2.',
      mathBox: 'Data Bilangan: -11, 5, -8, 0, 2',
      pertanyaan:
        'Urutan bilangan-bilangan tersebut dari yang terkecil ke yang terbesar adalah...',
      options: [
        '0, 2, 5, -8, -11',
        '-8, -11, 0, 2, 5',
        '-11, -8, 0, 2, 5',
        '5, 2, 0, -8, -11'
      ],
      kunciIndex: 2,
      pembahasan:
        'Pada garis bilangan, semakin ke kiri letak suatu bilangan maka nilainya semakin kecil. Karena -11 berada paling kiri, diikuti -8, 0, 2, dan 5, maka urutan dari yang terkecil adalah -11, -8, 0, 2, 5.'
    },
    {
      no: 2,
      indikatorKritis: 'Pengurangan Bilangan Bulat Kontekstual',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Selisih Suhu Dua Kota',
      stimulus:
        'Badan meteorologi mencatat suhu udara malam hari di Kota A adalah -5°C, sedangkan suhu di Kota B adalah 2°C.',
      mathBox: 'Suhu Kota A = -5°C  ·  Suhu Kota B = 2°C',
      pertanyaan: 'Selisih suhu udara antara kedua kota tersebut adalah...',
      options: ['-7°C', '-3°C', '3°C', '7°C'],
      kunciIndex: 3,
      pembahasan:
        'Selisih suhu dihitung dari suhu yang lebih tinggi dikurangi suhu yang lebih rendah: 2°C - (-5°C) = 2 + 5 = 7°C.'
    },
    {
      no: 3,
      indikatorKritis: 'Prioritas Operasi Hitung Campuran',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Operasi Hitung Campuran Bilangan Bulat',
      stimulus:
        'Perhatikan ekspresi operasi hitung campuran bilangan bulat berikut.',
      mathBox: '(-15) + (-12) × 3 = ...',
      pertanyaan: 'Hasil dari (-15) + (-12) × 3 adalah...',
      options: ['-81', '-51', '21', '81'],
      kunciIndex: 1,
      pembahasan:
        'Berdasarkan aturan prioritas operasi hitung, perkalian dikerjakan terlebih dahulu sebelum penjumlahan:\n(-12) × 3 = -36\nSelanjutnya: (-15) + (-36) = -51.'
    },
    {
      no: 4,
      indikatorKritis: 'Representasi Bilangan Positif & Negatif',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Kedalaman di Bawah Permukaan Laut',
      stimulus:
        'Sebuah kapal selam mula-mula berada di kedalaman 200 meter di bawah permukaan laut. Kapal tersebut kemudian bergerak naik setinggi 75 meter.',
      mathBox: 'Posisi awal = -200 m  ·  Bergerak naik = +75 m',
      pertanyaan: 'Posisi kapal selam sekarang berada pada...',
      options: [
        '275 meter di bawah permukaan laut',
        '125 meter di bawah permukaan laut',
        '125 meter di atas permukaan laut',
        '275 meter di atas permukaan laut'
      ],
      kunciIndex: 1,
      pembahasan:
        'Kedalaman 200 meter di bawah permukaan laut dinyatakan sebagai -200. Naik 75 meter dinyatakan sebagai +75. Maka posisi akhir = -200 + 75 = -125 meter, yang artinya 125 meter di bawah permukaan laut.'
    },
    {
      no: 5,
      indikatorKritis: 'Substitusi Aljabar Bilangan Bulat',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Operasi Pengurangan & Perkalian',
      stimulus: 'Diketahui dua bilangan bulat yaitu a = -4 dan b = 3.',
      mathBox: 'a = -4  dan  b = 3  →  Hitunglah 2a - b',
      pertanyaan: 'Nilai dari 2a - b adalah...',
      options: ['-11', '-5', '5', '11'],
      kunciIndex: 0,
      pembahasan:
        'Substitusikan a = -4 dan b = 3 ke dalam bentuk 2a - b:\n2(-4) - 3 = -8 - 3 = -8 + (-3) = -11.'
    },
    {
      no: 6,
      indikatorKritis: 'Konsep Nilai Mutlak & Jarak pada Garis Bilangan',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Nilai Mutlak & Posisi pada Garis Bilangan',
      stimulus:
        'Pada garis bilangan, titik P terletak pada angka -7 dan titik Q terletak pada angka 4. Titik R terletak tepat di tengah-tengah jarang antara -8 dan 2.',
      pertanyaan:
        'Jarak antara titik P dan titik Q serta posisi titik R berturut-turut adalah...',
      options: [
        'Jarak P ke Q = 3 satuan dan R = -3',
        'Jarak P ke Q = 11 satuan dan R = -3',
        'Jarak P ke Q = 11 satuan dan R = -5',
        'Jarak P ke Q = -11 satuan dan R = 3'
      ],
      kunciIndex: 1,
      pembahasan:
        'Jarak antara P(-7) dan Q(4) adalah |4 - (-7)| = |4 + 7| = 11 satuan. Titik tengah R antara -8 dan 2 adalah (-8 + 2) / 2 = -6 / 2 = -3.'
    },
    {
      no: 7,
      indikatorKritis: 'Sifat Distributif untuk Perhitungan Cepat',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Sifat Distributif Perkalian',
      stimulus:
        'Untuk menghitung (-18) × 73 + (-18) × 27 tanpa kalkulator secara cepat, seorang siswa menggunakan sifat distributif.',
      mathBox: '(-18) × 73 + (-18) × 27 = (-18) × (73 + 27)',
      pertanyaan: 'Hasil akhir perhitungan tersebut adalah...',
      options: ['-1.800', '-1.620', '1.800', '-900'],
      kunciIndex: 0,
      pembahasan:
        'Gunakan sifat distributif a × b + a × c = a × (b + c):\n(-18) × 73 + (-18) × 27 = (-18) × (73 + 27) = (-18) × 100 = -1.800.'
    },
    {
      no: 8,
      indikatorKritis: 'Perpangkatan Bilangan Bulat Negatif',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Perbedaan (-a)² dan -a²',
      stimulus:
        'Dalam diskusi kelompok Pertemuan 7, guru meminta siswa membandingkan nilai P = (-3)² dan Q = -3² serta R = (-2)³.',
      mathBox: 'P = (-3)²  ·  Q = -3²  ·  R = (-2)³',
      pertanyaan: 'Nilai dari P + Q - R yang benar adalah...',
      options: ['-10', '8', '10', '26'],
      kunciIndex: 1,
      pembahasan:
        'Perhatikan tanda kurung pada perpangkatan:\n• P = (-3)² = (-3) × (-3) = 9\n• Q = -3² = -(3 × 3) = -9\n• R = (-2)³ = (-2) × (-2) × (-2) = -8\nMaka P + Q - R = 9 + (-9) - (-8) = 0 + 8 = 8.'
    },
    {
      no: 9,
      indikatorKritis: 'Operasi Campuran Perkalian dan Pembagian',
      levelKognitif: 'C3 (Menerapkan)',
      topik: 'Urutan Operasi Setara Kiri ke Kanan',
      stimulus:
        'Perhatikan operasi campuran perkalian dan pembagian berikut: 48 ÷ (-6) × (-3).',
      mathBox: '48 ÷ (-6) × (-3)',
      pertanyaan: 'Hasil yang tepat dari operasi tersebut adalah...',
      options: ['-24', '-2,67', '2,67', '24'],
      kunciIndex: 3,
      pembahasan:
        'Pembagian dan perkalian setara kuatnya, sehingga wajib dikerjakan urut dari kiri ke kanan:\nLangkah 1: 48 ÷ (-6) = -8\nLangkah 2: (-8) × (-3) = 24.'
    },
    {
      no: 10,
      indikatorKritis: 'Pemecahan Masalah Perubahan Suhu Berkala',
      levelKognitif: 'C4 (Menganalisis)',
      topik: 'Aplikasi Operasi Hitung Campuran pada IPA',
      stimulus:
        'Sebongkah daging dikeluarkan dari freezer dengan suhu awal -14°C. Saat didiamkan di suhu ruang, suhunya naik 3°C setiap 4 menit.',
      mathBox: 'Suhu awal = -14°C · Kenaikan = +3°C setiap 4 menit',
      pertanyaan:
        'Berapakah suhu daging tersebut setelah didiamkan selama 24 menit?',
      options: ['4°C', '10°C', '18°C', '-4°C'],
      kunciIndex: 0,
      pembahasan:
        'Banyaknya periode kenaikan suhu selama 24 menit adalah 24 ÷ 4 = 6 kali.\nTotal kenaikan suhu = 6 × 3°C = 18°C.\nSuhu akhir daging = -14°C + 18°C = 4°C.'
    }
  ],
  uraian: [
    {
      no: 1,
      judulKasus: 'Analisis Skor Kompetisi Matematika Rina',
      indikatorKritis: 'Pemecahan Masalah Operasi Hitung Campuran',
      levelKognitif: 'C4 (Menganalisis)',
      skorMaksimal: 35,
      permasalahan:
        'Dalam sebuah kompetisi matematika, setiap jawaban benar diberi skor 4, jawaban salah diberi skor -2, dan tidak dijawab diberi skor -1. Dari 40 soal yang diberikan, Rina menjawab 35 soal, di mana 28 soal di antaranya dijawab dengan benar.',
      rincianPertanyaan: [
        'a) Tentukan banyaknya soal yang dijawab salah dan banyaknya soal yang tidak dijawab oleh Rina!',
        'b) Tuliskan kalimat matematika operasi hitung campuran untuk menghitung total skor Rina!',
        'c) Berapakah total skor akhir yang diperoleh Rina?'
      ],
      langkahPembahasan: [
        'a) Banyak soal benar = 28 soal.\n   Banyak soal salah = 35 - 28 = 7 soal.\n   Banyak soal tidak dijawab = 40 - 35 = 5 soal.',
        'b) Kalimat matematika: Total Skor = (28 × 4) + (7 × (-2)) + (5 × (-1)).',
        'c) Perhitungan:\n   • Skor benar = 28 × 4 = 112\n   • Skor salah = 7 × (-2) = -14\n   • Skor tidak dijawab = 5 × (-1) = -5\n   • Total Skor = 112 + (-14) + (-5) = 93 poin.'
      ],
      kesimpulanKunci: 'Total skor yang diperoleh Rina adalah 93 poin.'
    },
    {
      no: 2,
      judulKasus: 'Evaluasi Literasi Finansial Pedagang Buah Tiga Hari',
      indikatorKritis: 'Pemodelan Untung-Rugi dengan Bilangan Bulat',
      levelKognitif: 'C4 (Menganalisis)',
      skorMaksimal: 35,
      permasalahan:
        'Seorang pedagang buah mengalami kerugian sebesar Rp50.000 pada hari pertama. Pada hari kedua, ia mendapat keuntungan sebesar Rp120.000. Pada hari ketiga, ia kembali mengalami kerugian sebesar Rp35.000.',
      rincianPertanyaan: [
        'a) Nyatakan keuntungan dan kerugian pada masing-masing hari sebagai bilangan bulat!',
        'b) Hitunglah kondisi keuangan bersih pedagang tersebut setelah tiga hari!',
        'c) Berapakah minimal keuntungan yang harus diperoleh pada hari keempat agar total keuntungan bersih selama 4 hari mencapai Rp100.000?'
      ],
      langkahPembahasan: [
        'a) Representasi bilangan bulat:\n   • Hari ke-1 (Rugi Rp50.000) = -50.000\n   • Hari ke-2 (Untung Rp120.000) = +120.000\n   • Hari ke-3 (Rugi Rp35.000) = -35.000',
        'b) Kondisi keuangan setelah 3 hari:\n   (-50.000) + 120.000 + (-35.000) = 70.000 + (-35.000) = +35.000 (Untung bersih Rp35.000).',
        'c) Agar total 4 hari menjadi +100.000, maka keuntungan hari ke-4 minimal adalah 100.000 - 35.000 = Rp65.000.'
      ],
      kesimpulanKunci:
        'Setelah tiga hari pedagang mengalami keuntungan bersih sebesar Rp35.000.'
    },
    {
      no: 3,
      judulKasus: 'Pembuktian Sifat Distributif Perkalian terhadap Penjumlahan',
      indikatorKritis: 'Penalaran Konseptual & Prosedural',
      levelKognitif: 'C5 (Membuktikan)',
      skorMaksimal: 30,
      permasalahan:
        'Jelaskan sifat distributif perkalian terhadap penjumlahan pada bilangan bulat dan buktikan kebenarannya menggunakan bilangan (-5) × (4 + 8)!',
      rincianPertanyaan: [
        'a) Tuliskan rumus umum sifat distributif perkalian terhadap penjumlahan untuk sebarang bilangan bulat a, b, dan c!',
        'b) Hitunglah nilai (-5) × (4 + 8) dengan menjumlahkan angka di dalam kurung terlebih dahulu!',
        'c) Hitunglah nilai (-5) × (4 + 8) dengan menjabarkan sifat distributif, lalu bandingkan hasilnya!'
      ],
      langkahPembahasan: [
        'a) Rumus umum sifat distributif: a × (b + c) = (a × b) + (a × c).',
        'b) Cara 1 (Menjumlahkan di dalam kurung dulu):\n   (-5) × (4 + 8) = (-5) × 12 = -60.',
        'c) Cara 2 (Menggunakan sifat distributif):\n   ((-5) × 4) + ((-5) × 8) = (-20) + (-40) = -60.\n   Kedua cara menghasilkan nilai yang sama persis yaitu -60 (terbukti).'
      ],
      kesimpulanKunci:
        'Sifat distributif berlaku pada bilangan bulat di mana (-5) × (4 + 8) = ((-5) × 4) + ((-5) × 8) = -60.'
    }
  ]
};
