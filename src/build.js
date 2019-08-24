/*
 * deinja
 * Copyright (C) 2018 wtetsu
 * https://github.com/wtetsu/deinja
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

import Form from "./form";
import Deinflection from "./deinflection";
import TailSearcher from "./tailsearcher";
import InflectionType from "./inflectiontype";
import UniqList from "uniqlist";

const build = data => {
  const searchers = createSearchers(data);
  const newConverter = word => deinflect(word, searchers).map(d => d.baseForm);
  return newConverter;
};

export default build;

const createSearchers = data => {
  return {
    ADJECTIVE: new TailSearcher(data.ADJECTIVE_INFLECTIONS, "inflection"),
    ICHIDAN: new TailSearcher(data.ICHIDAN_INFLECTIONS, "inflection"),
    GODAN: new TailSearcher(data.GODAN_INFLECTIONS, "inflection"),
    SURU: new TailSearcher(data.SURU_INFLECTIONS, "inflection"),
    KURU: new TailSearcher(data.KURU_INFLECTIONS, "inflection"),
    SPECIAL: new TailSearcher(data.SPECIAL_INFLECTIONS, "inflection"),
    IKU: new TailSearcher(data.IKU_INFLECTIONS, "inflection"),
    BOGUS: new TailSearcher(data.BOGUS_INFLECTIONS)
  };
};

const deinflect = (inflectedWord, searchers) => {
  const terms = new UniqList();
  terms.push(new Deinflection(inflectedWord, inflectedWord, -1, -1));

  deinflectRegular(terms, searchers.ADJECTIVE, InflectionType.ADJECTIVE, true);
  deinflectRegular(terms, searchers.ICHIDAN, InflectionType.ICHIDAN, true);
  deinflectRegular(terms, searchers.GODAN, InflectionType.GODAN, false);

  deinflectIrregular(terms, searchers.SURU, InflectionType.SURU);
  deinflectIrregular(terms, searchers.KURU, InflectionType.KURU);
  deinflectIrregular(terms, searchers.SPECIAL, InflectionType.SPECIAL);
  deinflectIrregular(terms, searchers.IKU, InflectionType.IKU);

  return filterBogusEndings(terms.array, searchers.BOGUS);
};

const deinflectRegular = (terms, inflectionSearcher, inflectionType, processAsAdded) => {
  const initialSize = terms.size();
  for (let i = 0; i < terms.size(); i++) {
    if (!processAsAdded && i >= initialSize) {
      break;
    }
    const deinflection = terms.get(i);
    const inflections = inflectionSearcher.search(deinflection.baseForm);

    for (let j = 0; j < inflections.length; j++) {
      const inflection = inflections[j];
      if (deinflection.inflectionType === InflectionType.ADJECTIVE && !isAuxAdjective(inflection.form)) {
        continue;
      }
      const deinflectedWord = deinflectWord(deinflection.baseForm, inflection);
      if (!deinflectedWord) {
        continue;
      }
      if (inflectionType === InflectionType.ICHIDAN && !hasIchidanEnding(deinflectedWord)) {
        continue;
      }
      const newRecord = new Deinflection(deinflection.baseForm, deinflectedWord, inflection.form, inflectionType);
      terms.push(newRecord, deinflectedWord);
    }
  }
};

const AUX_ADJECTIVE_TYPES = new Set([Form.TAI, Form.SOU, Form.NEGATIVE]);

const isAuxAdjective = form => {
  return AUX_ADJECTIVE_TYPES.has(form);
};

const deinflectWord = (inflectedWord, inflection) => {
  if (!inflectedWord.endsWith(inflection.inflection)) {
    return null;
  }

  const endIndex = inflectedWord.length - inflection.inflection.length;
  const baseWord = inflectedWord.substring(0, endIndex) + inflection.base;
  if (baseWord.length <= 1) {
    return null;
  }

  return baseWord;
};

const deinflectIrregular = (terms, inflectionSearcher, inflectionType) => {
  const initialSize = terms.size();
  for (let i = 0; i < initialSize; i++) {
    const deinflection = terms.get(i);

    const inflections = inflectionSearcher.search(deinflection.baseForm);
    for (let j = 0; j < inflections.length; j++) {
      const inflection = inflections[j];
      if (inflection.inflection === deinflection.baseForm) {
        const word = inflection.base;
        const newRecord = new Deinflection(deinflection.baseForm, word, inflection.form, inflectionType);
        terms.push(newRecord, word);
      }
    }
  }
};

const filterBogusEndings = (terms, bogusSearcher) => {
  const result = [];
  for (let i = 0; i < terms.length; i++) {
    const deinflection = terms[i];
    if (deinflection.baseForm === deinflection.inflectedWord) {
      continue;
    }
    const isInvalid = bogusSearcher.find(deinflection.baseForm);
    if (!isInvalid) {
      result.push(deinflection);
    }
  }
  return result;
};

const ICHIDAN = new Set([
  "い",
  "き",
  "ぎ",
  "し",
  "じ",
  "ち",
  "ぢ",
  "に",
  "ひ",
  "び",
  "ぴ",
  "み",
  "り",
  "イ",
  "キ",
  "ギ",
  "シ",
  "ジ",
  "チ",
  "ヂ",
  "ニ",
  "ヒ",
  "ビ",
  "ピ",
  "ミ",
  "リ",
  "え",
  "け",
  "げ",
  "せ",
  "ぜ",
  "て",
  "で",
  "ね",
  "へ",
  "べ",
  "ぺ",
  "め",
  "れ",
  "エ",
  "ケ",
  "ゲ",
  "セ",
  "ゼ",
  "テ",
  "デ",
  "ネ",
  "ヘ",
  "ベ",
  "ペ",
  "メ",
  "レ"
]);

const hasIchidanEnding = word => {
  const len = word.length;
  if (len <= 1) {
    return false;
  }

  const s = word.substring(len - 2, len - 1);
  return ICHIDAN.has(s);
};
