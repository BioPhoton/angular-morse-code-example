import {Inject, Injectable} from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import {Observable} from 'rxjs/Observable';


import {
  buffer,
  catchError,
  filter,
  map,
  merge,
  switchMap,
  take,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

import {
  MorseCharacters,
  MorseTimeRanges,
  MorseTranslations
} from '../token/injection-tokens';

@Injectable()
export class MorseCodeDecoderService {

  private _startEvents$: Subject<number> = new Subject<number>()
  get startEvents$(): Observable<number> {
    return this._startEvents$.asObservable();
  }

  private _stopEvents$: Subject<number> = new Subject<number>()
  get stopEvents$(): Observable<number> {
    return this._stopEvents$.asObservable();
  }

  private _morseChar$: Observable<any>
  get morseChar$(): Observable<any> {
    return this._morseChar$
  }

  private _morseSymbol$: Observable<string>
  get morseSymbol$(): Observable<string> {
    return this._morseSymbol$
  }

  private _morseLetter$: Observable<string>
  get morseLetter$(): Observable<string> {
    return this._morseLetter$
  }

  private _injectMorseChar$: Subject<string> = new Subject<string>()
  get injectMorseChar$(): Observable<string> {
    return this._injectMorseChar$.asObservable();
  }

  constructor(
    @Inject(MorseTimeRanges) private mR,
    @Inject(MorseCharacters) private mC,
    @Inject(MorseTranslations) private mT
  ) {

    // create stream of morse characters i. e. ".", "-", "+", "*"
    //
    //  startEvents$: -d------d------|
    //   stopEvents$: --u---------u--|
    // combine streams to arrays of start and end
    // combineLatest: --du----ud--du-|
    // map array to time diff i.e. -42 or 108
    //           map: --n------n--n--|
    // map milliseconds to morse code i.e. ".", "-", "+", "*"
    //           map: --c------c--c--|
    // filter out short breaks ("+")
    //        filter: --c---------c--|
    //
    // merge(this.injectMorseChar$)
    this._morseChar$ = Observable
      .combineLatest(this.startEvents$, this.stopEvents$)
      .pipe(
        map(this.toTimeDiff),
        map(this.msToMorseChar),
        filter(this.isCharNoShortBreak),
        merge(this.injectMorseChar$)
      );

    // create stream of morse symbols i. e. .,-,*,.,*,  =>  ".-", "."
    //  morseChar$: --c-c-c-c-c-c-c---|
    // longBreaks$: --------l-----l---|
    // group characters to arrays at every long break
    //      buffer: --------cccc--ccc-|
    // translate the array to a string
    //         map: --------s-----s---|
    // filter out empty strings
    //      filter: --------s---------|
    this._morseSymbol$ = this.morseChar$
      .pipe(
        buffer(this._morseChar$.pipe(filter(this.isCharLongBreak))),
        map(this.charArrayToSymbol),
        filter(n => n !== '')
      )

    // create stream of letters i. e. "S", "D"

    //  morseSymbol$: ---s-----s---s-----|
    //     switchMap: ---s-----s---s-----|
    // saveTranslate:     `-t|  `-e|`-t|
    this._morseLetter$ = this.morseSymbol$
      .pipe(
        // prevent errors by filtering falsey values is not the best approach
        // filter(this.isMorseSymbol)
        switchMap(n => Observable.of(n).pipe(this.saveTranslate('ERROR')))
      );

    const longBreak = Math.abs(this.mR.longBreak);

    //        tick$: ----t--t--t--t--t--|
    //        take4: ----t--t--t--t|
    //    startEvents$: ----s-----------|
    //    takeUntil: ----t--t|
    const breakEmitter$ = Observable
      .timer(longBreak, longBreak)
      .pipe(
        take(4),
        takeUntil(this._startEvents$)
      );

    this._stopEvents$
      .pipe(switchMap(n => breakEmitter$))
      .subscribe(n => this.injectMorseChar(this.mC.longBreak));
  }

  sendStartTime(timestamp: number): void {
    this._startEvents$.next(timestamp)
  }

  sendStopTime(timestamp: number): void {
    this._stopEvents$.next(timestamp)
  }

  injectMorseChar(char: string) {
    this._injectMorseChar$.next(char)
  }

  // custom operators -----------------------------------

  //  morseSymbol$: s---s-s---s--s--|
  //           map: s---#
  //    catchError: ----e|
  private saveTranslate(errorString: string): (source: Observable<string>) => Observable<any> {
    return (source: Observable<string>) => {
      return source
        .pipe(
          map(this.translateSymbolToLetter),
          catchError(e => Observable.of(errorString))
        );
    };
  }

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

  private isMorseSymbol = (symbol: string): boolean => {
    return !!this.mT
      .map(i => i.symbol)
      .find(str => str === symbol)
  }

  private isCharNoShortBreak = (char: string): boolean => {
    return char !== this.mC.shortBreak
  }

  private isCharLongBreak = (char: string): boolean => {
    return char === this.mC.longBreak
  }

}
