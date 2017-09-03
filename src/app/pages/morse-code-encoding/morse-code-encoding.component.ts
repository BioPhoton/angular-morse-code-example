import {Component, ViewChildren, WrappedValue} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MorseCodeDecoderService} from '../../core/service/morse-code.service';
import {MorseDisplayComponent} from '../../shared/components/morse-display/morse-display.component';

@Component({
  selector: 'morse-code-encoding',
  templateUrl: './morse-code-encoding.component.html'
})
export class MorseCodeEncodingComponent {

  isMuted = true;

  @ViewChildren(MorseDisplayComponent)
  morseCodeDisplaysQueryList

  startEvents$: Observable<number>
  stopEvents$: Observable<number>
  morseChar$: Observable<string>
  morseSymbol$: Observable<string>
  morseLetter$: Observable<string>

  constructor(public ms: MorseCodeDecoderService) {
    this.startEvents$ = ms.startEvents$.map(n => WrappedValue.wrap(n)) as any
    this.stopEvents$ = ms.stopEvents$.map(n => WrappedValue.wrap(n)) as any
    this.morseChar$ = ms.morseChar$.map(n => WrappedValue.wrap(n)) as any
    this.morseSymbol$ = ms.morseSymbol$.map(n => WrappedValue.wrap(n)) as any
    this.morseLetter$ = ms.morseLetter$.map(n => WrappedValue.wrap(n)) as any
  }

  sendStartSignal() {
    this.ms.sendStartTime(Date.now())
  }

  sendStopSignal() {
    this.ms.sendStopTime(Date.now())
  }

  toggleMuted() {
    this.isMuted = !this.isMuted;
  }

  resetAll() {
    this.morseCodeDisplaysQueryList.forEach((display) => {
      display.reset()
    })
  }
}
