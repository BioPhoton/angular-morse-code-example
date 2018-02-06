import {Inject, Injectable} from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';

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

  // 1. setup subject for start timestamps
  private _startEvents$: Subject<number>
  get startEvents$(): Observable<number> {
    return null;
  }

  // 2. setup subject for stop timestamps

  // 3. define observable for the translation from timestamps to morse character ("-", ".")

  // define observable for the translation from morse character to morse symbols ("-.","--." )

  // define observable for the translation from morse symbols to letters ("N", "G")

  // setup subject to to inject morse characters

  constructor(
    @Inject(MorseTimeRanges) private mR,
    @Inject(MorseCharacters) private mC,
    @Inject(MorseTranslations) private mT
  ) {

    // create stream of morse characters i. e. ".", "-", "+", "*"
    //
    //  startEvents$: -d------d------|
    //   stopEvents$: --u---------u--|
    // combine streams to arrays of start and end => http://rxmarbles.com/#combineLatest
    // combineLatest: --du----ud--du-|
    // map array to time diff i.e. -42 or 108
    //           map: --n------n--n--|
    // map milliseconds to morse code i.e. ".", "-", "+", "*"
    //           map: --c------c--c--|
    // filter out short breaks ("+")
    //        filter: --c---------c--|
    // injectMorseChar$: --c---c-----|
    //         merge: --c--c---c--c--|
    //// this._morseChar$ =

    // create stream of morse symbols i. e. .,-,*,.,*,  =>  ".-", "."
    //  morseChar$: --c-c-c-c-c-c-c---|
    // longBreaks$: --------l-----l---|
    // group characters to arrays at every long break
    //      buffer: --------cccc--ccc-|
    // translate the array to a string
    //         map: --------s-----s---|
    // filter out empty strings
    //      filter: --------s---------|
    //// this._morseSymbol$ = this.morseChar$

    // create stream of letters i. e. "S", "D"

    //  morseSymbol$: ---s-----s---s-----|
    //     switchMap: ---s-----s---s-----|
    // saveTranslate:     `-t|  `-e|`-t|
    //// this._morseLetter$



    //// const longBreak = Math.abs(this.mR.longBreak);

    //        tick$: ----t--t--t--t--t--|
    //        take4: ----t--t--t--t|
    //    startEvents$: ----s-----------|
    //    takeUntil: ----t--t|
    //// const breakEmitter$

    //  _stopEvents$: ---s---s---------|
    //     switchMap: -----bb----bbbb--|
    //// this._stopEvents$

  }

  sendStartTime(timestamp: number): void {
    // space for validation
  }

  sendStopTime(timestamp: number): void {
    // space for validation
  }

  injectMorseChar(char: string) {
    // space for validation
  }

  // custom operators -----------------------------------

  private saveTranslate(errorString: string): (source: Observable<string>) => Observable<any> {

      //        source: s---s-s---s--s--|
      //           map: s---#
      //    catchError: ----e|
      return null
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

  // used to show how to not handle an error
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
