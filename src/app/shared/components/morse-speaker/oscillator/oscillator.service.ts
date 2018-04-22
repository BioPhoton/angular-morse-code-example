import {Injectable} from '@angular/core';
import {IOscillatorConfig} from './IOscillatorConfig';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OscillatorService {

  private oscillator: OscillatorNode
  private audioCtx: AudioContext
  private config: IOscillatorConfig = {type: 'sine', frequency: 660}

  private _frequency$: Subject<number> = new BehaviorSubject(660);
  public get frequency$(): Observable<number> {
    return this._frequency$.asObservable();
  }

  static factory(config?: IOscillatorConfig): OscillatorService {
    return new OscillatorService(config)
  }

  constructor(config?: IOscillatorConfig) {
    this.config = config || this.config
    this.initOscillator()
  }

  private initOscillator(config?: { frequency: number }) {
    // create web audio api context
    this.audioCtx = new (window['AudioContext'] || window['webkitAudioContext'])();
    // create oscillator node
    this.oscillator = this.audioCtx.createOscillator()
    // config oscillator
    this.oscillator.type = this.config.type
    this.oscillator.frequency.setValueAtTime(this.config.frequency, 0)
    // start wave
    this.oscillator.start()
  }

  setFrequency (f) {
    if (f) {
      this.oscillator.frequency.setValueAtTime(f, 0);
      this._frequency$.next(this.oscillator.frequency.value);
    }
  }

  play() {
    this.oscillator.connect(this.audioCtx.destination)
  }

  pause() {
    this.oscillator.disconnect()
  }

}
