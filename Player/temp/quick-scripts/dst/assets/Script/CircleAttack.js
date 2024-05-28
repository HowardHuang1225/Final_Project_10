
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/CircleAttack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '94dcaaDSqlLprV34ucdJNzO', 'CircleAttack');
// Script/CircleAttack.ts

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
var CircleAttack = /** @class */ (function (_super) {
    __extends(CircleAttack, _super);
    function CircleAttack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 10;
        _this.duration = 2;
        return _this;
    }
    CircleAttack.prototype.onLoad = function () {
        this.schedule(this.applyDamage, 1.0);
        this.scheduleOnce(this.destroySelf, this.duration);
    };
    CircleAttack.prototype.applyDamage = function () {
        // 在这里实现对敌人的伤害逻辑
        cc.log('Applying damage:', this.damage);
    };
    CircleAttack.prototype.destroySelf = function () {
        this.node.destroy();
    };
    __decorate([
        property
    ], CircleAttack.prototype, "damage", void 0);
    __decorate([
        property
    ], CircleAttack.prototype, "duration", void 0);
    CircleAttack = __decorate([
        ccclass
    ], CircleAttack);
    return CircleAttack;
}(cc.Component));
exports.default = CircleAttack;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDaXJjbGVBdHRhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFvQkM7UUFsQkcsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUdwQixjQUFRLEdBQVcsQ0FBQyxDQUFDOztJQWV6QixDQUFDO0lBYkcsNkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0ksZ0JBQWdCO1FBQ2hCLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBakJEO1FBREMsUUFBUTtnREFDVztJQUdwQjtRQURDLFFBQVE7a0RBQ1k7SUFMSixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBb0JoQztJQUFELG1CQUFDO0NBcEJELEFBb0JDLENBcEJ5QyxFQUFFLENBQUMsU0FBUyxHQW9CckQ7a0JBcEJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZUF0dGFjayBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHlcclxuICAgIGRhbWFnZTogbnVtYmVyID0gMTA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBkdXJhdGlvbjogbnVtYmVyID0gMjtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmFwcGx5RGFtYWdlLCAxLjApO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuZGVzdHJveVNlbGYsIHRoaXMuZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5RGFtYWdlKCkge1xyXG4gICAgICAgIC8vIOWcqOi/memHjOWunueOsOWvueaVjOS6uueahOS8pOWus+mAu+i+kVxyXG4gICAgICAgIGNjLmxvZygnQXBwbHlpbmcgZGFtYWdlOicsIHRoaXMuZGFtYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==