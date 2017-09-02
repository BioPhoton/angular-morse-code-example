import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

import './seamless-loop';

@Component({
  selector: 'morse-button',
  templateUrl: './morse-button.component.html',
  styleUrls: ['./morse-button.component.scss']
})
export class MorseButtonComponent implements AfterViewInit, OnDestroy {

  isMuted = true
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

  ngOnDestroy() {

  }

  initBeepSound() {
    this.beepSoundElem = this.beepSound.nativeElement

    this.beepSoundElem.addEventListener('timeupdate', () => {
      const buffer = .42
      console.log('currentTime', this.beepSoundElem.currentTime)
      console.log('duration', this.beepSoundElem.duration)

      if (this.isMouseDown && !this.isMuted) {
        if (this.beepSoundElem.currentTime > this.beepSoundElem.duration - buffer) {
          this.beepSoundElem.currentTime = 0
          this.beepSoundElem.play()
        }
      }
    }, false);
  }

  onMouseDown() {
    this.isMouseDown = true
    this.mouseDownChange.next()
    if (!this.isMuted) {
      this.beepSoundElem.play()
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

      if (!this.beepSoundElem.paused) {
        this.beepSoundElem.pause()
        this.beepSoundElem.currentTime = 0
      }
    }
  }

}
