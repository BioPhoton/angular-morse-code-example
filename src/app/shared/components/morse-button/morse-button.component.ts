import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'morse-button',
  templateUrl: './morse-button.component.html',
  styleUrls: ['./morse-button.component.scss']
})
export class MorseButtonComponent {

  @Input()
  isMuted = true
  isMouseDown = false

  @Output()
  mouseDownChange: EventEmitter<number> = new EventEmitter<number>()

  @Output()
  mouseUpChange: EventEmitter<number> = new EventEmitter<number>()

  onMouseDown() {
    this.isMouseDown = true
    this.mouseDownChange.next();
  }

  onMouseLeave() {
    if (this.isMouseDown) {
      this.onMouseUp()
    }
  }

  onMouseUp() {
    if (this.isMouseDown) {
      this.isMouseDown = false
      this.mouseUpChange.next();
    }
  }

}
