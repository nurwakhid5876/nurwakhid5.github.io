export interface StudentIdentity {
  nama: string;
  kelas: string;
  noAbsen: string;
  sekolah: string;
}

export interface ScoreRecord {
  id: string;
  nama: string;
  kelas: string;
  noAbsen: string;
  sekolah: string;
  skorPbl: number;
  skorGame: number;
  nilaiAkhir: number;
  predikat: string;
  detailBenar: string;
  waktu: string;
}

export interface QuizQuestion {
  id: number;
  caseTitle: string;
  criticalIndicator: 'Interpretasi' | 'Analisis' | 'Evaluasi' | 'Inferensi' | 'Eksplanasi';
  scenario: string;
  question: string;
  mathData?: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface EssayQuestion {
  id: number;
  title: string;
  criticalIndicator: string;
  problemStatement: string;
  subQuestions: string[];
  solutionSteps: string[];
  finalConclusion: string;
  maxScore: number;
}

export interface PblTask {
  id: string;
  stageNumber: number;
  stageName: string;
  criticalSkill: string;
  caseTitle: string;
  context: string;
  question: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  reflectionPrompt: string;
}
