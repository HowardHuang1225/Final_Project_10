
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
cc._RF.push(module, '3e9bdw3XhdHLb0K8rVDxvYS', 'CircleAttack');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDaXJjbGVBdHRhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFtQkM7UUFqQkcsWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUdwQixjQUFRLEdBQVcsQ0FBQyxDQUFDOztJQWN6QixDQUFDO0lBWkcsNkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFoQkQ7UUFEQyxRQUFRO2dEQUNXO0lBR3BCO1FBREMsUUFBUTtrREFDWTtJQUxKLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FtQmhDO0lBQUQsbUJBQUM7Q0FuQkQsQUFtQkMsQ0FuQnlDLEVBQUUsQ0FBQyxTQUFTLEdBbUJyRDtrQkFuQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2lyY2xlQXR0YWNrIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZGFtYWdlOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGR1cmF0aW9uOiBudW1iZXIgPSAyO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuYXBwbHlEYW1hZ2UsIDEuMCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5kZXN0cm95U2VsZiwgdGhpcy5kdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlEYW1hZ2UoKSB7XHJcbiAgICAgICAgY2MubG9nKCdBcHBseWluZyBkYW1hZ2U6JywgdGhpcy5kYW1hZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=