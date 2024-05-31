import Menu from "./Menu";

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
    static AudioID_Start: number;
    private effect_value: number = Menu.EffectVolume * 10;




    protected onLoad(): void {
        //load bgm
        Start.AudioID_Start = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(Start.AudioID_Start, Menu.BGMVolume);
        console.log("StartOnLoad Menu.EffectVolume: ", Menu.EffectVolume);
        // console.log("Menu.BGMVolume: ", Menu.BGMVolume);
        // if (Start.AudioID_Start !== null) {
        //     // 返回值不为null，表示音乐已经成功播放，可以进行后续操作
        //     console.log("AudioID_Start: ", Start.AudioID_Start);
        // } 
    }
    start() {
        // link click
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
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }

        // 播放點擊音效
        cc.audioEngine.play(this.click, false, this.effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Menu");
        }, 0.2);
    }

    signinScene() {
        // Check if SignWin node already exists
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }

        // Load prefab "SignIn"
        cc.audioEngine.play(this.click, false, this.effect_value);
        let prefab = cc.instantiate(this.signIn);
        prefab.name = "SignWin"; // Set node name
        this.node.getParent().addChild(prefab);
        prefab.setScale(0);

        // Create a scale-in animation
        cc.tween(prefab)
            .to(0.2, { scale: 1 }, { easing: 'backOut' })
            .start();
        prefab.setPosition(413.235, 320);
    }

    signUPScene() {
        // Check if SignUp node already exists
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }
        cc.audioEngine.play(this.click, false, this.effect_value);
        // Load prefab "SignUp"
        let prefab = cc.instantiate(this.signUp);
        prefab.name = "SignUp"; // Set node name
        this.node.getParent().addChild(prefab);
        prefab.setScale(0);

        // Create a scale-in animation
        cc.tween(prefab)
            .to(0.2, { scale: 1 }, { easing: 'backOut' })
            .start();
        prefab.setPosition(413.235, 320);
    }

    jumpScene() {
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }

        cc.audioEngine.stopAll();
        cc.game.end();
    }
}
