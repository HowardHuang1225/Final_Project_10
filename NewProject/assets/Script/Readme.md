## Start.ts
* start(){
        this.addMouseEvents(cc.find("Canvas/SignIn"));
        this.addMouseEvents(cc.find("Canvas/SignUp"));
        this.addMouseEvents(cc.find("Canvas/Guest"));
        this.addMouseEvents(cc.find("Canvas/ESC_BT"));

        // Add floating effect to Mark and Mark2 nodes
        this.addFloatingEffect(cc.find("Canvas/Mark"));
        this.addFloatingEffect1(cc.find("Canvas/Mark2"));
  }
* addMouseEvents(node: cc.Node) {
        node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
  onMouseEnter(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Guest") {
                buttonComponent.node.opacity = 200;
            } else if (node.name === "ESC_BT") {
                buttonComponent.node.opacity = 250;
                console.log("ESC_BT opacity: ", buttonComponent.node.opacity);
            }
            else {
                buttonComponent.node.opacity = 180;
            }
        }
    }

    onMouseLeave(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Guest") {
                buttonComponent.node.opacity = 150;
            } else if (node.name === "ESC_BT") {
                //let node's picture opacity = 200;
                buttonComponent.node.opacity = 200;
            }
            else {
                buttonComponent.node.opacity = 120;
            }
        }
    }

    addFloatingEffect(node: cc.Node) {
        if (node) {
            cc.tween(node)
                .repeatForever(
                    cc.tween()
                        .by(1, { position: cc.v3(0, 10, 0) }, { easing: 'sineInOut' })
                        .by(1, { position: cc.v3(0, -10, 0) }, { easing: 'sineInOut' })
                )
                .start();
        }
    }
    addFloatingEffect1(node: cc.Node) {
        if (node) {
            cc.tween(node)
                .repeatForever(
                    cc.tween()
                        .by(1.2, { position: cc.v3(0, 8, 0) }, { easing: 'sineInOut' })
                        .by(1.2, { position: cc.v3(0, -8, 0) }, { easing: 'sineInOut' })
                )
                .start();
        }
    }


## Menu.ts
* start(){
  this.addMouseEvents(cc.find("Canvas/Back"));
        this.addMouseEvents(cc.find("Canvas/Setting"));
        this.addMouseEvents(cc.find("Canvas/History"));
        this.addMouseEvents(cc.find("Canvas/Intro"));
        this.addMouseEvents(cc.find("Canvas/Start"));

        this.addFloatingEffect(cc.find("Canvas/Mark"));
  }
* addMouseEvents(node: cc.Node) {
        node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
    onMouseEnter(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Back") {
                buttonComponent.node.opacity = 255;
            } else if (node.name === "Start") {
                //let node's picture opacity = 200;
                buttonComponent.node.opacity = 255;
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
            if (node.name === "Back") {
                buttonComponent.node.opacity = 150;
            } else if (node.name === "Start") {
                buttonComponent.node.opacity = 205;
            }
            else {
                buttonComponent.node.opacity = 205;
            }
        }
    }
    addFloatingEffect(node: cc.Node) {
        if (node) {
            cc.tween(node)
                .repeatForever(
                    cc.tween()
                        .parallel(
                            cc.tween().by(1.2, { position: cc.v3(0, 8, 0) }, { easing: 'sineInOut' }),
                            cc.tween().to(1.2, { scale: 1.03 }, { easing: 'sineInOut' })
                        )
                        .parallel(
                            cc.tween().by(1.2, { position: cc.v3(0, -8, 0) }, { easing: 'sineInOut' }),
                            cc.tween().to(1.2, { scale: 1.0 }, { easing: 'sineInOut' })
                        )
                )
                .start();
        }
    }

## EndScene.ts
* start(){
  this.addMouseEvents(cc.find("Canvas/ESC_BT"));
        this.addMouseEvents(cc.find("Canvas/Skip"));
  }
* addMouseEvents(node: cc.Node) {
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
                buttonComponent.node.opacity = 250;
            }
        }
    }

    onMouseLeave(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "ESC_BT") {
                //let node's picture opacity = 200;
                buttonComponent.node.opacity = 200;
            }
            else {
                buttonComponent.node.opacity = 200;
            }
        }
    }

## GameSetting.ts
* start() {
        this.addMouseEvents(cc.find("Canvas/Cancel"));
        this.addMouseEvents(cc.find("Canvas/Restart"));
        this.addMouseEvents(cc.find("Canvas/Continue"));
    }
* addMouseEvents(node: cc.Node) {
        node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
    onMouseEnter(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            buttonComponent.node.opacity = 250;

        }
    }

    onMouseLeave(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            buttonComponent.node.opacity = 200;

        }
    }

## History.ts
* start(){
  this.addMouseEvents(cc.find("Canvas/Back"));
  }
* addMouseEvents(node: cc.Node) {
        node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
    onMouseEnter(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Back") {
                buttonComponent.node.opacity = 250;
                console.log("ESC_BT opacity: ", buttonComponent.node.opacity);
            }
            else {
                buttonComponent.node.opacity = 180;
            }
        }
    }

    onMouseLeave(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Back") {
                //let node's picture opacity = 200;
                buttonComponent.node.opacity = 150;
            }
            else {
                buttonComponent.node.opacity = 120;
            }
        }
    }

## Intro.ts
* start() {
        this.addMouseEvents(cc.find("Canvas/Back"));
    }
* addMouseEvents(node: cc.Node) {
        node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
    onMouseEnter(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Back") {
                buttonComponent.node.opacity = 250;
                console.log("ESC_BT opacity: ", buttonComponent.node.opacity);
            }
            else {
                buttonComponent.node.opacity = 180;
            }
        }
    }

    onMouseLeave(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Back") {
                //let node's picture opacity = 200;
                buttonComponent.node.opacity = 150;
            }
            else {
                buttonComponent.node.opacity = 120;
            }
        }
    }


## 