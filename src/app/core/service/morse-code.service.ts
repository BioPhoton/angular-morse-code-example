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

  private _stopEvents$: Subject<number>

  private _morseChar$: Observable<any>

  private _morseSymbol$: Observable<string>

  private _morseLetter$: Observable<string>

  private _injectMorseChar$: Subject<string>

  constructor(
    @Inject(MorseTimeRanges) private MorseTimeRanges,
    @Inject(MorseCharacters) private MorseCharacters,
    @Inject(MorseTranslations) private MorseTranslations
  ) {

    // create stream of morse characters i. e. ".", "-", "+", "*"
    // this._morseChar$

    // create stream of morse symbols i. e. "...", "-.."
    // this._morseSymbol$

    // create stream of letters i. e. "S", "D"
    // this._morseLetter$

    // handle extraordinary long breaks by send multiple long breaks

  }

  sendStartTime(timestamp: number): void {
    this._startEvents$.next(timestamp)
  }

  sendStopTime(timestamp: number): void {

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
