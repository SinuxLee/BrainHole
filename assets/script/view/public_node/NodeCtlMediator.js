
cc.Class({
    extends:puremvc.Mediator,
    properties: {
        layerPool:null,
        nodePool:null,
        popNodePool:null,
        lastNodeName:"",
        currentNodeName:"",
        nodeAssertsObj:null,
    },
    statics:{
        NAME:"NodeCtlMediator",
    },
    onRegister(){
        this.nodePool = {};
        this.popNodePool = {};
        this.layerPool = {};
        this.nodeAssertsObj = {};

        //用于记录当前显示的node窗口
        this._showNodeObj = {};
        this._showPopObj = {};


         cc.game.on(cc.game.EVENT_HIDE, function(){
            console.log("游戏进入后台");
            this.facade.sendNotification(appNotice.GAME_EVENT_HIDE);
    　　},this);


    　　cc.game.on(cc.game.EVENT_SHOW, function(){
            console.log("游戏进入前台");
            this.facade.sendNotification(appNotice.GAME_EVENT_SHOW);
    　　},this);
    },
    onRemove(){
        
    },
    listNotificationInterests(){
        return [
            appNotice.CHANGE_LAYER,
            appNotice.SHOW_NODE,
            appNotice.HIDE_NODE,
            appNotice.DESTROY_NODE,
            appNotice.SHOW_POP,
            appNotice.HIDE_POP,
            appNotice.DESTROY_POP,
            appNotice.PRELOAD_COMPLETE,
            appNotice.TOAST_SHOW,
        ];
    },
    handleNotification(notification){
        var data = notification.getBody();
        var notificationName = notification.getName();
       
        var name = data.name;
        var loading = data.loading;
        var loadType = data.loadType;
        var initData = data.initData;
        var actionType = data.actionType;
        switch(notificationName){
            case appNotice.TOAST_SHOW:{
                this.showToast(data);
            }break;
            case appNotice.SHOW_POP:{
                this.showPop(name,loading,initData);
            }break;   
            case appNotice.CHANGE_LAYER:{
                this.changeLayer(name,loading,initData);
            };break;
            case appNotice.SHOW_NODE:{
                console.log("*****************appNotice.SHOW_NODE : " + name);
                this.showNode(name,loading,initData, actionType);
            }break; 
            case appNotice.HIDE_POP:{
                this.hidePop(name);
            }break;
            case appNotice.HIDE_NODE:{
                console.log("***************appNotice.HIDE_NODE : " + name);
                this.hideNode(name, actionType);
            }break;
            case appNotice.DESTROY_POP:{
                this.destroyPop(name);
            }break;
            case appNotice.DESTROY_NODE:{
                this.destroyNode(name);
            }break;
            case appNotice.PRELOAD_COMPLETE:{
                this.preloadComplete(name,loadType,initData, actionType);
            }break;
        }
    },

    showToast(data){
        var prefab = cc.loader.getRes("prefab/ToastNode");
        var node = cc.instantiate(prefab)
        this.viewComponent.toastContent.addChild(node);
        node.getComponent("ToastNode").initData(data);
    },

    getNodeAssets(name){
        var assets = appConfig.depends[name];
        var assetsFunction = appConfig.depends[name + "GetRes"];
        if(!assets){
            assets = [];
        }
        if(assetsFunction){
            assets = assets.concat(assetsFunction());
        }
        var newAssets = assets.concat();
        for(var i = 0; i < assets.length; i++){
            var arr = assets[i].split("_");
            var atype = arr[0];
            var aname = arr[1];
            if(atype == "prefab"){
                var nodeAsserts = this.getNodeAssets(aname);
                if(nodeAsserts){
                    newAssets = newAssets.concat(nodeAsserts);
                }
            }
        }
        return newAssets;
    },
    showPop(name, loading, initData){
        if(loading){
            this.facade.sendNotification(appNotice.PRELOAD_SHOW);
        }
        if(this.popNodePool[name]){
            this.popNodePool[name].active = true;

            this.setShowPopTag(name);

            actionLib.backIn(this.popNodePool[name].getChildByName("content"));

            var name = this.popNodePool[name].name + this.popNodePool[name].uuid;
            var mediator = this.facade.retrieveMediator(name);
            if(mediator && mediator.initData){
                mediator.initData(initData);
            }
        }else{
            if(preloadTool.getPrefab(name)){
                this.preloadComplete(name,preloadTool.PreloadType.Pop,initData);
            }else{
                var data = {};
                data.loadType = preloadTool.PreloadType.Pop;
                data.groupName = name;
                var assets = this.getNodeAssets(name);
                assets.push("prefab_" + name);
                data.assets = assets;
                data.initData = initData;
                preloadTool.preloadGroup(data);
            }
        }
    },
    changeLayer(name, loading, initData){
        if(loading){
            this.facade.sendNotification(appNotice.PRELOAD_SHOW);
        }
        var data = {};
        data.loadType = preloadTool.PreloadType.ChangeLayer;
        data.groupName = name;
        if(!this.nodeAssertsObj[name]){
            this.nodeAssertsObj[name] = this.getNodeAssets(name);
            this.nodeAssertsObj[name].push("prefab_" + name);
        }
        data.assets = this.nodeAssertsObj[name];
        data.initData = initData;
        cc.log("changeLayer:",data)
        preloadTool.preloadGroup(data);
    },

    showNode(name, loading, initData, actionType){
        if(loading){
            this.facade.sendNotification(appNotice.PRELOAD_SHOW);
        }

        if(this.nodePool[name]){
            this.nodePool[name].active = true;

            this.setShowNodeTag(name, actionType);

            if(actionType == 1){
                actionLib.downIn(this.nodePool[name].getChildByName("content"));
            }else{
                actionLib.backIn(this.nodePool[name].getChildByName("content"));
            }
            
            var name = this.nodePool[name].name + this.nodePool[name].uuid;
            var mediator = this.facade.retrieveMediator(name);
            if(mediator && mediator.initData){
                mediator.initData(initData);
            }
            //刷新数据(show)
            if(mediator && mediator.refreshData){
                mediator.refreshData();   
            }
        }else{
            cc.log(name,preloadTool.getPrefab(name))
            if(preloadTool.getPrefab(name)){
                this.preloadComplete(name,preloadTool.PreloadType.Node,initData, actionType);
            }else{
                var data = {};
                data.loadType = preloadTool.PreloadType.Node;
                data.groupName = name;
                var assets = this.getNodeAssets(name);
                assets.push("prefab_" + name);
                data.assets = assets;
                data.initData = initData;
                preloadTool.preloadGroup(data);
            }
        }
    },
    hidePop(name){
        if(this.popNodePool[name]){
            actionLib.backOut(this.popNodePool[name].getChildByName("content"), ()=>{
                this.popNodePool[name].active = false;
            });
        }else{
            cc.error("no node " + name);
        }

        this._showPopObj = {};
    },
    hideNode(name, actionType){
        if (this.nodePool[name]) {
            if(actionType == 1){
                actionLib.downOut(this.nodePool[name].getChildByName("content"), ()=>{
                    console.log("hideNode:", name);
                    this.nodePool[name].active = false;
                });
            }else{
                actionLib.backOut(this.nodePool[name].getChildByName("content"), ()=>{
                    console.log("hideNode:", name);
                    this.nodePool[name].active = false;
                });
            }
        } else {
            cc.error("no node " + name);
        }
        this._showNodeObj = {};
    },
    destroyPop(name){
        var assets = this.getNodeAssets(name);
        assets.push("prefab_" + name);
        preloadTool.releaseAsset(assets);
        if(this.popNodePool[name].isValid){
            this.popNodePool[name].destroy();
        }
        delete this.popNodePool[name];
    },
    destroyLayer(name){
        var assets = this.getNodeAssets(name);
        assets.push("prefab_" + name);
        preloadTool.releaseAsset(assets);
        if(this.layerPool[name].isValid){
            this.layerPool[name].destroy();
        }
        this.nodeAssertsObj[name] = null;
        delete this.layerPool[name];
    },
    destroyNode(name){
        var assets = this.getNodeAssets(name);
        assets.push("prefab_" + name);
        preloadTool.releaseAsset(assets);
        if(this.nodePool[name].isValid){
            this.nodePool[name].destroy();
        }
        delete this.nodePool[name];
    },

    preloadComplete(name, loadType, initData, actionType){
        var prefab = cc.loader.getRes("prefab/" + name);
        var node = cc.instantiate(prefab)
        switch(loadType){
            case preloadTool.PreloadType.ChangeLayer:{
                this.lastNodeName = this.currentNodeName;
                this.currentNodeName = name;
                this.viewComponent.layerContent.addChild(node);
                this.layerPool[name] = node;
                this.destroyAllPop();
                this.destroyAllNode();
                if(this.lastNodeName){
                    this.destroyLayer(this.lastNodeName);
                }
            }break;
            case preloadTool.PreloadType.Node:{
                this.viewComponent.nodeContent.addChild(node);
                this.nodePool[name] = node;

                this.setShowNodeTag(name, actionType);
            }break;
            case preloadTool.PreloadType.Pop:{
                this.viewComponent.popContent.addChild(node);
                this.popNodePool[name] = node;

                this.setShowPopTag(name);
            }break;
        }
        var name = node.name + node.uuid;
        var mediator = this.facade.retrieveMediator(name);

        if(mediator && mediator.initData){
            mediator.initData(initData);
        }
    },

    //设置当前显示的node
    setShowNodeTag(name, actionType){
        if(this._showNodeObj.name != name && this._showNodeObj.name && this.nodePool[this._showNodeObj.name]){
            console.log("setShowNodeTag:",name);
            this.nodePool[this._showNodeObj.name].active = false;
        }
        this._showNodeObj.name = name;
        this._showNodeObj.actionType = actionType;
    },

    setShowPopTag(name){
        if(this._showPopObj.name != name && this._showPopObj.name && this.popNodePool[this._showPopObj.name]){
            console.log("setShowPopTag:",name);
            this.popNodePool[this._showPopObj.name].active = false;
        }
        this._showPopObj.name = name;
    },

    currentNodeHasAssert(name){
        var isHad = false;
        for(var i = 0; i < this.nodeAssertsObj[this.currentNodeName].length; i++){
            var arr = this.nodeAssertsObj[this.currentNodeName][i].split('prefab_');
            if(arr.length > 1 && arr[1] == name){
                isHad = true;
                break;
            }
        }
        return isHad;
    },
    destroyAllPop(){
        for(var key in this.popNodePool){
            if(!this.currentNodeHasAssert(key)){
                this.destroyPop(key);
            }
        }
    },
    destroyAllNode(){
        for(var key in this.nodePool){
            if(!this.currentNodeHasAssert(key)){
                this.destroyNode(key);
            }
        } 
    },
    destroyAllLayer(){
        for(var key in this.layerPool){
            this.destroyLayer(key);
        } 
    },
    destoryAll(){
        this.destoryAllPop();
        this.destroyAllNode();
        this.destroyAllLayer();
    }
});
