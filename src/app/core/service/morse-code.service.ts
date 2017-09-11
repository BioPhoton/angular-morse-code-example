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
    return this._injectMorseChar$
  }
  constructor(
    @Inject(MorseTimeRanges) private MorseTimeRanges,
    @Inject(MorseCharacters) private MorseCharacters,
    @Inject(MorseTranslations) private MorseTranslations
  ) {

    // create stream of morse characters i. e. ".", "-", "+", "*"
    this._morseChar$ =
      Observable
        .combineLatest(this._startEvents$, this._stopEvents$)
        .map(this.toTimeDiff)
        .map(this.msToMorseChar)
        .filter(this.isCharNoShortBreak)
        .merge(this._injectMorseChar$)

    // create stream of morse symbols i. e. "...", "-.."
    this._morseSymbol$ = this._morseChar$
      .window(this._morseChar$.filter(this.isCharLongBreak))
      .flatMap(o => o.toArray())
      .map(this.charArrayToSymbol)
      .filter(n => n !== '')

    // create stream of letters i. e. "S", "D"
    this._morseLetter$ = this.morseSymbol$
      // prevent errors by filtering falsy values
      // .filter(this.isMorseSymbol)
      .switchMap(n => Observable.of(n)
        .map(this.translateSymbolToLetter)
        .catch(e => Observable.of('ERROR'))
      )

    const longBreak = Math.abs(this.MorseTimeRanges.longBreak)
    this._stopEvents$
      .switchMap(n => Observable.timer(longBreak, longBreak).take(4).takeUntil(this._startEvents$))
      .subscribe(
        n => this.injectMorseChar(this.MorseCharacters.longBreak)
      )

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
    return arr.join('').replace(this.MorseCharacters.longBreak, '')
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
