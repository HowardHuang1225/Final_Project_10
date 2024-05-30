
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ExperienceSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '322875RjKBKLZjTi7FJgL57', 'ExperienceSystem');
// Script/ExperienceSystem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExperienceSystem = /** @class */ (function (_super) {
    __extends(ExperienceSystem, _super);
    function ExperienceSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.experienceBar = null;
        _this.upgradePointsLabel = null; // 新增升级点数的 Label
        _this.maxExperience = 100;
        _this.currentExperience = 0;
        _this.levelUpExperience = 100;
        _this.upgradePoints = 0; // 升级点数
        _this.level = 1;
        return _this;
    }
    ExperienceSystem.prototype.onLoad = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.updateUI(); // 游戏开始时更新 UI
    };
    ExperienceSystem.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    ExperienceSystem.prototype.addExperience = function (amount) {
        this.currentExperience += amount;
        cc.log("Experience added: " + amount + ", currentExperience: " + this.currentExperience);
        if (this.currentExperience >= this.levelUpExperience) {
            this.levelUp();
        }
        this.updateUI();
    };
    //經驗值滿了升級
    ExperienceSystem.prototype.levelUp = function () {
        this.level++;
        this.currentExperience -= this.levelUpExperience;
        this.levelUpExperience *= 1.2; // 每次升级后需要更多经验
        this.upgradePoints++; // 增加一个升级点数
        // 触发 level-up 事件
        cc.log("Level up! New level: " + this.level);
        this.node.emit('level-up', this.level);
        this.updateUI();
    };
    //更新技能點數
    ExperienceSystem.prototype.updateUI = function () {
        this.levelLabel.string = 'Lv' + this.level;
        this.experienceBar.progress = this.currentExperience / this.levelUpExperience;
        this.upgradePointsLabel.string = '剩餘點數: ' + this.upgradePoints; // 更新升级点数
    };
    ExperienceSystem.prototype.onKeyDown = function (event) {
        if (event.keyCode === cc.macro.KEY.e) {
            this.addExperience(10); // 按下 E 键增加经验值
        }
    };
    ExperienceSystem.prototype.useUpgradePoint = function () {
        if (this.upgradePoints > 0) {
            this.upgradePoints--;
            this.updateUI(); // 使用升级点数后更新 UI
            return true;
        }
        return false;
    };
    __decorate([
        property(cc.Label)
    ], ExperienceSystem.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], ExperienceSystem.prototype, "experienceBar", void 0);
    __decorate([
        property(cc.Label)
    ], ExperienceSystem.prototype, "upgradePointsLabel", void 0);
    __decorate([
        property
    ], ExperienceSystem.prototype, "maxExperience", void 0);
    __decorate([
        property
    ], ExperienceSystem.prototype, "currentExperience", void 0);
    __decorate([
        property
    ], ExperienceSystem.prototype, "levelUpExperience", void 0);
    __decorate([
        property
    ], ExperienceSystem.prototype, "upgradePoints", void 0);
    ExperienceSystem = __decorate([
        ccclass
    ], ExperienceSystem);
    return ExperienceSystem;
}(cc.Component));
exports.default = ExperienceSystem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxFeHBlcmllbmNlU3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBNEVDO1FBMUVHLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLG1CQUFhLEdBQW1CLElBQUksQ0FBQztRQUdyQyx3QkFBa0IsR0FBYSxJQUFJLENBQUMsQ0FBQyxnQkFBZ0I7UUFHckQsbUJBQWEsR0FBVyxHQUFHLENBQUM7UUFHNUIsdUJBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBRzlCLHVCQUFpQixHQUFXLEdBQUcsQ0FBQztRQUdoQyxtQkFBYSxHQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFFMUIsV0FBSyxHQUFXLENBQUMsQ0FBQzs7SUFzRDlCLENBQUM7SUFwREcsaUNBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLGFBQWE7SUFDbEMsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsd0NBQWEsR0FBYixVQUFjLE1BQWM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixJQUFJLE1BQU0sQ0FBQztRQUNqQyxFQUFFLENBQUMsR0FBRyxDQUFDLHVCQUFxQixNQUFNLDZCQUF3QixJQUFJLENBQUMsaUJBQW1CLENBQUMsQ0FBQztRQUNwRixJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDbEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxTQUFTO0lBQ1Qsa0NBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixJQUFJLEdBQUcsQ0FBQyxDQUFDLGNBQWM7UUFDN0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsV0FBVztRQUVqQyxpQkFBaUI7UUFDakIsRUFBRSxDQUFDLEdBQUcsQ0FBQywwQkFBd0IsSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxRQUFRO0lBQ1IsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDOUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVM7SUFDN0UsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVSxLQUE2QjtRQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjO1NBQ3pDO0lBQ0wsQ0FBQztJQUVELDBDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxlQUFlO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBekVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzsyREFDWTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dFQUNpQjtJQUdwQztRQURDLFFBQVE7MkRBQ21CO0lBRzVCO1FBREMsUUFBUTsrREFDcUI7SUFHOUI7UUFEQyxRQUFROytEQUN1QjtJQUdoQztRQURDLFFBQVE7MkRBQ2lCO0lBcEJULGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBNEVwQztJQUFELHVCQUFDO0NBNUVELEFBNEVDLENBNUU2QyxFQUFFLENBQUMsU0FBUyxHQTRFekQ7a0JBNUVvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwZXJpZW5jZVN5c3RlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsZXZlbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgZXhwZXJpZW5jZUJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHVwZ3JhZGVQb2ludHNMYWJlbDogY2MuTGFiZWwgPSBudWxsOyAvLyDmlrDlop7ljYfnuqfngrnmlbDnmoQgTGFiZWxcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIG1heEV4cGVyaWVuY2U6IG51bWJlciA9IDEwMDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGN1cnJlbnRFeHBlcmllbmNlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgbGV2ZWxVcEV4cGVyaWVuY2U6IG51bWJlciA9IDEwMDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHVwZ3JhZGVQb2ludHM6IG51bWJlciA9IDA7IC8vIOWNh+e6p+eCueaVsFxyXG5cclxuICAgIHByaXZhdGUgbGV2ZWw6IG51bWJlciA9IDE7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTsgLy8g5ri45oiP5byA5aeL5pe25pu05pawIFVJXHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWRkRXhwZXJpZW5jZShhbW91bnQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY3VycmVudEV4cGVyaWVuY2UgKz0gYW1vdW50O1xyXG4gICAgICAgIGNjLmxvZyhgRXhwZXJpZW5jZSBhZGRlZDogJHthbW91bnR9LCBjdXJyZW50RXhwZXJpZW5jZTogJHt0aGlzLmN1cnJlbnRFeHBlcmllbmNlfWApO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFeHBlcmllbmNlID49IHRoaXMubGV2ZWxVcEV4cGVyaWVuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbFVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+e2k+mpl+WAvOa7v+S6huWNh+e0mlxyXG4gICAgbGV2ZWxVcCgpIHtcclxuICAgICAgICB0aGlzLmxldmVsKys7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RXhwZXJpZW5jZSAtPSB0aGlzLmxldmVsVXBFeHBlcmllbmNlO1xyXG4gICAgICAgIHRoaXMubGV2ZWxVcEV4cGVyaWVuY2UgKj0gMS4yOyAvLyDmr4/mrKHljYfnuqflkI7pnIDopoHmm7TlpJrnu4/pqoxcclxuICAgICAgICB0aGlzLnVwZ3JhZGVQb2ludHMrKzsgLy8g5aKe5Yqg5LiA5Liq5Y2H57qn54K55pWwXHJcblxyXG4gICAgICAgIC8vIOinpuWPkSBsZXZlbC11cCDkuovku7ZcclxuICAgICAgICBjYy5sb2coYExldmVsIHVwISBOZXcgbGV2ZWw6ICR7dGhpcy5sZXZlbH1gKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnbGV2ZWwtdXAnLCB0aGlzLmxldmVsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mm7TmlrDmioDog73pu57mlbhcclxuICAgIHVwZGF0ZVVJKCkge1xyXG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSAnTHYnICsgdGhpcy5sZXZlbDtcclxuICAgICAgICB0aGlzLmV4cGVyaWVuY2VCYXIucHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRFeHBlcmllbmNlIC8gdGhpcy5sZXZlbFVwRXhwZXJpZW5jZTtcclxuICAgICAgICB0aGlzLnVwZ3JhZGVQb2ludHNMYWJlbC5zdHJpbmcgPSAn5Ymp6aSY6bue5pW4OiAnICsgdGhpcy51cGdyYWRlUG9pbnRzOyAvLyDmm7TmlrDljYfnuqfngrnmlbBcclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24oZXZlbnQ6IGNjLkV2ZW50LkV2ZW50S2V5Ym9hcmQpIHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gY2MubWFjcm8uS0VZLmUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRFeHBlcmllbmNlKDEwKTsgLy8g5oyJ5LiLIEUg6ZSu5aKe5Yqg57uP6aqM5YC8XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVzZVVwZ3JhZGVQb2ludCgpIHtcclxuICAgICAgICBpZiAodGhpcy51cGdyYWRlUG9pbnRzID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVQb2ludHMtLTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpOyAvLyDkvb/nlKjljYfnuqfngrnmlbDlkI7mm7TmlrAgVUlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iXX0=