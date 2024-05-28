// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    //audio
    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    click: cc.AudioClip = null;
    //perfab property
    @property(cc.Prefab)
    signIn: cc.Prefab = null;
    @property(cc.Prefab)
    signUp: cc.Prefab = null;

    private signInPag: cc.Prefab = null;
    private signUpPag: cc.Prefab = null;

    // declare const firebase: any;



    protected onLoad(): void {
        //load bgm
        cc.audioEngine.playMusic(this.bgm, true);
    }
    start() {
        // link click
        cc.audioEngine.playMusic(this.bgm, true);
        let startbtn = new cc.Component.EventHandler();
        let signinBt = new cc.Component.EventHandler();
        let signupBt = new cc.Component.EventHandler();
        let stopGamebtn = new cc.Component.EventHandler();

        startbtn.target = this.node;
        startbtn.component = "Start";
        startbtn.handler = "loadMenu";
        cc.find("Canvas/Guest").getComponent(cc.Button).clickEvents.push(startbtn);

        signinBt.target = this.node;
        signinBt.component = "Start";
        signinBt.handler = "signinScene";
        cc.find("Canvas/SignIn").getComponent(cc.Button).clickEvents.push(signinBt);

        signupBt.target = this.node;
        signupBt.component = "Start";
        signupBt.handler = "signUPScene";
        cc.find("Canvas/SignUp").getComponent(cc.Button).clickEvents.push(signupBt);

        stopGamebtn.target = this.node;
        stopGamebtn.component = "Start";
        stopGamebtn.handler = "jumpScene";
        cc.find("Canvas/ESC_BT").getComponent(cc.Button).clickEvents.push(stopGamebtn);
    }

    loadMenu() {
        // 播放點擊音效
        cc.audioEngine.play(this.click, false, 1);
        cc.audioEngine.stopAll();
        cc.director.loadScene("Menu");
    }

    signinScene() {
        //load perfab "SignIn"
        let prefab = cc.instantiate(this.signIn);
        console.log("this.node.getParent()", this.node.getParent());
        this.node.getParent().addChild(prefab);
        // (-64.986,0)
        prefab.setPosition(413.235, 320);
    }

    signUPScene() {
        let prefab1 = cc.instantiate(this.signUp);
        console.log("this.node.getParent()", this.node.getParent());
        this.node.getParent().addChild(prefab1);
        prefab1.setPosition(413.235, 320);
    }

    jumpScene() {
        cc.audioEngine.stopAll();
        cc.game.end();
    }
}
