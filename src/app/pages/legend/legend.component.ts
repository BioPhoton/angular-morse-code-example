import { Component } from '@angular/core';

@Component({
  selector: 'morse-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {

  timestamp = Date.now()
  constructor() {}

}
