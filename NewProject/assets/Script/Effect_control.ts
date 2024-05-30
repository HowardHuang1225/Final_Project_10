const { ccclass, property } = cc._decorator;

@ccclass
export default class Effect_control extends cc.Component {
  start() {
    // Get the ESC_BT button and add the click event listener
    const escButton = cc.find("ESC_BT", this.node);
    if (escButton) {
      escButton.on('click', this.onEscButtonClick, this);
    }

    const bgm_bt = cc.find("Bgm_bt", this.node);
    if (bgm_bt) {
      bgm_bt.on('click', this.bgm_btClick, this);
    }

    const effect_bt = cc.find("Effect_bt", this.node);
    if (effect_bt) {
      effect_bt.on('click', this.effect_btClick, this);
    }
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


  bgm_btClick() {
    // Find the bgm handle node
    const bgmHandle = cc.find("Bgm/Handle", this.node);
    if (bgmHandle) {
      // Move the bgm handle to the leftmost position
      bgmHandle.setPosition(cc.v3(-185, bgmHandle.position.y, bgmHandle.position.z));
    }
    // Set the bgm volume to 0
    cc.audioEngine.setVolume(cc.audioEngine.getMusicVolume(), 0);
  }

  effect_btClick() {
    // Find the effect handle node
    const effectHandle = cc.find("Effect_handle", this.node);
    if (effectHandle) {
      // Move the effect handle to the leftmost position
      effectHandle.setPosition(cc.v3(-185, effectHandle.position.y, effectHandle.position.z));
    }
    // Set the effect volume to 0
    cc.audioEngine.setVolume(cc.audioEngine.getEffectsVolume(), 0);
  }
}
