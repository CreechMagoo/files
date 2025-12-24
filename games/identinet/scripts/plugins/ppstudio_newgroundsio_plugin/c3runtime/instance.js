/**
 * This plugin is distributed under an MIT license.
 * Developed by TristanMX/Pixel Perfect Studio
 * Website: https://www.pixelperfectstudio.mx/ 
 * Docs: https://smartui-docs.pixelperfectstudio.mx/miscellaneous-addons/newgrounds.io-plugin
 */
const C3 = globalThis.C3;
const DOM_COMPONENT_ID = "ppstudio_newgroundsio_plugin";

C3.Plugins.ppstudio_newgroundsio_plugin.Instance = class ppstudio_newgroundsio_plugin_Instance extends globalThis.ISDKInstanceBase
{
	
	_isInitialized=false;
	_newestVersion="";
	_properties = {};
	_userData=null;
	_sessionData=null;
	_isWaitingEvent=false;
	_isLoggedIn=false;
	_isReady=false;
	_suspendOnDialog=false;
	_currentScore=null;
	_currentMedal=null;
	_currentSlot=null;
	_lastSlotData=null;
	_boardData={};
	_scores=[];	
	_lastError=null;
	_scoreBoards=[];
	_medals=[];
	_savedslots=[];

	#loadPromiseResolve=null;
	#loadPromiseReject=null;
	#loadPromiseTimeout=null;

	#resolveScoresGet=null;
	#rejectScoresGet=null;

	#resolveLogin=null;
	#rejectLogin=null;

	#rejectScoresPost=null;
	#resolveScoresPost=null;

	#postScoreTimeout=null;
	#getScoresTimeout=null;

	#rejectUnlock=null;
	#resolveUnlock=null;	
	#unlockTimeout=null;

	#rejectSlotDataGet=null;
	#resolveSlotDataGet=null;
	#slotDataGetTimeout=null;
	
	#rejectSaveData=null;
	#resolveSaveData=null;
	#saveDataTimeout=null;

	get userId(){ if (this._userData!==null) {return this._userData.id}  return -1;};
	get userName(){ if (this._userData!==null) {return this._userData.name}  return "";};
	get isSupporter(){ if (this._userData!==null) {return this._userData.supporter} return false;};
	get smallIcon(){ if (this._userData!==null) if (this._userData.icons!==null) {return this._userData.icons.small} return "";};
	get mediumIcon(){ if (this._userData!==null) if (this._userData.icons!==null) {return this._userData.icons.medium} return "";};
	get largeIcon(){ if (this._userData!==null) if (this._userData.icons!==null) {return this._userData.icons.large} return "";};
	get isSessionExpired(){ return this._sessionData===null || (this._sessionData.hasOwnProperty("expired") && this._sessionData.expired);};
	get sessionId(){ return this._sessionData!==null?this._sessionData.id:"";};

	constructor()
	{
		super({ domComponentId: DOM_COMPONENT_ID });

		const properties = this._getInitProperties();
		if (properties) // note properties may be null in some cases
		{			
			let idx=0;
			this._properties = {				
				"ngio":{					
					"version":properties[idx++],
					"appID":properties[idx++],
					"aesKey":properties[idx++],
					"checkHostLicense":properties[idx++],
					"autoLogNewView":properties[idx++],
					"preloadMedals":true,
					"preloadScoreBoards":true,
					"preloadSaveSlots":true
				},
				"native-notifications":properties[idx++],
				"native-suspend":properties[idx++],
				"prevent-default":properties[idx++]
			}

			const has=this._properties.hasOwnProperty.bind(this._properties);

			if (has("native-suspend")) this._suspendOnDialog=this._properties["native-suspend"];
		}

		this._addDOMMessageHandler("on-outdated",this._onVersionMismatch.bind(this));
		this._addDOMMessageHandler("on-initialized",this._onInitialized.bind(this));
		this._addDOMMessageHandler("on-invalid-host",this._onInvalidHost.bind(this));
		this._addDOMMessageHandler("update-waiting-status",this._updateWaitingStatus.bind(this));
		this._addDOMMessageHandler("on-ngwindow-closed",this._onNGWindowClosed.bind(this));
		this._addDOMMessageHandler("on-ready",this._onReady.bind(this));
		this._addDOMMessageHandler("update-user-data",this._updateUserData.bind(this));
		this._addDOMMessageHandler("on-loginrequired",this._onLoginRequired.bind(this));
		this._addDOMMessageHandler("on-login-success",this._onLogin.bind(this));
		this._addDOMMessageHandler("on-login-cancelled",this._onLoginCancelled.bind(this));
		this._addDOMMessageHandler("on-logged-out",this._onLogout.bind(this));
		this._addDOMMessageHandler("on-scores-ready",this._onScoresReady.bind(this));
		this._addDOMMessageHandler("on-score-posted",this._onScorePosted.bind(this));
		this._addDOMMessageHandler("on-medal-unlocked",this._onMedalUnlocked.bind(this));
		this._addDOMMessageHandler("on-slotsaved-get",this._onSlotSavedDataReady.bind(this));
		this._addDOMMessageHandler("cancel-score-post",this._onCancelScorePosted.bind(this));
		this._addDOMMessageHandler("cancel-scores-get",this._onCancelScoresGet.bind(this));
		this._addDOMMessageHandler("update-preload-list",this._onUpdatePreloadList.bind(this));
		this._addDOMMessageHandler("cancel-medal-unlock",this._onCancelMedalUnlock.bind(this));
		this._addDOMMessageHandler("on-slotsaved-set",this._onSlotSaved.bind(this));
		this._addDOMMessageHandler("cancel-datasave",this._cancelSlotSave.bind(this));
		this._addDOMMessageHandler("on-bypass-error",this._bypassAPIError.bind(this));		
		this._addDOMMessageHandler("resume-runtime",this._resumeRuntime.bind(this));		
		this._initNG();
	}

	_onVersionMismatch(d){
		this._newestVersion=d["newest"];
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnVersionMismatch);
	}

/*--------------------------------- CLOUDSAVES ----------------------------------*/

	_queueSaveData(d){
		this._postToDOMAsync("set-queued-slots-data",d);
	}

	_cancelSlotSave(){
		this._lastSlotData=null;
		clearTimeout(this.#saveDataTimeout);
		this.#resolveSaveData=null;
		if (this.#rejectSaveData!==null)
			this.#rejectSaveData();
		this.#rejectSaveData=null;
		
		this._lastError={
			code:-1,
			message:"Save Cancelled. You either passed null data or the slot number is invalid."
		}
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
	}

	_onSlotSaved(d){
		this._lastSlotData=d;
		clearTimeout(this.#saveDataTimeout);

		this.#rejectSaveData=null;
		if (this.#resolveSaveData!==null)
			this.#resolveSaveData();

		this.#resolveSlotDataGet=null;
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnSlotDataSaved);
	}

	async _setSlotSavedData(id,data){
		return new Promise(
			(resolve,reject)=>{

				if (!this._isLoggedIn) {
					this._lastError={code:-1,message:"User not logged in."};
					this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					reject();
					return;
				}

				this.#rejectSaveData=reject;
				this.#resolveSaveData=resolve;
				
				this._postToDOMAsync("set-slotsaved-data", {"id":id,"data":data});

				this.#saveDataTimeout=setTimeout(
					()=>{
						this.#resolveSaveData=null;
						if (this.#rejectSaveData!==null)
							this.#rejectSaveData();
						this.#rejectSaveData=null;
						
						this._lastError={code:-1,message:"Saving Slot-Data timed out. Check your internet connection and NGIO server status"};
						this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					}
				,5000);
			}
		);
	}

	async _getSlotSavedData(id){
		return new Promise(
			(resolve,reject)=>{

				if (!this._isLoggedIn) {
					this._lastError={code:-1,message:"User not logged in."};
					this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					reject();
					return;
				}

				this.#rejectSlotDataGet=reject;
				this.#resolveSlotDataGet=resolve;
				
				this._postToDOMAsync("get-slotsaved-data", {"id":id});

				this.#slotDataGetTimeout=setTimeout(
					()=>{
						this.#resolveSlotDataGet=null;
						if (this.#rejectSlotDataGet!==null)
							this.#rejectSlotDataGet();
						this.#rejectSlotDataGet=null;
						
						this._lastError={code:-1,message:"Get Slot-Saved Data timed out. Check your internet connection and NGIO server status"};
						this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					}
				,5000);
			}
		);
	}

	_onSlotSavedDataReady(d){
		this._lastSlotData=d;
		clearTimeout(this.#slotDataGetTimeout);

		this.#rejectSlotDataGet=null;
		if (this.#resolveSlotDataGet!==null)
			this.#resolveSlotDataGet();

		this.#resolveSlotDataGet=null;
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnSavedDataReady);
	}
/*--------------------------------- MEDALS ----------------------------------*/
	_getMedal(id){
		this._currentMedal=this._findMedalById(id);
	}

	_isSecretMedal(id){
		const m=this._findMedalById(id);
		if (m==null) return false;

		return m["secret"]
	}

	_isUnlocked(id){
		const m=this._findMedalById(id);
		if (m==null) return false;

		return m["unlocked"]
	}

	async _unlock(id){
		this._startWaiting();
		return new Promise(
			(resolve,reject)=>{

				if (!this._isLoggedIn) {
					this._lastError={code:-1,message:"User not logged in."};
					this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					reject();
					return;
				}

				this.#rejectUnlock=reject;
				this.#resolveUnlock=resolve;
				
				this._postToDOMAsync("unlock-medal", {"id":id});

				this.#unlockTimeout=setTimeout(
					()=>{
						this.#resolveUnlock=null;
						if (this.#rejectUnlock!==null)
							this.#rejectUnlock();
						this.#rejectUnlock=null;
						
						this._lastError={code:-1,message:"Unlock Medal timed out. Check your internet connection and NGIO server status"};
						this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					}
				,5000);
			}
		);
	}

	_onMedalUnlocked(d){
		this._currentMedal=d;
		if (this.#resolveUnlock!==null)
			this.#resolveUnlock();

		clearTimeout(this.#unlockTimeout);
		this.#unlockTimeout=null;

		this.#resolveUnlock=null;
		this.#rejectUnlock=null;		
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAnyMedalUnlocked); 
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnMedalUnlocked);
	}

	_onCancelMedalUnlock(d){
		this._lastError=d;

		if (this.#rejectUnlock!==null)
			this.#rejectUnlock();

		clearTimeout(this.#unlockTimeout);
		this.#unlockTimeout=null;

		this.#resolveUnlock=null;
		this.#rejectUnlock=null;
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
	}

	_findMedalById(id){
		for (const m of this._medals){
			if (m["id"]==id) return m;
		}
		return null;
	}

/*--------------------------------- BUILT-IN DIALOGS ----------------------------------*/
	_showScoreboard(id,period,tag=undefined,social,skip,limit){
		if (this._suspendOnDialog) this.runtime.sdk.setSuspended(true);
		this._postToDOMAsync("show-native-scoreboard", 
			{
				"id":id,
				"period":period,
				"tag":tag,
				"social":social,
				"skip":skip,
				"limit":limit
			}
		);
	}

	_showMedals(){
		if (this._suspendOnDialog) this.runtime.sdk.setSuspended(true);
		this._postToDOMAsync("show-native-medals", {})
	}

	_showSavedSlots(){
		if (this._suspendOnDialog) this.runtime.sdk.setSuspended(true);
		this._postToDOMAsync("show-saved-slots",{});
	}
/*--------------------------------- SCOREBOARDS ----------------------------------*/
	_onCancelScoresGet(d){
		this._lastError=d;
		this.#resolveScoresGet=null;
		if (this.#rejectScoresGet!==null)
			this.#rejectScoresGet();
		this.#rejectScoresGet=null;
		
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
	}

	async _getScores(id,period,tag,social,skip,limit){
		this._startWaiting();
		return new Promise(
			(resolve,reject)=>{
				this.#rejectScoresGet=reject;
				this.#resolveScoresGet=resolve;

				//Timeout of 10secs for the API call
				this.#getScoresTimeout=setTimeout(()=>{
					if (this.#rejectScoresGet) 
							this.#rejectScoresGet();
					this._lastError={code:-1,message:"Get Scores timed out. Check your internet connection and NGIO server status"};
					this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					}					
					,10000);

				this._postToDOMAsync("get-scores", 
					{
						"id":id,
						"period":period,
						"tag":tag,
						"social":social,
						"skip":skip,
						"limit":limit
					}
				);
			}
		);
	}

	_onScoresReady(d){
		this.#rejectScoresGet=null;
		this._boardData=d["board"];
		this._scores=d["scores"];
		if (this.#resolveScoresGet!==null)
			this.#resolveScoresGet();
		this.#resolveScoresGet=null;
		if (this.#getScoresTimeout!==null)
			clearTimeout(this.#getScoresTimeout);
		this.#getScoresTimeout=null;
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnScoreboardReady);		
	}

	async _postScore(id,v,t){
		return new Promise(
			(resolve,reject)=>{
				if (!this._isLoggedIn) {
					this._lastError={code:-1,message:"User not logged in."};
					this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
					reject();
					return;
				}
				
				this.#rejectScoresPost=reject;
				this.#resolveScoresPost=resolve;

				//Timeout of 10secs for the API call
				this.#postScoreTimeout=setTimeout(()=>{
					if (this.#rejectScoresPost) this.#rejectScoresPost();
					this._lastError={code:-1,message:"Post Scores timed out. Check your internet connection and NGIO server status"};
					this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
				}
				,10000);

				this._postToDOMAsync("post-score",{ "board":id,"value":v,"tag":t});
			}
		);				
	}

	_onCancelScorePosted(d){
		this.#resolveScoresPost=null;
		this._lastError=d;

		if (this.#rejectScoresPost!==null)
			this.#rejectScoresPost();
		this.#rejectScoresPost=null;

		if (this.#postScoreTimeout!==null)
			clearTimeout(this.#postScoreTimeout);

		this.#postScoreTimeout=null;

		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
	}

	_onScorePosted(d){
		if (this.#resolveScoresPost!==null)
			this.#resolveScoresPost();
		this.#resolveScoresPost=null;
		
		if (this.#postScoreTimeout!==null)
			clearTimeout(this.#postScoreTimeout);

		this.#postScoreTimeout=null;
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnScorePosted);
	}

/*--------------------------------- EVENTS AND LOADERS ----------------------------------*/

	_logEvent(event){ this._postToDOMAsync("log-event", {"event":event});}
	_loadAuthorURL(){ this._postToDOMAsync("load-author-url", {});}
	_loadOfficialURL(){ this._postToDOMAsync("load-official-url", {});}
	_loadMoreGames(){ this._postToDOMAsync("load-more-games", {});}
	_loadReferral(name){ this._postToDOMAsync("load-referral", {"name":name});}

/*--------------------------------- SESSION MANAGEMENT ----------------------------------*/

	_resumeRuntime(){
		if (this.runtime.isSuspended){
			this.runtime.sdk.setSuspended(false);
		}
	}

	_bypassAPIError(d){
		this._lastError=d;
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
	}

	_onUpdatePreloadList(d){
		this._scoreBoards=d["scoreboards"];
		this._medals=d["medals"];
		this._savedslots=d["savedslots"];
	}

	async _login(t){
		if (this._isLoggedIn) return null;
		if (this._suspendOnDialog) this.runtime.sdk.setSuspended(true);
		return new Promise(
			(resolve,reject)=>{
				this.#rejectLogin=reject;
				this.#resolveLogin=resolve;
				this._postToDOMAsync("open-login-page", {"mode":t});
			}
		);
	}

	_startWaiting(){
		this._isWaitingEvent=true; //forcing
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnWaitingStart);
	}

	_logout(){
		this._userData=null;
		this._startWaiting();
		this._postToDOMAsync("logout", {});		
	}

	_onInitialized(){
		this._isInitialized=true;
		console.log("NewgroundsIO Initialized!");
		clearTimeout(this.#loadPromiseTimeout);
		if (this.#loadPromiseResolve!==null)
			this.#loadPromiseResolve();
		this.#loadPromiseResolve=null;
	}

	_updateWaitingStatus(obj){
		if (this._isWaitingEvent!==obj["waiting"]){
			this._isWaitingEvent=obj["waiting"];

			if (obj["waiting"]){
				this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnWaitingStart);
			} else {
				this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnWaitingFinished);
			}
		}		
	}

	_updateUserData(data){
		this._userData=data["user"];
	}
	_onLogin(d){
		if (d["user"]!==null)
			this._isLoggedIn=true;

		if (d["session"]!==null)			
			this._sessionData=d["session"];

		this.#rejectLogin=null;

		if (this.#resolveLogin!==null)
			this.#resolveLogin();
		this.#resolveLogin=null;

		if (this._isLoggedIn)
			this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnLogin);
	}

	_onLogout(){
		this._isLoggedIn=false;
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnLogout);
	}

	_onLoginCancelled(d){
		this._lastError=d;
		this._isLoggedIn=false;
		this.#resolveLogin=null;

		if (this.#rejectLogin!==null)
			this.#rejectLogin();
		this.#rejectLogin=null;

		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnLoginCancelled);
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
	}

	_onLoginRequired(){		
		this._postToDOMAsync("skip-login", {}); //No automatic login
	}

	_onNGWindowClosed(){
		this._isLoggedIn=false;
		this._postToDOMAsync("cancel-login", {});
	}
	
	_onReady(d){
		this._isReady=true;
		if (d["session"]!==null){
			this._sessionData=d["session"];
		}
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnReady);
	}

	_initNG(){
		this.runtime.addLoadPromise(new Promise( //Making sure the NGIO API is loaded before starting the project
			(resolve,reject)=>{
				this.#loadPromiseResolve=resolve;
				this.#loadPromiseReject=reject;

				this._postToDOMAsync("set-properties", this._properties)
				.then((d) => {						
					})
				.catch(e=>console.error(e));
		
				this.#loadPromiseTimeout=setTimeout(()=>{
					if (!this._isInitialized)
						if (reject!==null){
							const msg="NGIO API could not be initialized. Check your internet connection and NGIO server status";
							console.error(msg);							
							this._lastError={code:-1,message:msg};
							this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
							reject();
						}
				},5000)
			}
		));
	}

	_onInvalidHost(d){
		this._lastError=d;
		if (this.#loadPromiseReject!==null)
			this.#loadPromiseReject();
		
		this._trigger(C3.Plugins.ppstudio_newgroundsio_plugin.Cnds.OnAPIError);
	}

	_getDebuggerProperties(){
		const prefix = "plugins.ppstudio_newgroundsio_plugin.debugger.";			
		const values=[
			{
				title:"plugins.ppstudio_newgroundsio_plugin.name",
				properties:[
					{name: prefix+"is-initialized", value: this._isInitialized},
					{name: prefix+"is-ready", value: this._isReady},
					{name: prefix+"is-login", value: this._isLoggedIn},
					{name: prefix+"user-id", value: this.userId},
					{name: prefix+"user-name", value: this.userName},
					{name: prefix+"is-supporter", value: this.isSupporter},
					{name: prefix+"is-waiting", value: this._isWaitingEvent},
					{name: prefix+"current-score-loop", value: JSON.stringify(this._currentScore)},	
					{name: prefix+"scores", value: JSON.stringify(this._scores)}
				]
			}
		];
		return values;
	}
	
	_release()
	{
		this._postToDOMAsync("destroy-ngio-window",{})
		super._release();
	}

	_saveToJson()
	{
		return {
			// data to be saved for savegames
		};
	}
	
	_loadFromJson(o)
	{
		// load state for savegames
	}
};
