const NodeCustomTlv = require("./Tlv.parser");
const tagDictionary = require("../test/tagDictionary");

const settings = {
  dictionary: tagDictionary,
  baseTagLength: 2,
  baseLengthTlvLength: 1,
  customByteLengths: [
    {
      startByte: "81",
      nextByteLengthDefine: 1
    },
    {
      startByte: "82",
      nextByteLengthDefine: 2
    },
    {
      startByte: "83",
      nextByteLengthDefine: 3
    }
  ]
};

const tlv = new NodeCustomTlv(settings);

const object = {
  hoddog: 0,
  hotchicken: 2,
  codeChicken: 33554443,
  errorChicken: 0,
  chickencount: 1,
  chickensLevel: {
    chickenLevelId: 1,
    specChickenName: 5524563,
    hotDogPort: 12301,
    dogCoent: 1,
    commandTimeoutChicken: 20000,
    intervalChicken: 2000,
    libraryForChickens: 2,
    logKatalogOfDOgs: 3,
    LogDogs: 1,
    LogCHickens: 1,
    LogChickenSize: 0,
    logChicken: 0,
    moduleSettings: {
      moduleLogSettings: {
        moduleLogSettingsEnable: 1
      }
    }
  }
};

let a = tlv.makeTlv(object);
let b = tlv.parseTlv(a);
console.log(a);
console.log(b);
