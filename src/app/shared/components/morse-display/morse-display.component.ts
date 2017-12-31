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
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'morse-display',
  templateUrl: './morse-display.component.html',
  styleUrls: ['./morse-display.component.scss']
})
export class MorseDisplayComponent implements OnChanges, AfterViewChecked, OnDestroy {
  public isOpen = true;

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
    if ('signal' in changes) {
      const cS = changes.signal.currentValue
      this.handleSubscription('signal', cS, (n) => this.signals.push(n))
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

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  private handleSubscription = (subName: string, obs$: Observable<any>, next: (value: any) => void, error?: (error: any) => void, complete?: () => void): void => {
    // unsubscribe if a subscription is given
    if (this.subscriptions[subName] && this.subscriptions[subName] instanceof Subscription) {
      this.subscriptions[subName].unsubscribe()
      delete this.subscriptions[subName]
    }

    // subscribe if new value is Observable
    // and unsubscribe automatically on component destroy
    if (obs$) {
      this.subscriptions[subName] = obs$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(next, error, complete)
    }
  }

}
