const { ccclass, property } = cc._decorator;
import ExperienceSystem from './ExperienceSystem';

@ccclass
export default class PlayerAttack extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property // 射击间隔
    fireInterval: number = 1; // 调整攻击间隔为 0.5 秒

    private fireTimer: number = 0;
    private level: number = 0;
    private experienceSystem: ExperienceSystem = null;
    private bulletPool: cc.NodePool;

    onLoad() {
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.bulletPool = new cc.NodePool();
        for (let i = 0; i < 500; i++) {
            let bullet = this.createBulletNode();
            this.bulletPool.put(bullet);
        }
    }

    createBulletNode(): cc.Node {
        return cc.instantiate(this.bulletPrefab);
    }

    start() {
        console.log(this.experienceSystem);
        this.fireTimer = this.fireInterval; // 初始化计时器
    }

    update(dt: number) {
        if (this.level == 3) {
            this.fireInterval = 0.5;
        }
        // 更新计时器
        this.fireTimer += dt;
        // 检查是否可以发射子弹
        if (this.fireTimer >= this.fireInterval) {
            this.fireBullets();
            this.fireTimer = 0; // 重置计时器
        }
    }

    fireBullets() {
        if (this.level == 0) {
            this.createBullet(cc.v2(0, 1));  // 上
            this.createBullet(cc.v2(0, -1)); // 下
            this.createBullet(cc.v2(1, 0));  // 右
            this.createBullet(cc.v2(-1, 0)); // 左
        } else if (this.level == 1) {
            this.createBullet(cc.v2(0, 1));  // 上
            this.createBullet(cc.v2(0, -1)); // 下
            this.createBullet(cc.v2(1, 0));  // 右
            this.createBullet(cc.v2(-1, 0)); // 左
            this.createBullet(cc.v2(1, 1));  // 上右
            this.createBullet(cc.v2(1, -1)); // 下右
            this.createBullet(cc.v2(-1, 1));  // 上左
            this.createBullet(cc.v2(-1, -1)); // 下左
        } else if (this.level >= 2) {
            const angles = [
                0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5,
                180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5
            ];

            for (let i = 0; i < angles.length; i++) {
                let radians = angles[i] * (Math.PI / 180);
                let direction = cc.v2(Math.cos(radians), Math.sin(radians));
                this.createBullet(direction);
            }
        }
    }

    createBullet(direction: cc.Vec2) {
        let bullet = null;
        if (this.bulletPool.size() > 0) {
            bullet = this.bulletPool.get();
        } else {
            bullet = this.createBulletNode();
        }

        bullet.setPosition(this.node.position);
        this.node.parent.addChild(bullet);

        // 获取子弹组件
        const bulletComponent = bullet.getComponent("Bullet");
        if (bulletComponent) {
            bulletComponent.setDirection(direction);
        }

        // 定义子弹的生命周期，飞行一段时间后回收
        this.scheduleOnce(() => {
            this.recycleBullet(bullet);
        }, 2); // 假设子弹的生命周期为2秒
    }

    recycleBullet(bullet: cc.Node) {
        bullet.removeFromParent(false);
        this.bulletPool.put(bullet);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.f:
                console.log(this.experienceSystem);
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && this.level != 3) {
                    this.experienceSystem.useUpgradePoint();
                    this.level += 1; // 按下 F 键消耗升级点数并增加 CircleAttack
                    console.log("level :", this.level);
                }
                break;
        }
    }
}
