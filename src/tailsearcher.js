/*
 * deinja
 * Copyright (C) 2018 wtetsu
 * https://github.com/wtetsu/deinja
 *
 * Originally based on deinflector
 * Copyright (C) 2016 James Kirk
 * https://github.com/Jimeux/deinflector
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TailSearcher {
  constructor(list, key) {
    const { map, maxLength } = this.createMap(list, key);
    this.map = map;
    this.maxLength = maxLength;
  }

  createMap(list, key) {
    let maxLength = 0;
    const map = new Map();
    for (let i = 0; i < list.length; i++) {
      const obj = list[i];
      const str = key ? obj[key] : obj;

      let arr = map.get(str);
      if (!arr) {
        arr = [];
        map.set(str, arr);
      }
      arr.push(obj);

      if (maxLength < str.length) {
        maxLength = str.length;
      }
    }
    return { map, maxLength };
  }

  search(str) {
    const result = [];
    const len = Math.min(str.length, this.maxLength);
    for (let i = len; i >= 1; i--) {
      const tail = str.substring(str.length - i);
      const r = this.map.get(tail);
      if (r) {
        result.push(...r);
      }
    }
    return result;
  }

  find(str) {
    const len = str.length < this.maxLength ? str.length : this.maxLength;
    for (let i = len; i >= 1; i--) {
      const tail = str.substring(str.length - i);
      if (this.map.has(tail)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = TailSearcher;
