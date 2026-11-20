import {
  Counter,
  EDCounter,
  EDCounterLabel,
  TotalCounter,
  TotalCounterLabel,
} from "./count";

export const TOTAL_COUNTER_LABELS: TotalCounterLabel[] = [
  { value: "MO", label: "MO", description: "MO Category III is MOPD" },
  { value: "SO", label: "SO" },
  { value: "GE", label: "GE", description: "GE Category III is GOPD" },
  { value: "SPECIAL", label: "SP", description: "SP is Specialities" },
];

export const DEFAULT_TOTAL_COUNTER: TotalCounter = {
  MO: { I: 0, II: 0, III: 0 },
  SO: { I: 0, II: 0, III: 0 },
  GE: { I: 0, II: 0, III: 0 },
  SPECIAL: { I: 0, II: 0, III: 0 },
  ED: { I: 0, II: 0, III: 0 },
  //   BD: 0,
  //   DOG_BITE: 0,
  //   ADMIT: 0,
};

export const ED_COUNTER_LABELS: EDCounterLabel[] = [
  { value: "OPD", label: "OPD" },
  { value: "MO", label: "MO" },
  { value: "SO", label: "SO" },
  { value: "TRAUMA", label: "Trauma" },
  { value: "NSU_TRAUMA", label: "NSU T" },
  { value: "NSU_NON_TRAUMA", label: "NSU NT" },
  { value: "PMFU", label: "PMFU" },
  { value: "CVMU", label: "CVMU" },
  { value: "CICU", label: "CICU" },
  { value: "ICU", label: "ICU" },
  { value: "DEATH", label: "DEATH" },
  { value: "ABSCOND", label: "Abscond" },
];

export const DEFAULT_ED_COUNTER: EDCounter = {
  OPD: 0,
  MO: 0,
  SO: 0,
  TRAUMA: 0,
  ABSCOND: 0,
  NSU_TRAUMA: 0,
  NSU_NON_TRAUMA: 0,
  PMFU: 0,
  ICU: 0,
  CICU: 0,
  CVMU: 0,
  DEATH: 0,
};

export const DEFAULT_COUNTER: Counter = {
  total: DEFAULT_TOTAL_COUNTER,
  ED: DEFAULT_ED_COUNTER,
  ADMIT: 0,
  DOG_BITE: 0,
  BD: 0,
};
