import React, { useState } from 'react';
import {
  BANK_SOAL_BILANGAN_BULAT,
  BANK_SOAL_RELASI_FUNGSI,
  PaketBankSoal
} from '../data/bankSoalContent';
import { StudentIdentity } from '../types';
import { downloadBankSoalWordDocument } from '../utils/wordExport';
import {
  FileDown,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  BookOpenCheck,
  RotateCcw
} from 'lucide-react';

interface BankSoalViewProps {
  student: StudentIdentity;
}

export const BankSoalView: React.FC<BankSoalViewProps> = ({ student }) => {
  const [selectedPaketId, setSelectedPaketId] = useState<
    'relasi_fungsi_viii' | 'bilangan_bulat_vii'
  >('relasi_fungsi_viii');
  const [showAllKeys, setShowAllKeys] = useState<boolean>(true);
  const [showKisiKisi, setShowKisiKisi] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const activePaket: PaketBankSoal =
    selectedPaketId === 'relasi_fungsi_viii'
      ? BANK_SOAL_RELASI_FUNGSI
      : BANK_SOAL_BILANGAN_BULAT;

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleChooseOption = (qNo: number, optIdx: number) => {
    const key = `${activePaket.id}-${qNo}`;
    setUserAnswers((prev) => ({ ...prev, [key]: optIdx }));
  };

  const handleResetPractice = () => {
    setUserAnswers({});
  };

  const handleCopyAllQuestions = async () => {
    const pgText = activePaket.pilihanGanda
      .map((q) => {
        const opts = q.options
          .map((o, i) => `   ${optionLetters[i]}. ${o}`)
          .join('\n');
        return `${q.no}. [${q.topik} - ${q.levelKognitif}]\n${q.stimulus}\nPertanyaan: ${q.pertanyaan}\n${opts}\nKunci: ${optionLetters[q.kunciIndex]}. ${q.options[q.kunciIndex]}\nPembahasan: ${q.pembahasan}`;
      })
      .join('\n\n');

    const essayText = activePaket.uraian
      .map((eq) => {
        const subs = eq.rincianPertanyaan.join('\n   ');
        const sols = eq.langkahPembahasan.join('\n   ');
        return `Uraian ${eq.no}. (${eq.judulKasus} - Skor Maks: ${eq.skorMaksimal})\n${eq.permasalahan}\n   ${subs}\nPembahasan:\n   ${sols}\nKesimpulan: ${eq.kesimpulanKunci}`;
      })
      .join('\n\n');

    const fullText = `${activePaket.namaPaket}\n${activePaket.kelasSemester} | Penyusun: ${activePaket.penyusun} (${activePaket.instansi})\n\n=== BAGIAN I: PILIHAN GANDA ===\n\n${pgText}\n\n=== BAGIAN II: SOAL URAIAN / ESSAY ===\n\n${essayText}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = fullText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    }
  };

  const answeredInCurrent = activePaket.pilihanGanda.filter(
    (q) => userAnswers[`${activePaket.id}-${q.no}`] !== undefined
  ).length;
  const correctInCurrent = activePaket.pilihanGanda.filter(
    (q) => userAnswers[`${activePaket.id}-${q.no}`] === q.kunciIndex
  ).length;

  return (
    <section className="space-y-8">
      {/* Header & Package Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <p className="text-xs font-medium text-sky-700 mb-1">
              Bank Soal, Kisi-Kisi, Kunci Jawaban &amp; Pembahasan Lengkap
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Instrumen Soal Evaluasi Matematika SMP/MTs
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Pilih paket soal di bawah ini untuk berlatih langsung di layar, melihat pembahasan langkah demi langkah, atau mengunduh naskah siap cetak ke Microsoft Word (<code className="font-mono">.doc</code>).
            </p>
          </div>

          {/* Segmented Package Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setSelectedPaketId('relasi_fungsi_viii')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPaketId === 'relasi_fungsi_viii'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📘 Paket 1: Relasi &amp; Fungsi (Kelas VIII · 15 PG + 5 Uraian)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPaketId('bilangan_bulat_vii')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPaketId === 'bilangan_bulat_vii'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📗 Paket 2: Bilangan Bulat (Kelas VII · 10 PG + 3 Uraian)
            </button>
          </div>
        </div>

        {/* Active Package Metadata & Action Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 text-xs text-slate-600">
            <div className="text-base font-semibold text-slate-900">
              {activePaket.namaPaket}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span>{activePaket.kelasSemester}</span>
              <span aria-hidden="true">·</span>
              <span>
                Penyusun: <strong className="text-slate-900">{activePaket.penyusun}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>{activePaket.instansi}</span>
            </div>
            <p className="text-slate-500 pt-0.5">{activePaket.deskripsiSingkat}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                downloadBankSoalWordDocument(activePaket, true, student)
              }
              className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Unduh Soal + Pembahasan (.doc)</span>
            </button>

            <button
              type="button"
              onClick={() =>
                downloadBankSoalWordDocument(activePaket, false, student)
              }
              className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-700" />
              <span>Unduh Lembar Soal Siswa (.doc)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyAllQuestions}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Semua Teks Soal</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Filter & Solution Toggle Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAllKeys((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg font-semibold border flex items-center gap-1.5 transition-colors ${
                showAllKeys
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {showAllKeys ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mode Guru: Kunci &amp; Pembahasan Ditampilkan</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Mode Latihan Siswa: Kunci Disembunyikan</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowKisiKisi((prev) => !prev)}
              className="px-3 py-1.5 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <BookOpenCheck className="w-3.5 h-3.5 text-sky-700" />
              <span>
                {showKisiKisi ? 'Sembunyikan Tabel Kisi-Kisi' : 'Tampilkan Tabel Kisi-Kisi'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-700 tabular-nums">
              Uji Coba Dijawab: <strong>{answeredInCurrent}</strong>/{activePaket.pilihanGanda.length} · Benar:{' '}
              <strong className="text-emerald-700">{correctInCurrent}</strong>
            </span>
            {answeredInCurrent > 0 && (
              <button
                type="button"
                onClick={handleResetPractice}
                className="text-slate-500 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Jawaban</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KISI-KISI INSTRUMEN SOAL */}
      {showKisiKisi && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              Matriks Kisi-Kisi Instrumen Soal ({activePaket.pilihanGanda.length} Pilihan Ganda &amp; {activePaket.uraian.length} Uraian)
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {activePaket.kelasSemester}
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs tabular-nums">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-2.5 px-3 font-semibold text-center w-14">No</th>
                  <th className="py-2.5 px-3.5 font-semibold">Topik Materi</th>
                  <th className="py-2.5 px-3.5 font-semibold">Indikator Kritis / Kompetensi</th>
                  <th className="py-2.5 px-3 font-semibold">Level Kognitif</th>
                  <th className="py-2.5 px-3 font-semibold text-center w-20">Kunci</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activePaket.pilihanGanda.map((q) => (
                  <tr key={q.no} className="hover:bg-slate-50">
                    <td className="py-2 px-3 text-center font-mono font-semibold text-slate-700">
                      PG-{q.no}
                    </td>
                    <td className="py-2 px-3.5 font-medium text-slate-900">
                      {q.topik}
                    </td>
                    <td className="py-2 px-3.5 text-slate-700">
                      {q.indikatorKritis}
                    </td>
                    <td className="py-2 px-3 font-mono text-sky-800">
                      {q.levelKognitif}
                    </td>
                    <td className="py-2 px-3 text-center font-mono font-bold text-emerald-800">
                      {showAllKeys ? optionLetters[q.kunciIndex] : '•'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BAGIAN I: DAFTAR SOAL PILIHAN GANDA */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Bagian I — Soal Pilihan Ganda ({activePaket.pilihanGanda.length} Nomor)
          </h3>
          <span className="text-xs text-slate-500">
            Klik pada pilihan A, B, C, atau D untuk menguji jawaban secara interaktif
          </span>
        </div>

        <div className="space-y-4">
          {activePaket.pilihanGanda.map((q) => {
            const answerKey = `${activePaket.id}-${q.no}`;
            const chosenIdx = userAnswers[answerKey];
            const hasChosen = chosenIdx !== undefined;
            const revealSolution = showAllKeys || hasChosen;

            return (
              <div
                key={q.no}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">
                      SOAL NO. {q.no}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-800">{q.topik}</span>
                    <span aria-hidden="true">·</span>
                    <span>Indikator: {q.indikatorKritis}</span>
                  </div>
                  <span className="font-mono font-semibold text-sky-800">
                    {q.levelKognitif}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {q.stimulus}
                </p>

                {q.mathBox && (
                  <div className="p-3.5 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs md:text-sm whitespace-pre-line">
                    {q.mathBox}
                  </div>
                )}

                <p className="text-sm md:text-base font-semibold text-slate-900">
                  {q.pertanyaan}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.kunciIndex;
                    const isSelected = chosenIdx === optIdx;

                    let boxClass =
                      'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/30';
                    if (revealSolution) {
                      if (isCorrect) {
                        boxClass =
                          'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        boxClass =
                          'bg-red-50 border-red-300 text-red-950 font-medium';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleChooseOption(q.no, optIdx)}
                        className={`p-3.5 rounded-lg border text-left text-xs md:text-sm transition-colors flex items-start justify-between gap-2.5 ${boxClass}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-slate-900 shrink-0">
                            {optionLetters[optIdx]}.
                          </span>
                          <span>{opt}</span>
                        </div>
                        {revealSolution && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        )}
                        {revealSolution && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {revealSolution && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 leading-relaxed">
                    <div className="font-semibold text-emerald-900">
                      ● Kunci Jawaban: {optionLetters[q.kunciIndex]}.{' '}
                      {q.options[q.kunciIndex]}
                    </div>
                    <div className="text-slate-700 whitespace-pre-line">
                      <strong>Pembahasan:</strong> {q.pembahasan}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BAGIAN II: DAFTAR SOAL URAIAN / ESSAY HOTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Bagian II — Soal Uraian / Essay Pemecahan Masalah ({activePaket.uraian.length} Nomor)
          </h3>
          <span className="text-xs font-mono text-slate-500">
            Total Skor Uraian: 100 Poin
          </span>
        </div>

        <div className="space-y-4">
          {activePaket.uraian.map((eq) => (
            <div
              key={eq.no}
              className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">
                    URAIAN NO. {eq.no}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-slate-800">
                    {eq.judulKasus}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{eq.indikatorKritis}</span>
                </div>
                <span className="font-mono font-semibold text-sky-800">
                  {eq.levelKognitif} · Skor Maks: {eq.skorMaksimal}
                </span>
              </div>

              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {eq.permasalahan}
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs md:text-sm text-slate-900 font-medium">
                {eq.rincianPertanyaan.map((rq, idx) => (
                  <p key={idx}>{rq}</p>
                ))}
              </div>

              {showAllKeys && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-2 text-xs leading-relaxed">
                  <div className="font-semibold text-emerald-950">
                    ● Pedoman Penskoran &amp; Langkah Pembahasan Uraian {eq.no}:
                  </div>
                  <div className="space-y-1.5 text-slate-800">
                    {eq.langkahPembahasan.map((step, sIdx) => (
                      <p key={sIdx} className="whitespace-pre-line">
                        {step}
                      </p>
                    ))}
                  </div>
                  <div className="pt-1 border-t border-emerald-200/80 font-semibold text-emerald-900">
                    Kesimpulan Kunci: {eq.kesimpulanKunci}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
