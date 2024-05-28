"use strict";
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
        _this.maxExperience = 100;
        _this.currentExperience = 0;
        _this.levelUpExperience = 100;
        _this.level = 1;
        return _this;
    }
    ExperienceSystem.prototype.onLoad = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    ExperienceSystem.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    ExperienceSystem.prototype.addExperience = function (amount) {
        this.currentExperience += amount;
        if (this.currentExperience >= this.levelUpExperience) {
            this.levelUp();
        }
        this.updateUI();
    };
    ExperienceSystem.prototype.levelUp = function () {
        this.level++;
        this.currentExperience -= this.levelUpExperience;
        this.levelUpExperience *= 1.2; // 每次升级后需要更多经验
        // 触发 level-up 事件
        cc.log("Level up! New level: " + this.level);
        this.node.emit('level-up', this.level);
        this.updateUI();
    };
    ExperienceSystem.prototype.updateUI = function () {
        this.levelLabel.string = 'Lv' + this.level;
        this.experienceBar.progress = this.currentExperience / this.levelUpExperience;
    };
    ExperienceSystem.prototype.onKeyDown = function (event) {
        if (event.keyCode === cc.macro.KEY.e) {
            this.addExperience(10); // 按下 E 键增加经验值
        }
    };
    __decorate([
        property(cc.Label)
    ], ExperienceSystem.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], ExperienceSystem.prototype, "experienceBar", void 0);
    __decorate([
        property
    ], ExperienceSystem.prototype, "maxExperience", void 0);
    __decorate([
        property
    ], ExperienceSystem.prototype, "currentExperience", void 0);
    __decorate([
        property
    ], ExperienceSystem.prototype, "levelUpExperience", void 0);
    ExperienceSystem = __decorate([
        ccclass
    ], ExperienceSystem);
    return ExperienceSystem;
}(cc.Component));
exports.default = ExperienceSystem;

cc._RF.pop();