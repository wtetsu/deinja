<p align="center">
<img src="https://user-images.githubusercontent.com/515948/185797517-6394d86a-061d-48b4-8090-6b27a6d3f767.png" width="150" alt="logo" /><br/>
<a href="https://travis-ci.org/wtetsu/deinja"><img src="https://travis-ci.org/wtetsu/deinja.svg?branch=master" alt="Build Status" /></a>
<a href="https://codeclimate.com/github/wtetsu/deinja"><img src="https://codeclimate.com/github/wtetsu/deinja/badges/gpa.svg" alt="Code Climate" /></a>
<a href="https://badge.fury.io/js/deinja"><img src="https://badge.fury.io/js/deinja.svg" alt="npm version" /></a>
</p>




# deinja


deinja is a JavaScript library that converts Japanese words into the original forms.

Since this library focuses on lightness and speed rather than accuracy, it doesn't have internal dictionary data. Therefore, it returns multiple **candidates**, not the sole word.

This library was once a part of [Mouse Dictionary](https://github.com/wtetsu/mouse-dictionary). It was detached from the application as a form of a portable library.

## Install

```
npm i deinja
```

## How to use

```js
import deinja from "deinja";

deinja.convert("素早く"); // ["素早い"]
deinja.convert("転がし"); // ["転がす"]
deinja.convert("投げた"); // ["投げる", "投ぐ"]

deinja.convert("死にました"); // ["死ぬ"]
deinja.convert("終わって"); // ["終わう", "終わつ", "終わる"]
deinja.convert("しまった"); // ["しまう", "しまつ", "しまる"]
```

# License

Apache 2.0

deinja is implemented based on deinflector which is written in Java.

https://github.com/Jimeux/deinflector
