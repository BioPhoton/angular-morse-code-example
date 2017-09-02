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
  get injectedMorseChar$(): Observable<string> {
    return this._injectedMorseChar$;
  }
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
      .combineLatest(this.startEvents$, this.stopEvents$)
      .map(this.toTimeDiff)
      .map(this.msToMorseChar)
      .filter(this.isCharNoShortBreak)
      .merge(this._injectedMorseChar$)

    // create stream of morse symbols i. e. "...", "-.."
    this._morseSymbol$ = this.morseChar$
      .window(this.morseChar$.filter(this.isCharLongBreak))
      .flatMap(o => o.toArray())
      .map(this.charArrayToSymbol)
      .filter(n => !!n)

    // create stream of letters i. e. "S", "D"
    this._morseLetter$ = this.morseSymbol$
      .filter(this.isMorseSymbol)
      .map(this.symbolToLetter)

    const msLongBreak = Math.abs(MorseTimeRanges.longBreak)
    this.stopEvents$
      .switchMap(() => Observable.timer(msLongBreak, msLongBreak).first())
      .subscribe(
        n =>
          this.injectMorseChar(MorseCharacters.longBreak)
      )
  }

  startSignal(): void {
    this._startEvents$.next(Date.now())
  }

  stopSignal(): void {
    this._stopEvents$.next(Date.now())
  }

  injectMorseChar(char: string): void {
    this._injectedMorseChar$.next(char)
  }

  private toTimeDiff = (arr: number[]): number => {
    return arr[1] - arr[0]
  }

  private symbolToLetter = (symbol: string): string => {
    return this.MorseTranslations
      .find(i => i.symbol === symbol).char
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
