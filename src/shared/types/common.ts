type Dict<T> = Record<string, T>;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type { DeepPartial, Dict };
