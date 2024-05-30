
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PlayerControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBa0QsQ0FBQyxvQ0FBb0M7QUFDakYsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0Msb0NBQVk7SUFBbEQ7UUFBQSxxRUFvSUM7UUFqSUcsaUJBQVcsR0FBVyxHQUFHLENBQUM7UUFHMUIscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFFMUIsYUFBTyxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsbUJBQWEsR0FBc0IsSUFBSSxDQUFDO1FBQ3hDLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBQ2pDLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBQzFCLHNCQUFnQixHQUFxQixJQUFJLENBQUM7O0lBb0h0RCxDQUFDO0lBbEhHLGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJ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cElELEFBb0lDLENBcElxQyxFQUFFLENBQUMsU0FBUyxHQW9JakQ7QUFwSVksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cGVyaWVuY2VTeXN0ZW0gZnJvbSAnLi9FeHBlcmllbmNlU3lzdGVtJzsgLy8gSW1wb3J0IHRoZSBFeHBlcmllbmNlU3lzdGVtIGNsYXNzXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgUGxheWVyQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIHBsYXllclNwZWVkOiBudW1iZXIgPSAzMDA7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG5ld0F0dGFja1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIG1vdmVEaXI6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcclxuICAgIHByaXZhdGUgdXBEb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGRvd25Eb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGxlZnREb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHJpZ2h0RG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwaHlzaWNNYW5hZ2VyOiBjYy5QaHlzaWNzTWFuYWdlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIGlkbGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBhbmltOiBjYy5BbmltYXRpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBleHBlcmllbmNlU3lzdGVtOiBFeHBlcmllbmNlU3lzdGVtID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmdyYXZpdHkgPSBjYy52MigwLCAtMjAwKTtcclxuXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcclxuXHJcbiAgICAgICAgLy8g6I635Y+WIEV4cGVyaWVuY2VTeXN0ZW0g57uE5Lu2XHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlU3lzdGVtID0gY2MuZmluZChcIkNhbnZhcy9FeHBlcmllbmNlQmFyXCIpLmdldENvbXBvbmVudChFeHBlcmllbmNlU3lzdGVtKTtcclxuICAgICAgICBpZiAodGhpcy5leHBlcmllbmNlU3lzdGVtKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnRXhwZXJpZW5jZVN5c3RlbSBjb21wb25lbnQgZm91bmQnKTtcclxuICAgICAgICAgICAgLy8g57uR5a6aIGxldmVsLXVwIOS6i+S7tlxyXG4gICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2VTeXN0ZW0ubm9kZS5vbignbGV2ZWwtdXAnLCB0aGlzLm9uTGV2ZWxVcCwgdGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoJ0V4cGVyaWVuY2VTeXN0ZW0gY29tcG9uZW50IG5vdCBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmlkbGVGcmFtZSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgdGhpcy5hbmltID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpci54ICogZHQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5wbGF5ZXJTcGVlZCAqIHRoaXMubW92ZURpci55ICogZHQ7XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZURpci54ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAodGhpcy5tb3ZlRGlyLnggPj0gMCkgPyAxIDogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5RG93bihldmVudDogY2MuRXZlbnQuRXZlbnRLZXlib2FyZCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vdmVEaXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodERvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb3ZlRGlyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkudzpcclxuICAgICAgICAgICAgICAgIHRoaXMudXBEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZURpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25Eb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZURpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmU6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHBlcmllbmNlU3lzdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlU3lzdGVtLmFkZEV4cGVyaWVuY2UoMTApOyAvLyDmjInkuIsgRSDplK7lop7liqDnu4/pqozlgLxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5udW0xOiAgLy/mjInkuIvmlbjlrZfpjbUx5aKe5YqgQ2lyY2xlQXR0YWNrXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHBlcmllbmNlU3lzdGVtICYmIHRoaXMuZXhwZXJpZW5jZVN5c3RlbS51c2VVcGdyYWRlUG9pbnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2lyY2xlQXR0YWNrKCk7IC8vIOaMieS4iyAxIOmUrua2iOiAl+WNh+e6p+eCueaVsOW5tuWinuWKoCBDaXJjbGVBdHRhY2tcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleVVwKGV2ZW50OiBjYy5FdmVudC5FdmVudEtleWJvYXJkKSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vdmVEaXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodERvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZURpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb3ZlRGlyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuczpcclxuICAgICAgICAgICAgICAgIHRoaXMuZG93bkRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZURpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlTW92ZURpcigpIHtcclxuICAgICAgICB0aGlzLm1vdmVEaXIueCA9IDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlRGlyLnkgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmxlZnREb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZURpci54IC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJpZ2h0RG93bikge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXIueCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy51cERvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyLnkgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZG93bkRvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyLnkgLT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlRGlyLm5vcm1hbGl6ZVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGV2ZWxVcChsZXZlbDogbnVtYmVyKSB7XHJcbiAgICAgICAgY2MubG9nKCdQbGF5ZXIgbGV2ZWxlZCB1cCB0byBsZXZlbDonLCBsZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDaXJjbGVBdHRhY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV3QXR0YWNrUHJlZmFiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0F0dGFjayA9IGNjLmluc3RhbnRpYXRlKHRoaXMubmV3QXR0YWNrUHJlZmFiKTtcclxuICAgICAgICAgICAgbmV3QXR0YWNrLnNldFBvc2l0aW9uKDAsIDApOyAvLyDnoa7kv53kvY3nva7kuLrnm7jlr7nkuo7njqnlrrboioLngrlcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld0F0dGFjaywgLTEpOyAvLyDmt7vliqDliLDnjqnlrrboioLngrnvvIzlubborr7nva56SW5kZXjkuLotMeehruS/neWcqOeOqeWutuWbvuWDj+S4i+aWuVxyXG4gICAgICAgICAgICBjYy5sb2coJ1NwYXduZWQgbmV3IENpcmNsZUF0dGFjaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19