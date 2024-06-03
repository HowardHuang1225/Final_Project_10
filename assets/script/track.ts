const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property()
    pawnspeed: number = 300;

    @property()
    pawnlife: number = 5;

    @property(cc.Prefab)
    BulletPrefab: cc.Prefab = null;

    private physicManager: cc.PhysicsManager = null;
    private rigidBody: cc.RigidBody = null;
    private player: cc.Node = null;
    private screenSize: cc.Size = null;
    private trackTimer: number = 0;
    private trackDuration: number = 5; // in seconds

    onLoad () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.rigidBody = this.getComponent(cc.RigidBody);
        if (!this.rigidBody) {
            console.error("RigidBody component not found");
            return;
        }

        this.screenSize = cc.view.getVisibleSize();

        this.player = cc.find("Canvas/player");
        if (!this.player) {
            console.error("Player node not found");
        }
    }

    start () {
        this.trackTimer = 0;
        this.schedule(this.bulletcreate, 1);
    }

    update (dt) {
        console.log(this.trackTimer);
        if(this.player) {
            this.trackTimer += dt;
            if (this.trackTimer <= this.trackDuration) {
                this.track();
            } else {
                this.rigidBody.type = cc.RigidBodyType.Static;
                this.rigidBody.linearVelocity = cc.v2(0, 0); // Stop the character after 5 seconds
            }
        }
    }
    
    track(){
        if (this.player) {
            let direction = this.player.position.sub(this.node.position).normalize(); //this pos + dir = play pos
            if(Math.abs(this.player.position.sub(this.node.position).len()-250) <= 10){
                this.rigidBody.linearVelocity = cc.v2(0, 0);
                return;
            }
            let offset = direction.mul(250); // 250 units away from the player
            let targetPosition = this.player.position.sub(offset); // Calculate the target position
    
            let directionToTarget = targetPosition.sub(this.node.position).normalize();
            let newVelocity = directionToTarget.mul(this.pawnspeed);
            this.rigidBody.linearVelocity = cc.v2(newVelocity.x, newVelocity.y);
        }
    }

    bulletcreate(){
        if(this.player){
            let bullet = cc.instantiate(this.BulletPrefab);
            bullet.setPosition(this.node.x, this.node.y);
            cc.find("Canvas").addChild(bullet);
        }
    }
}
