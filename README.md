# deinja

[![Build Status](https://travis-ci.org/wtetsu/deinja.svg?branch=master)](https://travis-ci.org/wtetsu/deinja)
[![Code Climate](https://codeclimate.com/github/wtetsu/deinja/badges/gpa.svg)](https://codeclimate.com/github/wtetsu/deinja)
[![npm version](https://badge.fury.io/js/deinja.svg)](https://badge.fury.io/js/deinja)

deinja is a JavaScript library which can convert Japanese words into original forms.

Since this library focuses on lightness and speed rather than accuracy, It doesn't have internal dictionary data. So it returns multiple **candidates**, not the sole converted word.

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
