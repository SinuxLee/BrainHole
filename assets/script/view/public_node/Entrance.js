var NodeCtlMediator = require("NodeCtlMediator");
var LoadingNodeMediator = require("LoadingNodeMediator");
var StartupCommand = require("StartupCommand");
var RewardVideo = require("RewardVideo");

cc.Class({
    extends: cc.Component,

    properties: {
        layerContent:cc.Node,
        nodeContent:cc.Node,
        popContent:cc.Node,
        toastContent:cc.Node,
        loadingNode:cc.Node,
        loadingLogoNode:cc.Node,
        loadingLogoCircle:cc.Node,
        loadingProgressBar:cc.ProgressBar,
        progressLabel:cc.Label,

    },
    //如果在ctor new mediator,可能造成mediator初始化node的数据出问题
    onLoad(){
        window.rewardVideo = new RewardVideo();
        puremvc.Facade.registerCommand(appNotice.START_UP,StartupCommand);
        puremvc.Facade.sendNotification(appNotice.START_UP);
        puremvc.Facade.registerMediator(new LoadingNodeMediator(LoadingNodeMediator.NAME,this));
        puremvc.Facade.registerMediator(new NodeCtlMediator(NodeCtlMediator.NAME,this));


        //必须加载的资源，否则无法启动整套UI框架
        preloadTool.preload(["prefab_ToastNode"],false,function(){
            puremvc.Facade.sendNotification(appNotice.CHANGE_LAYER, {name: "MainNode", loading: true});
        });

        window.rewardVideo.dateMark(1004);
    },

    onDestroy(){
        puremvc.Facade.removeMediator(NodeCtlMediator.NAME);
        puremvc.Facade.removeMediator(LoadingNodeMediator.NAME);
    },
});
