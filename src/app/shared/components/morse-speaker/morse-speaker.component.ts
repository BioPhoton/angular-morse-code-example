import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {OscillatorService} from './oscillator/oscillator.service';


export const OscillatorFactory = function (): OscillatorService {
  return new OscillatorService({type: 'square', frequency: 660})
}


@Component({
  selector: 'morse-speaker',
  templateUrl: './morse-speaker.component.html',
  styleUrls: ['./morse-speaker.component.scss'],
  providers: [
    {
      provide: OscillatorService, useFactory: OscillatorFactory
    }
  ]
})
export class MorseSpeakerComponent implements OnChanges {

  isOpen: boolean;
  configForm: FormGroup;
  frequency$: Observable<number>;

  @Input()
  isMuted = true

  _isPlaying: boolean;
  @Input()
  set isPlaying(v: boolean) {
    if (v) {
      this.play();
    } else {
      this.pause();
    }
    this._isPlaying = v;
  };

  constructor(private o: OscillatorService, private fb: FormBuilder) {
    this.frequency$ = o.frequency$

    this.configForm = fb.group({
      frequency: 0,
    })

    this.configForm
      .valueChanges
      .subscribe(
        (settings: { frequency: number }) => {
          this.o.setFrequency(settings.frequency);
        }
      )
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('isMuted' in changes) {
      if (changes.isMuted.currentValue) {
        this.pause();
      }
    }
  }

  onFrequencyChange(f: number) {
    this.o.setFrequency(f);
  }

  play() {
    if (!this.isMuted && !this._isPlaying) {
      this._isPlaying = true;
      this.o.play()
    }
  }

  pause() {
    if (this._isPlaying) {
      this._isPlaying = false;
      this.o.pause();
    }
  }

  toggleMuted() {
    this.isMuted = !this.isMuted;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen
  }

}
