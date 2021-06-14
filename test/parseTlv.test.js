var assert = require('assert');
var expect = require('chai').expect;
const NodeCustomTlv = require("../lib/Tlv.parser")


const tagDictionary = {
	'0002': { name: 'messageId' },
	'0003': { name: 'messageType' },
	'0004': { name: 'commandCode' },
	'0081': { name: 'errorNone' },
	'00A5': { name: 'tgs_count' },
	'00A6': {
	  name: 'levelGaugeDescribtion',
	  nested: true,
	},
	'00A6-0001': { name: 'levelGaugeId' },
	'00A6-0002': { name: 'nameTLS' },
	'00A6-0003': { name: 'port' },
	'00A6-0004': { name: 'tgs_count' },
	'00A6-0005': { name: 'commandTimeout' },
	'00A6-0006': { name: 'interval' },
	'00A6-0007': { name: 'libraryForDevice' },
	'00A6-0008': { name: 'logKatalog' },
	'00A6-0009': { name: 'log_enable' },
	'00A6-000A': { name: 'log_trace' },
	'00A6-000B': { name: 'log_file_size' },
	'00A6-000C': { name: 'log_save_days' },
	'00A6-000D': {
	  name: 'moduleSettings',
	  nested: true,
	},
	'00A6-000D-0001': {
	  name: 'moduleLogSettings',
	  nested: true,
	},
	'00A6-000D-0001-0001': {
	  name: 'moduleLogSettingsEnable',
	},
	'00A6-000D-0001-0002': {
	  name: 'directory',
	},
	'00A6-000D-0001-0003': {
	  name: 'log_ trace',
	},
	'00A6-000D-0001-0004': {
	  name: 'log_system',
	},
	'00A6-000D-0001-0005': {
	  name: 'log_requests',
	},
	'00A6-000D-0001-0006': {
	  name: 'log_frames',
	},
	'00A6-000D-0001-0007': {
	  name: 'log_parsing',
	},
	'00A6-000D-0001-0008': {
	  name: 'log_file_size',
	},
	'00A6-000D-0001-0009': {
	  name: 'log_save_days',
	},
	'00A6-000D-0002': {
	  name: 'connectionSettings',
	  nested: true,
	},
	'00A6-000D-0002-0001': {
	  name: 'type',
	},
	'00A6-000D-0002-0002': {
	  name: 'portConnection',
	},
	'00A6-000D-0002-0003': {
	  name: 'ipAddress',
	},
	'00A6-000D-0002-0004': {
	  name: 'anotherPort',
	},
	'00A6-000D-0003': {
	  name: 'timeoutSettings',
	  nested: true,
	},
	'00A6-000D-0003-0001': {
	  name: 'read',
	},
	'00A6-000D-0003-0002': {
	  name: 'write',
	},
	'00A6-000D-0004': {
	  name: 'mapping',
	  nested: true,
	},
	'00A6-000D-0004-0001': {
	  name: 'tanksCount',
	},
	'00A6-000D-0004-0002': {
	  name: 'tank',
	  nested: true,
	},
	'00A6-000D-0004-0002-0001': {
	  name: 'externalNum',
	},
	'00A6-000D-0004-0002-0002': {
	  name: 'channelNum',
	},
  };

const settings = {
	dictionary: tagDictionary,
	baseLengthTag: 4,
	baseLengthTlvLength: 2,
	customByteLengths: [
	  {
		startByte: '81',
		nextByteLengthDefine: 1,
	  },
	  {
		startByte: '82',
		nextByteLengthDefine: 2,
	  },
	  {
		startByte: '83',
		nextByteLengthDefine: 3,
	  },
	],
  };

  const tlv = new NodeCustomTlv(settings)
  const str6 = '0002 04 00000000 0003 01 02 0004040200000b 0081 01 00 00a5 01 01 00a682012900010101000203544c53000302300d0004010100050400004e20000604000007d000071f2f6c69622f7838365f36342d6c696e75782d676e752f6c6962746c732e736f0008132f7661722f6c6f672f766f6d6261742f746c7300090100000a0100000b0400000000000c0400000000000d81b600013c000101010002132f7661722f6c6f672f766f6d6261742f746c73000301000004010000050100000601000007010000080400000000000904000000000002240001010100020c2f6465762f747479555342300003093132372e302e302e310004022fb600030e000104000003e8000204000003e800043c0001010400020b000104000000010002010100020b000104000000020002010200020b000104000000030002010300020b0001040000000400020104';
  
  tlv.parseTlv(str6)

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return object', function() {

   expect(tlv.parseTlv(str6)).to.be.true;
//    expect(numbers).to.be.an('array').that.includes(2);
    });
  });
});