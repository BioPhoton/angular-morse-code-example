import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'morse-frame',
  templateUrl: './morse-frame.component.html',
  styleUrls: ['./morse-frame.component.scss']
})
export class MorseFrameComponent implements OnChanges {
  validSizes = ['default', 'short', 'tiny']
  @Input()
  size = 'default'

  @Input()
  signal: any

  validSignalTypes = ['default', 'timestamp', 'timediff', 'character', 'symbol', 'letter']
  @Input()
  signalType = 'default'

  ngOnChanges(changes) {
    if ('size' in changes) {
      this.size = this.isValidSize(changes.size.currentValue) ? changes.size.currentValue : this.validSizes[0]
    }

    if ('signalType' in changes) {
      this.signalType = this.isValidSignalType(changes.signalType.currentValue) ? changes.signalType.currentValue : this.validSignalTypes[0]
    }
  }

  private isValidSize(size: string): boolean {
    return this.validSizes.indexOf(size) !== -1
  }

  private isValidSignalType(type: string): boolean {
    return this.validSignalTypes.indexOf(type) !== -1
  }

}
