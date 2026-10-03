import React, { useState } from 'react';
import {
  RPM_BILANGAN_BULAT,
  RPM_RELASI_FUNGSI,
  RpmDocumentData
} from '../data/rpmContent';
import { downloadRpmWordDocument } from '../utils/wordExport';
import {
  FileDown,
  Copy,
  Check,
  Edit3,
  BookOpen,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const RpmDeepLearningView: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<'bilangan_bulat' | 'relasi_fungsi'>(
    'bilangan_bulat'
  );
  const [customIdentitas, setCustomIdentitas] = useState<
    Record<'bilangan_bulat' | 'relasi_fungsi', RpmDocumentData['identitas']>
  >({
    bilangan_bulat: { ...RPM_BILANGAN_BULAT.identitas },
    relasi_fungsi: { ...RPM_RELASI_FUNGSI.identitas }
  });

  const [showEditIdentity, setShowEditIdentity] = useState<boolean>(false);
  const [activeMeetingIndex, setActiveMeetingIndex] = useState<number | 'ALL'>('ALL');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(true);

  // Interactive Number Line state for Bab 1 Bilangan Bulat
  const [numA, setNumA] = useState<number>(-3);
  const [numB, setNumB] = useState<number>(5);
  const [opType, setOpType] = useState<'+' | '-'>('+');

  const baseDoc =
    selectedDocId === 'bilangan_bulat' ? RPM_BILANGAN_BULAT : RPM_RELASI_FUNGSI;
  const activeDoc: RpmDocumentData = {
    ...baseDoc,
    identitas: customIdentitas[selectedDocId]
  };

  const resultNum = opType === '+' ? numA + numB : numA - numB;

  const handleIdentityFieldChange = (
    field: keyof RpmDocumentData['identitas'],
    val: string
  ) => {
    setCustomIdentitas((prev) => ({
      ...prev,
      [selectedDocId]: {
        ...prev[selectedDocId],
        [field]: val
      }
    }));
  };

  const handleCopyRpm = async () => {
    const text = `${activeDoc.judulHeader}\nMATA PELAJARAN : MATEMATIKA\n${activeDoc.babTitle}\n\nA. IDENTITAS MODUL\nNama Sekolah: ${activeDoc.identitas.namaSekolah}\nNama Penyusun: ${activeDoc.identitas.namaPenyusun}\nKelas / Fase / Semester: ${activeDoc.identitas.kelasFaseSemester}\nAlokasi Waktu: ${activeDoc.identitas.alokasiWaktu}\nTahun Pelajaran: ${activeDoc.identitas.tahunPelajaran}\n\nCAPAIAN PEMBELAJARAN:\n${activeDoc.capaianPembelajaran}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    } catch {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    }
  };

  const meetingsToShow =
    activeMeetingIndex === 'ALL'
      ? activeDoc.pertemuanList
      : [activeDoc.pertemuanList[activeMeetingIndex]];

  return (
    <div className="space-y-8">
      {/* Top Control & Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="text-xs font-medium text-sky-700 mb-1">
              Dokumen Kurikulum &amp; Perangkat Ajar · Deep Learning (Mindful, Meaningful, Joyful)
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Rencana Pembelajaran Mendalam (RPM) Matematika
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Dilengkapi struktur lengkap Identitas, Kesiapan Murid, Profil Lulusan, Langkah Pembelajaran Berdiferensiasi, Asesmen Sumatif + Pembahasan, serta fitur Unduh Microsoft Word (<code className="font-mono">.doc</code>).
            </p>
          </div>

          {/* Document Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl self-start">
            <button
              type="button"
              onClick={() => {
                setSelectedDocId('bilangan_bulat');
                setActiveMeetingIndex('ALL');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedDocId === 'bilangan_bulat'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              📘 RPM Bab 1: Bilangan Bulat (Kelas VII · 11 Pertemuan)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDocId('relasi_fungsi');
                setActiveMeetingIndex('ALL');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedDocId === 'relasi_fungsi'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              📗 RPM Bab Relasi &amp; Fungsi (Kelas VIII · 5 Pertemuan)
            </button>
          </div>
        </div>

        {/* Action Toolbar: Download Word, Edit Identity, Copy */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Menampilkan: <strong className="text-slate-900">{activeDoc.babTitle}</strong> · Penyusun:{' '}
            <strong className="text-sky-800">{activeDoc.identitas.namaPenyusun}</strong> ({activeDoc.identitas.namaSekolah})
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowEditIdentity((prev) => !prev)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{showEditIdentity ? 'Tutup Edit Identitas' : 'Sesuaikan Identitas & Kepsek'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyRpm}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ringkasan Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Ringkasan</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => downloadRpmWordDocument(activeDoc)}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <FileDown className="w-4 h-4" />
              <span>Unduh RPM Lengkap in Word (.doc)</span>
            </button>
          </div>
        </div>

        {/* Collapsible Identity Customizer */}
        {showEditIdentity && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-slate-900">
              Kustomisasi Identitas Modul &amp; Pengesahan (Otomatis Diterapkan pada Unduhan Word):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">Nama Sekolah</label>
                <input
                  type="text"
                  value={activeDoc.identitas.namaSekolah}
                  onChange={(e) => handleIdentityFieldChange('namaSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Nama Guru Penyusun</label>
                <input
                  type="text"
                  value={activeDoc.identitas.namaPenyusun}
                  onChange={(e) => handleIdentityFieldChange('namaPenyusun', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">NIP Guru Penyusun</label>
                <input
                  type="text"
                  value={activeDoc.identitas.nipPenyusun}
                  onChange={(e) => handleIdentityFieldChange('nipPenyusun', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Tempat &amp; Tanggal</label>
                <input
                  type="text"
                  value={activeDoc.identitas.tempatTanggal}
                  onChange={(e) => handleIdentityFieldChange('tempatTanggal', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Nama Kepala Sekolah</label>
                <input
                  type="text"
                  value={activeDoc.identitas.kepalaSekolah}
                  onChange={(e) => handleIdentityFieldChange('kepalaSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Pangkat / Golongan Kepsek</label>
                <input
                  type="text"
                  value={activeDoc.identitas.pangkatKepsek}
                  onChange={(e) => handleIdentityFieldChange('pangkatKepsek', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">NIP Kepala Sekolah</label>
                <input
                  type="text"
                  value={activeDoc.identitas.nipKepsek}
                  onChange={(e) => handleIdentityFieldChange('nipKepsek', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Alokasi Waktu</label>
                <input
                  type="text"
                  value={activeDoc.identitas.alokasiWaktu}
                  onChange={(e) => handleIdentityFieldChange('alokasiWaktu', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE NUMBER LINE SIMULATOR FOR BAB 1 BILANGAN BULAT */}
      {selectedDocId === 'bilangan_bulat' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="text-xs font-medium text-emerald-700">
                Media Pembelajaran Visual &amp; Kinestetik (Pertemuan 1–5 Bab Bilangan Bulat)
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Arena Simulator Garis Bilangan Bulat (Positif, Negatif &amp; Titik Acuan 0)
              </h3>
            </div>
            <div className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg font-mono text-xs font-bold">
              Operasi: ({numA}) {opType} ({numB}) = {resultNum}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <svg
                viewBox="0 0 640 150"
                className="w-full h-auto"
                role="img"
                aria-label="Garis Bilangan Interaktif"
              >
                {/* Main Horizontal Number Line */}
                <line
                  x1="20"
                  y1="95"
                  x2="620"
                  y2="95"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                />
                {/* Ticks from -10 to +10 */}
                {Array.from({ length: 21 }, (_, i) => i - 10).map((val) => {
                  const x = 320 + val * 28;
                  const isZero = val === 0;
                  const isResult = val === resultNum;
                  return (
                    <g key={val}>
                      <line
                        x1={x}
                        y1={isZero ? 83 : 89}
                        x2={x}
                        y2={isZero ? 107 : 101}
                        stroke={isZero ? '#DC2626' : '#334155'}
                        strokeWidth={isZero ? '2.5' : '1.5'}
                      />
                      <text
                        x={x}
                        y="122"
                        textAnchor="middle"
                        className={`text-[10px] font-mono ${
                          isZero
                            ? 'fill-red-600 font-bold'
                            : isResult
                            ? 'fill-emerald-700 font-bold'
                            : 'fill-slate-600'
                        }`}
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Step 1 Arc: 0 to numA */}
                {(() => {
                  const startX = 320;
                  const endX = 320 + numA * 28;
                  const midX = (startX + endX) / 2;
                  return (
                    <g>
                      <path
                        d={`M ${startX} 90 Q ${midX} 50 ${endX} 90`}
                        fill="none"
                        stroke="#0284C7"
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                      />
                      <circle cx={endX} cy={95} r="5" fill="#0284C7" />
                      <text
                        x={midX}
                        y="62"
                        textAnchor="middle"
                        className="fill-sky-800 text-[10px] font-mono font-bold"
                      >
                        Awal: {numA}
                      </text>
                    </g>
                  );
                })()}

                {/* Step 2 Arc: numA to resultNum */}
                {(() => {
                  const startX = 320 + numA * 28;
                  const clampedRes = Math.max(-10, Math.min(10, resultNum));
                  const endX = 320 + clampedRes * 28;
                  const midX = (startX + endX) / 2;
                  return (
                    <g>
                      <path
                        d={`M ${startX} 88 Q ${midX} 22 ${endX} 88`}
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                      />
                      <circle cx={endX} cy={95} r="6.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text
                        x={midX}
                        y="32"
                        textAnchor="middle"
                        className="fill-emerald-800 text-[11px] font-mono font-bold"
                      >
                        Hasil Akhir = {resultNum}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="lg:col-span-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-sky-700" />
                  <span>Bilangan Pertama (a):</span>
                </span>
                <span className="font-mono font-bold text-sky-800">{numA}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={5}
                value={numA}
                onChange={(e) => setNumA(Number(e.target.value))}
                className="w-full accent-sky-700"
              />

              <div className="flex items-center gap-2 py-1">
                <span className="font-semibold text-slate-700">Operasi:</span>
                <button
                  type="button"
                  onClick={() => setOpType('+')}
                  className={`px-3 py-1 rounded font-mono font-bold ${
                    opType === '+'
                      ? 'bg-sky-700 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  + (Penjumlahan)
                </button>
                <button
                  type="button"
                  onClick={() => setOpType('-')}
                  className={`px-3 py-1 rounded font-mono font-bold ${
                    opType === '-'
                      ? 'bg-sky-700 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  - (Pengurangan)
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Bilangan Kedua (b):</span>
                <span className="font-mono font-bold text-emerald-800">{numB}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={5}
                value={numB}
                onChange={(e) => setNumB(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800">
                {opType === '-'
                  ? `Konsep Kunci Pertemuan 5: (${numA}) - (${numB}) diubah menjadi penjumlahan dengan lawannya: (${numA}) + (${-numB}) = ${resultNum}`
                  : `Konsep Kunci Pertemuan 3: Pion mulai di ${numA}, kemudian bergerak ${
                      numB >= 0 ? `ke kanan ${numB} langkah` : `ke kiri ${Math.abs(numB)} langkah`
                    } menuju ${resultNum}.`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FORMAL RPM DOCUMENT SHEET */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 space-y-8">
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-900 pb-6 space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-sky-800 font-semibold">
            MODUL PEMBELAJARAN MENDALAM (DEEP LEARNING CURRICULUM)
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            {activeDoc.judulHeader}
          </h1>
          <div className="text-sm md:text-base font-bold text-slate-800">
            MATA PELAJARAN : MATEMATIKA — {activeDoc.babTitle}
          </div>
        </div>

        {/* SECTION A: IDENTITAS MODUL */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3.5 py-2 rounded-lg border-l-4 border-slate-900">
            A. IDENTITAS MODUL
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs md:text-sm">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-4 font-semibold bg-slate-50 w-1/3">Nama Sekolah</td>
                  <td className="py-2.5 px-4">{activeDoc.identitas.namaSekolah}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold bg-slate-50">Nama Penyusun</td>
                  <td className="py-2.5 px-4 font-semibold text-sky-900">{activeDoc.identitas.namaPenyusun}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold bg-slate-50">Mata Pelajaran</td>
                  <td className="py-2.5 px-4">{activeDoc.identitas.mataPelajaran}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold bg-slate-50">Kelas / Fase / Semester</td>
                  <td className="py-2.5 px-4">{activeDoc.identitas.kelasFaseSemester}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold bg-slate-50">Alokasi Waktu</td>
                  <td className="py-2.5 px-4 font-mono">{activeDoc.identitas.alokasiWaktu}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold bg-slate-50">Tahun Pelajaran</td>
                  <td className="py-2.5 px-4 font-mono">{activeDoc.identitas.tahunPelajaran}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION B: IDENTIFIKASI KESIAPAN MURID */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3.5 py-2 rounded-lg border-l-4 border-slate-900">
            B. IDENTIFIKASI KESIAPAN MURID
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="font-bold text-slate-900">Pengetahuan Awal</div>
              <p className="text-slate-700">{activeDoc.kesiapanMurid.pengetahuanAwal}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="font-bold text-slate-900">Minat Murid</div>
              <p className="text-slate-700">{activeDoc.kesiapanMurid.minat}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="font-bold text-slate-900">Latar Belakang</div>
              <p className="text-slate-700">{activeDoc.kesiapanMurid.latarBelakang}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed pt-1">
            <div className="p-4 bg-sky-50/60 border border-sky-200 rounded-lg">
              <span className="font-bold text-sky-950">Kebutuhan Visual: </span>
              <span className="text-slate-700">{activeDoc.kesiapanMurid.kebutuhanBelajar.visual}</span>
            </div>
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg">
              <span className="font-bold text-emerald-950">Kebutuhan Auditori: </span>
              <span className="text-slate-700">{activeDoc.kesiapanMurid.kebutuhanBelajar.auditori}</span>
            </div>
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg">
              <span className="font-bold text-amber-950">Kebutuhan Kinestetik: </span>
              <span className="text-slate-700">{activeDoc.kesiapanMurid.kebutuhanBelajar.kinestetik}</span>
            </div>
          </div>
        </section>

        {/* SECTION C & D: KARAKTERISTIK MATERI & DIMENSI PROFIL LULUSAN */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3.5 py-2 rounded-lg border-l-4 border-slate-900">
              C. KARAKTERISTIK MATERI PELAJARAN
            </h3>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5 text-xs leading-relaxed">
              <p>
                <strong className="text-slate-900">Pengetahuan Konseptual:</strong>{' '}
                {activeDoc.karakteristikMateri.konseptual}
              </p>
              <p>
                <strong className="text-slate-900">Pengetahuan Prosedural:</strong>{' '}
                {activeDoc.karakteristikMateri.prosedural}
              </p>
              <p>
                <strong className="text-slate-900">Relevansi Kehidupan Nyata:</strong>{' '}
                {activeDoc.karakteristikMateri.relevansi}
              </p>
              <p>
                <strong className="text-slate-900">Tingkat Kesulitan:</strong>{' '}
                {activeDoc.karakteristikMateri.tingkatKesulitan}
              </p>
              <p>
                <strong className="text-slate-900">Struktur Materi:</strong>{' '}
                {activeDoc.karakteristikMateri.strukturMateri}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3.5 py-2 rounded-lg border-l-4 border-slate-900">
              D. DIMENSI PROFIL LULUSAN
            </h3>
            <div className="space-y-2.5 text-xs">
              {activeDoc.dimensiProfilLulusan.map((d) => (
                <div
                  key={d.label}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1"
                >
                  <div className="font-bold text-sky-900">{d.label}</div>
                  <p className="text-slate-700 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESAIN PEMBELAJARAN (A - E) */}
        <div className="pt-4 border-t-2 border-slate-900 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 text-center">
            DESAIN PEMBELAJARAN MENDALAM (DEEP LEARNING)
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 text-sm">
                A. CAPAIAN PEMBELAJARAN (CP FASE D)
              </div>
              <p className="text-slate-700">{activeDoc.capaianPembelajaran}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 text-sm">
                B. LINTAS DISIPLIN ILMU &amp; D. TOPIK KONTEKSTUAL
              </div>
              <ul className="space-y-1 text-slate-700">
                {activeDoc.lintasDisiplin.map((l) => (
                  <li key={l.mapel}>
                    <strong>• {l.mapel}:</strong> {l.desc}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-200 text-slate-700">
                <strong>Topik Kontekstual: </strong>
                {activeDoc.topikKontekstual.join(' · ')}
              </div>
            </div>
          </div>

          {/* C. TUJUAN PEMBELAJARAN */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3.5 py-2 rounded-lg border-l-4 border-slate-900">
              C. TUJUAN PEMBELAJARAN ({activeDoc.tujuanPembelajaran.length} PERTEMUAN)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              {activeDoc.tujuanPembelajaran.map((tp) => (
                <div
                  key={tp.pertemuan}
                  className="p-3 bg-white border border-slate-200 rounded-lg flex items-start gap-2.5"
                >
                  <span className="font-mono font-bold text-sky-800 shrink-0">
                    {tp.pertemuan}:
                  </span>
                  <span className="text-slate-700">{tp.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* E. KERANGKA PEMBELAJARAN (DEEP LEARNING: MINDFUL, MEANINGFUL, JOYFUL) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3.5 py-2 rounded-lg border-l-4 border-slate-900">
              E. KERANGKA PEMBELAJARAN (PROBLEM-BASED LEARNING &amp; DEEP LEARNING)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
              <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-1.5">
                <div className="font-bold text-sky-950">1. Mindful Learning (Berkesadaran)</div>
                <p className="text-slate-700">{activeDoc.kerangkaPembelajaran.mindful}</p>
              </div>
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="font-bold text-emerald-950">2. Meaningful Learning (Bermakna)</div>
                <p className="text-slate-700">{activeDoc.kerangkaPembelajaran.meaningful}</p>
              </div>
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                <div className="font-bold text-amber-950">3. Joyful Learning (Menggembirakan)</div>
                <p className="text-slate-700">{activeDoc.kerangkaPembelajaran.joyful}</p>
              </div>
            </div>
          </div>
        </div>

        {/* F. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl">
            <div>
              <h3 className="text-sm font-bold">
                F. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI
              </h3>
              <p className="text-xs text-slate-300">
                Pilih pertemuan untuk melihat rincian kegiatan Pendahuluan, Inti, dan Penutup.
              </p>
            </div>

            <select
              value={String(activeMeetingIndex)}
              onChange={(e) =>
                setActiveMeetingIndex(
                  e.target.value === 'ALL' ? 'ALL' : Number(e.target.value)
                )
              }
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 text-white border border-slate-700 rounded-lg"
            >
              <option value="ALL">
                Tampilkan Semua ({activeDoc.pertemuanList.length} Pertemuan)
              </option>
              {activeDoc.pertemuanList.map((m, idx) => (
                <option key={m.pertemuan} value={idx}>
                  {m.pertemuan} ({m.alokasi}) — {m.topik}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {meetingsToShow.map((m) => (
              <div
                key={m.pertemuan}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs md:text-sm font-bold text-slate-900">
                    {m.pertemuan} ({m.alokasi}) — Topik: {m.topik}
                  </div>
                  <span className="text-xs font-mono text-sky-800 font-semibold">
                    Mindful · Meaningful · Joyful
                  </span>
                </div>

                <div className="p-4 md:p-5 space-y-4 text-xs leading-relaxed">
                  {/* Pendahuluan */}
                  <div>
                    <div className="font-bold text-slate-900 mb-1.5">
                      KEGIATAN PENDAHULUAN ({m.pendahuluanDurasi})
                    </div>
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
                      {m.pendahuluanItems.map((it, idx) => (
                        <li key={idx}>
                          <strong className="text-sky-900">{it.label}:</strong> {it.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Kegiatan Inti */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="font-bold text-slate-900 mb-1.5">
                      KEGIATAN INTI ({m.intiDurasi})
                    </div>
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
                      {m.intiItems.map((it, idx) => (
                        <li key={idx}>
                          <strong className="text-emerald-900">{it.label}:</strong> {it.text}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                      <div className="font-bold text-slate-900">
                        Strategi Pembelajaran Berdiferensiasi:
                      </div>
                      {m.diferensiasi.konten && (
                        <p className="text-slate-700">
                          <strong>• Konten:</strong> {m.diferensiasi.konten}
                        </p>
                      )}
                      <p className="text-slate-700">
                        <strong>• Proses:</strong> {m.diferensiasi.proses}
                      </p>
                      <p className="text-slate-700">
                        <strong>• Produk:</strong> {m.diferensiasi.produk}
                      </p>
                    </div>
                  </div>

                  {/* Kegiatan Penutup */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="font-bold text-slate-900 mb-1.5">
                      KEGIATAN PENUTUP ({m.penutupDurasi})
                    </div>
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
                      {m.penutupItems.map((it, idx) => (
                        <li key={idx}>
                          <strong className="text-slate-900">{it.label}:</strong> {it.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* G. ASESMEN PEMBELAJARAN (DIAGNOSTIK, FORMATIF, SUMATIF + PEMBAHASAN) */}
        <section className="space-y-5 pt-4 border-t-2 border-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-900 bg-slate-100 px-3.5 py-2 rounded-lg border-l-4 border-slate-900">
              G. ASESMEN PEMBELAJARAN (DIAGNOSTIK, FORMATIF &amp; SUMATIF)
            </h3>
            <button
              type="button"
              onClick={() => setShowSolutions((s) => !s)}
              className="px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-lg"
            >
              {showSolutions ? 'Sembunyikan Kunci & Pembahasan' : 'Tampilkan Kunci & Pembahasan'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-900">1. Asesmen Diagnostik</div>
              {activeDoc.asesmen.diagnostik.map((d) => (
                <p key={d.label} className="text-slate-700">
                  <strong>• {d.label}:</strong> {d.desc}
                </p>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-900">2. Asesmen Formatif</div>
              {activeDoc.asesmen.formatif.map((f) => (
                <p key={f.label} className="text-slate-700">
                  <strong>• {f.label}:</strong> {f.desc}
                </p>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-900">3. Asesmen Sumatif (Proyek &amp; Praktik)</div>
              <p className="text-slate-700">
                <strong>• Proyek:</strong> {activeDoc.asesmen.sumatifProyek.tugas}
              </p>
              <p className="text-slate-700">
                <strong>• Praktik:</strong> {activeDoc.asesmen.sumatifPraktik.tugas}
              </p>
            </div>
          </div>

          {/* Pilihan Ganda & Essay */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="space-y-3">
              <div className="font-bold text-slate-900 text-sm">
                A. Instrumen Tes Tertulis — Pilihan Ganda
              </div>
              {activeDoc.asesmen.tesPilihanGanda.map((q) => (
                <div
                  key={q.no}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                >
                  <p className="font-semibold text-slate-900">
                    {q.no}. {q.soal}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 text-slate-700 font-mono">
                    {q.options.map((opt) => (
                      <div key={opt}>{opt}</div>
                    ))}
                  </div>
                  {showSolutions && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950">
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Kunci Jawaban: {q.kunci}</span>
                      </div>
                      <p className="mt-1 text-slate-700">{q.pembahasan}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="font-bold text-slate-900 text-sm">
                B. Instrumen Tes Tertulis — Uraian (Essay)
              </div>
              {activeDoc.asesmen.tesEssay.map((es) => (
                <div
                  key={es.no}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                >
                  <p className="font-semibold text-slate-900">
                    {es.no}. {es.soal}
                  </p>
                  {showSolutions && (
                    <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-slate-800 whitespace-pre-line">
                      <strong className="text-sky-950 block mb-1">
                        Pembahasan &amp; Langkah Penyelesaian:
                      </strong>
                      {es.pembahasan}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFICIAL SIGNATURE BLOCK */}
        <section className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs md:text-sm text-slate-800">
          <div className="space-y-12">
            <div>
              <p>Mengetahui,</p>
              <p className="font-semibold">Kepala Sekolah</p>
            </div>
            <div>
              <p className="font-bold underline text-slate-900">
                {activeDoc.identitas.kepalaSekolah}
              </p>
              <p>{activeDoc.identitas.pangkatKepsek}</p>
              <p className="font-mono text-xs">NIP. {activeDoc.identitas.nipKepsek}</p>
            </div>
          </div>

          <div className="space-y-12 sm:text-right">
            <div>
              <p>{activeDoc.identitas.tempatTanggal}</p>
              <p className="font-semibold">Guru Mata Pelajaran</p>
            </div>
            <div>
              <p className="font-bold underline text-slate-900">
                {activeDoc.identitas.namaPenyusun}
              </p>
              <p className="font-mono text-xs">NIP. {activeDoc.identitas.nipPenyusun}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
