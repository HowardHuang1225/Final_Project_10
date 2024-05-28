const { ccclass, property } = cc._decorator;

@ccclass
export default class ExperienceSystem extends cc.Component {
    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.ProgressBar)
    experienceBar: cc.ProgressBar = null;

    @property
    maxExperience: number = 100;

    @property
    currentExperience: number = 0;

    @property
    levelUpExperience: number = 100;

    //目前等級
    private level: number = 1;

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    addExperience(amount: number) {
        this.currentExperience += amount;
        if (this.currentExperience >= this.levelUpExperience) {
            this.levelUp();
        }
        this.updateUI();
    }

    levelUp() {
        this.level++;
        this.currentExperience -= this.levelUpExperience;
        this.levelUpExperience *= 1.2; // 每次升级后需要更多经验
        this.updateUI();
    }

    updateUI() {
        this.levelLabel.string = 'Lv' + this.level;
        this.experienceBar.progress = this.currentExperience / this.levelUpExperience;
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        if (event.keyCode === cc.macro.KEY.e) {
            this.addExperience(10); // 按下 E 键增加经验值
        }
    }
}

