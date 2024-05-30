const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerAttack extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property // 射击间隔
    fireInterval: number = 0.5; // 調整攻擊間隔為 0.5 秒

    private fireTimer: number = 0;

    start() {
        this.fireTimer = this.fireInterval; // 初始化計時器
    }

    update(dt: number) {
        // 更新計時器
        this.fireTimer += dt;
        // 檢查是否可以發射子彈
        if (this.fireTimer >= this.fireInterval) {
            this.fireBullets();
            this.fireTimer = 0; // 重置計時器
        }
    }

    fireBullets() {
        if (this.bulletPrefab) {
            // 创建四个子弹并射向四个方向
            this.createBullet(cc.v2(0, 1));  // 上
            this.createBullet(cc.v2(0, -1)); // 下
            this.createBullet(cc.v2(1, 0));  // 右
            this.createBullet(cc.v2(-1, 0)); // 左
        }
    }

    createBullet(direction: cc.Vec2) {
        const bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(this.node.position);
        this.node.parent.addChild(bullet);

        // 获取子弹组件
        const bulletComponent = bullet.getComponent("Bullet");
        if (bulletComponent) {
            bulletComponent.setDirection(direction);
        }
    }
}