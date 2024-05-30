const { ccclass, property } = cc._decorator;

@ccclass
export default class Boss1 extends cc.Component {

    @property()
    bossspeed: number = 500;

    @property()
    bosslife: number = 10;

    @property()
    bossattack: number = 1;

    @property(cc.Prefab)
    BossPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    BoombPrefab: cc.Prefab = null;

    private player: cc.Node = null;
    private rigidBody: cc.RigidBody = null;
    private screenSize: cc.Size = null;
    private physicManager: cc.PhysicsManager = null;
    private istouch: boolean = false;
    private anim: cc.Animation = null;

    onLoad() {
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
        this.anim = this.getComponent(cc.Animation);
        this.anim.play("rotate");
    }

    update(dt) {
        if (this.bosslife == 0) {
            this.Split();
        }
        if (!this.istouch && this.player) {
            this.moveToPlayer();
        } else {
            this.rigidBody.linearVelocity = cc.v2(0, 0);
        }
        this.checkBounds();
    }

    moveToPlayer() {
        if (this.player) {
            let direction = this.player.position.sub(this.node.position).normalize();
            let newVelocity = direction.mul(this.bossspeed);
            this.rigidBody.linearVelocity = cc.v2(newVelocity.x, newVelocity.y);
        }
    }

    checkBounds() {
        let pos = this.node.position;
        let velocity = this.rigidBody.linearVelocity;

        let halfWidth = this.screenSize.width / 2;
        let halfHeight = this.screenSize.height / 2;

        if (pos.x > halfWidth || pos.x < -halfWidth) {
            velocity.x = -velocity.x;
            this.rigidBody.linearVelocity = velocity;
        }

        if (pos.y > halfHeight || pos.y < -halfHeight) {
            velocity.y = -velocity.y;
            this.rigidBody.linearVelocity = velocity;
        }
    }

    Split() {
        //console.log(123);
        console.log(this.node.name);
        if(this.node.name != "Boss1_4"){
            let rand = Math.random();
            let pos1x = null;
            let pos1y = null;
            if(rand <0.25){
                pos1x = -480;
                pos1y = -320;
            }
            else if(rand <0.5){
                pos1x = -480;
                pos1y = 320;
            }
            else if(rand <0.75){
                pos1x = 480;
                pos1y = -320;
            }
            else{
                pos1x = 480;
                pos1y = 320;
            }
            let item1 = cc.instantiate(this.BossPrefab);
            item1.setPosition(pos1x, pos1y);
            this.node.parent.addChild(item1);
            let rand2 = Math.random();
            let pos2x = null;
            let pos2y = null;
            if(rand2 <0.25){
                pos1x = -480;
                pos1y = -320;
            }
            else if(rand2 <0.5){
                pos1x = -480;
                pos1y = 320;
            }
            else if(rand2 <0.75){
                pos1x = 480;
                pos1y = -320;
            }
            else{
                pos1x = 480;
                pos1y = 320;
            }

            let item2 = cc.instantiate(this.BossPrefab);
            item2.setPosition(pos2x, pos2y);
            this.node.parent.addChild(item2);
        }
        let item3 = cc.instantiate(this.BoombPrefab);
        item3.setPosition(this.node.x-1, this.node.y-1);
        this.node.parent.addChild(item3);
        this.node.destroy();
    }

    onBeginContact(contact, self, other) {
        if (other.node.name == "Player") {
            this.istouch = true;
            this.bosslife -= 10;
            //console.log(this.bosslife);
        }
    }

    onEndContact(contact, self, other) {
        if (other.node.name == "Player") {
            this.istouch = false;
        }
    }
}
