import {Inject, Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {
  MorseCharacters,
  MorseTimeRanges,
  MorseTranslations
} from '../token/injection-tokens';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {
  buffer, catchError, filter, map, merge, switchMap, take, takeUntil
} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {timer} from 'rxjs/observable/timer';

@Injectable()
export class MorseCodeProcessingService {
  private msLongBreak = Math.abs(this.mR.longBreak);

  private _startEvents$: Subject<number> = new Subject();
  // exposed observable
  public startEvents$: Observable<number> = this._startEvents$.asObservable();

  private _stopEvents$: Subject<number> = new Subject();
  // exposed observable
  public stopEvents$: Observable<number> = this._stopEvents$.asObservable();

  public morseChar$: Observable<any>;

  public morseSymbol$: Observable<any>;

  public morseLetter$: Observable<any>;

  constructor(
    @Inject(MorseTimeRanges) private mR,
    @Inject(MorseCharacters) private mC,
    @Inject(MorseTranslations) private mT
  ) {

    const breaks$ = timer(this.msLongBreak, this.msLongBreak).pipe(
      map(_ => this.mC.longBreak),
      take(4)
    );
    const autoBreaks$ = this.stopEvents$.pipe(
      switchMap(_ => breaks$.pipe(takeUntil(this.startEvents$)))
    );

    const obsToCombine = [this.startEvents$, this.stopEvents$];
    this.morseChar$ = combineLatest(...obsToCombine).pipe(
      map(this.toTimeDiff),
      map(this.msToMorseChar),
      filter(this.isCharNoShortBreak),
      merge(...[autoBreaks$])
    );

    const breaksOnly$ = this.morseChar$.pipe(filter(this.isCharLongBreak));
    this.morseSymbol$ = this.morseChar$.pipe(
      buffer(breaksOnly$),
      map(this.charArrayToSymbol),
      filter(s => !!s)
    );

    this.morseLetter$ = this.morseSymbol$.pipe(
      switchMap(sym => of(sym).pipe(
        map(this.translateSymbolToLetter),
        catchError(e => of('ERROR'))
      )
    )
    );
  }

  // exposed interactions

  sendStartTime(timestamp: number): void {
    // space for validation
    this._startEvents$.next(timestamp);
  }

  sendStopTime(timestamp: number): void {
    // space for validation
    this._stopEvents$.next(timestamp);
  }

  injectMorseChar(char: string) {
    // space for validation
  }

  // custom operators -----------------------------------

  private safeTranslate = (source: Observable<string>): Observable<string> => source;

  // helpers --------------------------------------------

  private toTimeDiff = (arr: number[]): number => arr[1] - arr[0]

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

  // used to show the wrong way of handling errors ;-)
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
