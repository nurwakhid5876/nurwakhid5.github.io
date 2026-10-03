export interface RpmMeeting {
  pertemuan: string;
  alokasi: string;
  topik: string;
  pendahuluanDurasi: string;
  pendahuluanItems: { label: string; text: string }[];
  intiDurasi: string;
  intiItems: { label: string; text: string }[];
  diferensiasi: {
    konten?: string;
    proses: string;
    produk: string;
  };
  penutupDurasi: string;
  penutupItems: { label: string; text: string }[];
}

export interface RpmDocumentData {
  id: 'bilangan_bulat' | 'relasi_fungsi';
  judulHeader: string;
  babTitle: string;
  identitas: {
    namaSekolah: string;
    namaPenyusun: string;
    nipPenyusun: string;
    mataPelajaran: string;
    kelasFaseSemester: string;
    alokasiWaktu: string;
    tahunPelajaran: string;
    kepalaSekolah: string;
    pangkatKepsek: string;
    nipKepsek: string;
    tempatTanggal: string;
  };
  kesiapanMurid: {
    pengetahuanAwal: string;
    minat: string;
    latarBelakang: string;
    kebutuhanBelajar: {
      visual: string;
      auditori: string;
      kinestetik: string;
    };
  };
  karakteristikMateri: {
    konseptual: string;
    prosedural: string;
    relevansi: string;
    tingkatKesulitan: string;
    strukturMateri: string;
    integrasiNilai: { label: string; desc: string }[];
  };
  dimensiProfilLulusan: { label: string; desc: string }[];
  capaianPembelajaran: string;
  lintasDisiplin: { mapel: string; desc: string }[];
  tujuanPembelajaran: { pertemuan: string; desc: string }[];
  topikKontekstual: string[];
  kerangkaPembelajaran: {
    model: string;
    pendekatan: string;
    mindful: string;
    meaningful: string;
    joyful: string;
    metode: string;
    diferensiasiKonten: string;
    diferensiasiProses: string;
    diferensiasiProduk: string;
    kemitraanSekolah: string;
    kemitraanLuar: string;
    kemitraanDigital: string;
    ruangFisik: string;
    ruangVirtual: string;
    budayaBelajar: string;
    digitalPerpustakaan: string;
    digitalForum: string;
    digitalPenilaian: string;
    digitalPresentasi: string;
    digitalPublikasi: string;
  };
  pertemuanList: RpmMeeting[];
  asesmen: {
    diagnostik: { label: string; desc: string }[];
    formatif: { label: string; desc: string }[];
    sumatifProyek: { tugas: string; kriteria: string };
    sumatifPraktik: { tugas: string; kriteria: string };
    tesPilihanGanda: {
      no: number;
      soal: string;
      options: string[];
      kunci: string;
      pembahasan: string;
    }[];
    tesEssay: {
      no: number;
      soal: string;
      pembahasan: string;
    }[];
  };
}

export const RPM_BILANGAN_BULAT: RpmDocumentData = {
  id: 'bilangan_bulat',
  judulHeader: 'RENCANA PEMBELAJARAN MENDALAM (RPM)',
  babTitle: 'BAB 1: BILANGAN BULAT',
  identitas: {
    namaSekolah: 'SMP Negeri 1 Sukorame',
    namaPenyusun: 'Nurul Komariyah, S. Pd.',
    nipPenyusun: '19730410 199401 2 002',
    mataPelajaran: 'Matematika',
    kelasFaseSemester: 'VII / D / Ganjil',
    alokasiWaktu: '27 JP (11 kali pertemuan)',
    tahunPelajaran: '2026 / 2027',
    kepalaSekolah: 'WIWIK PUJIATI, S.Pd., M.Si.',
    pangkatKepsek: 'Pembina Utama Muda',
    nipKepsek: '19731017 199802 2 005',
    tempatTanggal: 'Lamongan, 8 Juli 2026'
  },
  kesiapanMurid: {
    pengetahuanAwal:
      'Murid telah mengenal bilangan asli dan operasi hitung dasar (penjumlahan, pengurangan, perkalian, pembagian) di jenjang sekolah dasar. Murid mungkin pernah melihat penggunaan tanda negatif ("-") dalam konteks suhu.',
    minat:
      'Murid memiliki ketertarikan pada permainan, tantangan, dan hal-hal yang berkaitan dengan kehidupan sehari-hari (misalnya, skor game, suhu, keuntungan/kerugian).',
    latarBelakang:
      'Murid berasal dari latar belakang yang beragam, dengan paparan yang berbeda terhadap konsep bilangan negatif dalam kehidupan sehari-hari.',
    kebutuhanBelajar: {
      visual:
        'Murid yang belajar melalui gambar, diagram, dan video. Kebutuhan ini dipenuhi melalui penggunaan garis bilangan, diagram Venn, dan video pembelajaran.',
      auditori:
        'Murid yang belajar melalui penjelasan lisan dan diskusi. Kebutuhan ini dipenuhi melalui diskusi kelompok, presentasi, dan penjelasan guru.',
      kinestetik:
        'Murid yang belajar melalui aktivitas fisik dan praktik langsung. Kebutuhan ini dipenuhi melalui permainan kartu bilangan dan penggunaan alat peraga.'
    }
  },
  karakteristikMateri: {
    konseptual:
      'Memahami konsep bilangan bulat (positif, negatif, dan nol), nilai mutlak, serta sifat-sifat operasi hitung (komutatif, asosiatif, distributif).',
    prosedural:
      'Mampu melakukan operasi aritmetika (penjumlahan, pengurangan, perkalian, pembagian) pada bilangan bulat dan menyelesaikan operasi hitung campuran.',
    relevansi:
      'Konsep bilangan bulat sangat relevan, seperti untuk menyatakan suhu di bawah nol, kedalaman di bawah permukaan laut, keuntungan dan kerugian dalam perdagangan, serta skor dalam permainan.',
    tingkatKesulitan:
      'Sedang. Konsep bilangan negatif dan operasinya merupakan hal baru bagi murid dan memerlukan pemahaman konseptual yang kuat agar tidak terjadi miskonsepsi.',
    strukturMateri:
      'Materi disusun secara sistematis, dimulai dari pengenalan konsep bilangan positif dan negatif, dilanjutkan dengan operasi hitung dasar (penjumlahan, pengurangan, perkalian, pembagian), operasi campuran, dan diakhiri dengan aplikasi dalam pemecahan masalah kontekstual.',
    integrasiNilai: [
      {
        label: 'Keimanan dan Ketakwaan terhadap Tuhan YME, dan Berakhlak Mulia',
        desc: 'Memulai dan mengakhiri pembelajaran dengan doa, serta mensyukuri kegunaan matematika dalam memahami alam ciptaan-Nya.'
      },
      {
        label: 'Bernalar Kritis',
        desc: 'Menganalisis masalah, membuat generalisasi dari pola, dan memberikan argumen logis dalam menyelesaikan soal.'
      },
      {
        label: 'Kreativitas',
        desc: 'Menemukan cara-cara alternatif dalam menyelesaikan masalah dan membuat produk belajar (misalnya, infografis).'
      },
      {
        label: 'Kolaborasi / Bergotong Royong',
        desc: 'Bekerja sama dalam kelompok untuk berdiskusi, memecahkan masalah, dan menyusun laporan.'
      },
      {
        label: 'Kemandirian',
        desc: 'Mengerjakan latihan soal dan tugas secara mandiri dengan rasa tanggung jawab.'
      },
      {
        label: 'Kepedulian',
        desc: 'Menghargai pendapat teman saat berdiskusi dan membantu teman yang mengalami kesulitan.'
      }
    ]
  },
  dimensiProfilLulusan: [
    {
      label: 'Penalaran Kritis',
      desc: 'Menggunakan penalaran untuk memahami konsep, sifat, dan solusi dalam matematika, serta menyelesaikan masalah.'
    },
    {
      label: 'Kreativitas',
      desc: 'Mengembangkan gagasan dan strategi dalam memecahkan masalah matematika.'
    },
    {
      label: 'Kolaborasi',
      desc: 'Bekerja efektif dalam kelompok untuk mencapai tujuan bersama.'
    }
  ],
  capaianPembelajaran:
    'Pada akhir Fase D, murid dapat membaca, menulis, dan membandingkan bilangan bulat, bilangan rasional, bilangan desimal, bilangan berpangkat bulat dan akar, bilangan dalam notasi ilmiah; menerapkan operasi aritmetika pada bilangan real, dan memberikan estimasi/perkiraan dalam menyelesaikan masalah (termasuk berkaitan dengan literasi finansial). Murid dapat menggunakan rasio (skala, proporsi, dan laju perubahan) dalam penyelesaian masalah.',
  lintasDisiplin: [
    {
      mapel: 'Ilmu Pengetahuan Alam (IPA)',
      desc: 'Penggunaan bilangan negatif untuk menyatakan suhu di bawah 0°C dan kedalaman di bawah permukaan laut.'
    },
    {
      mapel: 'Ilmu Pengetahuan Sosial (IPS)',
      desc: 'Konsep untung-rugi dalam kegiatan ekonomi, perbedaan zona waktu.'
    },
    {
      mapel: 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
      desc: 'Penghitungan skor dalam pertandingan olahraga.'
    }
  ],
  tujuanPembelajaran: [
    {
      pertemuan: 'Pertemuan 1 (2 JP)',
      desc: 'Memahami konsep bilangan positif dan negatif untuk menyatakan besaran dengan sifat berlawanan menggunakan titik acuan 0.'
    },
    {
      pertemuan: 'Pertemuan 2 (2 JP)',
      desc: 'Membandingkan besar bilangan positif dan negatif berdasarkan posisinya pada garis bilangan dan nilai mutlaknya menggunakan tanda pertidaksamaan.'
    },
    {
      pertemuan: 'Pertemuan 3 (2 JP)',
      desc: 'Memahami arti penjumlahan bilangan positif dan negatif melalui situasi nyata dan menggunakan garis bilangan untuk menghitungnya.'
    },
    {
      pertemuan: 'Pertemuan 4 (2 JP)',
      desc: 'Menerapkan sifat komutatif dan asosiatif untuk mempermudah perhitungan penjumlahan bilangan bulat.'
    },
    {
      pertemuan: 'Pertemuan 5 (4 JP)',
      desc: 'Memahami arti pengurangan bilangan positif dan negatif, serta mengubah operasi pengurangan menjadi operasi penjumlahan.'
    },
    {
      pertemuan: 'Pertemuan 6 (2 JP)',
      desc: 'Memahami arti perkalian bilangan positif dan negatif serta menghitung hasilnya berdasarkan aturan tanda dan nilai mutlak.'
    },
    {
      pertemuan: 'Pertemuan 7 (2 JP)',
      desc: 'Menerapkan sifat komutatif, asosiatif, dan distributif perkalian serta konsep perpangkatan (eksponen) dalam perhitungan.'
    },
    {
      pertemuan: 'Pertemuan 8 (2 JP)',
      desc: 'Memahami arti pembagian bilangan positif dan negatif serta mengubah operasi pembagian menjadi perkalian dengan kebalikannya.'
    },
    {
      pertemuan: 'Pertemuan 9 (2 JP)',
      desc: 'Menyelesaikan operasi hitung campuran yang melibatkan perkalian dan pembagian bilangan bulat.'
    },
    {
      pertemuan: 'Pertemuan 10 (4 JP)',
      desc: 'Menyelesaikan operasi hitung campuran yang melibatkan empat operasi (penjumlahan, pengurangan, perkalian, pembagian) dan tanda kurung, serta menerapkannya dalam masalah kontekstual.'
    },
    {
      pertemuan: 'Pertemuan 11 (2 JP)',
      desc: 'Merangkum dan mengklasifikasikan himpunan bilangan (asli, bulat) dan menerapkan empat operasi hitung pada himpunan bilangan tersebut.'
    }
  ],
  topikKontekstual: [
    'Suhu dan Perkiraan Cuaca',
    'Ketinggian dan Kedalaman Laut',
    'Keuntungan dan Kerugian dalam Perdagangan',
    'Skor dalam Permainan dan Olahraga',
    'Perbedaan Zona Waktu Antar Kota/Negara'
  ],
  kerangkaPembelajaran: {
    model: 'Problem-Based Learning (Pembelajaran Berbasis Masalah)',
    pendekatan: 'Deep Learning (Mindful, Meaningful, Joyful Learning)',
    mindful:
      'Murid diajak untuk fokus dan sadar penuh selama proses belajar melalui kegiatan apersepsi yang menenangkan, instruksi yang jelas, dan sesi refleksi di akhir pembelajaran untuk menyadari apa yang telah dipelajari dan bagaimana proses belajarnya.',
    meaningful:
      'Pembelajaran dikaitkan langsung dengan pengalaman dan konteks kehidupan nyata murid melalui pertanyaan pemantik dan contoh-contoh relevan (suhu, skor, untung-rugi), sehingga materi terasa lebih bermakna dan bermanfaat.',
    joyful:
      'Suasana belajar dibuat menyenangkan dan tidak menekan melalui penggunaan permainan (kartu bilangan), kerja kelompok yang interaktif, serta penggunaan media pembelajaran yang menarik secara visual.',
    metode: 'Diskusi kelompok, tanya jawab, presentasi, penugasan, eksperimen (permainan).',
    diferensiasiKonten:
      'Menyediakan bahan ajar dalam berbagai format (teks di buku, video pembelajaran, artikel daring) dan tingkat kerumitan (soal dasar dan soal pengayaan).',
    diferensiasiProses:
      'Memberikan bimbingan yang bervariasi sesuai kebutuhan kelompok, memberikan pilihan cara mengerjakan LKPD (misalnya, dengan alat peraga atau langsung dengan rumus), dan memberikan waktu yang fleksibel.',
    diferensiasiProduk:
      'Murid dapat menunjukkan pemahaman mereka melalui berbagai cara, seperti laporan tertulis, presentasi lisan, atau pembuatan infografis/poster.',
    kemitraanSekolah:
      'Pemanfaatan perpustakaan untuk mencari sumber belajar tambahan dan lapangan sekolah untuk aktivitas kinestetik.',
    kemitraanLuar:
      'Mengajak murid mengamati perubahan suhu pada berita cuaca atau mewawancarai pedagang di kantin sekolah tentang konsep untung-rugi.',
    kemitraanDigital:
      'Memanfaatkan platform dan aplikasi pendidikan untuk memperkaya pengalaman belajar.',
    ruangFisik:
      'Pengaturan tempat duduk dibuat fleksibel (berkelompok, klasikal) untuk mendukung berbagai aktivitas pembelajaran. Papan tulis, garis bilangan, dan poster rumus dipajang di dinding kelas.',
    ruangVirtual:
      'Menggunakan Learning Management System (LMS) seperti Google Classroom untuk pengumpulan tugas dan distribusi materi. Pemanfaatan YouTube Edukasi dan Khan Academy sebagai sumber belajar tambahan.',
    budayaBelajar:
      'Menciptakan lingkungan yang aman dan inklusif di mana setiap murid merasa nyaman untuk bertanya, berpendapat, dan membuat kesalahan sebagai bagian dari proses belajar. Menumbuhkan budaya saling menghargai dan kerja sama.',
    digitalPerpustakaan:
      'Buku Sekolah Elektronik (BSE), YouTube Edukasi, Khan Academy, Rumah Belajar Kemdikbud.',
    digitalForum:
      'Grup WhatsApp atau fitur forum di Google Classroom untuk diskusi di luar jam pelajaran.',
    digitalPenilaian:
      'Quizizz, Kahoot, atau Google Forms untuk kuis formatif dan asesmen diagnostik.',
    digitalPresentasi:
      'Canva, Google Slides, atau PowerPoint untuk presentasi hasil diskusi kelompok.',
    digitalPublikasi:
      'Blog sekolah atau media sosial kelas untuk mempublikasikan produk belajar siswa (misalnya infografis).'
  },
  pertemuanList: [
    {
      pertemuan: 'PERTEMUAN 1',
      alokasi: '2 JP : 80 MENIT',
      topik: 'BILANGAN POSITIF DAN NEGATIF',
      pendahuluanDurasi: '15 MENIT',
      pendahuluanItems: [
        {
          label: 'Mindful',
          text: 'Guru menyapa, mengajak murid berdoa, dan memeriksa kehadiran. Guru mengajak murid melakukan teknik relaksasi singkat (misalnya, tarik napas dalam) untuk menciptakan suasana yang tenang dan fokus.'
        },
        {
          label: 'Meaningful',
          text: 'Guru melakukan apersepsi dengan menampilkan gambar termometer yang menunjukkan suhu dingin (misalnya, di Dieng) dan suhu panas (di Surabaya). Guru mengajukan pertanyaan pemantik: "Bagaimana cara kita menuliskan suhu yang berada di bawah angka 0? Pernahkah kalian melihat angka dengan tanda \'-\' di depannya?"'
        },
        {
          label: 'Orientasi Tujuan',
          text: 'Guru menyampaikan tujuan pembelajaran dan gambaran kegiatan yang akan dilakukan.'
        }
      ],
      intiDurasi: '55 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Guru menjelaskan konsep bilangan positif, negatif, dan nol sebagai cara untuk menyatakan besaran yang berlawanan arah dari sebuah titik acuan (0), menggunakan contoh ketinggian gunung dan kedalaman laut.'
        },
        {
          label: 'Joyful',
          text: 'Murid dibagi menjadi beberapa kelompok. Setiap kelompok mendapatkan Lembar Kerja Murid (LKPD) 1.'
        }
      ],
      diferensiasi: {
        proses:
          'Kelompok mendiskusikan cara menyatakan berbagai situasi (untung/rugi, maju/mundur, di atas/di bawah) menggunakan bilangan positif dan negatif. Guru berkeliling memberikan bimbingan sesuai kebutuhan. Kelompok yang lebih cepat dapat diberikan tantangan tambahan.',
        produk:
          'Hasil diskusi dituangkan dalam LKPD. Beberapa kelompok mempresentasikan hasilnya di depan kelas.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Mindful & Meaningful',
          text: 'Murid bersama guru membuat rangkuman tentang konsep bilangan positif dan negatif.'
        },
        {
          label: 'Refleksi',
          text: 'Guru mengajak murid merefleksikan pembelajaran: "Apa hal baru yang kalian pelajari hari ini? Bagian mana yang paling menarik?"'
        },
        {
          label: 'Tindak Lanjut & Penutup',
          text: 'Guru memberikan tugas untuk mencari contoh lain penggunaan bilangan negatif dalam kehidupan sehari-hari. Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 2',
      alokasi: '2 JP : 80 MENIT',
      topik: 'MEMBANDINGKAN BILANGAN BULAT',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        {
          label: 'Mindful',
          text: 'Doa dan presensi. Guru mereview materi sebelumnya melalui tanya jawab singkat.'
        },
        {
          label: 'Meaningful',
          text: 'Guru mengajukan pertanyaan: "Mana yang lebih dingin, suhu -5°C atau -2°C? Mengapa?" untuk mengarahkan ke topik perbandingan. Guru menyampaikan tujuan pembelajaran.'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Joyful',
          text: 'Guru memperkenalkan garis bilangan sebagai "arena" untuk membandingkan bilangan. Murid dalam kelompok mengeksplorasi posisi bilangan bulat (positif dan negatif) pada garis bilangan. Semakin ke kanan, nilai semakin besar; semakin ke kiri, nilai semakin kecil.'
        },
        {
          label: 'Meaningful',
          text: 'Guru mengenalkan konsep nilai mutlak sebagai jarak suatu bilangan dari titik nol, tanpa memperhatikan arahnya.'
        }
      ],
      diferensiasi: {
        proses:
          'Murid mengerjakan LKPD 2 untuk membandingkan pasangan bilangan bulat menggunakan tanda > atau < dan mengurutkan sekelompok bilangan. Murid dapat menggunakan garis bilangan fisik atau digital sebagai alat bantu.',
        produk:
          'Hasil pengerjaan LKPD dan presentasi singkat dari beberapa kelompok untuk menjelaskan alasan perbandingan mereka.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman',
          text: 'Murid menyimpulkan cara membandingkan dan mengurutkan bilangan bulat.'
        },
        {
          label: 'Refleksi & Tindak Lanjut',
          text: '"Apa kesulitan yang kamu temui saat membandingkan bilangan negatif?" Guru memberikan kuis singkat melalui Quizizz. Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 3',
      alokasi: '2 JP : 80 MENIT',
      topik: 'PENJUMLAHAN BILANGAN BULAT',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        {
          label: 'Mindful',
          text: 'Doa, presensi, dan review konsep garis bilangan.'
        },
        {
          label: 'Meaningful',
          text: 'Guru mengajukan pertanyaan pemantik: "Jika sebuah pion permainan maju 3 langkah, lalu mundur 5 langkah, di manakah posisi akhir pion tersebut? Bagaimana kita menuliskannya dalam operasi matematika?" Guru menyampaikan tujuan pembelajaran.'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Joyful',
          text: 'Murid bermain peran atau menggunakan pion di atas garis bilangan yang digambar di lantai/papan tulis untuk memvisualisasikan penjumlahan bilangan bulat (gerak maju untuk positif, gerak mundur untuk negatif).'
        },
        {
          label: 'Meaningful',
          text: 'Dalam kelompok, murid menemukan aturan penjumlahan bilangan bulat (jika tanda sama, dijumlahkan; jika tanda beda, dicari selisihnya dan tandanya mengikuti bilangan dengan nilai mutlak terbesar) melalui LKPD 3.'
        }
      ],
      diferensiasi: {
        proses:
          'Murid dapat memilih menggunakan garis bilangan, alat peraga (kancing positif-negatif), atau langsung menerapkan aturan untuk menyelesaikan soal.',
        produk: 'Hasil pengerjaan LKPD dan presentasi kelompok.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Murid bersama guru merangkum aturan penjumlahan bilangan bulat. Refleksi: "Bagaimana garis bilangan membantumu memahami penjumlahan bilangan negatif?"'
        },
        {
          label: 'Tindak Lanjut',
          text: 'Memberikan latihan soal untuk dikerjakan di rumah. Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 4',
      alokasi: '2 JP : 80 MENIT',
      topik: 'SIFAT-SIFAT PENJUMLAHAN BILANGAN BULAT',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa dan presensi.' },
        {
          label: 'Meaningful',
          text: 'Guru memberikan soal pembuka: "Hitunglah: a) (-5) + 8 dan b) 8 + (-5). Apa yang kalian temukan?" dan "Hitunglah: a) (2 + (-7)) + 4 dan b) 2 + ((-7) + 4). Apa kesimpulannya?"'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Murid secara berkelompok mengerjakan LKPD 4 untuk membuktikan dan menemukan sifat komutatif (pertukaran) dan asosiatif (pengelompokan) pada penjumlahan bilangan bulat. Guru memandu diskusi kelas untuk menyimpulkan bahwa sifat-sifat ini dapat digunakan untuk mempermudah perhitungan.'
        }
      ],
      diferensiasi: {
        proses:
          'Kelompok yang lebih cepat dapat diberikan tantangan untuk membuat soal cerita yang penyelesaiannya lebih mudah jika menggunakan sifat komutatif atau asosiatif.',
        produk:
          'Laporan hasil diskusi kelompok yang menyajikan bukti dan contoh penerapan sifat-sifat penjumlahan.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Rangkuman tentang sifat komutatif dan asosiatif penjumlahan. Refleksi: "Bagaimana sifat asosiatif dapat membantumu menghitung lebih cepat?"'
        },
        {
          label: 'Tindak Lanjut',
          text: 'Kuis singkat tentang penerapan sifat-sifat penjumlahan. Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 5',
      alokasi: '4 JP : 160 MENIT',
      topik: 'PENGURANGAN BILANGAN BULAT',
      pendahuluanDurasi: '15 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa, presensi, dan review penjumlahan.' },
        {
          label: 'Meaningful',
          text: 'Guru mengajukan masalah: "Suhu di puncak gunung pada pagi hari adalah -2°C. Siang harinya suhu naik menjadi 10°C. Berapa kenaikan suhunya?" Ini mengarahkan ke konsep selisih (pengurangan).'
        }
      ],
      intiDurasi: '130 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Guru memperkenalkan konsep kunci: "Mengurangi suatu bilangan sama artinya dengan menjumlahkan dengan lawan bilangan pengurangnya" (a - b = a + (-b) dan a - (-b) = a + b). Murid dalam kelompok berlatih mengubah kalimat pengurangan menjadi kalimat penjumlahan (LKPD 5).'
        },
        {
          label: 'Joyful',
          text: 'Sesi latihan soal dibuat dalam format "stasiun belajar". Setiap kelompok berpindah dari satu stasiun ke stasiun lain untuk menyelesaikan berbagai tipe soal pengurangan.'
        }
      ],
      diferensiasi: {
        konten: 'Soal di setiap stasiun memiliki tingkat kesulitan yang bervariasi.',
        proses:
          'Siswa yang masih kesulitan dapat tetap menggunakan garis bilangan sebagai alat bantu.',
        produk:
          'Jawaban dari setiap stasiun dikumpulkan sebagai portofolio kelompok.'
      },
      penutupDurasi: '15 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Penegasan kembali bahwa setiap operasi pengurangan dapat diubah menjadi operasi penjumlahan. Refleksi: "Apa hubungan antara pengurangan dan penjumlahan bilangan bulat?"'
        },
        {
          label: 'Tindak Lanjut',
          text: 'Memberikan tugas rumah yang berisi soal cerita tentang pengurangan. Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 6',
      alokasi: '2 JP : 80 MENIT',
      topik: 'PERKALIAN BILANGAN BULAT',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa dan presensi.' },
        {
          label: 'Meaningful',
          text: 'Guru mereview konsep perkalian di sekolah dasar sebagai penjumlahan berulang (misal, 3 × 4 = 4 + 4 + 4). Pertanyaan pemantik: "Lalu, apa artinya 3 × (-4)?"'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Murid dalam kelompok melengkapi tabel perkalian pada LKPD 6 untuk menemukan pola dan aturan tanda dalam perkalian bilangan bulat: (+) × (+) = (+), (+) × (–) = (–), (–) × (+) = (–), (–) × (–) = (+). Diskusi kelas untuk mengonfirmasi aturan tanda.'
        }
      ],
      diferensiasi: {
        proses:
          'Kelompok yang kesulitan dapat fokus pada pola penjumlahan berulang, sementara kelompok yang lebih cepat dapat mencoba menjelaskan mengapa (–) × (–) = (+).',
        produk: 'LKPD yang terisi lengkap dengan kesimpulan aturan perkalian.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Merangkum empat aturan tanda dalam perkalian bilangan bulat. Refleksi: "Aturan tanda mana yang menurutmu paling unik? Mengapa?"'
        },
        {
          label: 'Tindak Lanjut',
          text: 'Latihan soal perkalian. Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 7',
      alokasi: '2 JP : 80 MENIT',
      topik: 'SIFAT-SIFAT PERKALIAN DAN PERPANGKATAN',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa, presensi, dan review aturan perkalian.' },
        {
          label: 'Meaningful',
          text: 'Guru mengajukan soal untuk didiskusikan: "Apakah (-2) × 7 sama dengan 7 × (-2)? Bagaimana dengan [(-2) × 3] × 4 dan (-2) × [3 × 4]?"'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Murid membuktikan sifat komutatif, asosiatif, dan distributif pada perkalian melalui LKPD 7. Guru mengenalkan konsep perpangkatan (eksponen) sebagai perkalian berulang dan membahas tanda hasilnya, misal (-2)² vs (-2)³.'
        }
      ],
      diferensiasi: {
        proses:
          'Latihan soal mencakup penerapan sifat distributif untuk menyederhanakan hitungan dan soal perpangkatan dengan basis negatif.',
        produk: 'Hasil pengerjaan LKPD.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Rangkuman sifat-sifat perkalian dan konsep perpangkatan. Refleksi: "Apa perbedaan antara (-3)² dengan -3²?"'
        },
        { label: 'Tindak Lanjut', text: 'Tugas rumah. Salam dan doa.' }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 8',
      alokasi: '2 JP : 80 MENIT',
      topik: 'PEMBAGIAN BILANGAN BULAT',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa dan presensi.' },
        {
          label: 'Meaningful',
          text: 'Guru mengaitkan pembagian sebagai operasi kebalikan dari perkalian. "Jika 5 × (-6) = -30, maka hasil dari (-30) : 5 adalah...?"'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Murid menyimpulkan bahwa aturan tanda pada pembagian sama persis dengan aturan tanda pada perkalian. Guru mengenalkan konsep "kebalikan" (invers perkalian).'
        },
        {
          label: 'Joyful',
          text: 'Latihan soal pembagian dalam bentuk permainan "Siapa Cepat Dia Dapat" di papan tulis.'
        }
      ],
      diferensiasi: {
        proses: 'LKPD 8 berisi soal pembagian langsung dan soal cerita sederhana.',
        produk: 'Hasil pengerjaan LKPD.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Aturan tanda pada pembagian dan hubungannya dengan perkalian. Refleksi: "Mengapa kita tidak bisa membagi dengan nol?"'
        },
        { label: 'Tindak Lanjut', text: 'Latihan soal. Salam dan doa.' }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 9',
      alokasi: '2 JP : 80 MENIT',
      topik: 'OPERASI CAMPURAN PERKALIAN DAN PEMBAGIAN',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        {
          label: 'Mindful',
          text: 'Doa, presensi, dan review aturan perkalian dan pembagian.'
        },
        {
          label: 'Meaningful',
          text: 'Guru memberikan soal: "Hitunglah 24 : (-3) × 2. Apakah hasilnya sama jika kita kerjakan perkalian dulu?"'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Guru menjelaskan bahwa perkalian dan pembagian memiliki tingkatan yang sama kuat, sehingga operasi dikerjakan urut dari kiri ke kanan. Murid berlatih mengerjakan soal-soal operasi campuran perkalian dan pembagian (termasuk perpangkatan) melalui LKPD 9.'
        }
      ],
      diferensiasi: {
        proses:
          'Soal dibuat bervariasi, dari 2 operasi hingga 3-4 operasi campuran.',
        produk: 'Presentasi pembahasan soal oleh beberapa siswa di papan tulis.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Aturan urutan pengerjaan pada operasi campuran perkalian dan pembagian. Refleksi: "Kesalahan apa yang mungkin terjadi saat mengerjakan soal seperti ini?"'
        },
        { label: 'Tindak Lanjut', text: 'Tugas rumah. Salam dan doa.' }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 10',
      alokasi: '4 JP : 160 MENIT',
      topik: 'OPERASI HITUNG CAMPURAN BILANGAN BULAT',
      pendahuluanDurasi: '15 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa dan presensi.' },
        {
          label: 'Meaningful',
          text: 'Guru menampilkan soal 5 + 3 × (-2) dan meminta siswa menjawab. Jawaban yang mungkin beragam (4 atau -1) digunakan untuk menekankan pentingnya aturan urutan operasi.'
        }
      ],
      intiDurasi: '130 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Guru menjelaskan aturan urutan operasi hitung campuran (prioritas): 1. Tanda Kurung ( ), 2. Perpangkatan/Eksponen aⁿ, 3. Perkalian × dan Pembagian ÷ (setara, dari kiri), 4. Penjumlahan + dan Pengurangan – (setara, dari kiri).'
        },
        {
          label: 'Joyful',
          text: 'Murid dalam kelompok mengerjakan soal-soal cerita pada LKPD 10 yang memerlukan penerapan aturan operasi hitung campuran (misalnya soal skor kompetisi).'
        }
      ],
      diferensiasi: {
        konten:
          'LKPD berisi soal prosedural dan soal cerita dengan tingkat kesulitan yang berbeda.',
        proses:
          'Diskusi kolaboratif dengan pemeriksaan langkah demi langkah prioritas operasi.',
        produk:
          'Kelompok membuat satu soal cerita orisinal beserta penyelesaiannya, lalu menukarkannya dengan kelompok lain untuk dipecahkan.'
      },
      penutupDurasi: '15 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Mengulang kembali urutan operasi hitung campuran. Refleksi: "Mengapa penting untuk mengikuti urutan operasi yang benar?"'
        },
        {
          label: 'Tindak Lanjut',
          text: 'Memberikan penjelasan mengenai tugas proyek (Asesmen Sumatif). Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 11',
      alokasi: '2 JP : 80 MENIT',
      topik: 'HIMPUNAN BILANGAN DAN ULASAN BAB',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa dan presensi.' },
        {
          label: 'Meaningful',
          text: 'Guru bertanya, "Dari semua bilangan yang sudah kita pelajari (positif, negatif, nol), bagaimana kita bisa mengelompokkannya?"'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Meaningful',
          text: 'Guru menjelaskan klasifikasi himpunan bilangan (Bilangan Asli, Cacah, Bulat) dan menggambarkannya menggunakan Diagram Venn untuk menunjukkan hubungan antar himpunan tersebut.'
        },
        {
          label: 'Joyful',
          text: 'Sesi ulasan materi keseluruhan Bab 1 dalam bentuk kuis interaktif (Kahoot! atau Quizizz) yang mencakup semua topik, dilanjutkan tanya jawab konsep yang masih dianggap sulit.'
        }
      ],
      diferensiasi: {
        proses: 'Pemetaan konsep visual menggunakan Diagram Venn.',
        produk: 'Ringkasan peta konsep himpunan bilangan.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi 3-2-1',
          text: 'Rangkuman visual seluruh konsep Bab 1. Murid menuliskan 3 hal yang telah dipelajari, 2 hal yang menarik, dan 1 pertanyaan yang masih ada di benak mereka.'
        },
        {
          label: 'Tindak Lanjut',
          text: 'Menginformasikan jadwal dan cakupan materi untuk Asesmen Sumatif Bab 1. Salam dan doa.'
        }
      ]
    }
  ],
  asesmen: {
    diagnostik: [
      {
        label: 'Tanya Jawab Awal Bab',
        desc: 'Guru menanyakan: "Apa yang kalian ketahui tentang bilangan di bawah nol? Di mana kalian pernah melihatnya?"'
      },
      {
        label: 'Kuis Singkat Prasyarat',
        desc: 'Kuis awal menggunakan Google Forms berisi soal-soal prasyarat tentang operasi hitung bilangan asli.'
      }
    ],
    formatif: [
      {
        label: 'Tanya Jawab Terbimbing',
        desc: 'Selama proses pembelajaran, guru mengajukan pertanyaan pengecekan pemahaman, seperti "Jika -3 + 5, kita bergerak ke arah mana pada garis bilangan?"'
      },
      {
        label: 'Observasi Diskusi Kelompok',
        desc: 'Guru mengobservasi keaktifan, kemampuan kerja sama, dan cara bernalar siswa selama diskusi menggunakan lembar observasi.'
      },
      {
        label: 'Latihan Soal / LKPD 1–10',
        desc: 'Penilaian hasil kerja siswa pada LKPD di setiap pertemuan untuk melihat pemahaman konsep dan keterampilan prosedural.'
      },
      {
        label: 'Penilaian Draf Produk (Proses)',
        desc: 'Penilaian terhadap draf atau proses pembuatan sketsa infografis sebelum menjadi hasil akhir.'
      }
    ],
    sumatifProyek: {
      tugas:
        'Membuat poster atau infografis digital/manual yang menunjukkan minimal 5 contoh penerapan konsep bilangan bulat dalam kehidupan sehari-hari.',
      kriteria:
        'Keakuratan konten matematika, relevansi contoh, kreativitas, dan kejelasan informasi.'
    },
    sumatifPraktik: {
      tugas:
        'Mempresentasikan hasil diskusi kelompok atau hasil proyek di depan kelas.',
      kriteria:
        'Kejelasan dalam penyampaian, penguasaan materi, kemampuan menjawab pertanyaan.'
    },
    tesPilihanGanda: [
      {
        no: 1,
        soal: 'Urutan bilangan -11, 5, -8, 0, 2 dari yang terkecil adalah...',
        options: [
          'a. 0, 2, 5, -8, -11',
          'b. -8, -11, 0, 2, 5',
          'c. -11, -8, 0, 2, 5',
          'd. 5, 2, 0, -8, -11'
        ],
        kunci: 'c. -11, -8, 0, 2, 5',
        pembahasan:
          'Pada garis bilangan, semakin ke kiri nilai bilangan semakin kecil. Karena -11 terletak paling kiri, disusul -8, 0, 2, dan 5, maka urutan dari terkecil adalah -11, -8, 0, 2, 5.'
      },
      {
        no: 2,
        soal: 'Suhu di kota A adalah -5°C, sedangkan suhu di kota B adalah 2°C. Selisih suhu kedua kota tersebut adalah...',
        options: ['a. -7°C', 'b. -3°C', 'c. 3°C', 'd. 7°C'],
        kunci: 'd. 7°C',
        pembahasan:
          'Selisih suhu dihitung dari suhu lebih tinggi dikurangi suhu lebih rendah: 2°C - (-5°C) = 2 + 5 = 7°C.'
      },
      {
        no: 3,
        soal: 'Hasil dari (-15) + (-12) × 3 adalah...',
        options: ['a. -81', 'b. -51', 'c. 21', 'd. 81'],
        kunci: 'b. -51',
        pembahasan:
          'Sesuai aturan prioritas operasi hitung campuran, kerjakan perkalian terlebih dahulu: (-12) × 3 = -36. Kemudian jumlahkan: (-15) + (-36) = -51.'
      },
      {
        no: 4,
        soal: 'Sebuah kapal selam berada di kedalaman 200 meter di bawah permukaan laut. Kapal tersebut kemudian naik setinggi 75 meter. Posisi kapal selam sekarang adalah...',
        options: [
          'a. 275 meter di bawah permukaan laut',
          'b. 125 meter di bawah permukaan laut',
          'c. 125 meter di atas permukaan laut',
          'd. 275 meter di atas permukaan laut'
        ],
        kunci: 'b. 125 meter di bawah permukaan laut',
        pembahasan:
          'Kedalaman 200 m di bawah permukaan laut ditulis -200. Naik 75 m ditulis +75. Posisi sekarang = -200 + 75 = -125, artinya 125 meter di bawah permukaan laut.'
      },
      {
        no: 5,
        soal: 'Jika a = -4 dan b = 3, maka nilai dari 2a - b adalah...',
        options: ['a. -11', 'b. -5', 'c. 5', 'd. 11'],
        kunci: 'a. -11',
        pembahasan:
          'Substitusikan a = -4 dan b = 3: 2a - b = 2(-4) - 3 = -8 - 3 = -11.'
      }
    ],
    tesEssay: [
      {
        no: 1,
        soal: 'Dalam sebuah kompetisi matematika, setiap jawaban benar diberi skor 4, jawaban salah diberi skor -2, dan tidak dijawab diberi skor -1. Dari 40 soal yang diberikan, Rina menjawab 35 soal, di mana 28 soal di antaranya dijawab dengan benar. Berapakah total skor yang diperoleh Rina?',
        pembahasan:
          'Diketahui total soal = 40.\n• Soal dijawab benar = 28 soal ⇒ Skor benar = 28 × 4 = 112\n• Soal dijawab salah = 35 - 28 = 7 soal ⇒ Skor salah = 7 × (-2) = -14\n• Soal tidak dijawab = 40 - 35 = 5 soal ⇒ Skor tidak dijawab = 5 × (-1) = -5\n• Total skor Rina = 112 + (-14) + (-5) = 93 poin.'
      },
      {
        no: 2,
        soal: 'Seorang pedagang buah mengalami kerugian sebesar Rp50.000 pada hari pertama. Pada hari kedua, ia mendapat keuntungan sebesar Rp120.000. Pada hari ketiga, ia kembali mengalami kerugian sebesar Rp35.000. Nyatakan keuntungan dan kerugian sebagai bilangan bulat, dan tentukan kondisi keuangan pedagang tersebut setelah tiga hari!',
        pembahasan:
          'Representasi bilangan bulat:\n• Hari ke-1 (Rugi Rp50.000) = -50.000\n• Hari ke-2 (Untung Rp120.000) = +120.000\n• Hari ke-3 (Rugi Rp35.000) = -35.000\nPerhitungan total: (-50.000) + 120.000 + (-35.000) = 70.000 - 35.000 = +35.000.\nKesimpulan: Setelah tiga hari, pedagang tersebut memperoleh keuntungan bersih sebesar Rp35.000.'
      },
      {
        no: 3,
        soal: 'Jelaskan sifat distributif perkalian terhadap penjumlahan pada bilangan bulat dan berikan contohnya menggunakan bilangan (-5) × (4 + 8)!',
        pembahasan:
          'Sifat distributif (penyebaran) perkalian terhadap penjumlahan menyatakan bahwa untuk setiap bilangan bulat a, b, dan c berlaku: a × (b + c) = (a × b) + (a × c).\nPenerapan pada (-5) × (4 + 8):\n• Cara 1 (hitung dalam kurung): (-5) × (4 + 8) = (-5) × 12 = -60\n• Cara 2 (sifat distributif): ((-5) × 4) + ((-5) × 8) = (-20) + (-40) = -60\nKedua cara terbukti menghasilkan nilai yang sama yaitu -60.'
      }
    ]
  }
};

export const RPM_RELASI_FUNGSI: RpmDocumentData = {
  id: 'relasi_fungsi',
  judulHeader: 'RENCANA PEMBELAJARAN MENDALAM (RPM)',
  babTitle: 'BAB RELASI DAN FUNGSI (MENGUNGKAP RAHASIA RELASI & FUNGSI)',
  identitas: {
    namaSekolah: 'SMP Negeri 1 Bantarkawung',
    namaPenyusun: 'NUR WAKHID, S.Pd',
    nipPenyusun: '-',
    mataPelajaran: 'Matematika',
    kelasFaseSemester: 'VIII / D / Ganjil',
    alokasiWaktu: '12 JP (5 kali pertemuan)',
    tahunPelajaran: '2026 / 2027',
    kepalaSekolah: 'Drs. PAIYO',
    pangkatKepsek: 'Pembina',
    nipKepsek: '-',
    tempatTanggal: 'Bantarkawung, Juli 2026'
  },
  kesiapanMurid: {
    pengetahuanAwal:
      'Murid telah mengenal konsep himpunan dasar, pasangan titik pada bidang koordinat Cartesius, serta operasi aljabar linear sederhana di kelas VII.',
    minat:
      'Murid sangat tertarik pada tantangan pemecahan misteri (detektif matematika), simulasi digital interaktif, kode sandi, dan hubungan nyata (seperti sistem loker sekolah, tarif kurir online, dan pilihan hobi).',
    latarBelakang:
      'Murid memiliki tingkat kemampuan berpikir kritis yang beragam dalam membedakan aturan hubungan biasa (relasi) dengan aturan yang memiliki keteraturan tunggal (fungsi/pemetaan).',
    kebutuhanBelajar: {
      visual:
        'Difasilitasi melalui Video Sinematik 3D Hologram, Simulator Diagram Panah Interaktif, dan Grafik Cartesius Real-Time pada E-Modul.',
      auditori:
        'Difasilitasi melalui narasi suara Guru Avatar 3D, diskusi kelompok Problem-Based Learning (PBL), dan presentasi argumen kritis.',
      kinestetik:
        'Difasilitasi melalui eksperimen menghubungkan anak panah pada Laboratorium Simulasi 2-Zona dan misi Game Detektif Relasi & Fungsi.'
    }
  },
  karakteristikMateri: {
    konseptual:
      'Memahami definisi relasi, syarat mutlak fungsi (pemetaan), domain, kodomain, range, korespondensi satu-satu, serta konsep rumus fungsi linear f(x) = ax + b.',
    prosedural:
      'Menyajikan relasi dan fungsi dalam 5 representasi (diagram panah, pasangan berurutan, diagram Cartesius, tabel, dan rumus), menghitung banyak pemetaan n(B)^n(A), serta menentukan nilai dan rumus fungsi.',
    relevansi:
      'Sangat relevan dalam kehidupan modern: pengkodean NISN siswa, penentuan tarif transportasi/ekspedisi berdasarkan jarak/berat, dan basis data komputer.',
    tingkatKesulitan:
      'Sedang hingga Tinggi (HOTS). Membutuhkan penalaran kritis agar murid tidak tertukar antara syarat pada Domain (wajib berpasangan tunggal) dan Kodomain.',
    strukturMateri:
      'Disusun sistematis berbasis investigasi PBL: (1) Konsep Relasi & Representasi, (2) Syarat Mutlak Fungsi vs Relasi Biasa, (3) Domain, Kodomain, Range & Banyak Pemetaan, (4) Korespondensi Satu-Satu, dan (5) Rumus Fungsi Linear f(x) = ax + b.',
    integrasiNilai: [
      {
        label: 'Keimanan dan Ketakwaan terhadap Tuhan YME',
        desc: 'Menyadari keteraturan hukum alam ciptaan Tuhan melalui keteraturan fungsi matematika.'
      },
      {
        label: 'Bernalar Kritis (Fokus Utama)',
        desc: 'Melatih 5 indikator berpikir kritis: Interpretasi, Analisis, Evaluasi, Inferensi, dan Eksplanasi pada setiap kasus PBL.'
      },
      {
        label: 'Kreativitas',
        desc: 'Memodelkan masalah tarif dan sandi kehidupan nyata ke dalam rumus fungsi linear.'
      },
      {
        label: 'Kolaborasi / Bergotong Royong',
        desc: 'Bekerja sama memecahkan kasus LKPD Detektif Relasi & Fungsi.'
      },
      {
        label: 'Kemandirian',
        desc: 'Menyelesaikan evaluasi Game Detektif secara jujur dan mandiri.'
      }
    ]
  },
  dimensiProfilLulusan: [
    {
      label: 'Penalaran Kritis',
      desc: 'Menganalisis syarat keteraturan fungsi, mengevaluasi klaim matematis, dan menyusun bukti logis.'
    },
    {
      label: 'Kreativitas',
      desc: 'Merancang berbagai representasi fungsi dan menemukan pola rumus f(x) = ax + b.'
    },
    {
      label: 'Kolaborasi',
      desc: 'Berdiskusi secara aktif dalam penyelidikan kelompok berbasis masalah (PBL).'
    }
  ],
  capaianPembelajaran:
    'Pada akhir Fase D, murid dapat memahami relasi dan fungsi (domain, kodomain, range) dan menyajikannya dalam bentuk diagram panah, tabel, himpunan pasangan berurutan, dan grafik; serta membedakan beberapa fungsi nonlinear dari fungsi linear secara grafik dan menyelesaikan masalah kontekstual.',
  lintasDisiplin: [
    {
      mapel: 'Informatika & Kriptografi',
      desc: 'Konsep input-proses-output pada mesin fungsi dan sandi korespondensi satu-satu.'
    },
    {
      mapel: 'Ilmu Pengetahuan Sosial (Ekonomi)',
      desc: 'Pemodelan fungsi biaya tetap dan biaya variabel pada tarif ekspedisi/taksi online.'
    },
    {
      mapel: 'Ilmu Pengetahuan Alam (IPA)',
      desc: 'Hubungan linear antara waktu pemanasan dan kenaikan suhu cairan di laboratorium.'
    }
  ],
  tujuanPembelajaran: [
    {
      pertemuan: 'Pertemuan 1 (2 JP)',
      desc: 'Menginterpretasi konsep relasi dua himpunan dari masalah sehari-hari dan menyajikannya dalam diagram panah, pasangan berurutan, dan diagram Cartesius.'
    },
    {
      pertemuan: 'Pertemuan 2 (3 JP)',
      desc: 'Menganalisis syarat mutlak fungsi (pemetaan), membedakan fungsi dan bukan fungsi, serta menentukan Domain, Kodomain, dan Range.'
    },
    {
      pertemuan: 'Pertemuan 3 (2 JP)',
      desc: 'Mengevaluasi banyaknya fungsi yang mungkin n(B)^n(A) serta menganalisis syarat dan banyaknya korespondensi satu-satu (n!).'
    },
    {
      pertemuan: 'Pertemuan 4 (3 JP)',
      desc: 'Menghitung nilai fungsi dan melakukan inferensi untuk menyusun rumus fungsi linear f(x) = ax + b dari dua titik data.'
    },
    {
      pertemuan: 'Pertemuan 5 (2 JP)',
      desc: 'Memecahkan masalah kontekstual HOTS menggunakan fungsi linear dan melaksanakan evaluasi Game Detektif Relasi & Fungsi.'
    }
  ],
  topikKontekstual: [
    'Sistem Kode Loker & Peminjaman Buku Perpustakaan Sekolah',
    'Relasi Siswa dengan Olahraga/Hobi dan Golongan Darah',
    'Nomor Induk Siswa Nasional (NISN) sebagai Korespondensi Satu-Satu',
    'Skema Tarif Ekspedisi Koperasi & Taksi Online',
    'Perbandingan Paket Kuota Internet Belajar'
  ],
  kerangkaPembelajaran: {
    model: 'Problem-Based Learning (PBL) Berfokus Kemampuan Berpikir Kritis',
    pendekatan: 'Deep Learning (Mindful, Meaningful, Joyful Learning)',
    mindful:
      'Murid memulai pembelajaran dengan kesadaran penuh mengamati fenomena keteraturan melalui Video Sinematik 3D dan refleksi metakognitif di setiap tahap PBL.',
    meaningful:
      'Setiap konsep relasi dan fungsi berangkat dari masalah nyata di lingkungan SMP Negeri 1 Bantarkawung sehingga murid merasakan langsung manfaat aljabar.',
    joyful:
      'Pembelajaran dikemas sebagai petualangan "Detektif Matematika" menggunakan Laboratorium Simulasi Interaktif 2-Zona dan Game Detektif terintegrasi Canva Sheet.',
    metode: 'Investigasi PBL, simulasi interaktif, diskusi kritis, tanya jawab, gamifikasi.',
    diferensiasiKonten:
      'Menyediakan Video 3D bersuara, teks ringkasan 5 Rahasia, dan simulator visual interaktif.',
    diferensiasiProses:
      'Murid dapat mengeksplorasi syarat fungsi melalui percobaan langsung di Simulator Diagram Panah atau melalui analisis pasangan berurutan.',
    diferensiasiProduk:
      'Laporan penyelesaian LKPD PBL, argumen tertulis di kolom refleksi kritis, dan rekaman skor Game Detektif.',
    kemitraanSekolah:
      'Observasi sistem penomoran loker/perpustakaan dan koperasi sekolah.',
    kemitraanLuar:
      'Mengamati tabel tarif pengiriman paket kurir dan skema paket data.',
    kemitraanDigital:
      'Pemanfaatan E-Modul Digital Interaktif AI Studio, Canva Sheet Daftar Nilai, dan berbagi via WhatsApp.',
    ruangFisik:
      'Penataan kelompok investigasi detektif matematika (4–5 murid per tim).',
    ruangVirtual:
      'Akses E-Modul Digital Interaktif melalui tautan mode AIS-PRE di perangkat masing-masing.',
    budayaBelajar:
      'Budaya berpikir kritis: setiap klaim jawaban harus disertai alasan ("Mengapa fungsi?" atau "Mengapa bukan fungsi?").',
    digitalPerpustakaan:
      'E-Modul Digital Interaktif Mengungkap Rahasia Relasi & Fungsi karya Nur Wakhid, S.Pd.',
    digitalForum:
      'Tautan Share WA (Mode AIS-PRE) untuk kolaborasi dan diskusi kelas.',
    digitalPenilaian:
      'Game Detektif Relasi & Fungsi yang otomatis tersinkron ke Daftar Nilai.',
    digitalPresentasi:
      'Layar Hologram 3D & Simulator Grafik Cartesius.',
    digitalPublikasi:
      'Integrasi Data Daftar Nilai Canva Sheet yang dapat diakses langsung oleh pengembang/guru.'
  },
  pertemuanList: [
    {
      pertemuan: 'PERTEMUAN 1',
      alokasi: '2 JP : 80 MENIT',
      topik: 'KONSEP RELASI DAN TIGA REPRESENTASI UTAMA',
      pendahuluanDurasi: '15 MENIT',
      pendahuluanItems: [
        {
          label: 'Mindful',
          text: 'Guru menyapa, berdoa bersama, mengecek kehadiran, dan mengajak murid menayangkan Scene 1 & Scene 2 Video Sinematik 3D "Mengungkap Rahasia Relasi dan Fungsi".'
        },
        {
          label: 'Meaningful',
          text: 'Pertanyaan pemantik: "Ketika Andi memilih Sepak Bola, Siti memilih Bulu Tangkis, dan Budi memilih Bola Basket, bagaimana matematika mencatat hubungan tersebut secara rapi?"'
        }
      ],
      intiDurasi: '55 MENIT',
      intiItems: [
        {
          label: 'Meaningful (Orientasi Masalah PBL)',
          text: 'Murid mengamati Scene 3 Video 3D dan Bab 01 E-Modul tentang aturan relasi antara dua himpunan (contoh: "faktor prima dari" atau "menyukai olahraga").'
        },
        {
          label: 'Joyful (Eksplorasi Simulasi)',
          text: 'Murid mencoba menghubungkan anggota Himpunan A ke Himpunan B pada Simulator Diagram Panah dan mengamati perubahan otomatis pada Himpunan Pasangan Berurutan.'
        }
      ],
      diferensiasi: {
        proses:
          'Kelompok visual fokus pada konstruksi Diagram Panah dan Cartesius; kelompok analitis menyusun aturan relasi dari himpunan pasangan berurutan.',
        produk:
          'Penyajian satu kasus relasi nyata di kelas dalam 3 bentuk representasi (Diagram Panah, Pasangan Berurutan, dan Cartesius).'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Mindful & Meaningful',
          text: 'Menyimpulkan bahwa relasi adalah aturan yang memasangkan anggota himpunan A dengan anggota himpunan B tanpa syarat pembatasan cabang.'
        },
        {
          label: 'Refleksi & Tindak Lanjut',
          text: 'Refleksi: "Mengapa urutan (x, y) pada pasangan berurutan tidak boleh dibalik?" Penutup dengan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 2',
      alokasi: '3 JP : 120 MENIT',
      topik: 'MISTERI SYARAT MUTLAK FUNGSI, DOMAIN, KODOMAIN, DAN RANGE',
      pendahuluanDurasi: '15 MENIT',
      pendahuluanItems: [
        {
          label: 'Mindful',
          text: 'Doa, presensi, dan pemutaran Scene 4 & Scene 5 Video Sinematik 3D ("Misteri: Kapan Relasi Menjadi Fungsi?" & "Tantangan Detektif").'
        },
        {
          label: 'Meaningful',
          text: 'Masalah Pemantik PBL: "Mengapa di perpustakaan 1 siswa boleh meminjam 2 buku (Relasi), tetapi 1 siswa hanya boleh memiliki tepat 1 nomor loker aktif (Fungsi)?"'
        }
      ],
      intiDurasi: '90 MENIT',
      intiItems: [
        {
          label: 'Meaningful (Penyelidikan Kritis)',
          text: 'Murid mengerjakan Kasus 1 & Kasus 2 pada LKPD PBL Interaktif untuk menemukan dua syarat mutlak fungsi: (1) Semua anggota Domain wajib berpasangan, dan (2) Tidak boleh bercabang di Domain.'
        },
        {
          label: 'Joyful (Laboratorium Detektor Fungsi)',
          text: 'Murid menguji 4 skenario pada Simulator Diagram Panah dan memperhatikan diagnosis otomatis (Fungsi Valid vs Bukan Fungsi) beserta identifikasi Domain, Kodomain, dan Range.'
        }
      ],
      diferensiasi: {
        proses:
          'Bimbingan terbimbing menggunakan Simulator Detektor Fungsi bagi murid yang masih bingung membedakan cabang di Domain vs cabang di Kodomain.',
        produk:
          'Argumen kritis tertulis pada LKPD PBL Tahap 1 & Tahap 2 yang tersimpan ke Daftar Nilai.'
      },
      penutupDurasi: '15 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi Kritis',
          text: 'Menegaskan bahwa setiap fungsi adalah relasi, tetapi tidak setiap relasi adalah fungsi. Refleksi: "Mengapa dua siswa boleh memiliki tanggal lahir yang sama dan tetap disebut fungsi?"'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 3',
      alokasi: '2 JP : 80 MENIT',
      topik: 'BANYAKNYA PEMETAAN DAN KORESPONDENSI SATU-SATU',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa, presensi, dan apersepsi fokus.' },
        {
          label: 'Meaningful',
          text: 'Pertanyaan pemantik: "Jika ada 3 perwakilan siswa dan 4 bidang lomba OSN, berapa banyak cara pemetaan yang mungkin? Bagaimana jika 5 ketua regu Pramuka menempati 5 tenda secara satu-satu?"'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Meaningful (Evaluasi Klaim PBL)',
          text: 'Murid mengevaluasi klaim Raka (3⁴ = 81) vs Dinda (4³ = 64) pada LKPD PBL Tahap 3 hingga menemukan rumus banyak fungsi n(B)^n(A) dan korespondensi satu-satu n!.'
        }
      ],
      diferensiasi: {
        proses:
          'Pendaftaran manual diagram panah untuk himpunan kecil sebelum menggeneralisasi rumus eksponen dan faktorial.',
        produk: 'Penyelesaian LKPD PBL Tahap 3 dan pembuktian kombinatorika.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Merangkum perbedaan rumus n(B)^n(A) dan n!. Salam dan doa.'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 4',
      alokasi: '3 JP : 120 MENIT',
      topik: 'MESIN FUNGSI DAN MENEMUKAN RUMUS FUNGSI LINEAR f(x) = ax + b',
      pendahuluanDurasi: '15 MENIT',
      pendahuluanItems: [
        { label: 'Mindful', text: 'Doa dan presensi.' },
        {
          label: 'Meaningful',
          text: 'Menampilkan masalah Tarif Ekspedisi Koperasi: paket 2 kg bertarif Rp19.000 dan paket 5 kg bertarif Rp40.000. Bagaimana menemukan rumus tarif untuk berat x kg?'
        }
      ],
      intiDurasi: '90 MENIT',
      intiItems: [
        {
          label: 'Joyful (Simulator Mesin Fungsi Linear)',
          text: 'Murid menggeser slider gradien (a), konstanta (b), dan input (x) pada Laboratorium Simulasi 02 untuk mengamati perubahan grafik garis lurus pada bidang Cartesius.'
        },
        {
          label: 'Meaningful (Inferensi Rumus)',
          text: 'Murid menyelesaikan LKPD PBL Tahap 4 menggunakan metode selisih a = (y₂ - y₁)/(x₂ - x₁) dan menyimpan skor LKPD PBL ke Daftar Nilai.'
        }
      ],
      diferensiasi: {
        proses:
          'Pendekatan tabel selisih bertahap bagi murid yang membutuhkan bantuan visual, dan pendekatan eliminasi aljabar bagi murid yang lebih mahir.',
        produk:
          'Rumus fungsi f(x) = ax + b beserta grafik Cartesius dan skor akhir LKPD PBL.'
      },
      penutupDurasi: '15 MENIT',
      penutupItems: [
        {
          label: 'Rangkuman & Refleksi',
          text: 'Menyimpulkan makna fisis gradien a (tarif per satuan) dan konstanta b (biaya tetap).'
        }
      ]
    },
    {
      pertemuan: 'PERTEMUAN 5',
      alokasi: '2 JP : 80 MENIT',
      topik: 'PEMECAHAN MASALAH HOTS & EVALUASI GAME DETEKTIF',
      pendahuluanDurasi: '10 MENIT',
      pendahuluanItems: [
        {
          label: 'Mindful',
          text: 'Doa, presensi, dan menayangkan Scene 6 Video 3D ("Ajakan Memulai Misi").'
        },
        {
          label: 'Meaningful',
          text: 'Memastikan setiap murid telah mengisi Header Kolom Entri Pengguna [Nama, Kelas, No Absen, Sekolah].'
        }
      ],
      intiDurasi: '60 MENIT',
      intiItems: [
        {
          label: 'Joyful & Meaningful',
          text: 'Murid mengerjakan 10 Kasus Game Detektif Relasi & Fungsi (HOTS Berpikir Kritis) dan mempelajari pembahasan kritis di setiap nomor. Skor otomatis terekam pada Daftar Nilai Canva Sheet.'
        }
      ],
      diferensiasi: {
        proses:
          'Tersedia fitur Petunjuk Detektif (Hint) pada setiap kasus untuk mendukung murid secara adaptif.',
        produk:
          'Rekapitulasi Nilai Akhir pada Daftar Nilai Canva Sheet dan dokumen Soal & Pembahasan Word.'
      },
      penutupDurasi: '10 MENIT',
      penutupItems: [
        {
          label: 'Refleksi Akhir Bab',
          text: 'Guru menampilkan rekapitulasi Daftar Nilai dan mengapresiasi capaian berpikir kritis seluruh murid. Salam dan doa.'
        }
      ]
    }
  ],
  asesmen: {
    diagnostik: [
      {
        label: 'Tanya Jawab Kontekstual',
        desc: 'Mengecek pemahaman awal tentang cara mengelompokkan anggota himpunan dan membaca titik koordinat (x, y).'
      },
      {
        label: 'Identifikasi Kesiapan Digital',
        desc: 'Memastikan murid siap menggunakan simulasi diagram panah dan mengisi entri [Nama, Kelas, No Absen, Sekolah].'
      }
    ],
    formatif: [
      {
        label: 'LKPD PBL Interaktif (4 Tahap Kritis)',
        desc: 'Menilai kemampuan Interpretasi, Analisis, Evaluasi, dan Inferensi pada 4 kasus kontekstual.'
      },
      {
        label: 'Eksplorasi Laboratorium Simulasi 2-Zona',
        desc: 'Observasi ketepatan murid dalam mendiagnosis syarat fungsi dan menginterpretasi grafik f(x) = ax + b.'
      }
    ],
    sumatifProyek: {
      tugas:
        'Membuat poster/tabel investigasi perbandingan dua skema tarif layanan nyata (ekspedisi atau kuota belajar) menggunakan rumus fungsi linear.',
      kriteria:
        'Ketepatan rumus fungsi f(x) = ax + b, ketepatan grafik Cartesius, dan kedalaman argumen pengambilan keputusan.'
    },
    sumatifPraktik: {
      tugas:
        'Mempresentasikan bukti kritis mengapa suatu relasi merupakan fungsi atau bukan fungsi di depan kelas.',
      kriteria:
        'Ketepatan penggunaan istilah Domain, Kodomain, Range, serta kejelasan argumen logis.'
    },
    tesPilihanGanda: [
      {
        no: 1,
        soal: 'Diketahui P = {2, 3, 5} dan Q = {4, 6, 9, 10, 15}. Relasi R = {(2,4), (2,6), (2,10), (3,6), (3,9), (3,15), (5,10), (5,15)}. Aturan relasi dari P ke Q adalah...',
        options: [
          'a. Kurang dari',
          'b. Setengah dari',
          'c. Faktor prima dari',
          'd. Akar kuadrat dari'
        ],
        kunci: 'c. Faktor prima dari',
        pembahasan:
          'Setiap anggota P = {2, 3, 5} merupakan bilangan prima yang membagi habis pasangannya di Q.'
      },
      {
        no: 2,
        soal: 'Dari himpunan A = {a, b, c} ke B = {1, 2, 3}, manakah pasangan berurutan yang merupakan FUNGSI?',
        options: [
          'a. {(a,1), (b,2), (b,3), (c,1)}',
          'b. {(a,2), (b,2), (c,2)}',
          'c. {(a,1), (c,3)}',
          'd. {(a,1), (a,2), (a,3)}'
        ],
        kunci: 'b. {(a,2), (b,2), (c,2)}',
        pembahasan:
          'Semua anggota domain A (a, b, c) hadir dan masing-masing hanya muncul tepat satu kali sebagai komponen pertama.'
      },
      {
        no: 3,
        soal: 'Diketahui A = {2, 3, 4, 5} dan B = {huruf vokal dalam kata "MATEMATIKA"}. Banyaknya fungsi dari A ke B adalah...',
        options: ['a. 64', 'b. 81', 'c. 12', 'd. 27'],
        kunci: 'b. 81',
        pembahasan:
          'n(A) = 4 dan B = {A, E, I} sehingga n(B) = 3. Banyak fungsi dari A ke B = n(B)^n(A) = 3⁴ = 81.'
      },
      {
        no: 4,
        soal: 'Sebuah mesin fungsi ditentukan oleh f(x) = 4x - 7. Jika f(k) = 25, maka nilai k adalah...',
        options: ['a. 4,5', 'b. 6', 'c. 8', 'd. 93'],
        kunci: 'c. 8',
        pembahasan: '4k - 7 = 25 ⇒ 4k = 32 ⇒ k = 8.'
      },
      {
        no: 5,
        soal: 'Suatu fungsi linear f(x) = ax + b memenuhi f(2) = 1 dan f(5) = 10. Nilai dari f(-2) adalah...',
        options: ['a. -11', 'b. -9', 'c. -7', 'd. 1'],
        kunci: 'a. -11',
        pembahasan:
          'a = (10 - 1)/(5 - 2) = 3, dan 3(2) + b = 1 ⇒ b = -5. Rumus f(x) = 3x - 5, maka f(-2) = 3(-2) - 5 = -11.'
      }
    ],
    tesEssay: [
      {
        no: 1,
        soal: 'Himpunan Siswa S = {Aldi, Bela, Ciko, Dini} dan Golongan Darah G = {A, B, AB, O} memiliki data: {(Aldi, O), (Bela, A), (Ciko, B), (Dini, O)}. Apakah relasi S → G merupakan fungsi? Bagaimana jika dibalik menjadi G → S?',
        pembahasan:
          'Relasi S → G adalah FUNGSI karena setiap siswa punya tepat 1 golongan darah. Sebaliknya G → S BUKAN FUNGSI karena golongan darah AB tidak punya pasangan dan golongan darah O bercabang ke Aldi dan Dini.'
      },
      {
        no: 2,
        soal: 'Pada eksperimen pemanasan cairan T(t) = at + b, suhu pada menit ke-3 adalah 36°C dan pada menit ke-8 adalah 61°C. Tentukan rumus T(t) dan waktu saat mencapai 100°C!',
        pembahasan:
          'a = (61 - 36)/(8 - 3) = 5°C/menit. b = 36 - 5(3) = 21°C. Jadi T(t) = 5t + 21. Saat T(t) = 100 ⇒ 5t + 21 = 100 ⇒ 5t = 79 ⇒ t = 15,8 menit.'
      },
      {
        no: 3,
        soal: 'Paket kuota A bertarif Rp15.000 + Rp4.000/GB, sedangkan Paket B bertarif Rp5.500/GB tanpa biaya tetap. Tentukan titik impas (GB) dan paket yang lebih hemat untuk kebutuhan 12 GB!',
        pembahasan:
          'Titik impas: 4.000x + 15.000 = 5.500x ⇒ 1.500x = 15.000 ⇒ x = 10 GB. Untuk 12 GB: Paket A = Rp63.000 dan Paket B = Rp66.000, sehingga Paket A lebih hemat Rp3.000.'
      }
    ]
  }
};
