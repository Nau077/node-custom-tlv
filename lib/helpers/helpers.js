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

    if (
        !settings 
      ) {
        console.error("Error: Empty settings");
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


    if (typeof setting !== "object" &&
      Array.isArray(settings) &&
      settings == null
      ) {
      console.error("Error: settings is not an object")
      return !IS_VALID
    }
  
    if (
      typeof settings.dictionary !== "object" &&
      Array.isArray(settings.dictionary) &&
      settings.dictionary == null
    ) {
      console.error("Error: Dictionary is not an object");
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
      if (typeof el[1] !== "object" && Array.isArray(el[1]) && el[1] == null) {
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

  const BYTE_FACTOR = 2;

  module.exports = {
    validateArgs,
    deleteWhiteSpaces,
    createLengthParams,
    makeToUpperCase,
    computeCustomByteLengths,
    BYTE_FACTOR
  }