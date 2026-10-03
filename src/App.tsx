import React, { useEffect, useState } from 'react';
import {
  APP_CONFIG,
  CLASS_OPTIONS,
  CRITICAL_THINKING_INDICATORS
} from './data/emodulContent';
import { RPM_BILANGAN_BULAT, RPM_RELASI_FUNGSI } from './data/rpmContent';
import { TKA_META } from './data/tkaKelas7Data';
import { ScoreRecord, StudentIdentity } from './types';
import {
  downloadQuestionsAndSolutionsWord,
  downloadRpmWordDocument,
  downloadTkaKelas7WordDocument
} from './utils/wordExport';
import { InteractiveSimulations } from './components/InteractiveSimulations';
import { PblModuleView } from './components/PblModuleView';
import { DetectiveGameView } from './components/DetectiveGameView';
import { DaftarNilaiView } from './components/DaftarNilaiView';
import { CinematicVideoPlayer } from './components/CinematicVideoPlayer';
import { RpmDeepLearningView } from './components/RpmDeepLearningView';
import { BankSoalView } from './components/BankSoalView';
import { TkaAssessmentView } from './components/TkaAssessmentView';
import heroBlueprintImg from './assets/images/hero_relasi_fungsi_blueprint_1790401429554.jpg';
import {
  Share2,
  FileDown,
  Table,
  Play,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Film,
  FileCheck2,
  ClipboardList,
  Award
} from 'lucide-react';

type ActiveTab =
  | 'tka'
  | 'beranda'
  | 'soal'
  | 'rpm'
  | 'video'
  | 'materi'
  | 'simulasi'
  | 'game'
  | 'nilai';

export default function App() {
  // Default to 'tka' so the newly requested Asesmen Interaktif Model TKA Kelas 7 opens immediately,
  // while keeping 'beranda' and all other tabs 1-click accessible in the top bar!
  const [activeTab, setActiveTab] = useState<ActiveTab>('tka');

  // Student Identity State matching [Nama, Kelas, No Absen, Sekolah]
  const [student, setStudent] = useState<StudentIdentity>({
    nama: '',
    kelas: 'VII A',
    noAbsen: '',
    sekolah: TKA_META.sekolah
  });

  // Scores & Canva Sheet URL from backend
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [canvaSheetUrl, setCanvaSheetUrl] = useState<string>(
    'https://www.canva.com/sheets/'
  );
  const [identitySavedNotice, setIdentitySavedNotice] = useState<string>('');
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [heroImgError, setHeroImgError] = useState<boolean>(false);

  const getAisPreUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin.includes('ais-dev-')) {
      return window.location.origin.replace('ais-dev-', 'ais-pre-');
    }
    return APP_CONFIG.sharedPreUrl;
  };

  const aisPreUrl = getAisPreUrl();
  const waShareMessage = `Assalamu'alaikum Wr. Wb. Mari kerjakan & pelajari 💻 *ASESMEN INTERAKTIF MODEL TKA MATEMATIKA KELAS 7 (BILANGAN BULAT & PECAHAN - 25 SOAL)* serta 📘 *E-MODUL & RPM MATEMATIKA SMP*.\n\nPengembang: *${TKA_META.pengembang}* (${TKA_META.sekolah} / ${APP_CONFIG.defaultSchool}).\n\nBuka tautan Asesmen TKA, E-Modul, Video 3D & RPM (Mode AIS-PRE):\n${aisPreUrl}`;
  const waShareHref = `https://wa.me/?text=${encodeURIComponent(waShareMessage)}`;

  const fetchScores = async () => {
    try {
      const res = await fetch('/api/scores');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.scores)) {
          setScores(data.scores);
        }
        if (data.canvaSheetUrl) {
          setCanvaSheetUrl(data.canvaSheetUrl);
        }
      }
    } catch (err) {
      console.error('Gagal memuat daftar nilai:', err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSaveScoreToServer = async (
    partial: { skorPbl?: number; skorGame?: number; detailBenar?: string },
    overrideStudent?: StudentIdentity
  ) => {
    const targetStudent = overrideStudent || student;
    if (
      !targetStudent.nama.trim() ||
      !targetStudent.kelas.trim() ||
      !targetStudent.noAbsen.trim() ||
      !targetStudent.sekolah.trim()
    ) {
      return;
    }

    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: targetStudent.nama,
          kelas: targetStudent.kelas,
          noAbsen: targetStudent.noAbsen,
          sekolah: targetStudent.sekolah,
          skorPbl: partial.skorPbl || 0,
          skorGame: partial.skorGame || 0,
          detailBenar: partial.detailBenar || ''
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.store?.scores) {
          setScores(data.store.scores);
        } else {
          await fetchScores();
        }
      }
    } catch (err) {
      console.error('Gagal menyimpan nilai:', err);
    }
  };

  const handleDeleteScore = async (id: string) => {
    try {
      const res = await fetch(`/api/scores/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        if (data.store?.scores) {
          setScores(data.store.scores);
        }
      }
    } catch (err) {
      console.error('Gagal menghapus nilai:', err);
    }
  };

  const handleUpdateCanvaUrl = async (url: string) => {
    try {
      const res = await fetch('/api/config/canva-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ canvaSheetUrl: url })
      });
      if (res.ok) {
        setCanvaSheetUrl(url);
      }
    } catch (err) {
      console.error('Gagal menyimpan URL Canva Sheet:', err);
    }
  };

  const handleCopyShareWa = async () => {
    try {
      await navigator.clipboard.writeText(waShareMessage);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    } catch {
      const input = document.createElement('textarea');
      input.value = waShareMessage;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  const handleIdentityConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student.nama.trim() || !student.noAbsen.trim()) {
      setIdentitySavedNotice(
        'Mohon isi Nama Lengkap dan Nomor Absen terlebih dahulu.'
      );
      return;
    }
    setIdentitySavedNotice(
      `Identitas aktif: [${student.nama}, ${student.kelas}, Absen ${student.noAbsen}, ${student.sekolah}] siap digunakan untuk Asesmen TKA, Game & Daftar Nilai.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* TOP BAR CONTRACT: Strictly 3 Zones (Wordmark — Nav Links — 2 Primary Actions) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 md:px-8 py-3.5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('tka')}
            className="text-base md:text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap text-left"
          >
            Portal TKA &amp; E-Modul Matematika SMP
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('tka')}
              className={`py-1 transition-colors whitespace-nowrap ${
                activeTab === 'tka'
                  ? 'text-sky-700 font-bold underline underline-offset-8 decoration-2'
                  : 'hover:text-slate-900'
              }`}
            >
              Asesmen TKA Kelas 7 (25 Soal)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('beranda')}
              className={`py-1 transition-colors whitespace-nowrap ${
                activeTab === 'beranda'
                  ? 'text-sky-700 underline underline-offset-8 decoration-2'
                  : 'hover:text-slate-900'
              }`}
            >
              Beranda E-Modul
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('soal')}
              className={`py-1 transition-colors whitespace-nowrap ${
                activeTab === 'soal'
                  ? 'text-sky-700 underline underline-offset-8 decoration-2'
                  : 'hover:text-slate-900'
              }`}
            >
              Bank Soal
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rpm')}
              className={`py-1 transition-colors whitespace-nowrap ${
                activeTab === 'rpm'
                  ? 'text-sky-700 underline underline-offset-8 decoration-2'
                  : 'hover:text-slate-900'
              }`}
            >
              RPM Mendalam
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`py-1 transition-colors whitespace-nowrap ${
                activeTab === 'video'
                  ? 'text-sky-700 underline underline-offset-8 decoration-2'
                  : 'hover:text-slate-900'
              }`}
            >
              Video 3D
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('materi')}
              className={`hidden xl:inline-block py-1 transition-colors whitespace-nowrap ${
                activeTab === 'materi'
                  ? 'text-sky-700 underline underline-offset-8 decoration-2'
                  : 'hover:text-slate-900'
              }`}
            >
              Materi &amp; PBL
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('nilai')}
              className={`py-1 transition-colors whitespace-nowrap ${
                activeTab === 'nilai'
                  ? 'text-sky-700 underline underline-offset-8 decoration-2'
                  : 'hover:text-slate-900'
              }`}
            >
              Daftar Nilai ({scores.length})
            </button>
          </nav>

          {/* Zone 3: 2 Primary Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => downloadTkaKelas7WordDocument(true, student)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Unduh TKA Word (.doc)
            </button>
            <a
              href={waShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Share WA (AIS-PRE)
            </a>
          </div>
        </div>

        {/* Mobile Secondary Navigation Strip */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pt-2.5 mt-2.5 border-t border-slate-100 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('tka')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'tka' ? 'bg-sky-600 text-white font-bold' : ''
            }`}
          >
            Asesmen TKA Kelas 7
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('beranda')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'beranda' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            Beranda
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('soal')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'soal' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            Bank Soal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rpm')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'rpm' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            RPM Mendalam
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'video' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            Video 3D
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('materi')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'materi' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            Materi &amp; PBL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulasi')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'simulasi' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            Simulasi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('game')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'game' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            Game Detektif
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nilai')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'nilai' ? 'bg-sky-50 text-sky-800' : ''
            }`}
          >
            Daftar Nilai ({scores.length})
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 md:px-8 py-8 space-y-10">
        {activeTab === 'tka' && (
          <TkaAssessmentView
            student={student}
            onUpdateStudent={setStudent}
            onAssessmentCompleted={async (nilaiAkhir, detailRingkasan, overrideStudent) => {
              await handleSaveScoreToServer(
                { skorGame: nilaiAkhir, detailBenar: detailRingkasan },
                overrideStudent
              );
            }}
            onOpenDaftarNilai={() => setActiveTab('nilai')}
          />
        )}

        {activeTab === 'beranda' && (
          <div className="space-y-10">
            {/* BANNER UTAMA: ASESMEN INTERAKTIF MODEL TKA KELAS 7 (SMPN 2 KARANGBINANGUN) */}
            <section className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-sky-400">
                  FITUR BARU · WEBSITE ASESMEN DIGITAL INTERAKTIF MODEL TKA KELAS 7
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {TKA_META.judulUtama} — “{TKA_META.subJudulMapel}” ({TKA_META.topikBab})
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pengembang: <strong className="text-white">{TKA_META.pengembang}</strong> · Asal Sekolah:{' '}
                  <strong className="text-amber-300">{TKA_META.sekolah}</strong> · Komposisi:{' '}
                  <strong>25 Soal (5 Benar/Salah, 15 Pilihan Ganda, 5 Uraian Rubrik 0–4)</strong> dengan proporsi kesulitan 25% Mudah, 25% Sedang, 25% Menengah-Tinggi/Kontekstual, dan 25% HOTS Model TKA.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('tka')}
                  className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Buka Aplikasi Asesmen TKA Kelas 7</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadTkaKelas7WordDocument(true, student)}
                  className="px-3.5 py-2.5 text-xs font-semibold text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <FileDown className="w-4 h-4 text-sky-400" />
                  <span>Unduh Naskah + Kunci TKA (.doc)</span>
                </button>
              </div>
            </section>

            {/* HERO SECTION */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  {/* Clean Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                    <span className="text-sky-800 font-semibold">
                      Matematika SMP/MTs Kelas VII &amp; VIII
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Problem Based Learning (PBL) &amp; Deep Learning</span>
                    <span aria-hidden="true">·</span>
                    <span>Fokus: Kemampuan Berpikir Kritis</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                    📘 E-MODUL DIGITAL INTERAKTIF: MENGUNGKAP RAHASIA RELASI &amp; FUNGSI
                  </h1>

                  <p className="text-base md:text-lg font-display italic text-slate-700">
                    “Temukan hubungan, buktikan keteraturan, dan pecahkan misterinya!”
                  </p>

                  {/* Developer & School Information */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs text-slate-700">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>
                        Nama Pengembang:{' '}
                        <strong className="text-slate-900 font-semibold">
                          [{APP_CONFIG.developerName}]
                        </strong>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        Instansi:{' '}
                        <strong className="text-slate-900 font-semibold">
                          {TKA_META.sekolah} &amp; {APP_CONFIG.collaboratorInfo}
                        </strong>
                      </span>
                    </div>
                    <p className="text-slate-500">
                      Dilengkapi <strong>Asesmen Interaktif Model TKA Kelas 7 (25 Soal Bilangan Bulat &amp; Pecahan)</strong>, Modul <strong>Rencana Pembelajaran Mendalam (RPM)</strong>, Video Sinematik 3D, Simulator, dan Daftar Nilai Canva Sheet.
                    </p>
                  </div>

                  {/* Primary Navigation CTA + Home Features */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('tka')}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <Award className="w-4 h-4" />
                      <span>Asesmen TKA Kelas 7 (25 Soal)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('soal')}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <ClipboardList className="w-4 h-4" />
                      <span>Bank Soal &amp; Pembahasan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('rpm')}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Modul RPM Mendalam</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('video')}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <Film className="w-4 h-4 text-amber-400" />
                      <span>Video 3D (6 Scene)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('materi')}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <BookOpen className="w-4 h-4 text-sky-700" />
                      <span>Materi &amp; LKPD PBL</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Generated Hero Blueprint Image with Resilient Fallback */}
                <div className="lg:col-span-5">
                  {!heroImgError ? (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-16/9 lg:aspect-4/3 bg-slate-900">
                      <img
                        src={heroBlueprintImg}
                        alt="Visualisasi Pemetaan Relasi dan Fungsi Kelas VIII"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImgError(true)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
                        <div className="text-xs font-mono text-sky-300">
                          f : A → B · f(x) = ax + b
                        </div>
                        <div className="text-sm font-semibold">
                          Eksplorasi Diagram Panah, Cartesius &amp; Mesin Fungsi
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-slate-200 aspect-4/3 bg-slate-900 text-white p-6 flex flex-col justify-between">
                      <div className="font-mono text-xs text-sky-400">
                        MATEMATIKA SMP/MTs KELAS VII &amp; VIII
                      </div>
                      <div className="space-y-2">
                        <div className="text-lg font-semibold">
                          Asesmen TKA Kelas 7 &amp; E-Modul Relasi Fungsi
                        </div>
                        <div className="text-xs text-slate-300 font-mono">
                          Bilangan Bulat &amp; Pecahan · Relasi &amp; Fungsi
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* BANNER SOROTAN MODUL PEMBELAJARAN MENDALAM (RPM) SIAP CETAK WORD */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="text-xs font-mono font-semibold text-emerald-800">
                  PERANGKAT AJAR DEEP LEARNING (MINDFUL · MEANINGFUL · JOYFUL LEARNING)
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Rencana Pembelajaran Mendalam (RPM) Matematika SMP/MTs
                </h2>
                <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                  Tersedia lengkap: (1) <strong>RPM Bab 1: Bilangan Bulat (Kelas VII · 27 JP / 11 Pertemuan)</strong> oleh <strong>Nurul Komariyah, S.Pd. (SMP Negeri 1 Sukorame)</strong> &amp; Kepala Sekolah <strong>Wiwik Pujiati, S.Pd., M.Si.</strong>, serta (2) <strong>RPM Bab Relasi &amp; Fungsi (Kelas VIII)</strong> oleh <strong>NUR WAKHID, S.Pd (SMP Negeri 1 Bantarkawung)</strong>.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('rpm')}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Lihat &amp; Edit Modul RPM</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadRpmWordDocument(RPM_BILANGAN_BULAT)}
                  className="px-3.5 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <FileDown className="w-4 h-4 text-emerald-700" />
                  <span>Unduh RPM Bilangan Bulat (.doc)</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadRpmWordDocument(RPM_RELASI_FUNGSI)}
                  className="px-3.5 py-2.5 text-xs font-semibold text-sky-950 bg-sky-50 border border-sky-300 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <FileDown className="w-4 h-4 text-sky-700" />
                  <span>Unduh RPM Relasi Fungsi (.doc)</span>
                </button>
              </div>
            </section>

            {/* 6-SCENE 3D EDUCATIONAL CINEMATIC VIDEO PLAYER DIRECTLY ON BERANDA */}
            <CinematicVideoPlayer
              onStartMission={() => setActiveTab('materi')}
              onStartGame={() => setActiveTab('game')}
            />

            {/* STRUKTUR (1): HEADER KOLOM ENTRI PENGGUNA GAME [Nama, Kelas, No Absen, Sekolah] */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    (1) Entri Pengguna Game &amp; E-Modul: [Nama, Kelas, No Absen, Sekolah]
                  </h2>
                  <p className="text-xs text-slate-600">
                    Isi identitas Anda pada kolom di bawah ini sebelum mengerjakan Asesmen TKA, LKPD PBL maupun Game Detektif agar skor otomatis tercatat di Daftar Nilai.
                  </p>
                </div>
                <span className="text-xs font-mono text-sky-800 font-semibold">
                  Struktur Kolom: [Nama, Kelas, No Absen, Sekolah]
                </span>
              </div>

              <form onSubmit={handleIdentityConfirm} className="space-y-3">
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs">
                        <th className="py-2.5 px-3.5 font-semibold w-1/4">Nama</th>
                        <th className="py-2.5 px-3.5 font-semibold w-1/5">Kelas</th>
                        <th className="py-2.5 px-3.5 font-semibold w-1/5">No Absen</th>
                        <th className="py-2.5 px-3.5 font-semibold">Sekolah</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-slate-50">
                        <td className="p-2.5 border-r border-slate-200">
                          <input
                            type="text"
                            value={student.nama}
                            onChange={(e) =>
                              setStudent({ ...student, nama: e.target.value })
                            }
                            placeholder="Ketik Nama Lengkap..."
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-600"
                          />
                        </td>
                        <td className="p-2.5 border-r border-slate-200">
                          <select
                            value={student.kelas}
                            onChange={(e) =>
                              setStudent({ ...student, kelas: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-600"
                          >
                            {[
                              'VII A',
                              'VII B',
                              'VII C',
                              'VII D',
                              'VII E',
                              'VII F',
                              ...CLASS_OPTIONS
                            ].map((kls) => (
                              <option key={kls} value={kls}>
                                {kls}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2.5 border-r border-slate-200">
                          <input
                            type="text"
                            value={student.noAbsen}
                            onChange={(e) =>
                              setStudent({ ...student, noAbsen: e.target.value })
                            }
                            placeholder="Nomor Absen (01-40)"
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-600 font-mono"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={student.sekolah}
                            onChange={(e) =>
                              setStudent({ ...student, sekolah: e.target.value })
                            }
                            placeholder="SMP Negeri 2 Karangbinangun"
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-600"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-emerald-800 font-medium">
                    {identitySavedNotice ||
                      (student.nama
                        ? `Aktif: [${student.nama}, ${student.kelas}, ${student.noAbsen || '-'}, ${student.sekolah}]`
                        : 'Silakan isi keempat kolom di atas lalu klik Aktifkan Identitas.')}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Aktifkan Identitas Pengguna
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('tka')}
                      className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Mulai Asesmen TKA Kelas 7 →
                    </button>
                  </div>
                </div>
              </form>
            </section>

            {/* 3 FITUR UTAMA BERANDA: (1) DAFTAR NILAI CANVA SHEET, (2) SHARE WA MODE AIS-PRE, (3) UNDUH SOAL & PEMBAHASAN IN WORD */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Fitur Daftar Nilai Canva Sheet */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-emerald-800">
                    01. FITUR DAFTAR NILAI &amp; CANVA SHEET
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Data Daftar Nilai Canva Sheet (Akses Pengembang)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Rekapitulasi nilai seluruh siswa dengan kolom{' '}
                    <span className="font-mono font-semibold text-slate-800">
                      [Nama, Kelas, No Absen, Sekolah]
                    </span>{' '}
                    yang dapat diakses, disalin langsung (<code className="font-mono">Ctrl+V</code>), atau diunduh ke <strong>Canva Sheet</strong> oleh pengembang (<strong>{APP_CONFIG.developerName}</strong>).
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('nilai')}
                    className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Table className="w-4 h-4" />
                    <span>Buka Daftar Nilai Lengkap ({scores.length} Siswa)</span>
                  </button>
                  <a
                    href={canvaSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Akses Canva Sheet Pengembang</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Link Share WA Mode AIS-PRE */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-sky-800">
                    02. LINK SHARE WA (MODE AIS-PRE)
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Bagikan ke Grup WhatsApp Siswa &amp; Guru
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tautan resmi pratinjau publik mode <strong>ais-pre</strong> siap dibagikan ke WhatsApp siswa &amp; guru:
                  </p>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-[11px] text-slate-800 break-all">
                    {aisPreUrl}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={waShareHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Kirim Langsung ke WhatsApp (Mode AIS-PRE)</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyShareWa}
                    className="w-full px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    {shareCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Pesan &amp; Link AIS-PRE Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Link AIS-PRE &amp; Pesan WA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card 3: Unduh Soal dan Pembahasan in Word */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-slate-700">
                    03. DOKUMEN EVALUASI CETAK (.DOC / WORD)
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Unduh Soal dan Pembahasan in Word
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unduh naskah lengkap <strong>25 Soal Asesmen TKA Kelas 7 (Bilangan Bulat &amp; Pecahan)</strong> maupun <strong>Soal Relasi &amp; Fungsi Kelas 8</strong> dalam format Microsoft Word (<code className="font-mono">.doc</code>).
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => downloadTkaKelas7WordDocument(true, student)}
                    className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Unduh 25 Soal + Kunci TKA Kelas 7 (.doc)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadQuestionsAndSolutionsWord(student)}
                    className="w-full px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Unduh Soal Relasi &amp; Fungsi Kelas 8 (.doc)</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 5 INDIKATOR KEMAMPUAN BERPIKIR KRITIS DALAM PBL */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <p className="text-xs font-medium text-sky-700">
                    Kerangka Pedagogis Problem Based Learning (PBL) &amp; TKA
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900">
                    5 Fokus Indikator Kemampuan Berpikir Kritis &amp; Penalaran Siswa
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  Pengembang: {APP_CONFIG.developerName}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {CRITICAL_THINKING_INDICATORS.map((ind) => (
                  <div
                    key={ind.code}
                    className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1.5"
                  >
                    <div className="text-xs font-mono font-bold text-sky-800">
                      {ind.code}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {ind.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* BANK SOAL & PEMBAHASAN SECTION DIRECTLY ON BERANDA */}
            <BankSoalView student={student} />

            {/* LIVE DAFTAR NILAI CANVA SHEET SECTION DIRECTLY ON BERANDA */}
            <DaftarNilaiView
              scores={scores}
              canvaSheetUrl={canvaSheetUrl}
              onAddManualScore={async (payload) => {
                await handleSaveScoreToServer(
                  {
                    skorPbl: payload.skorPbl,
                    skorGame: payload.skorGame,
                    detailBenar: 'Input Pengembang / Guru'
                  },
                  {
                    nama: payload.nama,
                    kelas: payload.kelas,
                    noAbsen: payload.noAbsen,
                    sekolah: payload.sekolah
                  }
                );
              }}
              onDeleteScore={handleDeleteScore}
              onUpdateCanvaUrl={handleUpdateCanvaUrl}
            />
          </div>
        )}

        {activeTab === 'soal' && <BankSoalView student={student} />}

        {activeTab === 'rpm' && <RpmDeepLearningView />}

        {activeTab === 'video' && (
          <CinematicVideoPlayer
            onStartMission={() => setActiveTab('materi')}
            onStartGame={() => setActiveTab('game')}
          />
        )}

        {activeTab === 'materi' && (
          <PblModuleView
            student={student}
            onScoreSaved={async (skorPbl, detail) => {
              await handleSaveScoreToServer({ skorPbl, detailBenar: detail });
            }}
            onGoToSimulations={() => setActiveTab('simulasi')}
            onGoToGame={() => setActiveTab('game')}
          />
        )}

        {activeTab === 'simulasi' && <InteractiveSimulations />}

        {activeTab === 'game' && (
          <DetectiveGameView
            student={student}
            onUpdateStudent={setStudent}
            onGameCompleted={async (skorGame, detail) => {
              await handleSaveScoreToServer({ skorGame, detailBenar: detail });
            }}
            onOpenDaftarNilai={() => setActiveTab('nilai')}
            onDownloadWord={() => downloadQuestionsAndSolutionsWord(student)}
          />
        )}

        {activeTab === 'nilai' && (
          <DaftarNilaiView
            scores={scores}
            canvaSheetUrl={canvaSheetUrl}
            onAddManualScore={async (payload) => {
              await handleSaveScoreToServer(
                {
                  skorPbl: payload.skorPbl,
                  skorGame: payload.skorGame,
                  detailBenar: 'Input Pengembang / Guru'
                },
                {
                  nama: payload.nama,
                  kelas: payload.kelas,
                  noAbsen: payload.noAbsen,
                  sekolah: payload.sekolah
                }
              );
            }}
            onDeleteScore={handleDeleteScore}
            onUpdateCanvaUrl={handleUpdateCanvaUrl}
          />
        )}
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="bg-white border-t border-slate-200 px-4 md:px-8 py-5 mt-12">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            <strong>Asesmen Interaktif Model TKA Kelas 7 &amp; E-Modul Matematika SMP/MTs</strong> · Bab Bilangan Bulat, Pecahan &amp; Relasi Fungsi
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Pengembang: <strong className="text-slate-900">{TKA_META.pengembang}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>{TKA_META.sekolah}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
