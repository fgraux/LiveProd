declare namespace timexe {
  type Timex = string;
  type ID = number;
  type Action<T> = (param?: T) => void;

  interface Result {
    result?: string;
    error?: string;
    id: ID;
  }

  interface Item<T> {
    timex: string;
    action: Action<T>;
    param: T;
    timeoutShortened: boolean;
  }
}

interface Timexe {
  <T>(timex: timexe.Timex, action: timexe.Action<T>, param?: T): timexe.Result;

  add<T>(timex: timexe.Timex, action: timexe.Action<T>, param?: T): timexe.Result;

  remove(id: timexe.ID): timexe.Result;

  get<T>(id?: timexe.ID): timexe.Item<T> | Array<timexe.Item<T>>;

  timeResolution: number;
  maxTimerDelay: number;
}

declare const timexe: Timexe;
export as namespace timexe;
export = timexe;