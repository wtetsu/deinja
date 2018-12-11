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

const deinflect = inflectedWord => {
  const terms = [];
  terms.push(new Deinflection(inflectedWord, inflectedWord, -1, -1));

  deinflectRegular(terms, data.ADJECTIVE_INFLECTIONS, InflectionType.ADJECTIVE, true);
  deinflectRegular(terms, data.ICHIDAN_INFLECTIONS, InflectionType.ICHIDAN, true);
  deinflectRegular(terms, data.GODAN_INFLECTIONS, InflectionType.GODAN, false);
  deinflectIrregular(terms, data.SURU_INFLECTIONS, InflectionType.SURU);
  deinflectIrregular(terms, data.KURU_INFLECTIONS, InflectionType.KURU);
  deinflectIrregular(terms, data.SPECIAL_INFLECTIONS, InflectionType.SPECIAL);
  deinflectIrregular(terms, data.IKU_INFLECTIONS, InflectionType.IKU);

  //return terms;
  return filterBogusEndings(terms);
};

const deinflectRegular = (terms, inflections, inflectionType, processAsAdded) => {
  const initialSize = terms.length;
  for (let i = 0; i < terms.length; i++) {
    if (!processAsAdded && i >= initialSize) {
      break;
    }

    const deinflection = terms[i];

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

const deinflectIrregular = (terms, inflections, inflectionType) => {
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

module.exports = { convert };
