import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'morse-button',
  templateUrl: './morse-button.component.html',
  styleUrls: ['./morse-button.component.scss']
})
export class MorseButtonComponent implements OnInit, OnDestroy {

  buttonEvents = {
    touchstart: 'touchstart',
    touchend: 'touchend',
    mousedown: 'mousedown',
    mouseleave: 'mouseleave',
    mouseup: 'mouseup'
  }

  morseEvents = {
    start: true,
    stop: false,
  }

  @ViewChild('mB')
  private mB;

  private onDestroy$: Subject<boolean> = new Subject();

  // bindings

  @Input()
  isMuted = true

  @Output()
  downChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  upChange: EventEmitter<number> = new EventEmitter<number>();

  private _isSending$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSending$ = this._isSending$.asObservable();

  mouseDown$: Observable<string>
  mouseLeave$: Observable<string>
  mouseUp$: Observable<string>
  touchStart$: Observable<string>
  touchEnd$: Observable<string>

  ngOnInit() {
    if (!this.isMobile()) {
      this.mouseDown$ = fromEvent(this.mB.nativeElement, 'mousedown').pipe(map(_ => this.buttonEvents.mousedown));
      this.mouseLeave$ = fromEvent(this.mB.nativeElement, 'mouseleave').pipe(map(_ => this.buttonEvents.mouseup));
      this.mouseUp$ = fromEvent(this.mB.nativeElement, 'mouseup').pipe(map(_ => this.buttonEvents.mouseup));

      this.mouseDown$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(_ => this.onMouseDown());
      this.mouseLeave$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(_ => this.onMouseLeave());
      this.mouseUp$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(_ => this.onMouseUp());

    } else {
      this.touchStart$ = fromEvent(this.mB.nativeElement, 'touchstart').pipe(map(_ => this.buttonEvents.touchstart));
      this.touchEnd$ = fromEvent(this.mB.nativeElement, 'touchend').pipe(map(_ => this.buttonEvents.touchend));

      this.touchStart$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(_ => this.onTouchStart())
      this.touchEnd$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(_ => this.onTouchEnd())
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  // declarative handling of button

  onMouseDown() {
    this.startSending();
  }

  onMouseLeave() {
    if (this._isSending$.getValue()) {
      this.stopSending()
    }
  }

  onMouseUp() {
    this.stopSending();
  }

  onTouchStart() {
    this.startSending();
  }

  onTouchEnd() {
    this.stopSending();
  }

  // helper functions

  private isMobile(): boolean | string {
    const useragent = navigator.userAgent;

    if (useragent.match(/Android/i)) {
      return 'android';
    } else if (useragent.match(/webOS/i)) {
      return 'webos';
    } else if (useragent.match(/iPhone/i)) {
      return 'iphone';
    } else if (useragent.match(/iPod/i)) {
      return 'ipod';
    } else if (useragent.match(/iPad/i)) {
      return 'ipad';
    } else if (useragent.match(/Windows Phone/i)) {
      return 'windows phone';
    } else if (useragent.match(/SymbianOS/i)) {
      return 'symbian';
    } else if (useragent.match(/RIM/i) || useragent.match(/BB/i)) {
      return 'blackberry';
    } else {
      return false;
    }
  }

  private morseInteraction = (action) => {
    if (action === this.morseEvents.start) {
      this.startSending();
    } else {
      this.stopSending();
    }
  }

  private startSending() {
    this.downChange.next();
    this._isSending$.next(true);
  }

  private stopSending() {
    this.upChange.next();
    this._isSending$.next(false);
  }

}
