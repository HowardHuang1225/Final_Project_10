// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Menu from "./Menu";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSetting extends cc.Component {

    @property({ type: cc.AudioClip })
    click: cc.AudioClip = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start() {

    }


    CancalGame() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Menu");
        }, 0.2);

    }
    RestartGame() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Stage1");
        }, 0.2);
    }
    ContinueGame() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);
        this.scheduleOnce(() => {
            cc.tween(this.node)
                .to(0.5, { position: cc.v3(this.node.position.x, this.node.position.y + 500, this.node.position.z) }, { easing: 'backIn' })
                .call(() => {
                    // Destroy the node after animation
                    this.node.destroy();
                })
                .start();
        }, 0.2);

    }


    // update (dt) {}

    // update (dt) {}
}
