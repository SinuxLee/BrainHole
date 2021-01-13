/**
 * Created by niansheng on 2019/6/10.
 */


cc.Class({
    extends: cc.Component,

    properties: {
        safeTime: {
            default: 0.5,
            tooltip: "按钮保护时间，指定间隔内只能点击一次."
        }
    },

    start(){
        let button = this.getComponent(cc.Button);
        if (!button){
            return;
        }

        this.clickEvents = button.clickEvents;

        this.node.on('click', ()=>{
            button.clickEvents = [];
            this.scheduleOnce((dt)=>{
                button.clickEvents = this.clickEvents;
            }, this.safeTime);
        }, this);
    }
});