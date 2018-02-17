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

  constructor(public ms: MorseCodeProcessingService) {

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
