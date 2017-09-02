import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'morse-display',
  templateUrl: './morse-display.component.html',
  styleUrls: ['./morse-display.component.scss']
})
export class MorseDisplayComponent implements OnChanges, AfterViewChecked, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject<boolean>()

  @Input()
  size = 'default'

  @Input()
  signalType = 'default'

  @Input()
  signal: Observable<any>
  private signalSubscription
  signals: any[] = []

  @Input()
  offset = 0

  @ViewChild('stream', {read: ElementRef})
  streamElem: ElementRef

  ngOnChanges(changes: SimpleChanges) {
    if ('signal' in changes) {
      // unsubscribe if subscribed
      if (this.signalSubscription) {
        this.signalSubscription.unsubscribe()
        this.signalSubscription = undefined;
      }
      // subscribe if observable
      if (changes.signal.currentValue instanceof Observable) {

        this.signalSubscription = changes.signal.currentValue
          .takeUntil(this.onDestroy$)
          .subscribe(
            n => {
              this.signals.push(n)
            },
            console.log
          )
      }
    }
  }

  ngAfterViewChecked() {
    this.streamElem.nativeElement.scrollLeft = this.streamElem.nativeElement.scrollWidth
  }

  ngOnDestroy() {
    this.onDestroy$.next(true)
  }

  reset() {
    this.signals = []
  }

}
