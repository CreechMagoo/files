const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.TiledBg,
		C3.Plugins.NinePatch,
		C3.Plugins.Sprite,
		C3.Plugins.Shape3D,
		C3.Behaviors.solid,
		C3.Behaviors.EightDir,
		C3.Behaviors.Tween,
		C3.Behaviors.Sin,
		C3.Plugins.Spritefont2,
		C3.Plugins.Camera3D,
		C3.Plugins.Audio,
		C3.Plugins.Keyboard,
		C3.Plugins.Mouse,
		C3.Plugins.Timeline,
		C3.Plugins.Browser,
		C3.Plugins.PlatformInfo,
		C3.Plugins.Touch,
		C3.Plugins.AJAX,
		C3.Plugins.gamepad,
		C3.Plugins.LocalStorage,
		C3.Plugins.Dictionary,
		C3.Behaviors.Timer,
		C3.Behaviors.MoveTo,
		C3.Behaviors.DragnDrop,
		C3.Plugins.Rex_NGIO_Authentication,
		C3.Plugins.Rex_NGIO_Medal,
		C3.Plugins.Arr,
		C3.Plugins.FileSystem,
		C3.Plugins.System.Cnds.Compare,
		C3.Plugins.System.Exps.layoutname,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Plugins.Camera3D.Acts.LookParallelToLayout,
		C3.Plugins.System.Acts.SetVar,
		C3.Plugins.System.Acts.SetBoolVar,
		C3.Plugins.Sprite.Acts.StopAnim,
		C3.Plugins.PlatformInfo.Cnds.IsOnMobile,
		C3.Plugins.Spritefont2.Cnds.CompareInstanceVar,
		C3.Plugins.Spritefont2.Cnds.IsOnLayer,
		C3.Plugins.PlatformInfo.Cnds.IsWindowsWebView2Export,
		C3.Plugins.Spritefont2.Acts.Destroy,
		C3.Plugins.System.Cnds.CompareBoolVar,
		C3.Plugins.Audio.Acts.Play,
		C3.Plugins.System.Exps.log10,
		C3.Plugins.System.Cnds.Else,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Camera3D.Acts.RotateCamera,
		C3.Plugins.System.Exps.dt,
		C3.Behaviors.Sin.Exps.Value,
		C3.Plugins.TiledBg.Acts.SetImageOffsetX,
		C3.Plugins.TiledBg.Exps.ImageOffsetX,
		C3.Plugins.TiledBg.Acts.SetImageOffsetY,
		C3.Plugins.TiledBg.Exps.ImageOffsetY,
		C3.Plugins.Shape3D.Acts.SetTowardPosition,
		C3.Plugins.Keyboard.Cnds.IsKeyDown,
		C3.Plugins.System.Cnds.CompareVar,
		C3.Plugins.System.Acts.SubVar,
		C3.Plugins.Spritefont2.Cnds.HasTags,
		C3.Plugins.Spritefont2.Acts.SetText,
		C3.Plugins.System.Cnds.TriggerOnce,
		C3.Plugins.System.Exps.projectversion,
		C3.Plugins.FileSystem.Acts.Delete,
		C3.Plugins.LocalStorage.Acts.ClearStorage,
		C3.Plugins.Audio.Cnds.OnEnded,
		C3.Plugins.System.Cnds.IsGroupActive,
		C3.Plugins.Sprite.Acts.SetInstanceVar,
		C3.Plugins.Sprite.Exps.Y,
		C3.Plugins.Sprite.Acts.SetPos,
		C3.Plugins.Spritefont2.Exps.X,
		C3.Plugins.Sprite.Exps.Width,
		C3.Plugins.Spritefont2.Exps.Y,
		C3.Plugins.Sprite.Acts.SetVisible,
		C3.Behaviors.DragnDrop.Acts.SetEnabled,
		C3.Plugins.Keyboard.Cnds.OnKey,
		C3.Plugins.gamepad.Cnds.OnButtonDown,
		C3.Plugins.gamepad.Cnds.CompareAxis,
		C3.Plugins.System.Cnds.Every,
		C3.Plugins.Spritefont2.Cnds.PickInstVarHiLow,
		C3.Plugins.System.Acts.AddVar,
		C3.Plugins.Browser.Cnds.IsFullscreen,
		C3.Plugins.Spritefont2.Acts.SetOpacity,
		C3.Plugins.Spritefont2.Acts.ChangeTags,
		C3.Behaviors.DragnDrop.Cnds.IsDragging,
		C3.Plugins.Sprite.Cnds.IsOnLayer,
		C3.Plugins.Touch.Cnds.IsTouchingObject,
		C3.Plugins.Spritefont2.Cnds.IsVisible,
		C3.Plugins.Mouse.Cnds.OnMovement,
		C3.Plugins.Spritefont2.Acts.SetDefaultColor,
		C3.Plugins.System.Exps.rgbex255,
		C3.Plugins.Sprite.Acts.SetDefaultColor,
		C3.Plugins.Mouse.Acts.SetCursor,
		C3.Plugins.Mouse.Cnds.IsOverObject,
		C3.Plugins.Sprite.Cnds.CompareInstanceVar,
		C3.Plugins.Sprite.Exps.TagAt,
		C3.Plugins.Sprite.Cnds.HasTags,
		C3.Plugins.Mouse.Cnds.OnRelease,
		C3.Plugins.Touch.Cnds.OnTouchEnd,
		C3.Plugins.Browser.Acts.GoToURLWindow,
		C3.Plugins.Mouse.Cnds.OnObjectClicked,
		C3.Plugins.Mouse.Acts.RequestPointerLock,
		C3.Plugins.Audio.Acts.Stop,
		C3.Plugins.System.Acts.SetLayerVisible,
		C3.Plugins.Sprite.Acts.SetAnimFrame,
		C3.Plugins.Audio.Acts.StopAll,
		C3.Plugins.Browser.Acts.Close,
		C3.Plugins.System.Acts.ToggleBoolVar,
		C3.Plugins.Browser.Acts.RequestFullScreen,
		C3.Plugins.Browser.Acts.CancelFullScreen,
		C3.Plugins.Sprite.Cnds.PickByUID,
		C3.Plugins.Sprite.Cnds.IsOverlapping,
		C3.Plugins.Shape3D.Acts.Destroy,
		C3.Plugins.Sprite.Acts.Destroy,
		C3.Plugins.Mouse.Cnds.OnClick,
		C3.Plugins.gamepad.Cnds.IsButtonDown,
		C3.Plugins.Sprite.Cnds.CompareX,
		C3.Plugins.NinePatch.Exps.X,
		C3.Plugins.Sprite.Acts.SetX,
		C3.Plugins.Sprite.Exps.X,
		C3.Plugins.NinePatch.Exps.Width,
		C3.Behaviors.DragnDrop.Cnds.OnDragStart,
		C3.Behaviors.DragnDrop.Cnds.OnDrop,
		C3.Plugins.NinePatch.Cnds.CompareInstanceVar,
		C3.Plugins.System.Cnds.PickByComparison,
		C3.Plugins.Sprite.Exps.LayerName,
		C3.Plugins.Audio.Acts.SetVolume,
		C3.Plugins.Sprite.Acts.SetZElevation,
		C3.Plugins.Sprite.Exps.ZElevation,
		C3.Plugins.Sprite.Acts.SetPosToObject,
		C3.Plugins.Sprite.Acts.AddChild,
		C3.Plugins.Sprite.Exps.Angle,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.System.Cnds.ForEach,
		C3.Plugins.Shape3D.Cnds.CompareInstanceVar,
		C3.Plugins.System.Exps.random,
		C3.Plugins.Sprite.Acts.SetAnim,
		C3.Plugins.Mouse.Acts.ReleasePointerLock,
		C3.Plugins.Keyboard.Cnds.OnAnyKey,
		C3.Plugins.Keyboard.Cnds.OnAnyKeyReleased,
		C3.Plugins.Mouse.Cnds.OnAnyClick,
		C3.Plugins.Mouse.Cnds.OnWheel,
		C3.Plugins.Touch.Cnds.IsInTouch,
		C3.Plugins.Mouse.Cnds.HasPointerLock,
		C3.Plugins.Sprite.Acts.SetOpacity,
		C3.Plugins.Sprite.Acts.SetEffectParam,
		C3.Plugins.System.Cnds.EvaluateExpression,
		C3.Plugins.System.Cnds.CompareBetween,
		C3.Plugins.Sprite.Acts.SubInstanceVar,
		C3.Plugins.Sprite.Acts.AddInstanceVar,
		C3.Behaviors.EightDir.Acts.SetVectorX,
		C3.Plugins.Camera3D.Exps.CameraXRotation,
		C3.Behaviors.EightDir.Acts.SetVectorY,
		C3.Plugins.Sprite.Cnds.OnCollision,
		C3.Plugins.Shape3D.Exps.ZElevation,
		C3.Plugins.Shape3D.Exps.ZHeight,
		C3.Behaviors.Tween.Acts.StopAllTweens,
		C3.Behaviors.Tween.Acts.TweenOneProperty,
		C3.Plugins.gamepad.Exps.RawAxis,
		C3.Plugins.Sprite.Acts.SetBoolInstanceVar,
		C3.Behaviors.EightDir.Exps.MaxSpeed,
		C3.Plugins.gamepad.Exps.Axis,
		C3.Plugins.Sprite.Cnds.CompareFrame,
		C3.Plugins.Timeline.Cnds.IsPlayingByTags,
		C3.Plugins.Timeline.Acts.PlayTimeline,
		C3.Plugins.Touch.Cnds.OnTouchStart,
		C3.Plugins.Audio.Cnds.IsTagPlaying,
		C3.Plugins.Timeline.Cnds.OnKeyframeReached,
		C3.Behaviors.Sin.Acts.SetMagnitude,
		C3.Behaviors.EightDir.Exps.Speed,
		C3.Plugins.Shape3D.Cnds.CompareZElevation,
		C3.Behaviors.solid.Acts.SetEnabled,
		C3.Plugins.Shape3D.Cnds.IsOverlapping,
		C3.Plugins.Sprite.Acts.SetAngle,
		C3.Plugins.Spritefont2.Acts.SetVisible,
		C3.Plugins.Shape3D.Cnds.IsOnLayer,
		C3.Plugins.Shape3D.Cnds.HasTags,
		C3.Plugins.Timeline.Acts.SetInstance,
		C3.Plugins.Shape3D.Acts.ChangeTags,
		C3.Behaviors.solid.Cnds.IsEnabled,
		C3.Plugins.Audio.Acts.SetPlaybackRate,
		C3.Plugins.Audio.Acts.PlayByName,
		C3.Plugins.System.Exps.int,
		C3.Plugins.Sprite.Exps.UID,
		C3.Plugins.Sprite.Acts.SetWidth,
		C3.Plugins.Spritefont2.Exps.TextWidth,
		C3.Plugins.Sprite.Cnds.IsBoolInstanceVarSet,
		C3.Behaviors.Tween.Cnds.IsAnyPlaying,
		C3.Plugins.Camera3D.Acts.SetPosition,
		C3.Plugins.Sprite.Cnds.CompareZElevation,
		C3.Plugins.Mouse.Exps.MovementX,
		C3.Plugins.System.Cnds.LayerVisible,
		C3.Plugins.TiledBg.Acts.MoveToLayer,
		C3.Plugins.TiledBg.Cnds.HasTags,
		C3.Plugins.TiledBg.Acts.Destroy,
		C3.Plugins.System.Acts.SnapshotCanvas,
		C3.Plugins.System.Acts.WaitForPreviousActions,
		C3.Plugins.System.Cnds.For,
		C3.Plugins.System.Exps.viewportwidth,
		C3.Plugins.System.Acts.CreateObject,
		C3.Plugins.System.Exps.loopindex,
		C3.Plugins.TiledBg.Acts.ChangeTags,
		C3.Plugins.TiledBg.Acts.SetSize,
		C3.Plugins.System.Exps.viewportheight,
		C3.Plugins.PlatformInfo.Exps.CanvasDeviceWidth,
		C3.Plugins.TiledBg.Acts.SetImageScaleX,
		C3.Plugins.TiledBg.Acts.SetImageScaleY,
		C3.Plugins.PlatformInfo.Exps.CanvasDeviceHeight,
		C3.Plugins.TiledBg.Acts.SetVisible,
		C3.Plugins.TiledBg.Cnds.CompareX,
		C3.Plugins.TiledBg.Cnds.OnURLLoaded,
		C3.Plugins.TiledBg.Acts.LoadURL,
		C3.Plugins.System.Exps.canvassnapshot,
		C3.Plugins.TiledBg.Exps.Count,
		C3.Plugins.System.Acts.GoToLayoutByName,
		C3.Behaviors.Timer.Acts.StartTimer,
		C3.Behaviors.Timer.Cnds.OnTimer,
		C3.Behaviors.MoveTo.Acts.MoveToPosition,
		C3.Plugins.TiledBg.Exps.X,
		C3.Behaviors.MoveTo.Cnds.OnArrived,
		C3.Plugins.System.Cnds.PickAll,
		C3.Plugins.FileSystem.Cnds.DesktopFeaturesSupported,
		C3.Plugins.FileSystem.Cnds.IsSupported,
		C3.Plugins.FileSystem.Acts.ReadTextFile,
		C3.Plugins.LocalStorage.Acts.CheckItemExists,
		C3.Plugins.System.Exps.find,
		C3.Plugins.System.Exps.regexmatchat,
		C3.Plugins.Browser.Exps.URL,
		C3.Plugins.Rex_NGIO_Authentication.Acts.Login,
		C3.Plugins.Dictionary.Acts.Clear,
		C3.Plugins.Dictionary.Acts.AddKey,
		C3.Plugins.FileSystem.Acts.WriteTextFile,
		C3.Plugins.Browser.Exps.ExecJS,
		C3.Plugins.Dictionary.Exps.AsJSON,
		C3.Plugins.LocalStorage.Acts.SetItem,
		C3.Plugins.FileSystem.Cnds.OnFileOperationComplete,
		C3.Plugins.Dictionary.Acts.JSONLoad,
		C3.Plugins.FileSystem.Exps.FileText,
		C3.Plugins.LocalStorage.Cnds.OnItemExists,
		C3.Plugins.LocalStorage.Exps.ItemValue,
		C3.Plugins.Dictionary.Exps.Get,
		C3.Plugins.Dictionary.Cnds.CompareValue,
		C3.Plugins.Rex_NGIO_Authentication.Cnds.OnLoginSuccess,
		C3.Plugins.Rex_NGIO_Medal.Acts.GetList,
		C3.Plugins.Rex_NGIO_Medal.Cnds.OnGetMedalsListSuccess,
		C3.Plugins.Rex_NGIO_Medal.Cnds.ForEachMedal,
		C3.Plugins.Arr.Acts.SetXY,
		C3.Plugins.Rex_NGIO_Medal.Exps.LoopIndex,
		C3.Plugins.Rex_NGIO_Medal.Exps.CurMedalID,
		C3.Plugins.Rex_NGIO_Medal.Exps.CurMedalIsUnlocked,
		C3.Plugins.Arr.Cnds.CompareXY,
		C3.Plugins.Arr.Exps.IndexOf,
		C3.Plugins.Touch.Cnds.OnTapGesture,
		C3.Plugins.Rex_NGIO_Medal.Acts.Unlock,
		C3.Plugins.NinePatch.Acts.SetPos,
		C3.Plugins.NinePatch.Exps.Y,
		C3.Plugins.NinePatch.Acts.SetOpacity,
		C3.Plugins.AJAX.Acts.RequestFile,
		C3.Plugins.AJAX.Cnds.OnComplete,
		C3.Plugins.System.Exps.tokenat,
		C3.Plugins.AJAX.Exps.LastData,
		C3.Plugins.System.Exps.tokencount,
		C3.Plugins.NinePatch.Cnds.HasTags,
		C3.Plugins.NinePatch.Acts.SetWidth,
		C3.Plugins.System.Exps.loadingprogress,
		C3.Plugins.System.Cnds.OnLoadFinished,
		C3.Plugins.NinePatch.Acts.ChangeTags,
		C3.Behaviors.Tween.Cnds.OnTweensFinished,
		C3.Behaviors.Tween.Cnds.IsPlaying,
		C3.Plugins.NinePatch.Acts.SetSize,
		C3.Plugins.NinePatch.Exps.Height,
		C3.Plugins.NinePatch.Acts.Destroy,
		C3.Plugins.Sprite.Cnds.CompareOpacity,
		C3.Plugins.Mouse.Acts.SetCursor2,
		C3.Plugins.Mouse.Cnds.IsButtonDown
	];
};
self.C3_JsPropNameTable = [
	{Wallpaper: 0},
	{Wood: 0},
	{WoodDark: 0},
	{Concrete: 0},
	{Grass: 0},
	{Water: 0},
	{Sky: 0},
	{Brick: 0},
	{Paneling: 0},
	{Tile: 0},
	{Glass: 0},
	{Door: 0},
	{Slit: 0},
	{DoorSmall: 0},
	{Space: 0},
	{WallpaperSecret: 0},
	{Panel: 0},
	{DoorExit: 0},
	{Exit: 0},
	{ElevatorFloor: 0},
	{ElevatorWall: 0},
	{ElevatorCeiling: 0},
	{EgyptCeiling: 0},
	{Sign1: 0},
	{Sign2: 0},
	{Sign3: 0},
	{Sign4: 0},
	{Sign5: 0},
	{type: 0},
	{Billboard: 0},
	{Solid: 0},
	{Ground: 0},
	{Skybox: 0},
	{Overlay: 0},
	{Collision: 0},
	{playerUp: 0},
	{playerDown: 0},
	{playerLeft: 0},
	{playerRight: 0},
	{playerHorizontal: 0},
	{playerVertical: 0},
	{playerAngle: 0},
	{playerSpeedHorizontal: 0},
	{playerSpeedVertical: 0},
	{playerOldX: 0},
	{playerOldY: 0},
	{"8Direction": 0},
	{Player: 0},
	{Tween: 0},
	{PlayerCam: 0},
	{Barrel: 0},
	{Lightpost: 0},
	{Cash: 0},
	{Cheese: 0},
	{Wine: 0},
	{Can: 0},
	{Beer: 0},
	{GALAKTOR: 0},
	{BigCheese: 0},
	{BigCash: 0},
	{id: 0},
	{observed: 0},
	{title: 0},
	{description: 0},
	{link: 0},
	{Trigger: 0},
	{Sight: 0},
	{SmallSight: 0},
	{PlayerPickup: 0},
	{Sine: 0},
	{Sine2: 0},
	{Sine3: 0},
	{Arm: 0},
	{Doomguy: 0},
	{HUD: 0},
	{HUDAmmo: 0},
	{HUDFont: 0},
	{Flash: 0},
	{PopupFont: 0},
	{Results: 0},
	{MobileArms: 0},
	{MobileButtons: 0},
	{"3DCamera": 0},
	{Audio: 0},
	{Keyboard: 0},
	{Mouse: 0},
	{TimelineController: 0},
	{Browser: 0},
	{PlatformInfo: 0},
	{Touch: 0},
	{AJAX: 0},
	{Gamepad: 0},
	{LocalStorage: 0},
	{SaveFile: 0},
	{Logo: 0},
	{MenuFont: 0},
	{oldY: 0},
	{Selector: 0},
	{Link: 0},
	{Timer: 0},
	{MoveTo: 0},
	{BleedLine: 0},
	{MenuFontSmall: 0},
	{Fade: 0},
	{DragDrop: 0},
	{Slider: 0},
	{SliderBar: 0},
	{Medal: 0},
	{Grave1: 0},
	{Grave2: 0},
	{Pot1: 0},
	{Pot2: 0},
	{Statue1: 0},
	{Tapestry1: 0},
	{Tapestry2: 0},
	{Painting1: 0},
	{Statue2: 0},
	{Painting2: 0},
	{Painting3: 0},
	{Painting4: 0},
	{Painting5: 0},
	{Painting6: 0},
	{Painting7: 0},
	{Painting8: 0},
	{Shelf1: 0},
	{Shelf2: 0},
	{Shelf3: 0},
	{Shelf4: 0},
	{Shelf5: 0},
	{Shelf6: 0},
	{Shelf7: 0},
	{Shelf8: 0},
	{Shelf9: 0},
	{Shelf10: 0},
	{Shelf11: 0},
	{Shelf12: 0},
	{Shelf13: 0},
	{Shelf14: 0},
	{Shelf15: 0},
	{Shelf16: 0},
	{Shelf17: 0},
	{Shelf18: 0},
	{Statue3: 0},
	{Statue4: 0},
	{Painting9: 0},
	{Painting10: 0},
	{Painting11: 0},
	{Merch1: 0},
	{Merch2: 0},
	{Merch3: 0},
	{Merch4: 0},
	{Merch5: 0},
	{Merch6: 0},
	{Merch7: 0},
	{Japan1: 0},
	{Japan2: 0},
	{Japan3: 0},
	{Japan4: 0},
	{Japan5: 0},
	{Japan6: 0},
	{Japan7: 0},
	{Japan8: 0},
	{Japan9: 0},
	{Japan10: 0},
	{Statue5: 0},
	{Statue6: 0},
	{Statue7: 0},
	{Statue8: 0},
	{Me: 0},
	{ModalArt: 0},
	{NGAuth: 0},
	{NGMedals: 0},
	{Medals: 0},
	{LoaderBar: 0},
	{LoaderBase: 0},
	{LoaderPlay: 0},
	{LoaderButton: 0},
	{LoaderText: 0},
	{Scumdog: 0},
	{FileSystem: 0},
	{GAME_mobile: 0},
	{GAME_eraseTimer: 0},
	{GAME_canLink: 0},
	{MENU_selected: 0},
	{MENU_menu: 0},
	{MENU_soundCountdown: 0},
	{MENU_keyControl: 0},
	{MENU_paused: 0},
	{SETTING_volumeSound: 0},
	{SETTING_volumeMusic: 0},
	{SETTING_fullscreen: 0},
	{SETTING_flashing: 0},
	{SETTING_doomMusic: 0},
	{UNLOCK_doomMusic: 0},
	{MEDAL_observations: 0},
	{MEDAL_items: 0},
	{MEDAL_spending: 0},
	{MEDAL_secrets: 0},
	{MEDAL_time: 0},
	{MEDAL_drinks: 0},
	{MEDAL_thoughtful: 0},
	{MEDAL_doom: 0},
	{direction: 0},
	{menu: 0},
	{GAME_beer: 0},
	{GAME_popupLifetime: 0},
	{GAME_flashLifetime: 0},
	{GAME_gruntCooldown: 0},
	{GAME_guyOverride: 0},
	{STAT_wealth: 0},
	{STAT_cheese: 0},
	{STAT_ammoWine: 0},
	{STAT_ammoBeer: 0},
	{STAT_observations: 0},
	{STAT_items: 0},
	{STAT_secrets: 0},
	{STAT_moneySpent: 0},
	{STAT_drinks: 0},
	{GAME_time: 0},
	{GAME_targetTime: 0},
	{GAME_badTime: 0},
	{GAME_maxObservations: 0},
	{GAME_maxItems: 0},
	{GAME_modalArt: 0},
	{GAME_modalPrice: 0},
	{GAME_modalUID: 0},
	{PLAYER_cameraHeight: 0},
	{PLAYER_horizontalScale: 0},
	{PLAYER_verticalScale: 0},
	{PLAYER_acceleration: 0},
	{PLAYER_deceleration: 0},
	{PLAYER_onGround: 0},
	{PLAYER_weapon: 0},
	{PHYS_gravity: 0},
	{PHYS_deltaZ: 0},
	{GAME_inactivityMax: 0},
	{GAME_inactivityTimer: 0},
	{text: 0},
	{BLEED_ready: 0},
	{BLEED_snapshotReady: 0},
	{BLEED_interval: 0},
	{BLEED_randomize: 0},
	{BLEED_linesCreated: 0},
	{BLEED_linesReady: 0},
	{BLEED_linesFinished: 0},
	{BLEED_layout: 0},
	{GAME_init: 0},
	{NGIO_init: 0},
	{NGIO_medals: 0},
	{layout: 0},
	{RESULTS_status: 0},
	{RESULTS_counter: 0},
	{RESULTS_locked: 0},
	{RESULTS_skipped: 0}
];

self.InstanceType = {
	Wallpaper: class extends self.ITiledBackgroundInstance {},
	Wood: class extends self.ITiledBackgroundInstance {},
	WoodDark: class extends self.ITiledBackgroundInstance {},
	Concrete: class extends self.ITiledBackgroundInstance {},
	Grass: class extends self.ITiledBackgroundInstance {},
	Water: class extends self.ITiledBackgroundInstance {},
	Sky: class extends self.ITiledBackgroundInstance {},
	Brick: class extends self.ITiledBackgroundInstance {},
	Paneling: class extends self.ITiledBackgroundInstance {},
	Tile: class extends self.ITiledBackgroundInstance {},
	Glass: class extends self.IWorldInstance {},
	Door: class extends self.ITiledBackgroundInstance {},
	Slit: class extends self.ITiledBackgroundInstance {},
	DoorSmall: class extends self.ITiledBackgroundInstance {},
	Space: class extends self.ITiledBackgroundInstance {},
	WallpaperSecret: class extends self.ITiledBackgroundInstance {},
	Panel: class extends self.ITiledBackgroundInstance {},
	DoorExit: class extends self.ISpriteInstance {},
	Exit: class extends self.ISpriteInstance {},
	ElevatorFloor: class extends self.ITiledBackgroundInstance {},
	ElevatorWall: class extends self.ITiledBackgroundInstance {},
	ElevatorCeiling: class extends self.ITiledBackgroundInstance {},
	EgyptCeiling: class extends self.ITiledBackgroundInstance {},
	Sign1: class extends self.ISpriteInstance {},
	Sign2: class extends self.ISpriteInstance {},
	Sign3: class extends self.ISpriteInstance {},
	Sign4: class extends self.ISpriteInstance {},
	Sign5: class extends self.ISpriteInstance {},
	Billboard: class extends self.I3DShapeInstance {},
	Ground: class extends self.I3DShapeInstance {},
	Skybox: class extends self.I3DShapeInstance {},
	Overlay: class extends self.I3DShapeInstance {},
	Collision: class extends self.I3DShapeInstance {},
	Player: class extends self.ISpriteInstance {},
	PlayerCam: class extends self.ISpriteInstance {},
	Barrel: class extends self.ISpriteInstance {},
	Lightpost: class extends self.ISpriteInstance {},
	Cash: class extends self.ISpriteInstance {},
	Cheese: class extends self.ISpriteInstance {},
	Wine: class extends self.ISpriteInstance {},
	Can: class extends self.ISpriteInstance {},
	Beer: class extends self.ISpriteInstance {},
	GALAKTOR: class extends self.ISpriteInstance {},
	BigCheese: class extends self.ISpriteInstance {},
	BigCash: class extends self.ISpriteInstance {},
	Trigger: class extends self.ISpriteInstance {},
	Sight: class extends self.ISpriteInstance {},
	SmallSight: class extends self.ISpriteInstance {},
	PlayerPickup: class extends self.ISpriteInstance {},
	Arm: class extends self.ISpriteInstance {},
	Doomguy: class extends self.ISpriteInstance {},
	HUD: class extends self.ISpriteInstance {},
	HUDAmmo: class extends self.ISpriteFontInstance {},
	HUDFont: class extends self.ISpriteFontInstance {},
	Flash: class extends self.ISpriteInstance {},
	PopupFont: class extends self.ISpriteFontInstance {},
	Results: class extends self.ISpriteInstance {},
	MobileArms: class extends self.ISpriteInstance {},
	MobileButtons: class extends self.ISpriteInstance {},
	_3DCamera: class extends self.IInstance {},
	Audio: class extends self.IInstance {},
	Keyboard: class extends self.IInstance {},
	Mouse: class extends self.IInstance {},
	TimelineController: class extends self.IInstance {},
	Browser: class extends self.IInstance {},
	PlatformInfo: class extends self.IInstance {},
	Touch: class extends self.IInstance {},
	AJAX: class extends self.IInstance {},
	Gamepad: class extends self.IInstance {},
	LocalStorage: class extends self.IInstance {},
	SaveFile: class extends self.IDictionaryInstance {},
	Logo: class extends self.ISpriteInstance {},
	MenuFont: class extends self.ISpriteFontInstance {},
	Selector: class extends self.ISpriteInstance {},
	Link: class extends self.ISpriteInstance {},
	BleedLine: class extends self.ITiledBackgroundInstance {},
	MenuFontSmall: class extends self.ISpriteFontInstance {},
	Fade: class extends self.ISpriteInstance {},
	Slider: class extends self.ISpriteInstance {},
	SliderBar: class extends self.IWorldInstance {},
	Medal: class extends self.ISpriteInstance {},
	Grave1: class extends self.ISpriteInstance {},
	Grave2: class extends self.ISpriteInstance {},
	Pot1: class extends self.ISpriteInstance {},
	Pot2: class extends self.ISpriteInstance {},
	Statue1: class extends self.ISpriteInstance {},
	Tapestry1: class extends self.ISpriteInstance {},
	Tapestry2: class extends self.ISpriteInstance {},
	Painting1: class extends self.ISpriteInstance {},
	Statue2: class extends self.ISpriteInstance {},
	Painting2: class extends self.ISpriteInstance {},
	Painting3: class extends self.ISpriteInstance {},
	Painting4: class extends self.ISpriteInstance {},
	Painting5: class extends self.ISpriteInstance {},
	Painting6: class extends self.ISpriteInstance {},
	Painting7: class extends self.ISpriteInstance {},
	Painting8: class extends self.ISpriteInstance {},
	Shelf1: class extends self.ISpriteInstance {},
	Shelf2: class extends self.ISpriteInstance {},
	Shelf3: class extends self.ISpriteInstance {},
	Shelf4: class extends self.ISpriteInstance {},
	Shelf5: class extends self.ISpriteInstance {},
	Shelf6: class extends self.ISpriteInstance {},
	Shelf7: class extends self.ISpriteInstance {},
	Shelf8: class extends self.ISpriteInstance {},
	Shelf9: class extends self.ISpriteInstance {},
	Shelf10: class extends self.ISpriteInstance {},
	Shelf11: class extends self.ISpriteInstance {},
	Shelf12: class extends self.ISpriteInstance {},
	Shelf13: class extends self.ISpriteInstance {},
	Shelf14: class extends self.ISpriteInstance {},
	Shelf15: class extends self.ISpriteInstance {},
	Shelf16: class extends self.ISpriteInstance {},
	Shelf17: class extends self.ISpriteInstance {},
	Shelf18: class extends self.ISpriteInstance {},
	Statue3: class extends self.ISpriteInstance {},
	Statue4: class extends self.ISpriteInstance {},
	Painting9: class extends self.ISpriteInstance {},
	Painting10: class extends self.ISpriteInstance {},
	Painting11: class extends self.ISpriteInstance {},
	Merch1: class extends self.ISpriteInstance {},
	Merch2: class extends self.ISpriteInstance {},
	Merch3: class extends self.ISpriteInstance {},
	Merch4: class extends self.ISpriteInstance {},
	Merch5: class extends self.ISpriteInstance {},
	Merch6: class extends self.ISpriteInstance {},
	Merch7: class extends self.ISpriteInstance {},
	Japan1: class extends self.ISpriteInstance {},
	Japan2: class extends self.ISpriteInstance {},
	Japan3: class extends self.ISpriteInstance {},
	Japan4: class extends self.ISpriteInstance {},
	Japan5: class extends self.ISpriteInstance {},
	Japan6: class extends self.ISpriteInstance {},
	Japan7: class extends self.ISpriteInstance {},
	Japan8: class extends self.ISpriteInstance {},
	Japan9: class extends self.ISpriteInstance {},
	Japan10: class extends self.ISpriteInstance {},
	Statue5: class extends self.ISpriteInstance {},
	Statue6: class extends self.ISpriteInstance {},
	Statue7: class extends self.ISpriteInstance {},
	Statue8: class extends self.ISpriteInstance {},
	Me: class extends self.ISpriteInstance {},
	ModalArt: class extends self.ISpriteInstance {},
	NGAuth: class extends self.IInstance {},
	NGMedals: class extends self.IInstance {},
	Medals: class extends self.IArrayInstance {},
	LoaderBar: class extends self.IWorldInstance {},
	LoaderBase: class extends self.IWorldInstance {},
	LoaderPlay: class extends self.ISpriteInstance {},
	LoaderButton: class extends self.IWorldInstance {},
	LoaderText: class extends self.ISpriteFontInstance {},
	Scumdog: class extends self.ISpriteInstance {},
	FileSystem: class extends self.IInstance {}
}