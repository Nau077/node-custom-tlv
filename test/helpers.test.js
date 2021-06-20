const expect = require("chai").expect;
const tagDictionary = require("./tagDictionary");
const {
  validateArgs,
  deleteWhiteSpaces,
  createLengthParams,
  makeToUpperCase,
  computeCustomByteLengths,
  makeBufferFromString,
  makeStringFromBuffer,
  checkForParity
} = require("../lib/helpers/helpers");

describe("#Helpers", function() {
  describe("#validateArgs", () => {
    const IS_VALID = true;

    it("should set null dictionary", () => {
      const settings = {
        dictionary: null,
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);
    });

    it("should set empty string settings", () => {
      let settings = "";

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);

      settings = null;

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);

      settings = [];

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);
    });

    it("should set empty string settings", () => {
      let settings = "";

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);

      settings = null;

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);

      settings = [];

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);
    });

    it("should set not number fields", () => {
      let settings = {
        dictionary: tagDictionary,
        baseTagLength: "kdkdk",
        baseLengthTlvLength: "jddjdj"
      };

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);
    });

    it("should set not correct dictionary", () => {
      let settings = {
        dictionary: {
          "0002": { name2: "messageId" },
          "0004": { nasame: "commandCode" }
        },
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);

      settings = {
        dictionary: {
          "0002": "dldldl"
        },
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(validateArgs(settings)).to.deep.equal(!IS_VALID);
    });

    it("should set correct settings", () => {
      let settings = {
        dictionary: tagDictionary,
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(validateArgs(settings)).to.deep.equal(IS_VALID);
    });
  });

  describe("#deleteWhiteSpaces", () => {
    it("should set string with whitespaces", () => {
      const str = "dldld ldldl       dldldld";
      const expected = "dldldldldldldldld";

      expect(deleteWhiteSpaces(str)).to.deep.equal(expected);
    });
  });

  describe("#createLengthParams", () => {
    it("should create lengths params", () => {
      const payload = {
        baselengthByte: "01",
        i: 10,
        str: "000302300D00040101",
        baseTagLength: 4,
        baseLengthTlvLength: 2,
        customByteLengthComputed: [
          {
            startByte: "81",
            nextByteLengthDefine: 2,
            iCounter: 6,
            differ: 8
          },
          {
            startByte: "82",
            nextByteLengthDefine: 4,
            iCounter: 6,
            differ: 10
          },
          {
            startByte: "83",
            nextByteLengthDefine: 6,
            iCounter: 6,
            differ: 12
          }
        ]
      };

      const expected = { length: 2, differ: 6 };

      const result = JSON.stringify(createLengthParams(payload));

      expect(result).to.deep.equal(JSON.stringify(expected));
    });

    it("should   create lengths params without customByteLengthComputed", () => {
      const payload = {
        baselengthByte: "01",
        i: 10,
        str: "000302300D00040101",
        baseTagLength: 4,
        baseLengthTlvLength: 2,
        customByteLengthComputed: null
      };

      const expected = { length: 2, differ: 6 };

      const result = JSON.stringify(createLengthParams(payload));

      expect(result).to.deep.equal(JSON.stringify(expected));
    });

    it("should with custom length bytes", () => {
      const payload = {
        baselengthByte: "81",
        i: 222,
        str:
          "00010101000203544C53000302300D0004010100050400004E20000604000007D000071F2F6C69622F7838365F36342D6C696E75782D676E752F6C6962746C732E736F0008132F7661722F6C6F672F766F6D6261742F746C7300090101000A0101000B0400000000000C0400000000000D81B600013C000101010002132F7661722F6C6F672F766F6D6261742F746C73000301010004010100050101000601010007010000080400000000000904000000000002240001010100020C2F6465762F747479555342300003093132372E302E302E310004022FB600030E000104000003E8000204000003E800043C0001010400020B000104000000010002010100020B000104000000020002010200020B000104000000030002010300020B0001040000000400020104",
        baseTagLength: 4,
        baseLengthTlvLength: 2,
        customByteLengthComputed: [
          {
            startByte: "81",
            nextByteLengthDefine: 2,
            iCounter: 6,
            differ: 8
          },
          {
            startByte: "82",
            nextByteLengthDefine: 4,
            iCounter: 6,
            differ: 10
          },
          {
            startByte: "83",
            nextByteLengthDefine: 6,
            iCounter: 6,
            differ: 12
          }
        ]
      };

      const expected = { length: 364, differ: 8 };

      const result = JSON.stringify(createLengthParams(payload));

      expect(result).to.deep.equal(JSON.stringify(expected));
    });
  });

  describe("#makeToUpperCase", () => {
    it("should makeToUpperCase", () => {
      const str = "abc";
      const expected = "ABC";
      const result = makeToUpperCase(str);
      expect(result).to.deep.equal(expected);
    });
  });

  describe("#computeCustomByteLengths", () => {
    it("should computeCustomByteLengths", () => {
      const customByteLength = [
        { startByte: "81", nextByteLengthDefine: 1 },
        { startByte: "82", nextByteLengthDefine: 2 },
        { startByte: "83", nextByteLengthDefine: 3 }
      ];
      const baseTagLength = 4;
      const result = computeCustomByteLengths(customByteLength, baseTagLength);
      const expected = [
        { startByte: "81", nextByteLengthDefine: 2, iCounter: 6, differ: 8 },
        { startByte: "82", nextByteLengthDefine: 4, iCounter: 6, differ: 10 },
        { startByte: "83", nextByteLengthDefine: 6, iCounter: 6, differ: 12 }
      ];

      expect(result).to.deep.equal(expected);
    });
  });

  describe("#makeBufferFromString", () => {
    it("should makeBufferFromString", () => {
      const expected =
        '{"type":"Buffer","data":[0,2,4,0,0,0,0,0,3,1,2,0,166,130,1,41,0,3,2,48,13]}';
      const str = "000204000000000003010200a6820129000302300d";
      const result = JSON.stringify(makeBufferFromString(str));

      expect(result).to.deep.equal(expected);
    });
  });

  describe("#makeStringFromBuffer", () => {
    it("should makeStringFromBuffer", () => {
      const str =
        "00 02 04 00 00 00 00 00 03 01 02 00 a6 82 01 29 00 03 02 30 0d";
      const buffer = makeBufferFromString(str);
      const result = makeStringFromBuffer(buffer);

      expect(result).to.deep.equal(str);
    });
  });

  describe("#checkForParity", () => {
    it("should checkForParity", () => {
      let result;
      const IS_PARITY = true;
      const str = "000204000000000003010200a6820129000302300d";
      const strUnParity = "000204000000000003010200a6820129000302300";

      result = checkForParity(str.length);
      expect(result).to.deep.equal(IS_PARITY);

      result = checkForParity(strUnParity.length);
      expect(result).to.deep.equal(!IS_PARITY);
    });
  });
});
