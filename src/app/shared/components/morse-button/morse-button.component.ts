import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'morse-button',
  templateUrl: './morse-button.component.html',
  styleUrls: ['./morse-button.component.scss']
})
export class MorseButtonComponent implements AfterViewInit {

  isMouseDown = false

  @Output()
  mouseDownChange: EventEmitter<number> = new EventEmitter<number>()

  @Output()
  mouseUpChange: EventEmitter<number> = new EventEmitter<number>()

  @ViewChild('beepSound')
  beepSound

  beepSoundElem: HTMLAudioElement

  constructor() {

  }

  ngAfterViewInit() {
    this.initBeepSound()
  }

  initBeepSound() {
    this.beepSoundElem = this.beepSound.nativeElement
    this.beepSoundElem.addEventListener('ended', () => {
      if (this.isMouseDown) {
        this.beepSoundElem.play();
      }
    }, false);
  }

  onMouseDown() {
    this.isMouseDown = !this.isMouseDown
    this.mouseDownChange.next()
    this.playSound();
  }

  onMouseLeave() {
    if (this.isMouseDown) {
      this.onMouseUp()
    }
  }

  onMouseUp() {
    if (this.isMouseDown) {
      this.isMouseDown = !this.isMouseDown
      this.mouseUpChange.next()
    }
  }

  playSound() {
    console.log('this.beepSound: ', this.beepSoundElem)
    this.beepSoundElem.play();

  }
}
