window.appNotice = {

  /// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // UI事件
  PRELOAD_COMPLETE: 'PRELOAD_COMPLETE', // {loadType:PreloadType.Node,name:""}
  PRELOAD_SHOW: 'PRELOAD_SHOW',
  PRELOAD_PROGRESS: 'PRELOAD_PROGRESS', // {p:1,t:2}
  CHANGE_LAYER: 'CHANGE_LAYER', // {name:"",loading:false}
  SHOW_NODE: 'SHOW_NODE', // {name:"",loading:false}
  HIDE_NODE: 'HIDE_NODE', // {name:""}
  DESTROY_NODE: 'DESTROY_NODE', // {name:""}
  SHOW_POP: 'SHOW_POP', // {name:"",,loading:false}
  HIDE_POP: 'HIDE_POP', // {name:""}
  DESTROY_POP: 'DESTROY_POP', // {name:""}

  SOCKET_NOTICE: 'SOCKET_NOTICE',
  TOAST_SHOW: 'TOAST_SHOW',

  LOADING_LOGO_SHOW: 'LOADING_LOGO_SHOW',
  LOADING_LOGO_HIDE: 'LOADING_LOGO_HIDE',

  // 游戏切换前后台
  GAME_EVENT_SHOW: 'GAME_EVENT_SHOW',
  GAME_EVENT_HIDE: 'GAME_EVENT_HIDE',

  SHARE_WX: 'SHARE_WX', // 微信分享

  SETTINT_SOUND: 'SETTINT_SOUND', // 声音

  RE_PLAY: 'RE_PLAY', // 重玩
  PLAY_NEXT_LEVEL: 'PLAY_NEXT_LEVEL',

  // 钥匙变化事件
  KEY_CHANGE_EVENT: 'KEY_CHANGE_EVENT',
  KEY_REFRESH_EVENT: 'KEY_REFRESH_EVENT'
}
