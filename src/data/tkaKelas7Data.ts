export type TkaQuestionType = 'BS' | 'PG' | 'URAIAN';
export type TkaDifficulty = 'Mudah' | 'Sedang' | 'Menengah-Tinggi / Kontekstual' | 'HOTS Model TKA';
export type TkaMaterialGroup = 'Bilangan Bulat' | 'Pecahan';

export interface TkaQuestion {
  no: number;
  type: TkaQuestionType;
  materi: TkaMaterialGroup;
  submateri: string;
  involvesOperasiHitung: boolean;
  isHotsOrReasoning: boolean;
  indikator: string;
  levelKognitif: string;
  kesulitan: TkaDifficulty;
  stimulusTitle?: string;
  stimulusText: string;
  stimulusTable?: {
    headers: string[];
    rows: string[][];
  };
  pertanyaan: string;
  // For BS: options are ['BENAR', 'SALAH'], correctIndex 0 = BENAR, 1 = SALAH
  // For PG: options are 4 choices, correctIndex 0..3
  options?: string[];
  correctIndex?: number;
  kunciLabel: string;
  pembahasan: string;
  // For URAIAN:
  jawabanIdeal?: string;
  langkahPenyelesaian?: string[];
  kataKunciSkor?: {
    angkaUtama: string[];
    konsepKata: string[];
  };
  rubrik?: {
    skor4: string;
    skor3: string;
    skor2: string;
    skor1: string;
    skor0: string;
  };
}

export const TKA_META = {
  judulUtama: 'ASESMEN TENGAH SEMESTER GANJIL',
  subJudulMapel: 'MATEMATIKA KELAS 7',
  topikBab: 'BILANGAN BULAT DAN PECAHAN',
  pengembang: 'NUR WAKHID',
  sekolah: 'SMP Negeri 2 Karangbinangun',
  kelas: 'VII (Tujuh)',
  semester: 'GANJIL',
  durasiMenit: 45,
  jumlahSoal: 25
};

export const TKA_QUESTIONS: TkaQuestion[] = [
  // =========================================================================
  // BAGIAN A: 5 SOAL BENAR / SALAH (NOMOR 1 - 5)
  // Distribusi: 2 Mudah, 1 Sedang, 2 Penalaran/HOTS
  // =========================================================================
  {
    no: 1,
    type: 'BS',
    materi: 'Bilangan Bulat',
    submateri: 'Membandingkan Bilangan Bulat pada Garis Bilangan',
    involvesOperasiHitung: false,
    isHotsOrReasoning: false,
    indikator: 'Disajikan tabel suhu empat daerah, siswa dapat menentukan kebenaran perbandingan dua suhu negatif berdasarkan letaknya pada garis bilangan.',
    levelKognitif: 'L1 (Pemahaman)',
    kesulitan: 'Mudah',
    stimulusTitle: 'Data Suhu Udara Pagi Hari',
    stimulusText: 'Badan Meteorologi mencatat suhu udara pagi hari di empat lokasi sebagai berikut:',
    stimulusTable: {
      headers: ['Lokasi Daerah', 'Suhu Udara (°C)'],
      rows: [
        ['Puncak Jaya', '-4°C'],
        ['Dataran Tinggi Dieng', '-1°C'],
        ['Kawasan Bromo', '3°C'],
        ['Karangbinangun', '26°C']
      ]
    },
    pertanyaan: 'Berdasarkan informasi pada tabel tersebut, tentukan apakah pernyataan berikut BENAR atau SALAH:\n“Suhu udara di Puncak Jaya lebih dingin daripada suhu udara di Dataran Tinggi Dieng karena pada garis bilangan mendatar, letak bilangan -4 berada di sebelah kiri bilangan -1.”',
    options: ['BENAR', 'SALAH'],
    correctIndex: 0,
    kunciLabel: 'BENAR',
    pembahasan: 'Pada garis bilangan mendatar, semakin ke kiri letak suatu bilangan bulat maka nilainya semakin kecil. Karena -4 terletak di sebelah kiri -1, maka -4 < -1 sehingga suhu -4°C di Puncak Jaya memang lebih dingin daripada -1°C di Dataran Tinggi Dieng.'
  },
  {
    no: 2,
    type: 'BS',
    materi: 'Pecahan',
    submateri: 'Membandingkan Pecahan Biasa dan Persen',
    involvesOperasiHitung: false,
    isHotsOrReasoning: false,
    indikator: 'Disajikan data capaian pengumpulan beras dalam bentuk pecahan biasa dan persen, siswa dapat menguji kebenaran perbandingan kedua nilai pecahan tersebut.',
    levelKognitif: 'L1 (Pemahaman)',
    kesulitan: 'Mudah',
    stimulusTitle: 'Kegiatan Bakti Sosial Sekolah',
    stimulusText: 'Dalam kegiatan bakti sosial di SMP Negeri 2 Karangbinangun, setiap kelas diberi target pengumpulan beras yang sama banyak. Hingga hari Rabu, Kelas VII-A telah mengumpulkan 3/5 bagian dari target, sedangkan Kelas VII-B telah mengumpulkan 65% dari target.',
    pertanyaan: 'Berdasarkan informasi tersebut, tentukan apakah pernyataan berikut BENAR atau SALAH:\n“Capaian pengumpulan beras Kelas VII-A sudah lebih banyak daripada capaian Kelas VII-B.”',
    options: ['BENAR', 'SALAH'],
    correctIndex: 1,
    kunciLabel: 'SALAH',
    pembahasan: 'Jika diubah ke dalam bentuk persen, capaian Kelas VII-A adalah (3/5) × 100% = 60%. Karena 60% < 65%, maka capaian Kelas VII-A lebih sedikit daripada Kelas VII-B. Dengan demikian pernyataan tersebut SALAH.'
  },
  {
    no: 3,
    type: 'BS',
    materi: 'Bilangan Bulat',
    submateri: 'Operasi Hitung Campuran Bilangan Bulat',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Disajikan dua ekspresi operasi hitung campuran bilangan bulat dengan dan tanpa tanda kurung, siswa dapat mengevaluasi kesamaan hasil keduanya.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Sedang',
    stimulusTitle: 'Perbandingan Dua Ekspresi Matematika',
    stimulusText: 'Saat diskusi kelompok, Raka dan Bima menuliskan dua operasi hitung bilangan bulat yang tampak mirip:\n• Operasi Raka :  -18 + 12 ÷ (-3)\n• Operasi Bima :  (-18 + 12) ÷ (-3)',
    pertanyaan: 'Berdasarkan aturan urutan operasi hitung campuran, tentukan apakah pernyataan berikut BENAR atau SALAH:\n“Kedua operasi hitung yang ditulis Raka dan Bima menghasilkan nilai akhir yang sama, yaitu 2.”',
    options: ['BENAR', 'SALAH'],
    correctIndex: 1,
    kunciLabel: 'SALAH',
    pembahasan: 'Pada Operasi Raka, pembagian wajib dikerjakan lebih dahulu: -18 + (12 ÷ (-3)) = -18 + (-4) = -22. Sedangkan pada Operasi Bima, operasi di dalam tanda kurung dikerjakan lebih dahulu: (-18 + 12) ÷ (-3) = (-6) ÷ (-3) = 2. Karena -22 ≠ 2, maka pernyataan tersebut SALAH.'
  },
  {
    no: 4,
    type: 'BS',
    materi: 'Bilangan Bulat',
    submateri: 'Penalaran Sifat Operasi dan Garis Bilangan',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menganalisis tanda hasil operasi aljabar (p + q) × (p - q) berdasarkan posisi relatif dua bilangan bulat pada garis bilangan.',
    levelKognitif: 'L3 (Penalaran / HOTS)',
    kesulitan: 'HOTS Model TKA',
    stimulusTitle: 'Analisis Posisi Titik pada Garis Bilangan',
    stimulusText: 'Diketahui p dan q adalah dua bilangan bulat bukan nol pada garis bilangan mendatar:\n1) Titik p terletak di sebelah kiri titik 0.\n2) Titik q terletak di sebelah kanan titik 0.\n3) Jarak titik p ke titik 0 lebih jauh daripada jarak titik q ke titik 0.',
    pertanyaan: 'Berdasarkan ketiga informasi di atas, tentukan apakah kesimpulan berikut BENAR atau SALAH:\n“Nilai dari hasil operasi (p + q) × (p - q) pasti selalu berupa bilangan bulat POSITIF.”',
    options: ['BENAR', 'SALAH'],
    correctIndex: 0,
    kunciLabel: 'BENAR',
    pembahasan: 'Dari informasi diketahui p < 0 (negatif), q > 0 (positif), dan |p| > |q| (contoh: p = -6 dan q = 2).\n• Nilai (p + q) pasti NEGATIF karena jarak p ke nol lebih besar daripada q (contoh: -6 + 2 = -4).\n• Nilai (p - q) juga pasti NEGATIF karena bilangan negatif dikurangi bilangan positif semakin ke kiri (contoh: -6 - 2 = -8).\n• Perkalian dua bilangan negatif (-) × (-) menghasilkan bilangan bulat POSITIF (-4 × -8 = +32). Jadi pernyataan tersebut BENAR.'
  },
  {
    no: 5,
    type: 'BS',
    materi: 'Pecahan',
    submateri: 'Masalah Kontekstual Operasi Campuran Pecahan',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Mengevaluasi kecukupan bahan makanan setelah mengalami pengurangan bagian pecahan dan penambahan pecahan baru.',
    levelKognitif: 'L3 (Penalaran / HOTS)',
    kesulitan: 'HOTS Model TKA',
    stimulusTitle: 'Persediaan Tepung Terigu untuk Membuat Roti',
    stimulusText: 'Ibu memiliki persediaan tepung terigu sebanyak 2 ½ kg di dapur. Sebanyak 2/5 bagian dari persediaan tepung tersebut digunakan untuk membuat kue bolu. Sore harinya, Ibu membeli lagi ¾ kg tepung terigu. Untuk membuat satu loyang roti manis esok pagi, diperlukan tepat 2 ¼ kg tepung terigu.',
    pertanyaan: 'Berdasarkan situasi tersebut, tentukan apakah pernyataan berikut BENAR atau SALAH:\n“Persediaan tepung terigu Ibu sekarang sudah mencukupi untuk membuat satu loyang roti manis tanpa perlu membeli tambahan lagi.”',
    options: ['BENAR', 'SALAH'],
    correctIndex: 0,
    kunciLabel: 'BENAR',
    pembahasan: 'Mari kita buktikan langkah demi langkah:\n1) Persediaan awal = 2 ½ kg = 5/2 kg = 2,5 kg.\n2) Tepung yang dipakai membuat bolu = (2/5) × (5/2) kg = 1 kg.\n3) Sisa tepung = 2,5 kg - 1 kg = 1,5 kg.\n4) Ditambah pembelian baru ¾ kg (0,75 kg) = 1,5 + 0,75 = 2,25 kg = 2 ¼ kg.\nKarena kebutuhan membuat satu loyang roti manis adalah 2 ¼ kg, maka persediaan tepung Ibu tepat mencukupi. Pernyataan BENAR.'
  },

  // =========================================================================
  // BAGIAN B: 15 SOAL PILIHAN GANDA (NOMOR 6 - 20)
  // =========================================================================
  {
    no: 6,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Bilangan Positif dan Negatif dalam Konteks Ketinggian',
    involvesOperasiHitung: false,
    isHotsOrReasoning: false,
    indikator: 'Menginterpretasikan posisi objek di atas dan di bawah permukaan laut ke dalam lambang bilangan bulat positif dan negatif.',
    levelKognitif: 'L1 (Pemahaman)',
    kesulitan: 'Mudah',
    stimulusTitle: 'Observasi Ekosistem Laut',
    stimulusText: 'Dalam sebuah dokumentasi bawah laut, seekor ikan pari terlihat berenang pada kedalaman 18 meter di bawah permukaan laut, sementara seekor burung camar terbang tepat pada ketinggian 12 meter di atas permukaan laut. Permukaan air laut ditetapkan sebagai titik acuan 0 meter.',
    pertanyaan: 'Berdasarkan informasi tersebut, penulisan posisi ikan pari dan burung camar secara berturut-turut menggunakan bilangan bulat yang benar adalah...',
    options: [
      '18 meter dan -12 meter',
      '-18 meter dan 12 meter',
      '-18 meter dan -12 meter',
      '12 meter dan -18 meter'
    ],
    correctIndex: 1,
    kunciLabel: 'B',
    pembahasan: 'Posisi di bawah permukaan laut (titik acuan 0) dinyatakan dengan bilangan bulat negatif (-18 meter), sedangkan posisi di atas permukaan laut dinyatakan dengan bilangan bulat positif (12 meter).'
  },
  {
    no: 7,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Mengurutkan Bilangan Bulat',
    involvesOperasiHitung: false,
    isHotsOrReasoning: false,
    indikator: 'Mengurutkan empat data suhu bilangan bulat dari nilai terkecil ke terbesar.',
    levelKognitif: 'L1 (Pemahaman)',
    kesulitan: 'Mudah',
    stimulusTitle: 'Pemeriksaan Suhu Lemari Pendingin',
    stimulusText: 'Petugas laboratorium memeriksa empat unit lemari pendingin dan mencatat suhunya:\n• Lemari P : -9°C\n• Lemari Q : -14°C\n• Lemari R : 2°C\n• Lemari S : -5°C',
    pertanyaan: 'Urutan lemari pendingin mulai dari yang memiliki suhu PALING DINGIN hingga PALING HANGAT adalah...',
    options: [
      'Lemari S, Lemari P, Lemari Q, Lemari R',
      'Lemari R, Lemari S, Lemari P, Lemari Q',
      'Lemari Q, Lemari P, Lemari S, Lemari R',
      'Lemari Q, Lemari S, Lemari P, Lemari R'
    ],
    correctIndex: 2,
    kunciLabel: 'C',
    pembahasan: 'Suhu paling dingin ditunjukkan oleh bilangan bulat terkecil. Urutan bilangan dari terkecil ke terbesar adalah -14°C (Q), -9°C (P), -5°C (S), dan 2°C (R). Jadi urutannya adalah Lemari Q, Lemari P, Lemari S, Lemari R.'
  },
  {
    no: 8,
    type: 'PG',
    materi: 'Pecahan',
    submateri: 'Pecahan Senilai dan Menyederhanakan Pecahan Desimal',
    involvesOperasiHitung: false,
    isHotsOrReasoning: false,
    indikator: 'Mengubah bentuk pecahan desimal menjadi pecahan biasa paling sederhana dalam konteks pengukuran volume.',
    levelKognitif: 'L1 (Pemahaman)',
    kesulitan: 'Mudah',
    stimulusTitle: 'Takaran Larutan Praktikum IPA',
    stimulusText: 'Saat praktikum IPA di SMP Negeri 2 Karangbinangun, kelompok Siti menuangkan cairan indikator ke dalam gelas ukur hingga menunjukkan angka 0,375 liter.',
    pertanyaan: 'Bentuk pecahan biasa paling sederhana yang senilai dengan volume cairan dalam gelas ukur tersebut adalah...',
    options: [
      '3/8 liter',
      '3/4 liter',
      '5/8 liter',
      '7/16 liter'
    ],
    correctIndex: 0,
    kunciLabel: 'A',
    pembahasan: '0,375 = 375/1000. Jika pembilang dan penyebut dibagi dengan FPB-nya yaitu 125, diperoleh: (375 ÷ 125) / (1000 ÷ 125) = 3/8 liter.'
  },
  {
    no: 9,
    type: 'PG',
    materi: 'Pecahan',
    submateri: 'Mengurutkan Berbagai Bentuk Pecahan',
    involvesOperasiHitung: false,
    isHotsOrReasoning: false,
    indikator: 'Mengurutkan empat pecahan berbeda bentuk (pecahan biasa, desimal, dan persen) berdasarkan konteks jarak lari siswa.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Mudah',
    stimulusTitle: 'Catatan Jarak Lari Olahraga',
    stimulusText: 'Empat siswa berlari mengelilingi lapangan olahraga selama 4 menit. Berikut bagian lintasan yang berhasil ditempuh masing-masing siswa:',
    stimulusTable: {
      headers: ['Nama Siswa', 'Bagian Lintasan yang Ditempuh'],
      rows: [
        ['Andi', '3/4 bagian lintasan'],
        ['Bela', '0,7 bagian lintasan'],
        ['Ciko', '78% bagian lintasan'],
        ['Dinda', '4/5 bagian lintasan']
      ]
    },
    pertanyaan: 'Berdasarkan tabel tersebut, urutan siswa dari yang menempuh jarak TERPENDEK hingga TERJAUH adalah...',
    options: [
      'Bela, Andi, Ciko, Dinda',
      'Andi, Bela, Ciko, Dinda',
      'Bela, Ciko, Andi, Dinda',
      'Dinda, Ciko, Andi, Bela'
    ],
    correctIndex: 0,
    kunciLabel: 'A',
    pembahasan: 'Ubah seluruh data ke bentuk desimal dua angka di belakang koma:\n• Andi = 3/4 = 0,75\n• Bela = 0,7 = 0,70\n• Ciko = 78% = 0,78\n• Dinda = 4/5 = 0,80\nUrutan dari yang terpendek ke terjauh adalah 0,70 (Bela); 0,75 (Andi); 0,78 (Ciko); dan 0,80 (Dinda).'
  },
  {
    no: 10,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Penjumlahan dan Pengurangan Bilangan Bulat',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Menentukan posisi akhir objek yang mengalami beberapa kali perpindahan vertikal menggunakan penjumlahan dan pengurangan bilangan bulat.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Sedang',
    stimulusTitle: 'Navigasi Drone Pemetaan Desa',
    stimulusText: 'Sebuah drone pemetaan awalnya mengudara pada ketinggian 45 meter di atas permukaan tanah. Untuk menghindari hembusan angin, operator menurunkan drone sejauh 18 meter, kemudian menaikkan kembali setinggi 12 meter, dan terakhir menurunkan lagi sejauh 25 meter.',
    pertanyaan: 'Berapakah ketinggian drone tersebut sekarang diukur dari permukaan tanah?',
    options: [
      '26 meter',
      '20 meter',
      '14 meter',
      '10 meter'
    ],
    correctIndex: 2,
    kunciLabel: 'C',
    pembahasan: 'Model matematika perubahan ketinggian drone:\n45 - 18 + 12 - 25 = 27 + 12 - 25 = 39 - 25 = 14 meter di atas permukaan tanah.'
  },
  {
    no: 11,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Operasi Campuran Bilangan Bulat',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Menentukan strategi langkah pengerjaan dan hasil yang tepat pada operasi hitung campuran bilangan bulat.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Sedang',
    stimulusTitle: 'Tantangan Kuis Cepat Tepat',
    stimulusText: 'Pada babak penyisihan kuis matematika kelas VII, tertulis operasi hitung berikut di papan tulis:\n(-24) ÷ 6 - (-3) × 5',
    pertanyaan: 'Strategi penyelesaian beserta hasil akhir yang paling tepat untuk soal tersebut adalah...',
    options: [
      'Hitung (-24) ÷ 6 = -4 dan (-3) × 5 = -15 terlebih dahulu, kemudian hitung -4 - (-15) = 11',
      'Hitung (-24) ÷ 6 = -4 dan (-3) × 5 = -15 terlebih dahulu, kemudian hitung -4 - (-15) = -19',
      'Kurangkan 6 dengan (-3) terlebih dahulu menjadi 9, lalu hitung (-24) ÷ 9 × 5',
      'Hitung (-24) ÷ 6 = 4, kemudian dikurangi 15 sehingga diperoleh hasil -11'
    ],
    correctIndex: 0,
    kunciLabel: 'A',
    pembahasan: 'Sesuai prioritas operasi hitung, pembagian dan perkalian dikerjakan terlebih dahulu:\n1) (-24) ÷ 6 = -4\n2) (-3) × 5 = -15\n3) Selanjutnya operasi pengurangan: -4 - (-15) = -4 + 15 = 11.'
  },
  {
    no: 12,
    type: 'PG',
    materi: 'Pecahan',
    submateri: 'Penjumlahan dan Pengurangan Pecahan Campuran & Desimal',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Menyelesaikan masalah kontekstual yang melibatkan penjumlahan dan pengurangan pecahan campuran serta desimal.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Sedang',
    stimulusTitle: 'Bekal Air Minum Regu Pramuka',
    stimulusText: 'Saat kegiatan penjelajahan Pramuka, Regu Rajawali membawa tiga botol besar air minum yang masing-masing berisi 1 ½ liter, 1 ¾ liter, dan 1,25 liter. Selama perjalanan, seluruh anggota regu telah meminum air sebanyak 2 ⅖ liter.',
    pertanyaan: 'Volume air minum Regu Rajawali yang masih tersisa di dalam botol adalah...',
    options: [
      '1,90 liter',
      '2,10 liter',
      '2,25 liter',
      '2,35 liter'
    ],
    correctIndex: 1,
    kunciLabel: 'B',
    pembahasan: 'Konversikan ke bentuk desimal agar perhitungan lebih efisien:\n• Total air dibawa = 1,5 + 1,75 + 1,25 = 4,50 liter.\n• Air yang diminum = 2 ⅖ liter = 2,40 liter.\n• Sisa air minum = 4,50 - 2,40 = 2,10 liter.'
  },
  {
    no: 13,
    type: 'PG',
    materi: 'Pecahan',
    submateri: 'Perkalian dan Pembagian Pecahan',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Menyelesaikan masalah pengemasan cairan menggunakan operasi perkalian dan pembagian pecahan.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Sedang',
    stimulusTitle: 'Pengemasan Cairan Antiseptik UKS',
    stimulusText: 'Petugas UKS memiliki persediaan 3 ½ liter cairan antiseptik di dalam jeriken. Sebanyak 6/7 bagian dari cairan tersebut akan dipindahkan ke dalam botol-botol semprot kecil hingga penuh. Setiap botol semprot kecil memiliki kapasitas 3/8 liter.',
    pertanyaan: 'Banyaknya botol semprot kecil yang berhasil diisi penuh adalah...',
    options: [
      '6 botol',
      '7 botol',
      '8 botol',
      '9 botol'
    ],
    correctIndex: 2,
    kunciLabel: 'C',
    pembahasan: 'Langkah 1: Hitung volume cairan yang dipindahkan:\n(6/7) × 3 ½ = (6/7) × (7/2) = 3 liter.\nLangkah 2: Bagi volume tersebut dengan kapasitas tiap botol kecil:\n3 ÷ (3/8) = 3 × (8/3) = 8 botol.'
  },
  {
    no: 14,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Masalah Kontekstual Perubahan Suhu Berkala',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menganalisis perubahan suhu benda secara berkala untuk menarik kesimpulan waktu titik lebur dan suhu akhir.',
    levelKognitif: 'L3 (Penalaran)',
    kesulitan: 'Menengah-Tinggi / Kontekstual',
    stimulusTitle: 'Percobaan Titik Lebur Es Krim',
    stimulusText: 'Suhu sebongkah es krim saat baru dikeluarkan dari freezer adalah -12°C. Ketika diletakkan di atas meja ruang terbuka, suhu es krim tersebut naik secara teratur sebesar 3°C setiap 4 menit. Es krim diketahui mulai mencair tepat pada saat suhunya mencapai 0°C.',
    pertanyaan: 'Berdasarkan informasi tersebut, manakah kesimpulan yang PALING TEPAT mengenai kondisi es krim setelah berada di ruang terbuka selama 20 menit?',
    options: [
      'Es krim belum mencair karena suhunya baru mencapai -2°C',
      'Es krim tepat baru mulai mencair karena suhunya tepat 0°C',
      'Es krim sudah mulai mencair sejak 4 menit sebelumnya dan suhunya sekarang 3°C',
      'Es krim sudah mulai mencair sejak 8 menit sebelumnya dan suhunya sekarang 6°C'
    ],
    correctIndex: 2,
    kunciLabel: 'C',
    pembahasan: '• Dalam waktu 20 menit terjadi (20 ÷ 4) = 5 kali kenaikan suhu.\n• Suhu pada menit ke-20 = -12°C + (5 × 3°C) = -12°C + 15°C = 3°C.\n• Untuk mencapai 0°C (kenaikan 12°C dari -12°C), diperlukan (12 ÷ 3) = 4 kali kenaikan, yaitu pada menit ke-(4 × 4) = 16 menit.\n• Jadi pada menit ke-20, es krim sudah mencair sejak 4 menit sebelumnya (menit ke-16) dan suhunya kini 3°C.'
  },
  {
    no: 15,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Masalah Kontekstual Sistem Skor Kompetisi',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menentukan banyaknya jawaban benar jika diketahui total soal, jumlah soal yang dikerjakan, aturan skor, dan total nilai akhir.',
    levelKognitif: 'L3 (Penalaran)',
    kesulitan: 'Menengah-Tinggi / Kontekstual',
    stimulusTitle: 'Aturan Penskoran Olimpiade Sains',
    stimulusText: 'Panitia Olimpiade Matematika menerapkan aturan penskoran untuk 30 butir soal sebagai berikut:',
    stimulusTable: {
      headers: ['Kategori Jawaban', 'Skor per Soal'],
      rows: [
        ['Jawaban Benar', '+4 poin'],
        ['Jawaban Salah', '-2 poin'],
        ['Tidak Dijawab (Kosong)', '-1 poin']
      ]
    },
    pertanyaan: 'Dari 30 soal yang diberikan, Farhan menjawab 26 soal dan memperoleh total skor akhir 76 poin. Banyaknya soal yang dijawab BENAR oleh Farhan adalah...',
    options: [
      '20 soal',
      '21 soal',
      '22 soal',
      '23 soal'
    ],
    correctIndex: 2,
    kunciLabel: 'C',
    pembahasan: '• Soal tidak dijawab = 30 - 26 = 4 soal ⇒ skor kosong = 4 × (-1) = -4.\n• Andaikan semua 26 soal yang dijawab Farhan benar seluruhnya, skornya adalah (26 × 4) + (-4) = 104 - 4 = 100 poin.\n• Selisih skor maksimum dengan skor Farhan = 100 - 76 = 24 poin.\n• Setiap 1 soal salah (dibandingkan benar) mengurangi skor sebesar 4 - (-2) = 6 poin.\n• Banyak soal salah = 24 ÷ 6 = 4 soal.\n• Jadi banyak soal yang dijawab BENAR = 26 - 4 = 22 soal.'
  },
  {
    no: 16,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Literasi Finansial dan Mutasi Kas',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Menganalisis tabel transaksi pemasukan dan pengeluaran kas selama beberapa hari yang melibatkan saldo negatif (utang talangan).',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Menengah-Tinggi / Kontekstual',
    stimulusTitle: 'Catatan Kas Koperasi Siswa',
    stimulusText: 'Pengurus Koperasi Siswa SMP Negeri 2 Karangbinangun mencatat arus kas selama empat hari (jika pengeluaran melebihi saldo, kekurangan dicatat sebagai saldo negatif/dana talangan):',
    stimulusTable: {
      headers: ['Hari', 'Keterangan Transaksi'],
      rows: [
        ['Senin', 'Saldo awal Rp250.000, membeli stok buku tulis Rp310.000'],
        ['Selasa', 'Menerima hasil penjualan sebesar Rp185.000'],
        ['Rabu', 'Membeli 3 pak pulpen dengan harga Rp45.000 per pak'],
        ['Kamis', 'Menerima hasil penjualan sebesar Rp210.000']
      ]
    },
    pertanyaan: 'Berdasarkan tabel transaksi di atas, berapakah saldo akhir kas Koperasi Siswa pada hari Kamis sore?',
    options: [
      'Rp190.000',
      'Rp200.000',
      'Rp210.000',
      'Rp220.000'
    ],
    correctIndex: 1,
    kunciLabel: 'B',
    pembahasan: 'Mari kita hitung mutasi saldo setiap hari:\n• Senin : 250.000 - 310.000 = -60.000 (defisit/talangan Rp60.000)\n• Selasa : -60.000 + 185.000 = 125.000\n• Rabu : 125.000 - (3 × 45.000) = 125.000 - 135.000 = -10.000\n• Kamis : -10.000 + 210.000 = Rp200.000.'
  },
  {
    no: 17,
    type: 'PG',
    materi: 'Pecahan',
    submateri: 'Masalah Kontekstual Pembagian Luas Lahan',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Menentukan sisa luas lahan setelah dialokasikan dalam berbagai bentuk pecahan biasa dan persen.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Menengah-Tinggi / Kontekstual',
    stimulusTitle: 'Pemanfaatan Lahan Perkebunan Terpadu',
    stimulusText: 'Pak Hasan memiliki sebidang lahan seluas 600 m². Sebanyak 1/3 bagian dari lahan tersebut ditanami jagung, 2/5 bagian ditanami tanaman cabai, dan 15% bagian dibuat kolam budidaya ikan lele. Seluruh sisa lahan yang belum terpakai digunakan untuk taman apotek hidup.',
    pertanyaan: 'Berapakah luas lahan Pak Hasan yang digunakan untuk taman apotek hidup?',
    options: [
      '60 m²',
      '70 m²',
      '75 m²',
      '90 m²'
    ],
    correctIndex: 1,
    kunciLabel: 'B',
    pembahasan: 'Hitung luas masing-masing penggunaan lahan:\n• Lahan jagung = (1/3) × 600 m² = 200 m²\n• Lahan cabai = (2/5) × 600 m² = 240 m²\n• Kolam ikan = 15% × 600 m² = (15/100) × 600 = 90 m²\n• Total lahan terpakai = 200 + 240 + 90 = 530 m²\n• Luas taman apotek hidup = 600 m² - 530 m² = 70 m².'
  },
  {
    no: 18,
    type: 'PG',
    materi: 'Pecahan',
    submateri: 'Proporsi Takaran Bahan Makanan dalam Pecahan',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menghitung kebutuhan bahan dalam pecahan biasa dan desimal jika jumlah porsi resep diubah secara proporsional.',
    levelKognitif: 'L3 (Penalaran)',
    kesulitan: 'Menengah-Tinggi / Kontekstual',
    stimulusTitle: 'Resep Minuman Tradisional Nusantara',
    stimulusText: 'Untuk membuat 6 porsi minuman es dawet diperlukan bahan utama sebanyak ¾ liter santan segar dan 0,45 kg gula aren. Pada kegiatan bazar sekolah, kelompok prakarya mendapat pesanan untuk membuat 16 porsi minuman dengan takaran rasa yang persis sama.',
    pertanyaan: 'Banyaknya santan segar dan gula aren yang dibutuhkan untuk memenuhi pesanan 16 porsi tersebut secara berturut-turut adalah...',
    options: [
      '1,8 liter santan dan 1,05 kg gula aren',
      '2 liter santan dan 1,2 kg gula aren',
      '2,25 liter santan dan 1,2 kg gula aren',
      '2 liter santan dan 1,35 kg gula aren'
    ],
    correctIndex: 1,
    kunciLabel: 'B',
    pembahasan: 'Perbandingan jumlah porsi = 16 / 6 = 8/3 kali resep awal.\n• Kebutuhan santan = (8/3) × (3/4) liter = 2 liter.\n• Kebutuhan gula aren = (8/3) × 0,45 kg = 8 × 0,15 kg = 1,2 kg.'
  },
  {
    no: 19,
    type: 'PG',
    materi: 'Bilangan Bulat',
    submateri: 'Penalaran Pola Perpindahan Vertikal Berulang',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menganalisis pola gerak vertikal berulang pada bilangan bulat negatif dan menentukan tindakan koreksi untuk mencapai titik target.',
    levelKognitif: 'L3 (Penalaran / HOTS)',
    kesulitan: 'HOTS Model TKA',
    stimulusTitle: 'Kalibrasi Sonar Kapal Peneliti Bawah Laut',
    stimulusText: 'Sebuah kapal selam peneliti awalnya berada pada kedalaman 85 meter di bawah permukaan laut (-85 m). Kapal tersebut melakukan 4 tahap manuver vertikal:\n• Pada tahap ganjil (tahap ke-1 dan ke-3), kapal bergerak NAIK setinggi 32 meter.\n• Pada tahap genap (tahap ke-2 dan ke-4), kapal bergerak TURUN sedalam 19 meter.\nAgar sensor sonar dapat memindai terumbu karang dengan tajam, kapal harus berhenti tepat pada kedalaman 50 meter di bawah permukaan laut (-50 m).',
    pertanyaan: 'Setelah menyelesaikan keempat tahap manuver tersebut, tindakan manakah yang harus dilakukan nakhoda agar kapal tepat berada di posisi optimal sonar?',
    options: [
      'Menaikkan kapal setinggi 9 meter lagi',
      'Menurunkan kapal sedalam 9 meter lagi',
      'Menaikkan kapal setinggi 13 meter lagi',
      'Menurunkan kapal sedalam 13 meter lagi'
    ],
    correctIndex: 0,
    kunciLabel: 'A',
    pembahasan: '• Perubahan posisi selama 4 tahap = +32 - 19 + 32 - 19 = +26 meter.\n• Posisi kapal setelah 4 tahap = -85 + 26 = -59 meter (kedalaman 59 meter di bawah permukaan laut).\n• Target posisi optimal adalah -50 meter.\n• Selisih yang dibutuhkan = (-50) - (-59) = +9 meter. Tanda positif (+) berarti nakhoda harus MENAIKKAN kapal setinggi 9 meter lagi.'
  },
  {
    no: 20,
    type: 'PG',
    materi: 'Pecahan',
    submateri: 'Pengambilan Keputusan dari Berbagai Skema Potongan Pecahan & Persen',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Membandingkan empat skema promo harga dalam bentuk pecahan, persen, diskon bertingkat, dan desimal untuk mengambil keputusan pembelian paling hemat.',
    levelKognitif: 'L3 (Penalaran / HOTS)',
    kesulitan: 'HOTS Model TKA',
    stimulusTitle: 'Perbandingan Promo Toko Alat Tulis',
    stimulusText: 'Rina ingin membeli sebuah kalkulator ilmiah yang memiliki harga normal sama yaitu Rp160.000 di empat toko berbeda. Berikut skema promo yang ditawarkan setiap toko:',
    stimulusTable: {
      headers: ['Nama Toko', 'Skema Promo yang Ditawarkan'],
      rows: [
        ['Toko Cerdas', 'Potongan harga langsung sebesar 1/4 dari harga normal'],
        ['Toko Pintar', 'Diskon 20% ditambah potongan langsung voucher Rp10.000'],
        ['Toko Juara', 'Diskon bertingkat 15% + 10% (diskon 10% dihitung dari harga setelah diskon 15%)'],
        ['Toko Utama', 'Pembeli cukup membayar 0,78 bagian dari harga normal']
      ]
    },
    pertanyaan: 'Jika Rina ingin mengeluarkan uang PALING HEMAT, toko manakah yang harus ia pilih beserta nominal uang yang harus dibayarkan?',
    options: [
      'Toko Cerdas dengan membayar Rp120.000',
      'Toko Pintar dengan membayar Rp118.000',
      'Toko Juara dengan membayar Rp122.400',
      'Toko Utama dengan membayar Rp124.800'
    ],
    correctIndex: 1,
    kunciLabel: 'B',
    pembahasan: 'Mari kita evaluasi harga bersih di keempat toko:\n1) Toko Cerdas : membayar (1 - 1/4) × Rp160.000 = (3/4) × Rp160.000 = Rp120.000.\n2) Toko Pintar : harga setelah diskon 20% = 80% × Rp160.000 = Rp128.000; dikurangi voucher Rp10.000 = Rp118.000.\n3) Toko Juara : setelah diskon 15% menjadi 85% × Rp160.000 = Rp136.000; didiskon lagi 10% menjadi 90% × Rp136.000 = Rp122.400.\n4) Toko Utama : 0,78 × Rp160.000 = Rp124.800.\nJadi pilihan paling hemat adalah Toko Pintar dengan membayar Rp118.000.'
  },

  // =========================================================================
  // BAGIAN C: 5 SOAL URAIAN (NOMOR 21 - 25) — SKOR MAKSIMAL 4 PER SOAL
  // Minimal 3 dari 5 soal berbentuk masalah HOTS / kontekstual
  // =========================================================================
  {
    no: 21,
    type: 'URAIAN',
    materi: 'Bilangan Bulat',
    submateri: 'Operasi Campuran Bilangan Bulat pada Perubahan Suhu',
    involvesOperasiHitung: true,
    isHotsOrReasoning: false,
    indikator: 'Menyelesaikan masalah perubahan suhu bertahap menggunakan operasi hitung campuran bilangan bulat beserta langkah penyelesaiannya.',
    levelKognitif: 'L2 (Penerapan)',
    kesulitan: 'Sedang',
    stimulusTitle: 'Pengaturan Suhu Ruang Penyimpanan Ikan',
    stimulusText: 'Seorang teknisi ruang pendingin ikan mencatat suhu awal ruangan adalah 14°C. Saat mesin pendingin diaktifkan, suhu ruangan turun secara tetap sebesar 4°C setiap 5 menit. Setelah mesin menyala selama 30 menit, aliran listrik tiba-tiba padam selama 10 menit sehingga suhu ruangan naik kembali sebesar 3°C setiap 5 menit.',
    pertanyaan: 'Gunakan informasi pada stimulus untuk menentukan suhu akhir ruang pendingin tersebut setelah listrik padam selama 10 menit! Tunjukkan langkah penyelesaianmu secara lengkap!',
    kunciLabel: '-4°C',
    pembahasan: 'Suhu turun selama 30 menit sebesar (30 ÷ 5) × 4°C = 24°C sehingga menjadi 14°C - 24°C = -10°C. Saat listrik padam 10 menit, suhu naik (10 ÷ 5) × 3°C = 6°C. Suhu akhir = -10°C + 6°C = -4°C.',
    jawabanIdeal: 'Suhu akhir ruang pendingin setelah listrik padam selama 10 menit adalah -4°C.',
    langkahPenyelesaian: [
      'Langkah 1: Menghitung banyak tahapan penurunan suhu selama 30 menit = 30 ÷ 5 = 6 kali penurunan.',
      'Langkah 2: Menghitung suhu setelah 30 menit mesin menyala = 14°C - (6 × 4°C) = 14°C - 24°C = -10°C.',
      'Langkah 3: Menghitung kenaikan suhu selama 10 menit listrik padam = (10 ÷ 5) × 3°C = 2 × 3°C = 6°C.',
      'Langkah 4: Menghitung suhu akhir ruangan = -10°C + 6°C = -4°C.'
    ],
    kataKunciSkor: {
      angkaUtama: ['-4', '-10', '24'],
      konsepKata: ['turun', 'naik', 'derajat', 'suhu', 'menit']
    },
    rubrik: {
      skor4: 'Jawaban benar (-4°C), lengkap, dan seluruh langkah perhitungan penurunan serta kenaikan suhu ditulis jelas.',
      skor3: 'Konsep dan langkah perhitungan benar (menemukan -10°C), namun terdapat sedikit kesalahan hitung di langkah akhir.',
      skor2: 'Sebagian konsep benar (misalnya berhasil menghitung penurunan 24°C atau kenaikan 6°C saja).',
      skor1: 'Terdapat usaha menuliskan informasi soal tetapi konsep operasi bilangan bulat belum tepat.',
      skor0: 'Jawaban kosong atau sama sekali tidak relevan.'
    }
  },
  {
    no: 22,
    type: 'URAIAN',
    materi: 'Pecahan',
    submateri: 'Operasi Hitung Campuran Pecahan Kontekstual',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menentukan hasil pembagian sisa stok beras ke dalam kemasan pecahan setelah dikurangi bagian tertentu.',
    levelKognitif: 'L3 (Penalaran)',
    kesulitan: 'Menengah-Tinggi / Kontekstual',
    stimulusTitle: 'Distribusi Beras Koperasi Tani Karangbinangun',
    stimulusText: 'Koperasi Tani menerima kiriman beras dari petani sebanyak 4 ½ kuintal pada pagi hari dan 3,75 kuintal pada siang hari. Sebanyak 1/3 bagian dari total seluruh beras tersebut disalurkan langsung ke warung makan, sedangkan sisanya dikemas seluruhnya ke dalam karung-karung kecil dengan berat masing-masing ¼ kuintal.',
    pertanyaan: 'Berapakah banyaknya karung kecil yang berhasil dikemas oleh Koperasi Tani? Tunjukkan langkah penyelesaianmu dan jelaskan alasanmu!',
    kunciLabel: '22 karung',
    pembahasan: 'Total beras = 4,5 + 3,75 = 8,25 kuintal. Sisa beras setelah disalurkan 1/3 bagian adalah 2/3 × 8,25 = 5,5 kuintal. Banyak karung = 5,5 ÷ 0,25 = 22 karung.',
    jawabanIdeal: 'Banyaknya karung beras kecil yang berhasil dikemas adalah 22 karung.',
    langkahPenyelesaian: [
      'Langkah 1: Menghitung total beras yang diterima = 4 ½ + 3,75 = 4,5 + 3,75 = 8,25 kuintal (atau 33/4 kuintal).',
      'Langkah 2: Menghitung bagian beras yang tersisa untuk dikemas = 1 - 1/3 = 2/3 bagian.',
      'Langkah 3: Menghitung berat beras yang dikemas = (2/3) × (33/4) = 11/2 kuintal = 5,5 kuintal.',
      'Langkah 4: Menghitung banyak karung kecil = 5,5 ÷ ¼ = (11/2) × 4 = 22 karung.'
    ],
    kataKunciSkor: {
      angkaUtama: ['22', '8,25', '8.25', '5,5', '5.5'],
      konsepKata: ['kuintal', 'karung', 'sisa', 'total']
    },
    rubrik: {
      skor4: 'Jawaban benar (22 karung), lengkap, langkah penjumlahan, pengurangan bagian, dan pembagian pecahan ditulis jelas.',
      skor3: 'Konsep benar (menemukan sisa beras 5,5 kuintal), namun terdapat sedikit kekeliruan saat membagi dengan 1/4.',
      skor2: 'Sebagian konsep benar (berhasil menjumlahkan total beras 8,25 kuintal).',
      skor1: 'Terdapat usaha mengubah pecahan tetapi urutan operasi belum tepat.',
      skor0: 'Jawaban kosong atau tidak relevan.'
    }
  },
  {
    no: 23,
    type: 'URAIAN',
    materi: 'Bilangan Bulat',
    submateri: 'Penalaran dan Pengambilan Keputusan pada Skor Kompetisi',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menganalisis perbandingan skor dua tim dalam turnamen matematika dan menentukan jumlah minimal jawaban benar yang dibutuhkan untuk menang.',
    levelKognitif: 'L3 (Penalaran / HOTS)',
    kesulitan: 'HOTS Model TKA',
    stimulusTitle: 'Strategi Babak Final Cerdas Cermat Matematika',
    stimulusText: 'Pada babak final Lomba Cerdas Cermat SMP terdapat 25 butir soal dengan aturan penskoran:\n• Jawaban Benar = +5 poin\n• Jawaban Salah = -3 poin\n• Tidak Dijawab = -1 poin\nTim A menjawab 22 soal dan 18 soal di antaranya benar. Sementara itu, Tim B hanya menjawab 20 soal.',
    pertanyaan: 'Tentukan berapakah total skor Tim A, kemudian tentukan berapa MINIMAL soal yang harus dijawab benar oleh Tim B (dari 20 soal yang mereka kerjakan) agar total skor Tim B berhasil mengalahkan Tim A! Jelaskan alasan dan langkah perhitunganmu!',
    kunciLabel: 'Skor Tim A = 75 poin; Tim B minimal harus benar 18 soal (skor 79 poin)',
    pembahasan: 'Skor Tim A = (18×5) + (4×(-3)) + (3×(-1)) = 90 - 12 - 3 = 75. Tim B menjawab 20 soal (kosong 5 soal = -5). Jika Tim B benar 17 soal (salah 3): (17×5) + (3×(-3)) - 5 = 85 - 9 - 5 = 71 (belum menang). Jika Tim B benar 18 soal (salah 2): (18×5) + (2×(-3)) - 5 = 90 - 6 - 5 = 79 poin (> 75). Jadi minimal 18 soal benar.',
    jawabanIdeal: 'Total skor Tim A adalah 75 poin, dan Tim B minimal harus menjawab benar 18 soal (memperoleh 79 poin) untuk mengalahkan Tim A.',
    langkahPenyelesaian: [
      'Langkah 1: Menghitung skor Tim A (Benar = 18, Salah = 22 - 18 = 4, Kosong = 25 - 22 = 3): Skor A = (18 × 5) + (4 × (-3)) + (3 × (-1)) = 90 - 12 - 3 = 75 poin.',
      'Langkah 2: Menganalisis soal kosong Tim B = 25 - 20 = 5 soal, sehingga skor kosong Tim B = 5 × (-1) = -5 poin.',
      'Langkah 3: Menguji jumlah benar Tim B dari 20 soal yang dijawab: jika benar 17 dan salah 3, skor = (17 × 5) + (3 × (-3)) - 5 = 85 - 9 - 5 = 71 poin (masih kalah dari 75).',
      'Langkah 4: Jika Tim B benar 18 soal dan salah 2 soal, skor = (18 × 5) + (2 × (-3)) - 5 = 90 - 6 - 5 = 79 poin. Karena 79 > 75, maka minimal Tim B harus menjawab benar 18 soal.'
    ],
    kataKunciSkor: {
      angkaUtama: ['75', '18', '79'],
      konsepKata: ['tim a', 'tim b', 'minimal', 'benar', 'salah']
    },
    rubrik: {
      skor4: 'Menemukan skor Tim A (75 poin) dan minimal benar Tim B (18 soal dengan skor 79) secara tepat disertai langkah lengkap.',
      skor3: 'Menemukan skor Tim A (75 poin) dengan benar dan menyusun persamaan/uji coba Tim B dengan konsep tepat namun kurang teliti di kesimpulan akhir.',
      skor2: 'Hanya berhasil menghitung total skor Tim A (75 poin) dengan benar.',
      skor1: 'Terdapat usaha menghitung perkalian skor tetapi belum sesuai aturan.',
      skor0: 'Jawaban kosong atau tidak relevan.'
    }
  },
  {
    no: 24,
    type: 'URAIAN',
    materi: 'Pecahan',
    submateri: 'Penalaran Aljabar Aritmetika Pecahan pada Kapasitas Tangki',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menentukan kapasitas penuh suatu wadah jika diketahui perubahan bagian pecahan sebelum dan sesudah dikurangi volume tertentu.',
    levelKognitif: 'L3 (Penalaran / HOTS)',
    kesulitan: 'HOTS Model TKA',
    stimulusTitle: 'Kapasitas Tangki Air Kebun Sekolah',
    stimulusText: 'Sebuah tangki penampungan air di kebun SMP Negeri 2 Karangbinangun awalnya terisi 4/5 bagian dari kapasitas penuhnya. Pada pagi hari, sebanyak 1/4 bagian dari air yang ADA di dalam tangki tersebut digunakan untuk menyiram tanaman. Pada siang hari, petugas mengalirkan lagi air keluar sebanyak 120 liter sehingga air yang tersisa di dalam tangki sekarang tepat menjadi 2/5 bagian dari kapasitas penuh tangki.',
    pertanyaan: 'Berapakah kapasitas penuh tangki air tersebut dalam satuan liter? Tunjukkan langkah penyelesaianmu secara sistematis!',
    kunciLabel: '600 liter',
    pembahasan: 'Awal = 4/5 kapasitas. Dipakai pagi = 1/4 × 4/5 = 1/5 kapasitas. Sisa setelah pagi = 4/5 - 1/5 = 3/5 kapasitas. Siang berkurang 120 liter menjadi 2/5 kapasitas, berarti 3/5 - 2/5 = 1/5 kapasitas setara dengan 120 liter. Maka kapasitas penuh = 120 × 5 = 600 liter.',
    jawabanIdeal: 'Kapasitas penuh tangki air tersebut adalah 600 liter.',
    langkahPenyelesaian: [
      'Langkah 1: Bagian air yang digunakan pagi hari = 1/4 dari 4/5 bagian tangki = (1/4) × (4/5) = 1/5 bagian dari kapasitas penuh.',
      'Langkah 2: Bagian air yang tersisa setelah penyiraman pagi = 4/5 - 1/5 = 3/5 bagian dari kapasitas penuh.',
      'Langkah 3: Pada siang hari air keluar 120 liter dan menyisakan 2/5 bagian tangki, sehingga selisih bagiannya adalah 3/5 - 2/5 = 1/5 bagian tangki.',
      'Langkah 4: Karena 1/5 bagian kapasitas tangki = 120 liter, maka kapasitas penuh tangki = 120 liter × 5 = 600 liter.'
    ],
    kataKunciSkor: {
      angkaUtama: ['600', '1/5', '3/5'],
      konsepKata: ['liter', 'kapasitas', 'tangki', 'bagian']
    },
    rubrik: {
      skor4: 'Jawaban benar (600 liter), lengkap, mampu membedakan "1/4 dari air yang ada" menjadi 1/5 kapasitas tangki dengan jelas.',
      skor3: 'Konsep urutan pengurangan pecahan sudah benar, namun terdapat sedikit salah hitung pada perkalian akhir.',
      skor2: 'Sebagian konsep benar (berhasil menghitung pemakaian pagi 1/5 bagian atau sisa 3/5 bagian).',
      skor1: 'Terdapat usaha mengoperasikan pecahan 4/5, 1/4, dan 2/5 namun konsep belum tepat.',
      skor0: 'Jawaban kosong atau tidak relevan.'
    }
  },
  {
    no: 25,
    type: 'URAIAN',
    materi: 'Pecahan',
    submateri: 'Integrasi Bilangan Bulat & Pecahan dalam Literasi Finansial',
    involvesOperasiHitung: true,
    isHotsOrReasoning: true,
    indikator: 'Menganalisis keuntungan/kerugian pedagang dari penjualan barang yang terbagi dalam klasifikasi pecahan dan persen.',
    levelKognitif: 'L3 (Penalaran / HOTS)',
    kesulitan: 'HOTS Model TKA',
    stimulusTitle: 'Analisis Usaha Pedagang Jeruk Karangbinangun',
    stimulusText: 'Seorang pedagang buah membeli 80 kg jeruk dari petani dengan total modal seluruhnya Rp1.200.000. Setelah dilakukan penyortiran:\n• Sebanyak 3/5 bagian dari total berat jeruk termasuk kualitas Super dan habis terjual dengan harga Rp20.000 per kg.\n• Sebanyak 25% dari total berat jeruk termasuk kualitas Sedang dan habis terjual dengan harga Rp16.000 per kg.\n• Sisanya mengalami memar selama perjalanan sehingga dijual murah dengan harga Rp8.000 per kg hingga habis.',
    pertanyaan: 'Berdasarkan informasi pada stimulus, tentukan apakah pedagang tersebut mengalami keuntungan atau kerugian, hitunglah besar nominalnya (dalam Rupiah), serta berikan kesimpulanmu!',
    kunciLabel: 'Untung sebesar Rp176.000 (Total penjualan Rp1.376.000)',
    pembahasan: 'Super = 3/5 × 80 = 48 kg × Rp20.000 = Rp960.000. Sedang = 25% × 80 = 20 kg × Rp16.000 = Rp320.000. Sisa memar = 80 - 68 = 12 kg × Rp8.000 = Rp96.000. Total pendapatan = Rp1.376.000. Untung = Rp1.376.000 - Rp1.200.000 = Rp176.000.',
    jawabanIdeal: 'Pedagang mengalami KEUNTUNGAN sebesar Rp176.000 karena total pendapatan penjualan (Rp1.376.000) lebih besar daripada modal awal (Rp1.200.000).',
    langkahPenyelesaian: [
      'Langkah 1: Menghitung berat dan hasil penjualan jeruk Super: (3/5) × 80 kg = 48 kg ⇒ 48 × Rp20.000 = Rp960.000.',
      'Langkah 2: Menghitung berat dan hasil penjualan jeruk Sedang: 25% × 80 kg = 20 kg ⇒ 20 × Rp16.000 = Rp320.000.',
      'Langkah 3: Menghitung berat dan hasil penjualan jeruk memar: 80 - (48 + 20) = 12 kg ⇒ 12 × Rp8.000 = Rp96.000.',
      'Langkah 4: Menghitung total pendapatan dan selisih terhadap modal: Total = Rp960.000 + Rp320.000 + Rp96.000 = Rp1.376.000. Selisih = Rp1.376.000 - Rp1.200.000 = +Rp176.000 (Untung Rp176.000).'
    ],
    kataKunciSkor: {
      angkaUtama: ['176.000', '176000', '1.376.000', '1376000', '48', '20', '12'],
      konsepKata: ['untung', 'keuntungan', 'super', 'sedang']
    },
    rubrik: {
      skor4: 'Jawaban benar (Untung Rp176.000 dengan total penjualan Rp1.376.000), lengkap beserta rincian berat ketiga kategori jeruk.',
      skor3: 'Berhasil menghitung berat ketiga kategori (48 kg, 20 kg, 12 kg) dengan benar, namun ada sedikit salah hitung pada penjumlahan rupiah akhir.',
      skor2: 'Sebagian konsep benar (berhasil menghitung berat dan harga jual 1 atau 2 kategori jeruk).',
      skor1: 'Terdapat usaha menghitung bagian pecahan dari 80 kg namun belum selesai.',
      skor0: 'Jawaban kosong atau tidak relevan.'
    }
  }
];

// Функция penilaian awal otomatis untuk soal uraian (Skor 0 - 4)
export function evaluateEssayInitialScore(question: TkaQuestion, answerText: string): number {
  const cleaned = (answerText || '').trim().toLowerCase();
  if (!cleaned || cleaned.length < 2) return 0;

  const angkaMatches = (question.kataKunciSkor?.angkaUtama || []).filter((num) =>
    cleaned.includes(num.toLowerCase())
  );
  const konsepMatches = (question.kataKunciSkor?.konsepKata || []).filter((kw) =>
    cleaned.includes(kw.toLowerCase())
  );

  const hasPrimaryAnswer =
    question.kataKunciSkor?.angkaUtama?.[0] &&
    cleaned.includes(question.kataKunciSkor.angkaUtama[0].toLowerCase());

  if (hasPrimaryAnswer && angkaMatches.length >= 2 && cleaned.length >= 35) {
    return 4;
  }
  if (hasPrimaryAnswer || (angkaMatches.length >= 2 && konsepMatches.length >= 1)) {
    return 3;
  }
  if (angkaMatches.length >= 1 || konsepMatches.length >= 2) {
    return 2;
  }
  return 1;
}

// Pemeriksaan Otomatis (Self-Check Validator) sesuai spesifikasi prompt
export function verifyTkaQuestionBank() {
  const total = TKA_QUESTIONS.length;
  const countBS = TKA_QUESTIONS.filter((q) => q.type === 'BS').length;
  const countPG = TKA_QUESTIONS.filter((q) => q.type === 'PG').length;
  const countUraian = TKA_QUESTIONS.filter((q) => q.type === 'URAIAN').length;
  const countMudah = TKA_QUESTIONS.filter((q) => q.kesulitan === 'Mudah').length;
  const countSedang = TKA_QUESTIONS.filter((q) => q.kesulitan === 'Sedang').length;
  const countKontekstual = TKA_QUESTIONS.filter(
    (q) => q.kesulitan === 'Menengah-Tinggi / Kontekstual'
  ).length;
  const countHots = TKA_QUESTIONS.filter((q) => q.kesulitan === 'HOTS Model TKA').length;

  return {
    isValid: total === 25 && countBS === 5 && countPG === 15 && countUraian === 5,
    total,
    countBS,
    countPG,
    countUraian,
    distribution: {
      mudah: countMudah,
      sedang: countSedang,
      kontekstual: countKontekstual,
      hots: countHots
    }
  };
}
