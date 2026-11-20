export type Category = {
  I: number;
  II: number;
  III: number;
};

export type TotalCounter = {
  MO: Category;
  SO: Category;
  GE: Category;
  SPECIAL: Category;
  ED: Category;
};

export type EDCounter = {
  OPD: number;
  MO: number;
  SO: number;
  TRAUMA: number;
  NSU_TRAUMA: number;
  NSU_NON_TRAUMA: number;
  PMFU: number;
  ABSCOND: number;
  ICU: number;
  CICU: number;
  CVMU: number;
  DEATH: number;
};

export type Counter = {
  total: TotalCounter;
  ED: EDCounter;
  BD: number;
  DOG_BITE: number;
  ADMIT: number;
};

export interface StoredCounter extends Counter {
  id: string;
  date: string;
}

export type CounterLabel<T> = {
  value: keyof T;
  label: string;
  description?: string;
};

export type TotalCounterLabel = CounterLabel<TotalCounter>;
export type EDCounterLabel = CounterLabel<EDCounter>;
