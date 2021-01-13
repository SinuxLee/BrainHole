cc.Class({
    extends: cc.Component,

    properties: {
        contentLabel:cc.Label,
    },

    onLoad(){
        
    },
    /**
     * {content:"",type:0}
    */
    initData(data){
        this.contentLabel.string = data.content;
        switch(data.type){
            case 0:{
                this.runMoveAction();
            }break;
            case 1:{
                this.runOpacityAction();
            }break;
        }
    },

    runMoveAction(){
        var move = cc.moveTo(1, cc.v2(0, 200));
        var fade = cc.fadeTo(0.6, 0);
        var func = cc.callFunc(function(){
            this.runEndAction();
        },this);
        this.node.runAction(cc.sequence(move,fade,func));
    },

    runOpacityAction(){
        var fade = cc.fadeTo(0.6, 0);
        var func = cc.callFunc(function(){
            this.runEndAction();
        },this);
        this.node.runAction(cc.sequence(fade,func));
    },

    runEndAction(){
        this.node.destroy();
    },

    onDestroy(){
        
    },
});
