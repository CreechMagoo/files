/**
 * This plugin is distributed under an MIT license.
 * Developed by TristanMX/Pixel Perfect Studio
 * Website: https://www.pixelperfectstudio.mx/ 
 * Docs: https://smartui-docs.pixelperfectstudio.mx/miscellaneous-addons/newgrounds.io-plugin
 */
const C3 = globalThis.C3;

C3.Plugins.ppstudio_newgroundsio_plugin.Cnds =
{
	OnVersionMismatch(){return true},
	OnReady(){return true},
	OnLogin(){return true},
	OnLogout(){return true},
	OnLoginCancelled(){return true},
	OnWaitingStart(){return true},
	OnWaitingFinished(){return true},
	OnScoreboardReady(){return true},
	OnScorePosted(){return true},
	OnAPIError(){return true},
	OnMedalUnlocked(id){return this._currentMedal["id"]==id;},
	OnAnyMedalUnlocked(){return true},
	OnSavedDataReady(){return true;},
	OnSlotDataSaved(){return true},
	IsWaiting(){return this._isWaitingEvent;},
	IsSupporter(){return this.isSupporter},
	IsLoggedIn(){return this._isLoggedIn},
	IsReady(){return this._isReady},
	IsSecretMedal(id){return this._isSecretMedal(id);},
	IsUnlocked(id){return this._isUnlocked(id);},
	IsSessionExpired(){return this.isSessionExpired;},
	ForEachSavedSlot(){
		const loopCtx = this.runtime.sdk.createLoopingConditionContext();

		for (const i of this._savedslots)
		{
			this._currentSlot=i;			
			loopCtx.retrigger();
	
			if (loopCtx.isStopped)
				break;
		}
	
		loopCtx.release();
	},
	ForEachScore(){
		const loopCtx = this.runtime.sdk.createLoopingConditionContext();

		for (const i of this._scores)
		{
			this._currentScore=i;			
			loopCtx.retrigger();
	
			if (loopCtx.isStopped)
				break;
		}
	
		loopCtx.release();
	},
	ForEachScoreboard(){
		const loopCtx = this.runtime.sdk.createLoopingConditionContext();

		for (const i of this._scoreBoards) //NGIO.scoreBoards
		{
			this._boardData={id:i.id,name:i.name}
			loopCtx.retrigger();
	
			if (loopCtx.isStopped)
				break;
		}
	
		loopCtx.release();
	},
	ForEachMedal(){
		const loopCtx = this.runtime.sdk.createLoopingConditionContext();

		for (const i of this._medals) //NGIO.scoreBoards
		{
			this._currentMedal=i;
			loopCtx.retrigger();
	
			if (loopCtx.isStopped)
				break;
		}
	
		loopCtx.release();
	}	
};
