import React, { useState } from 'react';
import { CONCEPT_CHAPTERS, PBL_TASKS } from '../data/emodulContent';
import { StudentIdentity } from '../types';
import { CheckCircle2, AlertCircle, BookOpen, Compass, Send, ArrowRight } from 'lucide-react';
import pblMysteryImg from '../assets/images/pbl_detective_mystery_case_1790401447513.jpg';

interface PblModuleViewProps {
  student: StudentIdentity;
  onScoreSaved: (skorPbl: number, detail: string) => Promise<void>;
  onGoToSimulations: () => void;
  onGoToGame: () => void;
}

export const PblModuleView: React.FC<PblModuleViewProps> = ({
  student,
  onScoreSaved,
  onGoToSimulations,
  onGoToGame
}) => {
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [submittedPbl, setSubmittedPbl] = useState<boolean>(false);
  const [savingStatus, setSavingStatus] = useState<string>('');
  const [imgError, setImgError] = useState<boolean>(false);

  const activeChapter = CONCEPT_CHAPTERS[activeChapterIdx];

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = PBL_TASKS.filter(
    (task) =>
      task.options.find((o) => o.id === selectedAnswers[task.id])?.isCorrect
  ).length;
  const computedPblScore = Math.round((correctCount / PBL_TASKS.length) * 100);

  const handleSelectOption = (taskId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [taskId]: optionId }));
  };

  const handleSavePblResult = async () => {
    setSubmittedPbl(true);
    if (!student.nama.trim() || !student.kelas.trim() || !student.noAbsen.trim()) {
      setSavingStatus(
        'Skor LKPD PBL dihitung! Lengkapi [Nama, Kelas, No Absen, Sekolah] di bagian atas agar otomatis masuk ke Daftar Nilai.'
      );
      return;
    }
    setSavingStatus('Menyimpan nilai LKPD PBL ke Daftar Nilai...');
    await onScoreSaved(
      computedPblScore,
      `${correctCount}/${PBL_TASKS.length} Kasus PBL Kritis`
    );
    setSavingStatus(
      `Tersimpan ke Daftar Nilai! Skor LKPD PBL Anda: ${computedPblScore}/100 (${correctCount}/${PBL_TASKS.length} Kasus Benar).`
    );
  };

  return (
    <div className="space-y-12">
      {/* SECTION 1: EKSPLORASI MATERI INTI (5 RAHASIA RELASI & FUNGSI) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <p className="text-xs font-medium text-sky-700 mb-1">
              Eksplorasi Konsep Terstruktur · Matematika SMP/MTs Kelas VIII
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              5 Rahasia Utama Relasi &amp; Fungsi
            </h2>
          </div>
          <button
            type="button"
            onClick={onGoToSimulations}
            className="px-4 py-2 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors flex items-center gap-1.5 self-start whitespace-nowrap"
          >
            <Compass className="w-4 h-4" />
            <span>Buka Laboratorium Simulasi Interaktif</span>
          </button>
        </div>

        {/* Interactive Chapter Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-200/70 rounded-xl">
          {CONCEPT_CHAPTERS.map((chap, idx) => (
            <button
              key={chap.number}
              type="button"
              onClick={() => setActiveChapterIdx(idx)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeChapterIdx === idx
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {chap.number}: {chap.title.split('&')[0].replace('Rahasia ', '')}
            </button>
          ))}
        </div>

        {/* Active Chapter Content Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono font-semibold text-sky-700">
                {activeChapter.number} · Konsep Esensial Kelas VIII
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                {activeChapter.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeChapter.summary}
              </p>

              <div className="space-y-2.5 pt-2">
                {activeChapter.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-800">
                    <span className="font-mono font-bold text-sky-700 mt-0.5">
                      0{i + 1}.
                    </span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-slate-900 text-slate-100 rounded-lg">
                <div className="text-xs text-sky-300 font-medium mb-1.5">
                  Notasi &amp; Rumus Kunci Matematika:
                </div>
                <pre className="font-mono text-xs md:text-sm text-white whitespace-pre-wrap leading-relaxed">
                  {activeChapter.formulaBox}
                </pre>
              </div>

              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg">
                <div className="text-xs font-semibold text-amber-900 mb-1">
                  Catatan Berpikir Kritis (Anti-Jebakan Konsep):
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {activeChapter.criticalExample}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={activeChapterIdx === 0}
                  onClick={() => setActiveChapterIdx((p) => Math.max(0, p - 1))}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 disabled:opacity-40 transition-colors"
                >
                  ← Bab Sebelumnya
                </button>
                <button
                  type="button"
                  disabled={activeChapterIdx === CONCEPT_CHAPTERS.length - 1}
                  onClick={() =>
                    setActiveChapterIdx((p) =>
                      Math.min(CONCEPT_CHAPTERS.length - 1, p + 1)
                    )
                  }
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 disabled:opacity-40 transition-colors"
                >
                  Bab Selanjutnya →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LKPD INTERAKTIF BERBASIS PROBLEM BASED LEARNING (PBL) */}
      <section className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-200">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-xs font-medium text-sky-700">
                Lembar Kerja Peserta Didik (LKPD) Interaktif · Sintaks Problem Based Learning
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Penyelidikan 4 Kasus Misteri Relasi &amp; Fungsi
              </h2>
              <p className="text-sm text-slate-600">
                Pecahkan setiap masalah kontekstual berikut menggunakan tahapan berpikir kritis (Interpretasi, Analisis, Evaluasi, dan Inferensi). Skor LKPD ini otomatis terintegrasi dengan Daftar Nilai.
              </p>
            </div>

            <div className="lg:col-span-4">
              {!imgError ? (
                <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-4/3 bg-slate-100">
                  <img
                    src={pblMysteryImg}
                    alt="Ilustrasi Penyelidikan Misteri Relasi dan Fungsi"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent flex items-end p-3">
                    <span className="text-xs font-medium text-white">
                      Meja Investigasi PBL · Matematika Kelas VIII
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-slate-200 aspect-4/3 bg-slate-900 text-white p-4 flex flex-col justify-between">
                  <BookOpen className="w-6 h-6 text-sky-400" />
                  <div>
                    <div className="text-xs text-sky-300 font-mono">LKPD PBL KELAS VIII</div>
                    <div className="text-sm font-semibold">Investigasi Kritis Relasi &amp; Fungsi</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4 Interactive PBL Stages */}
          <div className="divide-y divide-slate-200">
            {PBL_TASKS.map((task) => {
              const chosenId = selectedAnswers[task.id];
              const chosenOption = task.options.find((o) => o.id === chosenId);

              return (
                <div key={task.id} className="py-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">
                      {task.stageName}
                    </span>
                    <span>
                      Indikator Kritis: <strong className="text-sky-800">{task.criticalSkill}</strong>
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {task.caseTitle}
                  </h3>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 leading-relaxed">
                    {task.context}
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    Pertanyaan Investigasi: {task.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {task.options.map((opt) => {
                      const isSelected = chosenId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(task.id, opt.id)}
                          className={`text-left p-3.5 rounded-lg border text-xs leading-relaxed transition-colors flex items-start gap-2.5 ${
                            isSelected
                              ? opt.isCorrect
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                                : 'bg-amber-50 border-amber-400 text-amber-950 font-medium'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-mono font-bold uppercase text-slate-900 shrink-0">
                            {opt.id}.
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Critical Thinking Feedback */}
                  {chosenOption && (
                    <div
                      className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                        chosenOption.isCorrect
                          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                          : 'bg-amber-50/90 border-amber-300 text-amber-950'
                      }`}
                    >
                      {chosenOption.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-semibold">
                          {chosenOption.isCorrect
                            ? '● Analisis Tepat: '
                            : '▲ Evaluasi Kembali: '}
                        </span>
                        <span>{chosenOption.feedback}</span>
                      </div>
                    </div>
                  )}

                  {/* Stage 5 Reflection Note */}
                  <div className="pt-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Catatan Argumen Kritis Siswa ({task.reflectionPrompt}):
                    </label>
                    <input
                      type="text"
                      value={reflections[task.id] || ''}
                      onChange={(e) =>
                        setReflections((prev) => ({
                          ...prev,
                          [task.id]: e.target.value
                        }))
                      }
                      placeholder="Tuliskan kesimpulan singkatmu di sini..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit PBL Score Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-900 tabular-nums">
                Progres LKPD PBL: {answeredCount}/{PBL_TASKS.length} Kasus Dijawab · Skor Saat Ini: {computedPblScore}/100
              </div>
              {savingStatus && (
                <p className="text-xs font-medium text-emerald-800">
                  {savingStatus}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSavePblResult}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simpan Skor LKPD ke Daftar Nilai</span>
              </button>
              <button
                type="button"
                onClick={onGoToGame}
                className="px-4 py-2.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Lanjut ke Game Evaluasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
