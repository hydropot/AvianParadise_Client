import EventType from "../Common/EventType";
import GameData from "../Logic/GameData";
/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-04-14 15:15
*/
export default class SpeciesChangePanel extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:speciesList, tips:"提示文本", type:Node, default:null}*/
        this.speciesList=null;
        /** @prop {name:btn_right, tips:"提示文本", type:Node, default:null}*/
        this.btn_right=null;

        this.page=0;
        this.animaltype=-1;
    }


    onAwake() { 
        this.animaltype=GameData.Type


        this.btn_right.on(Laya.Event.CLICK,this,function(){
            if(this.animaltype==0){//鸟纲
            this.pageTurn(this.page,5)
            this.pageShow(this.page,0);//鸟纲
            }
            //其他动物大类
        })


        Laya.stage.on(EventType.ShowSpecies_Bird,this,function(){//打开鸟类板块
            this.animaltype=0
            this.pageShow(this.page,0);
            Laya.Tween.to(this.owner,{scaleX:1,scaleY:1},100)
        })


        this.owner.getChildByName("Panel").getChildByName("btn_Close").on(Laya.Event.CLICK,this,function(){
            Laya.Tween.to(this.owner,{scaleX:0,scaleY:0},100)
        })

        //按下图标时才真正传递参数
        this.speciesList.mouseHandler=new Laya.Handler(this,function(e,index){
            if(e.type==Laya.Event.CLICK){
                GameData.Type=this.animaltype
                GameData.Species=index+this.page*15
                Laya.Tween.to(this.owner,{scaleX:0,scaleY:0},100)
                //console.log(GameData.Type+","+GameData.Species);
                //console.log(index);
                Laya.stage.event("Choose");
            }
        })

    }
    onDestroy(){
        Laya.loader.clearRes("res/atlas/UI/icon0.atlas");
        Laya.loader.clearRes("res/atlas/UI/touxiang.atlas");
        Laya.loader.clearRes("res/atlas/comp.atlas");
        Laya.loader.clearRes("res/atlas/UI.atlas");
        //Laya.Resource.destroyUnusedResources(); 
        Laya.stage.off(EventType.ShowSpecies_Bird,this);
        Laya.stage.off("Choose",this);

    }





    pageTurn(p,maxp){//实际共有maxp+1页
        this.page=p;
        if(this.page>=maxp){
            this.page=0
        }else{
            this.page=this.page+1
        }

    }

    pageShow(p,t){
        this.page=p;
        if(this.animaltype==t){
            for(var i=this.page*15;i<this.page*15+15;i++){//UI/icon0/0.png
                this.speciesList.getCell(i).getChildByName("icon").skin="UI/icon"+t+"/"+(i)+".png"//放在iconX文件夹内
                if(GameData.Species==i){
                    this.speciesList.getCell(i-this.page*15).getChildByName("choose").visible=true
                }else{
                    this.speciesList.getCell(i-this.page*15).getChildByName("choose").visible=false
                }
            }
        }
    }

}