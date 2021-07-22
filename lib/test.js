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

const object = { hoddog: 0, chickensLevel: { hotDogPort: 12301 } };

let a = tlv.makeTlv(object);
let b = tlv.parseTlv(a);
console.log(a);
console.log(b);
