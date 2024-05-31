import Menu from "./Menu";

const { ccclass, property } = cc._decorator;
@ccclass export default class Setting extends cc.Component {

  // static first_open = true;



  start() {
    // Create instances of Menu and Start classes

    // Get the ESC_BT button and add a click event listener
    console.log("ESC_BT Parent's Parent: ", this.node.getParent().getParent());
    const escButton = cc.find("ESC_BT", this.node);
    if (escButton) {
      escButton.on('click', this.onEscButtonClick, this);
    }
    //set the node "BGM_control/Bgm/Handle" position x to -198 + BGMVolume*(200+198)

    // console.log("this.node: ", this.node);
    // const bgmHandle = cc.find("Bgm_control/Bgm/Handle", this.node);
    // if (bgmHandle) {
    //   let xPos = -198 + Menu.BGMVolume * (200 + 198);
    //   bgmHandle.setPosition(xPos, bgmHandle.position.y);
    //   console.log("bgmHandle.position: ", bgmHandle.position);
    // }

    // const effectHandle = cc.find("Effect_control/Effect/Handle", this.node);
    // if (effectHandle) {
    //   let xPos = -198 + Menu.EffectVolume * (200 + 198);
    //   effectHandle.setPosition(xPos, effectHandle.position.y);
    //   console.log("effectHandle.position: ", effectHandle.position);
    // }

    // Setting.first_open = false;

  }

  onEscButtonClick() {
    // Create a move-up animation
    cc.tween(this.node)
      .to(0.5, { position: cc.v3(this.node.position.x, this.node.position.y + 500, this.node.position.z) }, { easing: 'backIn' })
      .call(() => {
        // Destroy the node after animation
        this.node.destroy();
      })
      .start();
  }

  onSliderChange(event: cc.Slider) {

    console.log("Slider value: ", event.progress);
    Menu.BGMVolume = event.progress;
    cc.audioEngine.setMusicVolume(event.progress);
    cc.audioEngine.setEffectsVolume(event.progress);
    // console.log("Setting node's position: ", this.node.getComponent("BGM_control/Bgm/Handle").position);
    //(-198~200)
  }


}
