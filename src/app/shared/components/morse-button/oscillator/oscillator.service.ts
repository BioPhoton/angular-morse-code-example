import {Injectable} from '@angular/core';
import {IOscillatorConfig} from './IOscillatorConfig';

@Injectable()
export class OscillatorService {

  private oscillator: OscillatorNode
  private audioCtx: AudioContext
  private config: IOscillatorConfig = {type: 'sine', frequency: 660}

  static factory(config?: IOscillatorConfig): OscillatorService {
    return new OscillatorService(config)
  }

  constructor(config?: IOscillatorConfig) {
    this.config = config || this.config
    this.initOscillator()
  }

  private initOscillator() {
    // create web audio api context
    this.audioCtx = new (window['AudioContext'] || window['webkitAudioContext'])();
    // create oscillator node
    this.oscillator = this.audioCtx.createOscillator()
    // config oscillator
    this.oscillator.type = this.config.type
    this.oscillator.frequency.value = this.config.frequency
    // start wave
    this.oscillator.start()
  }

  play() {
    this.oscillator.connect(this.audioCtx.destination)
  }

  pause() {
    this.oscillator.disconnect()
  }

}
