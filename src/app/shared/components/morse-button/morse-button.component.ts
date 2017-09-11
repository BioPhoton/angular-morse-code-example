import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OscillatorService} from './oscillator/oscillator.service';

export const OscillatorFactory = function(): OscillatorService {
  return new OscillatorService({type: 'square', frequency: 660})
}


@Component({
  selector: 'morse-button',
  templateUrl: './morse-button.component.html',
  styleUrls: ['./morse-button.component.scss'],
  providers: [
    {
      provide: OscillatorService, useFactory: OscillatorFactory
    }
  ]
})
export class MorseButtonComponent {

  @Input()
  isMuted = true
  isMouseDown = false

  @Output()
  mouseDownChange: EventEmitter<number> = new EventEmitter<number>()

  @Output()
  mouseUpChange: EventEmitter<number> = new EventEmitter<number>()

  constructor(private o: OscillatorService) {
  }

  onMouseDown() {
    this.isMouseDown = true
    this.mouseDownChange.next()

    if (!this.isMuted) {
      this.o.play()
    }
  }

  onMouseLeave() {
    if (this.isMouseDown) {
      this.onMouseUp()
    }
  }

  onMouseUp() {
    if (this.isMouseDown) {
      this.isMouseDown = false
      this.mouseUpChange.next()

      this.o.pause()
    }
  }

}
