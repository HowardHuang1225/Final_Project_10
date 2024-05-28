const { ccclass, property } = cc._decorator;

@ccclass
export default class Boss1_4 extends cc.Component {

    @property()
    bossspeed: number = 300;

    @property()
    bosslife: number = 10;

    @property()
    bossattack: number = 1;

    private player: cc.Node = null;
    private rigidBody: cc.RigidBody = null;
    private screenSize: cc.Size = null;
    private physicManager: cc.PhysicsManager = null;
    private istouch: boolean = false;

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
        this.node.destroy();
    }

    onBeginContact(contact, self, other) {
        if (other.node.name == "Player") {
            this.istouch = true;
            this.bosslife -= 5;
            console.log(this.bosslife);
        }
    }

    onEndContact(contact, self, other) {
        if (other.node.name == "Player") {
            this.istouch = false;
        }
    }
}
