import React, { useState } from 'react';
import { RotateCcw, Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles, Sliders } from 'lucide-react';

interface MappingPair {
  from: string;
  to: string;
}

const DOMAIN_ITEMS = ['A1', 'A2', 'A3', 'A4'];
const CODOMAIN_ITEMS = ['B1', 'B2', 'B3', 'B4'];

const PRESET_MAPPINGS: {
  name: string;
  desc: string;
  pairs: MappingPair[];
}[] = [
  {
    name: 'Kasus 1: Fungsi (Pemetaan)',
    desc: 'Setiap anggota A punya tepat 1 pasangan di B (meski B2 dipilih dua kali).',
    pairs: [
      { from: 'A1', to: 'B1' },
      { from: 'A2', to: 'B2' },
      { from: 'A3', to: 'B2' },
      { from: 'A4', to: 'B4' }
    ]
  },
  {
    name: 'Kasus 2: Korespondensi 1-1',
    desc: 'Setiap anggota A dan B berpasangan tepat satu-satu tanpa cabang.',
    pairs: [
      { from: 'A1', to: 'B3' },
      { from: 'A2', to: 'B1' },
      { from: 'A3', to: 'B4' },
      { from: 'A4', to: 'B2' }
    ]
  },
  {
    name: 'Kasus 3: Bukan Fungsi (Bercabang)',
    desc: 'Anggota A2 memiliki 2 cabang pasangan di B (B1 dan B3).',
    pairs: [
      { from: 'A1', to: 'B1' },
      { from: 'A2', to: 'B1' },
      { from: 'A2', to: 'B3' },
      { from: 'A3', to: 'B2' },
      { from: 'A4', to: 'B4' }
    ]
  },
  {
    name: 'Kasus 4: Bukan Fungsi (Kosong)',
    desc: 'Anggota A3 tidak memiliki pasangan sama sekali di himpunan B.',
    pairs: [
      { from: 'A1', to: 'B2' },
      { from: 'A2', to: 'B3' },
      { from: 'A4', to: 'B1' }
    ]
  }
];

export const InteractiveSimulations: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'mapping' | 'machine'>('mapping');

  // Lab 1 State: Diagram Panah Builder
  const [pairs, setPairs] = useState<MappingPair[]>(PRESET_MAPPINGS[0].pairs);
  const [selectedFrom, setSelectedFrom] = useState<string>('A1');

  // Lab 2 State: Mesin Fungsi f(x) = ax + b
  const [coefA, setCoefA] = useState<number>(2);
  const [constB, setConstB] = useState<number>(1);
  const [inputX, setInputX] = useState<number>(2);

  // Toggle pair in Lab 1
  const handleTogglePair = (from: string, to: string) => {
    const exists = pairs.some((p) => p.from === from && p.to === to);
    if (exists) {
      setPairs(pairs.filter((p) => !(p.from === from && p.to === to)));
    } else {
      setPairs([...pairs, { from, to }]);
    }
  };

  // Critical Thinking Diagnostic for Lab 1
  const domainCounts = DOMAIN_ITEMS.map((d) => ({
    item: d,
    targets: pairs.filter((p) => p.from === d).map((p) => p.to)
  }));

  const codomainCounts = CODOMAIN_ITEMS.map((c) => ({
    item: c,
    sources: pairs.filter((p) => p.to === c).map((p) => p.from)
  }));

  const unmappedDomain = domainCounts.filter((d) => d.targets.length === 0);
  const branchedDomain = domainCounts.filter((d) => d.targets.length > 1);
  const isFunction = unmappedDomain.length === 0 && branchedDomain.length === 0;
  const isOneToOne =
    isFunction &&
    DOMAIN_ITEMS.length === CODOMAIN_ITEMS.length &&
    codomainCounts.every((c) => c.sources.length === 1);

  const rangeItems = CODOMAIN_ITEMS.filter((c) => pairs.some((p) => p.to === c));

  // Lab 2 calculations
  const outputY = coefA * inputX + constB;
  const sampleXValues = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section className="space-y-8">
      {/* Header & Lab Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <p className="text-xs font-medium text-sky-700 mb-1">
            Tahap Penyelidikan PBL · Eksplorasi Visual &amp; Pembuktian Kritis
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Laboratorium Simulasi Relasi &amp; Fungsi
          </h2>
        </div>

        {/* Interactive Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start">
          <button
            type="button"
            onClick={() => setActiveLab('mapping')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeLab === 'mapping'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            01. Simulator Diagram Panah &amp; Detektor Fungsi
          </button>
          <button
            type="button"
            onClick={() => setActiveLab('machine')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeLab === 'machine'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            02. Mesin Fungsi Linear f(x) = ax + b
          </button>
        </div>
      </div>

      {activeLab === 'mapping' ? (
        /* TWO-ZONE SANDBOX LAYOUT: LAB 1 */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT ZONE (65% -> 8 cols): Interactive Visual Stage */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Kanvas Interaktif Diagram Panah (Himpunan A → Himpunan B)
                </h3>
                <p className="text-xs text-slate-600">
                  Klik anggota Domain A di kiri, lalu klik anggota Kodomain B di kanan untuk menambah atau menghapus anak panah.
                </p>
              </div>

              {/* Status Indicator with explicit text & icon (No Hue-Only Signaling) */}
              <div
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold flex items-center gap-2 border ${
                  isOneToOne
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : isFunction
                    ? 'bg-sky-50 text-sky-900 border-sky-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}
              >
                {isOneToOne ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>◆ KORESPONDENSI SATU-SATU</span>
                  </>
                ) : isFunction ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                    <span>● FUNGSI (PEMETAAN) VALID</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>▲ RELASI BIASA (BUKAN FUNGSI)</span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive SVG Mapping Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 bg-slate-50 border border-slate-200/80 rounded-lg p-4">
                <svg
                  viewBox="0 0 420 290"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Diagram Panah Interaktif Himpunan A ke Himpunan B"
                >
                  <defs>
                    <marker
                      id="arrow-valid"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
                    </marker>
                    <marker
                      id="arrow-branch"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#D97706" />
                    </marker>
                  </defs>

                  {/* Labels */}
                  <text x="85" y="24" textAnchor="middle" className="fill-slate-800 text-xs font-bold">
                    DOMAIN (A)
                  </text>
                  <text x="335" y="24" textAnchor="middle" className="fill-slate-800 text-xs font-bold">
                    KODOMAIN (B)
                  </text>

                  {/* Set Ellipses */}
                  <rect
                    x="35"
                    y="34"
                    width="100"
                    height="236"
                    rx="48"
                    fill="#F0F9FF"
                    stroke="#93C5FD"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="285"
                    y="34"
                    width="100"
                    height="236"
                    rx="48"
                    fill="#F8FAFC"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />

                  {/* Connection Arrows */}
                  {pairs.map((pair) => {
                    const fromIdx = DOMAIN_ITEMS.indexOf(pair.from);
                    const toIdx = CODOMAIN_ITEMS.indexOf(pair.to);
                    if (fromIdx === -1 || toIdx === -1) return null;
                    const y1 = 68 + fromIdx * 54;
                    const y2 = 68 + toIdx * 54;
                    const isBranchedSource =
                      pairs.filter((p) => p.from === pair.from).length > 1;
                    return (
                      <line
                        key={`${pair.from}-${pair.to}`}
                        x1="120"
                        y1={y1}
                        x2="296"
                        y2={y2}
                        stroke={isBranchedSource ? '#D97706' : '#0284C7'}
                        strokeWidth="2.5"
                        markerEnd={
                          isBranchedSource ? 'url(#arrow-branch)' : 'url(#arrow-valid)'
                        }
                      />
                    );
                  })}

                  {/* Domain Nodes (Clickable) */}
                  {DOMAIN_ITEMS.map((item, idx) => {
                    const cy = 68 + idx * 54;
                    const count = pairs.filter((p) => p.from === item).length;
                    const isSelected = selectedFrom === item;
                    return (
                      <g
                        key={item}
                        onClick={() => setSelectedFrom(item)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx="85"
                          cy={cy}
                          r="21"
                          fill={
                            isSelected
                              ? '#0284C7'
                              : count === 1
                              ? '#FFFFFF'
                              : '#FEF3C7'
                          }
                          stroke={
                            isSelected
                              ? '#0369A1'
                              : count === 1
                              ? '#0284C7'
                              : '#D97706'
                          }
                          strokeWidth={isSelected ? '3' : '2'}
                        />
                        <text
                          x="85"
                          y={cy + 4}
                          textAnchor="middle"
                          className="text-xs font-mono font-bold"
                          fill={isSelected ? '#FFFFFF' : '#0F172A'}
                        >
                          {item}
                        </text>
                      </g>
                    );
                  })}

                  {/* Codomain Nodes (Clickable to toggle pair from selectedFrom) */}
                  {CODOMAIN_ITEMS.map((item, idx) => {
                    const cy = 68 + idx * 54;
                    const isLinkedFromSelected = pairs.some(
                      (p) => p.from === selectedFrom && p.to === item
                    );
                    const isInRange = rangeItems.includes(item);
                    return (
                      <g
                        key={item}
                        onClick={() => handleTogglePair(selectedFrom, item)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx="335"
                          cy={cy}
                          r="21"
                          fill={
                            isLinkedFromSelected
                              ? '#059669'
                              : isInRange
                              ? '#ECFDF5'
                              : '#FFFFFF'
                          }
                          stroke={
                            isLinkedFromSelected
                              ? '#047857'
                              : isInRange
                              ? '#059669'
                              : '#94A3B8'
                          }
                          strokeWidth="2"
                        />
                        <text
                          x="335"
                          y={cy + 4}
                          textAnchor="middle"
                          className="text-xs font-mono font-bold"
                          fill={isLinkedFromSelected ? '#FFFFFF' : '#0F172A'}
                        >
                          {item}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Quick Pair Matrix Controls */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-xs font-semibold text-slate-800 mb-2">
                    Sakelar Pasangan untuk Anggota{' '}
                    <span className="font-mono text-sky-700 font-bold">{selectedFrom}</span>:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {CODOMAIN_ITEMS.map((bItem) => {
                      const active = pairs.some(
                        (p) => p.from === selectedFrom && p.to === bItem
                      );
                      return (
                        <button
                          key={bItem}
                          type="button"
                          onClick={() => handleTogglePair(selectedFrom, bItem)}
                          className={`px-3 py-2 rounded-md text-xs font-mono font-medium border flex items-center justify-between transition-colors ${
                            active
                              ? 'bg-sky-700 text-white border-sky-800'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>
                            ({selectedFrom}, {bItem})
                          </span>
                          <span>{active ? '✓ Aktif' : '+ Hubung'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Set Notation Readout */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Domain (Df): </span>
                    <span className="font-mono text-slate-900">
                      {`{ ${DOMAIN_ITEMS.join(', ')} }`}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Kodomain (Kf): </span>
                    <span className="font-mono text-slate-900">
                      {`{ ${CODOMAIN_ITEMS.join(', ')} }`}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Range (Rf): </span>
                    <span className="font-mono font-semibold text-emerald-800">
                      {rangeItems.length > 0 ? `{ ${rangeItems.join(', ')} }` : '{ ∅ }'}
                    </span>
                  </div>
                  <div className="pt-1 border-t border-slate-200">
                    <span className="font-semibold text-slate-700">
                      Himpunan Pasangan Berurutan:
                    </span>
                    <p className="font-mono text-slate-900 mt-1 break-words">
                      {pairs.length > 0
                        ? `{ ${pairs.map((p) => `(${p.from}, ${p.to})`).join(', ')} }`
                        : '{ } (Belum ada pasangan)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT ZONE (35% -> 4 cols): Control & Concept Deck */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Panel Skenario &amp; Diagnosis Berpikir Kritis
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Pilih skenario kasus di bawah atau uji susunan panahmu sendiri.
              </p>
            </div>

            {/* Preset Case Buttons */}
            <div className="space-y-2">
              {PRESET_MAPPINGS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setPairs(preset.pairs)}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 transition-colors"
                >
                  <div className="text-xs font-semibold text-slate-900">
                    {preset.name}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {preset.desc}
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPairs([])}
                className="w-full px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Kosongkan Semua Panah</span>
              </button>
            </div>

            {/* Detailed Critical Thinking Proof Box */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-semibold text-slate-900">
                Bukti Analisis Kritis Anggota Domain (A):
              </h4>
              <div className="space-y-1.5">
                {domainCounts.map((dc) => {
                  const statusOk = dc.targets.length === 1;
                  return (
                    <div
                      key={dc.item}
                      className={`px-3 py-2 rounded-md text-xs font-mono flex items-center justify-between border ${
                        statusOk
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/80 border-amber-200 text-amber-950'
                      }`}
                    >
                      <span>
                        {dc.item} →{' '}
                        {dc.targets.length > 0 ? dc.targets.join(', ') : '(Kosong)'}
                      </span>
                      <span className="font-semibold">
                        {dc.targets.length === 1
                          ? '● Tepat 1'
                          : dc.targets.length === 0
                          ? '▲ Kosong (0)'
                          : `▲ Bercabang (${dc.targets.length})`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">
                  Rumus Kombinatorika Himpunan Ini:
                </div>
                <p className="font-mono">
                  • Banyak Fungsi A → B = 4⁴ = 256 fungsi
                </p>
                <p className="font-mono">
                  • Banyak Korespondensi 1-1 = 4! = 24 cara
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TWO-ZONE SANDBOX LAYOUT: LAB 2 (MESIN FUNGSI LINEAR) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT ZONE (8 cols): Interactive Coordinate Graph & Function Machine */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Visualisasi Mesin Fungsi &amp; Grafik Cartesius Real-Time
                </h3>
                <p className="text-xs text-slate-600">
                  Amati bagaimana perubahan gradien (a) dan konstanta (b) mengubah kemiringan garis serta nilai output f(x).
                </p>
              </div>
              <div className="px-3.5 py-1.5 bg-sky-50 border border-sky-200 rounded-md font-mono text-xs font-bold text-sky-900">
                f(x) = {coefA}x {constB >= 0 ? `+ ${constB}` : `- ${Math.abs(constB)}`}
              </div>
            </div>

            {/* Function Machine Flow Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
                <div className="text-xs text-slate-500">INPUT (Domain x)</div>
                <div className="text-xl font-mono font-bold text-slate-900 mt-1">
                  x = {inputX}
                </div>
              </div>
              <div className="p-3 bg-sky-700 text-white rounded-lg text-center shadow-xs">
                <div className="text-xs text-sky-100">PROSES MESIN FUNGSI</div>
                <div className="text-sm font-mono font-semibold mt-1">
                  f({inputX}) = {coefA}({inputX}) {constB >= 0 ? `+ ${constB}` : `- ${Math.abs(constB)}`}
                </div>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-center">
                <div className="text-xs text-emerald-800">OUTPUT (Bayangan y)</div>
                <div className="text-xl font-mono font-bold text-emerald-900 mt-1">
                  f({inputX}) = {outputY}
                </div>
              </div>
            </div>

            {/* Cartesian Graph + Table */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-3">
                <svg
                  viewBox="0 0 320 260"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Grafik Fungsi Linear pada Bidang Cartesius"
                >
                  {/* Grid Lines */}
                  {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((g) => {
                    const xPos = 160 + g * 28;
                    return (
                      <line
                        key={`vx-${g}`}
                        x1={xPos}
                        y1="15"
                        x2={xPos}
                        y2="245"
                        stroke={g === 0 ? '#334155' : '#E2E8F0'}
                        strokeWidth={g === 0 ? '1.8' : '1'}
                      />
                    );
                  })}
                  {[-10, -5, 0, 5, 10].map((g) => {
                    const yPos = 130 - g * 9;
                    return (
                      <g key={`hy-${g}`}>
                        <line
                          x1="20"
                          y1={yPos}
                          x2="300"
                          y2={yPos}
                          stroke={g === 0 ? '#334155' : '#E2E8F0'}
                          strokeWidth={g === 0 ? '1.8' : '1'}
                        />
                        {g !== 0 && (
                          <text
                            x="154"
                            y={yPos + 3}
                            textAnchor="end"
                            className="fill-slate-500 text-[9px] font-mono"
                          >
                            {g}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Line Plot from x = -4 to x = 4 */}
                  {(() => {
                    const x1 = -4;
                    const y1 = coefA * x1 + constB;
                    const x2 = 4;
                    const y2 = coefA * x2 + constB;
                    const svgX1 = 160 + x1 * 28;
                    const svgY1 = 130 - y1 * 9;
                    const svgX2 = 160 + x2 * 28;
                    const svgY2 = 130 - y2 * 9;
                    return (
                      <line
                        x1={svgX1}
                        y1={svgY1}
                        x2={svgX2}
                        y2={svgY2}
                        stroke="#0284C7"
                        strokeWidth="2.5"
                      />
                    );
                  })()}

                  {/* Plotted Sample Points */}
                  {sampleXValues.map((sx) => {
                    const sy = coefA * sx + constB;
                    const cx = 160 + sx * 28;
                    const cy = 130 - sy * 9;
                    const isCurrent = sx === inputX;
                    if (cy < 10 || cy > 250) return null;
                    return (
                      <g key={sx}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isCurrent ? '6' : '3.5'}
                          fill={isCurrent ? '#059669' : '#0284C7'}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                        {isCurrent && (
                          <text
                            x={cx + 8}
                            y={cy - 8}
                            className="fill-emerald-900 text-[10px] font-mono font-bold"
                          >
                            ({sx}, {sy})
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Tabular Function Values */}
              <div className="md:col-span-5">
                <div className="text-xs font-semibold text-slate-800 mb-2">
                  Tabel Pasangan Berurutan (x, f(x)):
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs font-mono tabular-nums">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-1.5 px-3 text-left">Input (x)</th>
                        <th className="py-1.5 px-3 text-right">f(x)</th>
                        <th className="py-1.5 px-3 text-right">Titik (x, y)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sampleXValues.map((sx) => {
                        const sy = coefA * sx + constB;
                        const active = sx === inputX;
                        return (
                          <tr
                            key={sx}
                            onClick={() => setInputX(sx)}
                            className={`cursor-pointer ${
                              active
                                ? 'bg-emerald-50 font-bold text-emerald-950'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <td className="py-1.5 px-3">{sx}</td>
                            <td className="py-1.5 px-3 text-right">{sy}</td>
                            <td className="py-1.5 px-3 text-right">
                              ({sx}, {sy})
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT ZONE (4 cols): Parameter Sliders & Concept Deck */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-700" />
                <span>Kontrol Parameter Mesin</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setCoefA(2);
                  setConstB(1);
                  setInputX(2);
                }}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Labeled Sliders with Explicit Values & Units */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Koefisien Kemiringan (a):</span>
                  <span className="font-mono font-bold text-sky-800">{coefA} satuan/x</span>
                </div>
                <input
                  type="range"
                  min={-3}
                  max={3}
                  step={1}
                  value={coefA}
                  onChange={(e) => setCoefA(Number(e.target.value))}
                  className="w-full accent-sky-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>-3 (Turun)</span>
                  <span>0 (Konstan)</span>
                  <span>+3 (Naik)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Konstanta Awal (b / titik potong Y):</span>
                  <span className="font-mono font-bold text-sky-800">{constB} satuan</span>
                </div>
                <input
                  type="range"
                  min={-5}
                  max={5}
                  step={1}
                  value={constB}
                  onChange={(e) => setConstB(Number(e.target.value))}
                  className="w-full accent-sky-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>-5</span>
                  <span>0</span>
                  <span>+5</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">Nilai Input Uji (x):</span>
                  <span className="font-mono font-bold text-emerald-800">x = {inputX}</span>
                </div>
                <input
                  type="range"
                  min={-3}
                  max={3}
                  step={1}
                  value={inputX}
                  onChange={(e) => setInputX(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>x = -3</span>
                  <span>x = 0</span>
                  <span>x = +3</span>
                </div>
              </div>
            </div>

            {/* Real-time Concept Annotation */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
              <div className="font-semibold text-slate-900">
                Analisis Kritis Grafik Saat Ini:
              </div>
              <p className="text-slate-700">
                {coefA > 0
                  ? `• Karena a = ${coefA} (> 0), grafik bergerak NAIK ke kanan. Setiap x bertambah 1 satuan, nilai f(x) bertambah ${coefA}.`
                  : coefA < 0
                  ? `• Karena a = ${coefA} (< 0), grafik bergerak TURUN ke kanan. Setiap x bertambah 1 satuan, nilai f(x) berkurang ${Math.abs(coefA)}.`
                  : `• Karena a = 0, terbentuk FUNGSI KONSTAN f(x) = ${constB}. Berapapun input x, hasilnya tetap ${constB}.`}
              </p>
              <p className="text-slate-700">
                • Garis memotong sumbu-Y tepat di titik{' '}
                <span className="font-mono font-semibold text-slate-900">
                  (0, {constB})
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
