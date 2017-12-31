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

  constructor(public ms: MorseCodeDecoderService) {
    this.startEvents$ = ms.startEvents$
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
