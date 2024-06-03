const { ccclass, property } = cc._decorator;
import ExperienceSystem from './ExperienceSystem'; 
@ccclass
export default class LandmineAttack extends cc.Component {

    @property(cc.Prefab)
    landminePrefab: cc.Prefab = null;

    @property()
    level: number = 0;

    private experienceSystem: ExperienceSystem = null;

    onLoad(){
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start() {
        this.schedule(this.placeLandmine, 2); // 每两秒调用一次placeLandmine方法
        console.log("placed landmine");
    }

    placeLandmine() {
        if (!this.landminePrefab) {
            cc.error("Player node or landmine prefab is not assigned!");
            return;
        }

        const playerPosition = this.node.parent.getPosition();
        const landmine = cc.instantiate(this.landminePrefab);
        landmine.setPosition(playerPosition);
        this.node.parent.parent.addChild(landmine);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.v:
                if (this.experienceSystem && this.experienceSystem.upgradePoints>0 && this.level !=3) {
                    this.experienceSystem.useUpgradePoint();
                    this.level +=1 ; // 按下 G 键消耗升级点数并增加 CircleAttack
                    console.log("level :",this.level);
                }
                break;
        }
    }
}
