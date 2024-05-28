const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    lock: cc.AudioClip = null;

    start() {
        cc.audioEngine.playMusic(this.bgm, true);
        this.addButtonClickListener();
    }

    addButtonClickListener() {
        // find the button and add a click event listener
        const backButton = cc.find("Canvas/Back").getComponent(cc.Button);

        // add button click event listeners
        const backHandler = new cc.Component.EventHandler();
        backHandler.target = this.node;
        backHandler.component = "Menu";
        backHandler.handler = "BackStart";
        backButton.clickEvents.push(backHandler);

    }

    BackStart() {
        cc.audioEngine.stopAll();
        cc.director.loadScene("Start");
    }

    playLockAudio() {
        cc.audioEngine.play(this.lock, false, 10);
    }
}
