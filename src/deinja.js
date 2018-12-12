const data = require("./data");
const Deinflection = require("./deinflection");
const Form = require("./form");
const TailSearcher = require("./tailsearcher");
const InflectionType = require("./inflectiontype");
const UniqList = require("uniqlist");

const convert = word => {
  return deinflect(word);
};

const KEY = "inflection";
const adjectiveSearcher = new TailSearcher(data.ADJECTIVE_INFLECTIONS, KEY);
const ichidanSearcher = new TailSearcher(data.ICHIDAN_INFLECTIONS, KEY);
const godanSearcher = new TailSearcher(data.GODAN_INFLECTIONS, KEY);

const suruSearcher = new TailSearcher(data.SURU_INFLECTIONS, KEY);
const kuruSearcher = new TailSearcher(data.KURU_INFLECTIONS, KEY);
const specialSearcher = new TailSearcher(data.SPECIAL_INFLECTIONS, KEY);
const ikuSearcher = new TailSearcher(data.IKU_INFLECTIONS, KEY);

const bogusSearcher = new TailSearcher(data.BOGUS_INFLECTIONS);

const deinflect = inflectedWord => {
  const terms = new UniqList();
  terms.push(new Deinflection(inflectedWord, inflectedWord, -1, -1));

  deinflectRegular(terms, adjectiveSearcher, InflectionType.ADJECTIVE, true);
  deinflectRegular(terms, ichidanSearcher, InflectionType.ICHIDAN, true);
  deinflectRegular(terms, godanSearcher, InflectionType.GODAN, false);

  deinflectIrregular(terms, suruSearcher, InflectionType.SURU);
  deinflectIrregular(terms, kuruSearcher, InflectionType.KURU);
  deinflectIrregular(terms, specialSearcher, InflectionType.SPECIAL);
  deinflectIrregular(terms, ikuSearcher, InflectionType.IKU);

  return filterBogusEndings(terms.array, bogusSearcher);
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
