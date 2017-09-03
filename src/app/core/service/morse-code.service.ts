import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';
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
    return this._startEvents$
  }

  private _stopEvents$: Subject<number> = new Subject<number>()
  get stopEvents$(): Observable<number> {
    return this._stopEvents$
  }

  private _morseChar$: Observable<string>
  get morseChar$(): Observable<string> {
    return this._morseChar$
  }

  private _injectedMorseChar$: Subject<string> = new Subject<string>()

  private _morseSymbol$: Observable<string>
  get morseSymbol$(): Observable<string> {
    return this._morseSymbol$;
  }

  private _morseLetter$: Observable<string>
  get morseLetter$(): Observable<string> {
    return this._morseLetter$;
  }

  constructor(
    @Inject(MorseTimeRanges) private MorseTimeRanges,
    @Inject(MorseCharacters) private MorseCharacters,
    @Inject(MorseTranslations) private MorseTranslations
  ) {

    // create stream of morse characters i. e. ".", "-", "+", "*"
    this._morseChar$ = Observable
    // merge the 2 streams and on every new value return the last value of each stream as an array
      .combineLatest(this._startEvents$, this._stopEvents$)
      // transform the array of timestamps to an absolute diff in milliseconds (positive or negative number)
      .map(this.toTimeDiff)
      // transform the milliseconds to the equivalent morse char
      .map(this.msToMorseChar)
      // filter out short breaks
      .filter(this.isCharNoShortBreak)
      // merge the _injectedMorseChar$ stream to the above result
      // this is an option to inject a morse character directly
      .merge(this._injectedMorseChar$)

    // create stream of morse symbols i. e. "...", "-.."
    this._morseSymbol$ = this._morseChar$
    // transform char to array of streams
    // open a buffer and close it if a long break is given
      .window(this._morseChar$.filter(this.isCharLongBreak))
      // transform the streams of arrays to a single stream with all values merged into it
      .flatMap(o => o.toArray())
      // transform the array of chars to a string
      .map(this.charArrayToSymbol)
      // filter out empty strings
      .filter(n => !!n)

    // create stream of letters i. e. "S", "D"
    this._morseLetter$ = this._morseSymbol$
    // .filter(this.isMorseSymbol)
    // continue after error by wrapping transformation with potential error in a switchMap
      .switchMap(n => Observable.of(n)
        // try to translate the string
        .map(this.translateSymbolToLetter)
        // if an error occures catch it and return 'ERROR' as next value
        .catch(err => Observable.of('ERROR'))
      )

    // Handle extraordinary long breaks by emitting a normal long break
    const msLongBreak = Math.abs(MorseTimeRanges.longBreak)
    this._stopEvents$
      .switchMap(() => Observable.timer(msLongBreak, msLongBreak).take(3))
      .subscribe(
        n =>
          this.sendMorseChar(MorseCharacters.longBreak)
      )
  }

  sendStartTime(timestamp: number): void {
    this._startEvents$.next(timestamp)
  }

  sendStopTime(timestamp: number): void {
    this._stopEvents$.next(timestamp)
  }

  sendMorseChar(char: string): void {
    this._injectedMorseChar$.next(char)
  }

  private toTimeDiff = (arr: number[]): number => {
    return arr[1] - arr[0]
  }

  private translateSymbolToLetter = (symbol: string): string => {
    const result = this.MorseTranslations
      .find(i => i.symbol === symbol)
    if (result) {
      return result.char
    }

    throw new Error(`Translation Error: Could not translate morse symbol ${symbol} to a letter`)
  }

  private msToMorseChar = (ms: number): string => {
    if (ms >= 0) {
      return (ms > this.MorseTimeRanges.shortMorse) ? this.MorseCharacters.longMorse : this.MorseCharacters.shortMorse
    } else {
      return (ms >= this.MorseTimeRanges.shortBreak) ? this.MorseCharacters.shortBreak : this.MorseCharacters.longBreak
    }
  }

  private charArrayToSymbol = (arr: string[]): string => {
    return arr.join('')
      .replace(this.MorseCharacters.longBreak, '')
  }

  private isMorseSymbol = (symbol: string): boolean => {
    return !!this.MorseTranslations
      .map(i => i.symbol)
      .find(str => str === symbol)
  }

  private isCharNoShortBreak = (char: string): boolean => {
    return char !== this.MorseCharacters.shortBreak
  }

  private isCharLongBreak = (char: string): boolean => {
    return char === this.MorseCharacters.longBreak
  }

}
