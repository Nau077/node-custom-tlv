const tagDictionary = {
	'0002': { name: 'hoddog' },
	'0003': { name: 'hotchicken' },
	'0004': { name: 'codeChicken' },
	'0081': { name: 'errorChicken' },
	'00A5': { name: 'chickencount' },
	'00A6': {
	  name: 'chickensLevel',
	  nested: true,
	},
	'00A6-0001': { name: 'chickenLevelId' },
	'00A6-0002': { name: 'specChickenName' },
	'00A6-0003': { name: 'hotDogPort' },
	'00A6-0004': { name: 'dogCoent' },
	'00A6-0005': { name: 'commandTimeoutChicken' },
	'00A6-0006': { name: 'intervalChicken' },
	'00A6-0007': { name: 'libraryForChickens' },
	'00A6-0008': { name: 'logKatalogOfDOgs' },
	'00A6-0009': { name: 'LogDogs' },
	'00A6-000A': { name: 'LogCHickens' },
	'00A6-000B': { name: 'LogChickenSize' },
	'00A6-000C': { name: 'logChicken' },
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

  module.exports = tagDictionary