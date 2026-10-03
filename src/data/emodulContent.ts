import { EssayQuestion, PblTask, QuizQuestion } from '../types';

export const APP_CONFIG = {
  moduleTitle: 'E-MODUL DIGITAL INTERAKTIF: MENGUNGKAP RAHASIA RELASI & FUNGSI',
  subjectGrade: 'Matematika SMP/MTs Kelas VIII',
  tagline: '“Temukan hubungan, buktikan keteraturan, dan pecahkan misterinya!”',
  approach: 'Berbasis Problem Based Learning (PBL)',
  focus: 'Kemampuan Berpikir Kritis (Critical Thinking)',
  developerName: 'NUR WAKHID, S.Pd',
  collaboratorInfo: 'Drs. PAIYO — SMP Negeri 1 Bantarkawung',
  defaultSchool: 'SMP Negeri 1 Bantarkawung',
  sharedPreUrl: 'https://ais-pre-ilunaowpdq7xfn5267r2pr-708966566810.asia-east1.run.app'
};

export const CLASS_OPTIONS = [
  'VIII A',
  'VIII B',
  'VIII C',
  'VIII D',
  'VIII E',
  'VIII F',
  'VIII G',
  'VIII H',
  'VIII MTs / Lainnya'
];

export const CRITICAL_THINKING_INDICATORS = [
  {
    code: '01. Interpretasi',
    title: 'Memahami & Mengartikan Hubungan',
    desc: 'Mengubah informasi masalah nyata ke dalam diagram panah, himpunan pasangan berurutan, tabel, atau grafik Cartesius.'
  },
  {
    code: '02. Analisis',
    title: 'Menguji Syarat Keteraturan',
    desc: 'Menyelidiki apakah suatu relasi memenuhi syarat mutlak fungsi (pemetaan) atau korespondensi satu-satu.'
  },
  {
    code: '03. Evaluasi',
    title: 'Menilai Kebenaran Pernyataan',
    desc: 'Membuktikan benar atau salahnya suatu klaim matematis tentang domain, kodomain, range, dan rumus fungsi.'
  },
  {
    code: '04. Inferensi',
    title: 'Menarik Kesimpulan & Rumus',
    desc: 'Menemukan rumus umum fungsi f(x) = ax + b dari pola data dan memprediksi nilai fungsi untuk input baru.'
  },
  {
    code: '05. Eksplanasi',
    title: 'Menyusun Argumen Logis',
    desc: 'Menjelaskan alasan matematis secara runtut mengapa suatu pola berhasil atau gagal memenuhi definisi fungsi.'
  }
];

export const CONCEPT_CHAPTERS = [
  {
    number: 'Bab 01',
    title: 'Rahasia Relasi & Tiga Representasi Visual',
    summary: 'Relasi dari himpunan A ke himpunan B adalah aturan yang memasangkan anggota-anggota himpunan A dengan anggota-anggota himpunan B.',
    keyPoints: [
      'Diagram Panah: Menggunakan kurva tertutup untuk himpunan A dan B serta anak panah yang menunjukkan arah pemasangan.',
      'Himpunan Pasangan Berurutan: Ditulis dalam bentuk {(x, y) | x ∈ A, y ∈ B}, di mana urutan tidak boleh tertukar.',
      'Diagram Cartesius: Anggota himpunan A terletak pada sumbu mendatar (X/absis) dan anggota himpunan B pada sumbu tegak (Y/ordinat).'
    ],
    formulaBox: 'R = { (a, b) | a ∈ A dan b ∈ B, a berelasi dengan b }',
    criticalExample: 'Kasus Kritis: Jika A = {2, 3, 4} dan B = {4, 6, 8} dengan relasi "faktor dari", maka angka 2 berelasi dengan 4, 6, dan 8 sekaligus karena 2 membagi habis ketiganya.'
  },
  {
    number: 'Bab 02',
    title: 'Membedakan Relasi Biasa vs Fungsi (Pemetaan)',
    summary: 'Setiap fungsi pasti merupakan relasi, namun TIDAK semua relasi merupakan fungsi. Fungsi menuntut dua syarat mutlak pada daerah asal (Domain).',
    keyPoints: [
      'Syarat Mutlak 1 (Tidak Boleh Kosong): Setiap anggota himpunan A (Domain) WAJIB memiliki pasangan di himpunan B.',
      'Syarat Mutlak 2 (Tidak Boleh Bercabang): Setiap anggota himpunan A (Domain) HANYA BOLEH memiliki TEPAT SATU pasangan di himpunan B.',
      'Catatan Kritis: Anggota himpunan B (Kodomain) boleh tidak punya pasangan atau boleh dipilih oleh lebih dari satu anggota A.'
    ],
    formulaBox: 'f : A → B adalah fungsi ⇔ ∀x ∈ A, ∃! y ∈ B sehingga f(x) = y',
    criticalExample: 'Analogi Kritis: Relasi "Siswa dengan Tanggal Lahir" adalah FUNGSI (1 siswa punya tepat 1 tanggal lahir, walau 2 siswa bisa lahir di tanggal sama). Sebaliknya, "Siswa dengan Hobi" BUKAN FUNGSI (1 siswa bisa punya 2 hobi atau tidak memilih hobi di daftar).'
  },
  {
    number: 'Bab 03',
    title: 'Domain, Kodomain, Range & Banyaknya Pemetaan',
    summary: 'Membedah tiga wilayah himpunan pada fungsi serta menghitung banyaknya seluruh kemungkinan fungsi yang dapat dibentuk.',
    keyPoints: [
      'Domain (Daerah Asal / Df): Seluruh anggota himpunan pertama (A).',
      'Kodomain (Daerah Kawan / Kf): Seluruh anggota himpunan kedua (B).',
      'Range (Daerah Hasil / Rf): Himpunan anggota B yang benar-benar terkena anak panah (memiliki pasangan dari A). Range adalah himpunan bagian dari Kodomain (Rf ⊆ Kf).'
    ],
    formulaBox: 'Jika n(A) = a dan n(B) = b, maka:\n• Banyak fungsi dari A ke B = bᵃ = n(B)ⁿ⁽ᴬ⁾\n• Banyak fungsi dari B ke A = aᵇ = n(A)ⁿ⁽ᴮ⁾',
    criticalExample: 'Hati-hati Terbalik! Jika n(A) = 3 dan n(B) = 2, maka banyaknya fungsi dari A ke B adalah 2³ = 8 (bukan 3² = 9).'
  },
  {
    number: 'Bab 04',
    title: 'Korespondensi Satu-Satu (Fungsi Bijektif)',
    summary: 'Relasi khusus yang memasangkan setiap anggota A dengan tepat satu anggota B, dan sebaliknya setiap anggota B berpasangan dengan tepat satu anggota A.',
    keyPoints: [
      'Syarat Ukuran Himpunan: Jumlah anggota himpunan A dan B WAJIB SAMA, yaitu n(A) = n(B) = n.',
      'Tidak ada anggota A maupun B yang bercabang atau tidak memiliki pasangan.',
      'Contoh nyata: Relasi antara Siswa dengan Nomor Induk Siswa Nasional (NISN) atau Negara dengan Ibu Kotanya.'
    ],
    formulaBox: 'Jika n(A) = n(B) = n, maka banyak korespondensi satu-satu:\nK = n! = n × (n - 1) × (n - 2) × ... × 2 × 1',
    criticalExample: 'Jika terdapat 4 siswa dan 4 kursi bernomor khusus, maka banyak cara pengaturan korespondensi satu-satu adalah 4! = 4 × 3 × 2 × 1 = 24 cara.'
  },
  {
    number: 'Bab 05',
    title: 'Mesin Fungsi & Menemukan Rumus f(x) = ax + b',
    summary: 'Fungsi linear bekerja layaknya mesin pengolah angka: setiap input x diproses dengan aturan tetap ax + b menghasilkan output f(x) atau y.',
    keyPoints: [
      'Notasi fungsi: f : x → ax + b ditulis sebagai rumus fungsi f(x) = ax + b.',
      'Menghitung nilai fungsi: Substitusikan nilai x ke dalam rumus f(x).',
      'Menemukan nilai a dan b: Jika diketahui dua nilai fungsi f(x₁) = y₁ dan f(x₂) = y₂, gunakan metode eliminasi-substitusi atau rumus selisih a = (y₂ - y₁) / (x₂ - x₁).'
    ],
    formulaBox: 'f(x) = ax + b  ⇒  a = [f(x₂) - f(x₁)] / (x₂ - x₁)',
    criticalExample: 'Jika f(1) = 5 dan f(3) = 11, maka selisih output untuk kenaikan 2 satuan x adalah 6, sehingga a = 6/2 = 3. Karena f(1) = 3(1) + b = 5, maka b = 2. Jadi f(x) = 3x + 2.'
  }
];

export const PBL_TASKS: PblTask[] = [
  {
    id: 'pbl-1',
    stageNumber: 1,
    stageName: 'Tahap 1: Orientasi Masalah & Interpretasi Data',
    criticalSkill: 'Interpretasi',
    caseTitle: 'Misteri Sistem Loker Digital SMP Negeri 1 Bantarkawung',
    context:
      'Pengurus perpustakaan SMP Negeri 1 Bantarkawung merancang 2 tabel pencatatan digital. Tabel I mencatat (Nama Siswa → Nomor Loker): {(Andi, L01), (Budi, L02), (Citra, L03), (Dani, L02)}. Tabel II mencatat (Nama Siswa → Buku yang Dipinjam): {(Andi, Matematika), (Andi, IPA), (Budi, Bahasa Indonesia), (Citra, IPS)}.',
    question:
      'Berdasarkan analisis berpikir kritis terhadap syarat fungsi, manakah pernyataan yang PALING TEPAT mengenai kedua tabel tersebut?',
    options: [
      {
        id: 'a',
        label: 'Tabel I adalah Fungsi karena setiap siswa tepat memiliki 1 loker (meski Budi & Dani berbagi loker L02), sedangkan Tabel II Bukan Fungsi karena Andi meminjam 2 buku.',
        isCorrect: true,
        feedback:
          'Tepat sekali! Pada Tabel I, setiap anggota domain (Andi, Budi, Citra, Dani) muncul tepat satu kali sebagai komponen pertama. Pada Tabel II, Andi bercabang ke dua buku sehingga melanggar syarat ketunggalan fungsi.'
      },
      {
        id: 'b',
        label: 'Tabel I Bukan Fungsi karena loker L02 digunakan oleh dua siswa (Budi dan Dani).',
        isCorrect: false,
        feedback:
          'Kurang tepat. Dalam fungsi, anggota kodomain (L02) boleh dipilih oleh lebih dari satu anggota domain, asalkan setiap siswa di domain hanya memilih tepat satu loker.'
      },
      {
        id: 'c',
        label: 'Tabel II adalah Fungsi karena semua siswa meminjam buku perpustakaan.',
        isCorrect: false,
        feedback:
          'Perhatikan pasangan berurutan (Andi, Matematika) dan (Andi, IPA). Satu anggota domain (Andi) memiliki dua pasangan berbeda, sehingga Tabel II bukan fungsi.'
      },
      {
        id: 'd',
        label: 'Kedua tabel merupakan Korespondensi Satu-satu karena datanya lengkap.',
        isCorrect: false,
        feedback:
          'Korespondensi satu-satu mengharuskan baik domain maupun kodomain tidak ada yang bercabang sama sekali.'
      }
    ],
    reflectionPrompt: 'Mengapa syarat bercabang hanya dilarang pada himpunan asal (Domain), tetapi diperbolehkan pada himpunan kawan (Kodomain)?'
  },
  {
    id: 'pbl-2',
    stageNumber: 2,
    stageName: 'Tahap 2: Analisis Himpunan & Range',
    criticalSkill: 'Analisis',
    caseTitle: 'Penyelidikan Sandi Kuadrat Kurang Satu',
    context:
      'Sebuah mesin sandi memetakan himpunan A = {-1, 0, 1, 2} ke himpunan B = {-2, -1, 0, 1, 2, 3, 4} dengan aturan rumus fungsi f(x) = x² - 1.',
    question:
      'Jika kamu menyelidiki seluruh hasil pemetaan dari anggota himpunan A, manakah Daerah Hasil (Range) yang terbentuk?',
    options: [
      {
        id: 'a',
        label: 'Range = {-2, -1, 0, 3}',
        isCorrect: false,
        feedback:
          'Cek kembali untuk x = -1: nilai (-1)² - 1 = 1 - 1 = 0, bukan -2.'
      },
      {
        id: 'b',
        label: 'Range = {-1, 0, 3}',
        isCorrect: true,
        feedback:
          'Analisis akurat! f(-1) = (-1)² - 1 = 0; f(0) = 0² - 1 = -1; f(1) = 1² - 1 = 0; f(2) = 2² - 1 = 3. Himpunan hasil uniknya adalah {-1, 0, 3}.'
      },
      {
        id: 'c',
        label: 'Range = {-2, -1, 0, 1, 2, 3, 4}',
        isCorrect: false,
        feedback:
          'Itu adalah Kodomain (seluruh anggota B), bukan Range (anggota B yang terkena panah).'
      },
      {
        id: 'd',
        label: 'Range = {-1, 0, 1, 3}',
        isCorrect: false,
        feedback:
          'Angka 1 tidak pernah dihasilkan karena tidak ada x ∈ A yang memenuhi x² - 1 = 1.'
      }
    ],
    reflectionPrompt: 'Mengapa jumlah anggota Range (3 anggota) bisa lebih sedikit daripada jumlah anggota Domain A (4 anggota)?'
  },
  {
    id: 'pbl-3',
    stageNumber: 3,
    stageName: 'Tahap 3: Evaluasi Klaim Kombinatorika Pemetaan',
    criticalSkill: 'Evaluasi',
    caseTitle: 'Perdebatan Banyaknya Pemetaan Ekstrakurikuler',
    context:
      'Terdapat himpunan P = {3 perwakilan kelas} dan Q = {4 pilihan bidang lomba OSN}. Raka mengklaim bahwa banyaknya seluruh fungsi (pemetaan) yang mungkin dari P ke Q adalah 3⁴ = 81 cara. Sementara Dinda mengklaim banyaknya fungsi dari P ke Q adalah 4³ = 64 cara.',
    question:
      'Evaluasilah klaim Raka dan Dinda! Siapakah yang benar dan bagaimana pembuktian kritisnya?',
    options: [
      {
        id: 'a',
        label: 'Klaim Raka benar (81 cara) karena jumlah anggota P dipangkatkan jumlah anggota Q.',
        isCorrect: false,
        feedback:
          'Terbalik! Setiap 1 siswa di P memiliki 4 pilihan lomba di Q, sehingga untuk 3 siswa perhitungannya adalah 4 × 4 × 4 = 4³.'
      },
      {
        id: 'b',
        label: 'Klaim Dinda benar (64 cara) karena rumus banyak fungsi dari P ke Q adalah n(Q)^n(P) = 4³ = 64.',
        isCorrect: true,
        feedback:
          'Evaluasi sangat tepat! Siswa ke-1 punya 4 pilihan, siswa ke-2 punya 4 pilihan, dan siswa ke-3 punya 4 pilihan: 4 × 4 × 4 = 4³ = 64 fungsi.'
      },
      {
        id: 'c',
        label: 'Keduanya salah, seharusnya menggunakan rumus korespondensi satu-satu yaitu 4 × 3 = 12 cara.',
        isCorrect: false,
        feedback:
          'Soal menanyakan seluruh kemungkinan fungsi (pemetaan), di mana beberapa siswa boleh memilih bidang lomba yang sama.'
      },
      {
        id: 'd',
        label: 'Keduanya salah, seharusnya 3 + 4 = 7 cara.',
        isCorrect: false,
        feedback:
          'Prinsip perkalian berlaku untuk setiap anggota domain P yang memilih anggota kodomain Q.'
      }
    ],
    reflectionPrompt: 'Bagaimana cara mudah mengingat rumus n(B)^n(A) tanpa menghafal secara mekanis?'
  },
  {
    id: 'pbl-4',
    stageNumber: 4,
    stageName: 'Tahap 4: Inferensi & Pemodelan Rumus Fungsi',
    criticalSkill: 'Inferensi',
    caseTitle: 'Memecahkan Tarif Ekspedisi Koperasi Sekolah',
    context:
      'Layanan pengiriman paket buku koperasi menerapkan tarif fungsi linear f(x) = ax + b, dengan x adalah berat paket (dalam kg) dan b adalah biaya administrasi tetap. Diketahui pengiriman paket seberat 2 kg membutuhkan biaya Rp19.000, sedangkan paket seberat 5 kg membutuhkan biaya Rp40.000.',
    question:
      'Tentukan rumus fungsi f(x) dan berapakah biaya yang harus dibayar untuk mengirim paket buku seberat 8 kg?',
    options: [
      {
        id: 'a',
        label: 'f(x) = 7.000x + 5.000 dan biaya 8 kg adalah Rp61.000',
        isCorrect: true,
        feedback:
          'Inferensi luar biasa! a = (40.000 - 19.000) / (5 - 2) = 21.000 / 3 = 7.000. Substitusi ke 2a + b = 19.000 menghasilkan 14.000 + b = 19.000 ⇒ b = 5.000. Maka f(8) = 7.000(8) + 5.000 = Rp61.000.'
      },
      {
        id: 'b',
        label: 'f(x) = 8.000x + 3.000 dan biaya 8 kg adalah Rp67.000',
        isCorrect: false,
        feedback:
          'Jika f(x) = 8.000x + 3.000, maka untuk x = 5 kg biayanya menjadi 8.000(5) + 3.000 = Rp43.000 (tidak sesuai data Rp40.000).'
      },
      {
        id: 'c',
        label: 'f(x) = 7.000x + 4.000 dan biaya 8 kg adalah Rp60.000',
        isCorrect: false,
        feedback:
          'Periksa kembali nilai konstanta b: 7.000(2) + b = 19.000 ⇒ b = 19.000 - 14.000 = 5.000.'
      },
      {
        id: 'd',
        label: 'f(x) = 6.500x + 6.000 dan biaya 8 kg adalah Rp58.000',
        isCorrect: false,
        feedback:
          'Selisih kenaikan biaya untuk 3 kg adalah Rp21.000, sehingga tarif per kg (a) adalah Rp7.000.'
      }
    ],
    reflectionPrompt: 'Apa makna fisis dari nilai a = 7.000 dan b = 5.000 dalam konteks pengiriman paket nyata?'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    caseTitle: 'Kasus 01 · Identifikasi Relasi Himpunan',
    criticalIndicator: 'Interpretasi',
    scenario:
      'Diketahui himpunan P = {2, 3, 5} dan himpunan Q = {4, 6, 9, 10, 15}. Suatu relasi dari P ke Q dinyatakan dengan himpunan pasangan berurutan R = {(2, 4), (2, 6), (2, 10), (3, 6), (3, 9), (3, 15), (5, 10), (5, 15)}.',
    question: 'Aturan relasi yang paling tepat untuk menjelaskan hubungan dari himpunan P ke himpunan Q tersebut adalah...',
    mathData: 'P = {2, 3, 5}  →  Q = {4, 6, 9, 10, 15}',
    options: [
      'Kurang dari',
      'Setengah dari',
      'Faktor prima dari',
      'Akar kuadrat dari'
    ],
    correctIndex: 2,
    hint: 'Perhatikan bahwa anggota P adalah bilangan prima (2, 3, 5) dan setiap anggota P dipasangkan tepat ke semua kelipatannya di Q.',
    explanation:
      'Anggota P = {2, 3, 5} semuanya bilangan prima. Angka 2 membagi habis 4, 6, 10; angka 3 membagi habis 6, 9, 15; dan angka 5 membagi habis 10, 15. Mengapa bukan "kurang dari"? Karena (2, 9) dan (2, 15) tidak ada di dalam R. Jadi relasi yang tepat adalah "faktor prima dari".'
  },
  {
    id: 2,
    caseTitle: 'Kasus 02 · Uji Kritis Syarat Fungsi',
    criticalIndicator: 'Analisis',
    scenario:
      'Empat kelompok siswa kelas VIII mengumpulkan data pasangan berurutan dari himpunan A = {a, b, c} ke himpunan B = {1, 2, 3}:',
    question: 'Manakah di antara keempat himpunan pasangan berurutan berikut yang MERUPAKAN FUNGSI (Pemetaan) dari A ke B?',
    mathData: 'I. {(a,1), (b,2), (b,3), (c,1)}\nII. {(a,2), (b,2), (c,2)}\nIII. {(a,1), (c,3)}\nIV. {(a,1), (a,2), (a,3)}',
    options: [
      'Himpunan I karena semua anggota B terpilih',
      'Himpunan II karena setiap anggota A muncul tepat satu kali',
      'Himpunan III karena tidak ada anggota yang bercabang',
      'Himpunan IV karena anggota a berpasangan dengan semua anggota B'
    ],
    correctIndex: 1,
    hint: 'Cek komponen pertama (domain A = {a, b, c}). Ketiganya wajib hadir dan masing-masing hanya boleh tertulis 1 kali.',
    explanation:
      'Syarat fungsi dari A = {a, b, c} ke B adalah a, b, dan c wajib memiliki tepat satu pasangan. Pada Himpunan II {(a,2), (b,2), (c,2)}, a, b, dan c masing-masing muncul tepat satu kali (ini disebut fungsi konstan). Himpunan I dan IV gagal karena bercabang, sedangkan Himpunan III gagal karena anggota b tidak memiliki pasangan.'
  },
  {
    id: 3,
    caseTitle: 'Kasus 03 · Pembedahan Domain, Kodomain, dan Range',
    criticalIndicator: 'Interpretasi',
    scenario:
      'Suatu fungsi f memetakan himpunan K = {1, 2, 3, 4} ke himpunan L = {3, 5, 7, 9, 11, 13} dengan pasangan berurutan {(1, 3), (2, 5), (3, 7), (4, 9)}.',
    question: 'Pernyataan berikut yang BENAR mengenai fungsi tersebut adalah...',
    mathData: 'f = {(1, 3), (2, 5), (3, 7), (4, 9)}',
    options: [
      'Domain = {3, 5, 7, 9} dan Range = {1, 2, 3, 4}',
      'Kodomain = {3, 5, 7, 9} dan Range = {3, 5, 7, 9, 11, 13}',
      'Domain = {1, 2, 3, 4} dan Range = {3, 5, 7, 9}',
      'Range = {11, 13} karena tidak memiliki pasangan'
    ],
    correctIndex: 2,
    hint: 'Domain adalah seluruh anggota K, Kodomain adalah seluruh anggota L, dan Range adalah anggota L yang memiliki pasangan.',
    explanation:
      'Domain (daerah asal) adalah K = {1, 2, 3, 4}. Kodomain (daerah kawan) adalah L = {3, 5, 7, 9, 11, 13}. Range (daerah hasil) adalah anggota L yang terpilih sebagai pasangan, yaitu {3, 5, 7, 9}.'
  },
  {
    id: 4,
    caseTitle: 'Kasus 04 · Analisis Kombinatorika Pemetaan',
    criticalIndicator: 'Analisis',
    scenario:
      'Diketahui A = {x | 1 < x < 6, x ∈ bilangan asli} dan B = {huruf vokal dalam kata "MATEMATIKA"}.',
    question: 'Banyaknya semua fungsi (pemetaan) yang mungkin dibuat dari himpunan A ke himpunan B adalah...',
    mathData: 'A = {x | 1 < x < 6, x ∈ Asli}\nB = {huruf vokal pada "MATEMATIKA"}',
    options: [
      '64 pemetaan',
      '81 pemetaan',
      '12 pemetaan',
      '27 pemetaan'
    ],
    correctIndex: 1,
    hint: 'Ingat! Dalam himpunan, huruf yang sama hanya dihitung satu kali. Hitung dulu n(A) dan n(B) secara teliti.',
    explanation:
      'Mari kita daftar anggotanya dengan kritis: A = {2, 3, 4, 5}, sehingga n(A) = 4. Huruf vokal dalam kata "MATEMATIKA" adalah A, E, I (huruf A yang berulang hanya ditulis sekali dalam himpunan), sehingga B = {A, E, I} dan n(B) = 3. Banyak fungsi dari A ke B adalah n(B)^n(A) = 3⁴ = 81 pemetaan.'
  },
  {
    id: 5,
    caseTitle: 'Kasus 05 · Seleksi Korespondensi Satu-Satu',
    criticalIndicator: 'Evaluasi',
    scenario:
      'Perhatikan empat situasi hubungan di lingkungan sekolah SMP Negeri 1 Bantarkawung berikut ini:',
    question: 'Situasi manakah yang PASTI membentuk Korespondensi Satu-Satu?',
    mathData: 'Syarat Bijektif: ∀x ∈ A ∃!y ∈ B dan ∀y ∈ B ∃!x ∈ A',
    options: [
      'Relasi antara Siswa Kelas VIII A dengan Bulan Kelahirannya',
      'Relasi antara Siswa Kelas VIII A dengan Ukuran Sepatunya',
      'Relasi antara Siswa Kelas VIII A dengan Nomor Induk Siswa Nasional (NISN) miliknya',
      'Relasi antara Siswa Kelas VIII A dengan Ekstrakurikuler yang diikuti'
    ],
    correctIndex: 2,
    hint: 'Cari hubungan di mana 1 siswa tepat punya 1 kode unik, dan 1 kode unik tidak mungkin dimiliki oleh 2 siswa berbeda.',
    explanation:
      'Nomor Induk Siswa Nasional (NISN) bersifat unik nasional: setiap siswa memiliki tepat satu NISN, dan setiap NISN hanya dimiliki oleh tepat satu siswa. Sedangkan bulan lahir (hanya 12 bulan untuk ~32 siswa) dan ukuran sepatu pasti ada siswa yang sama.'
  },
  {
    id: 6,
    caseTitle: 'Kasus 06 · Menghitung Banyak Korespondensi Satu-Satu',
    criticalIndicator: 'Analisis',
    scenario:
      'Lima orang ketua regu Pramuka akan ditempatkan ke dalam 5 tenda berbeda sehingga memenuhi korespondensi satu-satu.',
    question: 'Berapa banyak susunan korespondensi satu-satu yang dapat dibentuk antara ketua regu dan tenda tersebut?',
    mathData: 'n(A) = n(B) = 5  →  K = n!',
    options: [
      '25 susunan',
      '60 susunan',
      '120 susunan',
      '3.125 susunan'
    ],
    correctIndex: 2,
    hint: 'Gunakan rumus faktorial n! = n × (n-1) × ... × 1.',
    explanation:
      'Banyak korespondensi satu-satu untuk n = 5 adalah 5! = 5 × 4 × 3 × 2 × 1 = 120 susunan.'
  },
  {
    id: 7,
    caseTitle: 'Kasus 07 · Evaluasi Input Mesin Fungsi',
    criticalIndicator: 'Inferensi',
    scenario:
      'Sebuah mesin fungsi ditentukan oleh rumus f(x) = 4x - 7. Ketika suatu bilangan k dimasukkan ke dalam mesin tersebut, keluarannya adalah f(k) = 25.',
    question: 'Berapakah nilai bilangan input k yang dimasukkan ke dalam mesin fungsi tersebut?',
    mathData: 'f(x) = 4x - 7  dan  f(k) = 25',
    options: [
      'k = 4,5',
      'k = 6',
      'k = 8',
      'k = 93'
    ],
    correctIndex: 2,
    hint: 'Jangan mensubstitusikan x = 25! Diketahui hasil akhirnya f(k) = 25, sehingga 4k - 7 = 25.',
    explanation:
      'Karena f(k) = 25, maka 4k - 7 = 25 ⇒ 4k = 25 + 7 ⇒ 4k = 32 ⇒ k = 32 / 4 = 8.'
  },
  {
    id: 8,
    caseTitle: 'Kasus 08 · Transformasi Aljabar f(2x - 1)',
    criticalIndicator: 'Analisis',
    scenario:
      'Suatu fungsi didefinisikan dengan rumus f(x) = 3x + 5 untuk setiap x bilangan real.',
    question: 'Bentuk paling sederhana dari f(2a - 3) adalah...',
    mathData: 'f(x) = 3x + 5  →  Carilah f(2a - 3)',
    options: [
      '6a - 4',
      '6a + 2',
      '5a + 2',
      '6a - 9'
    ],
    correctIndex: 0,
    hint: 'Ganti variabel x pada rumus 3x + 5 dengan ekspresi (2a - 3) di dalam tanda kurung: 3(2a - 3) + 5.',
    explanation:
      'Substitusikan x = (2a - 3) ke dalam f(x) = 3x + 5:\nf(2a - 3) = 3(2a - 3) + 5 = 6a - 9 + 5 = 6a - 4.'
  },
  {
    id: 9,
    caseTitle: 'Kasus 09 · Menemukan Rumus Fungsi dari Dua Titik',
    criticalIndicator: 'Inferensi',
    scenario:
      'Suatu fungsi linear f(x) = ax + b memiliki data pengamatan bahwa f(2) = 1 dan f(5) = 10.',
    question: 'Berdasarkan kedua petunjuk tersebut, nilai dari f(-2) adalah...',
    mathData: 'f(2) = 1  dan  f(5) = 10  →  f(-2) = ?',
    options: [
      '-11',
      '-9',
      '-7',
      '1'
    ],
    correctIndex: 0,
    hint: 'Cari dulu nilai a = (10 - 1)/(5 - 2), lalu temukan b, kemudian hitung f(-2).',
    explanation:
      'Langkah 1: a = (f(5) - f(2)) / (5 - 2) = (10 - 1) / 3 = 9 / 3 = 3.\nLangkah 2: Substitusi ke f(2) = 1 ⇒ 3(2) + b = 1 ⇒ 6 + b = 1 ⇒ b = -5.\nLangkah 3: Rumus fungsi adalah f(x) = 3x - 5.\nLangkah 4: Nilai f(-2) = 3(-2) - 5 = -6 - 5 = -11.'
  },
  {
    id: 10,
    caseTitle: 'Kasus 10 · Pemecahan Masalah Nyata (HOTS PBL)',
    criticalIndicator: 'Eksplanasi',
    scenario:
      'Sebuah perusahaan taksi online di Kabupaten Brebes menetapkan tarif perjalanan mengikuti fungsi linear C(s) = as + b, dengan s adalah jarak tempuh (km). Penumpang A menempuh jarak 4 km dan membayar Rp26.000. Penumpang B menempuh jarak 9 km dan membayar Rp51.000. Budi memiliki saldo dompet digital sebesar Rp80.000 dan ingin menuju lokasi sejauh 14 km.',
    question: 'Evaluasilah apakah saldo Budi cukup, dan berapakah sisa atau kekurangan saldonya?',
    mathData: 'C(4) = 26.000 · C(9) = 51.000 · Saldo = 80.000 · Jarak = 14 km',
    options: [
      'Cukup, tarifnya Rp76.000 sehingga sisa saldo Budi Rp4.000',
      'Cukup, tarifnya Rp70.000 sehingga sisa saldo Budi Rp10.000',
      'Tidak cukup, tarifnya Rp81.000 sehingga Budi kurang Rp1.000',
      'Tidak cukup, tarifnya Rp86.000 sehingga Budi kurang Rp6.000'
    ],
    correctIndex: 0,
    hint: 'Kenaikan 5 km (dari 4 km ke 9 km) menambah biaya Rp25.000. Berarti dari 9 km ke 14 km (naik 5 km lagi) biayanya juga naik Rp25.000!',
    explanation:
      'Cara Kritis & Cepat: Jarak naik dari 4 km ke 9 km (+5 km) menyebabkan tarif naik dari Rp26.000 ke Rp51.000 (+Rp25.000). Artinya tarif per km adalah a = Rp5.000/km dan biaya buka pintu b = Rp6.000, sehingga C(s) = 5.000s + 6.000. Untuk jarak s = 14 km: C(14) = 5.000(14) + 6.000 = 70.000 + 6.000 = Rp76.000. Karena saldo Budi Rp80.000, maka saldonya CUKUP dan masih tersisa Rp4.000.'
  }
];

export const ESSAY_QUESTIONS_FOR_WORD: EssayQuestion[] = [
  {
    id: 1,
    title: 'Investigasi Syarat Mutlak Fungsi pada Kehidupan Sehari-hari',
    criticalIndicator: 'Interpretasi & Analisis',
    problemStatement:
      'Di SMP Negeri 1 Bantarkawung terdapat himpunan Siswa S = {Aldi, Bela, Ciko, Dini} dan himpunan Golongan Darah G = {A, B, AB, O}. Data pemeriksaan UKS menunjukkan: Aldi bergolongan darah O, Bela bergolongan darah A, Ciko bergolongan darah B, dan Dini bergolongan darah O.',
    subQuestions: [
      'a) Nyatakan relasi dari himpunan S ke G dalam bentuk Himpunan Pasangan Berurutan!',
      'b) Apakah relasi dari S ke G merupakan suatu Fungsi (Pemetaan)? Jelaskan alasan logisnya!',
      'c) Jika relasinya dibalik dari G ke S, apakah masih merupakan Fungsi? Berikan bukti kritisnya!'
    ],
    solutionSteps: [
      'a) Himpunan Pasangan Berurutan dari S ke G = {(Aldi, O), (Bela, A), (Ciko, B), (Dini, O)}.',
      'b) YA, merupakan FUNGSI. Alasannya: setiap anggota domain S (Aldi, Bela, Ciko, Dini) memiliki pasangan di G, dan masing-masing siswa hanya memiliki tepat satu golongan darah.',
      'c) TIDAK, relasi dari G ke S BUKAN FUNGSI. Bukti kritisnya: (1) Anggota G yaitu AB tidak memiliki pasangan di S (jomblo), dan (2) Anggota G yaitu O bercabang ke dua pasangan di S yaitu (O, Aldi) dan (O, Dini).'
    ],
    finalConclusion: 'Relasi S → G adalah fungsi, sedangkan kebalikannya G → S bukan fungsi.',
    maxScore: 20
  },
  {
    id: 2,
    title: 'Analisis Daerah Hasil (Range) pada Fungsi Kuadratik',
    criticalIndicator: 'Analisis & Evaluasi',
    problemStatement:
      'Suatu fungsi f didefinisikan dengan rumus f(x) = 2x² - 3x + 1 dengan daerah asal (Domain) A = {-1, 0, 1, 2, 3}.',
    subQuestions: [
      'a) Hitunglah nilai fungsi untuk setiap anggota domain A!',
      'b) Tentukan Daerah Hasil (Range) dari fungsi f tersebut!',
      'c) Seorang siswa mengklaim bahwa banyaknya anggota Range pasti selalu sama dengan banyaknya anggota Domain. Evaluasilah klaim tersebut menggunakan hasil perhitunganmu!'
    ],
    solutionSteps: [
      'a) Substitusi setiap x ∈ A ke f(x) = 2x² - 3x + 1:\n   • x = -1 ⇒ f(-1) = 2(-1)² - 3(-1) + 1 = 2 + 3 + 1 = 6\n   • x = 0  ⇒ f(0) = 2(0)² - 3(0) + 1 = 1\n   • x = 1  ⇒ f(1) = 2(1)² - 3(1) + 1 = 2 - 3 + 1 = 0\n   • x = 2  ⇒ f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3\n   • x = 3  ⇒ f(3) = 2(3)² - 3(3) + 1 = 18 - 9 + 1 = 10',
      'b) Daerah Hasil (Range) Rf = {0, 1, 3, 6, 10}.',
      'c) Klaim siswa tersebut SALAH secara umum. Meskipun pada domain A = {-1, 0, 1, 2, 3} kebetulan menghasilkan 5 nilai berbeda, jika kita menambahkan x = 1,5 atau pada fungsi kuadrat simetris (misal g(x) = x² pada {-1, 1}), dua input berbeda menghasilkan output yang sama sehingga n(Range) ≤ n(Domain).'
    ],
    finalConclusion: 'Range fungsi adalah {0, 1, 3, 6, 10} dan secara umum berlaku n(Range) ≤ n(Domain).',
    maxScore: 20
  },
  {
    id: 3,
    title: 'Perbandingan Banyak Pemetaan dan Korespondensi Satu-Satu',
    criticalIndicator: 'Evaluasi',
    problemStatement:
      'Diketahui himpunan M = {faktor prima dari 30} dan himpunan N = {bilangan ganjil kurang dari 7}.',
    subQuestions: [
      'a) Daftarkan anggota himpunan M dan himpunan N, lalu tentukan n(M) dan n(N)!',
      'b) Berapakah banyaknya seluruh fungsi (pemetaan) yang mungkin dari M ke N?',
      'c) Berapakah banyaknya korespondensi satu-satu yang mungkin antara M dan N? Berapa persen peluang sebuah fungsi yang dipilih acak dari M ke N merupakan korespondensi satu-satu?'
    ],
    solutionSteps: [
      'a) Faktor dari 30 adalah 1, 2, 3, 5, 6, 10, 15, 30. Yang merupakan bilangan prima adalah M = {2, 3, 5}, sehingga n(M) = 3.\n   Bilangan ganjil kurang dari 7 adalah N = {1, 3, 5}, sehingga n(N) = 3.',
      'b) Banyak fungsi dari M ke N = n(N)^n(M) = 3³ = 27 fungsi.',
      'c) Karena n(M) = n(N) = 3, banyak korespondensi satu-satu = 3! = 3 × 2 × 1 = 6.\n   Persentase fungsi yang merupakan korespondensi satu-satu = (6 / 27) × 100% = 22,22%.'
    ],
    finalConclusion: 'Terdapat 27 fungsi total dan 6 di antaranya merupakan korespondensi satu-satu.',
    maxScore: 20
  },
  {
    id: 4,
    title: 'Rekonstruksi Rumus Fungsi Linear f(x) = ax + b',
    criticalIndicator: 'Inferensi',
    problemStatement:
      'Sebuah eksperimen pemanasan cairan di laboratorium IPA mencatat bahwa suhu cairan mengikuti fungsi linear T(t) = at + b, di mana t adalah waktu pemanasan (menit) dan T(t) adalah suhu dalam derajat Celcius. Pada menit ke-3 suhu cairan mencapai 36°C, dan pada menit ke-8 suhu cairan mencapai 61°C.',
    subQuestions: [
      'a) Tentukan nilai a (laju kenaikan suhu per menit) dan b (suhu awal cairan saat t = 0)!',
      'b) Tuliskan rumus fungsi suhu T(t) secara lengkap!',
      'c) Pada menit ke berapakah cairan tersebut akan mencapai titik didih 100°C?'
    ],
    solutionSteps: [
      'a) Diketahui T(3) = 36 dan T(8) = 61.\n   Nilai a = (61 - 36) / (8 - 3) = 25 / 5 = 5 °C/menit.\n   Substitusi a = 5 ke T(3) = 36 ⇒ 5(3) + b = 36 ⇒ 15 + b = 36 ⇒ b = 21 °C.',
      'b) Rumus fungsi suhu adalah T(t) = 5t + 21.',
      'c) Mencari t saat T(t) = 100:\n   5t + 21 = 100 ⇒ 5t = 79 ⇒ t = 79 / 5 = 15,8 menit (atau 15 menit 48 detik).'
    ],
    finalConclusion: 'Rumus fungsi adalah T(t) = 5t + 21 dan suhu 100°C tercapai pada menit ke-15,8.',
    maxScore: 20
  },
  {
    id: 5,
    title: 'Pengambilan Keputusan Kritis Dua Skema Paket Internet',
    criticalIndicator: 'Eksplanasi & Pengambilan Keputusan',
    problemStatement:
      'Untuk mendukung pembelajaran E-Modul Digital, koperasi menawarkan dua skema paket kuota belajar bulanan:\n• Paket Cerdas A: Biaya langganan tetap Rp15.000 ditambah Rp4.000 per GB.\n• Paket Cerdas B: Tanpa biaya langganan tetap, dengan tarif Rp5.500 per GB.',
    subQuestions: [
      'a) Nyatakan fungsi biaya bulanan f(x) untuk Paket A dan g(x) untuk Paket B jika x adalah jumlah kuota (GB)!',
      'b) Pada pemakaian berapa GB kedua paket tersebut menghasilkan biaya yang persis sama (titik impas)?',
      'c) Jika seorang siswa kelas VIII rata-rata membutuhkan 12 GB per bulan, paket manakah yang lebih hemat? Buktikan dengan perhitungan!'
    ],
    solutionSteps: [
      'a) Rumus fungsi biaya:\n   • Paket A: f(x) = 4.000x + 15.000\n   • Paket B: g(x) = 5.500x',
      'b) Titik impas terjadi saat f(x) = g(x):\n   4.000x + 15.000 = 5.500x\n   15.000 = 1.500x ⇒ x = 10 GB.',
      'c) Untuk pemakaian x = 12 GB:\n   • Biaya Paket A: f(12) = 4.000(12) + 15.000 = 48.000 + 15.000 = Rp63.000.\n   • Biaya Paket B: g(12) = 5.500(12) = Rp66.000.\n   Kesimpulan: Untuk pemakaian di atas 10 GB (seperti 12 GB), Paket Cerdas A lebih hemat Rp3.000 dibandingkan Paket Cerdas B.'
    ],
    finalConclusion: 'Titik impas pada 10 GB; untuk kebutuhan 12 GB, Paket Cerdas A (Rp63.000) lebih hemat.',
    maxScore: 20
  }
];
