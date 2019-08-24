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

export default InflectionType;
