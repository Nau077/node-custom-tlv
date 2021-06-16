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

  module.exports = tagDictionary