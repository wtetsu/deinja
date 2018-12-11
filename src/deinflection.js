class Deinflection {
  constructor(inflectedWord, baseForm, form, inflectionType) {
    this.inflectedWord = inflectedWord;
    this.baseForm = baseForm;
    this.form = form;
    this.inflectionType = inflectionType;
  }

  toString() {
    return `${this.baseForm}, [${this.inflectionType}]`;
  }
}

module.exports = Deinflection;
