import Setting from "./Setting";
import Start from "./Start";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    lock: cc.AudioClip = null;

    @property(cc.Prefab)
    setting: cc.Prefab = null;


    static AudioID_Menu: number;

    static BGMVolume: number = 0.5;
    static EffectVolume: number = 0.5;


    onLoad() {
        if (this.node.getComponent(Setting) == null) {  //判斷是 setting 頁面還是 menu 頁面
            Menu.AudioID_Menu = cc.audioEngine.playMusic(this.bgm, true);
            cc.audioEngine.setVolume(Menu.AudioID_Menu, Menu.BGMVolume);
            if (Menu.AudioID_Menu !== null) {
                console.log("AudioID_Menu: ", Menu.AudioID_Menu);
            } else {
                console.log("Failed to play music.");
            }
        }
        this.addButtonClickListener();
    }

    addButtonClickListener() {
        // find the button and add a click event listener
        console.log("addButtonClickListener");
        console.log("this.nodein addButtonClickListener in menu start", this.node);
        const back = cc.find("Canvas/Back").getComponent(cc.Button);
        const setting = cc.find("Canvas/Setting").getComponent(cc.Button);
        const history = cc.find("Canvas/History").getComponent(cc.Button);
        const target = cc.find("Canvas/Target").getComponent(cc.Button);
        const store = cc.find("Canvas/Store").getComponent(cc.Button);
        if (this.node.getParent().getChildByName("setting")) {
            console.log("this.node.getParent()", this.node);
            // let existingSettingNode = this.node.getParent();
            const stopMusic = cc.find("setting/Bgm_control/Bgm_bt").getComponent(cc.Button);
            const stopMusicHandler = new cc.Component.EventHandler();
            stopMusicHandler.target = this.node;
            stopMusicHandler.component = "Menu";
            // stopMusicHandler.handler = "ControlBgm";
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
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Start");
        }, 0.2);

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
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        // Load the Setting prefab
        let prefab = cc.instantiate(this.setting);
        prefab.name = "setting";
        this.node.getParent().addChild(prefab);
        // console.log("Prefab parent: ", prefab.getParent());

        // Set initial position above the screen
        prefab.setPosition(471.015, cc.winSize.height);

        // Set the slider positions for BGM and Effect volumes
        const bgmHandle = cc.find("Bgm_control/Bgm/Handle", prefab);
        if (bgmHandle) {
            let xPos = -198 + Menu.BGMVolume * (200 + 198);
            bgmHandle.setPosition(xPos, bgmHandle.position.y);
        }

        const effectHandle = cc.find("Effect_control/Effect/Handle", prefab);
        if (effectHandle) {
            let xPos = -198 + Menu.EffectVolume * (200 + 198);
            effectHandle.setPosition(xPos, effectHandle.position.y);
        }

        // Create a move-in animation
        cc.tween(prefab)
            .to(0.5, { position: cc.v3(471.015, 320, 0) }, { easing: 'sineOut' })
            .call(() => {
                // Animation completed
                cc.log("Setting window animation completed!");
            })
            .start();
    }

    HistoryWindow() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("History");
        }, 0.2);
    }

    TargetWindow() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Target");
        }, 0.2);
    }


    ControlBgm() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        cc.audioEngine.setVolume(Menu.AudioID_Menu, 0);
        Menu.BGMVolume = 0;

        const settingNode = this.node.getParent().getChildByName("setting");
        if (!settingNode) {
            cc.error("Setting window does not exist!");
            return;
        }
        const bgmHandle = settingNode.getChildByName("Bgm_control").getChildByName("Bgm").getChildByName("Handle");
        if (bgmHandle) {
            let xPos = -198 + Menu.BGMVolume * (200 + 198);
            bgmHandle.setPosition(xPos, bgmHandle.position.y);
        }
    }
    ControlBgm1() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        cc.audioEngine.setVolume(Menu.AudioID_Menu, 1);
        Menu.BGMVolume = 1;

        const settingNode = this.node.getParent().getChildByName("setting");

        // 检查节点是否存在
        if (!settingNode) {
            cc.error("Setting window does not exist!");
            return;
        }
        const bgmHandle = settingNode.getChildByName("Bgm_control").getChildByName("Bgm").getChildByName("Handle");

        if (bgmHandle) {
            let xPos = -198 + Menu.BGMVolume * (200 + 198);
            bgmHandle.setPosition(xPos, bgmHandle.position.y);
        }

    }

    ControlEffect() {
        cc.audioEngine.setVolume(Menu.EffectVolume, 0);
        Menu.EffectVolume = 0;
        // console.log("ControlBgm mute plzzzzz");
        console.log("ControlInit Menu.EffectVolume: ", Menu.EffectVolume);
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        const settingNode = this.node.getParent().getChildByName("setting");
        if (!settingNode) {
            cc.error("Setting window does not exist!");
            return;
        }

        const effectHandle = settingNode.getChildByName("Effect_control").getChildByName("Effect").getChildByName("Handle");
        if (effectHandle) {

            let xPos = -198 + Menu.EffectVolume * (200 + 198);
            effectHandle.setPosition(xPos, effectHandle.position.y);
        }
    }

    ControlEffect1() {
        cc.audioEngine.setVolume(Menu.EffectVolume, 1);
        Menu.EffectVolume = 1;
        console.log("ControlInit 1 Menu.EffectVolume: ", Menu.EffectVolume);
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);

        const settingNode = this.node.getParent().getChildByName("setting");
        if (!settingNode) {
            cc.error("Setting window does not exist!");
            return;
        }
        const effectHandle = settingNode.getChildByName("Effect_control").getChildByName("Effect").getChildByName("Handle");
        if (effectHandle) {
            let xPos = -198 + Menu.EffectVolume * (200 + 198);
            effectHandle.setPosition(xPos, effectHandle.position.y);
        }
    }

    LoadGame() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Stage1");
        }, 0.2);
    }

}
