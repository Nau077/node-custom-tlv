const BYTE_FACTOR = 2;

function computeCustomByteLengths(customByteLengths, baseTagLength) {
  return customByteLengths.map(el => {
    const helpObj = {
      startByte: el.startByte,
      nextByteLengthDefine: el.nextByteLengthDefine * BYTE_FACTOR,
      iCounter: el.startByte.length * 3,
      differ:
        baseTagLength +
        el.startByte.length +
        el.nextByteLengthDefine * BYTE_FACTOR
    };

    return helpObj;
  });
}

function deleteWhiteSpaces(str) {
  return str.replace(/\s/g, "");
}

function makeToUpperCase(str) {
  return str.toUpperCase();
}

function validateArgs(settings) {
  const IS_VALID = true;
  const NAME = "name";
  const NESTED = "nested";

  if (!settings) {
    console.error("Error: Empty settings");
    return !IS_VALID;
  }

  if (
    typeof settings !== "object" ||
    Array.isArray(settings) ||
    settings == null
  ) {
    console.error("Error: settings is not an object");
    return !IS_VALID;
  }

  if (
    !settings.dictionary ||
    !settings.baseTagLength ||
    !settings.baseLengthTlvLength
  ) {
    console.error("Error: Empty needed arguments");
    return !IS_VALID;
  }

  if (
    typeof settings.baseTagLength !== "number" ||
    typeof settings.baseLengthTlvLength !== "number"
  ) {
    console.error(
      "Error: baseLengthTlvLength or baseTagLength is not a number"
    );
    return !IS_VALID;
  }

  const arrDictionary = Object.entries(settings.dictionary);

  return arrDictionary.every(el => {
    if (typeof el[1] !== "object" || Array.isArray(el[1]) || el[1] == null) {
      console.error("Error: incorrect dictionary structure");
      return !IS_VALID;
    }

    const key = Object.entries(el[1])[0][0];

    if (key != NAME && key != NESTED) {
      console.error(
        "Error: incorrect dictionary structure, incorrect dictionary keys: " +
          key
      );
      return !IS_VALID;
    }

    return IS_VALID;
  });
}

function createLengthParams({
  baselengthByte,
  i,
  str,
  baseTagLength,
  baseLengthTlvLength,
  customByteLengthComputed
}) {
  let length;
  let differ;

  if (!customByteLengthComputed) {
    differ = baseTagLength + baseLengthTlvLength;
    length = 2 * parseInt(baselengthByte, 16);

    return {
      length,
      differ
    };
  }

  if (customByteLengthComputed) {
    const neededByte = customByteLengthComputed.find(
      g => g.startByte == baselengthByte
    );

    if (!neededByte) {
      differ = baseTagLength + baseLengthTlvLength;
      length = BYTE_FACTOR * parseInt(baselengthByte, 16);

      return {
        length,
        differ
      };
    }

    if (neededByte) {
      const IS_CONTINUE_CYCLE = true;

      customByteLengthComputed.every(el => {
        if (el.startByte == baselengthByte) {
          const lenthByte = str.substring(i + el.iCounter, i + el.differ);
          length = BYTE_FACTOR * parseInt(lenthByte, 16);
          differ = el.differ;

          return !IS_CONTINUE_CYCLE;
        }
        return IS_CONTINUE_CYCLE;
      });

      return {
        length,
        differ
      };
    }
  }
}

function makeBufferFromString(string) {
  string = deleteWhiteSpaces(string);

  const stringFirBuffer = string.match(/.{1,2}/g).map(el => "0x" + el);

  return Buffer.from(stringFirBuffer);
}

function makeStringFromBuffer(buffer) {
  let string = "";

  for (item of buffer.entries()) {
    let byte = String(item[1].toString(16));

    if (byte.length < 2) {
      byte = 0 + byte;
      string = string + byte;
    } else {
      string = string + byte;
    }
  }

  return string
    .split(/(.{2})/)
    .filter(O => O)
    .join(",")
    .replace(/,/g, " ");
}

function checkForParity(data) {
  const IS_PARITY = true;

  if (data % 2) {
    return !IS_PARITY;
  } else {
    return IS_PARITY;
  }
}

function makeReverseDictionary(dictionary) {
  return Object.entries(dictionary).reduce((acc, el) => {
    let key = el[1].name;
    let value = el[0];
    let newEl = {};
    newEl[key] = value;

    return { ...acc, ...newEl };
  }, {});
}

function balanceParityValueLength(length) {
  if ((length.length / 2) % 2 !== 0) {
    return "0" + length / 2;
  } else {
    return length / 2;
  }
}

function balanceParity(length) {
  if (String(length).length % 2 !== 0) {
    return "0" + length;
  } else {
    return length;
  }
}

function makeTlvLength(tlvValuelength, customByteLengths) {
  const customByteLengthsArray = Object.entries(customByteLengths);
  const symbolLength = tlvValuelength / 2;
  const syst16 = symbolLength.toString(16);

  if (String(syst16).length == 2 || String(syst16).length == 1) {
    return balanceParity(syst16);
  } else if (String(syst16).length > 2 && String(syst16).length > 5) {
    const customElLength = customByteLengthsArray.find(
      el => el[1].nextByteLengthDefine == 2
    );
    const customStartByte = customElLength[1].startByte;

    return customStartByte + balanceParity(syst16);
  } else {
    const customElLength = customByteLengthsArray.find(
      el => el[1].nextByteLengthDefine == 3
    );
    const customStartByte = customElLength[1].startByte;

    return customStartByte + balanceParity(syst16);
  }
}

module.exports = {
  validateArgs,
  deleteWhiteSpaces,
  createLengthParams,
  makeToUpperCase,
  computeCustomByteLengths,
  makeBufferFromString,
  makeStringFromBuffer,
  checkForParity,
  makeReverseDictionary,
  balanceParityValueLength,
  makeTlvLength,
  BYTE_FACTOR
};
