
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
        this.spawnNewAttack();
    };
    PlayerController.prototype.spawnNewAttack = function () {
        if (this.newAttackPrefab) {
            var newAttack = cc.instantiate(this.newAttackPrefab);
            newAttack.setPosition(0, 0); // 确保位置为相对于玩家节点
            this.node.addChild(newAttack, -1); // 添加到玩家节点，并设置zIndex为-1确保在玩家图像下方
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBa0QsQ0FBQyxvQ0FBb0M7QUFDakYsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0Msb0NBQVk7SUFBbEQ7UUFBQSxxRUErSEM7UUE1SEcsaUJBQVcsR0FBVyxHQUFHLENBQUM7UUFHMUIscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFFMUIsYUFBTyxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsbUJBQWEsR0FBc0IsSUFBSSxDQUFDO1FBQ3hDLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBQ2pDLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBQzFCLHNCQUFnQixHQUFxQixJQUFJLENBQUM7O0lBK0d0RCxDQUFDO0lBN0dHLGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJ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QUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxvQ0FBUyxHQUFqQixVQUFrQixLQUFhO1FBQzNCLEVBQUUsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyx5Q0FBYyxHQUF0QjtRQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2RCxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0M7U0FDdEU7SUFDTCxDQUFDO0lBM0hEO1FBREMsUUFBUSxFQUFFO3lEQUNlO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkRBQ2M7SUFOekIsZ0JBQWdCO1FBRDVCLE9BQU87T0FDSyxnQkFBZ0IsQ0ErSDVCO0lBQUQsdUJBQUM7Q0EvSEQsQUErSEMsQ0EvSHFDLEVBQUUsQ0FBQyxTQUFTLEdBK0hqRDtBQS9IWSw0Q0FBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhwZXJpZW5jZVN5c3RlbSBmcm9tICcuL0V4cGVyaWVuY2VTeXN0ZW0nOyAvLyBJbXBvcnQgdGhlIEV4cGVyaWVuY2VTeXN0ZW0gY2xhc3NcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXJDb250cm9sbGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcGxheWVyU3BlZWQ6IG51bWJlciA9IDMwMDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbmV3QXR0YWNrUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgbW92ZURpcjogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xyXG4gICAgcHJpdmF0ZSB1cERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZG93bkRvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgbGVmdERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcmlnaHREb3duOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHBoeXNpY01hbmFnZXI6IGNjLlBoeXNpY3NNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgaWRsZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGFuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGV4cGVyaWVuY2VTeXN0ZW06IEV4cGVyaWVuY2VTeXN0ZW0gPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBoeXNpY01hbmFnZXIuZ3Jhdml0eSA9IGNjLnYyKDAsIC0yMDApO1xyXG5cclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyDojrflj5YgRXhwZXJpZW5jZVN5c3RlbSDnu4Tku7ZcclxuICAgICAgICB0aGlzLmV4cGVyaWVuY2VTeXN0ZW0gPSBjYy5maW5kKFwiQ2FudmFzL0V4cGVyaWVuY2VCYXJcIikuZ2V0Q29tcG9uZW50KEV4cGVyaWVuY2VTeXN0ZW0pO1xyXG4gICAgICAgIGlmICh0aGlzLmV4cGVyaWVuY2VTeXN0ZW0pIHtcclxuICAgICAgICAgICAgY2MubG9nKCdFeHBlcmllbmNlU3lzdGVtIGNvbXBvbmVudCBmb3VuZCcpO1xyXG4gICAgICAgICAgICAvLyDnu5HlrpogbGV2ZWwtdXAg5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZVN5c3RlbS5ub2RlLm9uKCdsZXZlbC11cCcsIHRoaXMub25MZXZlbFVwLCB0aGlzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5lcnJvcignRXhwZXJpZW5jZVN5c3RlbSBjb21wb25lbnQgbm90IGZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuaWRsZUZyYW1lID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcclxuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyLnggKiBkdDtcclxuICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyLnkgKiBkdDtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlRGlyLnggIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9ICh0aGlzLm1vdmVEaXIueCA+PSAwKSA/IDEgOiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlEb3duKGV2ZW50OiBjYy5FdmVudC5FdmVudEtleWJvYXJkKSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZURpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vdmVEaXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS53OlxyXG4gICAgICAgICAgICAgICAgdGhpcy51cERvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb3ZlRGlyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuczpcclxuICAgICAgICAgICAgICAgIHRoaXMuZG93bkRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb3ZlRGlyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4cGVyaWVuY2VTeXN0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2VTeXN0ZW0uYWRkRXhwZXJpZW5jZSgxMCk7IC8vIOaMieS4iyBFIOmUruWinuWKoOe7j+mqjOWAvFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5VXAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50S2V5Ym9hcmQpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuYTpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdERvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW92ZURpcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb3ZlRGlyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkudzpcclxuICAgICAgICAgICAgICAgIHRoaXMudXBEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vdmVEaXIoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5zOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb3ZlRGlyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVNb3ZlRGlyKCkge1xyXG4gICAgICAgIHRoaXMubW92ZURpci54ID0gMDtcclxuICAgICAgICB0aGlzLm1vdmVEaXIueSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMubGVmdERvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyLnggLT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmlnaHREb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZURpci54ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVwRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXIueSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kb3duRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVEaXIueSAtPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVEaXIubm9ybWFsaXplU2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25MZXZlbFVwKGxldmVsOiBudW1iZXIpIHtcclxuICAgICAgICBjYy5sb2coJ1BsYXllciBsZXZlbGVkIHVwIHRvIGxldmVsOicsIGxldmVsKTtcclxuICAgICAgICB0aGlzLnNwYXduTmV3QXR0YWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzcGF3bk5ld0F0dGFjaygpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXdBdHRhY2tQcmVmYWIpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3QXR0YWNrID0gY2MuaW5zdGFudGlhdGUodGhpcy5uZXdBdHRhY2tQcmVmYWIpO1xyXG4gICAgICAgICAgICBuZXdBdHRhY2suc2V0UG9zaXRpb24oMCwgMCk7IC8vIOehruS/neS9jee9ruS4uuebuOWvueS6jueOqeWutuiKgueCuVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3QXR0YWNrLCAtMSk7IC8vIOa3u+WKoOWIsOeOqeWutuiKgueCue+8jOW5tuiuvue9rnpJbmRleOS4ui0x56Gu5L+d5Zyo546p5a625Zu+5YOP5LiL5pa5XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=