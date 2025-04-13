<p align="center">
<img src="https://user-images.githubusercontent.com/515948/185797517-6394d86a-061d-48b4-8090-6b27a6d3f767.png" width="150" alt="logo" /><br/>
<a href="https://github.com/wtetsu/deinja/actions/workflows/test.yml"><img src="https://github.com/wtetsu/deinja/actions/workflows/test.yml/badge.svg" alt="Build Status" /></a>
<a href="https://codeclimate.com/github/wtetsu/deinja"><img src="https://codeclimate.com/github/wtetsu/deinja/badges/gpa.svg" alt="Code Climate" /></a>
<a href="https://codecov.io/gh/wtetsu/deinja"><img src="https://codecov.io/gh/wtetsu/deinja/branch/master/graph/badge.svg?token=ryUgLvR4LK" alt="codecov" /></a>
<a href="https://badge.fury.io/js/deinja"><img src="https://badge.fury.io/js/deinja.svg" alt="npm version" /></a>
</p>


# deinja


**deinja** is a lightweight JavaScript library that converts inflected Japanese words into their original forms.

Instead of aiming for perfect accuracy, *deinja* prioritizes speed and simplicity. It does **not** include internal dictionary data, which means it may return **multiple possible candidates** for each input rather than a single definitive answer.

This library was originally a component of [Mouse Dictionary](https://github.com/wtetsu/mouse-dictionary), and has since been extracted into a standalone module.


## Installation

```
npm i deinja
```

## Usage

```js
import deinja from "deinja";

deinja.convert("素早く"); // ["素早い"]
deinja.convert("転がし"); // ["転がす"]
deinja.convert("投げた"); // ["投げる", "投ぐ"]

deinja.convert("死にました"); // ["死ぬ"]
deinja.convert("終わって"); // ["終わう", "終わつ", "終わる"]
deinja.convert("しまった"); // ["しまう", "しまつ", "しまる"]
```

## License

Apache 2.0

## Acknowledgments

deinja is built upon deinflector, a Java-based tool for Japanese word normalization.

https://github.com/Jimeux/deinflector
