//var HttpManager = require("HttpManager");
var PreloadType = cc.Enum({//以一组资源分类
    Pop:-1,
    Node : -1,
    ChangeLayer : -1,
    Null : -1,
});
var PreloadTool = cc.Class({
    properties: {
        loadAssets:Array,
        loadIndex:cc.Integer,
        loadType:null,
        actionType:null,
        groupName:"",
        initData:null,
        uiVisible:false,
        loading:false,
        completeCallback:null,
    },
    ctor(){
        
    },
    getJson(name){
        var url = "json/" + name;
        return cc.loader.getRes(url).json;
    },
    getPrefab(name){
        var url = "prefab/" + name;
        return cc.loader.getRes(url);
    },
    getSpriteFrame(name){
        var url = "image/" + name;   
        return new cc.SpriteFrame(cc.loader.getRes(url));
    },
    setSpriteFrame(url,sprite){
        var type = cc.SpriteFrame;
        var res = cc.loader.getRes(url,type);
        if(res){
            sprite.spriteFrame = res;
        }else{
            cc.loader.loadRes(url, type, function (err,res){
                if(err){
                    cc.error(err);
                }else{
                    sprite.spriteFrame = res;
                }
            });
        }
    },

    preload(assets,uiVisible,completeCallback){
        if(this.loading){
            cc.error("载入资源中");
            return;
        }
        this.loading = true;
        this.completeCallback = completeCallback;
        this.uiVisible = uiVisible;
        this.groupName = "";
        this.loadType = PreloadType.Null;
        this.actionType = null;
        this.loadIndex = -1;
        this.loadAssets = this.changeToArrAssets(assets);
        this.loadNext();
    },
    preloadGroup(data,uiVisible = true){
        if(this.loading){
            cc.error("载入资源中");
            return;
        }
        this.loading = true;
        this.uiVisible = uiVisible;
        this.loadIndex = -1;
        this.loadType = data.loadType;
        this.actionType = data.actionType;
        this.groupName = data.groupName;
        this.loadAssets = this.changeToArrAssets(data.assets);
        this.initData = data.initData,
        this.loadNext();
    },
    changeToArrAssets(assets){
        var newAssets = [];
        var normalArr = [];
        for(var i = 0; i < assets.length; i++){
            var tag = assets[i].indexOf("_");
            var type = assets[i].substr(0,tag)
            var name = assets[i].substr(tag+1);
            switch(type){
                case "json":{
                    normalArr.push("json/" + name);
                }break;
                case "prefab":{
                    normalArr.push("prefab/" + name);
                }break;
                case "image":{
                    normalArr.push("image/" + name);
                }break;
                default:{
                    newAssets.push(assets[i])
                }break;
            }
        }
        if(normalArr.length) {
            newAssets.push("resArr_" + JSON.stringify(normalArr));
        }
        cc.log(newAssets)
        return newAssets;
    },
    loadAsset(asset){
        var tag = asset.indexOf("_");
        var type = asset.substr(0,tag)
        var name = asset.substr(tag+1);
        switch(type){
            case "http":{
                this.loadHttp(name);
            }break;
            case "resDir":{
                this.loadResDir(name);
            }break;
            case "resArr":{
                this.loadResArr(JSON.parse(name));
            }break;
            default:{
                cc.error("no asset type" + type);
            }break;
        }
    },
    preloadProgress(completedCount,totalCount){
        var obj = {};
        obj.progress = ((this.loadIndex + completedCount / totalCount)/ this.loadAssets.length).toFixed(3);  
        //cc.log(this.loadIndex,this.loadAssets.length,completedCount,totalCount,obj.progress);      
        puremvc.Facade.sendNotification(appNotice.PRELOAD_PROGRESS,obj);  
    },
    preloadComplete(){
        var obj = {};
        obj.loadType = this.loadType;
        obj.actionType = this.actionType;
        obj.name = this.groupName;
        obj.initData = this.initData;
        puremvc.Facade.sendNotification(appNotice.PRELOAD_COMPLETE,obj);
    },
    loadNext(){
        this.loadIndex++;
        if(this.loadIndex < this.loadAssets.length){
            if(this.uiVisible){
                cc.log("loadNext")
                this.preloadProgress(0,1);
            }
            this.loadAsset(this.loadAssets[this.loadIndex]);
        }else{
            this.loading = false;
            if(this.uiVisible){
                this.uiVisible = false;
                this.preloadComplete();
            }
            if(this.completeCallback){
                this.completeCallback();
                this.completeCallback = null;
            }
        }
    },
    loadHttp(name){
        // HttpManager.httpRequest(name,function(err,data){
        //     if(err){
        //         cc.error(err);
        //     }
        //     this.loadNext();
        // }.bind(this));
    },
    loadResDir(name){
        cc.loader.loadResDir(name,function (err,resource,urls) {
            if(err){
                cc.error(err);
            }
            this.loadNext();
        }.bind(this));
    },
    loadResArr(data){
        cc.loader.loadResArray(data,cc.Asset,(completedCount,totalCount,item)=>{
            //cc.log(completedCount,totalCount,item);
            this.preloadProgress(completedCount,totalCount);
        },(err,resource)=>{
            if(err){
                cc.error(err);
            }
            this.loadNext();
        },);
    },
    releaseAsset(assets){
        for(var i = 0; i < assets.length; i++){
            var tag = assets[i].indexOf("_");
            var type = assets[i].substr(0,tag)
            var name = assets[i].substr(tag+1);
            cc.log("release " + type + " " + name)
            switch(type){
                case "json":
                case "http":{

                }break;
                case "prefab":{
                    var url = "prefab/" + name;
                    cc.loader.releaseRes(url);
                }break;
                case "image":{
                    var url = "image/" + name;
                    cc.loader.releaseRes(url);
                }break;
                case "resDir":{
                    cc.loader.releaseResDir(name);
                }break;
                default:{
                    cc.error("no asset type" + type);
                }break;
            }
        }
    },

    loadPrefab(name, cb) {
        var url = "prefab/" + name;
        cc.loader.loadRes(url, cc.Prefab, function (err, res){
            cb(err, cc.instantiate(res));
        });
    },

    releasePrefab(name){
        var url = "prefab/" + name;
        cc.loader.releaseRes(url);
    },


});
PreloadTool.prototype.PreloadType = PreloadType;
module.exports = PreloadTool;