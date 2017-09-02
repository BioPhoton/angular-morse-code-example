import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {ModuleWithProviders, NgModule} from '@angular/core'
import {morseCharacters} from './data/morse-characters'
import {morseTimeRanges} from './data/morse-time-ranges'
import {morseTranslations} from './data/morse-translations'
import {MorseCodeDecoderService} from './service/morse-code.service'

import {
  MorseCharacters,
  MorseTimeRanges,
  MorseTranslations
} from './token/injection-tokens'

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: MorseTimeRanges, useValue: morseTimeRanges},
        {provide: MorseCharacters, useValue: morseCharacters},
        {provide: MorseTranslations, useValue: morseTranslations},
        MorseCodeDecoderService
      ]
    }
  }
}
