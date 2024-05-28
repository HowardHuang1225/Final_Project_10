
//初始武器
const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    @property
    speed: number = 500;

    update(deltaTime: number) {
        this.node.y += this.speed * deltaTime;

        // bullet out of screen 銷毀子彈
        if (this.node.y > cc.winSize.height) {
            this.node.destroy();
        }
    }
}