
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerAttack extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property //功速
    fireInterval: number = 1.0;

    private fireTimer: number = 0;
    start() {
        this.schedule(this.fireBullet, this.fireInterval);
    }

    fireBullet() {
        if (this.bulletPrefab) {
            const bullet = cc.instantiate(this.bulletPrefab);
            bullet.setPosition(this.node.position);
            this.node.parent.addChild(bullet);
        }
    }
}
