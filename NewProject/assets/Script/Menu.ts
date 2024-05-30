const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    lock: cc.AudioClip = null;

    @property(cc.Prefab)
    setting: cc.Prefab = null;


    public AudioID_Menu = 3;


    start() {
        this.AudioID_Menu = cc.audioEngine.playMusic(this.bgm, true);
        if (this.AudioID_Menu !== null) {
            // 返回值不为null，表示音乐已经成功播放，可以进行后续操作
            console.log("AudioID_Menu: ", this.AudioID_Menu);
        } else {
            // 返回值为null，可能是因为音乐文件加载失败或其他原因导致播放失败
            console.log("Failed to play music.");
        }
        this.addButtonClickListener();
    }

    addButtonClickListener() {
        // find the button and add a click event listener
        console.log("addButtonClickListener");
        const back = cc.find("Canvas/Back").getComponent(cc.Button);
        const setting = cc.find("Canvas/Setting").getComponent(cc.Button);
        const history = cc.find("Canvas/History").getComponent(cc.Button);
        const target = cc.find("Canvas/Target").getComponent(cc.Button);
        const store = cc.find("Canvas/Store").getComponent(cc.Button);
        if (this.node.getParent().getChildByName("setting")) {
            console.log("this.node.getParent()", this.node.getParent());
            let existingSettingNode = this.node.getParent();
            const stopMusic = cc.find("existingSettingNode/Setting/Bgm_control/Bgm_bt").getComponent(cc.Button);
            const stopMusicHandler = new cc.Component.EventHandler();
            stopMusicHandler.target = this.node;
            stopMusicHandler.component = "Menu";
            stopMusicHandler.handler = "ControlBgm";
            stopMusic.clickEvents.push(stopMusicHandler);
        }





        // add button click event listeners
        const backHandler = new cc.Component.EventHandler();
        backHandler.target = this.node;
        backHandler.component = "Menu";
        backHandler.handler = "BackStart";
        back.clickEvents.push(backHandler);

        const settingHandler = new cc.Component.EventHandler();
        settingHandler.target = this.node;
        settingHandler.component = "Menu";
        settingHandler.handler = "SettingWindow";
        setting.clickEvents.push(settingHandler);

        const historyHandler = new cc.Component.EventHandler();
        historyHandler.target = this.node;
        historyHandler.component = "Menu";
        historyHandler.handler = "HistoryWindow";
        history.clickEvents.push(historyHandler);

        const targetHandler = new cc.Component.EventHandler();
        targetHandler.target = this.node;
        targetHandler.component = "Menu";
        targetHandler.handler = "TargetWindow";
        target.clickEvents.push(targetHandler);

        const storeHandler = new cc.Component.EventHandler();
        storeHandler.target = this.node;
        storeHandler.component = "Menu";
        storeHandler.handler = "StoreWindow";
        store.clickEvents.push(storeHandler);



    }

    BackStart() {
        const existingSettingNode = this.node.getParent().getChildByName("setting");

        if (existingSettingNode) {
            cc.log("Setting window is already open!");
            return;
        }
        cc.audioEngine.stopAll();
        cc.director.loadScene("Start");
    }

    SettingWindow() {

        //this.node.getParent()
        console.log("this.node.getParent(): ", this.node.getParent());
        const existingSettingNode = this.node.getParent().getChildByName("setting");

        if (existingSettingNode) {
            cc.log("Setting window is already open!");
            return;
        }
        console.log("Setting window is not open, creating one...");
        // Load the Setting prefab
        let prefab = cc.instantiate(this.setting);
        prefab.name = "setting";
        this.node.getParent().addChild(prefab);
        console.log("Prefab parent: ", prefab.getParent());

        // Set initial position above the screen
        prefab.setPosition(471.015, cc.winSize.height);

        // Create a move-in animation
        cc.tween(prefab)
            .to(0.5, { position: cc.v3(471.015, 320, 0) }, { easing: 'sineOut' })
            .call(() => {
                // Animation completed
                cc.log("Setting window animation completed!");
            })
            .start();
    }

    HistoryWindow() { }

    TargetWindow() { }

    StoreWindow() { }

    ControlBgm() {
        //set the background music value to zero
        cc.sys.localStorage.setItem("Menu.AudioID_Menu", "0");
    }

    playLockAudio() {
        cc.audioEngine.play(this.lock, false, 10);
    }
}
