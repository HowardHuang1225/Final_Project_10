const { ccclass, property } = cc._decorator;

@ccclass
export default class CircleAttack extends cc.Component {
    @property
    damage: number = 10;

    @property
    duration: number = 2;

    onLoad() {
        this.schedule(this.applyDamage, 1.0);
        this.scheduleOnce(this.destroySelf, this.duration);
    }

    applyDamage() {
        // 在这里实现对敌人的伤害逻辑
        cc.log('Applying damage:', this.damage);
    }

    destroySelf() {
        this.node.destroy();
    }
}


