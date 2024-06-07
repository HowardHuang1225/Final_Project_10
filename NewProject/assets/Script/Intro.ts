// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Menu from "./Menu";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Intro extends cc.Component {

    @property({ type: cc.AudioClip })
    lock: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:
    static AudioID_Start: number;

    // onLoad () {}
    protected onLoad(): void {
        //load bgm
        Intro.AudioID_Start = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(Intro.AudioID_Start, Menu.BGMVolume);
        console.log("StartOnLoad Menu.EffectVolume: ", Menu.EffectVolume);
    }

    start() {
        this.addMouseEvents(cc.find("Canvas/Back"));
    }

    addMouseEvents(node: cc.Node) {
        node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }

    BackMenu() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Menu");
        }, 0.5);

    }

    onMouseEnter(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Back") {
                buttonComponent.node.opacity = 250;
                console.log("ESC_BT opacity: ", buttonComponent.node.opacity);
            }
            else {
                buttonComponent.node.opacity = 180;
            }
        }
    }

    onMouseLeave(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Back") {
                //let node's picture opacity = 200;
                buttonComponent.node.opacity = 150;
            }
            else {
                buttonComponent.node.opacity = 120;
            }
        }
    }
}
