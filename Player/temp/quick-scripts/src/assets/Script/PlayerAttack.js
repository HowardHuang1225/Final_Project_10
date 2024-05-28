"use strict";
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