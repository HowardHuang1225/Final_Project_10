const { ccclass, property } = cc._decorator;
import ExperienceSystem from './ExperienceSystem'; 

@ccclass
export default class CircleAttack extends cc.Component {
    @property
    damage: number = 10;

    private experienceSystem: ExperienceSystem = null;

    private level: number = 0;


    onLoad() {
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        //console.log(this.experienceSystem);
        this.schedule(this.applyDamage, 1.0);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(dt){
        if(this.level == 0){
            this.damage = 10;
            this.node.scale = 1;
        }
        else if(this.level == 1){
            this.damage = 15;
            this.node.scale = 2;
        }
        else if(this.level == 2){
            this.damage = 20;
            this.node.scale = 3;
        }
        else if(this.level == 3){
            this.damage = 25;
            this.node.scale = 4;
        }

    }

    applyDamage() {
        cc.log('Applying damage:', this.damage);
    }

    destroySelf() {
        this.node.destroy();
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.g:
                if (this.experienceSystem && this.experienceSystem.upgradePoints>0 && this.level !=3) {
                    this.experienceSystem.useUpgradePoint();
                    this.level +=1 ; // 按下 G 键消耗升级点数并增加 CircleAttack
                    console.log("level :",this.level);
                }
                break;
        }
    }
}


