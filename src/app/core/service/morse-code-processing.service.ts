import {Inject, Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {of} from 'rxjs/observable/of';
import {
  buffer, catchError, filter, map, mapTo, merge,
  switchMap, switchMapTo, take, takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {
  MorseCharacters,
  MorseTimeRanges,
  MorseTranslations
} from '../token/injection-tokens';

@Injectable()
export class MorseCodeProcessingService {
  private msLongBreak = Math.abs(this.mR.longBreak);

  private startEventsSubject: Subject<number> = new Subject();
  startEvents$: Observable<number> = this.startEventsSubject.asObservable();

  private stopEventsSubject: Subject<number> = new Subject();

  morseChar$: Observable<any>;

  morseSymbol$: Observable<any>;

  morseLetter$: Observable<any>;

  constructor(
    @Inject(MorseTimeRanges) private mR,
    @Inject(MorseCharacters) private mC,
    @Inject(MorseTranslations) private mT
  ) {

  }

  sendStartTime(timestamp: number): void {
    // space for validation
    this.startEventsSubject.next(timestamp);
  }

  sendStopTime(timestamp: number): void {
    // space for validation
  }

  injectMorseChar(char: string) {
    // space for validation
  }

  // custom operators -----------------------------------

  private safeTranslate = (source: Observable<string>) => source;

  // helpers --------------------------------------------

  private toTimeDiff = (arr: number[]): number => {
    return arr[1] - arr[0]
  }

  private translateSymbolToLetter = (symbol: string): string => {
    const result = this.mT
      .find(i => i.symbol === symbol)
    if (result) {
      return result.char
    }

    throw new Error(`Translation Error: Could not translate morse symbol ${symbol} to a letter`)
  }

  private msToMorseChar = (ms: number): string => {
    if (ms >= 0) {
      return (ms > this.mR.shortMorse) ? this.mC.longMorse : this.mC.shortMorse
    } else {
      return (ms >= this.mR.shortBreak) ? this.mC.shortBreak : this.mC.longBreak
    }
  }

  private charArrayToSymbol = (arr: string[]): string => {
    return arr.filter((v) => v !== this.mC.longBreak).join('')
  }

  // used to show how to not handle an error
  private isMorseSymbol = (sym: string): sym is string => {
    return !!this.mT
      .map(i => i.symbol)
      .find(str => str === sym)
  }

  private isCharNoShortBreak = (char: string): char is string => {
    return char !== this.mC.shortBreak
  }

  private isCharLongBreak = (char: string): char is string => {
    return char === this.mC.longBreak
  }

}
