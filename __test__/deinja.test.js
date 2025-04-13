const deinja = require("../src/deinja");

test("adjectiveTwoChar", () => {
  testDeinflections(
    "美しい",
    "美しく",
    "美しさ",
    "美しかった",
    "美しくありませんでした",
    "美しくありません",
    "美しかったら",
    "美しかったり",
    "美しかった",
    "美しくない",
    "美しすぎる",
    "美しければ",
    "美しくて",
    "美しそう",
  );
});

test("adjectiveOneChar", () => {
  testDeinflections(
    "軽い",
    "軽く",
    "軽さ",
    "軽かった",
    "軽くありませんでした",
    "軽くありません",
    "軽かったら",
    "軽かったり",
    "軽かった",
    "軽くない",
    "軽すぎる",
    "軽ければ",
    "軽くて",
    "軽そう",
  );
});

test("suru", () => {
  testDeinflections(
    "する",
    "しませんでした",
    "しません",
    "しましょう",
    "しました",
    "します",
    "しちゃう",
    "しちゃいます",
    "しちゃった",
    "しちゃえ",
    "しちゃおう",
    "しすぎる",
    "しなさい",
    "したら",
    "したり",
    "させる",
    "される",
    "しそう",
    "したい",
    "しない",
    "すれば",
    "しよう",
    "せず",
    "して",
    "した",
    "しなかった",
    "しなければ",
    "させられる",
    "させられた",
    "したければ",
    "したくなかった",
    "したい",
    "したかった",
  );
});

test("kuruHiragana", () => {
  testDeinflections(
    "くる",
    "きませんでした",
    "きません",
    "きましょう",
    "きました",
    "きます",
    "きちゃう",
    "きちゃいます",
    "きちゃった",
    "きちゃえ",
    "きちゃおう",
    "きすぎる",
    "きなさい",
    "きたら",
    "きたり",
    "こさせる",
    "こられる",
    "きそう",
    "きたい",
    "こない",
    "くれば",
    "こよう",
    "こず",
    "きて",
    "きた",
    "こなかった",
    "こなければ",
    "こさせられる",
    "こさせられた",
    "きたければ",
    "きたくなかった",
    "きたい",
    "きたかった",
  );
});

test("kuruKanji", () => {
  testDeinflections(
    "来る",
    "来ませんでした",
    "来ません",
    "来ましょう",
    "来ました",
    "来ます",
    "来ちゃう",
    "来ちゃいます",
    "来ちゃった",
    "来ちゃえ",
    "来ちゃおう",
    "来すぎる",
    "来なさい",
    "来たら",
    "来たり",
    "来させる",
    "来られる",
    "来そう",
    "来たい",
    "来ない",
    "来れば",
    "来よう",
    "来ず",
    "来て",
    "来た",
    "来なかった",
    "来なければ",
    "来させられる",
    "来させられた",
    "来たければ",
    "来たくなかった",
    "来たい",
    "来たかった",
  );
});

test("iku", () => {
  testDeinflections(
    "いく",
    "いっちゃう",
    "いっちゃいます",
    "いっちゃった",
    "いっちゃえ",
    "いっちゃおう",
    "いったら",
    "いったり",
    "いって",
    "いった",
  );
});

test("tou", () => {
  testDeinflections(
    "とう",
    "とうて",
    "とうた", //TODO: とうたり, etc.?
  );
});

test("kou", () => {
  testDeinflections(
    "こう",
    "こうて",
    "こうた", //TODO: こうたり, etc.?
  );
});

test("aisuru", () => {
  testDeinflections(
    "愛する",
    "愛させる",
    "愛さない",
    "愛される",
    "愛しそう",
    "愛したい",
    "愛したら",
    "愛したり",
    "愛します",
    "愛しちゃいます",
    "愛しちゃった",
    "愛しちゃえ",
    "愛しちゃおう",
  );
});

const TailSearcher = require("../src/tailsearcher");

test("TailSearcher.find - 存在する語尾を検索", () => {
  // テストデータ準備
  const list = [
    { inflection: "る", base: "" },
    { inflection: "ます", base: "る" },
  ];

  const searcher = new TailSearcher(list, "inflection");

  // マップに存在する語尾を検索すると true を返す
  expect(searcher.find("食べます")).toBe(true);
  expect(searcher.find("走る")).toBe(true);
});

test("TailSearcher.find - 存在しない語尾を検索", () => {
  // テストデータ準備
  const list = [
    { inflection: "る", base: "" },
    { inflection: "ます", base: "る" },
  ];

  const searcher = new TailSearcher(list, "inflection");

  // マップに存在しない語尾を検索すると false を返す
  expect(searcher.find("歩く")).toBe(false);
  expect(searcher.find("")).toBe(false);
});

test("TailSearcher.find - エッジケース", () => {
  // 空のリスト
  const emptySearcher = new TailSearcher([], "inflection");
  expect(emptySearcher.find("何か")).toBe(false);

  // maxLengthより長い文字列
  const list = [{ inflection: "い", base: "" }];
  const searcher = new TailSearcher(list, "inflection");

  // maxLengthは1だが、長い文字列でも末尾が一致すれば見つかる
  expect(searcher.find("美しい")).toBe(true);

  // キーなしでの初期化
  const noKeyList = ["る", "ます"];
  const noKeySearcher = new TailSearcher(noKeyList);
  expect(noKeySearcher.find("食べます")).toBe(true);
});

const testDeinflections = (base, ...args) => {
  for (let i = 0; i < args.length; i++) {
    const words = deinja.convert(args[i]);
    const found = words.find((w) => w === base);
    expect(found).toBeTruthy();
  }
};
