# Simple Enough ECS

A Javascript game engine using an Entity-Component-System paradigm.

## Documentation
* [API](docs/API.md)

## License
GNU Public License, version 3.

## Current Design
* Modular, take-what-you-want architecture with `rollup` custom builds.
* Pluggable game loops, data structures, renderers, etc., but with an emphasis on WebGL.
* Using new JS data structures wherever possible, like `TypedArrays`.

## Goals
* Introduce a fixed-cost, friendly, and stable interface in front of the entity and component implementation. It can be relatively expensive at "compile-time" (initialization), but use new ES6 features like `Proxy` to truly let the implementation vary, as it must, so we can tune for maximum possible performance
at the lowest layers; e.g., we're currently using `TypedArrays` to represent entities as `UInt32` IDs, (hopefully) using contiguous regions of JS heap, while using the `EntityManager` to "instantiate" entities and return friendly wrapped objects which the Component interace understands.
* Use new JS features to extract performance at the lowest possible level, but remaining *hand-written JavaScript*; ie, `asm.js` is awesome, but compilation of C code into JS is "cheating" in the context of this project. It should be possible to understand all of the code, including transpiler-emitted code.
* Remain "take-what-you-want" while preserving the option of holistic use. Example: the inclusion of the `loops` modules, which will contain ready-made game loops that users can choose from based on design trade-offs.
* Readable and useful error reporting. Error handling is worth a few cycles.
* Good tests included. This goal is not coverage, but quality. Three test categories should exist:
  * Unit tests: Pure test of function and object method results.
  * Integration tests: Inter-system tests spanning many "units" with side-effects.
  * Performance regression tests: Tests to detect deviation from established baselines of performance.

## Status
Early days, pre-release.

## Build
* Designed as an `npm` package, uses conventions; e.g., `npm build`, `npm test`.
* Example code can be built with `npm run examples`.

Pull requests and issues welcome.