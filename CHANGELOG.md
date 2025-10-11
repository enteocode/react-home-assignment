# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.3](https://github.com/enteocode/reversing-labs/compare/v1.0.2...v1.0.3) (2025-10-11)


### Bug Fixes

* added auto-focus to description textbox ([36b8c02](https://github.com/enteocode/reversing-labs/commit/36b8c025281d53be79ae10a2cc6ce6022eb40715))
* **performance:** fixed chunk load strategy ([89b2f0c](https://github.com/enteocode/reversing-labs/commit/89b2f0c57afa988fd2ac29818414e4ffb9452b85))
* **security:** fixed DevTool integrations in production build ([a44806a](https://github.com/enteocode/reversing-labs/commit/a44806ae9355b7eb4540babf29b6ca201ef2bce8))


### Docs

* fixed branch reference on `README.md` ([9b01d97](https://github.com/enteocode/reversing-labs/commit/9b01d976e10cc6f2175a18c200268d1915738392))


### Setup

* added basic CI workflow ([37ee227](https://github.com/enteocode/reversing-labs/commit/37ee227c049e25daa3cde50ca348d6af502fc0e0))
* added basic CI workflow ([2856e2c](https://github.com/enteocode/reversing-labs/commit/2856e2c045a76a2183368678017a05aff2720be0))
* updated dependencies ([f017a09](https://github.com/enteocode/reversing-labs/commit/f017a091e596583bb43535a629bb6d7e90edd5b0))

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
