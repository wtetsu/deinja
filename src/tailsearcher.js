class TailSearcher {
  constructor(list, key) {
    const { map, maxLength } = this.createMap(list, key);
    this.map = map;
    this.maxLength = maxLength;
  }

  createMap(list, key) {
    let maxLength = 0;
    const map = {};
    for (let i = 0; i < list.length; i++) {
      const obj = list[i];
      const str = obj[key];
      map[str] = obj;

      if (maxLength < str.length) {
        maxLength = str.length;
      }
    }
    return { map, maxLength };
  }

  search(str) {
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

module.exports = TailSearcher;
