/*
 * deinja
 * Copyright (C) 2018 wtetsu
 * https://github.com/wtetsu/deinja
 *
 * Originally based on deinflector
 * Copyright (C) 2016 James Kirk
 * https://github.com/Jimeux/deinflector
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

const suru = [
  ["しませんでした", "する", Form.POLITE_PAST_NEGATIVE],
  ["しましょう", "する", Form.POLITE_VOLITIONAL],
  ["した", "する", Form.PAST],
  ["して", "する", Form.TE],
  ["しろ", "する", Form.IMPERATIVE],
  ["せず", "する", Form.ZU],
  ["せよ", "する", Form.IMPERATIVE],
  ["しすぎる", "する", Form.SUGIRU],
  ["しちゃう", "する", Form.CHAU],
  ["しなさい", "する", Form.NASAI],
  ["しました", "する", Form.POLITE_PAST],
  ["しません", "する", Form.POLITE_NEGATIVE],
  ["させる", "する", Form.CAUSATIVE],
  ["される", "する", Form.PASSIVE],
  ["しそう", "する", Form.SOU],
  ["したい", "する", Form.TAI],
  ["したら", "する", Form.TARA],
  ["したり", "する", Form.TARI],
  ["しない", "する", Form.NEGATIVE],
  ["します", "する", Form.POLITE],
  ["しよう", "する", Form.VOLITIONAL]
];

const kuru = [
  ["来すぎる", "来る", Form.SUGIRU],
  ["来ませんでした", "来る", Form.POLITE_PAST_NEGATIVE],
  ["来ましょう", "来る", Form.POLITE_VOLITIONAL],
  ["来ちゃう", "来る", Form.CHAU],
  ["来なさい", "来る", Form.NASAI],
  ["来ました", "来る", Form.POLITE_PAST],
  ["来ません", "来る", Form.POLITE_NEGATIVE],
  ["来させる", "来る", Form.CAUSATIVE],
  ["来られる", "来る", Form.POTENTIAL_OR_PASSIVE],
  ["来そう", "来る", Form.SOU],
  ["来たい", "来る", Form.TAI],
  ["来たら", "来る", Form.TARA],
  ["来たり", "来る", Form.TARI],
  ["来ます", "来る", Form.POLITE],
  ["来ない", "来る", Form.NEGATIVE],
  ["来よう", "来る", Form.VOLITIONAL],
  ["来れる", "来る", Form.POTENTIAL],
  ["来た", "来る", Form.PAST],
  ["来て", "来る", Form.TE],
  ["来い", "来る", Form.IMPERATIVE],
  ["来ず", "来る", Form.ZU],
  ["きすぎる", "くる", Form.SUGIRU],
  ["きませんでした", "くる", Form.POLITE_PAST_NEGATIVE],
  ["きましょう", "くる", Form.POLITE_VOLITIONAL],
  ["きちゃう", "くる", Form.CHAU],
  ["きなさい", "くる", Form.NASAI],
  ["きました", "くる", Form.POLITE_PAST],
  ["きません", "くる", Form.POLITE_NEGATIVE],
  ["こさせる", "くる", Form.CAUSATIVE],
  ["こられる", "くる", Form.POTENTIAL_OR_PASSIVE],
  ["きそう", "くる", Form.SOU],
  ["きたい", "くる", Form.TAI],
  ["きたら", "くる", Form.TARA],
  ["きたり", "くる", Form.TARI],
  ["きます", "くる", Form.POLITE],
  ["こない", "くる", Form.NEGATIVE],
  ["こよう", "くる", Form.VOLITIONAL],
  ["これる", "くる", Form.POTENTIAL],
  ["きた", "くる", Form.PAST],
  ["きて", "くる", Form.TE],
  ["こい", "くる", Form.IMPERATIVE],
  ["こず", "くる", Form.ZU]
];

const iku = [
  ["いって", "いく", Form.TE],
  ["ゆって", "ゆく", Form.TE],
  ["行って", "行く", Form.TE],
  ["征って", "征く", Form.TE],
  ["逝って", "逝く", Form.TE],
  ["往って", "往く", Form.TE],
  ["いった", "いく", Form.PAST],
  ["ゆった", "ゆく", Form.PAST],
  ["行った", "行く", Form.PAST],
  ["征った", "征く", Form.PAST],
  ["逝った", "逝く", Form.PAST],
  ["往った", "往く", Form.PAST],
  ["いっちゃう", "いく", Form.CHAU],
  ["ゆっちゃう", "ゆく", Form.CHAU],
  ["行っちゃう", "行く", Form.CHAU],
  ["征っちゃう", "征く", Form.CHAU],
  ["逝っちゃう", "逝く", Form.CHAU],
  ["往っちゃう", "往く", Form.CHAU],
  ["いったら", "いく", Form.TARA],
  ["ゆったら", "ゆく", Form.TARA],
  ["行ったら", "行く", Form.TARA],
  ["征ったら", "征く", Form.TARA],
  ["逝ったら", "逝く", Form.TARA],
  ["往ったら", "往く", Form.TARA],
  ["いったり", "いく", Form.TARI],
  ["ゆったり", "ゆく", Form.TARI],
  ["行ったり", "行く", Form.TARI],
  ["征ったり", "征く", Form.TARI],
  ["逝ったり", "逝く", Form.TARI],
  ["往ったり", "往く", Form.TARI],
  ["いきませんでした", "いく", Form.POLITE_PAST_NEGATIVE],
  ["ゆきませんでした", "ゆく", Form.POLITE_PAST_NEGATIVE],
  ["行きませんでした", "行く", Form.POLITE_PAST_NEGATIVE],
  ["征きませんでした", "征く", Form.POLITE_PAST_NEGATIVE],
  ["逝きませんでした", "逝く", Form.POLITE_PAST_NEGATIVE],
  ["往きませんでした", "往く", Form.POLITE_PAST_NEGATIVE],
  ["いきましょう", "いく", Form.POLITE_VOLITIONAL],
  ["ゆきましょう", "ゆく", Form.POLITE_VOLITIONAL],
  ["行きましょう", "行く", Form.POLITE_VOLITIONAL],
  ["征きましょう", "征く", Form.POLITE_VOLITIONAL],
  ["逝きましょう", "逝く", Form.POLITE_VOLITIONAL],
  ["往きましょう", "往く", Form.POLITE_VOLITIONAL],
  ["いけ", "いく", Form.IMPERATIVE],
  ["ゆけ", "ゆく", Form.IMPERATIVE],
  ["行け", "行く", Form.IMPERATIVE],
  ["征け", "征く", Form.IMPERATIVE],
  ["逝け", "逝く", Form.IMPERATIVE],
  ["往け", "往く", Form.IMPERATIVE],
  ["いかず", "いく", Form.ZU],
  ["ゆかず", "ゆく", Form.ZU],
  ["行かず", "行く", Form.ZU],
  ["征かず", "征く", Form.ZU],
  ["逝かず", "逝く", Form.ZU],
  ["往かず", "往く", Form.ZU],
  ["いきすぎる", "いく", Form.SUGIRU],
  ["ゆきすぎる", "ゆく", Form.SUGIRU],
  ["行きすぎる", "行く", Form.SUGIRU],
  ["征きすぎる", "征く", Form.SUGIRU],
  ["逝きすぎる", "逝く", Form.SUGIRU],
  ["往きすぎる", "往く", Form.SUGIRU],
  ["いきなさい", "いく", Form.NASAI],
  ["ゆきなさい", "ゆく", Form.NASAI],
  ["行きなさい", "行く", Form.NASAI],
  ["征きなさい", "征く", Form.NASAI],
  ["逝きなさい", "逝く", Form.NASAI],
  ["往きなさい", "往く", Form.NASAI],
  ["いきました", "いく", Form.POLITE_PAST],
  ["ゆきました", "ゆく", Form.POLITE_PAST],
  ["行きました", "行く", Form.POLITE_PAST],
  ["征きました", "征く", Form.POLITE_PAST],
  ["逝きました", "逝く", Form.POLITE_PAST],
  ["往きました", "往く", Form.POLITE_PAST],
  ["いきません", "いく", Form.POLITE_NEGATIVE],
  ["ゆきません", "ゆく", Form.POLITE_NEGATIVE],
  ["行きません", "行く", Form.POLITE_NEGATIVE],
  ["征きません", "征く", Form.POLITE_NEGATIVE],
  ["逝きません", "逝く", Form.POLITE_NEGATIVE],
  ["往きません", "往く", Form.POLITE_NEGATIVE],
  ["いかせる", "いく", Form.CAUSATIVE],
  ["ゆかせる", "ゆく", Form.CAUSATIVE],
  ["行かせる", "行く", Form.CAUSATIVE],
  ["征かせる", "征く", Form.CAUSATIVE],
  ["逝かせる", "逝く", Form.CAUSATIVE],
  ["往かせる", "往く", Form.CAUSATIVE],
  ["いかれる", "いく", Form.PASSIVE],
  ["ゆかれる", "ゆく", Form.PASSIVE],
  ["行かれる", "行く", Form.PASSIVE],
  ["征かれる", "征く", Form.PASSIVE],
  ["逝かれる", "逝く", Form.PASSIVE],
  ["往かれる", "往く", Form.PASSIVE],
  ["いきそう", "いく", Form.SOU],
  ["ゆきそう", "ゆく", Form.SOU],
  ["行きそう", "行く", Form.SOU],
  ["征きそう", "征く", Form.SOU],
  ["逝きそう", "逝く", Form.SOU],
  ["往きそう", "往く", Form.SOU],
  ["いきたい", "いく", Form.TAI],
  ["ゆきたい", "ゆく", Form.TAI],
  ["行きたい", "行く", Form.TAI],
  ["征きたい", "征く", Form.TAI],
  ["逝きたい", "逝く", Form.TAI],
  ["往きたい", "往く", Form.TAI],
  ["いかない", "いく", Form.NEGATIVE],
  ["ゆかない", "ゆく", Form.NEGATIVE],
  ["行かない", "行く", Form.NEGATIVE],
  ["征かない", "征く", Form.NEGATIVE],
  ["逝かない", "逝く", Form.NEGATIVE],
  ["往かない", "往く", Form.NEGATIVE],
  ["いきます", "いく", Form.POLITE],
  ["ゆきます", "ゆく", Form.POLITE],
  ["行きます", "行く", Form.POLITE],
  ["征きます", "征く", Form.POLITE],
  ["逝きます", "逝く", Form.POLITE],
  ["往きます", "往く", Form.POLITE],
  ["いこう", "いく", Form.VOLITIONAL],
  ["ゆこう", "ゆく", Form.VOLITIONAL],
  ["行こう", "行く", Form.VOLITIONAL],
  ["征こう", "征く", Form.VOLITIONAL],
  ["逝こう", "逝く", Form.VOLITIONAL],
  ["往こう", "往く", Form.VOLITIONAL]
];

const special = [
  ["訪うて", "訪う", Form.TE],
  ["問うて", "問う", Form.TE],
  ["とうて", "とう", Form.TE],
  ["訪うた", "訪う", Form.PAST],
  ["問うた", "問う", Form.PAST],
  ["とうた", "とう", Form.PAST],
  ["乞うて", "乞う", Form.TE],
  ["恋うて", "恋う", Form.TE],
  ["請うて", "請う", Form.TE],
  ["こうて", "こう", Form.TE],
  ["乞うた", "乞う", Form.PAST],
  ["恋うた", "恋う", Form.PAST],
  ["請うた", "請う", Form.PAST],
  ["こうた", "こう", Form.PAST]
];

const ichidan = [
  ["ません", "る", Form.POLITE_NEGATIVE],
  ["ました", "る", Form.POLITE_PAST],
  ["らせる", "る", Form.CAUSATIVE],
  ["らない", "る", Form.NEGATIVE],
  ["られる", "る", Form.POTENTIAL_OR_PASSIVE],
  ["られ", "る", Form.POTENTIAL_OR_PASSIVE],
  ["たら", "る", Form.TARA],
  ["たり", "る", Form.TARI],
  ["そう", "る", Form.SOU],
  ["たい", "る", Form.TAI],
  ["ない", "る", Form.NEGATIVE],
  ["ます", "る", Form.POLITE],
  ["よう", "る", Form.VOLITIONAL],
  ["れば", "る", Form.BA],
  ["ず", "る", Form.ZU],
  ["て", "る", Form.TE],
  ["ろ", "る", Form.IMPERATIVE],
  ["た", "る", Form.PAST],
  ["ちゃう", "る", Form.CHAU],
  ["ませんでした", "る", Form.POLITE_PAST_NEGATIVE],
  ["ましょう", "る", Form.POLITE_VOLITIONAL],
  ["させる", "る", Form.CAUSATIVE],
  ["すぎる", "る", Form.SUGIRU],
  ["なさい", "る", Form.NASAI]
];

const adjective = [
  ["くありませんでした", "い", Form.POLITE_PAST_NEGATIVE],
  ["くありません", "い", Form.POLITE_NEGATIVE],
  ["かったら", "い", Form.TARA],
  ["かったり", "い", Form.TARI],
  ["かった", "い", Form.PAST],
  ["くない", "い", Form.NEGATIVE],
  ["すぎる", "い", Form.SUGIRU],
  ["ければ", "い", Form.BA],
  ["くて", "い", Form.TE],
  ["そう", "い", Form.SOU],
  ["く", "い", Form.ADV],
  ["さ", "い", Form.NOUN]
];

const godan = [
  ["いませんでした", "う", Form.POLITE_PAST_NEGATIVE],
  ["きませんでした", "く", Form.POLITE_PAST_NEGATIVE],
  ["ぎませんでした", "ぐ", Form.POLITE_PAST_NEGATIVE],
  ["しませんでした", "す", Form.POLITE_PAST_NEGATIVE],
  ["ちませんでした", "つ", Form.POLITE_PAST_NEGATIVE],
  ["にませんでした", "ぬ", Form.POLITE_PAST_NEGATIVE],
  ["びませんでした", "ぶ", Form.POLITE_PAST_NEGATIVE],
  ["みませんでした", "む", Form.POLITE_PAST_NEGATIVE],
  ["りませんでした", "る", Form.POLITE_PAST_NEGATIVE],
  ["いましょう", "う", Form.POLITE_VOLITIONAL],
  ["きましょう", "く", Form.POLITE_VOLITIONAL],
  ["ぎましょう", "ぐ", Form.POLITE_VOLITIONAL],
  ["しましょう", "す", Form.POLITE_VOLITIONAL],
  ["ちましょう", "つ", Form.POLITE_VOLITIONAL],
  ["にましょう", "ぬ", Form.POLITE_VOLITIONAL],
  ["びましょう", "ぶ", Form.POLITE_VOLITIONAL],
  ["みましょう", "む", Form.POLITE_VOLITIONAL],
  ["りましょう", "る", Form.POLITE_VOLITIONAL],
  ["しちゃいます", "する", Form.CHAU],
  ["しちゃった", "する", Form.CHAU],
  ["しちゃおう", "する", Form.CHAU],
  ["しちゃえ", "する", Form.CHAU],
  ["いじゃう", "ぐ", Form.CHAU],
  ["いすぎる", "う", Form.SUGIRU],
  ["いちゃう", "く", Form.CHAU],
  ["いなさい", "う", Form.NASAI],
  ["いました", "う", Form.POLITE_PAST],
  ["いません", "う", Form.POLITE_NEGATIVE],
  ["きすぎる", "く", Form.SUGIRU],
  ["ぎすぎる", "ぐ", Form.SUGIRU],
  ["きなさい", "く", Form.NASAI],
  ["ぎなさい", "ぐ", Form.NASAI],
  ["きました", "く", Form.POLITE_PAST],
  ["ぎました", "ぐ", Form.POLITE_PAST],
  ["きません", "く", Form.POLITE_NEGATIVE],
  ["ぎません", "ぐ", Form.POLITE_NEGATIVE],
  ["しすぎる", "す", Form.SUGIRU],
  ["しちゃう", "す", Form.CHAU],
  ["しなさい", "す", Form.NASAI],
  ["しました", "す", Form.POLITE_PAST],
  ["しません", "す", Form.POLITE_NEGATIVE],
  ["ちすぎる", "つ", Form.SUGIRU],
  ["ちなさい", "つ", Form.NASAI],
  ["ちました", "つ", Form.POLITE_PAST],
  ["ちません", "つ", Form.POLITE_NEGATIVE],
  ["っちゃう", "う", Form.CHAU],
  ["っちゃう", "つ", Form.CHAU],
  ["っちゃう", "る", Form.CHAU],
  ["にすぎる", "ぬ", Form.SUGIRU],
  ["になさい", "ぬ", Form.NASAI],
  ["にました", "ぬ", Form.POLITE_PAST],
  ["にません", "ぬ", Form.POLITE_NEGATIVE],
  ["びすぎる", "ぶ", Form.SUGIRU],
  ["びなさい", "ぶ", Form.NASAI],
  ["びました", "ぶ", Form.POLITE_PAST],
  ["びません", "ぶ", Form.POLITE_NEGATIVE],
  ["みすぎる", "む", Form.SUGIRU],
  ["みなさい", "む", Form.NASAI],
  ["みました", "む", Form.POLITE_PAST],
  ["みません", "む", Form.POLITE_NEGATIVE],
  ["りすぎる", "る", Form.SUGIRU],
  ["りなさい", "る", Form.NASAI],
  ["りました", "る", Form.POLITE_PAST],
  ["りません", "る", Form.POLITE_NEGATIVE],
  ["んじゃう", "ぬ", Form.CHAU],
  ["んじゃう", "ぶ", Form.CHAU],
  ["んじゃう", "む", Form.CHAU],
  ["いそう", "う", Form.SOU],
  ["いたい", "う", Form.TAI],
  ["いたら", "く", Form.TARA],
  ["いだら", "ぐ", Form.TARA],
  ["いたり", "く", Form.TARI],
  ["いだり", "ぐ", Form.TARI],
  ["います", "う", Form.POLITE],
  ["かせる", "く", Form.CAUSATIVE],
  ["がせる", "ぐ", Form.CAUSATIVE],
  ["かない", "く", Form.NEGATIVE],
  ["がない", "ぐ", Form.NEGATIVE],
  ["かれる", "く", Form.PASSIVE],
  ["がれる", "ぐ", Form.PASSIVE],
  ["きそう", "く", Form.SOU],
  ["ぎそう", "ぐ", Form.SOU],
  ["きたい", "く", Form.TAI],
  ["ぎたい", "ぐ", Form.TAI],
  ["きます", "く", Form.POLITE],
  ["ぎます", "ぐ", Form.POLITE],
  ["させる", "する", Form.CAUSATIVE],
  ["さない", "する", Form.NEGATIVE],
  ["される", "する", Form.PASSIVE_OR_CAUSATIVE],
  ["しそう", "する", Form.SOU],
  ["したい", "する", Form.TAI],
  ["したら", "する", Form.TARA],
  ["したり", "する", Form.TARI],
  ["します", "する", Form.POLITE],
  ["させる", "す", Form.CAUSATIVE],
  ["さない", "す", Form.NEGATIVE],
  ["される", "す", Form.PASSIVE_OR_CAUSATIVE],
  ["しそう", "す", Form.SOU],
  ["したい", "す", Form.TAI],
  ["したら", "す", Form.TARA],
  ["したり", "す", Form.TARI],
  ["します", "す", Form.POLITE],
  ["たせる", "つ", Form.CAUSATIVE],
  ["たない", "つ", Form.NEGATIVE],
  ["たれる", "つ", Form.PASSIVE],
  ["ちそう", "つ", Form.SOU],
  ["ちたい", "つ", Form.TAI],
  ["ちます", "つ", Form.POLITE],
  ["ったら", "う", Form.TARA],
  ["ったら", "つ", Form.TARA],
  ["ったら", "る", Form.TARA],
  ["ったり", "う", Form.TARI],
  ["ったり", "つ", Form.TARI],
  ["ったり", "る", Form.TARI],
  ["なせる", "ぬ", Form.CAUSATIVE],
  ["なない", "ぬ", Form.NEGATIVE],
  ["なれる", "ぬ", Form.PASSIVE],
  ["にそう", "ぬ", Form.SOU],
  ["にたい", "ぬ", Form.TAI],
  ["にます", "ぬ", Form.POLITE],
  ["ばせる", "ぶ", Form.CAUSATIVE],
  ["ばない", "ぶ", Form.NEGATIVE],
  ["ばれる", "ぶ", Form.PASSIVE],
  ["びそう", "ぶ", Form.SOU],
  ["びたい", "ぶ", Form.TAI],
  ["びます", "ぶ", Form.POLITE],
  ["ませる", "む", Form.CAUSATIVE],
  ["まない", "む", Form.NEGATIVE],
  ["まれる", "む", Form.PASSIVE],
  ["みそう", "む", Form.SOU],
  ["みたい", "む", Form.TAI],
  ["みます", "む", Form.POLITE],
  ["りそう", "る", Form.SOU],
  ["りたい", "る", Form.TAI],
  ["ります", "る", Form.POLITE],
  ["わせる", "う", Form.CAUSATIVE],
  ["わない", "う", Form.NEGATIVE],
  ["われる", "う", Form.PASSIVE],
  ["んだら", "ぬ", Form.TARA],
  ["んだら", "ぶ", Form.TARA],
  ["んだら", "む", Form.TARA],
  ["んだり", "ぬ", Form.TARI],
  ["んだり", "ぶ", Form.TARI],
  ["んだり", "む", Form.TARI],
  ["いた", "く", Form.PAST],
  ["いだ", "ぐ", Form.PAST],
  ["いて", "く", Form.TE],
  ["いで", "ぐ", Form.TE],
  ["えば", "う", Form.BA],
  ["える", "う", Form.POTENTIAL],
  ["おう", "う", Form.VOLITIONAL],
  ["かず", "く", Form.ZU],
  ["がず", "ぐ", Form.ZU],
  ["けば", "く", Form.BA],
  ["げば", "ぐ", Form.BA],
  ["ける", "く", Form.POTENTIAL],
  ["げる", "ぐ", Form.POTENTIAL],
  ["こう", "く", Form.VOLITIONAL],
  ["ごう", "ぐ", Form.VOLITIONAL],
  ["さず", "す", Form.ZU],
  ["した", "す", Form.PAST],
  ["して", "す", Form.TE],
  ["せば", "す", Form.BA],
  ["せる", "す", Form.POTENTIAL],
  ["そう", "す", Form.VOLITIONAL],
  ["たず", "つ", Form.ZU],
  ["った", "う", Form.PAST],
  ["った", "つ", Form.PAST],
  ["った", "る", Form.PAST],
  ["って", "う", Form.TE],
  ["って", "つ", Form.TE],
  ["って", "る", Form.TE],
  ["てば", "つ", Form.BA],
  ["てる", "つ", Form.POTENTIAL],
  ["とう", "つ", Form.VOLITIONAL],
  ["なず", "ぬ", Form.ZU],
  ["ねば", "ぬ", Form.BA],
  ["ねる", "ぬ", Form.POTENTIAL],
  ["のう", "ぬ", Form.VOLITIONAL],
  ["ばず", "ぶ", Form.ZU],
  ["べば", "ぶ", Form.BA],
  ["べる", "ぶ", Form.POTENTIAL],
  ["ぼう", "ぶ", Form.VOLITIONAL],
  ["まず", "む", Form.ZU],
  ["めば", "む", Form.BA],
  ["める", "む", Form.POTENTIAL],
  ["もう", "む", Form.VOLITIONAL],
  ["らず", "る", Form.ZU],
  ["れば", "る", Form.BA],
  ["れる", "る", Form.POTENTIAL],
  ["ろう", "る", Form.VOLITIONAL],
  ["わず", "う", Form.ZU],
  ["んだ", "ぬ", Form.PAST],
  ["んだ", "ぶ", Form.PAST],
  ["んだ", "む", Form.PAST],
  ["んで", "ぬ", Form.TE],
  ["んで", "ぶ", Form.TE],
  ["んで", "む", Form.TE],
  ["い", "いる", Form.MASU_STEM],
  ["い", "う", Form.MASU_STEM],
  ["え", "う", Form.IMPERATIVE],
  ["え", "える", Form.MASU_STEM],
  ["き", "きる", Form.MASU_STEM],
  ["き", "く", Form.MASU_STEM],
  ["ぎ", "ぎる", Form.MASU_STEM],
  ["ぎ", "ぐ", Form.MASU_STEM],
  ["け", "く", Form.IMPERATIVE],
  ["け", "ける", Form.MASU_STEM],
  ["げ", "ぐ", Form.IMPERATIVE],
  ["げ", "げる", Form.MASU_STEM],
  ["し", "す", Form.MASU_STEM],
  ["じ", "じる", Form.MASU_STEM],
  ["せ", "す", Form.IMPERATIVE],
  ["せ", "せる", Form.MASU_STEM],
  ["ぜ", "ぜる", Form.MASU_STEM],
  ["ち", "ちる", Form.MASU_STEM],
  ["ち", "つ", Form.MASU_STEM],
  ["て", "つ", Form.IMPERATIVE],
  ["て", "てる", Form.MASU_STEM],
  ["で", "でる", Form.MASU_STEM],
  ["に", "にる", Form.MASU_STEM],
  ["に", "ぬ", Form.MASU_STEM],
  ["ね", "ぬ", Form.IMPERATIVE],
  ["ね", "ねる", Form.MASU_STEM],
  ["ひ", "ひる", Form.MASU_STEM],
  ["び", "びる", Form.MASU_STEM],
  ["び", "ぶ", Form.MASU_STEM],
  ["へ", "へる", Form.MASU_STEM],
  ["べ", "ぶ", Form.IMPERATIVE],
  ["べ", "べる", Form.MASU_STEM],
  ["み", "みる", Form.MASU_STEM],
  ["み", "む", Form.MASU_STEM],
  ["め", "む", Form.IMPERATIVE],
  ["め", "める", Form.MASU_STEM],
  ["り", "りる", Form.MASU_STEM],
  ["り", "る", Form.MASU_STEM],
  ["れ", "る", Form.IMPERATIVE],
  ["れ", "れる", Form.MASU_STEM],
  ["れ", "れる", Form.MASU_STEM],
  ["らせる", "る", Form.CAUSATIVE],
  ["らない", "る", Form.NEGATIVE],
  ["られる", "る", Form.POTENTIAL_OR_PASSIVE],
  ["られ", "る", Form.POTENTIAL_OR_PASSIVE],
  ["れば", "る", Form.BA]
];

const bogus = [
  "あつ",
  "あぐ",
  "あす",
  "あず",
  "あぬ",
  "あふ",
  "あぶ",
  "いつ",
  "えつ",
  "きう",
  "くなかう",
  "くなかる",
  "させられる",
  "しつ",
  "しう",
  "じう",
  "じつ",
  "たいる",
  "たかつ",
  "たくなう",
  "ちゃつ",
  "てう",
  "てつ",
  "っつ",
  "ってる",
  "です",
  "ないる",
  "なかつ",
  "なさう",
  "さいる",
  "ましる",
  "っる",
  "べう",
  "べす",
  "べつ",
  "やつ",
  "らる",
  "んでしる",
  "にる"
];

export default {
  adjective,
  ichidan,
  godan,
  suru,
  kuru,
  special,
  iku,
  bogus
};
