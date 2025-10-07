# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.2](https://github.com/enteocode/reversing-labs/compare/v1.0.1...v1.0.2) (2025-10-07)


### Bug Fixes

* **core:** removed `StrictMode` as it triggered multiple mounts unnecessarily ([02e78bd](https://github.com/enteocode/reversing-labs/commit/02e78bd3aa5f556d2ef3b30903ec2bfa0317e5e7))
* **digest:** interchanged `useRef` with `useState` as it recreated `Handler` on each render ([48fb0d7](https://github.com/enteocode/reversing-labs/commit/48fb0d758215e4f46811c48da0fc2743b897794d))
* **drop:** fixed no handler trigger on consecutively selecting the same file ([736dc92](https://github.com/enteocode/reversing-labs/commit/736dc9228c6af425ced5509f7ff7a9b2251186c4))

### [1.0.1](https://github.com/enteocode/reversing-labs/compare/v1.0.0...v1.0.1) (2025-10-07)


### Bug Fixes

* **digest:** fixed abort to avoid Worker thread shutdown on double mounts ([6f4eb3f](https://github.com/enteocode/reversing-labs/commit/6f4eb3fff727c5039c64a2d31fed8b5b294eb469))

## 1.0.0 (2025-10-07)


### Features

* added default display components 38eb0b0
* added Worker based hook for digest calculation 86983f0


### Setup

* added initial environment setup 794aeaf
* updated dependencies and repository name 2d17981
