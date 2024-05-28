
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PlayerAttack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '333a3hzHH5LWYg3ux+Yy4Fu', 'PlayerAttack');
// Script/PlayerAttack.ts

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
var PlayerAttack = /** @class */ (function (_super) {
    __extends(PlayerAttack, _super);
    function PlayerAttack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.fireInterval = 1.0;
        _this.fireTimer = 0;
        return _this;
    }
    PlayerAttack.prototype.start = function () {
        this.schedule(this.fireBullet, this.fireInterval);
    };
    PlayerAttack.prototype.fireBullet = function () {
        if (this.bulletPrefab) {
            var bullet = cc.instantiate(this.bulletPrefab);
            bullet.setPosition(this.node.position);
            this.node.parent.addChild(bullet);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], PlayerAttack.prototype, "bulletPrefab", void 0);
    __decorate([
        property //功速
    ], PlayerAttack.prototype, "fireInterval", void 0);
    PlayerAttack = __decorate([
        ccclass
    ], PlayerAttack);
    return PlayerAttack;
}(cc.Component));
exports.default = PlayerAttack;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQbGF5ZXJBdHRhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFtQkM7UUFqQkcsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0Isa0JBQVksR0FBVyxHQUFHLENBQUM7UUFFbkIsZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUFZbEMsQ0FBQztJQVhHLDRCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBaEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsSUFBSTtzREFDYTtJQUxWLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FtQmhDO0lBQUQsbUJBQUM7Q0FuQkQsQUFtQkMsQ0FuQnlDLEVBQUUsQ0FBQyxTQUFTLEdBbUJyRDtrQkFuQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckF0dGFjayBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSAvL+WKn+mAn1xyXG4gICAgZmlyZUludGVydmFsOiBudW1iZXIgPSAxLjA7XHJcblxyXG4gICAgcHJpdmF0ZSBmaXJlVGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuZmlyZUJ1bGxldCwgdGhpcy5maXJlSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmVCdWxsZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVsbGV0UHJlZmFiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKTtcclxuICAgICAgICAgICAgYnVsbGV0LnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19