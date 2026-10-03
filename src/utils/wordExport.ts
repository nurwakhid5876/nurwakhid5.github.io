import { APP_CONFIG, ESSAY_QUESTIONS_FOR_WORD, QUIZ_QUESTIONS } from '../data/emodulContent';
import { PaketBankSoal } from '../data/bankSoalContent';
import { RpmDocumentData } from '../data/rpmContent';
import { TKA_META, TKA_QUESTIONS } from '../data/tkaKelas7Data';
import { StudentIdentity } from '../types';

export function downloadQuestionsAndSolutionsWord(student?: StudentIdentity) {
  const optionLetters = ['A', 'B', 'C', 'D'];

  const multipleChoiceHtml = QUIZ_QUESTIONS.map((q, idx) => {
    const optionsHtml = q.options
      .map(
        (opt, oIdx) =>
          `<p style="margin: 2pt 0 2pt 18pt; font-size: 11pt;"><strong>${optionLetters[oIdx]}.</strong> ${opt}</p>`
      )
      .join('');

    return `
      <div style="margin-bottom: 14pt; page-break-inside: avoid;">
        <p style="margin: 0 0 4pt 0; font-size: 11pt;">
          <strong>${idx + 1}. [${q.criticalIndicator} — ${q.caseTitle}]</strong><br/>
          ${q.scenario}
        </p>
        ${
          q.mathData
            ? `<p style="margin: 4pt 0 6pt 18pt; padding: 6pt 10pt; background-color: #F1F5F9; border-left: 3pt solid #0284C7; font-family: 'Courier New', monospace; font-size: 10.5pt; white-space: pre-line;">${q.mathData}</p>`
            : ''
        }
        <p style="margin: 0 0 4pt 18pt; font-size: 11pt;"><strong>Pertanyaan:</strong> ${q.question}</p>
        ${optionsHtml}
      </div>
    `;
  }).join('');

  const essayHtml = ESSAY_QUESTIONS_FOR_WORD.map((eq) => {
    const subs = eq.subQuestions
      .map((sq) => `<p style="margin: 2pt 0 2pt 20pt; font-size: 11pt;">${sq}</p>`)
      .join('');
    return `
      <div style="margin-bottom: 14pt; page-break-inside: avoid;">
        <p style="margin: 0 0 4pt 0; font-size: 11pt;">
          <strong>Soal Uraian ${eq.id}. (${eq.title} — Indikator: ${eq.criticalIndicator} · Skor Maks: ${eq.maxScore})</strong><br/>
          ${eq.problemStatement.replace(/\n/g, '<br/>')}
        </p>
        ${subs}
      </div>
    `;
  }).join('');

  const mcSolutionsHtml = QUIZ_QUESTIONS.map((q, idx) => {
    const correctLetter = optionLetters[q.correctIndex];
    return `
      <tr>
        <td style="border: 1pt solid #CBD5E1; padding: 6pt; text-align: center; font-weight: bold;">${idx + 1}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 6pt;">${q.criticalIndicator}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 6pt; text-align: center; font-weight: bold; color: #0369A1;">${correctLetter}. ${q.options[q.correctIndex]}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 6pt; font-size: 10pt;">${q.explanation.replace(/\n/g, '<br/>')}</td>
      </tr>
    `;
  }).join('');

  const essaySolutionsHtml = ESSAY_QUESTIONS_FOR_WORD.map((eq) => {
    const steps = eq.solutionSteps
      .map((st) => `<p style="margin: 3pt 0 3pt 12pt; font-size: 10.5pt;">${st.replace(/\n/g, '<br/>')}</p>`)
      .join('');
    return `
      <div style="margin-bottom: 12pt; padding: 8pt; border: 1pt solid #CBD5E1; background-color: #F8FAFC; page-break-inside: avoid;">
        <p style="margin: 0 0 4pt 0; font-size: 11pt; font-weight: bold; color: #0F172A;">
          Pembahasan Uraian ${eq.id}: ${eq.title} (Skor Maksimal: ${eq.maxScore})
        </p>
        ${steps}
        <p style="margin: 4pt 0 0 12pt; font-size: 10.5pt; font-weight: bold; color: #047857;">
          Kesimpulan Kritis: ${eq.finalConclusion}
        </p>
      </div>
    `;
  }).join('');

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <title>Soal dan Pembahasan Relasi & Fungsi Kelas VIII - ${APP_CONFIG.developerName}</title>
      <style>
        @page {
          size: 21cm 29.7cm;
          margin: 2cm 2cm 2cm 2cm;
        }
        body {
          font-family: "Times New Roman", Georgia, serif;
          font-size: 11pt;
          line-height: 1.45;
          color: #0F172A;
        }
        h1, h2, h3 {
          font-family: "Arial", sans-serif;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div style="border-bottom: 2.5pt double #0F172A; padding-bottom: 8pt; margin-bottom: 14pt; text-align: center;">
        <p style="margin: 0; font-size: 13pt; font-weight: bold; letter-spacing: 0.5pt;">
          📘 E-MODUL DIGITAL INTERAKTIF: MENGUNGKAP RAHASIA RELASI &amp; FUNGSI
        </p>
        <p style="margin: 2pt 0; font-size: 11.5pt; font-weight: bold;">
          Mata Pelajaran: Matematika SMP/MTs Kelas VIII (Semester Ganjil)
        </p>
        <p style="margin: 2pt 0; font-size: 10.5pt; font-style: italic;">
          “Temukan hubungan, buktikan keteraturan, dan pecahkan misterinya!”
        </p>
        <p style="margin: 4pt 0 0 0; font-size: 10pt;">
          Model Pembelajaran: <strong>Problem Based Learning (PBL)</strong> · Fokus: <strong>Kemampuan Berpikir Kritis</strong><br/>
          Nama Pengembang: <strong>${APP_CONFIG.developerName}</strong> · Instansi: <strong>SMP Negeri 1 Bantarkawung</strong>
        </p>
      </div>

      <table style="margin-bottom: 16pt; border: 1pt solid #0F172A;">
        <tr style="background-color: #E2E8F0;">
          <th colspan="4" style="padding: 6pt; text-align: left; font-family: Arial, sans-serif; font-size: 10pt; border-bottom: 1pt solid #0F172A;">
            IDENTITAS PENGGUNA GAME &amp; EVALUASI E-MODUL [Nama, Kelas, No Absen, Sekolah]
          </th>
        </tr>
        <tr>
          <td style="padding: 6pt; width: 18%; font-weight: bold; border: 1pt solid #CBD5E1;">Nama</td>
          <td style="padding: 6pt; width: 32%; border: 1pt solid #CBD5E1;">${student?.nama || '................................................'}</td>
          <td style="padding: 6pt; width: 18%; font-weight: bold; border: 1pt solid #CBD5E1;">No Absen</td>
          <td style="padding: 6pt; width: 32%; border: 1pt solid #CBD5E1;">${student?.noAbsen || '................................................'}</td>
        </tr>
        <tr>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Kelas</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student?.kelas || 'VIII (Delapan) ....'}</td>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Sekolah</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student?.sekolah || 'SMP Negeri 1 Bantarkawung'}</td>
        </tr>
      </table>

      <h3 style="font-size: 12pt; margin: 12pt 0 8pt 0; padding: 4pt 8pt; background-color: #0F172A; color: #FFFFFF;">
        BAGIAN I — SOAL PILIHAN GANDA BERPIKIR KRITIS BERBASIS PBL (10 NOMOR)
      </h3>
      <p style="margin: 0 0 10pt 0; font-size: 10.5pt; font-style: italic;">
        Petunjuk: Analisis setiap kasus permasalahan berikut dengan kritis, lalu pilihlah satu jawaban yang paling tepat!
      </p>
      ${multipleChoiceHtml}

      <h3 style="font-size: 12pt; margin: 18pt 0 8pt 0; padding: 4pt 8pt; background-color: #0F172A; color: #FFFFFF;">
        BAGIAN II — SOAL URAIAN PEMECAHAN MASALAH (HOTS &amp; BERPIKIR KRITIS - 5 NOMOR)
      </h3>
      <p style="margin: 0 0 10pt 0; font-size: 10.5pt; font-style: italic;">
        Petunjuk: Selesaikan permasalahan berikut secara sistematis disertai alasan logis dan pembuktian matematis!
      </p>
      ${essayHtml}

      <br clear="all" style="page-break-before: always;" />

      <div style="border-bottom: 2pt solid #0F172A; padding-bottom: 6pt; margin-bottom: 12pt;">
        <h2 style="margin: 0; font-size: 13pt;">
          KUNCI JAWABAN, INDIKATOR BERPIKIR KRITIS, DAN PEMBAHASAN LENGKAP
        </h2>
        <p style="margin: 2pt 0 0 0; font-size: 10pt;">
          E-Modul Digital Interaktif Relasi &amp; Fungsi Kelas VIII — Pengembang: <strong>${APP_CONFIG.developerName}</strong>
        </p>
      </div>

      <h3 style="font-size: 11.5pt; margin: 10pt 0 6pt 0;">
        A. Pembahasan Soal Pilihan Ganda (Skor: 10 × 10 = 100 Poin)
      </h3>
      <table style="margin-bottom: 16pt;">
        <thead>
          <tr style="background-color: #E2E8F0; font-family: Arial, sans-serif; font-size: 10pt;">
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 6%;">No</th>
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 16%;">Indikator Kritis</th>
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 25%;">Kunci Jawaban</th>
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 53%;">Pembahasan &amp; Alasan Logis</th>
          </tr>
        </thead>
        <tbody>
          ${mcSolutionsHtml}
        </tbody>
      </table>

      <h3 style="font-size: 11.5pt; margin: 14pt 0 6pt 0;">
        B. Pembahasan Soal Uraian PBL Berpikir Kritis (Skor: 5 × 20 = 100 Poin)
      </h3>
      ${essaySolutionsHtml}

      <div style="margin-top: 24pt; text-align: right; font-size: 10.5pt;">
        <p style="margin: 0;">Bantarkawung, ........................................ 2026</p>
        <p style="margin: 2pt 0 36pt 0;">Pengembang E-Modul Digital Interaktif,</p>
        <p style="margin: 0; font-weight: bold; text-decoration: underline;">${APP_CONFIG.developerName}</p>
        <p style="margin: 2pt 0 0 0; font-size: 9.5pt; color: #475569;">Matematika SMP/MTs Kelas VIII</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Soal_dan_Pembahasan_Relasi_Fungsi_Kelas_VIII_Nur_Wakhid.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadRpmWordDocument(rpm: RpmDocumentData) {
  const pertemuanHtml = rpm.pertemuanList
    .map((p) => {
      const pendahuluan = p.pendahuluanItems
        .map((it) => `<li><strong>${it.label}:</strong> ${it.text}</li>`)
        .join('');
      const inti = p.intiItems
        .map((it) => `<li><strong>${it.label}:</strong> ${it.text}</li>`)
        .join('');
      const penutup = p.penutupItems
        .map((it) => `<li><strong>${it.label}:</strong> ${it.text}</li>`)
        .join('');

      return `
        <div style="margin-bottom: 14pt; border: 1pt solid #CBD5E1; padding: 10pt; page-break-inside: avoid;">
          <p style="margin: 0 0 4pt 0; font-size: 11.5pt; font-weight: bold; background-color: #E2E8F0; padding: 4pt 6pt;">
            ${p.pertemuan} (${p.alokasi}) — Topik: ${p.topik}
          </p>
          <p style="margin: 6pt 0 2pt 0; font-weight: bold;">KEGIATAN PENDAHULUAN (${p.pendahuluanDurasi})</p>
          <ul style="margin: 2pt 0 6pt 18pt; padding: 0;">${pendahuluan}</ul>

          <p style="margin: 6pt 0 2pt 0; font-weight: bold;">KEGIATAN INTI (${p.intiDurasi})</p>
          <ul style="margin: 2pt 0 6pt 18pt; padding: 0;">
            ${inti}
            <li>
              <strong>Pembelajaran Berdiferensiasi:</strong>
              <ul style="margin: 2pt 0 2pt 16pt;">
                ${p.diferensiasi.konten ? `<li><em>Konten:</em> ${p.diferensiasi.konten}</li>` : ''}
                <li><em>Proses:</em> ${p.diferensiasi.proses}</li>
                <li><em>Produk:</em> ${p.diferensiasi.produk}</li>
              </ul>
            </li>
          </ul>

          <p style="margin: 6pt 0 2pt 0; font-weight: bold;">KEGIATAN PENUTUP (${p.penutupDurasi})</p>
          <ul style="margin: 2pt 0 0 18pt; padding: 0;">${penutup}</ul>
        </div>
      `;
    })
    .join('');

  const pgHtml = rpm.asesmen.tesPilihanGanda
    .map(
      (q) => `
      <div style="margin-bottom: 10pt; page-break-inside: avoid;">
        <p style="margin: 0 0 3pt 0;"><strong>${q.no}.</strong> ${q.soal}</p>
        ${q.options.map((o) => `<p style="margin: 1pt 0 1pt 16pt;">${o}</p>`).join('')}
        <p style="margin: 3pt 0 0 16pt; font-size: 10pt; color: #0369A1;">
          <strong>Kunci:</strong> ${q.kunci} | <em>Pembahasan:</em> ${q.pembahasan}
        </p>
      </div>
    `
    )
    .join('');

  const essayHtml = rpm.asesmen.tesEssay
    .map(
      (e) => `
      <div style="margin-bottom: 10pt; page-break-inside: avoid;">
        <p style="margin: 0 0 3pt 0;"><strong>${e.no}.</strong> ${e.soal}</p>
        <p style="margin: 3pt 0 0 16pt; font-size: 10pt; color: #047857;">
          <strong>Pembahasan:</strong><br/>${e.pembahasan.replace(/\n/g, '<br/>')}
        </p>
      </div>
    `
    )
    .join('');

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <title>${rpm.judulHeader} - ${rpm.babTitle}</title>
      <style>
        @page {
          size: 21cm 29.7cm;
          margin: 2cm 2cm 2cm 2cm;
        }
        body {
          font-family: "Times New Roman", Georgia, serif;
          font-size: 11pt;
          line-height: 1.45;
          color: #0F172A;
        }
        h1, h2, h3 {
          font-family: "Arial", sans-serif;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div style="text-align: center; border-bottom: 2.5pt double #0F172A; padding-bottom: 8pt; margin-bottom: 14pt;">
        <h2 style="margin: 0; font-size: 13.5pt;">${rpm.judulHeader}</h2>
        <p style="margin: 2pt 0; font-size: 12pt; font-weight: bold;">MATA PELAJARAN : MATEMATIKA</p>
        <p style="margin: 2pt 0; font-size: 12pt; font-weight: bold;">${rpm.babTitle}</p>
      </div>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">A. IDENTITAS MODUL</h3>
      <table style="margin-bottom: 12pt; border: 1pt solid #CBD5E1;">
        <tr><td style="padding: 5pt; width: 32%; font-weight: bold; border: 1pt solid #CBD5E1;">Nama Sekolah</td><td style="padding: 5pt; border: 1pt solid #CBD5E1;">${rpm.identitas.namaSekolah}</td></tr>
        <tr><td style="padding: 5pt; font-weight: bold; border: 1pt solid #CBD5E1;">Nama Penyusun</td><td style="padding: 5pt; border: 1pt solid #CBD5E1;">${rpm.identitas.namaPenyusun}</td></tr>
        <tr><td style="padding: 5pt; font-weight: bold; border: 1pt solid #CBD5E1;">Mata Pelajaran</td><td style="padding: 5pt; border: 1pt solid #CBD5E1;">${rpm.identitas.mataPelajaran}</td></tr>
        <tr><td style="padding: 5pt; font-weight: bold; border: 1pt solid #CBD5E1;">Kelas / Fase / Semester</td><td style="padding: 5pt; border: 1pt solid #CBD5E1;">${rpm.identitas.kelasFaseSemester}</td></tr>
        <tr><td style="padding: 5pt; font-weight: bold; border: 1pt solid #CBD5E1;">Alokasi Waktu</td><td style="padding: 5pt; border: 1pt solid #CBD5E1;">${rpm.identitas.alokasiWaktu}</td></tr>
        <tr><td style="padding: 5pt; font-weight: bold; border: 1pt solid #CBD5E1;">Tahun Pelajaran</td><td style="padding: 5pt; border: 1pt solid #CBD5E1;">${rpm.identitas.tahunPelajaran}</td></tr>
      </table>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">B. IDENTIFIKASI KESIAPAN MURID</h3>
      <ul>
        <li><strong>Pengetahuan Awal:</strong> ${rpm.kesiapanMurid.pengetahuanAwal}</li>
        <li><strong>Minat:</strong> ${rpm.kesiapanMurid.minat}</li>
        <li><strong>Latar Belakang:</strong> ${rpm.kesiapanMurid.latarBelakang}</li>
        <li><strong>Kebutuhan Belajar:</strong>
          <ul>
            <li><em>Visual:</em> ${rpm.kesiapanMurid.kebutuhanBelajar.visual}</li>
            <li><em>Auditori:</em> ${rpm.kesiapanMurid.kebutuhanBelajar.auditori}</li>
            <li><em>Kinestetik:</em> ${rpm.kesiapanMurid.kebutuhanBelajar.kinestetik}</li>
          </ul>
        </li>
      </ul>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">C. KARAKTERISTIK MATERI PELAJARAN</h3>
      <ul>
        <li><strong>Pengetahuan Konseptual:</strong> ${rpm.karakteristikMateri.konseptual}</li>
        <li><strong>Pengetahuan Prosedural:</strong> ${rpm.karakteristikMateri.prosedural}</li>
        <li><strong>Relevansi dengan Kehidupan Nyata Murid:</strong> ${rpm.karakteristikMateri.relevansi}</li>
        <li><strong>Tingkat Kesulitan:</strong> ${rpm.karakteristikMateri.tingkatKesulitan}</li>
        <li><strong>Struktur Materi:</strong> ${rpm.karakteristikMateri.strukturMateri}</li>
        <li><strong>Integrasi Nilai dan Karakter:</strong>
          <ul>
            ${rpm.karakteristikMateri.integrasiNilai.map((n) => `<li><strong>${n.label}:</strong> ${n.desc}</li>`).join('')}
          </ul>
        </li>
      </ul>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">D. DIMENSI PROFIL LULUSAN</h3>
      <ul>
        ${rpm.dimensiProfilLulusan.map((d) => `<li><strong>${d.label}:</strong> ${d.desc}</li>`).join('')}
      </ul>

      <h2 style="font-size: 12.5pt; text-align: center; margin-top: 16pt; border-bottom: 1.5pt solid #0F172A; padding-bottom: 4pt;">DESAIN PEMBELAJARAN</h2>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">A. CAPAIAN PEMBELAJARAN (CP)</h3>
      <p>${rpm.capaianPembelajaran}</p>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">B. LINTAS DISIPLIN ILMU</h3>
      <ul>
        ${rpm.lintasDisiplin.map((l) => `<li><strong>${l.mapel}:</strong> ${l.desc}</li>`).join('')}
      </ul>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">C. TUJUAN PEMBELAJARAN</h3>
      <ul>
        ${rpm.tujuanPembelajaran.map((t) => `<li><strong>${t.pertemuan}:</strong> ${t.desc}</li>`).join('')}
      </ul>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">D. TOPIK PEMBELAJARAN KONTEKSTUAL</h3>
      <ul>
        ${rpm.topikKontekstual.map((tk) => `<li>${tk}</li>`).join('')}
      </ul>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">E. KERANGKA PEMBELAJARAN</h3>
      <p><strong>1. Praktik Pedagogik</strong></p>
      <ul>
        <li><strong>Model Pembelajaran:</strong> ${rpm.kerangkaPembelajaran.model}</li>
        <li><strong>Pendekatan:</strong> ${rpm.kerangkaPembelajaran.pendekatan}
          <ul>
            <li><em>Mindful Learning:</em> ${rpm.kerangkaPembelajaran.mindful}</li>
            <li><em>Meaningful Learning:</em> ${rpm.kerangkaPembelajaran.meaningful}</li>
            <li><em>Joyful Learning:</em> ${rpm.kerangkaPembelajaran.joyful}</li>
          </ul>
        </li>
        <li><strong>Metode Pembelajaran:</strong> ${rpm.kerangkaPembelajaran.metode}</li>
        <li><strong>Strategi Pembelajaran Berdiferensiasi:</strong>
          <ul>
            <li><em>Diferensiasi Konten:</em> ${rpm.kerangkaPembelajaran.diferensiasiKonten}</li>
            <li><em>Diferensiasi Proses:</em> ${rpm.kerangkaPembelajaran.diferensiasiProses}</li>
            <li><em>Diferensiasi Produk:</em> ${rpm.kerangkaPembelajaran.diferensiasiProduk}</li>
          </ul>
        </li>
      </ul>
      <p><strong>2. Kemitraan Pembelajaran</strong></p>
      <ul>
        <li><strong>Lingkungan Sekolah:</strong> ${rpm.kerangkaPembelajaran.kemitraanSekolah}</li>
        <li><strong>Lingkungan Luar Sekolah/Masyarakat:</strong> ${rpm.kerangkaPembelajaran.kemitraanLuar}</li>
        <li><strong>Mitra Digital:</strong> ${rpm.kerangkaPembelajaran.kemitraanDigital}</li>
      </ul>
      <p><strong>3. Lingkungan Belajar</strong></p>
      <ul>
        <li><strong>Ruang Fisik:</strong> ${rpm.kerangkaPembelajaran.ruangFisik}</li>
        <li><strong>Ruang Virtual:</strong> ${rpm.kerangkaPembelajaran.ruangVirtual}</li>
        <li><strong>Budaya Belajar:</strong> ${rpm.kerangkaPembelajaran.budayaBelajar}</li>
      </ul>
      <p><strong>4. Pemanfaatan Digital</strong></p>
      <ul>
        <li><strong>Perpustakaan Digital/Sumber Daring:</strong> ${rpm.kerangkaPembelajaran.digitalPerpustakaan}</li>
        <li><strong>Forum Diskusi Daring:</strong> ${rpm.kerangkaPembelajaran.digitalForum}</li>
        <li><strong>Penilaian Daring:</strong> ${rpm.kerangkaPembelajaran.digitalPenilaian}</li>
        <li><strong>Media Presentasi Digital:</strong> ${rpm.kerangkaPembelajaran.digitalPresentasi}</li>
        <li><strong>Media Publikasi Digital:</strong> ${rpm.kerangkaPembelajaran.digitalPublikasi}</li>
      </ul>

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">F. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI</h3>
      ${pertemuanHtml}

      <h3 style="font-size: 11.5pt; background-color: #E2E8F0; padding: 4pt 8pt;">G. ASESMEN PEMBELAJARAN</h3>
      <p><strong>1. Asesmen Diagnostik</strong></p>
      <ul>
        ${rpm.asesmen.diagnostik.map((d) => `<li><strong>${d.label}:</strong> ${d.desc}</li>`).join('')}
      </ul>
      <p><strong>2. Asesmen Formatif</strong></p>
      <ul>
        ${rpm.asesmen.formatif.map((f) => `<li><strong>${f.label}:</strong> ${f.desc}</li>`).join('')}
      </ul>
      <p><strong>3. Asesmen Sumatif</strong></p>
      <ul>
        <li><strong>Produk (Proyek):</strong> Tugas: ${rpm.asesmen.sumatifProyek.tugas} (Kriteria: ${rpm.asesmen.sumatifProyek.kriteria})</li>
        <li><strong>Praktik (Kinerja):</strong> Tugas: ${rpm.asesmen.sumatifPraktik.tugas} (Kriteria: ${rpm.asesmen.sumatifPraktik.kriteria})</li>
      </ul>

      <p><strong>A. Contoh Tes Tertulis Pilihan Ganda (Beserta Kunci &amp; Pembahasan)</strong></p>
      ${pgHtml}

      <p><strong>B. Contoh Tes Tertulis Essay (Beserta Pembahasan Lengkap)</strong></p>
      ${essayHtml}

      <table style="margin-top: 28pt; border: none; width: 100%; page-break-inside: avoid;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding: 6pt;">
            Mengetahui,<br/>
            Kepala Sekolah<br/><br/><br/><br/>
            <strong><u>${rpm.identitas.kepalaSekolah}</u></strong><br/>
            ${rpm.identitas.pangkatKepsek}<br/>
            NIP. ${rpm.identitas.nipKepsek}
          </td>
          <td style="width: 50%; vertical-align: top; padding: 6pt;">
            ${rpm.identitas.tempatTanggal}<br/>
            Guru Mata Pelajaran<br/><br/><br/><br/>
            <strong><u>${rpm.identitas.namaPenyusun}</u></strong><br/>
            NIP. ${rpm.identitas.nipPenyusun}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `RPM_${rpm.id === 'bilangan_bulat' ? 'Bab1_Bilangan_Bulat_Kelas_VII' : 'Relasi_Fungsi_Kelas_VIII'}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadBankSoalWordDocument(
  paket: PaketBankSoal,
  includeSolutions: boolean = true,
  student?: StudentIdentity
) {
  const letters = ['A', 'B', 'C', 'D'];

  const kisiKisiRows = paket.pilihanGanda
    .map(
      (q) => `
      <tr>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt; text-align: center;">PG-${q.no}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt;">${q.topik}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt;">${q.indikatorKritis}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt;">${q.levelKognitif}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt; text-align: center;">${
          includeSolutions ? letters[q.kunciIndex] : '-'
        }</td>
      </tr>
    `
    )
    .join('');

  const pgQuestionsHtml = paket.pilihanGanda
    .map((q) => {
      const opts = q.options
        .map(
          (o, idx) =>
            `<p style="margin: 2pt 0 2pt 18pt; font-size: 11pt;"><strong>${letters[idx]}.</strong> ${o}</p>`
        )
        .join('');
      return `
        <div style="margin-bottom: 14pt; page-break-inside: avoid;">
          <p style="margin: 0 0 3pt 0; font-size: 11pt;">
            <strong>${q.no}. [${q.topik} — ${q.indikatorKritis} (${q.levelKognitif})]</strong><br/>
            ${q.stimulus}
          </p>
          ${
            q.mathBox
              ? `<p style="margin: 4pt 0 6pt 18pt; padding: 6pt 10pt; background-color: #F1F5F9; border-left: 3pt solid #0284C7; font-family: 'Courier New', monospace; font-size: 10.5pt; white-space: pre-line;">${q.mathBox}</p>`
              : ''
          }
          <p style="margin: 0 0 4pt 18pt; font-size: 11pt;"><strong>Pertanyaan:</strong> ${q.pertanyaan}</p>
          ${opts}
        </div>
      `;
    })
    .join('');

  const essayQuestionsHtml = paket.uraian
    .map((eq) => {
      const subs = eq.rincianPertanyaan
        .map(
          (sq) =>
            `<p style="margin: 2pt 0 2pt 20pt; font-size: 11pt;">${sq}</p>`
        )
        .join('');
      return `
        <div style="margin-bottom: 14pt; page-break-inside: avoid;">
          <p style="margin: 0 0 4pt 0; font-size: 11pt;">
            <strong>Soal Uraian ${eq.no}. (${eq.judulKasus} — ${eq.levelKognitif} · Skor Maks: ${eq.skorMaksimal})</strong><br/>
            ${eq.permasalahan.replace(/\n/g, '<br/>')}
          </p>
          ${subs}
        </div>
      `;
    })
    .join('');

  const solutionsSectionHtml = includeSolutions
    ? `
      <br clear="all" style="page-break-before: always;" />
      <div style="border-bottom: 2pt solid #0F172A; padding-bottom: 6pt; margin-bottom: 12pt;">
        <h2 style="margin: 0; font-size: 13pt;">
          KUNCI JAWABAN, RUBRIK PENSKORAN, DAN PEMBAHASAN LENGKAP
        </h2>
        <p style="margin: 2pt 0 0 0; font-size: 10pt;">
          ${paket.namaPaket} — Penyusun: <strong>${paket.penyusun}</strong>
        </p>
      </div>

      <h3 style="font-size: 11.5pt; margin: 10pt 0 6pt 0;">
        A. Kunci Jawaban &amp; Pembahasan Pilihan Ganda
      </h3>
      <table style="margin-bottom: 16pt; width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #E2E8F0; font-family: Arial, sans-serif; font-size: 10pt;">
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 6%;">No</th>
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 20%;">Topik / Indikator</th>
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 22%;">Kunci Jawaban</th>
            <th style="border: 1pt solid #CBD5E1; padding: 6pt; width: 52%;">Pembahasan Langkah demi Langkah</th>
          </tr>
        </thead>
        <tbody>
          ${paket.pilihanGanda
            .map(
              (q) => `
              <tr>
                <td style="border: 1pt solid #CBD5E1; padding: 6pt; text-align: center; font-weight: bold;">${q.no}</td>
                <td style="border: 1pt solid #CBD5E1; padding: 6pt; font-size: 10pt;">${q.topik}<br/><em>(${q.levelKognitif})</em></td>
                <td style="border: 1pt solid #CBD5E1; padding: 6pt; font-weight: bold; color: #0369A1;">${letters[q.kunciIndex]}. ${q.options[q.kunciIndex]}</td>
                <td style="border: 1pt solid #CBD5E1; padding: 6pt; font-size: 10pt;">${q.pembahasan.replace(/\n/g, '<br/>')}</td>
              </tr>
            `
            )
            .join('')}
        </tbody>
      </table>

      <h3 style="font-size: 11.5pt; margin: 14pt 0 6pt 0;">
        B. Pembahasan &amp; Pedoman Penskoran Soal Uraian
      </h3>
      ${paket.uraian
        .map(
          (eq) => `
          <div style="margin-bottom: 12pt; padding: 8pt; border: 1pt solid #CBD5E1; background-color: #F8FAFC; page-break-inside: avoid;">
            <p style="margin: 0 0 4pt 0; font-size: 11pt; font-weight: bold;">
              Pembahasan Uraian ${eq.no}: ${eq.judulKasus} (Skor Maksimal: ${eq.skorMaksimal})
            </p>
            ${eq.langkahPembahasan
              .map(
                (st) =>
                  `<p style="margin: 3pt 0 3pt 12pt; font-size: 10.5pt;">${st.replace(/\n/g, '<br/>')}</p>`
              )
              .join('')}
            <p style="margin: 4pt 0 0 12pt; font-size: 10.5pt; font-weight: bold; color: #047857;">
              Kesimpulan Kunci: ${eq.kesimpulanKunci}
            </p>
          </div>
        `
        )
        .join('')}
    `
    : '';

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <title>${paket.namaPaket}</title>
      <style>
        @page {
          size: 21cm 29.7cm;
          margin: 2cm 2cm 2cm 2cm;
        }
        body {
          font-family: "Times New Roman", Georgia, serif;
          font-size: 11pt;
          line-height: 1.45;
          color: #0F172A;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div style="border-bottom: 2.5pt double #0F172A; padding-bottom: 8pt; margin-bottom: 14pt; text-align: center;">
        <p style="margin: 0; font-size: 13pt; font-weight: bold;">
          INSTRUMEN EVALUASI &amp; BANK SOAL MATEMATIKA SMP/MTs
        </p>
        <p style="margin: 2pt 0; font-size: 11.5pt; font-weight: bold;">
          ${paket.namaPaket}
        </p>
        <p style="margin: 2pt 0; font-size: 10pt;">
          ${paket.kelasSemester} · ${paket.pendekatan}<br/>
          Penyusun: <strong>${paket.penyusun}</strong> · Instansi: <strong>${paket.instansi}</strong>
        </p>
      </div>

      <table style="margin-bottom: 14pt; border: 1pt solid #0F172A;">
        <tr style="background-color: #E2E8F0;">
          <th colspan="4" style="padding: 6pt; text-align: left; font-family: Arial, sans-serif; font-size: 10pt; border-bottom: 1pt solid #0F172A;">
            IDENTITAS PESERTA DIDIK [Nama, Kelas, No Absen, Sekolah]
          </th>
        </tr>
        <tr>
          <td style="padding: 6pt; width: 18%; font-weight: bold; border: 1pt solid #CBD5E1;">Nama</td>
          <td style="padding: 6pt; width: 32%; border: 1pt solid #CBD5E1;">${student?.nama || '................................................'}</td>
          <td style="padding: 6pt; width: 18%; font-weight: bold; border: 1pt solid #CBD5E1;">No Absen</td>
          <td style="padding: 6pt; width: 32%; border: 1pt solid #CBD5E1;">${student?.noAbsen || '................................................'}</td>
        </tr>
        <tr>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Kelas</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student?.kelas || '................................................'}</td>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Sekolah</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student?.sekolah || paket.instansi}</td>
        </tr>
      </table>

      <h3 style="font-size: 11.5pt; margin: 10pt 0 6pt 0; padding: 4pt 8pt; background-color: #F1F5F9; border-left: 3pt solid #0F172A;">
        KISI-KISI INSTRUMEN SOAL PILIHAN GANDA
      </h3>
      <table style="margin-bottom: 16pt; font-size: 10pt;">
        <thead>
          <tr style="background-color: #E2E8F0;">
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 10%;">No Soal</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 30%;">Topik Materi</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 30%;">Indikator Kritis / Kompetensi</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 20%;">Level Kognitif</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 10%;">Kunci</th>
          </tr>
        </thead>
        <tbody>
          ${kisiKisiRows}
        </tbody>
      </table>

      <h3 style="font-size: 11.5pt; margin: 14pt 0 8pt 0; padding: 4pt 8pt; background-color: #0F172A; color: #FFFFFF;">
        BAGIAN I — SOAL PILIHAN GANDA (${paket.pilihanGanda.length} NOMOR)
      </h3>
      ${pgQuestionsHtml}

      <h3 style="font-size: 11.5pt; margin: 16pt 0 8pt 0; padding: 4pt 8pt; background-color: #0F172A; color: #FFFFFF;">
        BAGIAN II — SOAL URAIAN / ESSAY PEMECAHAN MASALAH (${paket.uraian.length} NOMOR)
      </h3>
      ${essayQuestionsHtml}

      ${solutionsSectionHtml}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const suffix = includeSolutions ? 'Lengkap_Kunci_dan_Pembahasan' : 'Lembar_Soal_Siswa';
  link.download = `Bank_Soal_${paket.id}_${suffix}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadTkaKelas7WordDocument(
  includeSolutions: boolean = true,
  student?: StudentIdentity
) {
  const letters = ['A', 'B', 'C', 'D'];
  const bsQuestions = TKA_QUESTIONS.filter((q) => q.type === 'BS');
  const pgQuestions = TKA_QUESTIONS.filter((q) => q.type === 'PG');
  const uraianQuestions = TKA_QUESTIONS.filter((q) => q.type === 'URAIAN');

  const renderStimulusTable = (table?: { headers: string[]; rows: string[][] }) => {
    if (!table) return '';
    return `
      <table style="margin: 6pt 0 8pt 18pt; width: 92%; border-collapse: collapse; font-size: 10pt;">
        <thead>
          <tr style="background-color: #E2E8F0;">
            ${table.headers
              .map(
                (h) =>
                  `<th style="border: 1pt solid #94A3B8; padding: 4pt 8pt; text-align: left; font-weight: bold;">${h}</th>`
              )
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${table.rows
            .map(
              (r) => `
              <tr>
                ${r
                  .map(
                    (cell) =>
                      `<td style="border: 1pt solid #CBD5E1; padding: 4pt 8pt;">${cell}</td>`
                  )
                  .join('')}
              </tr>
            `
            )
            .join('')}
        </tbody>
      </table>
    `;
  };

  const bsHtml = bsQuestions
    .map(
      (q) => `
      <div style="margin-bottom: 14pt; page-break-inside: avoid;">
        <p style="margin: 0 0 3pt 0; font-size: 11pt;">
          <strong>${q.no}. [${q.materi} — ${q.submateri} | ${q.levelKognitif} · ${q.kesulitan}]</strong>
        </p>
        ${
          q.stimulusTitle
            ? `<p style="margin: 2pt 0 2pt 18pt; font-size: 10.5pt; font-weight: bold; color: #0F172A;">Stimulus: ${q.stimulusTitle}</p>`
            : ''
        }
        <p style="margin: 2pt 0 4pt 18pt; font-size: 10.5pt; white-space: pre-line;">${q.stimulusText}</p>
        ${renderStimulusTable(q.stimulusTable)}
        <p style="margin: 4pt 0 4pt 18pt; font-size: 11pt; white-space: pre-line;">${q.pertanyaan}</p>
        <p style="margin: 2pt 0 2pt 26pt; font-size: 11pt;">&#9675; <strong>BENAR</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#9675; <strong>SALAH</strong></p>
      </div>
    `
    )
    .join('');

  const pgHtml = pgQuestions
    .map((q) => {
      const opts = (q.options || [])
        .map(
          (opt, idx) =>
            `<p style="margin: 2pt 0 2pt 24pt; font-size: 11pt;"><strong>${letters[idx]}.</strong> ${opt}</p>`
        )
        .join('');
      return `
        <div style="margin-bottom: 14pt; page-break-inside: avoid;">
          <p style="margin: 0 0 3pt 0; font-size: 11pt;">
            <strong>${q.no}. [${q.materi} — ${q.submateri} | ${q.levelKognitif} · ${q.kesulitan}]</strong>
          </p>
          ${
            q.stimulusTitle
              ? `<p style="margin: 2pt 0 2pt 18pt; font-size: 10.5pt; font-weight: bold; color: #0F172A;">Stimulus: ${q.stimulusTitle}</p>`
              : ''
          }
          <p style="margin: 2pt 0 4pt 18pt; font-size: 10.5pt; white-space: pre-line;">${q.stimulusText}</p>
          ${renderStimulusTable(q.stimulusTable)}
          <p style="margin: 4pt 0 4pt 18pt; font-size: 11pt; white-space: pre-line;">${q.pertanyaan}</p>
          ${opts}
        </div>
      `;
    })
    .join('');

  const uraianHtml = uraianQuestions
    .map(
      (q) => `
      <div style="margin-bottom: 16pt; page-break-inside: avoid;">
        <p style="margin: 0 0 3pt 0; font-size: 11pt;">
          <strong>${q.no}. [${q.materi} — ${q.submateri} | ${q.levelKognitif} · ${q.kesulitan} · Skor Maks: 4]</strong>
        </p>
        ${
          q.stimulusTitle
            ? `<p style="margin: 2pt 0 2pt 18pt; font-size: 10.5pt; font-weight: bold; color: #0F172A;">Stimulus: ${q.stimulusTitle}</p>`
            : ''
        }
        <p style="margin: 2pt 0 4pt 18pt; font-size: 10.5pt; white-space: pre-line;">${q.stimulusText}</p>
        ${renderStimulusTable(q.stimulusTable)}
        <p style="margin: 4pt 0 6pt 18pt; font-size: 11pt; font-weight: bold;">Pertanyaan: ${q.pertanyaan}</p>
        <div style="margin-left: 18pt; padding: 10pt; border: 1pt dashed #94A3B8; background-color: #F8FAFC; font-size: 10pt; color: #64748B;">
          Lembar Jawaban Uraian Nomor ${q.no}:<br/><br/><br/>
        </div>
      </div>
    `
    )
    .join('');

  const kisiKisiRows = TKA_QUESTIONS.map(
    (q) => `
      <tr>
        <td style="border: 1pt solid #CBD5E1; padding: 4pt; text-align: center; font-weight: bold;">${q.no}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 4pt; text-align: center;">${q.type}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 4pt;">${q.materi}<br/><em>(${q.submateri})</em></td>
        <td style="border: 1pt solid #CBD5E1; padding: 4pt;">${q.indikator}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 4pt;">${q.levelKognitif}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 4pt;">${q.kesulitan}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 4pt; text-align: center; font-weight: bold;">${
          includeSolutions ? q.kunciLabel : '-'
        }</td>
      </tr>
    `
  ).join('');

  const pembahasanSection = includeSolutions
    ? `
      <br clear="all" style="page-break-before: always;" />
      <div style="border-bottom: 2pt solid #0F172A; padding-bottom: 6pt; margin-bottom: 12pt;">
        <h2 style="margin: 0; font-size: 13pt;">
          KISI-KISI, KUNCI JAWABAN, PEMBAHASAN &amp; RUBRIK PENSKORAN TKA KELAS 7
        </h2>
        <p style="margin: 2pt 0 0 0; font-size: 10pt;">
          ${TKA_META.judulUtama} — ${TKA_META.subJudulMapel} (${TKA_META.topikBab}) · Pengembang: <strong>${TKA_META.pengembang} (${TKA_META.sekolah})</strong>
        </p>
      </div>

      <h3 style="font-size: 11pt; margin: 10pt 0 6pt 0;">I. MATRIKS KISI-KISI 25 SOAL MODEL TKA</h3>
      <table style="margin-bottom: 16pt; width: 100%; border-collapse: collapse; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #E2E8F0;">
            <th style="border: 1pt solid #CBD5E1; padding: 4pt; width: 5%;">No</th>
            <th style="border: 1pt solid #CBD5E1; padding: 4pt; width: 8%;">Bentuk</th>
            <th style="border: 1pt solid #CBD5E1; padding: 4pt; width: 18%;">Materi &amp; Submateri</th>
            <th style="border: 1pt solid #CBD5E1; padding: 4pt; width: 32%;">Indikator Soal</th>
            <th style="border: 1pt solid #CBD5E1; padding: 4pt; width: 12%;">Level</th>
            <th style="border: 1pt solid #CBD5E1; padding: 4pt; width: 13%;">Kesulitan</th>
            <th style="border: 1pt solid #CBD5E1; padding: 4pt; width: 12%;">Kunci</th>
          </tr>
        </thead>
        <tbody>
          ${kisiKisiRows}
        </tbody>
      </table>

      <h3 style="font-size: 11pt; margin: 12pt 0 6pt 0;">II. KUNCI JAWABAN &amp; PEMBAHASAN SOAL BENAR/SALAH (NOMOR 1–5) &amp; PILIHAN GANDA (NOMOR 6–20)</h3>
      <table style="margin-bottom: 16pt; width: 100%; border-collapse: collapse; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #E2E8F0;">
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 6%;">No</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 10%;">Tipe</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 14%;">Kunci</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 70%;">Pembahasan Lengkap</th>
          </tr>
        </thead>
        <tbody>
          ${[...bsQuestions, ...pgQuestions]
            .map(
              (q) => `
              <tr>
                <td style="border: 1pt solid #CBD5E1; padding: 5pt; text-align: center; font-weight: bold;">${q.no}</td>
                <td style="border: 1pt solid #CBD5E1; padding: 5pt; text-align: center;">${q.type}</td>
                <td style="border: 1pt solid #CBD5E1; padding: 5pt; font-weight: bold; color: #0369A1;">${q.kunciLabel}</td>
                <td style="border: 1pt solid #CBD5E1; padding: 5pt; white-space: pre-line;">${q.pembahasan}</td>
              </tr>
            `
            )
            .join('')}
        </tbody>
      </table>

      <h3 style="font-size: 11pt; margin: 12pt 0 6pt 0;">III. KUNCI JAWABAN, LANGKAH PENYELESAIAN &amp; RUBRIK PENSKORAN URAIAN (NOMOR 21–25)</h3>
      ${uraianQuestions
        .map(
          (q) => `
          <div style="margin-bottom: 14pt; padding: 8pt; border: 1pt solid #CBD5E1; background-color: #F8FAFC; page-break-inside: avoid; font-size: 10pt;">
            <p style="margin: 0 0 4pt 0; font-weight: bold; font-size: 10.5pt;">
              Soal Uraian Nomor ${q.no} — ${q.stimulusTitle} (${q.kesulitan})
            </p>
            <p style="margin: 2pt 0;"><strong>Jawaban Ideal:</strong> ${q.jawabanIdeal}</p>
            <p style="margin: 4pt 0 2pt 0; font-weight: bold;">Langkah Penyelesaian:</p>
            <ul style="margin: 2pt 0 6pt 18pt; padding: 0;">
              ${(q.langkahPenyelesaian || []).map((st) => `<li>${st}</li>`).join('')}
            </ul>
            ${
              q.rubrik
                ? `
                <p style="margin: 4pt 0 2pt 0; font-weight: bold;">Pedoman Rubrik Penskoran (Skor 0–4):</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt;">
                  <tr><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt; width: 15%; font-weight: bold;">Skor 4</td><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt;">${q.rubrik.skor4}</td></tr>
                  <tr><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt; font-weight: bold;">Skor 3</td><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt;">${q.rubrik.skor3}</td></tr>
                  <tr><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt; font-weight: bold;">Skor 2</td><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt;">${q.rubrik.skor2}</td></tr>
                  <tr><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt; font-weight: bold;">Skor 1</td><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt;">${q.rubrik.skor1}</td></tr>
                  <tr><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt; font-weight: bold;">Skor 0</td><td style="border: 1pt solid #CBD5E1; padding: 3pt 6pt;">${q.rubrik.skor0}</td></tr>
                </table>
              `
                : ''
            }
          </div>
        `
        )
        .join('')}
    `
    : '';

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <title>${TKA_META.judulUtama} - ${TKA_META.subJudulMapel}</title>
      <style>
        @page {
          size: 21cm 29.7cm;
          margin: 2cm 2cm 2cm 2cm;
        }
        body {
          font-family: "Times New Roman", Georgia, serif;
          font-size: 11pt;
          line-height: 1.45;
          color: #0F172A;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div style="border-bottom: 2.5pt double #0F172A; padding-bottom: 8pt; margin-bottom: 14pt; text-align: center;">
        <p style="margin: 0; font-size: 13pt; font-weight: bold;">
          PEMERINTAH KABUPATEN LAMONGAN · DINAS PENDIDIKAN
        </p>
        <p style="margin: 2pt 0; font-size: 14pt; font-weight: bold;">
          ${TKA_META.sekolah.toUpperCase()}
        </p>
        <p style="margin: 4pt 0 2pt 0; font-size: 12pt; font-weight: bold;">
          ${TKA_META.judulUtama} — “${TKA_META.subJudulMapel}” (MODEL TKA)
        </p>
        <p style="margin: 2pt 0; font-size: 10pt;">
          Mata Pelajaran: <strong>MATEMATIKA</strong> · Kelas/Semester: <strong>VII / GANJIL</strong> · Bab: <strong>${TKA_META.topikBab}</strong><br/>
          Jumlah Soal: <strong>25 Soal (5 Benar/Salah · 15 Pilihan Ganda · 5 Uraian)</strong> · Pengembang: <strong>${TKA_META.pengembang}</strong>
        </p>
      </div>

      <table style="margin-bottom: 14pt; border: 1pt solid #0F172A;">
        <tr style="background-color: #E2E8F0;">
          <th colspan="4" style="padding: 6pt; text-align: left; font-family: Arial, sans-serif; font-size: 10pt; border-bottom: 1pt solid #0F172A;">
            IDENTITAS PESERTA ASESMEN TKA [Nama, Kelas, No Absen, Sekolah]
          </th>
        </tr>
        <tr>
          <td style="padding: 6pt; width: 18%; font-weight: bold; border: 1pt solid #CBD5E1;">Nama Peserta</td>
          <td style="padding: 6pt; width: 32%; border: 1pt solid #CBD5E1;">${student?.nama || '................................................'}</td>
          <td style="padding: 6pt; width: 18%; font-weight: bold; border: 1pt solid #CBD5E1;">Nomor Absen</td>
          <td style="padding: 6pt; width: 32%; border: 1pt solid #CBD5E1;">${student?.noAbsen || '................................................'}</td>
        </tr>
        <tr>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Kelas</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student?.kelas || 'VII (Tujuh) ....'}</td>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Asal Sekolah</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student?.sekolah || TKA_META.sekolah}</td>
        </tr>
      </table>

      <h3 style="font-size: 11.5pt; margin: 12pt 0 8pt 0; padding: 4pt 8pt; background-color: #0F172A; color: #FFFFFF;">
        BAGIAN A — SOAL BENAR / SALAH (NOMOR 1 s.d. 5)
      </h3>
      <p style="margin: 0 0 8pt 0; font-size: 10pt; font-style: italic;">
        Petunjuk: Bacalah setiap stimulus dengan cermat, kemudian pilihlah BENAR jika pernyataan sesuai konsep/perhitungan atau SALAH jika tidak sesuai!
      </p>
      ${bsHtml}

      <h3 style="font-size: 11.5pt; margin: 16pt 0 8pt 0; padding: 4pt 8pt; background-color: #0F172A; color: #FFFFFF;">
        BAGIAN B — SOAL PILIHAN GANDA (NOMOR 6 s.d. 20)
      </h3>
      <p style="margin: 0 0 8pt 0; font-size: 10pt; font-style: italic;">
        Petunjuk: Pilihlah satu jawaban yang paling tepat (A, B, C, atau D) berdasarkan penalaran dan informasi pada stimulus!
      </p>
      ${pgHtml}

      <h3 style="font-size: 11.5pt; margin: 16pt 0 8pt 0; padding: 4pt 8pt; background-color: #0F172A; color: #FFFFFF;">
        BAGIAN C — SOAL URAIAN PENALARAN &amp; PEMECAHAN MASALAH (NOMOR 21 s.d. 25)
      </h3>
      <p style="margin: 0 0 8pt 0; font-size: 10pt; font-style: italic;">
        Petunjuk: Kerjakan soal uraian berikut secara sistematis disertai langkah perhitungan dan alasan yang jelas! (Skor maksimal 4 per butir soal).
      </p>
      ${uraianHtml}

      ${pembahasanSection}

      <div style="margin-top: 24pt; text-align: right; font-size: 10.5pt;">
        <p style="margin: 0;">Karangbinangun, ........................................ 2026</p>
        <p style="margin: 2pt 0 36pt 0;">Guru Mata Pelajaran / Pengembang Asesmen,</p>
        <p style="margin: 0; font-weight: bold; text-decoration: underline;">${TKA_META.pengembang}</p>
        <p style="margin: 2pt 0 0 0; font-size: 9.5pt; color: #475569;">${TKA_META.sekolah}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const suffix = includeSolutions
    ? 'Lengkap_Kisi_Kunci_Pembahasan_Rubrik'
    : 'Naskah_Soal_Siswa';
  link.download = `Asesmen_TKA_Matematika_Kelas_7_SMPN2_Karangbinangun_Nur_Wakhid_${suffix}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadStudentTkaReportWord(params: {
  student: StudentIdentity;
  nilaiAkhir: number;
  predikat: string;
  skorBS: number;
  skorPG: number;
  skorUraian: number;
  totalSkor: number;
  durasiTerpakai: string;
  answersObj: Record<number, number | undefined>;
  answersEssay: Record<number, string | undefined>;
  essayScores: Record<number, number>;
}) {
  const letters = ['A', 'B', 'C', 'D'];
  const {
    student,
    nilaiAkhir,
    predikat,
    skorBS,
    skorPG,
    skorUraian,
    totalSkor,
    durasiTerpakai,
    answersObj,
    answersEssay,
    essayScores
  } = params;

  const rowsHtml = TKA_QUESTIONS.map((q) => {
    let jawabanSiswa = '-';
    let statusLabel = '-';
    if (q.type === 'BS') {
      const sel = answersObj[q.no];
      jawabanSiswa = sel === 0 ? 'BENAR' : sel === 1 ? 'SALAH' : 'Tidak Dijawab';
      statusLabel = sel === q.correctIndex ? 'BENAR (1/1)' : 'SALAH (0/1)';
    } else if (q.type === 'PG') {
      const sel = answersObj[q.no];
      jawabanSiswa =
        sel !== undefined && q.options?.[sel]
          ? `${letters[sel]}. ${q.options[sel]}`
          : 'Tidak Dijawab';
      statusLabel = sel === q.correctIndex ? 'BENAR (1/1)' : 'SALAH (0/1)';
    } else {
      jawabanSiswa = answersEssay[q.no]?.trim() || '(Belum diisi)';
      const sc = essayScores[q.no] ?? 0;
      statusLabel = `Skor Rubrik: ${sc} / 4`;
    }

    return `
      <tr>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt; text-align: center; font-weight: bold;">${q.no}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt; text-align: center;">${q.type}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt;">${q.materi} — ${q.submateri}<br/><em>(${q.kesulitan})</em></td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt; white-space: pre-line;">${jawabanSiswa}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt; font-weight: bold;">${q.kunciLabel}</td>
        <td style="border: 1pt solid #CBD5E1; padding: 5pt; font-weight: bold;">${statusLabel}</td>
      </tr>
    `;
  }).join('');

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <title>Laporan Hasil Asesmen TKA - ${student.nama || 'Siswa'}</title>
      <style>
        @page { size: 21cm 29.7cm; margin: 2cm; }
        body { font-family: "Times New Roman", Georgia, serif; font-size: 11pt; line-height: 1.45; color: #0F172A; }
        table { border-collapse: collapse; width: 100%; }
      </style>
    </head>
    <body>
      <div style="border-bottom: 2.5pt double #0F172A; padding-bottom: 8pt; margin-bottom: 14pt; text-align: center;">
        <p style="margin: 0; font-size: 13pt; font-weight: bold;">LAPORAN HASIL CAPAIAN ASESMEN INTERAKTIF MODEL TKA</p>
        <p style="margin: 2pt 0; font-size: 12pt; font-weight: bold;">${TKA_META.judulUtama} — “${TKA_META.subJudulMapel}”</p>
        <p style="margin: 2pt 0; font-size: 10pt;">
          Bab: <strong>${TKA_META.topikBab}</strong> · Pengembang: <strong>${TKA_META.pengembang}</strong> · <strong>${TKA_META.sekolah}</strong>
        </p>
      </div>

      <table style="margin-bottom: 14pt; border: 1pt solid #0F172A;">
        <tr>
          <td style="padding: 6pt; width: 20%; font-weight: bold; border: 1pt solid #CBD5E1;">Nama Siswa</td>
          <td style="padding: 6pt; width: 30%; border: 1pt solid #CBD5E1;">${student.nama || '-'}</td>
          <td style="padding: 6pt; width: 20%; font-weight: bold; border: 1pt solid #CBD5E1;">Nilai Akhir (0–100)</td>
          <td style="padding: 6pt; width: 30%; font-weight: bold; font-size: 13pt; color: #0369A1; border: 1pt solid #CBD5E1;">${nilaiAkhir} (${predikat})</td>
        </tr>
        <tr>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Kelas / No Absen</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student.kelas} / Absen ${student.noAbsen || '-'}</td>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Rincian Skor</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">BS: ${skorBS}/5 · PG: ${skorPG}/15 · Uraian: ${skorUraian}/20 (Total: ${totalSkor}/40)</td>
        </tr>
        <tr>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Asal Sekolah</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${student.sekolah || TKA_META.sekolah}</td>
          <td style="padding: 6pt; font-weight: bold; border: 1pt solid #CBD5E1;">Durasi Pengerjaan</td>
          <td style="padding: 6pt; border: 1pt solid #CBD5E1;">${durasiTerpakai}</td>
        </tr>
      </table>

      <h3 style="font-size: 11pt; margin: 10pt 0 6pt 0;">REKAPITULASI JAWABAN PESERTA DIDIK (25 SOAL)</h3>
      <table style="font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #E2E8F0;">
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 6%;">No</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 8%;">Tipe</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 24%;">Materi &amp; Tingkat Kesulitan</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 28%;">Jawaban Siswa</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 18%;">Kunci / Target</th>
            <th style="border: 1pt solid #CBD5E1; padding: 5pt; width: 16%;">Status / Skor</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeName = (student.nama || 'Siswa').replace(/[^a-zA-Z0-9_-]/g, '_');
  link.download = `Laporan_Hasil_TKA_Kelas7_${safeName}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}



