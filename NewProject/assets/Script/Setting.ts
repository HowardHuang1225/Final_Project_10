
const { ccclass, property } = cc._decorator;

@ccclass export default class Setting extends cc.Component {


  start() {
    // Create instances of Menu and Start classes

    // Get the ESC_BT button and add a click event listener
    console.log("ESC_BT Parent's Parent: ", this.node.getParent().getParent());
    const escButton = cc.find("ESC_BT", this.node);
    if (escButton) {
      escButton.on('click', this.onEscButtonClick, this);
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

}
