import {Component, ViewChildren} from '@angular/core';


import {merge as observableMerge, Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {MorseCodeDecoderService} from '../../core/service/morse-code.service';
import {MorseDisplayComponent} from '../../shared/components/morse-display/morse-display.component';

@Component({
  selector: 'morse-code-decoding',
  templateUrl: './morse-code-decoding.component.html'
})
export class MorseCodeDecodingComponent {

  @ViewChildren(MorseDisplayComponent)
  morseCodeDisplaysQueryList

  startEvents$: Observable<number>
  stopEvents$: Observable<number>
  isSending$: Observable<boolean>

  morseChar$: Observable<any>
  morseSymbol$: Observable<string>
  morseLetter$: Observable<string>



  constructor(public ms: MorseCodeDecoderService) {
    this.startEvents$ = ms.startEvents$
    this.stopEvents$ = ms.stopEvents$
    this.morseChar$ = ms.morseChar$
    this.morseSymbol$ = ms.morseSymbol$
    this.morseLetter$ = ms.morseLetter$

    const morseEvents$: Observable<boolean>[] = [
      this.startEvents$.pipe(mapTo(true)),
      this.stopEvents$.pipe(mapTo(false))
    ];
    this.isSending$ = observableMerge(...morseEvents$);
  }

  sendStartSignal() {
    this.ms.sendStartTime(Date.now());
  }

  sendStopSignal() {
    this.ms.sendStopTime(Date.now());
  }

  resetAll() {
    this.morseCodeDisplaysQueryList.forEach((display) => {
      display.reset();
    })
  }

}
