import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  RotateCcw,
  Film,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Mic
} from 'lucide-react';
import sceneOpeningImg from '../assets/images/teacher_3d_scene_opening_1790425185257.jpg';
import sceneDetectiveImg from '../assets/images/teacher_3d_scene_detective_1790425203517.jpg';
import sceneFinaleImg from '../assets/images/teacher_3d_scene_finale_1790425218421.jpg';

export interface SceneData {
  id: number;
  code: string;
  title: string;
  onScreenTitle: string;
  onScreenSubtitle: string;
  cameraNote: string;
  expressionNote: string;
  bgImage: string;
  cameraClass: string;
  dialogueLines: string[];
  fullSpeechText: string;
}

export const CINEMATIC_SCENES: SceneData[] = [
  {
    id: 1,
    code: 'SCENE 1',
    title: 'Pembuka Misi',
    onScreenTitle: 'MENGUNGKAP RAHASIA RELASI DAN FUNGSI',
    onScreenSubtitle: 'E-Modul Digital Interaktif Matematika SMP/MTs',
    cameraNote: 'Slow cinematic dolly-in · Medium shot eye-level',
    expressionNote: 'Ramah, antusias, mengundang siswa berpikir kritis',
    bgImage: sceneOpeningImg,
    cameraClass: 'scale-105 translate-x-0',
    dialogueLines: [
      '“Assalamu’alaikum, anak-anak! Selamat datang kembali di misi matematika kita.”',
      '“Pada pertemuan kali ini, kita akan mengungkap sebuah rahasia penting…”',
      '“Apa sebenarnya hubungan antara RELASI dan FUNGSI?”'
    ],
    fullSpeechText:
      'Assalamu’alaikum, anak-anak! Selamat datang kembali di misi matematika kita. Pada pertemuan kali ini, kita akan mengungkap sebuah rahasia penting. Apa sebenarnya hubungan antara relasi, dan fungsi?'
  },
  {
    id: 2,
    code: 'SCENE 2',
    title: 'Relasi dalam Kehidupan Sehari-hari',
    onScreenTitle: 'SIAPA MEMILIH APA?',
    onScreenSubtitle: 'RELASI = HUBUNGAN ANTARA ANGGOTA DUA HIMPUNAN',
    cameraNote: 'Over-the-shoulder ke layar hologram → Medium close-up guru',
    expressionNote: 'Bersahabat, menjelaskan dengan gestur menunjuk layar hologram',
    bgImage: sceneOpeningImg,
    cameraClass: 'scale-110 -translate-x-2',
    dialogueLines: [
      '“Coba perhatikan kehidupan sehari-hari. Setiap siswa memiliki pilihan olahraga yang disukai.”',
      '“Ketika kita menghubungkan siswa dengan olahraga yang dipilihnya, sebenarnya kita sedang membuat suatu hubungan.”',
      '“Nah, hubungan itulah yang dalam matematika kita sebut sebagai RELASI.”'
    ],
    fullSpeechText:
      'Coba perhatikan kehidupan sehari-hari. Setiap siswa memiliki pilihan olahraga yang disukai. Ketika kita menghubungkan siswa dengan olahraga yang dipilihnya, sebenarnya kita sedang membuat suatu hubungan. Nah, hubungan itulah yang dalam matematika kita sebut sebagai RELASI.'
  },
  {
    id: 3,
    code: 'SCENE 3',
    title: 'Mengenal Konsep Relasi & 3 Representasi',
    onScreenTitle: 'RELASI: HIMPUNAN A (SISWA) → HIMPUNAN B (HOBI)',
    onScreenSubtitle: '1. Diagram Panah · 2. Pasangan Berurutan · 3. Diagram Cartesius',
    cameraNote: 'Medium shot guru → Cinematic zoom ke papan hologram',
    expressionNote: 'Jelas, percaya diri, menggunakan kedua tangan secara natural',
    bgImage: sceneOpeningImg,
    cameraClass: 'scale-105 translate-x-2',
    dialogueLines: [
      '“RELASI adalah aturan atau hubungan yang menghubungkan anggota suatu himpunan dengan anggota himpunan lainnya.”',
      '“Relasi dapat kita nyatakan dengan diagram panah, pasangan berurutan, maupun diagram Cartesius.”',
      '“Jadi, relasi membantu kita melihat bagaimana dua himpunan saling berhubungan.”'
    ],
    fullSpeechText:
      'Relasi adalah aturan atau hubungan yang menghubungkan anggota suatu himpunan dengan anggota himpunan lainnya. Relasi dapat kita nyatakan dengan diagram panah, pasangan berurutan, maupun diagram Cartesius. Jadi, relasi membantu kita melihat bagaimana dua himpunan saling berhubungan.'
  },
  {
    id: 4,
    code: 'SCENE 4',
    title: 'Misteri: Kapan Relasi Menjadi Fungsi?',
    onScreenTitle: 'KUNCI RAHASIA FUNGSI',
    onScreenSubtitle:
      'SETIAP ANGGOTA DOMAIN HARUS MEMPUNYAI TEPAT SATU PASANGAN DI KODOMAIN',
    cameraNote: 'Close-up dramatis detektif → Gerak halus ke rumus hologram',
    expressionNote: 'Misterius, antusias, mengangkat satu tangan penuh penekanan',
    bgImage: sceneDetectiveImg,
    cameraClass: 'scale-105 translate-x-0',
    dialogueLines: [
      '“Tetapi tunggu dulu! Apakah setiap relasi dapat disebut FUNGSI?”',
      '“Jawabannya… belum tentu!”',
      '“Setiap anggota DOMAIN harus mempunyai TEPAT SATU PASANGAN di KODOMAIN. Inilah kunci rahasianya!”'
    ],
    fullSpeechText:
      'Tetapi tunggu dulu! Apakah setiap relasi dapat disebut fungsi? Jawabannya, belum tentu! Setiap anggota domain harus mempunyai tepat satu pasangan di kodomain. Inilah kunci rahasianya!'
  },
  {
    id: 5,
    code: 'SCENE 5',
    title: 'Tantangan Detektif Matematika',
    onScreenTitle: '🔎 MISI DETEKTIF MATEMATIKA',
    onScreenSubtitle: 'AMATI → ANALISIS → TEMUKAN POLA → BUKTIKAN',
    cameraNote: 'Medium shot di antara 2 diagram hologram (FUNGSI ✓ vs BUKAN FUNGSI ✗)',
    expressionNote: 'Menantang namun ramah, mengangkat satu jari mengajak berpikir kritis',
    bgImage: sceneDetectiveImg,
    cameraClass: 'scale-110 translate-x-1',
    dialogueLines: [
      '“Menurut kalian, mengapa diagram pertama merupakan FUNGSI, sedangkan diagram kedua bukan?”',
      '“Jangan langsung melihat jawabannya! Gunakan kemampuan berpikir kalian. Temukan sendiri aturan rahasianya.”',
      '“Perhatikan setiap anggota domain. Apakah semuanya mempunyai tepat satu pasangan? Sekarang, buktikan jawaban kalian!”'
    ],
    fullSpeechText:
      'Menurut kalian, mengapa diagram pertama merupakan fungsi, sedangkan diagram kedua bukan? Jangan langsung melihat jawabannya! Gunakan kemampuan berpikir kalian. Temukan sendiri aturan rahasianya. Perhatikan setiap anggota domain. Apakah semuanya mempunyai tepat satu pasangan? Sekarang, buktikan jawaban kalian!'
  },
  {
    id: 6,
    code: 'SCENE 6',
    title: 'Ajakan Memulai E-Modul (Pertemuan 3)',
    onScreenTitle: '🚀 MARI MULAI MISI PERTEMUAN 3!',
    onScreenSubtitle: 'RELASI → FUNGSI → POLA → PEMECAHAN MASALAH',
    cameraNote: 'Tracking shot mengikuti guru → Medium close-up inspiratif',
    expressionNote: 'Senyum hangat penuh semangat, menunjuk tombol MULAI MISI',
    bgImage: sceneFinaleImg,
    cameraClass: 'scale-105 translate-x-0',
    dialogueLines: [
      '“Sekarang giliran kalian menjadi detektif matematika! Bukalah E-Modul ‘Mengungkap Rahasia Relasi dan Fungsi’, kemudian selesaikan setiap tantangan pada Pertemuan 3.”',
      '“Amati, hubungkan, temukan polanya, dan buktikan apakah suatu relasi merupakan fungsi. Selamat menjalankan misi!”',
      '“Matematika bukan untuk dihafalkan saja… tetapi untuk ditemukan rahasianya! Wassalamu’alaikum warahmatullahi wabarakatuh.”'
    ],
    fullSpeechText:
      'Sekarang giliran kalian menjadi detektif matematika! Bukalah E-Modul Mengungkap Rahasia Relasi dan Fungsi, kemudian selesaikan setiap tantangan pada Pertemuan 3. Amati, hubungkan, temukan polanya, dan buktikan apakah suatu relasi merupakan fungsi. Selamat menjalankan misi! Matematika bukan untuk dihafalkan saja, tetapi untuk ditemukan rahasianya! Wassalamu’alaikum warahmatullahi wabarakatuh.'
  }
];

interface CinematicVideoPlayerProps {
  onStartMission: () => void;
  onStartGame: () => void;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  onStartMission,
  onStartGame
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceMode, setVoiceMode] = useState<'browser' | 'gemini'>('browser');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const lineTimerRef = useRef<number | null>(null);

  const scene = CINEMATIC_SCENES[currentSceneIdx];

  // Stop any ongoing speech/audio
  const stopAudioAndTimers = () => {
    if (lineTimerRef.current) {
      window.clearTimeout(lineTimerRef.current);
      lineTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop();
      } catch {
        // ignore if already stopped
      }
      activeSourceRef.current = null;
    }
    setIsSpeaking(false);
  };

  // Play raw 24kHz PCM base64 from Gemini TTS
  const playPcmBase64 = async (base64Data: string): Promise<void> => {
    return new Promise((resolve) => {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext({ sampleRate: 24000 });
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const binaryStr = atob(base64Data);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        const int16 = new Int16Array(bytes.buffer);
        const float32 = new Float32Array(int16.length);
        for (let i = 0; i < int16.length; i++) {
          float32[i] = int16[i] / 32768;
        }

        const buffer = ctx.createBuffer(1, float32.length, 24000);
        buffer.getChannelData(0).set(float32);

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        activeSourceRef.current = source;
        setIsSpeaking(true);

        source.onended = () => {
          setIsSpeaking(false);
          resolve();
        };
        source.start(0);
      } catch (e) {
        console.error('PCM playback error:', e);
        setIsSpeaking(false);
        resolve();
      }
    });
  };

  // Speak single scene and advance through its dialogue lines and next scene
  useEffect(() => {
    if (!isPlaying) {
      stopAudioAndTimers();
      return;
    }

    let cancelled = false;
    const activeScene = CINEMATIC_SCENES[currentSceneIdx];
    setCurrentLineIdx(0);

    // Step through subtitle lines visually during the scene
    const lineInterval = window.setInterval(() => {
      setCurrentLineIdx((prev) =>
        prev < activeScene.dialogueLines.length - 1 ? prev + 1 : prev
      );
    }, 4200);

    const advanceToNextScene = () => {
      if (cancelled) return;
      window.clearInterval(lineInterval);
      if (currentSceneIdx < CINEMATIC_SCENES.length - 1) {
        setCurrentSceneIdx((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setIsSpeaking(false);
      }
    };

    const runSceneNarration = async () => {
      if (isMuted) {
        setIsSpeaking(true);
        lineTimerRef.current = window.setTimeout(() => {
          setIsSpeaking(false);
          advanceToNextScene();
        }, 12500);
        return;
      }

      if (voiceMode === 'gemini') {
        try {
          setIsSpeaking(true);
          const res = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: activeScene.fullSpeechText,
              voiceName: 'Charon'
            })
          });
          if (res.ok && !cancelled) {
            const data = await res.json();
            if (data.audioBase64) {
              await playPcmBase64(data.audioBase64);
              if (!cancelled) advanceToNextScene();
              return;
            }
          }
        } catch {
          // Fallback to browser speechSynthesis below
        }
      }

      // Browser Indonesian TTS (Instant, reliable fallback & default)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(activeScene.fullSpeechText);
        utter.lang = 'id-ID';
        utter.rate = 0.96;
        utter.pitch = 0.92;

        const voices = window.speechSynthesis.getVoices();
        const idVoice =
          voices.find(
            (v) =>
              v.lang.toLowerCase().includes('id') &&
              (v.name.toLowerCase().includes('male') ||
                v.name.toLowerCase().includes('ardi') ||
                v.name.toLowerCase().includes('google'))
          ) || voices.find((v) => v.lang.toLowerCase().includes('id'));
        if (idVoice) {
          utter.voice = idVoice;
        }

        setIsSpeaking(true);
        utter.onend = () => {
          setIsSpeaking(false);
          if (!cancelled) {
            lineTimerRef.current = window.setTimeout(advanceToNextScene, 900);
          }
        };
        utter.onerror = () => {
          setIsSpeaking(false);
          if (!cancelled) {
            lineTimerRef.current = window.setTimeout(advanceToNextScene, 8000);
          }
        };
        window.speechSynthesis.speak(utter);
      } else {
        lineTimerRef.current = window.setTimeout(advanceToNextScene, 12000);
      }
    };

    runSceneNarration();

    return () => {
      cancelled = true;
      window.clearInterval(lineInterval);
      stopAudioAndTimers();
    };
  }, [isPlaying, currentSceneIdx, isMuted, voiceMode]);

  const handleCopyFullScript = async () => {
    const scriptText = CINEMATIC_SCENES.map(
      (s) =>
        `🎬 ${s.code} — ${s.title.toUpperCase()}\nJudul Layar: ${s.onScreenTitle}\nSubjudul: ${s.onScreenSubtitle}\nKamera: ${s.cameraNote}\nEkspresi Guru (Seragam Brebesan & Peci Hitam): ${s.expressionNote}\nDialog Guru:\n${s.dialogueLines.join('\n')}`
    ).join('\n\n----------------------------------------\n\n');

    try {
      await navigator.clipboard.writeText(scriptText);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 3000);
    } catch {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 3000);
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* Top Studio Header Bar */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Film className="w-5 h-5 text-sky-400 shrink-0" />
          <div>
            <div className="text-xs font-mono text-sky-300">
              3D EDUCATIONAL CINEMATIC VIDEO · PIXAR &amp; UNREAL ENGINE 5 STYLE (4K)
            </div>
            <h2 className="text-base md:text-lg font-semibold text-white">
              Video Sinematik 3D: “Mengungkap Rahasia Relasi dan Fungsi” (Scene 1–6)
            </h2>
          </div>
        </div>

        {/* Voice Engine & Script Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setVoiceMode('browser')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                voiceMode === 'browser'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Suara Guru ID (Instan)
            </button>
            <button
              type="button"
              onClick={() => setVoiceMode('gemini')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                voiceMode === 'gemini'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              AI Studio Voice (Charon)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowScriptModal((s) => !s)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            {showScriptModal ? 'Tutup Naskah 6 Scene' : 'Lihat Naskah & Storyboard'}
          </button>
        </div>
      </div>

      {/* MAIN 16:9 3D HOLOGRAPHIC CINEMA VIEWPORT */}
      <div className="relative bg-slate-950 aspect-16/9 min-h-[420px] w-full overflow-hidden select-none">
        {/* Background 3D Teacher Render with Smooth Camera Pan/Zoom */}
        {!imgErrors[scene.id] ? (
          <img
            src={scene.bgImage}
            alt={`${scene.code} - Guru Matematika Seragam Brebesan Peci Hitam`}
            referrerPolicy="no-referrer"
            onError={() =>
              setImgErrors((prev) => ({ ...prev, [scene.id]: true }))
            }
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isPlaying ? scene.cameraClass : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900" />
        )}

        {/* Measured Contrast Scrim for 4.5:1 Legibility Across All Frames */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

        {/* TOP OVERLAY: SCENE BADGE, TEACHER AVATAR CONSISTENCY INFO & CAMERA TELEMETRY */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2.5 bg-slate-900/90 border border-sky-500/40 px-3.5 py-1.5 rounded-lg text-xs text-white">
            <span className="font-mono font-bold text-amber-400">
              🎬 {scene.code} / 06
            </span>
            <span aria-hidden="true" className="text-slate-500">
              ·
            </span>
            <span className="font-semibold">{scene.title}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-200">
            <Mic
              className={`w-3.5 h-3.5 ${
                isSpeaking ? 'text-emerald-400 animate-pulse' : 'text-slate-400'
              }`}
            />
            <span>
              Guru Matematika (Seragam Adat Brebesan · Peci Hitam · NUR WAKHID, S.Pd)
            </span>
          </div>
        </div>

        {/* CENTER OVERLAY: HOLOGRAPHIC MATHEMATICS BOARD (CHANGES DYNAMICALLY PER SCENE 1–6) */}
        <div className="absolute inset-x-4 md:inset-x-8 top-16 bottom-28 flex items-center justify-between gap-6 z-10 pointer-events-none">
          {/* Left Side: On-Screen Title & Scene-Specific Holographic Concept */}
          <div className="w-full lg:w-7/12 bg-slate-900/80 backdrop-blur-md border border-sky-400/40 rounded-xl p-4 md:p-6 text-white space-y-4 shadow-lg">
            <div className="space-y-1 border-b border-sky-500/30 pb-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-sky-300">
                LAYAR HOLOGRAM KELAS DIGITAL · ULTRA HD 4K
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-amber-300 tracking-tight">
                {scene.onScreenTitle}
              </h3>
              <p className="text-xs md:text-sm font-medium text-sky-100">
                {scene.onScreenSubtitle}
              </p>
            </div>

            {/* SCENE 1 HOLOGRAM: A = {1, 2, 3} -> B = {2, 4, 6} */}
            {scene.id === 1 && (
              <div className="grid grid-cols-3 items-center gap-3 pt-1 font-mono text-xs md:text-sm">
                <div className="p-3 rounded-lg bg-sky-950/90 border border-sky-400/50 text-center space-y-1">
                  <div className="text-sky-300 font-bold">A = {'{1, 2, 3}'}</div>
                  <div className="py-1 px-2 bg-sky-900/70 rounded">1</div>
                  <div className="py-1 px-2 bg-sky-900/70 rounded">2</div>
                  <div className="py-1 px-2 bg-sky-900/70 rounded">3</div>
                </div>
                <div className="text-center space-y-2 text-amber-300 font-bold">
                  <div>1 ───► 2</div>
                  <div>2 ───► 4</div>
                  <div>3 ───► 6</div>
                  <div className="text-[11px] text-sky-200 font-sans">
                    Relasi: “Setengah dari”
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/90 border border-emerald-400/50 text-center space-y-1">
                  <div className="text-emerald-300 font-bold">
                    B = {'{2, 4, 6}'}
                  </div>
                  <div className="py-1 px-2 bg-emerald-900/70 rounded">2</div>
                  <div className="py-1 px-2 bg-emerald-900/70 rounded">4</div>
                  <div className="py-1 px-2 bg-emerald-900/70 rounded">6</div>
                </div>
              </div>
            )}

            {/* SCENE 2 HOLOGRAM: Everyday Life Sports Connections */}
            {scene.id === 2 && (
              <div className="space-y-2.5 pt-1 text-xs md:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono">
                  <div className="p-2.5 rounded-lg bg-sky-950/80 border border-sky-400/40 flex items-center justify-between">
                    <span className="font-bold text-white">Andi</span>
                    <span className="text-amber-300">──►</span>
                    <span className="text-sky-300">Sepak Bola</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-950/80 border border-sky-400/40 flex items-center justify-between">
                    <span className="font-bold text-white">Siti</span>
                    <span className="text-amber-300">──►</span>
                    <span className="text-sky-300">Bulu Tangkis</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-950/80 border border-sky-400/40 flex items-center justify-between">
                    <span className="font-bold text-white">Budi</span>
                    <span className="text-amber-300">──►</span>
                    <span className="text-sky-300">Bola Basket</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-400/50 text-center font-semibold text-amber-200 text-xs">
                  RELASI = HUBUNGAN ANTARA ANGGOTA DUA HIMPUNAN
                </div>
              </div>
            )}

            {/* SCENE 3 HOLOGRAM: Two Circles (Siswa -> Hobi) & 3 Representations */}
            {scene.id === 3 && (
              <div className="space-y-3 pt-1 text-xs">
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-2.5 rounded-lg bg-sky-950/80 border border-sky-400/40">
                    <div className="text-sky-300 font-bold mb-1">
                      HIMPUNAN A — SISWA
                    </div>
                    <div>• Andi ──► Sepak Bola</div>
                    <div>• Budi ──► Membaca</div>
                    <div>• Citra ──► Menggambar</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-400/40">
                    <div className="text-emerald-300 font-bold mb-1">
                      3 CARA MENYATAKAN RELASI
                    </div>
                    <div>1. Diagram Panah</div>
                    <div>2. Pasangan Berurutan</div>
                    <div>3. Diagram Cartesius</div>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 4 HOLOGRAM: Mystery Key Rule of Functions */}
            {scene.id === 4 && (
              <div className="space-y-3 pt-1 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-amber-500/20 border border-amber-400">
                  <span className="font-mono font-bold text-amber-300">
                    FUNGSI?
                  </span>
                  <span className="font-semibold text-white">
                    A = {'{1, 2, 3}'} ──► B = {'{2, 4, 6}'} (1→2, 2→4, 3→6)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono font-bold">
                  <div className="p-2 rounded bg-sky-900/80 border border-sky-400 text-sky-200">
                    DOMAIN (Asal)
                  </div>
                  <div className="p-2 rounded bg-emerald-900/80 border border-emerald-400 text-emerald-200">
                    TEPAT 1 PASANGAN
                  </div>
                  <div className="p-2 rounded bg-sky-900/80 border border-sky-400 text-sky-200">
                    KODOMAIN (Kawan)
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 5 HOLOGRAM: Detective Challenge Comparison */}
            {scene.id === 5 && (
              <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-xs">
                <div className="p-3 rounded-lg bg-emerald-950/90 border border-emerald-400 space-y-1">
                  <div className="font-bold text-emerald-300">
                    DIAGRAM KIRI: FUNGSI ✓
                  </div>
                  <div>1 ──► 2</div>
                  <div>2 ──► 4</div>
                  <div>3 ──► 6</div>
                  <div className="text-[11px] font-sans text-emerald-200 pt-1">
                    Semua anggota domain tepat punya 1 pasangan.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-950/90 border border-red-400 space-y-1">
                  <div className="font-bold text-red-300">
                    DIAGRAM KANAN: BUKAN FUNGSI ✗
                  </div>
                  <div className="text-amber-300 font-bold">
                    1 ──► 2 &amp; 1 ──► 4 (Bercabang!)
                  </div>
                  <div>2 ──► 6</div>
                  <div>3 ──► 8</div>
                </div>
              </div>
            )}

            {/* SCENE 6 HOLOGRAM: Call to Action Start Mission */}
            {scene.id === 6 && (
              <div className="space-y-3 pt-1 pointer-events-auto">
                <div className="p-2.5 rounded-lg bg-sky-950/90 border border-sky-400/50 text-center font-mono text-xs text-sky-200">
                  RELASI ──► FUNGSI ──► POLA ──► PEMECAHAN MASALAH
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onStartMission}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>MULAI MISI PERTEMUAN 3 (MATERI &amp; LKPD)</span>
                  </button>
                  <button
                    type="button"
                    onClick={onStartGame}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>BUKA GAME DETEKTIF</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SUBTITLE & LIP-SYNC CAPTION BAR */}
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <div className="bg-slate-950/90 border border-slate-700/90 rounded-xl px-4 py-3 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-sky-300">
              <span>
                {isSpeaking
                  ? '🔊 GURU SEDANG MENJELASKAN (SINKRONISASI SUARA AKTIF)'
                  : '💬 SUBTITLE BAHASA INDONESIA'}
              </span>
              <span>·</span>
              <span>Ekspresi: {scene.expressionNote}</span>
            </div>
            <p className="text-sm md:text-base font-medium text-white">
              {scene.dialogueLines[currentLineIdx] || scene.dialogueLines[0]}
            </p>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYER TRANSPORT CONTROLS & 6-SCENE TIMELINE */}
      <div className="p-4 md:p-5 bg-slate-900 text-white space-y-4">
        {/* Scene Selector Stepper (Scenes 1 to 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CINEMATIC_SCENES.map((s, idx) => {
            const active = idx === currentSceneIdx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentSceneIdx(idx);
                  setCurrentLineIdx(0);
                }}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  active
                    ? 'bg-sky-700 border-sky-400 text-white'
                    : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-amber-300">
                  {s.code}
                </div>
                <div className="text-xs font-semibold truncate mt-0.5">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Playback Transport Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Jeda Video Sinematik</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Putar Video &amp; Suara Guru (Scene {scene.id})</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={currentSceneIdx === 0}
              onClick={() =>
                setCurrentSceneIdx((p) => Math.max(0, p - 1))
              }
              className="p-2 text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg transition-colors"
              title="Scene Sebelumnya"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              type="button"
              disabled={currentSceneIdx === CINEMATIC_SCENES.length - 1}
              onClick={() =>
                setCurrentSceneIdx((p) =>
                  Math.min(CINEMATIC_SCENES.length - 1, p + 1)
                )
              }
              className="p-2 text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg transition-colors"
              title="Scene Berikutnya"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentSceneIdx(0);
                setCurrentLineIdx(0);
              }}
              className="p-2 text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Ulangi dari Scene 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              className="p-2 text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Kamera: {scene.cameraNote}
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE FULL 6-SCENE STORYBOARD & SCRIPT INSPECTOR */}
      {showScriptModal && (
        <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Naskah Lengkap &amp; Storyboard Video 3D (Scene 1 – Scene 6)
              </h3>
              <p className="text-xs text-slate-600">
                Konsistensi Karakter: Guru Matematika Laki-laki Indonesia · Pakaian Adat Brebesan · Peci Hitam Resmi · Lencana Identitas Guru.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyFullScript}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg flex items-center gap-1.5"
            >
              {copiedScript ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Naskah 6 Scene Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Seluruh Naskah &amp; Prompt 6 Scene</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CINEMATIC_SCENES.map((sc) => (
              <div
                key={sc.id}
                className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs"
              >
                <div className="font-mono font-bold text-sky-800">
                  🎬 {sc.code} — {sc.title}
                </div>
                <div className="font-semibold text-slate-900">
                  Layar: “{sc.onScreenTitle}”
                </div>
                <div className="text-slate-500">Kamera: {sc.cameraNote}</div>
                <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1 text-slate-800 italic">
                  {sc.dialogueLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
