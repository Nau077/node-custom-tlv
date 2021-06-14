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
  
  let finalJson = {};

  class NestedContext {
	  context

	  constructor(parentTag, length) {
		  this.context = {
			parentTag,
			parentLength: length
		  }
	  }

	  get context() {
		  return this.context
	  }
  }

class NodeCustomTlv {
	  dictionary = {}
  
	  baseLengthTag = 4
  
	  baseLengthTlvLength = 2
  
	  customByteLengths = [
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
	  ]
  
	  customByteLengthComputed = []
  
	  constructor(settings) {
		if (!validateArgs(settings)) {
			return 
		}

		this.dictionary = settings.dictionary;
		this.baseLengthTag = settings.baseLengthTag;
		this.baseLengthTlvLength = settings.baseLengthTlvLength;
		this.customLengths = settings.customLengths;
		
		finalJson = {}
	  }
  
	  parseTlv(str, nestedContext = null) {

		if (typeof str !== "string") {
			console.error("wrong first argument: " + str)
			return
		}

		str = deleteWhiteSpaces(str);
		str = makeToUpperCase(str);
  
		let initialStr;
  
		if (!nestedContext) {
		  initialStr = str;
  
		  if (this.customByteLengths && this.customByteLengths.length) {
			this.customByteLengthComputed = computeCustomByteLengths(this.customByteLengths, this.baseLengthTag);
		  }
		}

		if (nestedContext && !(nestedContext instanceof NestedContext)) {
			console.error("wrong second argument: " + nestedContext)
			return
		}
  
		const k = this.baseLengthTag;
		let help_nested = {};
  
		for (let i = 0; i < str.length;) {
		  const help_obj = {};
		  let tagObj;
		  let value;
		  let fullTag;
		  let tagName;
  
		  const tag = str.substr(i, k);
  
		  if (nestedContext && nestedContext.context && nestedContext.context.parentTag) {
			fullTag = nestedContext.context.parentTag + tag;
		  } else {
			fullTag = tag;
		  }
  
		  tagObj = tagDictionary[fullTag];
  
		  if (!tagObj) {
			tagName = fullTag;
		  } else {
			tagName = tagObj.name;
		  }
  
		  const lenthByte = str.substring(i + this.baseLengthTag, i + this.baseLengthTag + this.baseLengthTlvLength);
  
		  const createLengthPayload = {
			baselengthByte: lenthByte,
			i,
			str,
			baseLengthTag: this.baseLengthTag,
			baseLengthTlvLength: this.baseLengthTlvLength,
			customByteLengthComputed: this.customByteLengthComputed ? this.customByteLengthComputed : null,
		  };

		  const { length, differ } = createLengthParams(createLengthPayload);

		  if (tagObj && tagObj.nested) {
			value = str.substring(i + differ, i + differ + length);
  
			const parentTag = `${fullTag}-`;

			const nestedContext = new NestedContext(parentTag, length)
  
			help_obj[tagName] = this.parseTlv(value, nestedContext);
		  }
  
		  if (
			(tagObj && !tagObj.nested && !nestedContext)
				  || (!tagObj && !nestedContext)
		  ) {
			value = str.substring(i + differ, i + differ + length);
  
			help_obj[tagName] = parseInt(value, 16);
  
			finalJson = { ...finalJson, ...help_obj };
		  }
  
		  if (nestedContext && nestedContext.context && nestedContext.context.parentTag && tagObj && !tagObj.nested) {
			value = str.substring(i + differ, i + differ + length);
			help_obj[tagName] = parseInt(value, 16);
			help_nested = { ...help_nested, ...help_obj };
		  }
  
		  if (nestedContext && nestedContext.context && nestedContext.context.parentTag && tagObj && tagObj.nested) {
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
  
		if (nestedContext && nestedContext.context && nestedContext.context.parentTag && nestedContext.context.parentLength) {
		  return help_nested;
		}
	  }
  }
  
  function createLengthParams({
	baselengthByte,
	i,
	str,
	baseLengthTag,
	baseLengthTlvLength,
	customByteLengthComputed,
  }) {
	let length;
	let differ;
  
	if (!customByteLengthComputed) {
	  differ = baseLengthTag + baseLengthTlvLength;
	  length = 2 * parseInt(baselengthByte, 16);
  
	  return {
		length,
		differ,
	  };
	}
  
	if (customByteLengthComputed) {
	  const neededByte = customByteLengthComputed.find((g) => g.startByte == baselengthByte);
  
	  if (!neededByte) {
		differ = baseLengthTag + baseLengthTlvLength;
		length = 2 * parseInt(baselengthByte, 16);
  
		return {
		  length,
		  differ,
		};
	  }
  
	  if (neededByte) {
		const IS_CONTINUE_CYCLE = true;
  
		customByteLengthComputed.every((el) => {
		  if (el.startByte == baselengthByte) {
			const lenthByte = str.substring(i + el.iCounter, i + el.differ);
			length = 2 * parseInt(lenthByte, 16);
			differ = el.differ;
  
			return !IS_CONTINUE_CYCLE;
		  }
		  return IS_CONTINUE_CYCLE;
		});
  
		return {
		  length,
		  differ,
		};
	  }
	}
  }

  function validateArgs(settings) {
	const IS_VALID = true
	const NAME = "name"
	const NESTED = "nested"

	if (!settings.dictionary && !settings.baseLengthTag && settings.baseLengthTlvLength) {
		console.error("Error: Empty needed arguments")
		return !IS_VALID
	}

	if (typeof settings.dictionary !== "object" && Array.isArray(settings.dictionary) && settings.dictionary == null) {
		console.error("Error: Dictionary is not an object") 
		return !IS_VALID
	}

	if (typeof settings.baseLengthTag !== "number" || typeof settings.baseLengthTlvLength !== "number") {
		console.error("Error: baseLengthTlvLength or baseLengthTag is not a number")
		return !IS_VALID
	}

	const arrDictionary = Object.entries(settings.dictionary)

	return arrDictionary.every((el) => {
		if (typeof el[1] !== "object" && Array.isArray(el[1]) && el[1] == null) {
			console.error("Error: incorrect dictionary structure")
		  return !IS_VALID;
		}

		const key = Object.entries(el[1])[0][0]

		if ( key != NAME &&  key !=NESTED) {

		console.error("Error: incorrect dictionary structure, incorrect dictionary keys: " + key)
		  return !IS_VALID;
		}

		return IS_VALID
	  })
  }
  
  function computeCustomByteLengths(customByteLengths, baseLengthTag) {
	return customByteLengths.map((el) => {
	  const helpObj = {
		startByte: el.startByte, 
		nextByteLengthDefine: el.nextByteLengthDefine * 2,
		iCounter: el.startByte.length * 3,
		differ: baseLengthTag + el.startByte.length + el.nextByteLengthDefine * 2, 
	  };
  
	  return helpObj;
	});
  }
  
  function deleteWhiteSpaces(str) {
	return str.replace(/\s/g, '');
  }
  
  function makeToUpperCase(str) {
	return str.toUpperCase();
  }
  
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
  
  const tlvParser = new NodeCustomTlv(settings);
  const str6 = '0002 04 00000000 0003 01 02 0004040200000b 0081 01 00 00a5 01 01 00a682012900010101000203544c53000302300d0004010100050400004e20000604000007d000071f2f6c69622f7838365f36342d6c696e75782d676e752f6c6962746c732e736f0008132f7661722f6c6f672f766f6d6261742f746c7300090100000a0100000b0400000000000c0400000000000d81b600013c000101010002132f7661722f6c6f672f766f6d6261742f746c73000301000004010000050100000601000007010000080400000000000904000000000002240001010100020c2f6465762f747479555342300003093132372e302e302e310004022fb600030e000104000003e8000204000003e800043c0001010400020b000104000000010002010100020b000104000000020002010200020b000104000000030002010300020b0001040000000400020104';
  
  const result = tlvParser.parseTlv(str6);
  
  console.log(result);

  module.exports = NodeCustomTlv;