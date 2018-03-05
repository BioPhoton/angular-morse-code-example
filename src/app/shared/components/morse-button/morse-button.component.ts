import {
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {merge as mergeFrom} from 'rxjs/observable/merge';
import {race} from 'rxjs/observable/race';
import {map, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'morse-button',
  templateUrl: './morse-button.component.html',
  styleUrls: ['./morse-button.component.scss']
})
export class MorseButtonComponent implements OnInit, OnDestroy {

  buttonEvents = {
    touchstart: 'touchstart',
    touchend:   'touchend',
    mousedown:  'mousedown',
    mouseleave: 'mouseleave',
    mouseup:    'mouseup'
  }

  morseEvents = {
    start: true,
    stop:  false,
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

  morseActions$: Observable<boolean>

  ngOnInit() {
    this.mouseDown$ = fromEvent(this.mB.nativeElement, 'mousedown').pipe(map(_ => this.buttonEvents.mousedown));
    this.mouseLeave$ = fromEvent(this.mB.nativeElement, 'mouseleave').pipe(map(_ => this.buttonEvents.mouseup));
    this.mouseUp$ = fromEvent(this.mB.nativeElement, 'mouseup').pipe(map(_ => this.buttonEvents.mouseup));
    this.touchStart$ = fromEvent(this.mB.nativeElement, 'touchstart').pipe(map(_ => this.buttonEvents.touchstart));
    this.touchEnd$ = fromEvent(this.mB.nativeElement, 'touchend').pipe(map(_ => this.buttonEvents.touchend));
    /*
     this.mouseDown$.subscribe(_ => console.log('mouseDown$'))
     this.mouseLeave$.subscribe(_ => console.log('mouseLeave$'))
     this.mouseUp$.subscribe(_ => console.log('mouseUp$'))
     this.touchStart$.subscribe(_ => console.log('touchStart$'))
     this.touchEnd$.subscribe(_ => console.log('touchEnd$'))
     */

    // Mouse interaction
    // mouseDown$:  ------d---------
    // mouseUp$:    ---------u------
    // touchStart$: ----------------
    // touchEnd$:   ----------------

    // Touch interaction
    // mouseDown$:  --------d--------
    // mouseUp$:    ----------u------
    // touchStart$: ----s------------
    // touchEnd$:   ------e----------

    // reactive button handling

    // mouseDown$:  ------d------d---
    // touchStart$: ----s------s-----
    // race():      ----s------s-----
    // switchMap(): ----s------s-----
    // merge():     ------e--------e-
    // actions$:    ----s-e----s---e-

    // reactive handling of button

    const touchStopObs = [this.touchEnd$];
    const mouseStopObs = [this.mouseUp$, this.mouseLeave$];

    this.morseActions$ = race([
      this.touchStart$,
      this.mouseDown$
    ]).pipe(
      switchMap(eventType => {
        let interactions$;

        if (eventType === this.buttonEvents.touchstart) {
          interactions$ = mergeFrom(...touchStopObs)
        } else {
          interactions$ = mergeFrom(...mouseStopObs)
        }

        return interactions$.pipe(
          map(_ => this.morseEvents.stop),
          startWith(this.morseEvents.start)
        );
      })
    );

    this.morseActions$.pipe(takeUntil(this.onDestroy$))
      .subscribe(
        this.morseInteraction,
        null,
        () => this.morseInteraction(this.morseEvents.stop)
      )

  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  // declarative handling of button

  onMouseDown() {
    console.log('onMouseDown')
    this.startSending();
  }

  onMouseLeave() {
    console.log('onMouseLeave')
    if (this._isSending$.getValue()) {
      this.stopSending()
    }
  }

  onMouseUp() {
    console.log('onMouseUp')
    this.stopSending();
  }

  onTouchStart() {
    console.log('onTouchStart')
    this.startSending();
  }

  onTouchEnd() {
    console.log('onTouchEnd')
    this.stopSending();
  }

  // helper functions

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
