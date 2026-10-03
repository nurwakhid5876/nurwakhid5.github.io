import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'emodul_store.json');

// In-memory cache for generated TTS audio by scene/line key
const ttsCache = new Map();

const DEFAULT_DATA = {
  canvaSheetUrl: 'https://www.canva.com/sheets/',
  developerName: 'NUR WAKHID, S.Pd',
  schoolDefault: 'SMP Negeri 1 Bantarkawung',
  scores: [
    {
      id: 'seed-1',
      nama: 'Ahmad Fauzi Ramadhan',
      kelas: 'VIII A',
      noAbsen: '02',
      sekolah: 'SMP Negeri 1 Bantarkawung',
      skorPbl: 90,
      skorGame: 90,
      nilaiAkhir: 90,
      predikat: 'A (Sangat Kritis)',
      detailBenar: '9/10 Soal Game · 4/4 Kasus PBL',
      waktu: '2026-09-25 08:15 WIB'
    },
    {
      id: 'seed-2',
      nama: 'Siti Nurhaliza Putri',
      kelas: 'VIII A',
      noAbsen: '28',
      sekolah: 'SMP Negeri 1 Bantarkawung',
      skorPbl: 95,
      skorGame: 100,
      nilaiAkhir: 98,
      predikat: 'A (Sangat Kritis)',
      detailBenar: '10/10 Soal Game · 4/4 Kasus PBL',
      waktu: '2026-09-25 08:22 WIB'
    },
    {
      id: 'seed-3',
      nama: 'Bagas Pratama Wijaya',
      kelas: 'VIII B',
      noAbsen: '07',
      sekolah: 'SMP Negeri 1 Bantarkawung',
      skorPbl: 85,
      skorGame: 80,
      nilaiAkhir: 83,
      predikat: 'B (Kritis)',
      detailBenar: '8/10 Soal Game · 4/4 Kasus PBL',
      waktu: '2026-09-25 08:30 WIB'
    },
    {
      id: 'seed-4',
      nama: 'Dewi Sekar Arum',
      kelas: 'VIII B',
      noAbsen: '11',
      sekolah: 'SMP Negeri 1 Bantarkawung',
      skorPbl: 88,
      skorGame: 90,
      nilaiAkhir: 89,
      predikat: 'A (Sangat Kritis)',
      detailBenar: '9/10 Soal Game · 4/4 Kasus PBL',
      waktu: '2026-09-25 08:41 WIB'
    },
    {
      id: 'seed-5',
      nama: 'Reza Aditya Saputra',
      kelas: 'VIII C',
      noAbsen: '24',
      sekolah: 'SMP Negeri 1 Bantarkawung',
      skorPbl: 80,
      skorGame: 80,
      nilaiAkhir: 80,
      predikat: 'B (Kritis)',
      detailBenar: '8/10 Soal Game · 3/4 Kasus PBL',
      waktu: '2026-09-25 09:05 WIB'
    }
  ]
};

function loadStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading store, using fallback:', err);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveStore(store) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '2mb' }));

  app.get('/api/scores', (_req, res) => {
    const store = loadStore();
    res.json(store);
  });

  app.post('/api/scores', (req, res) => {
    const store = loadStore();
    const {
      nama,
      kelas,
      noAbsen,
      sekolah,
      skorPbl = 0,
      skorGame = 0,
      detailBenar = ''
    } = req.body || {};

    if (!nama || !kelas || !noAbsen || !sekolah) {
      res.status(400).json({ error: 'Data identitas [Nama, Kelas, No Absen, Sekolah] wajib diisi lengkap.' });
      return;
    }

    const cleanNama = String(nama).trim();
    const cleanKelas = String(kelas).trim();
    const cleanAbsen = String(noAbsen).trim();
    const cleanSekolah = String(sekolah).trim();
    const numPbl = Math.max(0, Math.min(100, Number(skorPbl) || 0));
    const numGame = Math.max(0, Math.min(100, Number(skorGame) || 0));

    let nilaiAkhir = 0;
    if (numPbl > 0 && numGame > 0) {
      nilaiAkhir = Math.round(numPbl * 0.4 + numGame * 0.6);
    } else if (numGame > 0) {
      nilaiAkhir = numGame;
    } else {
      nilaiAkhir = numPbl;
    }

    let predikat = 'C (Cukup Kritis)';
    if (nilaiAkhir >= 88) predikat = 'A (Sangat Kritis)';
    else if (nilaiAkhir >= 75) predikat = 'B (Kritis)';
    else if (nilaiAkhir >= 60) predikat = 'C (Cukup Kritis)';
    else predikat = 'D (Perlu Bimbingan)';

    const now = new Date();
    const waktu = now.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    const existingIndex = store.scores.findIndex(
      (s) =>
        s.nama.toLowerCase() === cleanNama.toLowerCase() &&
        s.kelas.toLowerCase() === cleanKelas.toLowerCase() &&
        String(s.noAbsen) === cleanAbsen
    );

    if (existingIndex !== -1) {
      const prev = store.scores[existingIndex];
      const mergedPbl = numPbl > 0 ? numPbl : prev.skorPbl;
      const mergedGame = numGame > 0 ? numGame : prev.skorGame;
      let mergedAkhir = 0;
      if (mergedPbl > 0 && mergedGame > 0) {
        mergedAkhir = Math.round(mergedPbl * 0.4 + mergedGame * 0.6);
      } else {
        mergedAkhir = Math.max(mergedPbl, mergedGame);
      }
      let mergedPredikat = 'C (Cukup Kritis)';
      if (mergedAkhir >= 88) mergedPredikat = 'A (Sangat Kritis)';
      else if (mergedAkhir >= 75) mergedPredikat = 'B (Kritis)';
      else if (mergedAkhir >= 60) mergedPredikat = 'C (Cukup Kritis)';
      else mergedPredikat = 'D (Perlu Bimbingan)';

      store.scores[existingIndex] = {
        ...prev,
        nama: cleanNama,
        kelas: cleanKelas,
        noAbsen: cleanAbsen,
        sekolah: cleanSekolah,
        skorPbl: mergedPbl,
        skorGame: mergedGame,
        nilaiAkhir: mergedAkhir,
        predikat: mergedPredikat,
        detailBenar: detailBenar || prev.detailBenar,
        waktu
      };
      saveStore(store);
      res.json({ item: store.scores[existingIndex], store });
      return;
    }

    const newItem = {
      id: 'score-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      nama: cleanNama,
      kelas: cleanKelas,
      noAbsen: cleanAbsen,
      sekolah: cleanSekolah,
      skorPbl: numPbl,
      skorGame: numGame,
      nilaiAkhir,
      predikat,
      detailBenar: detailBenar || 'Terekam dari E-Modul',
      waktu
    };

    store.scores.unshift(newItem);
    saveStore(store);
    res.status(201).json({ item: newItem, store });
  });

  app.delete('/api/scores/:id', (req, res) => {
    const store = loadStore();
    const { id } = req.params;
    store.scores = store.scores.filter((s) => s.id !== id);
    saveStore(store);
    res.json({ store });
  });

  app.post('/api/config/canva-sheet', (req, res) => {
    const store = loadStore();
    const { canvaSheetUrl } = req.body || {};
    if (typeof canvaSheetUrl === 'string' && canvaSheetUrl.trim()) {
      store.canvaSheetUrl = canvaSheetUrl.trim();
      saveStore(store);
    }
    res.json({ store });
  });

  // Server-side Gemini TTS route for the Indonesian Male Mathematics Teacher Avatar
  app.post('/api/tts', async (req, res) => {
    const { text, voiceName = 'Charon' } = req.body || {};
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required for TTS.' });
      return;
    }

    const cacheKey = `${voiceName}:${text}`;
    if (ttsCache.has(cacheKey)) {
      res.json({ audioBase64: ttsCache.get(cacheKey), sampleRate: 24000 });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({ error: 'GEMINI_API_KEY not configured on server.' });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text,
                speechMetadata: {
                  style:
                    'Warm, authoritative, experienced Indonesian male mathematics teacher, clear and inspiring pronunciation in standard Bahasa Indonesia, moderate pace with emphasis on key terms'
                }
              }
            ]
          }
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName }
            }
          }
        }
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        res.status(502).json({ error: 'No audio returned from model.' });
        return;
      }

      ttsCache.set(cacheKey, base64Audio);
      res.json({ audioBase64: base64Audio, sampleRate: 24000 });
    } catch (err) {
      console.error('Gemini TTS error:', err);
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to generate TTS audio.'
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`E-Modul Relasi & Fungsi Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
