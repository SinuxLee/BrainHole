var BaseCmpt = require("BaseCmpt")
var AlertPopNodeMediator = require("AlertPopNodeMediator");
cc.Class({
    extends: BaseCmpt,
    mediatorName:AlertPopNodeMediator,
    properties: {
        titleLabel:cc.Label,
        contentLabel:cc.Label,
        btnContent:cc.Node,
    },
    
    start(){

        var btn0Node = this.btnContent.children[0];
        btn0Node.on('click', ()=>{
            this.dispatchEvent("CLICK_BTN", 0);
        }, this);

        var btn1Node = this.btnContent.children[1];
        btn1Node.on('click', ()=>{
            this.dispatchEvent("CLICK_BTN", 1);
        }, this);
    },

    initData(data){//{title:"",content:"",btnArr:[{name:"",callback:""},{name:"",callback:""}]}
        if(data.title){
            this.titleLabel.string = data.title;
        }else{
            this.titleLabel.node.active = false;
        }
        this.contentLabel.string = data.content;
        for(var i = 0; i < this.btnContent.childrenCount; i++){
            var btnNode = this.btnContent.children[i];
            var btnData = data.btnArr[i];
            if(data.btnArr.length <= i){
                btnNode.active = false;
            }else{
                btnNode.active = true;
                btnNode.getChildByName("buttonLabel").getComponent(cc.Label).string = btnData.name;
            }
        }
        this.btnContent.getComponent(cc.Layout).updateLayout();
    },
});

