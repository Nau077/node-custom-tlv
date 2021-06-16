const expect = require('chai').expect;
const NodeCustomTlv = require("../lib/Tlv.parser")
const tagDictionary = require("./tagDictionary")

  describe('#Tlv.parser', function() {

 
	describe('#constructor', () => {

		it('should set correct settings', () => {
		 
		const settings =  {
			dictionary: tagDictionary,
			baseTagLength: 2,
			baseLengthTlvLength: 1
			};

		const instance = new NodeCustomTlv(settings);

		expect(instance.dictionary).to.deep.equal(settings.dictionary);
		expect(instance.baseTagLength).to.deep.equal(settings.baseTagLength*2);
		expect(instance.baseLengthTlvLength).to.deep.equal(settings.baseLengthTlvLength*2);
		});

		it('should set wrong settings', () => {
		 
			let settings =  {
				dictionary: "dkdkdkdk",
				baseTagLength: 2,
				baseLengthTlvLength: 1
				};
	
			const instance = new NodeCustomTlv(settings);

			settings =  {
				dictionary: "dkdkdkdk",
				baseTagLength: 2,
				baseLengthTlvLength: 1
			 };


			expect(instance.dictionary).to.deep.equal({});
 

			 settings =  {
				dictionary: null,
				baseTagLength: 2,
				baseLengthTlvLength: 1
			 };

			expect(instance.dictionary).to.deep.equal({});

			settings =  {
				dictionary: {name: "name"},
				baseTagLength: 2,
				baseLengthTlvLength: 1
			 };

			expect(instance.dictionary).to.deep.equal({});

			settings =  {
				dictionary: [],
				baseTagLength: 2,
				baseLengthTlvLength: 1
			 };

			expect(instance.dictionary).to.deep.equal({});
 
		});
	});
	
	const settings = {
		dictionary: tagDictionary,
		baseTagLength: 2,
		baseLengthTlvLength: 1,
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

	let str = "020000014800020400000000000301020004040200000b0081010000a5010100a682012900010101000203544c53000302300d0004010100050400004e20000604000007d000071f2f6c69622f7838365f36342d6c696e75782d676e752f6c6962746c732e736f0008132f7661722f6c6f672f766f6d6261742f746c7300090101000a0101000b0400000000000c0400000000000d81b600013c000101010002132f7661722f6c6f672f766f6d6261742f746c73000301010004010100050101000601010007010000080400000000000904000000000002240001010100020c2f6465762f747479555342300003093132372e302e302e310004022fb600030e000104000003e8000204000003e800043c0001010400020b000104000000010002010100020b000104000000020002010200020b000104000000030002010300020b0001040000000400020104038354"
	tlv.parseTlv(str)
    it('should return object for short string', function() {
		const expected = { messageId: 0, levelGaugeDescribtion: { port: 12301 } }
		const str = "0002 04 00000000 00A6 05 0003 02 30 0d"
		const result = tlv.parseTlv(str)
	
		expect(result).to.be.an('object');
		const arrResult = Object.entries(result)
		expect(arrResult).to.have.length(2);
		expect(arrResult[1][0]).to.have.length(21);
		expect(JSON.stringify(result)).to.eql(JSON.stringify(expected));
		
    });

	it('should return object for middle string', function() {
		const expected = { messageId: 0, levelGaugeDescribtion: { port: 12301, tgs_count: 1 } }

		const str = "0002 04 00000000 00A6 09 0003 02 300d 0004 01 01"
		const result = tlv.parseTlv(str)
		const expectedPort = 12301
		const arrResult = Object.entries(result)

		 expect(result).to.be.an('object');
		 expect(JSON.stringify(result)).to.eql(JSON.stringify(expected));
		 expect(arrResult[1][1].port).to.eql(expectedPort);
			
		});

	it('should return object for middle string', function() {
		const expected = undefined
		const str = {ddlld: "dldl"}
		const result = tlv.parseTlv(str)

		expect(result).to.eql(expected);
		});

  });
 