import ExperienceSystem from './ExperienceSystem'; // Import the ExperienceSystem class
import StaminaSystem from './StaminaSystem';
const { ccclass, property } = cc._decorator;

@ccclass
export class PlayerController extends cc.Component {

    @property()
    playerSpeed: number = 300;

    @property()
    playerLife: number = 30;

    @property(cc.Prefab)
    newAttackPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    ringAttackPrefab: cc.Prefab = null; // 新的散弹枪攻击预制体

    @property(cc.Prefab)
    landmineAttackPrefab: cc.Prefab = null;

    @property(cc.ProgressBar)
    LifeBar: cc.ProgressBar = null;

    private moveDir: cc.Vec2 = cc.v2(0, 0);
    private upDown: boolean = false;
    private downDown: boolean = false;
    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private physicManager: cc.PhysicsManager = null;
    private idleFrame: cc.SpriteFrame = null;
    private anim: cc.Animation = null;
    private experienceSystem: ExperienceSystem = null;
    private contactMonsters: Set<cc.Node> = new Set();
    private invincible: boolean = false;
    private staminaSystem: StaminaSystem = null;
    private overlay: cc.Node = null;

    private dead: boolean = false;
    private iscircle: boolean = false;
    private isring: boolean = false;
    private ismoloto: boolean = false;

    onLoad() {
        // this.node.zIndex = 8
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, -200);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // 获取 ExperienceSystem 组件
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        if (this.experienceSystem) {
            cc.log('ExperienceSystem component found');
            // 绑定 level-up 事件
            this.experienceSystem.node.on('level-up', this.onLevelUp, this);
        } else {
            cc.error('ExperienceSystem component not found');
        }

        this.staminaSystem = cc.find("Canvas/Main Camera/StaminaBar").getComponent(StaminaSystem);
        if (this.staminaSystem) {
            cc.log('StaminaSystem component found');
        } else {
            cc.error('StaminaSystem component not found');
        }

        this.overlay = cc.find("Canvas/Main Camera/Overlay");
    }

    start() {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim = this.node.getComponent(cc.Animation);

        // 确保一开始播放 idle 动画
        this.playAnimation("player_idle");
    }

    update(dt: number) {
        this.node.x += this.playerSpeed * this.moveDir.x * dt;
        this.node.y += this.playerSpeed * this.moveDir.y * dt;
        if (this.moveDir.x !== 0) {
            this.node.scaleX = (this.moveDir.x >= 0) ? 1 : -1;
        }

        this.LifeBar.progress = this.playerLife / 30;
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                break;
            case cc.macro.KEY.e:
                if (this.experienceSystem) {
                    this.experienceSystem.addExperience(10); // 按下 E 键增加经验值
                }
                break;
            case cc.macro.KEY.g:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && !this.iscircle) {
                    this.experienceSystem.useUpgradePoint();
                    this.spawnNewAttack(); // 按下 G 键消耗升级点数并增加 CircleAttack
                    this.iscircle = true;
                }
                break;
            case cc.macro.KEY.h:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && !this.isring) {
                    this.experienceSystem.useUpgradePoint();
                    this.spawnRingAttack(); // 按下 H 键消耗升级点数并增加 ShotgunAttack
                    this.isring = true;
                    console.log(123);
                }
                break;
            case cc.macro.KEY.v:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && !this.ismoloto) {
                    this.experienceSystem.useUpgradePoint();
                    this.spawnLandmineAttack(); // 按下 H 键消耗升级点数并增加 ShotgunAttack
                    this.ismoloto = true;
                }
                break;

            case cc.macro.KEY.o:
                this.staminaSystem.addStamina();
                console.log("Stamina++");
                break;
        }
        this.updateMoveDir();
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                break;
        }
        this.updateMoveDir();
    }

    private updateMoveDir() {
        this.moveDir.x = 0;
        this.moveDir.y = 0;
        if (this.leftDown) {
            this.moveDir.x -= 1;
            // this.playAnimation("player_left");
            this.playAnimation("player_right");
        }
        if (this.rightDown) {
            this.moveDir.x += 1;
            this.playAnimation("player_right");
        }
        if (this.upDown) {
            this.moveDir.y += 1;
            this.playAnimation("player_up");
        }
        if (this.downDown) {
            this.moveDir.y -= 1;
            this.playAnimation("player_down");
        }
        if (!this.leftDown && !this.rightDown && !this.upDown && !this.downDown) {
            this.playAnimation("player_idle");
        }
        this.moveDir.normalizeSelf();
    }

    playAnimation(animationName: string) {
        if (this.anim && (!this.anim.currentClip || this.anim.currentClip.name !== animationName)) {
            cc.log(`Playing animation: ${animationName}`);
            this.anim.play(animationName);
        }
    }

    private onLevelUp(level: number) {
        cc.log('Player leveled up to level:', level);
    }

    private spawnNewAttack() {
        if (this.newAttackPrefab) {
            const newAttack = cc.instantiate(this.newAttackPrefab);
            // this.node.zIndex = 8
            // newAttack.zIndex = 7
            newAttack.setPosition(0, 0); // 确保位置为相对于玩家节点
            this.node.addChild(newAttack); // 添加到玩家节点，并设置zIndex为-1确保在玩家图像下方
            cc.log('Spawned new CircleAttack');
        }
    }

    private spawnRingAttack() {
        if (this.ringAttackPrefab) {
            const ringAttack = cc.instantiate(this.ringAttackPrefab);
            ringAttack.setPosition(this.node.position); // 确保位置为相对于玩家节点
            this.node.addChild(ringAttack); // 添加到玩家的父节点，以便相对于玩家的位置
            cc.log('Spawned new ringAttack');
        }
    }

    private spawnLandmineAttack() {
        if (this.landmineAttackPrefab) {
            const landmineAttack = cc.instantiate(this.landmineAttackPrefab);
            landmineAttack.setPosition(this.node.position); // 确保位置为相对于玩家节点
            console.log(this.node.parent);
            this.node.addChild(landmineAttack); // 添加到玩家的父节点，以便相对于玩家的位置
            cc.log('Spawned newlandmineAttack');
        }
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (this.playerLife <= 0) {
            this.playAnimation("player_die");
            this.scheduleOnce(() => {
                // cc.audioEngine.stopAll();
                cc.director.loadScene("Menu");
            }, 1.5);
            return;
        }

        if (otherCollider.node.name === "bat" ||
            otherCollider.node.name === "ghast" ||
            otherCollider.node.name === "ice" ||
            otherCollider.node.name === "pumpkin" ||
            otherCollider.node.name === "wind") {

            const damageMonster = otherCollider.node;

            if (!this.contactMonsters.has(damageMonster)) {
                this.contactMonsters.add(damageMonster);

                if (!this.invincible) {
                    this.changeColorTemporarily(selfCollider.node, cc.Color.RED, 0.1);
                    this.playerLife -= 1;
                    cc.log(`Player Life: ${this.playerLife}`);

                    this.invincible = true;
                    this.scheduleOnce(() => {
                        this.invincible = false;
                    }, 0.5);
                }

                // 设置一个计时器，每0.5秒检查一次
                damageMonster['damageInterval'] = this.schedule(() => {
                    if (this.contactMonsters.has(damageMonster) && !this.invincible) {
                        this.changeColorTemporarily(selfCollider.node, cc.Color.RED, 0.1);
                        this.playerLife -= 1;
                        cc.log(`Player Life: ${this.playerLife}`);

                        this.invincible = true;
                        this.scheduleOnce(() => {
                            this.invincible = false;
                        }, 0.5);
                    }
                }, 0.5);
            }
        }
        if (otherCollider.node.name === 'exp') {
            this.experienceSystem.addExperience(10);
            otherCollider.node.destroy();
            console.log("ss");
        }
        if (otherCollider.node.name === 'video_games') {
            // this.experienceSystem.addExperience(10);
            this.playerLife + 20 >= 30 ? this.playerLife = 30 : this.playerLife += 20;
            otherCollider.node.destroy();
            console.log("reveal: ", this.playerLife);
        }
        if (otherCollider.node.name === 'redbull') {
            // this.experienceSystem.addExperience(10);
            this.playerLife + 20 >= 30 ? this.playerLife = 30 : this.playerLife += 20;
            otherCollider.node.destroy();
            console.log("reveal: ", this.playerLife);
        }

        // if (otherCollider.node.name === 'redbull') {
        //     // this.experienceSystem.addExperience(10);
        //     this.playerLife + 20 >= 30 ? this.playerLife = 30 : this.playerLife += 20;
        //     otherCollider.node.destroy();
        //     console.log("reveal: ", this.playerLife);
        // }
    }

    changeColorTemporarily(node: cc.Node, color: cc.Color, duration: number) {
        const originalColor = node.color;
        node.color = color;

        this.scheduleOnce(() => {
            node.color = originalColor;
        }, duration);
    }

    onEndContact(contact, selfCollider, otherCollider) {
        if (this.contactMonsters.has(otherCollider.node)) {
            this.contactMonsters.delete(otherCollider.node);

            // 取消计时器
            this.unschedule(otherCollider.node['damageInterval']);
        }
    }

    applySpeedReduction(apply: boolean) {
        if (apply) {
            this.playerSpeed = 150; // 减速到原来的一半
            console.log("Speed reduced");
        } else {
            this.playerSpeed = 300; // 恢复原速度
            console.log("Speed restored");
        }
    }

    applyVisionRestriction(opacity: number) {
        if (this.overlay) {
            this.overlay.opacity = opacity;
        }
    }

    applyScreenShake(apply: boolean) {
        if (apply) {
            this.schedule(this.shakeScreen, 0.05); // 画面摇晃
        } else {
            this.unschedule(this.shakeScreen); // 停止画面摇晃
        }
    }

    shakeScreen() {
        const shakeAmount = 15;
        const posX = (Math.random() - 0.5) * shakeAmount;
        const posY = (Math.random() - 0.5) * shakeAmount;
        this.node.position = this.node.position.add(cc.v3(posX, posY, 0));
    }
}
