const data = require("./data");

const Form = require("./form");
const Deinflection = require("./deinflection");
const TailSearcher = require("./tailsearcher");
const InflectionType = require("./inflectiontype");
const UniqList = require("uniqlist");

const convert = word => {
  return deinflect(word).map(d => d.baseForm);
};

const SEARCHER = {
  ADJECTIVE: new TailSearcher(data.ADJECTIVE_INFLECTIONS, "inflection"),
  ICHIDAN: new TailSearcher(data.ICHIDAN_INFLECTIONS, "inflection"),
  GODAN: new TailSearcher(data.GODAN_INFLECTIONS, "inflection"),
  SURU: new TailSearcher(data.SURU_INFLECTIONS, "inflection"),
  KURU: new TailSearcher(data.KURU_INFLECTIONS, "inflection"),
  SPECIAL: new TailSearcher(data.SPECIAL_INFLECTIONS, "inflection"),
  IKU: new TailSearcher(data.IKU_INFLECTIONS, "inflection"),
  BOGUS: new TailSearcher(data.BOGUS_INFLECTIONS)
};

const AUX_ADJECTIVE_TYPES = new Set([Form.TAI, Form.SOU, Form.NEGATIVE]);

const deinflect = inflectedWord => {
  const terms = new UniqList();
  terms.push(new Deinflection(inflectedWord, inflectedWord, -1, -1));

  deinflectRegular(terms, SEARCHER.ADJECTIVE, InflectionType.ADJECTIVE, true);
  deinflectRegular(terms, SEARCHER.ICHIDAN, InflectionType.ICHIDAN, true);
  deinflectRegular(terms, SEARCHER.GODAN, InflectionType.GODAN, false);

  deinflectIrregular(terms, SEARCHER.SURU, InflectionType.SURU);
  deinflectIrregular(terms, SEARCHER.KURU, InflectionType.KURU);
  deinflectIrregular(terms, SEARCHER.SPECIAL, InflectionType.SPECIAL);
  deinflectIrregular(terms, SEARCHER.IKU, InflectionType.IKU);

  return filterBogusEndings(terms.array, SEARCHER.BOGUS);
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

const isAuxAdjective = form => {
  return AUX_ADJECTIVE_TYPES.has(form);
};

const hasIchidanEnding = word => {
  const len = word.length;
  if (len <= 1) {
    return false;
  }

  const s = word.substring(len - 2, len - 1);
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

module.exports = { convert };
