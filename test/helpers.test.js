const expect = require('chai').expect;
const tagDictionary = require("./tagDictionary")
const {
    validateArgs,
    deleteWhiteSpaces,
    createLengthParams,
    makeToUpperCase,
    computeCustomByteLengths,
    BYTE_FACTOR
  } = require("../lib/helpers/helpers")

  describe('#Helpers', function() {
    describe('#validateArgs', () => {
        const IS_VALID = true;

		it('should set null dictionary', () => {
		 
		const settings =  {
			dictionary: null,
			baseTagLength: 2,
			baseLengthTlvLength: 1
			};

 

	 	expect(validateArgs(settings)).to.deep.equal(!IS_VALID);
 
		});

        it('should set empty string settings', () => {
		 
            let settings = ""

            expect(validateArgs(settings)).to.deep.equal(!IS_VALID);

            settings = null

            expect(validateArgs(settings)).to.deep.equal(!IS_VALID);

            settings = []

            expect(validateArgs(settings)).to.deep.equal(!IS_VALID);
     
            });

        it('should set correct settings', () => {
        
            let settings = 	{
                dictionary: tagDictionary,
                baseTagLength: 2,
                baseLengthTlvLength: 1
             };

            expect(validateArgs(settings)).to.deep.equal(IS_VALID);
        
            });
        })

        describe('#deleteWhiteSpaces', () => {
            it('should set string with whitespaces', () => {
                const str = "dldld ldldl       dldldld"
                const expected = "dldldldldldldldld"
    
                expect(deleteWhiteSpaces(str)).to.deep.equal(expected);
            });
        });

        describe('#createLengthParams', () => {
            it('should create lengths params', () => {
                const payload = {
                    baselengthByte: '01',
                    i: 10,
                    str: '000302300D00040101',
                    baseTagLength: 4,
                    baseLengthTlvLength: 2,
                    customByteLengthComputed: [
                      {
                        startByte: '81',
                        nextByteLengthDefine: 2,
                        iCounter: 6,
                        differ: 8
                      },
                      {
                        startByte: '82',
                        nextByteLengthDefine: 4,
                        iCounter: 6,
                        differ: 10
                      },
                      {
                        startByte: '83',
                        nextByteLengthDefine: 6,
                        iCounter: 6,
                        differ: 12
                      }
                    ]
                  }

                  const expected = { length: 2, differ: 6 }

                  const result = JSON.stringify(createLengthParams(payload))
 

                expect(result).to.deep.equal(JSON.stringify(expected));
            });
        });

  })