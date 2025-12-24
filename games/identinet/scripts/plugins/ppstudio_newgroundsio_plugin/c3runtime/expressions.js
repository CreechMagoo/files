/**
 * This plugin is distributed under an MIT license.
 * Developed by TristanMX/Pixel Perfect Studio
 * Website: https://www.pixelperfectstudio.mx/ 
 * Docs: https://smartui-docs.pixelperfectstudio.mx/miscellaneous-addons/newgrounds.io-plugin
 */
const C3 = globalThis.C3;

C3.Plugins.ppstudio_newgroundsio_plugin.Exps =
{
	SessionID(){return this.sessionId},
	UserID(){return this.userId},
	UserName(){return this.userName},
	IconSmall(){return this.smallIcon},
	IconMedium(){return this.mediumIcon},
	IconLarge(){return this.largeIcon},
	ScoreUserID(){return this._currentScore["user"]["id"]},
	ScoreUserName(){return this._currentScore["user"]["name"]},
	ScoreUserIconSmall(){return this._currentScore["user"]["icons"]["small"]},
	ScoreUserIconMedium(){return this._currentScore["user"]["icons"]["medium"]},
	ScoreUserIconLarge(){return this._currentScore["user"]["icons"]["large"]},
	ScoreTag(){return this._currentScore["tag"]},
	ScoreValue(){return this._currentScore["value"]},	
	ScoreFormattedValue(){return this._currentScore["formatted_value"]},
	ScoreboardID(){return this._boardData["id"]},
	ScoreboardName(){return this._boardData["name"]},
	LastError(){return this._lastError!==null?this._lastError["message"]:""},

	MedalID(){return this._currentMedal["id"]},
	MedalName(){return this._currentMedal["name"]},
	MedalDescription(){return this._currentMedal["description"]},
	MedalDifficulty(){return this._currentMedal["difficulty"]},
	MedalValue(){return this._currentMedal["value"]},
	MedalIcon(){return this._currentMedal["icon"]},

	MedalsAsJSON(){return JSON.stringify(this._medals);},
	LastScoresAsJSON(){return JSON.stringify(this._scores);},
	ScoreboardsAsJSON(){return JSON.stringify(this._scoreBoards);},

	SlotData(){return this._lastSlotData;},
	SlotID(){return this._currentSlot["id"]},
	SlotTimestamp(){return this._currentSlot["timestamp"]??-1},
	SlotSize(){return this._currentSlot["size"]??0},
	SlotURL(){return this._currentSlot["url"]??""},

	NewestVersion(){return this._newestVersion}
};
