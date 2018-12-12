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
      const str = key ? obj[key] : obj;

      let arr = map[str];
      if (!arr) {
        arr = [];
        map[str] = arr;
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
    for (let i = this.maxLength; i >= 1; i--) {
      const tail = str.substring(str.length - i, str.length);
      const r = this.map[tail];
      if (r) {
        result.push(...r);
      }
    }
    return result;
  }

  find(str) {
    let result = null;
    for (let i = this.maxLength; i >= 1; i--) {
      const tail = str.substring(str.length - i, str.length);
      const r = this.map[tail];
      if (r) {
        result = true;
        break;
      }
    }
    return result;
  }
}

module.exports = TailSearcher;
