import {Component, ViewChildren} from '@angular/core';

import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {MorseCodeProcessingService} from '../../core/service/morse-code-processing.service';
import {MorseDisplayComponent} from '../../shared/components/morse-display/morse-display.component';

@Component({
  selector: 'morse-code-processing',
  templateUrl: './morse-code-processing.component.html'
})
export class MorseCodeProcessingComponent {

  @ViewChildren(MorseDisplayComponent)
  morseCodeDisplaysQueryList

  _isSending$: Subject<boolean> = new Subject();
  get isSending$(): Observable<boolean> {
    return this._isSending$;
  }

  startEvents$: Observable<number>;
  stopEvents$: Observable<number>;
  morseChar$;
  morseSymbol$;
  morseLetter$;

  constructor(public ms: MorseCodeProcessingService) {
    this.startEvents$ = ms.startEvents$;
    this.stopEvents$ = ms.stopEvents$;
    this.morseChar$ = ms.morseChar$;
    this.morseSymbol$ = ms.morseSymbol$;
    this.morseLetter$ = ms.morseLetter$;
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
