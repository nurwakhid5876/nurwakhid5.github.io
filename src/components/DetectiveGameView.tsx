import React, { useState } from 'react';
import { CLASS_OPTIONS, QUIZ_QUESTIONS } from '../data/emodulContent';
import { StudentIdentity } from '../types';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  ArrowRight,
  FileText,
  Table2
} from 'lucide-react';

interface DetectiveGameViewProps {
  student: StudentIdentity;
  onUpdateStudent: (updated: StudentIdentity) => void;
  onGameCompleted: (skorGame: number, detail: string) => Promise<void>;
  onOpenDaftarNilai: () => void;
  onDownloadWord: () => void;
}

export const DetectiveGameView: React.FC<DetectiveGameViewProps> = ({
  student,
  onUpdateStudent,
  onGameCompleted,
  onOpenDaftarNilai,
  onDownloadWord
}) => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const selectedOption = answers[currentQuestion.id];
  const hasAnsweredCurrent = selectedOption !== undefined;

  const totalCorrect = QUIZ_QUESTIONS.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;
  const finalGameScore = Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100);

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !student.nama.trim() ||
      !student.kelas.trim() ||
      !student.noAbsen.trim() ||
      !student.sekolah.trim()
    ) {
      setValidationError(
        'Mohon lengkapi seluruh kolom entri pengguna Game: [Nama, Kelas, No Absen, Sekolah] sebelum memulai.'
      );
      return;
    }
    setValidationError('');
    setGameStarted(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleNextOrFinish = async () => {
    setShowHint(false);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
      setSaveMessage('Menyimpan hasil Game ke Daftar Nilai Canva Sheet...');
      await onGameCompleted(
        finalGameScore,
        `${totalCorrect}/${QUIZ_QUESTIONS.length} Soal Game Benar`
      );
      setSaveMessage(
        'Nilai berhasil direkam ke Daftar Nilai! Pengembang (NUR WAKHID, S.Pd) dapat langsung mengakses dan menyalin data ke Canva Sheet.'
      );
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowHint(false);
    setIsFinished(false);
    setSaveMessage('');
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-sky-700 mb-1">
            Evaluasi Interaktif Berbasis PBL · Fokus Kemampuan Berpikir Kritis
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Game Detektif: Mengungkap Misteri Relasi &amp; Fungsi
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDownloadWord}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-sky-700" />
            <span>Unduh Soal &amp; Pembahasan (Word)</span>
          </button>
          <button
            type="button"
            onClick={onOpenDaftarNilai}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Table2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Lihat Daftar Nilai</span>
          </button>
        </div>
      </div>

      {/* STEP 1: ENTRI PENGGUNA GAME [Nama, Kelas, No Absen, Sekolah] */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Header Kolom Entri Pengguna Game: [Nama, Kelas, No Absen, Sekolah]
            </h3>
            <p className="text-xs text-slate-600">
              Pastikan identitas terisi benar agar skor otomatis terekam pada Daftar Nilai Canva Sheet.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Pengembang: NUR WAKHID, S.Pd
          </span>
        </div>

        <form onSubmit={handleStartGame} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                1. Nama Lengkap Siswa
              </label>
              <input
                type="text"
                value={student.nama}
                onChange={(e) =>
                  onUpdateStudent({ ...student, nama: e.target.value })
                }
                placeholder="Contoh: Ahmad Fauzi"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:border-sky-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                2. Kelas
              </label>
              <select
                value={student.kelas}
                onChange={(e) =>
                  onUpdateStudent({ ...student, kelas: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:border-sky-600"
              >
                <option value="">-- Pilih Kelas --</option>
                {CLASS_OPTIONS.map((kls) => (
                  <option key={kls} value={kls}>
                    {kls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                3. No Absen
              </label>
              <input
                type="text"
                value={student.noAbsen}
                onChange={(e) =>
                  onUpdateStudent({ ...student, noAbsen: e.target.value })
                }
                placeholder="Contoh: 05"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:border-sky-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                4. Sekolah
              </label>
              <input
                type="text"
                value={student.sekolah}
                onChange={(e) =>
                  onUpdateStudent({ ...student, sekolah: e.target.value })
                }
                placeholder="SMP Negeri 1 Bantarkawung"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:border-sky-600"
              />
            </div>
          </div>

          {validationError && (
            <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              ▲ {validationError}
            </p>
          )}

          {!gameStarted && (
            <div className="pt-2 flex items-center justify-between">
              <p className="text-xs text-slate-600">
                Terdiri dari 10 Tantangan Kasus Berpikir Kritis (Skor Maksimal: 100 Poin).
              </p>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <span>Mulai Misi Game Detektif</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </form>
      </div>

      {/* STEP 2: ACTIVE GAME BOARD OR FINAL SCORE REPORT */}
      {gameStarted && !isFinished && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-semibold text-slate-900">
                {currentQuestion.caseTitle}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Indikator Berpikir Kritis:{' '}
                <strong className="text-sky-800">
                  {currentQuestion.criticalIndicator}
                </strong>
              </span>
            </div>
            <div className="font-mono font-semibold text-slate-800 tabular-nums">
              Soal {currentIdx + 1} / {QUIZ_QUESTIONS.length} · Skor Sementara:{' '}
              {totalCorrect * 10}
            </div>
          </div>

          {/* Scenario & Math Data */}
          <div className="space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentQuestion.scenario}
            </p>

            {currentQuestion.mathData && (
              <div className="p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs md:text-sm whitespace-pre-line">
                {currentQuestion.mathData}
              </div>
            )}

            <h3 className="text-base md:text-lg font-semibold text-slate-900">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let buttonStyle =
                'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/30';
              if (hasAnsweredCurrent) {
                if (isCorrectOption) {
                  buttonStyle =
                    'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrectOption) {
                  buttonStyle =
                    'bg-red-50 border-red-400 text-red-950 font-medium';
                } else {
                  buttonStyle = 'bg-slate-50 border-slate-200 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnsweredCurrent}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-lg border text-left text-xs md:text-sm transition-colors flex items-start justify-between gap-3 ${buttonStyle}`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono font-bold text-slate-900 shrink-0">
                      {optionLetters[idx]}.
                    </span>
                    <span>{opt}</span>
                  </div>
                  {hasAnsweredCurrent && isCorrectOption && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  )}
                  {hasAnsweredCurrent && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint Toggle & Critical Explanation */}
          <div className="pt-2 space-y-3">
            {!hasAnsweredCurrent && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="text-xs font-medium text-sky-700 hover:text-sky-900 flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>
                    {showHint
                      ? 'Sembunyikan Petunjuk Penyelidikan'
                      : 'Butuh Petunjuk Berpikir Kritis?'}
                  </span>
                </button>
                {showHint && (
                  <div className="mt-2 p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-950">
                    <strong>Petunjuk Detektif:</strong> {currentQuestion.hint}
                  </div>
                )}
              </div>
            )}

            {hasAnsweredCurrent && (
              <div
                className={`p-4 rounded-lg border text-xs leading-relaxed space-y-1.5 ${
                  selectedOption === currentQuestion.correctIndex
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50/90 border-amber-300 text-amber-950'
                }`}
              >
                <div className="font-semibold">
                  {selectedOption === currentQuestion.correctIndex
                    ? '● Jawaban Benar (+10 Poin) — Pembahasan Kritis:'
                    : `▲ Jawaban Kurang Tepat (Kunci: ${
                        optionLetters[currentQuestion.correctIndex]
                      }) — Pembahasan Kritis:`}
                </div>
                <p className="whitespace-pre-line">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Peserta: <strong className="text-slate-800">{student.nama}</strong> ·{' '}
              {student.kelas} · Absen {student.noAbsen}
            </div>
            <button
              type="button"
              disabled={!hasAnsweredCurrent}
              onClick={handleNextOrFinish}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>
                {currentIdx < QUIZ_QUESTIONS.length - 1
                  ? 'Kasus Berikutnya →'
                  : 'Selesaikan & Simpan ke Daftar Nilai'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: GAME SUMMARY & RECORDED SCORE */}
      {isFinished && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Misi Penyelidikan Selesai · Data Terekam</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">
                Hasil Evaluasi Berpikir Kritis: {student.nama}
              </h3>
              <p className="text-xs text-slate-600">
                Kelas: {student.kelas} · No Absen: {student.noAbsen} · Sekolah:{' '}
                {student.sekolah}
              </p>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-xl text-center min-w-[160px]">
              <div className="text-xs text-slate-300">SKOR GAME DETEKTIF</div>
              <div className="text-3xl font-mono font-bold text-emerald-400 tabular-nums mt-0.5">
                {finalGameScore} / 100
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Benar {totalCorrect} dari {QUIZ_QUESTIONS.length} Soal
              </div>
            </div>
          </div>

          {saveMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-950 font-medium">
              ● {saveMessage}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenDaftarNilai}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Table2 className="w-4 h-4" />
              <span>Buka Daftar Nilai &amp; Data Canva Sheet</span>
            </button>
            <button
              type="button"
              onClick={onDownloadWord}
              className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Unduh Soal &amp; Pembahasan in Word (.doc)</span>
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Misi Game</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
