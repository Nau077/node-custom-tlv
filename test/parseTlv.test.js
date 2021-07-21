const expect = require("chai").expect;
const NodeCustomTlv = require("../lib/Tlv.parser");
const tagDictionary = require("./tagDictionary");

describe("#Tlv.parser", function() {
  describe("#constructor", () => {
    it("should set correct settings", () => {
      const settings = {
        dictionary: tagDictionary,
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      const instance = new NodeCustomTlv(settings);

      expect(instance.dictionary).to.deep.equal(settings.dictionary);
      expect(instance.baseTagLength).to.deep.equal(settings.baseTagLength * 2);
      expect(instance.baseLengthTlvLength).to.deep.equal(
        settings.baseLengthTlvLength * 2
      );
    });

    it("should set wrong settings", () => {
      let settings = {
        dictionary: "dkdkdkdk",
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      const instance = new NodeCustomTlv(settings);

      settings = {
        dictionary: "dkdkdkdk",
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(instance.dictionary).to.deep.equal({});

      settings = {
        dictionary: null,
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(instance.dictionary).to.deep.equal({});

      settings = {
        dictionary: { name: "name" },
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(instance.dictionary).to.deep.equal({});

      settings = {
        dictionary: [],
        baseTagLength: 2,
        baseLengthTlvLength: 1
      };

      expect(instance.dictionary).to.deep.equal({});
    });
  });

  it("should return object for short string", function() {
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

    const expected = { hoddog: 0, chickensLevel: { hotDogPort: 12301 } };

    const str = "0002 04 00000000 00A6 05 0003 02 30 0d";
    const result = tlv.parseTlv(str);

    expect(result).to.be.an("object");
    const arrResult = Object.entries(result);
    expect(arrResult).to.have.length(2);
    expect(arrResult[1][0]).to.have.length(13);
    expect(JSON.stringify(result)).to.eql(JSON.stringify(expected));
  });

  it("should return long term", function() {
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

    let str =
      "00020400000000000301020004040200000B0081010000A5010100A682012900010101000203544C53000302300D0004010100050400004E20000604000007D000071F2F6C69622F7838365F36342D6C696E75782D676E752F6C6962746C732E736F0008132F7661722F6C6F672F766F6D6261742F746C7300090101000A0101000B0400000000000C0400000000000D81B600013C000101010002132F7661722F6C6F672F766F6D6261742F746C73000301010004010100050101000601010007010000080400000000000904000000000002240001010100020C2F6465762F747479555342300003093132372E302E302E310004022FB600030E000104000003E8000204000003E800043C0001010400020B000104000000010002010100020B000104000000020002010200020B000104000000030002010300020B0001040000000400020104";
    const result = tlv.parseTlv(str);

    const expected = {
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
        libraryForChickens: 8.379004178456994e73,
        logKatalogOfDOgs: 1.0584474332387072e45,
        LogDogs: 1,
        LogCHickens: 1,
        LogChickenSize: 0,
        logChicken: 0,
        moduleSettings: {
          moduleLogSettings: {
            moduleLogSettingsEnable: 1,
            directory: 1.0584474332387072e45,
            "log_ trace": 1,
            log_system: 1,
            log_requests: 1,
            log_frames: 1,
            log_parsing: 0,
            log_file_size: 0,
            log_save_days: 0
          },
          connectionSettings: {
            type: 1,
            portConnection: 1.4667167182714737e28,
            ipAddress: 907508871221851700000,
            anotherPort: 12214
          },
          timeoutSettings: { read: 1000, write: 1000 },
          mapping: { tanksCount: 4, tank: { externalNum: 4, channelNum: 4 } }
        }
      }
    };
    expect(JSON.stringify(result)).to.eql(JSON.stringify(expected));
  });

  it("should return object for middle string", function() {
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

    const expected = {
      hoddog: 0,
      chickensLevel: { hotDogPort: 12301, dogCoent: 1 }
    };

    const str = "0002 04 00000000 00A6 09 0003 02 300d 0004 01 01";
    const result = tlv.parseTlv(str);
    const expectedPort = 12301;
    const arrResult = Object.entries(result);

    expect(result).to.be.an("object");
    expect(JSON.stringify(result)).to.eql(JSON.stringify(expected));
    expect(arrResult[1][1].hotDogPort).to.eql(expectedPort);
  });

  it("should not return object for incorrect", function() {
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
    const expected = undefined;
    const str = { ddlld: "dldl" };
    const result = tlv.parseTlv(str);

    expect(result).to.eql(expected);
  });
});

it("should return undefined after wrong parity", function() {
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
  let str =
    "00020400000000000301020004040200000B0081010000A5010100A682012900010101000203544C53000302300D0004010100050400004E20000604000007D000071F2F6C69622F7838365F36342D6C696E75782D676E752F6C6962746C732E736F0008132F7661722F6C6F672F766F6D6261742F746C7300090101000A0101000B0400000000000C0400000000000D81B600013C000101010002132F7661722F6C6F672F766F6D6261742F746C73000301010004010100050101000601010007010000080400000000000904000000000002240001010100020C2F6465762F747479555342300003093132372E302E302E310004022FB600030E000104000003E8000204000003E800043C0001010400020B000104000000010002010100020B000104000000020002010200020B000104000000030002010300020B000104000000040002010";

  const result = tlv.parseTlv(str);
  const expected = undefined;

  expect(JSON.stringify(result)).to.eql(expected);
});

it("should return undefined after wrong nested context", function() {
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
  let str = "000204000000000003010200a6820129000302300d";

  const result = tlv.parseTlv(str, { dllddl: "kdkdkdk" });
  const expected = undefined;

  expect(JSON.stringify(result)).to.eql(expected);
});
