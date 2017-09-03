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
  signals: any[] = []

  @Input()
  offset = 0

  @ViewChild('stream', {read: ElementRef})
  streamElem: ElementRef

  ngOnChanges(changes: SimpleChanges) {
    if ('signal' in changes && changes.signal.currentValue) {
      this.signals.push(this.unwrap(changes.signal.currentValue))
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

  private unwrap(val: any) {
    return (typeof val === 'object' && 'wrapped' in val) ? val.wrapped : val
  }

}
