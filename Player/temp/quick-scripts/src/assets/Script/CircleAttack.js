"use strict";
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