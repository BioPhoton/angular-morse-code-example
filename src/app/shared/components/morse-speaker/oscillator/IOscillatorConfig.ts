export type oscillatorWaveType = 'square' | 'sine' | 'square' | 'sawtooth' | 'triangle' | 'custom'
export type oscillatorFrequency = number;

export interface IOscillatorConfig {
  type: oscillatorWaveType
  // value in hertz
  frequency: oscillatorFrequency
}
