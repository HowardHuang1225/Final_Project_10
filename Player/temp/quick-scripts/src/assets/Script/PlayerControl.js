"use strict";
cc._RF.push(module, '5d981jMaVVApqXAftUPjpBM', 'PlayerControl');
// Script/PlayerControl.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
var ExperienceSystem_1 = require("./ExperienceSystem"); // Import the ExperienceSystem class
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayerController = /** @class */ (function (_super) {
    __extends(PlayerController, _super);
    function PlayerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerSpeed = 300;
        _this.newAttackPrefab = null;
        _this.moveDir = cc.v2(0, 0);
        _this.upDown = false;
        _this.downDown = false;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.physicManager = null;
        _this.idleFrame = null;
        _this.anim = null;
        _this.experienceSystem = null;
        return _this;
    }
    PlayerController.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, -200);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // 获取 ExperienceSystem 组件
        this.experienceSystem = cc.find("Canvas/ExperienceBar").getComponent(ExperienceSystem_1.default);
        if (this.experienceSystem) {
            cc.log('ExperienceSystem component found');
            // 绑定 level-up 事件
            this.experienceSystem.node.on('level-up', this.onLevelUp, this);
        }
        else {
            cc.error('ExperienceSystem component not found');
        }
    };
    PlayerController.prototype.start = function () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim = this.node.getComponent(cc.Animation);
    };
    PlayerController.prototype.update = function (dt) {
        this.node.x += this.playerSpeed * this.moveDir.x * dt;
        this.node.y += this.playerSpeed * this.moveDir.y * dt;
        if (this.moveDir.x !== 0) {
            this.node.scaleX = (this.moveDir.x >= 0) ? 1 : -1;
        }
    };
    PlayerController.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.updateMoveDir();
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.updateMoveDir();
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                this.updateMoveDir();
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                this.updateMoveDir();
                break;
            case cc.macro.KEY.e:
                if (this.experienceSystem) {
                    this.experienceSystem.addExperience(10); // 按下 E 键增加经验值
                }
                break;
            case cc.macro.KEY.num1: //按下數字鍵1增加CircleAttack
                if (this.experienceSystem && this.experienceSystem.useUpgradePoint()) {
                    this.CircleAttack(); // 按下 1 键消耗升级点数并增加 CircleAttack
                }
                break;
        }
    };
    PlayerController.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                this.updateMoveDir();
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                this.updateMoveDir();
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                this.updateMoveDir();
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                this.updateMoveDir();
                break;
        }
    };
    PlayerController.prototype.updateMoveDir = function () {
        this.moveDir.x = 0;
        this.moveDir.y = 0;
        if (this.leftDown) {
            this.moveDir.x -= 1;
        }
        if (this.rightDown) {
            this.moveDir.x += 1;
        }
        if (this.upDown) {
            this.moveDir.y += 1;
        }
        if (this.downDown) {
            this.moveDir.y -= 1;
        }
        this.moveDir.normalizeSelf();
    };
    PlayerController.prototype.onLevelUp = function (level) {
        cc.log('Player leveled up to level:', level);
    };
    PlayerController.prototype.CircleAttack = function () {
        if (this.newAttackPrefab) {
            var newAttack = cc.instantiate(this.newAttackPrefab);
            newAttack.setPosition(0, 0); // 确保位置为相对于玩家节点
            this.node.addChild(newAttack, -1); // 添加到玩家节点，并设置zIndex为-1确保在玩家图像下方
            cc.log('Spawned new CircleAttack');
        }
    };
    __decorate([
        property()
    ], PlayerController.prototype, "playerSpeed", void 0);
    __decorate([
        property(cc.Prefab)
    ], PlayerController.prototype, "newAttackPrefab", void 0);
    PlayerController = __decorate([
        ccclass
    ], PlayerController);
    return PlayerController;
}(cc.Component));
exports.PlayerController = PlayerController;

cc._RF.pop();