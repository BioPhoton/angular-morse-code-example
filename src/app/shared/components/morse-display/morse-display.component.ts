import {
  AfterViewChecked,
  ChangeDetectionStrategy,
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
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'morse-display',
  templateUrl: './morse-display.component.html',
  styleUrls: ['./morse-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MorseDisplayComponent implements OnChanges, AfterViewChecked, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject<boolean>()

  private subscriptions: { [key: string]: Subscription } = {}

  @Input()
  size = 'default'

  @Input()
  signalType = 'default'

  @Input()
  signal: Observable<any>
  signals: any[] = []

  @Input()
  offset = 0

  @ViewChild('stream', {read: ElementRef})
  streamElem: ElementRef

  ngOnChanges(changes: SimpleChanges) {
    if (this.signalType === 'character') {
      console.log('changes', changes);
    }
    if ('signal' in changes) {
      const cS = changes.signal.currentValue

      // default change handling => will not work on same values
      // if (cS) { this.signals.push(cS) }

      // handle changes by wrapping the primitive value into an object
      const signal = this.unwrap(cS)
      if (signal) {
        this.signals.push(signal)
      }

      // handle changes by passing the observable into the child component
      // this.handleSubscription('signal', cS, v => this.signals.push(v))

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

  private handleSubscription = (subName: string, obs: Observable<any>, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): void => {
    // unsubscribe if a subscription is given
    if (this.subscriptions[subName] && this.subscriptions[subName] instanceof Subscription) {
      this.subscriptions[subName].unsubscribe()
      delete this.subscriptions[subName]
    }

    // subscribe if new value is Observable
    // and unsubscribe automatically on component destroy
    if (obs instanceof Observable) {
      this.subscriptions[subName] = obs.takeUntil(this.onDestroy$).subscribe(next, error, complete)
    }
  }

  private unwrap = (val: any): any => {
    console.log('val: ', val)
    return (val !== null && typeof val === 'object' && 'wrapped' in val) ? val.wrapped : val
  }

}
