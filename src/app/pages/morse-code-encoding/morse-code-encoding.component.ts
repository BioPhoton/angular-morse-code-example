import {Component} from '@angular/core';
import {MorseCodeDecoderService} from '../../core/service/morse-code.service';

@Component({
  selector: 'morse-code-encoding',
  templateUrl: './morse-code-encoding.component.html'
})
export class MorseCodeEncodingComponent {

  constructor(public ms: MorseCodeDecoderService) {}

}
