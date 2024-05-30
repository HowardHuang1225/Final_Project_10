const { ccclass, property } = cc._decorator;

@ccclass
export default class Effect_control extends cc.Component {

  @property(cc.Prefab)
  effect_control: cc.Prefab = null;

  start() {
    // Get the ESC_BT button and add the click event listener
    const bgm_bt = cc.find("Bgm_bt", this.node);
    if (bgm_bt) {
      bgm_bt.on('click', this.bgm_btClick, this);
    }

    const slider = cc.find("Bgm_slider", this.node);
    if (slider) {
      slider.on('click', this.sliderClick, this);
    }

  }
  bgm_btClick() {
    // Create a move-up animation

  }


  sliderClick() {
    // Find the bgm handle node

  }

  effect_btClick() {

  }
}
