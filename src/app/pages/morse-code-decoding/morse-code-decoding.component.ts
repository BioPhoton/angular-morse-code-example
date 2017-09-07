import {Component, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MorseCodeDecoderService} from '../../core/service/morse-code.service';
import {MorseDisplayComponent} from '../../shared/components/morse-display/morse-display.component';

@Component({
  selector: 'morse-code-decoding',
  templateUrl: './morse-code-decoding.component.html'
})
export class MorseCodeDecodingComponent {

  isMuted = true;

  @ViewChildren(MorseDisplayComponent)
  morseCodeDisplaysQueryList

  startEvents$: Observable<number>


  constructor(public ms: MorseCodeDecoderService) {
    this.startEvents$ = ms.startEvents$
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
