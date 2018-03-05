import {Component, ViewChildren} from '@angular/core';

import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {map} from 'rxjs/operators';
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

    const morseEvents$ = [
      this.startEvents$.pipe(map(_ => true)),
      this.stopEvents$.pipe(map(_ => false))
    ];
    this.isSending$ = merge(...morseEvents$);
  }

  sendStartSignal() {
    this.ms.sendStartTime(Date.now());
  }

  sendStopSignal() {
    this.ms.sendStopTime(Date.now());
  }

  resetAll() {
    this.morseCodeDisplaysQueryList.forEach((display) => {
      display.reset()
    })
  }

}
