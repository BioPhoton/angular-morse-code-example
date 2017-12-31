# Real-Time stream processing with [Reactive-Extensions (RX)](http://reactivex.io/)
#### A playful example of using RX to create a [morse code](https://en.wikipedia.org/wiki/Morse_code) generator with [RxJs](https://github.com/ReactiveX/rxjs) and [Angular](https://angular.io) (No Angular knowledge needed!)
 
 ![Angular-Morse-Code](https://raw.githubusercontent.com/BioPhoton/angular-morse-code-example/master/resources/images/morse-code-demo.gif)
 
## Agenda:
- The ancient story of RxJs
- 
- [Marble-Diagrams](http://rxmarbles.com/#combineLatest)
- Explaining the goal
- Overview over the code base we begin with
- Live coding
  - Use a button to create a stream of timestamps
  - Transform timestamps to dots (".") and dashes ("_")
  - Translate series of dost and dashes to readable text
  - Handling edge cases
  - Handling errors
- Resources
- Good bye!

## Demo
Find the final code online at [angular-morse-code-example](https://biophoton.github.io/angular-morse-code-example/)

## Overview
Using RxJs to process streams in real-time. 
In this talk you will get an overview of Reactive-Extensions and see it's usage in a live-coding session.

First you will get an introduction into Rx and it's history. 
After covering the basic concepts and terminologies 
we will get better understanding of observables and learn how to use marble-diagrams for documentation.

In the live-coding session I create a morse-code generator to demonstrate real-time stream processing in a playful way.
You will get basic knowledge in mosing and alot more over RX.

I will show you:
- how to create observables
- common operators to transform streams
- different ways to combine streams
- subscription handling
- error handling
- exposing observables
- how to use subjects to control streams

After the session you will have enough knowledge to start using Rx in any language not only in javascript.

## Intro to RxJs
RxJs in 2 sentences, inventor, story of the idea, technical explanation,  
## How i am/What i do
name, interests, background of the example, what my bussines is
## [Marble-Diagrams](http://rxmarbles.com/#combineLatest)
buildingg blocks aof marble diagrams, examples, show rxmarbles
## Explaining the goal
Generate timestamps for start and end of sending a signal
Calculate duration of moude down and up
Transform to character
Transform to symbol
Transform to letter
## Overview over the code base we begin with
buttom and display functionality, connection of service to components
## Live coding
In the livecoding session we will create following code in the [service class](https://github.com/BioPhoton/angular-morse-code-example/blob/cdec0d398a82c231150de6654936ecd1d0d0db3e/src/app/core/service/morse-code.service.ts#L15-L103) which basically contains all `Rx` logic

And this code for the [visualisation in the component](https://github.com/BioPhoton/angular-morse-code-example/blob/cdec0d398a82c231150de6654936ecd1d0d0db3e/src/app/pages/morse-code-encoding/morse-code-encoding.component.ts#L14-L37)
  ### Use a button to create a stream of timestamps
  Subjects, exposing, usage of display
  ### Transform timestamps to dots (".") and dashes ("_")
  combineLatest, map and filter operator
  ### Translate series of dost and dashes to readable text
  window, flatmap, map and filer operator
  ### Handling errors
  filter, switchMap and catch operator
  ### Handling edge cases
  .switchMap, timer and take operator
## Resources

## Good bye!


# Things todo:
- find good example for hot and cold related to morse stuff
- create canvas component to draw strokes related to morse signals
