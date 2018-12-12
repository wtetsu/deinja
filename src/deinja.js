const data = require("./data");
const Deinflection = require("./deinflection");
const Form = require("./form");
const TailSearcher = require("./tailsearcher");
const InflectionType = require("./Inflectiontype");

const convert = word => {
  return deinflect(word);
};

const KEY = "inflection";
const adjectiveInflectionMap = new TailSearcher(data.ADJECTIVE_INFLECTIONS, KEY);
const ichidanInflectionMap = new TailSearcher(data.ICHIDAN_INFLECTIONS, KEY);
const godanInflectionMap = new TailSearcher(data.GODAN_INFLECTIONS, KEY);

const suruInflectionMap = new TailSearcher(data.SURU_INFLECTIONS, KEY);
const kuruInflectionMap = new TailSearcher(data.KURU_INFLECTIONS, KEY);
const specialInflectionMap = new TailSearcher(data.SPECIAL_INFLECTIONS, KEY);
const ikuInflectionMap = new TailSearcher(data.IKU_INFLECTIONS, KEY);

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

const deinflectRegular = (terms, inflectionMap, inflectionType, processAsAdded) => {
  const initialSize = terms.length;
  for (let i = 0; i < terms.length; i++) {
    if (!processAsAdded && i >= initialSize) {
      break;
    }
    const deinflection = terms[i];
    const inflections = inflectionMap.search(deinflection.baseForm);

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

const auxAdjectiveTypes = new Set([Form.TAI, Form.SOU, Form.NEGATIVE]);

const isAuxAdjective = form => {
  return auxAdjectiveTypes.has(form);
};

const hasIchidanEnding = word => {
  if (word.length < 2) {
    return false;
  }

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

const deinflectIrregular = (terms, inflectionMap, inflectionType) => {
  const initialSize = terms.length;
  for (let i = 0; i < initialSize; i++) {
    const deinflection = terms[i];

    const inflections = inflectionMap.search(deinflection.baseForm);
    for (let j = 0; j < inflections.length; j++) {
      const inflection = inflections[j];
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
