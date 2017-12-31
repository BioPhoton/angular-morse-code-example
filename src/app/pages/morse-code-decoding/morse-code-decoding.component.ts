import {Component, ViewChildren} from '@angular/core';

import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {MorseCodeDecoderService} from '../../core/service/morse-code.service';
import {MorseDisplayComponent} from '../../shared/components/morse-display/morse-display.component';

@Component({
  selector: 'morse-code-decoding',
  templateUrl: './morse-code-decoding.component.html'
})
export class MorseCodeDecodingComponent {

  @ViewChildren(MorseDisplayComponent)
  morseCodeDisplaysQueryList

  _isSending$: Subject<boolean> = new Subject();
  get isSending$(): Observable<boolean> {
    return this._isSending$;
  }

  startEvents$: Observable<number>
  stopEvents$: Observable<number>
  morseChar$: Observable<any>
  morseSymbol$: Observable<string>
  morseLetter$: Observable<string>

  constructor(public ms: MorseCodeDecoderService) {
    this.startEvents$ = ms.startEvents$
    this.stopEvents$ = ms.stopEvents$
    this.morseChar$ = ms.morseChar$
    this.morseSymbol$ = ms.morseSymbol$
    this.morseLetter$ = ms.morseLetter$
  }

  sendStartSignal() {
    this._isSending$.next(true);
    this.ms.sendStartTime(Date.now());
  }

  sendStopSignal() {
    this._isSending$.next(false);
    this.ms.sendStopTime(Date.now());
  }

  resetAll() {
    this.morseCodeDisplaysQueryList.forEach((display) => {
      display.reset()
    })
  }

}
