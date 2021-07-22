const {
  validateArgs,
  deleteWhiteSpaces,
  createLengthParams,
  makeToUpperCase,
  computeCustomByteLengths,
  makeStringFromBuffer,
  checkForParity,
  makeReverseDictionary,
  makeTlvLength,
  balanceParityValueLength,
  BYTE_FACTOR
} = require("./helpers/helpers");

let finalJson = {};
let finalTlvString = "";

class NestedContext {
  context;

  constructor(parentTag, length) {
    this.context = {
      parentTag,
      parentLength: length
    };
  }

  get context() {
    return this.context;
  }
}

class NodeCustomTlv {
  dictionary = {};

  baseTagLength = BYTE_FACTOR * 2;

  baseLengthTlvLength = BYTE_FACTOR * 1;

  customByteLengths = null;

  customByteLengthComputed = [];

  dictionaryReverse = {};

  constructor(settings) {
    if (!validateArgs(settings)) {
      return;
    }

    this.dictionary = settings.dictionary;
    this.baseTagLength = BYTE_FACTOR * settings.baseTagLength;
    this.baseLengthTlvLength = BYTE_FACTOR * settings.baseLengthTlvLength;
    this.customByteLengths = settings.customByteLengths;
    this.dictionaryReverse = makeReverseDictionary(settings.dictionary);

    finalJson = {};
  }

  makeTlv(data) {
    if (data && data.constructor !== Object) {
      console.error("data is not an object");
      return;
    }

    let tlvTag = "";
    let tlvValue = "";
    let tlvValueLength = "";
    let isNest = false;
    let helpValue = "";

    Object.keys(data).forEach(key => {
      if (this.dictionaryReverse[key] && typeof data[key] !== "object") {
        tlvTag = this.dictionaryReverse[key];
        tlvValue = makeToUpperCase(data[key].toString(16));

        let keyArray = tlvTag.split("-");

        if (keyArray.length >= 2) {
          tlvTag = keyArray[keyArray.length - 1];

          if (tlvValue.length < 2 || tlvValue.length % 2 !== 0) {
            tlvValue = "0" + tlvValue;
          }

          if ((String(tlvValue).length / 2) % 2 !== 0) {
            tlvValueLength = "0" + tlvValue.length / 2;
          } else {
            tlvValueLength = String(tlvValue).length / 2;

            if (String(tlvValueLength).length % 2 !== 0) {
              tlvValueLength = `${0}${tlvValueLength}`;
            }
          }

          isNest = true;
          helpValue = tlvTag + tlvValueLength + tlvValue;
        } else {
          finalTlvString += this.dictionaryReverse[key];

          if (String(tlvValue).length % 2 !== 0) {
            tlvValue = "0" + tlvValue;
          }

          tlvValueLength = balanceParityValueLength(tlvValue.length);

          isNest = false;
          finalTlvString += tlvValueLength + tlvValue;
        }
      }

      if (typeof data[key] === "object") {
        tlvTag = this.dictionaryReverse[key];
        let r = data[key];
        r;
        tlvValue = this.makeTlv(data[key]);

        if (String(tlvValue).length % 2 !== 0) {
          tlvValue = "0" + tlvValue;
        }

        tlvValueLength = makeTlvLength(tlvValue.length, this.customByteLengths);

        let keyArray = tlvTag.split("-");

        tlvTag = keyArray[keyArray.length - 1];

        finalTlvString += tlvTag + tlvValueLength + tlvValue;
      }
    });

    if (isNest) {
      return helpValue;
    } else {
      return finalTlvString;
    }
  }

  parseTlv(data, nestedContext = null) {
    let str;

    if (typeof data == "string") {
      str = data;
    } else if (Buffer.isBuffer(data)) {
      str = makeStringFromBuffer(buffer);
    } else {
      console.error("wrong first argument: " + data);
      return;
    }

    str = deleteWhiteSpaces(str);
    str = makeToUpperCase(str);

    let initialStr;

    if (!checkForParity(str.length)) {
      console.error("fail of string parity, length: " + str.length);
      return;
    }

    if (!nestedContext) {
      initialStr = str;

      if (this.customByteLengths && this.customByteLengths.length) {
        this.customByteLengthComputed = computeCustomByteLengths(
          this.customByteLengths,
          this.baseTagLength
        );
      }
    }

    if (nestedContext && !(nestedContext instanceof NestedContext)) {
      console.error("wrong second argument: " + nestedContext);
      return;
    }

    const k = this.baseTagLength;
    let help_nested = {};

    for (let i = 0; i < str.length; ) {
      const help_obj = {};
      let tagObj;
      let value;
      let fullTag;
      let tagName;

      const tag = str.substr(i, k);

      if (
        nestedContext &&
        nestedContext.context &&
        nestedContext.context.parentTag
      ) {
        fullTag = nestedContext.context.parentTag + tag;
      } else {
        fullTag = tag;
      }

      tagObj = this.dictionary[fullTag];

      if (!tagObj) {
        tagName = fullTag;
      } else {
        tagName = tagObj.name;
      }

      const lenthByte = str.substring(
        i + this.baseTagLength,
        i + this.baseTagLength + this.baseLengthTlvLength
      );

      const createLengthPayload = {
        baselengthByte: lenthByte,
        i,
        str,
        baseTagLength: this.baseTagLength,
        baseLengthTlvLength: this.baseLengthTlvLength,
        customByteLengthComputed: this.customByteLengthComputed
          ? this.customByteLengthComputed
          : null
      };

      const { length, differ } = createLengthParams(createLengthPayload);

      if (tagObj && tagObj.nested) {
        value = str.substring(i + differ, i + differ + length);

        const parentTag = `${fullTag}-`;

        const nestedContext = new NestedContext(parentTag, length);

        help_obj[tagName] = this.parseTlv(value, nestedContext);
      }

      if (
        (tagObj && !tagObj.nested && !nestedContext) ||
        (!tagObj && !nestedContext)
      ) {
        value = str.substring(i + differ, i + differ + length);

        help_obj[tagName] = parseInt(value, 16);

        finalJson = { ...finalJson, ...help_obj };
      }

      if (
        nestedContext &&
        nestedContext.context &&
        nestedContext.context.parentTag &&
        tagObj &&
        !tagObj.nested
      ) {
        value = str.substring(i + differ, i + differ + length);
        help_obj[tagName] = parseInt(value, 16);
        help_nested = { ...help_nested, ...help_obj };
      }

      if (
        nestedContext &&
        nestedContext.context &&
        nestedContext.context.parentTag &&
        tagObj &&
        tagObj.nested
      ) {
        help_nested = { ...help_nested, ...help_obj };
      }

      if (!nestedContext && tagObj && tagObj.nested) {
        finalJson = { ...finalJson, ...help_obj };
      }

      if (!nestedContext && initialStr.length - 1 <= i + differ + length) {
        return finalJson;
      }

      i = i + differ + length;
    }

    if (
      nestedContext &&
      nestedContext.context &&
      nestedContext.context.parentTag &&
      nestedContext.context.parentLength
    ) {
      return help_nested;
    }
  }
}

module.exports = NodeCustomTlv;
