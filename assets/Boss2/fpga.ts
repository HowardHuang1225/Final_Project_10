const { ccclass, property } = cc._decorator;

@ccclass
export default class Boss2 extends cc.Component {

    @property()
    bosslife: number = 40;

    // @property()
    // bossattack: number = 1;

    // @property(cc.Prefab)
    // BossPrefab: cc.Prefab = null;

    // @property(cc.Prefab)
    // BoombPrefab: cc.Prefab = null;

    @property(cc.ProgressBar)
    LifeBar: cc.ProgressBar = null;

    private player: cc.Node = null;
    private rigidBody: cc.RigidBody = null;
    private screenSize: cc.Size = null;
    private physicManager: cc.PhysicsManager = null;
    private istouch: boolean = false;
    // private anim: cc.Animation = null;
    private invincible: boolean = false;

    onLoad() {
        this.bosslife = 100;
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.rigidBody = this.getComponent(cc.RigidBody);
        if (!this.rigidBody) {
            console.error("RigidBody component not found");
            return;
        }

        this.screenSize = cc.view.getVisibleSize();

        // 动态查找玩家节点
        this.player = cc.find("Canvas/Player");
        if (!this.player) {
            console.error("Player node not found");
        }
    }

    start() {
        // this.anim = this.getComponent(cc.Animation);
        // this.anim.play("rotate");
    }

    update(dt) {
        if (this.bosslife <= 0) {
            cc.director.loadScene("Menu");
        }
        // if (!this.istouch && this.player) {
        //     this.moveToPlayer();
        // } else {
        //     this.rigidBody.linearVelocity = cc.v2(0, 0);
        // }
        
        this.LifeBar.progress = this.bosslife/100;
    }

    // moveToPlayer() {
    //     if (this.player) {
    //         let direction = this.player.position.sub(this.node.position).normalize();
    //         let newVelocity = direction.mul(this.bossspeed);
    //         this.rigidBody.linearVelocity = cc.v2(newVelocity.x, newVelocity.y);
    //     }
    // }

    // Split() {
    //     const camera = cc.find("Canvas/Main Camera");
    //     //console.log(123);
    //     console.log(this.node.name);
    //     if(this.node.name != "Boss1_4"){
    //         let rand = Math.random();
    //         let pos1x = null;
    //         let pos1y = null;
    //         if(rand <0.25){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y-320;
    //         }
    //         else if(rand <0.5){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y+320;
    //         }
    //         else if(rand <0.75){
    //             pos1x = camera.x+480;
    //             pos1y = camera.y-320;
    //         }
    //         else{
    //             pos1x = camera.x+480;
    //             pos1y = camera.y+320;
    //         }
    //         let item1 = cc.instantiate(this.BossPrefab);
    //         item1.setPosition(this.node.x-20, this.node.y);
    //         this.node.parent.addChild(item1);
    //         let rand2 = Math.random();
    //         let pos2x = null;
    //         let pos2y = null;
    //         if(rand2 <0.25){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y-320;
    //         }
    //         else if(rand2 <0.5){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y+320;
    //         }
    //         else if(rand2 <0.75){
    //             pos1x = camera.x+480;
    //             pos1y = camera.y-320;
    //         }
    //         else{
    //             pos1x = camera.x+480;
    //             pos1y = camera.y+320;
    //         }

    //         let item2 = cc.instantiate(this.BossPrefab);
    //         item2.setPosition(this.node.x+20, this.node.y);
    //         this.node.parent.addChild(item2);
    //     }
    //     let item3 = cc.instantiate(this.BoombPrefab);
    //     item3.setPosition(this.node.x-1, this.node.y-1);
    //     this.node.parent.addChild(item3);
    //     this.node.destroy();
    // }

    changeColorTemporarily(node: cc.Node, color: cc.Color, duration: number) {
        const originalColor = node.color;
        node.color = color;

        this.scheduleOnce(() => {
            node.color = originalColor;
        }, duration);
    }

    onBeginContact(contact, self, other) {
        // if (other.node.name == "Player") {
        //     this.istouch = true;
        //     this.bosslife -= 5;
        //     //console.log(this.bosslife);
        // }
        const damageMonster = other.node;
        if(other.node.name === 'Bullet' || other.node.name === 'Bullet_ring' || other.node.name === 'Boomb' || other.node.name === 'CircleAttack' || other.node.name === 'BouncingBall'){
            if (!this.invincible) {
                console.log("hit fpga")
                this.changeColorTemporarily(self.node, cc.Color.RED, 0.1);
                this.bosslife -= 1;
                this.invincible = true;
                    this.scheduleOnce(() => {
                        this.invincible = false;
                    }, 0.5);
            }
        }
        // damageMonster['damageInterval'] = this.schedule(() => {
        //     if (this.contactMonsters.has(damageMonster) && !this.invincible) {
        //         this.changeColorTemporarily(self.node, cc.Color.RED, 0.1);
        //         this.bosslife -= 1;
                

        //         this.invincible = true;
        //         this.scheduleOnce(() => {
        //             this.invincible = false;
        //         }, 0.5);
        //     }
        // }, 0.5);
    }

    // onEndContact(contact, self, other) {
    //     if (other.node.name == "Player") {
    //         this.istouch = false;
    //     }
    // }
}
