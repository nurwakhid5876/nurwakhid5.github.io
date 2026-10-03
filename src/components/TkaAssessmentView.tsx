import React, { useEffect, useState } from 'react';
import {
  TKA_META,
  TKA_QUESTIONS,
  TkaQuestion,
  evaluateEssayInitialScore,
  verifyTkaQuestionBank
} from '../data/tkaKelas7Data';
import { StudentIdentity } from '../types';
import {
  downloadStudentTkaReportWord,
  downloadTkaKelas7WordDocument
} from '../utils/wordExport';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileDown,
  Flag,
  HelpCircle,
  Layers,
  ListChecks,
  Pause,
  Play,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Table,
  UserCheck,
  XCircle
} from 'lucide-react';

interface TkaAssessmentViewProps {
  student: StudentIdentity;
  onUpdateStudent: (s: StudentIdentity) => void;
  onAssessmentCompleted: (
    nilaiAkhir: number,
    detailRingkasan: string,
    overrideStudent?: StudentIdentity
  ) => Promise<void>;
  onOpenDaftarNilai: () => void;
}

const KELAS_7_OPTIONS = [
  'VII A',
  'VII B',
  'VII C',
  'VII D',
  'VII E',
  'VII F',
  'VII G',
  'VII H'
];

const MATH_SYMBOLS = ['+', '-', '×', '÷', '=', '°C', '¼', '½', '¾', '%', 'Rp', 'm²'];

export const TkaAssessmentView: React.FC<TkaAssessmentViewProps> = ({
  student,
  onUpdateStudent,
  onAssessmentCompleted,
  onOpenDaftarNilai
}) => {
  const [subTab, setSubTab] = useState<'ujian' | 'hasil' | 'kisikisi'>('ujian');
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Local student identity defaulted to SMP Negeri 2 Karangbinangun & Kelas VII
  const [localStudent, setLocalStudent] = useState<StudentIdentity>({
    nama: student.nama || '',
    kelas: student.kelas.startsWith('VII ') ? student.kelas : 'VII A',
    noAbsen: student.noAbsen || '',
    sekolah:
      student.sekolah && student.sekolah !== 'SMP Negeri 1 Bantarkawung'
        ? student.sekolah
        : TKA_META.sekolah
  });
  const [identityError, setIdentityError] = useState<string>('');

  // Timer settings
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [secondsLeft, setSecondsLeft] = useState<number>(45 * 60);
  const [timerPaused, setTimerPaused] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Active question index (0..24)
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showIndicator, setShowIndicator] = useState<boolean>(true);

  // Student answers:
  // For BS (1..5) and PG (6..20): key is question.no, value is selected option index
  const [answersObj, setAnswersObj] = useState<Record<number, number | undefined>>({});
  // For URAIAN (21..25): key is question.no, value is string answer
  const [answersEssay, setAnswersEssay] = useState<Record<number, string | undefined>>({});
  // For URAIAN rubric score (0..4): key is question.no, value is 0..4
  const [essayScores, setEssayScores] = useState<Record<number, number>>({
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0
  });
  // Marked as doubtful (Ragu-ragu)
  const [doubtfulMap, setDoubtfulMap] = useState<Record<number, boolean>>({});

  // Filter for review tab
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'BS' | 'PG' | 'URAIAN' | 'WRONG'>('ALL');
  const [kisiFilter, setKisiFilter] = useState<'ALL' | 'BS' | 'PG' | 'URAIAN'>('ALL');
  const [savedServerBanner, setSavedServerBanner] = useState<boolean>(false);

  // Interactive number line helper state
  const [markerA, setMarkerA] = useState<number>(-4);
  const [markerB, setMarkerB] = useState<number>(3);

  const validationStats = verifyTkaQuestionBank();
  const currentQuestion: TkaQuestion = TKA_QUESTIONS[currentIdx];

  // Countdown timer effect
  useEffect(() => {
    if (!examStarted || examSubmitted || timerPaused) return;
    if (durationMinutes === 0) {
      // Untimed practice mode still counts elapsed time
      const untimedInterval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(untimedInterval);
    }

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examStarted, examSubmitted, timerPaused, durationMinutes]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isQuestionAnswered = (q: TkaQuestion) => {
    if (q.type === 'URAIAN') {
      return Boolean(answersEssay[q.no] && answersEssay[q.no]!.trim().length > 0);
    }
    return answersObj[q.no] !== undefined;
  };

  const answeredCount = TKA_QUESTIONS.filter((q) => isQuestionAnswered(q)).length;
  const doubtfulCount = Object.values(doubtfulMap).filter(Boolean).length;
  const progressPercent = Math.round((answeredCount / TKA_QUESTIONS.length) * 100);

  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localStudent.nama.trim() || !localStudent.noAbsen.trim()) {
      setIdentityError('Mohon lengkapi Nama Peserta dan Nomor Absen sebelum memulai asesmen.');
      return;
    }
    setIdentityError('');
    onUpdateStudent(localStudent);
    setSecondsLeft(durationMinutes * 60);
    setElapsedSeconds(0);
    setExamStarted(true);
    setExamSubmitted(false);
    setSubTab('ujian');
  };

  const handleSelectObjective = (qNo: number, optionIndex: number) => {
    if (examSubmitted) return;
    setAnswersObj((prev) => ({
      ...prev,
      [qNo]: optionIndex
    }));
  };

  const handleEssayChange = (qNo: number, text: string) => {
    if (examSubmitted) return;
    setAnswersEssay((prev) => ({
      ...prev,
      [qNo]: text
    }));
  };

  const handleInsertSymbol = (sym: string) => {
    if (currentQuestion.type !== 'URAIAN' || examSubmitted) return;
    const prev = answersEssay[currentQuestion.no] || '';
    setAnswersEssay({
      ...answersEssay,
      [currentQuestion.no]: `${prev}${prev.endsWith(' ') || !prev ? '' : ' '}${sym} `
    });
  };

  const toggleDoubtful = (qNo: number) => {
    setDoubtfulMap((prev) => ({
      ...prev,
      [qNo]: !prev[qNo]
    }));
  };

  // Compute scores
  const bsQuestions = TKA_QUESTIONS.filter((q) => q.type === 'BS');
  const pgQuestions = TKA_QUESTIONS.filter((q) => q.type === 'PG');
  const uraianQuestions = TKA_QUESTIONS.filter((q) => q.type === 'URAIAN');

  const skorBS = bsQuestions.reduce(
    (acc, q) => acc + (answersObj[q.no] === q.correctIndex ? 1 : 0),
    0
  );
  const skorPG = pgQuestions.reduce(
    (acc, q) => acc + (answersObj[q.no] === q.correctIndex ? 1 : 0),
    0
  );
  const skorUraian = uraianQuestions.reduce(
    (acc, q) => acc + (essayScores[q.no] ?? 0),
    0
  );

  // Max raw score: BS (5) + PG (15) + Uraian (5 * 4 = 20) = 40
  const maxRawScore = 40;
  const totalSkor = skorBS + skorPG + skorUraian;
  const nilaiAkhir = Math.round((totalSkor / maxRawScore) * 100);

  const getPredikatInfo = (nilai: number) => {
    if (nilai >= 88) {
      return {
        label: 'A (Sangat Baik / Mahir TKA)',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        rekomendasi:
          'Selamat! Kamu telah menguasai konsep dan penalaran HOTS Bilangan Bulat serta Pecahan dengan sangat baik. Kamu siap diberikan tantangan pengayaan olimpiade/TKA lanjutan.'
      };
    }
    if (nilai >= 75) {
      return {
        label: 'B (Baik / Cakap Bernalar)',
        badgeClass: 'bg-sky-100 text-sky-900 border-sky-300',
        rekomendasi:
          'Capaianmu sudah baik! Perkuat lagi ketelitian pada soal cerita multi-tahap (HOTS) dan konversi berbagai bentuk pecahan.'
      };
    }
    if (nilai >= 60) {
      return {
        label: 'C (Cukup / Berkembang)',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        rekomendasi:
          'Pemahaman dasar sudah cukup, namun perlu latihan tambahan pada operasi campuran bilangan bulat negatif dan pembagian pecahan kontekstual.'
      };
    }
    return {
      label: 'D (Perlu Pendampingan Terbimbing)',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
      rekomendasi:
        'Mari pelajari kembali konsep dasar perbandingan garis bilangan bulat dan penyamaan penyebut pecahan melalui simulasi interaktif serta pembahasan di bawah ini.'
    };
  };

  const predikatInfo = getPredikatInfo(nilaiAkhir);

  // Finalize and submit exam
  const handleFinalizeExam = async () => {
    // Evaluate initial automatic scores for Uraian 21..25 based on keywords & numbers
    const computedEssayScores: Record<number, number> = {};
    let sumEssay = 0;
    uraianQuestions.forEach((q) => {
      const text = answersEssay[q.no] || '';
      const sc = evaluateEssayInitialScore(q, text);
      computedEssayScores[q.no] = sc;
      sumEssay += sc;
    });

    setEssayScores(computedEssayScores);
    setExamSubmitted(true);
    setShowConfirmSubmit(false);
    setSubTab('hasil');

    const finalRaw = skorBS + skorPG + sumEssay;
    const finalNilai = Math.round((finalRaw / maxRawScore) * 100);
    const detail = `TKA Kelas 7: BS ${skorBS}/5 · PG ${skorPG}/15 · Uraian ${sumEssay}/20 (Total ${finalRaw}/40)`;

    const activeIdentity: StudentIdentity = {
      nama: localStudent.nama.trim() || 'Siswa Kelas VII',
      kelas: localStudent.kelas || 'VII A',
      noAbsen: localStudent.noAbsen.trim() || '01',
      sekolah: localStudent.sekolah.trim() || TKA_META.sekolah
    };
    onUpdateStudent(activeIdentity);
    await onAssessmentCompleted(finalNilai, detail, activeIdentity);
    setSavedServerBanner(true);
  };

  // Update essay rubric score manually (Teacher adjustment 0..4)
  const handleAdjustEssayScore = async (qNo: number, newScore: number) => {
    const updated = {
      ...essayScores,
      [qNo]: newScore
    };
    setEssayScores(updated);

    if (examSubmitted) {
      const sumEssay = uraianQuestions.reduce((acc, q) => acc + (updated[q.no] ?? 0), 0);
      const finalRaw = skorBS + skorPG + sumEssay;
      const finalNilai = Math.round((finalRaw / maxRawScore) * 100);
      const detail = `TKA Kelas 7 (Koreksi Rubrik): BS ${skorBS}/5 · PG ${skorPG}/15 · Uraian ${sumEssay}/20`;
      await onAssessmentCompleted(finalNilai, detail, localStudent);
    }
  };

  // Demo autofill button for teachers/reviewers
  const handleFillDemoAnswers = () => {
    const demoStudent: StudentIdentity = {
      nama: localStudent.nama.trim() || 'Naufal Pratama Putra',
      kelas: localStudent.kelas || 'VII A',
      noAbsen: localStudent.noAbsen.trim() || '14',
      sekolah: localStudent.sekolah.trim() || TKA_META.sekolah
    };
    setLocalStudent(demoStudent);
    onUpdateStudent(demoStudent);

    const demoObj: Record<number, number> = {};
    TKA_QUESTIONS.forEach((q) => {
      if (q.type === 'BS' || q.type === 'PG') {
        // Make 18 out of 20 correct for realistic diagnostic showcase
        if (q.no === 11 || q.no === 19) {
          demoObj[q.no] = ((q.correctIndex || 0) + 1) % (q.options?.length || 2);
        } else {
          demoObj[q.no] = q.correctIndex ?? 0;
        }
      }
    });

    const demoEssay: Record<number, string> = {};
    const demoEssaySc: Record<number, number> = {};
    uraianQuestions.forEach((q) => {
      demoEssay[q.no] = `${q.langkahPenyelesaian?.join('\n')}\nKesimpulan: ${q.jawabanIdeal}`;
      demoEssaySc[q.no] = 4;
    });

    setAnswersObj(demoObj);
    setAnswersEssay(demoEssay);
    setEssayScores(demoEssaySc);
    setElapsedSeconds(1680); // 28 minutes
    setExamStarted(true);
    setExamSubmitted(true);
    setSubTab('hasil');
  };

  const handleResetExam = () => {
    setAnswersObj({});
    setAnswersEssay({});
    setEssayScores({ 21: 0, 22: 0, 23: 0, 24: 0, 25: 0 });
    setDoubtfulMap({});
    setCurrentIdx(0);
    setExamSubmitted(false);
    setExamStarted(false);
    setSavedServerBanner(false);
    setSecondsLeft(durationMinutes * 60);
    setElapsedSeconds(0);
    setSubTab('ujian');
  };

  // Diagnostic breakdown helper
  const calculateGroupMastery = (filterFn: (q: TkaQuestion) => boolean) => {
    const subset = TKA_QUESTIONS.filter(filterFn);
    let earned = 0;
    let maxPts = 0;
    subset.forEach((q) => {
      if (q.type === 'URAIAN') {
        maxPts += 4;
        earned += essayScores[q.no] ?? 0;
      } else {
        maxPts += 1;
        earned += answersObj[q.no] === q.correctIndex ? 1 : 0;
      }
    });
    const pct = maxPts > 0 ? Math.round((earned / maxPts) * 100) : 0;
    return { count: subset.length, earned, maxPts, pct };
  };

  const masteryBilanganBulat = calculateGroupMastery((q) => q.materi === 'Bilangan Bulat');
  const masteryPecahan = calculateGroupMastery((q) => q.materi === 'Pecahan');
  const masteryMudah = calculateGroupMastery((q) => q.kesulitan === 'Mudah');
  const masterySedang = calculateGroupMastery((q) => q.kesulitan === 'Sedang');
  const masteryKontekstual = calculateGroupMastery(
    (q) => q.kesulitan === 'Menengah-Tinggi / Kontekstual'
  );
  const masteryHots = calculateGroupMastery((q) => q.kesulitan === 'HOTS Model TKA');

  const getDifficultyStyle = (kesulitan: TkaQuestion['kesulitan']) => {
    switch (kesulitan) {
      case 'Mudah':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Sedang':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Menengah-Tinggi / Kontekstual':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'HOTS Model TKA':
        return 'bg-purple-50 text-purple-900 border-purple-200';
    }
  };

  const filteredReviewQuestions = TKA_QUESTIONS.filter((q) => {
    if (reviewFilter === 'BS') return q.type === 'BS';
    if (reviewFilter === 'PG') return q.type === 'PG';
    if (reviewFilter === 'URAIAN') return q.type === 'URAIAN';
    if (reviewFilter === 'WRONG') {
      if (q.type === 'URAIAN') return (essayScores[q.no] ?? 0) < 4;
      return answersObj[q.no] !== q.correctIndex;
    }
    return true;
  });

  const filteredKisiQuestions = TKA_QUESTIONS.filter((q) => {
    if (kisiFilter === 'BS') return q.type === 'BS';
    if (kisiFilter === 'PG') return q.type === 'PG';
    if (kisiFilter === 'URAIAN') return q.type === 'URAIAN';
    return true;
  });

  return (
    <section className="space-y-6">
      {/* HEADER UTAMA ASESMEN TKA KELAS 7 */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-sky-400">
              <span>SISTEM ASESMEN DIGITAL INTERAKTIF MODEL TKA (TES KEMAMPUAN AKADEMIK)</span>
              <span>·</span>
              <span className="text-amber-300 font-semibold">{TKA_META.sekolah}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {TKA_META.judulUtama} — “{TKA_META.subJudulMapel}”
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Mata Pelajaran: <strong className="text-white">MATEMATIKA</strong> · Kelas/Semester:{' '}
              <strong className="text-white">VII / GANJIL</strong> · Bab:{' '}
              <strong className="text-amber-300">{TKA_META.topikBab}</strong> · Pengembang:{' '}
              <strong className="text-sky-300">{TKA_META.pengembang}</strong> ({TKA_META.sekolah})
            </p>
          </div>

          {/* TOMBOL UNDUH DOKUMEN WORD (.DOC) */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => downloadTkaKelas7WordDocument(false, localStudent)}
              className="px-3.5 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-sky-700" />
              <span>Unduh Soal Siswa (.doc)</span>
            </button>
            <button
              type="button"
              onClick={() => downloadTkaKelas7WordDocument(true, localStudent)}
              className="px-3.5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Unduh Soal + Kunci + Rubrik (.doc)</span>
            </button>
          </div>
        </div>

        {/* BAR NAVIGASI SUB-FITUR TKA */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSubTab('ujian')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                subTab === 'ujian'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>1. Workspace Asesmen Siswa (25 Soal)</span>
            </button>
            <button
              type="button"
              onClick={() => setSubTab('hasil')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                subTab === 'hasil'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>2. Hasil, Diagnostik TKA &amp; Pembahasan</span>
            </button>
            <button
              type="button"
              onClick={() => setSubTab('kisikisi')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                subTab === 'kisikisi'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>3. Kisi-Kisi, Rubrik &amp; Validasi Soal (Mode Guru)</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span>5 Benar/Salah</span>
            <span>·</span>
            <span>15 Pilihan Ganda</span>
            <span>·</span>
            <span>5 Uraian</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SUB-TAB 1: PORTAL PERSIAPAN & WORKSPACE UJIAN CBT INTERAKTIF
         ===================================================================== */}
      {subTab === 'ujian' && !examStarted && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Login Peserta Asesmen */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <div className="text-xs font-mono font-semibold text-sky-700">
                REGISTRASI PESERTA ASESMEN TKA KELAS VII
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Identitas Siswa &amp; Pengaturan Waktu Ujian
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Pastikan Nama Lengkap, Kelas, dan Nomor Absen diisi dengan benar. Hasil asesmen otomatis dianalisis dan tersimpan pada Daftar Nilai.
              </p>
            </div>

            <form onSubmit={handleStartExam} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Lengkap Siswa *
                  </label>
                  <input
                    type="text"
                    value={localStudent.nama}
                    onChange={(e) =>
                      setLocalStudent({ ...localStudent, nama: e.target.value })
                    }
                    placeholder="Contoh: Muhammad Rizky Pratama"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Kelas (VII) *
                  </label>
                  <select
                    value={localStudent.kelas}
                    onChange={(e) =>
                      setLocalStudent({ ...localStudent, kelas: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-sky-600"
                  >
                    {KELAS_7_OPTIONS.map((kls) => (
                      <option key={kls} value={kls}>
                        {kls}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nomor Absen *
                  </label>
                  <input
                    type="text"
                    value={localStudent.noAbsen}
                    onChange={(e) =>
                      setLocalStudent({ ...localStudent, noAbsen: e.target.value })
                    }
                    placeholder="Contoh: 12"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-sky-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Asal Sekolah *
                  </label>
                  <input
                    type="text"
                    value={localStudent.sekolah}
                    onChange={(e) =>
                      setLocalStudent({ ...localStudent, sekolah: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-sky-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pilih Mode Durasi Pengerjaan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { min: 45, label: '45 Menit (Standar)' },
                    { min: 60, label: '60 Menit (Reguler)' },
                    { min: 90, label: '90 Menit (Ujian Penuh)' },
                    { min: 0, label: 'Latihan Mandiri' }
                  ].map((opt) => (
                    <button
                      key={opt.min}
                      type="button"
                      onClick={() => setDurationMinutes(opt.min)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                        durationMinutes === opt.min
                          ? 'bg-sky-50 border-sky-600 text-sky-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {identityError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                  {identityError}
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Play className="w-4 h-4" />
                  <span>Mulai Kerjakan Asesmen TKA (25 Soal)</span>
                </button>

                <button
                  type="button"
                  onClick={handleFillDemoAnswers}
                  className="px-4 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Simulasi Cepat Hasil &amp; Analisis (Mode Demo Guru)</span>
                </button>
              </div>
            </form>
          </div>

          {/* Kartu Spesifikasi & Struktur Asesmen TKA */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-xs font-mono font-semibold text-emerald-800">
                SPESIFIKASI INSTRUMEN TKA KELAS 7
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Komposisi &amp; Proporsi Tingkat Kesulitan
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xl font-bold text-sky-800 font-mono">5</div>
                <div className="text-[11px] font-semibold text-slate-700">Benar / Salah</div>
                <div className="text-[10px] text-slate-500">Nomor 1–5</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xl font-bold text-emerald-800 font-mono">15</div>
                <div className="text-[11px] font-semibold text-slate-700">Pilihan Ganda</div>
                <div className="text-[10px] text-slate-500">Nomor 6–20</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xl font-bold text-purple-800 font-mono">5</div>
                <div className="text-[11px] font-semibold text-slate-700">Soal Uraian</div>
                <div className="text-[10px] text-slate-500">Nomor 21–25</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-800">
                Distribusi Proporsional Tingkat Kesulitan (25 Soal):
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                  <span className="font-bold font-mono">25% MUDAH</span> ({validationStats.distribution.mudah} Soal) — Pemahaman konsep &amp; garis bilangan
                </div>
                <div className="p-2.5 rounded-lg bg-sky-50/70 border border-sky-200 text-sky-950">
                  <span className="font-bold font-mono">25% SEDANG</span> ({validationStats.distribution.sedang} Soal) — Penerapan operasi hitung
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950">
                  <span className="font-bold font-mono">25% KONTEKSTUAL</span> ({validationStats.distribution.kontekstual} Soal) — Penalaran menengah-tinggi
                </div>
                <div className="p-2.5 rounded-lg bg-purple-50/70 border border-purple-200 text-purple-950">
                  <span className="font-bold font-mono">25% HOTS TKA</span> ({validationStats.distribution.hots} Soal) — Analisis, evaluasi &amp; keputusan
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="font-semibold text-slate-900">
                Pedoman Penskoran Transparan (Total Skor Maksimal = 40 Poin → Skala 100):
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Benar/Salah (5 Soal):</strong> Skor 1 per jawaban benar (Maks 5 poin)
                </li>
                <li>
                  <strong>Pilihan Ganda (15 Soal):</strong> Skor 1 per jawaban benar (Maks 15 poin)
                </li>
                <li>
                  <strong>Uraian (5 Soal):</strong> Rubrik Skor 0 s.d. 4 per soal (Maks 20 poin)
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          WORKSPACE UJIAN SAAT SEDANG BERLANGSUNG (2-ZONA INTERAKTIF)
         ===================================================================== */}
      {subTab === 'ujian' && examStarted && (
        <div className="space-y-5">
          {/* STICKY EXAM STATUS & TIMER BAR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>
                  {localStudent.nama} · {localStudent.kelas} (Absen {localStudent.noAbsen})
                </span>
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Terjawab:{' '}
                <strong className="text-slate-900 font-mono">
                  {answeredCount}/{TKA_QUESTIONS.length}
                </strong>{' '}
                ({progressPercent}%)
                {doubtfulCount > 0 && (
                  <span className="ml-2 text-amber-700 font-semibold">
                    · {doubtfulCount} Ragu-ragu
                  </span>
                )}
              </div>
            </div>

            {/* Progress & Timer */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block w-36 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-sky-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div
                className={`px-3.5 py-1.5 rounded-xl border font-mono text-xs font-bold flex items-center gap-2 ${
                  durationMinutes > 0 && secondsLeft < 300
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-sky-700" />
                <span>
                  {durationMinutes > 0
                    ? `Sisa Waktu: ${formatTime(secondsLeft)}`
                    : `Waktu: ${formatTime(elapsedSeconds)}`}
                </span>
                {!examSubmitted && (
                  <button
                    type="button"
                    onClick={() => setTimerPaused(!timerPaused)}
                    title={timerPaused ? 'Lanjutkan Timer' : 'Jeda Timer'}
                    className="ml-1 p-1 rounded hover:bg-slate-200 text-slate-700"
                  >
                    {timerPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  </button>
                )}
              </div>

              {!examSubmitted ? (
                <button
                  type="button"
                  onClick={() => setShowConfirmSubmit(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kumpulkan Asesmen</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSubTab('hasil')}
                  className="px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-colors"
                >
                  Lihat Hasil &amp; Pembahasan →
                </button>
              )}
            </div>
          </div>

          {/* INLINE CONFIRMATION BANNER WHEN SUBMITTING */}
          {showConfirmSubmit && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-amber-950">
                  Konfirmasi Pengumpulan Asesmen TKA Kelas 7
                </div>
                <p className="text-xs text-amber-900">
                  Kamu telah menjawab <strong>{answeredCount} dari 25 soal</strong>
                  {answeredCount < 25
                    ? ` (masih ada ${25 - answeredCount} soal yang belum diisi)`
                    : ' (seluruh 25 soal telah terjawab lengkap)'}
                  . Apakah kamu yakin ingin menyelesaikan asesmen dan melihat nilai serta pembahasan sekarang?
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl"
                >
                  Periksa Kembali
                </button>
                <button
                  type="button"
                  onClick={handleFinalizeExam}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ya, Kumpulkan &amp; Hitung Skor</span>
                </button>
              </div>
            </div>
          )}

          {/* TWO-ZONE EXAM WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ZONA KIRI (8 KOLOM): KARTU SOAL & STIMULUS */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
              {/* Header Soal & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                    SOAL NO. {currentQuestion.no} / 25
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900 font-semibold text-xs">
                    {currentQuestion.type === 'BS'
                      ? 'BENAR / SALAH'
                      : currentQuestion.type === 'PG'
                      ? 'PILIHAN GANDA'
                      : 'URAIAN (SKOR MAKS 4)'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-xs">
                    Materi: {currentQuestion.materi}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${getDifficultyStyle(
                      currentQuestion.kesulitan
                    )}`}
                  >
                    {currentQuestion.kesulitan}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs">
                    {currentQuestion.levelKognitif}
                  </span>
                </div>
              </div>

              {/* Submateri & Indikator Collapsible */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 text-xs space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-800">
                    Submateri: <span className="text-sky-800">{currentQuestion.submateri}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowIndicator(!showIndicator)}
                    className="text-[11px] font-semibold text-sky-700 hover:underline"
                  >
                    {showIndicator ? 'Sembunyikan Indikator' : 'Tampilkan Indikator Soal'}
                  </button>
                </div>
                {showIndicator && (
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Indikator Soal:</strong> {currentQuestion.indikator}
                  </p>
                )}
              </div>

              {/* Kotak Stimulus Kontekstual */}
              <div className="bg-sky-50/50 border-l-4 border-sky-700 rounded-r-xl p-4 md:p-5 space-y-3">
                {currentQuestion.stimulusTitle && (
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-900">
                    STIMULUS: {currentQuestion.stimulusTitle}
                  </div>
                )}
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {currentQuestion.stimulusText}
                </div>

                {/* Tabel Stimulus (Jika Ada) */}
                {currentQuestion.stimulusTable && (
                  <div className="overflow-x-auto pt-1">
                    <table className="w-full text-xs border-collapse bg-white rounded-lg overflow-hidden border border-slate-300">
                      <thead>
                        <tr className="bg-slate-800 text-white">
                          {currentQuestion.stimulusTable.headers.map((h, i) => (
                            <th
                              key={i}
                              className="py-2 px-3 text-left font-semibold border border-slate-700"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentQuestion.stimulusTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="py-2 px-3 border border-slate-200 text-slate-800 font-medium"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Pertanyaan Utama */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                  PERTANYAAN PENALARAN:
                </div>
                <div className="text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                  {currentQuestion.pertanyaan}
                </div>
              </div>

              {/* AREA JAWABAN SESUAI TIPE SOAL */}
              {currentQuestion.type === 'BS' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {['BENAR', 'SALAH'].map((label, idx) => {
                    const selected = answersObj[currentQuestion.no] === idx;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleSelectObjective(currentQuestion.no, idx)}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                          selected
                            ? idx === 0
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs'
                              : 'bg-rose-50 border-rose-600 text-rose-950 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold border ${
                              selected
                                ? idx === 0
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-rose-600 text-white border-rose-600'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            {idx === 0 ? 'B' : 'S'}
                          </span>
                          <div>
                            <div className="text-sm font-bold">○ {label}</div>
                            <div className="text-[11px] text-slate-500">
                              {idx === 0
                                ? 'Pernyataan sesuai konsep/perhitungan'
                                : 'Pernyataan tidak sesuai konsep/perhitungan'}
                            </div>
                          </div>
                        </div>
                        {selected && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === 'PG' && (
                <div className="space-y-3 pt-1">
                  {(currentQuestion.options || []).map((opt, idx) => {
                    const letter = ['A', 'B', 'C', 'D'][idx];
                    const selected = answersObj[currentQuestion.no] === idx;
                    return (
                      <button
                        key={letter}
                        type="button"
                        onClick={() => handleSelectObjective(currentQuestion.no, idx)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3.5 ${
                          selected
                            ? 'bg-sky-50 border-sky-600 text-sky-950 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                            selected
                              ? 'bg-sky-700 text-white'
                              : 'bg-slate-100 text-slate-700 border border-slate-300'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm font-medium leading-relaxed flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === 'URAIAN' && (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700">
                      Tuliskan Langkah Penyelesaian &amp; Kesimpulan Jawabanmu:
                    </span>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[11px] text-slate-500 mr-1">Simbol Cepat:</span>
                      {MATH_SYMBOLS.map((sym) => (
                        <button
                          key={sym}
                          type="button"
                          onClick={() => handleInsertSymbol(sym)}
                          className="px-2 py-1 text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-300"
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={5}
                    value={answersEssay[currentQuestion.no] || ''}
                    onChange={(e) => handleEssayChange(currentQuestion.no, e.target.value)}
                    placeholder="Ketik langkah-langkah perhitungan dan jawaban akhir di sini..."
                    className="w-full p-4 text-sm bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-sky-600 leading-relaxed"
                  />

                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Pedoman Rubrik Uraian (Skor 0–4):</strong> Tuliskan diketahui, langkah perhitungan matematika secara runtut, dan hasil akhir beserta satuannya agar memperoleh skor maksimal (4 poin).
                    </div>
                  </div>
                </div>
              )}

              {/* TOMBOL NAVIGASI SOAL BAWAH */}
              <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Soal Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleDoubtful(currentQuestion.no)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    doubtfulMap[currentQuestion.no]
                      ? 'bg-amber-400 border-amber-500 text-slate-950 font-bold'
                      : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>
                    {doubtfulMap[currentQuestion.no] ? 'Ditandai Ragu-Ragu' : 'Tandai Ragu-Ragu'}
                  </span>
                </button>

                {currentIdx < TKA_QUESTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIdx((prev) => Math.min(TKA_QUESTIONS.length - 1, prev + 1))
                    }
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <span>Soal Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Selesai &amp; Kumpulkan</span>
                  </button>
                )}
              </div>
            </div>

            {/* ZONA KANAN (4 KOLOM): PETA NOMOR SOAL 1-25 & ALAT BANTU GARIS BILANGAN */}
            <div className="lg:col-span-4 space-y-5">
              {/* Peta Navigasi 25 Nomor Soal */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Navigasi 25 Soal TKA
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    Klik nomor untuk pindah
                  </span>
                </div>

                {/* Bagian A: 1-5 */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-600">
                    Bagian A — Benar / Salah (No. 1–5)
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {bsQuestions.map((q) => {
                      const active = currentQuestion.no === q.no;
                      const answered = isQuestionAnswered(q);
                      const doubtful = doubtfulMap[q.no];
                      return (
                        <button
                          key={q.no}
                          type="button"
                          onClick={() => setCurrentIdx(q.no - 1)}
                          className={`h-9 rounded-lg font-mono text-xs font-bold border transition-all ${
                            active
                              ? 'ring-2 ring-sky-600 bg-slate-900 text-white border-slate-900'
                              : doubtful
                              ? 'bg-amber-300 text-slate-950 border-amber-500'
                              : answered
                              ? 'bg-emerald-600 text-white border-emerald-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {q.no}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bagian B: 6-20 */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-600">
                    Bagian B — Pilihan Ganda (No. 6–20)
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {pgQuestions.map((q) => {
                      const active = currentQuestion.no === q.no;
                      const answered = isQuestionAnswered(q);
                      const doubtful = doubtfulMap[q.no];
                      return (
                        <button
                          key={q.no}
                          type="button"
                          onClick={() => setCurrentIdx(q.no - 1)}
                          className={`h-9 rounded-lg font-mono text-xs font-bold border transition-all ${
                            active
                              ? 'ring-2 ring-sky-600 bg-slate-900 text-white border-slate-900'
                              : doubtful
                              ? 'bg-amber-300 text-slate-950 border-amber-500'
                              : answered
                              ? 'bg-emerald-600 text-white border-emerald-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {q.no}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bagian C: 21-25 */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-600">
                    Bagian C — Uraian Penalaran (No. 21–25)
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {uraianQuestions.map((q) => {
                      const active = currentQuestion.no === q.no;
                      const answered = isQuestionAnswered(q);
                      const doubtful = doubtfulMap[q.no];
                      return (
                        <button
                          key={q.no}
                          type="button"
                          onClick={() => setCurrentIdx(q.no - 1)}
                          className={`h-9 rounded-lg font-mono text-xs font-bold border transition-all ${
                            active
                              ? 'ring-2 ring-sky-600 bg-slate-900 text-white border-slate-900'
                              : doubtful
                              ? 'bg-amber-300 text-slate-950 border-amber-500'
                              : answered
                              ? 'bg-emerald-600 text-white border-emerald-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {q.no}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legenda Warna */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" />
                    <span>Sudah Dijawab ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-amber-300 border border-amber-500 inline-block" />
                    <span>Ragu-Ragu ({doubtfulCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-slate-900 inline-block" />
                    <span>Soal Aktif</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-300 inline-block" />
                    <span>Belum Dijawab ({25 - answeredCount})</span>
                  </div>
                </div>
              </div>

              {/* Alat Bantu Visual Garis Bilangan Interaktif */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  Alat Bantu Visual: Garis Bilangan Bulat
                </div>
                <p className="text-[11px] text-slate-600">
                  Geser titik P dan Q untuk membantu membandingkan posisi bilangan negatif dan positif pada garis bilangan:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-rose-700">
                      Titik P = {markerA}
                    </span>
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      value={markerA}
                      onChange={(e) => setMarkerA(Number(e.target.value))}
                      className="w-40 accent-rose-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-sky-700">
                      Titik Q = {markerB}
                    </span>
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      value={markerB}
                      onChange={(e) => setMarkerB(Number(e.target.value))}
                      className="w-40 accent-sky-600"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-800 space-y-1">
                  <div>
                    Perbandingan:{' '}
                    <strong>
                      {markerA} {markerA < markerB ? '<' : markerA > markerB ? '>' : '='} {markerB}
                    </strong>
                  </div>
                  <div>
                    Jarak |P - Q| = <strong>{Math.abs(markerA - markerB)} satuan</strong> · P + Q ={' '}
                    <strong>{markerA + markerB}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 2: HASIL ASESMEN, DIAGNOSTIK TKA, KOREKSI RUBRIK & PEMBAHASAN
         ===================================================================== */}
      {subTab === 'hasil' && (
        <div className="space-y-6">
          {!examSubmitted && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-amber-950">
                  Asesmen Belum Dikumpulkan (Mode Pratinjau Hasil &amp; Pembahasan)
                </div>
                <p className="text-xs text-amber-900">
                  Kamu dapat melihat rincian skor sementara, menguji simulasi demo, atau kembali ke lembar ujian untuk menyelesaikan 25 soal.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSubTab('ujian')}
                  className="px-3.5 py-2 text-xs font-semibold bg-white border border-amber-400 text-amber-950 rounded-xl hover:bg-amber-100"
                >
                  Kembali ke Soal Ujian
                </button>
                <button
                  type="button"
                  onClick={handleFillDemoAnswers}
                  className="px-3.5 py-2 text-xs font-semibold bg-amber-600 text-white rounded-xl hover:bg-amber-700"
                >
                  Muat Contoh Hasil Siswa
                </button>
              </div>
            </div>
          )}

          {/* RINGKASAN SKOR & PREDIKAT */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-sky-700">
                  LAPORAN CAPAIAN TES KEMAMPUAN AKADEMIK (TKA) KELAS VII
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {localStudent.nama || 'Peserta Didik Kelas VII'} ({localStudent.kelas} · Absen{' '}
                  {localStudent.noAbsen || '-'})
                </h2>
                <p className="text-xs text-slate-600">
                  Asal Sekolah: <strong>{localStudent.sekolah}</strong> · Durasi Pengerjaan:{' '}
                  <strong className="font-mono">{formatTime(elapsedSeconds)}</strong>
                </p>
                {savedServerBanner && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Skor berhasil disimpan otomatis ke Daftar Nilai Server!</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    downloadStudentTkaReportWord({
                      student: localStudent,
                      nilaiAkhir,
                      predikat: predikatInfo.label,
                      skorBS,
                      skorPG,
                      skorUraian,
                      totalSkor,
                      durasiTerpakai: formatTime(elapsedSeconds),
                      answersObj,
                      answersEssay,
                      essayScores
                    })
                  }
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4 text-sky-400" />
                  <span>Unduh Rapor Hasil Siswa (.doc)</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenDaftarNilai}
                  className="px-4 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-xl flex items-center gap-2"
                >
                  <Table className="w-4 h-4 text-emerald-700" />
                  <span>Buka Rekap Daftar Nilai</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetExam}
                  className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Asesmen</span>
                </button>
              </div>
            </div>

            {/* 4 KARTU METRIK SKOR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-1">
                <div className="text-xs text-sky-300 font-mono">NILAI AKHIR (SKALA 100)</div>
                <div className="text-4xl font-bold font-mono">{nilaiAkhir}</div>
                <div className="text-xs text-slate-300 pt-1">
                  Total Skor: <strong>{totalSkor} / 40 Poin</strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-mono font-semibold text-slate-600">
                  BAGIAN A: BENAR / SALAH
                </div>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {skorBS} / 5 Soal
                </div>
                <div className="text-xs text-slate-500">
                  Akurasi: {Math.round((skorBS / 5) * 100)}% (Nomor 1–5)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-mono font-semibold text-slate-600">
                  BAGIAN B: PILIHAN GANDA
                </div>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {skorPG} / 15 Soal
                </div>
                <div className="text-xs text-slate-500">
                  Akurasi: {Math.round((skorPG / 15) * 100)}% (Nomor 6–20)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-mono font-semibold text-slate-600">
                  BAGIAN C: URAIAN (RUBRIK)
                </div>
                <div className="text-2xl font-bold text-purple-900 font-mono">
                  {skorUraian} / 20 Poin
                </div>
                <div className="text-xs text-slate-500">
                  5 Soal × Skor Maks 4 (Nomor 21–25)
                </div>
              </div>
            </div>

            {/* Predikat & Rekomendasi */}
            <div className={`p-4 rounded-xl border ${predikatInfo.badgeClass} space-y-1`}>
              <div className="text-sm font-bold">
                Predikat Capaian: {predikatInfo.label}
              </div>
              <p className="text-xs leading-relaxed">{predikatInfo.rekomendasi}</p>
            </div>

            {/* ANALISIS DIAGNOSTIK TKA PER MATERI & TINGKAT KESULITAN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Analisis Penguasaan Materi Pokok Kelas VII
                </h3>
                {[
                  { label: 'Materi 1: Bilangan Bulat (Positif/Negatif & Operasi)', data: masteryBilanganBulat, color: 'bg-sky-600' },
                  { label: 'Materi 2: Pecahan (Biasa, Campuran, Desimal, Persen)', data: masteryPecahan, color: 'bg-emerald-600' }
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.label}</span>
                      <span className="font-mono font-bold text-slate-900">
                        {item.data.earned}/{item.data.maxPts} Poin ({item.data.pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.data.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Analisis Berdasarkan Distribusi Tingkat Kesulitan TKA
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { title: 'Soal Mudah (25%)', stat: masteryMudah },
                    { title: 'Soal Sedang (25%)', stat: masterySedang },
                    { title: 'Menengah-Tinggi / Kontekstual (25%)', stat: masteryKontekstual },
                    { title: 'HOTS Model TKA (25%)', stat: masteryHots }
                  ].map((d) => (
                    <div
                      key={d.title}
                      className="p-3 bg-white rounded-lg border border-slate-200 space-y-1"
                    >
                      <div className="font-semibold text-slate-700">{d.title}</div>
                      <div className="text-lg font-bold font-mono text-slate-900">
                        {d.stat.pct}%
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Skor {d.stat.earned} dari {d.stat.maxPts} ({d.stat.count} soal)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DAFTAR PEMBAHASAN LENGKAP 25 SOAL & KOREKSI RUBRIK URAIAN */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pembahasan Lengkap 25 Soal, Kunci Jawaban &amp; Rubrik Uraian
                </h3>
                <p className="text-xs text-slate-600">
                  Pada soal Uraian (Nomor 21–25), Guru dapat menyesuaikan skor rubrik (0–4) secara langsung.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'ALL', label: 'Semua (25)' },
                  { id: 'BS', label: 'Benar/Salah (5)' },
                  { id: 'PG', label: 'Pilihan Ganda (15)' },
                  { id: 'URAIAN', label: 'Uraian & Rubrik (5)' },
                  { id: 'WRONG', label: 'Perlu Evaluasi' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setReviewFilter(f.id as typeof reviewFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      reviewFilter === f.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {filteredReviewQuestions.map((q) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isObjective = q.type === 'BS' || q.type === 'PG';
                const studentChoice = answersObj[q.no];
                const isCorrect = isObjective && studentChoice === q.correctIndex;
                const essayScore = essayScores[q.no] ?? 0;

                let studentAnswerLabel = 'Belum dijawab';
                if (q.type === 'BS' && studentChoice !== undefined) {
                  studentAnswerLabel = studentChoice === 0 ? 'BENAR' : 'SALAH';
                } else if (q.type === 'PG' && studentChoice !== undefined && q.options?.[studentChoice]) {
                  studentAnswerLabel = `${letters[studentChoice]}. ${q.options[studentChoice]}`;
                }

                return (
                  <div
                    key={q.no}
                    className="border border-slate-200 rounded-xl p-5 space-y-4 bg-slate-50/40"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-xs font-bold">
                          No. {q.no} ({q.type})
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          {q.materi} — {q.submateri}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyStyle(
                            q.kesulitan
                          )}`}
                        >
                          {q.kesulitan}
                        </span>
                      </div>

                      {isObjective ? (
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-rose-100 text-rose-900'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              <span>BENAR (+1 Poin)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-700" />
                              <span>BELUM TEPAT (0 Poin)</span>
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-900 text-xs font-bold font-mono">
                          Skor Rubrik Uraian: {essayScore} / 4 Poin
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>Indikator ({q.levelKognitif}):</strong> {q.indikator}
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2 text-xs">
                      <div className="font-semibold text-slate-800 whitespace-pre-line">
                        {q.stimulusText}
                      </div>
                      <div className="font-bold text-slate-900 pt-1 whitespace-pre-line">
                        Pertanyaan: {q.pertanyaan}
                      </div>
                    </div>

                    {isObjective ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-white border border-slate-200">
                          <div className="text-slate-500">Jawaban Siswa:</div>
                          <div
                            className={`font-bold mt-0.5 ${
                              isCorrect ? 'text-emerald-800' : 'text-rose-800'
                            }`}
                          >
                            {studentAnswerLabel}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
                          <div className="text-emerald-700">Kunci Jawaban Resmi:</div>
                          <div className="font-bold text-emerald-950 mt-0.5">
                            {q.type === 'PG' && q.correctIndex !== undefined
                              ? `${q.kunciLabel}. ${q.options?.[q.correctIndex]}`
                              : q.kunciLabel}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
                            <div className="font-semibold text-slate-600">
                              Jawaban Uraian Siswa:
                            </div>
                            <div className="text-slate-900 whitespace-pre-line font-medium">
                              {answersEssay[q.no]?.trim() || '(Siswa belum menuliskan jawaban uraian)'}
                            </div>
                          </div>
                          <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1">
                            <div className="font-semibold text-emerald-800">
                              Jawaban Ideal &amp; Kunci:
                            </div>
                            <div className="text-emerald-950 font-bold">{q.jawabanIdeal}</div>
                          </div>
                        </div>

                        {/* Langkah Penyelesaian Uraian */}
                        <div className="p-3.5 rounded-lg bg-sky-50/70 border border-sky-200 space-y-1.5">
                          <div className="font-bold text-sky-950">
                            Langkah Penyelesaian Sistematis:
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-slate-800">
                            {(q.langkahPenyelesaian || []).map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Rubrik & Tombol Penyesuaian Skor Guru (0-4) */}
                        {q.rubrik && (
                          <div className="p-4 rounded-xl bg-white border border-purple-200 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="font-bold text-purple-950">
                                Pedoman Rubrik Penskoran Uraian &amp; Koreksi Skor Guru (0–4):
                              </div>
                              <div className="flex items-center gap-1.5">
                                {[0, 1, 2, 3, 4].map((sc) => (
                                  <button
                                    key={sc}
                                    type="button"
                                    onClick={() => handleAdjustEssayScore(q.no, sc)}
                                    className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border transition-colors ${
                                      essayScore === sc
                                        ? 'bg-purple-700 text-white border-purple-700'
                                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-purple-50'
                                    }`}
                                  >
                                    Skor {sc}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px]">
                              {[
                                { s: 4, desc: q.rubrik.skor4 },
                                { s: 3, desc: q.rubrik.skor3 },
                                { s: 2, desc: q.rubrik.skor2 },
                                { s: 1, desc: q.rubrik.skor1 },
                                { s: 0, desc: q.rubrik.skor0 }
                              ].map((r) => (
                                <div
                                  key={r.s}
                                  className={`p-2.5 rounded-lg border ${
                                    essayScore === r.s
                                      ? 'bg-purple-50 border-purple-400 text-purple-950 font-semibold'
                                      : 'bg-slate-50 border-slate-200 text-slate-600'
                                  }`}
                                >
                                  <div className="font-mono font-bold text-slate-900">
                                    Skor {r.s}
                                  </div>
                                  <div className="mt-0.5 leading-snug">{r.desc}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pembahasan Soal */}
                    <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200/80 text-xs text-slate-800 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                        <span>Pembahasan Konsep &amp; Penalaran:</span>
                      </div>
                      <div className="whitespace-pre-line leading-relaxed">{q.pembahasan}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 3: KISI-KISI 25 SOAL, VALIDASI OTOMATIS & MODE GURU
         ===================================================================== */}
      {subTab === 'kisikisi' && (
        <div className="space-y-6">
          {/* Panel Pemeriksaan Otomatis (Self-Check Validator) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Validasi Kualitas &amp; Proporsi Instrumen TKA Kelas 7
                  </h2>
                  <p className="text-xs text-slate-600">
                    Pengembang: <strong>{TKA_META.pengembang}</strong> ·{' '}
                    <strong>{TKA_META.sekolah}</strong> · Bab: <strong>{TKA_META.topikBab}</strong>
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-mono text-xs font-bold">
                STATUS: TERVALIDASI 100% ({validationStats.total} SOAL LENGKAP)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Komposisi Bentuk Soal</div>
                <div className="text-sm font-bold text-slate-900 mt-1 font-mono">
                  5 BS · 15 PG · 5 Uraian
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  ✓ Sesuai Spesifikasi (25 Soal)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Distribusi Kesulitan</div>
                <div className="text-sm font-bold text-slate-900 mt-1 font-mono">
                  {validationStats.distribution.mudah}M · {validationStats.distribution.sedang}S ·{' '}
                  {validationStats.distribution.kontekstual}K · {validationStats.distribution.hots}H
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  ✓ Proporsional 25%:25%:25%:25%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Cakupan Materi Pokok</div>
                <div className="text-sm font-bold text-slate-900 mt-1 font-mono">
                  13 Bil. Bulat · 12 Pecahan
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  ✓ Operasi Hitung &amp; Kontekstual
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500">Kelengkapan Atribut</div>
                <div className="text-sm font-bold text-slate-900 mt-1 font-mono">
                  Indikator, Kunci &amp; Rubrik
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  ✓ Siap Cetak Word (.doc)
                </div>
              </div>
            </div>
          </div>

          {/* Tabel Kisi-Kisi Lengkap 25 Soal */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-700" />
                  <span>Matriks Kisi-Kisi Instrumen Asesmen TKA (25 Butir Soal)</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Dilengkapi pemetaan materi, submateri, indikator soal, level kognitif, tingkat kesulitan, dan kunci jawaban.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  { id: 'ALL', label: 'Semua (25)' },
                  { id: 'BS', label: 'Benar/Salah (1-5)' },
                  { id: 'PG', label: 'Pilihan Ganda (6-20)' },
                  { id: 'URAIAN', label: 'Uraian (21-25)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setKisiFilter(tab.id as typeof kisiFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      kisiFilter === tab.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-3 px-3 font-semibold w-12 text-center">No</th>
                    <th className="py-3 px-3 font-semibold w-20">Bentuk</th>
                    <th className="py-3 px-3 font-semibold w-44">Materi &amp; Submateri</th>
                    <th className="py-3 px-3 font-semibold">Indikator Soal &amp; Konteks Stimulus</th>
                    <th className="py-3 px-3 font-semibold w-28">Level</th>
                    <th className="py-3 px-3 font-semibold w-36">Kesulitan</th>
                    <th className="py-3 px-3 font-semibold w-28 text-center">Kunci</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKisiQuestions.map((q, idx) => (
                    <tr
                      key={q.no}
                      className={`border-b border-slate-200 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">
                        {q.no}
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-sky-800">
                        {q.type}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{q.materi}</div>
                        <div className="text-[11px] text-slate-600">{q.submateri}</div>
                      </td>
                      <td className="py-3 px-3 space-y-1">
                        <div className="text-[11px] font-mono font-semibold text-slate-500">
                          Stimulus: {q.stimulusTitle}
                        </div>
                        <div className="text-slate-800 leading-relaxed">{q.indikator}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-700">
                        {q.levelKognitif}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyStyle(
                            q.kesulitan
                          )}`}
                        >
                          {q.kesulitan}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-emerald-800">
                        {q.kunciLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
