import Menu from "./Menu";

const { ccclass, property } = cc._decorator;
@ccclass export default class Setting extends cc.Component {

  // static first_open = true;
  @property({ type: cc.AudioClip })
  click: cc.AudioClip = null;


  start() {
    // Create instances of Menu and Start classes
    const escButton = cc.find("ESC_BT", this.node);
    if (escButton) {
      escButton.on('click', this.onEscButtonClick, this);
    }
    this.addMouseEvents(escButton);

    const Effect_bt = cc.find("Effect_control/Open", this.node);
    this.addMouseEvents(Effect_bt);
    const Bgm_bt = cc.find("Bgm_control/Open", this.node);
    this.addMouseEvents(Bgm_bt);


    const Bgm_handle = cc.find("Bgm_control/Bgm_bt", this.node);
    this.addMouseEvents(Bgm_handle);
    const Effect_handle = cc.find("Effect_control/Effect_bt", this.node);
    this.addMouseEvents(Effect_handle);


  }
  addMouseEvents(node: cc.Node) {
    node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
    node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
  }

  onMouseEnter(event) {
    const node = event.target;
    const buttonComponent = node.getComponent(cc.Button);
    if (buttonComponent) {
      if (node.name === "ESC_BT") {
        buttonComponent.node.opacity = 250;
        console.log("ESC_BT opacity: ", buttonComponent.node.opacity);
      }
      else {
        buttonComponent.node.opacity = 255;
      }
    }
  }

  onMouseLeave(event) {
    const node = event.target;
    const buttonComponent = node.getComponent(cc.Button);
    if (buttonComponent) {
      if (node.name === "ESC_BT") {
        //let node's picture opacity = 200;
        buttonComponent.node.opacity = 150;
      }
      else {
        buttonComponent.node.opacity = 200;
      }
    }
  }

  onEscButtonClick() {
    // Create a move-up animation
    console.log("Setting ESC Menu.EffectVolume: ", Menu.EffectVolume);
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
    }, 0.5);
  }

  onSliderChange(event: cc.Slider) {

    console.log("Slider value: ", event.progress);
    Menu.BGMVolume = event.progress;
    cc.audioEngine.setMusicVolume(event.progress);
  }

  ononSliderChange2(event: cc.Slider) {
    console.log("Slider value: ", event.progress);
    Menu.EffectVolume = event.progress;
    console.log("Menu.BGMVolume: ", Menu.BGMVolume);
    console.log("Setting Menu.EffectVolume: ", Menu.EffectVolume);
    cc.audioEngine.setEffectsVolume(event.progress);
  }


}
