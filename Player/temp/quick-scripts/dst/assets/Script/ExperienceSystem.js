
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxFeHBlcmllbmNlU3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBdURDO1FBckRHLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLG1CQUFhLEdBQW1CLElBQUksQ0FBQztRQUdyQyxtQkFBYSxHQUFXLEdBQUcsQ0FBQztRQUc1Qix1QkFBaUIsR0FBVyxDQUFDLENBQUM7UUFHOUIsdUJBQWlCLEdBQVcsR0FBRyxDQUFDO1FBRXhCLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBdUM5QixDQUFDO0lBckNHLGlDQUFNLEdBQU47UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNJLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsTUFBYztRQUN4QixJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNsRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELGtDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsSUFBSSxHQUFHLENBQUMsQ0FBQyxjQUFjO1FBRTdDLGlCQUFpQjtRQUNqQixFQUFFLENBQUMsR0FBRyxDQUFDLDBCQUF3QixJQUFJLENBQUMsS0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xGLENBQUM7SUFFRCxvQ0FBUyxHQUFULFVBQVUsS0FBNkI7UUFDbkMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYztTQUN6QztJQUNMLENBQUM7SUFwREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzJEQUNZO0lBR3JDO1FBREMsUUFBUTsyREFDbUI7SUFHNUI7UUFEQyxRQUFROytEQUNxQjtJQUc5QjtRQURDLFFBQVE7K0RBQ3VCO0lBZGYsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0F1RHBDO0lBQUQsdUJBQUM7Q0F2REQsQUF1REMsQ0F2RDZDLEVBQUUsQ0FBQyxTQUFTLEdBdUR6RDtrQkF2RG9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBlcmllbmNlU3lzdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxldmVsTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBleHBlcmllbmNlQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBtYXhFeHBlcmllbmNlOiBudW1iZXIgPSAxMDA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBjdXJyZW50RXhwZXJpZW5jZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGxldmVsVXBFeHBlcmllbmNlOiBudW1iZXIgPSAxMDA7XHJcblxyXG4gICAgcHJpdmF0ZSBsZXZlbDogbnVtYmVyID0gMTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFeHBlcmllbmNlKGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RXhwZXJpZW5jZSArPSBhbW91bnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEV4cGVyaWVuY2UgPj0gdGhpcy5sZXZlbFVwRXhwZXJpZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsVXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldmVsVXAoKSB7XHJcbiAgICAgICAgdGhpcy5sZXZlbCsrO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEV4cGVyaWVuY2UgLT0gdGhpcy5sZXZlbFVwRXhwZXJpZW5jZTtcclxuICAgICAgICB0aGlzLmxldmVsVXBFeHBlcmllbmNlICo9IDEuMjsgLy8g5q+P5qyh5Y2H57qn5ZCO6ZyA6KaB5pu05aSa57uP6aqMXHJcblxyXG4gICAgICAgIC8vIOinpuWPkSBsZXZlbC11cCDkuovku7ZcclxuICAgICAgICBjYy5sb2coYExldmVsIHVwISBOZXcgbGV2ZWw6ICR7dGhpcy5sZXZlbH1gKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnbGV2ZWwtdXAnLCB0aGlzLmxldmVsKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVUkoKSB7XHJcbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9ICdMdicgKyB0aGlzLmxldmVsO1xyXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZUJhci5wcm9ncmVzcyA9IHRoaXMuY3VycmVudEV4cGVyaWVuY2UgLyB0aGlzLmxldmVsVXBFeHBlcmllbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5RG93bihldmVudDogY2MuRXZlbnQuRXZlbnRLZXlib2FyZCkge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBjYy5tYWNyby5LRVkuZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV4cGVyaWVuY2UoMTApOyAvLyDmjInkuIsgRSDplK7lop7liqDnu4/pqozlgLxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIl19