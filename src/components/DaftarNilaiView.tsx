import React, { useState } from 'react';
import { APP_CONFIG, CLASS_OPTIONS } from '../data/emodulContent';
import { ScoreRecord } from '../types';
import {
  Copy,
  Download,
  ExternalLink,
  Check,
  Plus,
  Trash2,
  Settings,
  Search
} from 'lucide-react';

interface DaftarNilaiViewProps {
  scores: ScoreRecord[];
  canvaSheetUrl: string;
  onAddManualScore: (payload: {
    nama: string;
    kelas: string;
    noAbsen: string;
    sekolah: string;
    skorPbl: number;
    skorGame: number;
  }) => Promise<void>;
  onDeleteScore: (id: string) => Promise<void>;
  onUpdateCanvaUrl: (url: string) => Promise<void>;
}

export const DaftarNilaiView: React.FC<DaftarNilaiViewProps> = ({
  scores,
  canvaSheetUrl,
  onAddManualScore,
  onDeleteScore,
  onUpdateCanvaUrl
}) => {
  const [filterKelas, setFilterKelas] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCanva, setCopiedCanva] = useState<boolean>(false);
  const [showDeveloperPanel, setShowDeveloperPanel] = useState<boolean>(true);
  const [customCanvaUrl, setCustomCanvaUrl] = useState<string>(canvaSheetUrl);
  const [urlSavedMsg, setUrlSavedMsg] = useState<string>('');

  // Quick manual entry form state
  const [nama, setNama] = useState<string>('');
  const [kelas, setKelas] = useState<string>('VIII A');
  const [noAbsen, setNoAbsen] = useState<string>('');
  const [sekolah, setSekolah] = useState<string>(APP_CONFIG.defaultSchool);
  const [skorPbl, setSkorPbl] = useState<number>(85);
  const [skorGame, setSkorGame] = useState<number>(90);

  const filteredScores = scores.filter((s) => {
    const matchKelas = filterKelas === 'ALL' || s.kelas === filterKelas;
    const matchSearch =
      !searchQuery.trim() ||
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sekolah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.noAbsen).includes(searchQuery);
    return matchKelas && matchSearch;
  });

  const avgScore =
    filteredScores.length > 0
      ? Math.round(
          filteredScores.reduce((acc, item) => acc + item.nilaiAkhir, 0) /
            filteredScores.length
        )
      : 0;

  // Copy as Tab-Separated Values (TSV) for instant Ctrl+V paste into Canva Sheet
  const handleCopyForCanvaSheet = async () => {
    const headers = [
      'Nama',
      'Kelas',
      'No Absen',
      'Sekolah',
      'Skor PBL',
      'Skor Game',
      'Nilai Akhir',
      'Predikat',
      'Waktu'
    ];
    const rows = filteredScores.map((s) => [
      s.nama,
      s.kelas,
      s.noAbsen,
      s.sekolah,
      String(s.skorPbl),
      String(s.skorGame),
      String(s.nilaiAkhir),
      s.predikat,
      s.waktu
    ]);
    const tsvContent = [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join(
      '\n'
    );

    try {
      await navigator.clipboard.writeText(tsvContent);
      setCopiedCanva(true);
      setTimeout(() => setCopiedCanva(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = tsvContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedCanva(true);
      setTimeout(() => setCopiedCanva(false), 3000);
    }
  };

  // Download CSV file compatible with Canva Sheet Import
  const handleDownloadCanvaCsv = () => {
    const headers = [
      'Nama',
      'Kelas',
      'No Absen',
      'Sekolah',
      'Skor PBL',
      'Skor Game',
      'Nilai Akhir',
      'Predikat',
      'Keterangan',
      'Waktu'
    ];
    const escapeCsv = (val: string | number) =>
      `"${String(val).replace(/"/g, '""')}"`;

    const rows = filteredScores.map((s) =>
      [
        s.nama,
        s.kelas,
        s.noAbsen,
        s.sekolah,
        s.skorPbl,
        s.skorGame,
        s.nilaiAkhir,
        s.predikat,
        s.detailBenar,
        s.waktu
      ]
        .map(escapeCsv)
        .join(',')
    );

    const csvString = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Daftar_Nilai_Canva_Sheet_Relasi_Fungsi_Nur_Wakhid.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const handleSaveCanvaUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateCanvaUrl(customCanvaUrl);
    setUrlSavedMsg('Tautan Canva Sheet Pengembang berhasil diperbarui!');
    setTimeout(() => setUrlSavedMsg(''), 3000);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !noAbsen.trim()) return;
    await onAddManualScore({
      nama,
      kelas,
      noAbsen,
      sekolah,
      skorPbl,
      skorGame
    });
    setNama('');
    setNoAbsen('');
  };

  return (
    <section className="space-y-6">
      {/* Header & Developer Canva Sheet Actions */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="text-xs font-medium text-sky-700 mb-1">
              Portal Data Daftar Nilai Canva Sheet · Akses Pengembang: {APP_CONFIG.developerName}
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Daftar Nilai Siswa &amp; Sinkronisasi Canva Sheet
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Struktur Kolom Entri Pengguna Game: <strong className="font-mono text-slate-900">[Nama, Kelas, No Absen, Sekolah]</strong> terintegrasi otomatis dengan Skor LKPD PBL &amp; Skor Game.
            </p>
          </div>

          {/* Primary Canva Sheet Developer Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyForCanvaSheet}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              {copiedCanva ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersalin! Siap Paste (Ctrl+V) di Canva Sheet</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Tabel ke Canva Sheet</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadCanvaCsv}
              className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh CSV Canva Sheet</span>
            </button>

            <a
              href={canvaSheetUrl || 'https://www.canva.com/sheets/'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Buka Canva Sheet Pengembang</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setShowDeveloperPanel((p) => !p)}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Panel Pengembang</span>
            </button>
          </div>
        </div>

        {/* Summary Metrics Row (Clean Unboxed Tabular Readout) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-1 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <div className="text-slate-500">Total Entri Siswa</div>
            <div className="text-lg font-mono font-bold text-slate-900 tabular-nums mt-0.5">
              {filteredScores.length} Siswa
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <div className="text-slate-500">Rata-Rata Nilai Akhir</div>
            <div className="text-lg font-mono font-bold text-sky-800 tabular-nums mt-0.5">
              {avgScore} / 100
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <div className="text-slate-500">Pengembang E-Modul</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">
              {APP_CONFIG.developerName}
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
            <div className="text-slate-500">Sekolah Utama</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">
              SMP Negeri 1 Bantarkawung
            </div>
          </div>
        </div>

        {/* Collapsible Developer Configuration & Quick Entry */}
        {showDeveloperPanel && (
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Canva Sheet Link Config for Developer NUR WAKHID, S.Pd */}
            <form
              onSubmit={handleSaveCanvaUrl}
              className="lg:col-span-5 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
            >
              <div className="text-xs font-semibold text-slate-900">
                Pengaturan Tautan Canva Sheet (Akses Pengembang: {APP_CONFIG.developerName})
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tempelkan URL desain Canva Sheet milik pengembang di bawah ini agar tombol <strong>Buka Canva Sheet Pengembang</strong> langsung mengarah ke lembar kerja Anda. Cara ekspor tercepat: klik <strong>Salin Tabel ke Canva Sheet</strong> lalu tekan <code className="font-mono bg-white px-1 border rounded">Ctrl+V</code> di sel pertama Canva Sheet.
              </p>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customCanvaUrl}
                  onChange={(e) => setCustomCanvaUrl(e.target.value)}
                  placeholder="https://www.canva.com/design/..."
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-sky-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md whitespace-nowrap"
                >
                  Simpan Link
                </button>
              </div>
              {urlSavedMsg && (
                <p className="text-xs font-medium text-emerald-700">
                  ● {urlSavedMsg}
                </p>
              )}
            </form>

            {/* Right: Quick Manual Entry Form matching [Nama, Kelas, No Absen, Sekolah] */}
            <form
              onSubmit={handleManualSubmit}
              className="lg:col-span-7 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
            >
              <div className="text-xs font-semibold text-slate-900">
                Tambah / Perbarui Entri Nilai Siswa Manual [Nama, Kelas, No Absen, Sekolah]
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Siswa *"
                  required
                  className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                />
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                >
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={noAbsen}
                  onChange={(e) => setNoAbsen(e.target.value)}
                  placeholder="No Absen (mis: 08) *"
                  required
                  className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                />
                <input
                  type="text"
                  value={sekolah}
                  onChange={(e) => setSekolah(e.target.value)}
                  placeholder="Sekolah"
                  className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                />
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-600 shrink-0">PBL:</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={skorPbl}
                    onChange={(e) => setSkorPbl(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-600 shrink-0">Game:</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={skorGame}
                    onChange={(e) => setSkorGame(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-md flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambahkan ke Daftar Nilai</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa, no absen, atau sekolah..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-sky-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setFilterKelas('ALL')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                filterKelas === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Kelas
            </button>
            {['VIII A', 'VIII B', 'VIII C', 'VIII D'].map((kls) => (
              <button
                key={kls}
                type="button"
                onClick={() => setFilterKelas(kls)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  filterKelas === kls
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {kls}
              </button>
            ))}
          </div>
        </div>

        {/* Main Score Table with exact header columns [Nama, Kelas, No Absen, Sekolah] */}
        <div className="border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs">
                <th className="py-3 px-3 font-semibold text-center w-10">No</th>
                <th className="py-3 px-3.5 font-semibold">Nama</th>
                <th className="py-3 px-3 font-semibold">Kelas</th>
                <th className="py-3 px-3 font-semibold text-center">No Absen</th>
                <th className="py-3 px-3.5 font-semibold">Sekolah</th>
                <th className="py-3 px-3 font-semibold text-right">Skor PBL</th>
                <th className="py-3 px-3 font-semibold text-right">Skor Game</th>
                <th className="py-3 px-3 font-semibold text-right">Nilai Akhir</th>
                <th className="py-3 px-3.5 font-semibold">Predikat Kritis</th>
                <th className="py-3 px-3 font-semibold">Waktu Entri</th>
                <th className="py-3 px-2.5 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs tabular-nums">
              {filteredScores.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-500">
                    Belum ada data nilai untuk filter ini. Silakan kerjakan LKPD PBL atau Game Detektif.
                  </td>
                </tr>
              ) : (
                filteredScores.map((row, index) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 text-center font-mono text-slate-500">
                      {index + 1}
                    </td>
                    <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                      {row.nama}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                      {row.kelas}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-800">
                      {row.noAbsen}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-700">
                      {row.sekolah}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                      {row.skorPbl}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                      {row.skorGame}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-sky-800">
                      {row.nilaiAkhir}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-800 whitespace-nowrap">
                      {row.predikat}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {row.waktu}
                    </td>
                    <td className="py-2.5 px-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => onDeleteScore(row.id)}
                        title="Hapus entri"
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
