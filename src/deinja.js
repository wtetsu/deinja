const data = require("./data");
const Deinflection = require("./deinflection");
const Form = require("./form");

const InflectionType = {
  UNINFLECTABLE: 0,
  GODAN: 1,
  ICHIDAN: 2,
  IKU: 3,
  KURU: 4,
  SURU: 5,
  ADJECTIVE: 6,
  KURERU: 7,
  SPECIAL_RU: 8,
  SPECIAL_ARU: 9,
  SPECIAL: 10
};

const convert = word => {
  return deinflect(word);
};
const convertOrg = word => {
  return deinflectOrg(word);
};

class InflectionMap {
  constructor(inflections) {
    const { map, maxLength } = this.createMap(inflections);
    this.map = map;
    this.maxLength = maxLength;
  }

  createMap(inflections) {
    let maxLength = 0;
    const map = {};
    for (let i = 0; i < inflections.length; i++) {
      const inf = inflections[i];
      map[inf.inflection] = inf;

      if (maxLength < inf.inflection.length) {
        maxLength = inf.inflection.length;
      }
    }
    return { map, maxLength };
  }

  get(key) {
    return this.map[key];
  }

  getAll(str) {
    const result = [];
    for (let i = this.maxLength; i >= 1; i--) {
      const tail = str.substring(str.length - i, str.length);
      const r = this.map[tail];
      if (r) {
        result.push(r);
      }
    }
    return result;
  }
}

const adjectiveInflectionMap = new InflectionMap(data.ADJECTIVE_INFLECTIONS);
const ichidanInflectionMap = new InflectionMap(data.ICHIDAN_INFLECTIONS);
const godanInflectionMap = new InflectionMap(data.GODAN_INFLECTIONS);

const suruInflectionMap = new InflectionMap(data.SURU_INFLECTIONS);
const kuruInflectionMap = new InflectionMap(data.KURU_INFLECTIONS);
const specialInflectionMap = new InflectionMap(data.SPECIAL_INFLECTIONS);
const ikuInflectionMap = new InflectionMap(data.IKU_INFLECTIONS);

const deinflect = inflectedWord => {
  const terms = [];
  terms.push(new Deinflection(inflectedWord, inflectedWord, -1, -1));

  deinflectRegular(terms, adjectiveInflectionMap, InflectionType.ADJECTIVE, true);
  deinflectRegular(terms, ichidanInflectionMap, InflectionType.ICHIDAN, true);
  deinflectRegular(terms, godanInflectionMap, InflectionType.GODAN, false);

  deinflectIrregular(terms, suruInflectionMap, InflectionType.SURU);
  deinflectIrregular(terms, kuruInflectionMap, InflectionType.KURU);
  deinflectIrregular(terms, specialInflectionMap, InflectionType.SPECIAL);
  deinflectIrregular(terms, ikuInflectionMap, InflectionType.IKU);

  return filterBogusEndings(terms);
};

const deinflectOrg = inflectedWord => {
  const terms = [];
  terms.push(new Deinflection(inflectedWord, inflectedWord, -1, -1));

  deinflectRegularOrg(terms, data.ADJECTIVE_INFLECTIONS, InflectionType.ADJECTIVE, true);
  deinflectRegularOrg(terms, data.ICHIDAN_INFLECTIONS, InflectionType.ICHIDAN, true);
  deinflectRegularOrg(terms, data.GODAN_INFLECTIONS, InflectionType.GODAN, false);

  deinflectIrregularOrg(terms, data.SURU_INFLECTIONS, InflectionType.SURU);
  deinflectIrregularOrg(terms, data.KURU_INFLECTIONS, InflectionType.KURU);
  deinflectIrregularOrg(terms, data.SPECIAL_INFLECTIONS, InflectionType.SPECIAL);
  deinflectIrregularOrg(terms, data.IKU_INFLECTIONS, InflectionType.IKU);

  //return terms;
  return filterBogusEndings(terms);
};

const deinflectRegularOrg = (terms, inflections, inflectionType, processAsAdded) => {
  const initialSize = terms.length;
  for (let i = 0; i < terms.length; i++) {
    if (!processAsAdded && i >= initialSize) {
      break;
    }

    const deinflection = terms[i];
    const baseForm = deinflection.baseForm;

    for (let j = 0; j < inflections.length; j++) {
      const inflection = inflections[j];
      if (deinflection.inflectionType === InflectionType.ADJECTIVE && !isAuxAdjective(inflection.form)) {
        continue;
      }

      const endIndex = baseForm.length - inflection.inflection.length;
      const deinflectedWord = baseForm.substring(0, endIndex) + inflection.base;

      if (inflectionType === InflectionType.ICHIDAN && !hasIchidanEnding(deinflectedWord)) {
        continue;
      }
      terms.push(new Deinflection(baseForm, deinflectedWord, inflection.form, inflectionType));
    }
  }
};

const deinflectRegular = (terms, inflectionMap, inflectionType, processAsAdded) => {
  const initialSize = terms.length;
  for (let i = 0; i < terms.length; i++) {
    if (!processAsAdded && i >= initialSize) {
      break;
    }
    const deinflection = terms[i];
    const inflections = inflectionMap.getAll(deinflection.baseForm);

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
      terms.push(new Deinflection(deinflection.baseForm, deinflectedWord, inflection.form, inflectionType));
    }
  }
};

const isAuxAdjective = form => {
  return form == Form.TAI || form == Form.SOU || form == Form.NEGATIVE;
};

const hasIchidanEnding = word => {
  if (word.length < 2) return false;

  const s = word.substring(word.length - 2, word.length - 1);
  return data.ICHIDAN[s];
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

const deinflectIrregularOrg = (terms, inflections, inflectionType) => {
  const initialSize = terms.length;
  for (let i = 0; i < initialSize; i++) {
    const deinflection = terms[i];

    for (let j = 0; j < inflections.length; j++) {
      const inflection = inflections[j];

      // inflection.inflection -> しましょう
      // deinflection.baseForm -> 元文字列
      if (inflection.inflection === deinflection.baseForm) {
        const word = inflection.base;
        terms.push(new Deinflection(deinflection.baseForm, word, inflection.form, inflectionType));
      }
    }
  }
};

const deinflectIrregular = (terms, inflectionMap, inflectionType) => {
  const initialSize = terms.length;
  for (let i = 0; i < initialSize; i++) {
    const deinflection = terms[i];

    const inflections = inflectionMap.getAll(deinflection.baseForm);
    for (let j = 0; j < inflections.length; j++) {
      const inflection = inflections[j];
      // inflection.inflection -> しましょう
      // deinflection.baseForm -> 元文字列
      if (inflection.inflection === deinflection.baseForm) {
        const word = inflection.base;
        terms.push(new Deinflection(deinflection.baseForm, word, inflection.form, inflectionType));
      }
    }
  }
};

const filterBogusEndings = terms => {
  const result = [];
  for (let i = 0; i < terms.length; i++) {
    const deinflection = terms[i];
    if (deinflection.baseForm === deinflection.inflectedWord) {
      continue;
    }
    let shouldInclude = true;
    for (let j = 0; j < data.BOGUS_INFLECTIONS.length; j++) {
      const bogusEnding = data.BOGUS_INFLECTIONS[j];
      if (deinflection.baseForm.endsWith(bogusEnding)) {
        shouldInclude = false;
        break;
      }
    }

    if (shouldInclude) {
      result.push(deinflection);
    }
  }
  return result;
};

module.exports = { convert, convertOrg };
