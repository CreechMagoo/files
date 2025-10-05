/**
 * This plugin is distributed under an MIT license.
 * Developed by TristanMX/Pixel Perfect Studio
 * Website: https://www.pixelperfectstudio.mx/ 
 * Docs: https://smartui-docs.pixelperfectstudio.mx/miscellaneous-addons/newgrounds.io-plugin
 */
const C3 = globalThis.C3;

C3.Plugins.ppstudio_newgroundsio_plugin.Acts =
{
	async Login(t){ return this._login(t);},
	Logout(){ this._logout();},
	async GetScores(id,p,t,s,sk,l){return this._getScores(id,p,t,s,sk,l)},
	async PostScore(id,v,t){return this._postScore(id,v,t)},
	async UnlockMedal(id){return this._unlock(id);},
	GetMedal(id){this._getMedal(id)},
	ShowScoreboard(id,p,t,s,sk,l){this._showScoreboard(id,p,t,s,sk,l)},
	ShowMedals(){this._showMedals()},
	async GetSavedData(id){return this._getSlotSavedData(id)},
	ShowSavedSlots(){this._showSavedSlots()},
	async SavedData(id,d){return this._setSlotSavedData(id,d);},
	QueueSaveData(d){this._queueSaveData(d)},
	LogEvent(e){this._logEvent(e)},
	LoadAuthorURL(){this._loadAuthorURL()},
	LoadOfficialURL(){this._loadOfficialURL();},
	LoadMoreGames(){this._loadMoreGames()},
	LoadReferral(n){this._loadReferral(n)}	
};
