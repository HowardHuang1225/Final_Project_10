const { ccclass, property } = cc._decorator;
import ExperienceSystem from './ExperienceSystem'; 

@ccclass
export default class PlayerAttack extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property // 射击间隔
    fireInterval: number = 1; // 調整攻擊間隔為 0.5 秒

    private fireTimer: number = 0;
    private level: number = 0;
    private experienceSystem: ExperienceSystem = null;

    onLoad(){
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start() {
        console.log(this.experienceSystem);
        this.fireTimer = this.fireInterval; // 初始化計時器
    }

    update(dt: number) {
        if(this.level == 3){
<<<<<<< HEAD
            this.fireInterval = 0.1;
=======
            this.fireInterval = 0.5;
>>>>>>> 251f7a8ecd054160017dab95e40fe732eecad198
        }
        // 更新計時器
        this.fireTimer += dt;
        // 檢查是否可以發射子彈
        if (this.fireTimer >= this.fireInterval) {
            this.fireBullets();
            this.fireTimer = 0; // 重置計時器
        }
    }

    fireBullets() {
        if (this.bulletPrefab && this.level == 0) {
            // 创建四个子弹并射向四个方向
            this.createBullet(cc.v2(0, 1));  // 上
            this.createBullet(cc.v2(0, -1)); // 下
            this.createBullet(cc.v2(1, 0));  // 右
            this.createBullet(cc.v2(-1, 0)); // 左
        }
        else if (this.bulletPrefab && this.level == 1) {
            // 创建四个子弹并射向四个方向
            this.createBullet(cc.v2(0, 1));  // 上
            this.createBullet(cc.v2(0, -1)); // 下
            this.createBullet(cc.v2(1, 0));  // 右
            this.createBullet(cc.v2(-1, 0)); // 左
            this.createBullet(cc.v2(1, 1));  // 上
            this.createBullet(cc.v2(1, -1)); // 下
            this.createBullet(cc.v2(-1, 1));  // 右
            this.createBullet(cc.v2(-1, -1)); // 左
        }
        else if (this.bulletPrefab && this.level == 2) {
            // 创建十六个子弹并射向十六个方向
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
        else if (this.bulletPrefab && this.level == 3) {
            // 创建四个子弹并射向四个方向
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
        const bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(this.node.position);
        this.node.parent.addChild(bullet);

        // 获取子弹组件
        const bulletComponent = bullet.getComponent("Bullet");
        if (bulletComponent) {
            bulletComponent.setDirection(direction);
        }
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.f:
                console.log(this.experienceSystem);
                if (this.experienceSystem && this.experienceSystem.upgradePoints >0 && this.level !=3) {
                    this.experienceSystem.useUpgradePoint();
                    this.level +=1 ; // 按下 G 键消耗升级点数并增加 CircleAttack
                    console.log("level :",this.level);
                }
                break;
        }
    }
}