import {morseCharacters} from './morse-characters';
const l = morseCharacters.longMorse;
const s = morseCharacters.shortMorse;
const j  = (...a) => a.join('');

export const morseTranslations: { symbol: string, char: string }[] = [
  // letters
  {symbol: j(s, l), char: 'A'},
  {symbol: j(l, s, s, s), char: 'B'},
  {symbol: j(l, s, l, s), char: 'C'},
  {symbol: j(l, s, s), char: 'D'},
  {symbol: j(s), char: 'E'},
  {symbol: j(s, s, l, s), char: 'F'},
  {symbol: j(l, l, s), char: 'G'},
  {symbol: j(s, s, s, s), char: 'H'},
  {symbol: j(s, s), char: 'I'},
  {symbol: j(s, l, l, l), char: 'J'},
  {symbol: j(l, s, l), char: 'K'},
  {symbol: j(s, l, s, s), char: 'L'},
  {symbol: j(l, l), char: 'M'},
  {symbol: j(l, s), char: 'N'},
  {symbol: j(l, l, l), char: 'O'},
  {symbol: j(s, l, l, s), char: 'P'},
  {symbol: j(l, l, s, l), char: 'Q'},
  {symbol: j(s, l, s), char: 'R'},
  {symbol: j(s, s, s), char: 'S'},
  {symbol: j(l), char: 'T'},
  {symbol: j(s, s, l), char: 'U'},
  {symbol: j(s, s, s, l), char: 'V'},
  {symbol: j(s, l, l), char: 'W'},
  {symbol: j(l, s, s, l), char: 'X'},
  {symbol: j(l, s, l, l), char: 'Y'},
  {symbol: j(l, l, s, s), char: 'Z'},
  // numbers
  {symbol: j(l, l, l, l, l), char: '0'},
  {symbol: j(s, l, l, l, l), char: '1'},
  {symbol: j(s, s, l, l, l), char: '2'},
  {symbol: j(s, s, s, l, l), char: '3'},
  {symbol: j(s, s, s, s, l), char: '4'},
  {symbol: j(s, s, s, s, s), char: '5'},
  {symbol: j(l, s, s, s, s), char: '6'},
  {symbol: j(l, l, s, s, s), char: '7'},
  {symbol: j(l, l, l, s, s), char: '8'},
  {symbol: j(l, l, l, l, s), char: '9'},
  // specialsigns
  {symbol: j(s, l, l, s, l), char: 'À'}, // À,Å
  {symbol: j(s, l, s, l), char: 'Ä'},
  {symbol: j(s, l, s, s, l), char: 'È'},
  {symbol: j(s, s, l, s, s), char: 'É'},
  {symbol: j(l, l, l, s), char: 'Ö'},
  {symbol: j(s, s, l, l), char: 'Ü'},
  {symbol: j(s, s, s, l, l, s, s), char: 'ß'},
  {symbol: j(l, l, l, l), char: 'CH'},
  {symbol: j(l, l, s, l, l), char: 'Ñ'},
  {symbol: j(s, l, s, l, s, l), char: 's,'}, // (AAA)
  {symbol: j(l, l, s, s, l, l), char: ','}, // (MIM)
  {symbol: j(l, l, l, s, s, s), char: ':'}, // (OS)
  {symbol: j(l, s, l, s, l, s), char: '(NNN)'}, // (NNN)
  {symbol: j(s, s, l, l, s, s), char: '?'}, // (IMI)
  {symbol: j(l, s, s, s, s, l), char: 'l,'},
  {symbol: j(s, s, l, l, s, l), char: '_'}, // (UK)
  {symbol: j(l, s, l, l, s), char: '('}, // (KN)
  {symbol: j(l, s, l, l, s, l), char: ')'}, // (KK)
  {symbol: j(s, l, l, l, l, s), char: '\''},
  {symbol: j(l, s, s, s, l), char: '='},
  {symbol: j(s, l, s, l, s), char: '+'}, // (AR)
  {symbol: j(l, s, s, l, s), char: '/'}, // (DN)
  {symbol: j(s, l, l, s, l, s), char: '@'} // (AC)
];
