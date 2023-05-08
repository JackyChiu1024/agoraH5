window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  ChJeremy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c804a/PGuNLw6zNvE0XO0bz", "ChJeremy");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Ch_1 = require("./Ch");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ChJeremy = function(_super) {
      __extends(ChJeremy, _super);
      function ChJeremy() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ChJeremy.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this._assetsDir = "";
        this.MAX_JUMP_COUNT = 3;
        this.loadFullRes();
      };
      ChJeremy.prototype.loadFullRes = function() {
        var self = this;
        cc.resources.load("ch/A/run", function(err, clip) {
          self._animation.addClip(clip, "run");
        });
        cc.resources.load("ch/A/beginJump", function(err, clip) {
          self._animation.addClip(clip, "beginJump");
        });
        cc.resources.load("ch/A/jump", function(err, clip) {
          self._animation.addClip(clip, "jump");
        });
        cc.resources.load("ch/A/fall", function(err, clip) {
          self._animation.addClip(clip, "fall");
        });
        cc.resources.load("ch/A/dropEnd", function(err, clip) {
          self._animation.addClip(clip, "dropEnd");
        });
        cc.resources.load("ch/A/die", function(err, clip) {
          self._animation.addClip(clip, "die");
        });
      };
      ChJeremy.prototype.skill = function() {};
      ChJeremy = __decorate([ ccclass ], ChJeremy);
      return ChJeremy;
    }(Ch_1.default);
    exports.default = ChJeremy;
    cc._RF.pop();
  }, {
    "./Ch": "Ch"
  } ],
  ChManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "262bfei0xtOOqRD+gQeUKRY", "ChManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Ch = function(_super) {
      __extends(Ch, _super);
      function Ch() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.multiplierLabel = null;
        _this._animation = null;
        _this._jumpImpl = null;
        _this._isFall = true;
        _this._downY = -20;
        _this._groundCounts = [];
        return _this;
      }
      Ch.prototype.onLoad = function() {
        this._animation = this.node.getComponent(cc.Animation);
        this._animation.play("fall");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._jumpOnKeyDown, this);
      };
      Ch.prototype._run = function() {
        this._jumpImpl = this._firstJump;
        this._animation.play("run");
      };
      Ch.prototype._firstJump = function() {
        this._jumpImpl = this._secondJump;
        this._jump();
      };
      Ch.prototype._secondJump = function() {
        this._jumpImpl = null;
        cc.Tween.stopAllByTarget(this.node);
        this._jump();
      };
      Ch.prototype._jump = function() {
        var _this = this;
        this._animation.play("beginJump");
        cc.tween(this.node).delay(.08).call(function() {
          _this._animation.play("jump");
        }).by(.4, {
          position: cc.v3(0, 500, 0)
        }).call(function() {
          _this._animation.play("fall");
          _this._isFall = true;
        }).start();
      };
      Ch.prototype._fall = function() {
        this.node.y += this._downY;
      };
      Ch.prototype._die = function() {
        var _this = this;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._jumpOnKeyDown, this);
        cc.director.emit(EventList_1.default.ChEvent.DYING);
        cc.director.getCollisionManager().enabled = false;
        this._animation.play("die");
        cc.tween(this.node).to(3, {
          position: cc.v3(-730, 0, 0)
        }).call(function() {
          _this.node.parent.emit(EventList_1.default.ChEvent.DIE);
        }).start();
      };
      Ch.prototype._jumpOnKeyDown = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.space:
          if (this._jumpImpl) {
            this._isFall = false;
            this._jumpImpl();
          }
        }
      };
      Ch.prototype.onCollisionExit = function(other, self) {
        if (1 == other.tag) {
          this._groundCounts.includes(other.node) && this._groundCounts.splice(this._groundCounts.indexOf(other.node), 1);
          if (0 == this._groundCounts.length && !(this._jumpImpl == this._secondJump)) {
            this._animation.play("fall");
            this._isFall = true;
          }
        }
      };
      Ch.prototype.onCollisionEnter = function(other, self) {
        if (0 == other.tag) {
          this._isFall = false;
          this._die();
        } else if (1 == other.tag) {
          var worldSelf = self.world;
          var aabbSelf = worldSelf.aabb;
          var groundTop = -360 + other.node.height;
          if (aabbSelf.y > other.node.height - 20) {
            if (!this._groundCounts.includes(other.node)) {
              this._groundCounts.push(other.node);
              cc.director.emit(EventList_1.default.ChEvent.TOUCH_GROUND);
              this._isFall = false;
              this.node.y = groundTop;
              if (1 == this._groundCounts.length) {
                this._animation.play("dropEnd");
                this._animation.once("finished", this._run, this);
              }
            }
          } else cc.director.emit(EventList_1.default.ChEvent.TOUCH_WALL);
        }
      };
      Ch.prototype.update = function(dt) {
        this._isFall && this._fall();
      };
      __decorate([ property(cc.Label) ], Ch.prototype, "multiplierLabel", void 0);
      Ch = __decorate([ ccclass ], Ch);
      return Ch;
    }(cc.Component);
    exports.default = Ch;
    cc._RF.pop();
  }, {
    "./EventList": "EventList"
  } ],
  ChTest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3baaL2uEhFqoWiXoNA/VYz", "ChTest");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var chTest = function(_super) {
      __extends(chTest, _super);
      function chTest() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._animation = cc.Action = null;
        return _this;
      }
      chTest.prototype.onLoad = function() {
        this._animation = this.node.getComponent(cc.Animation);
        var self = this;
        cc.resources.load("ch/A/run", function(err, clip) {
          self._animation.addClip(clip, "run");
          console.log("run is ready to go");
        });
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._onEventKeyDown, this);
      };
      chTest.prototype._onEventKeyDown = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.space:
          this._run();
        }
      };
      chTest.prototype._run = function() {
        this._animation.play("run");
      };
      chTest.prototype.update = function(dt) {};
      chTest = __decorate([ ccclass ], chTest);
      return chTest;
    }(cc.Component);
    exports.default = chTest;
    cc._RF.pop();
  }, {} ],
  Ch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93034sjoO9Mf6xnDepl14kH", "Ch");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var robotJe = function() {
      function robotJe() {
        this.name = "dd";
        this.age = 33;
        this.sex = true;
      }
      robotJe.prototype.attack = function() {};
      return robotJe;
    }();
    var Ch = function(_super) {
      __extends(Ch, _super);
      function Ch() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.multiplierLabel = null;
        _this._animation = null;
        _this._isFall = true;
        _this._downY = -20;
        _this._groundCounts = [];
        _this.MAX_JUMP_COUNT = 1;
        _this._jumpCount = 0;
        _this._assetsDir = "";
        return _this;
      }
      Ch.prototype.onLoad = function() {
        this._animation = this.node.getComponent(cc.Animation);
        this._animation.play("fall");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._jumpOnKeyDown, this);
      };
      Ch.prototype._run = function() {
        this._animation.play("run");
      };
      Ch.prototype._jumpImpl = function() {
        if (this._jumpCount > 0) {
          cc.Tween.stopAllByTarget(this.node);
          this._isFall = false;
          this._jumpCount -= 1;
          this._jump();
        }
      };
      Ch.prototype._jump = function() {
        var _this = this;
        this._animation.play("beginJump");
        cc.tween(this.node).delay(.08).call(function() {
          _this._animation.play("jump");
        }).by(.4, {
          position: cc.v3(0, 500, 0)
        }).call(function() {
          _this._animation.play("fall");
          _this._isFall = true;
        }).start();
      };
      Ch.prototype._fall = function() {
        this.node.y += this._downY;
      };
      Ch.prototype._die = function() {
        var _this = this;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this._jumpOnKeyDown, this);
        cc.director.emit(EventList_1.default.ChEvent.DYING);
        cc.director.getCollisionManager().enabled = false;
        this._animation.play("die");
        cc.tween(this.node).to(3, {
          position: cc.v3(-730, 0, 0)
        }).call(function() {
          _this.node.parent.emit(EventList_1.default.ChEvent.DIE);
        }).start();
      };
      Ch.prototype._jumpOnKeyDown = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.space:
          this._jumpImpl();
        }
      };
      Ch.prototype.onCollisionExit = function(other, self) {
        if (1 == other.tag) {
          this._groundCounts.includes(other.node) && this._groundCounts.splice(this._groundCounts.indexOf(other.node), 1);
          if (0 == this._groundCounts.length && this._jumpCount == this.MAX_JUMP_COUNT) {
            this._animation.play("fall");
            this._isFall = true;
          }
        }
      };
      Ch.prototype.onCollisionEnter = function(other, self) {
        if (0 == other.tag) {
          this._isFall = false;
          this._die();
        } else if (1 == other.tag) {
          var worldSelf = self.world;
          var aabbSelf = worldSelf.aabb;
          var groundTop = -360 + other.node.height;
          if (aabbSelf.y > other.node.height - 20) {
            if (!this._groundCounts.includes(other.node)) {
              this._groundCounts.push(other.node);
              cc.director.emit(EventList_1.default.ChEvent.TOUCH_GROUND);
              this._isFall = false;
              this._jumpCount = this.MAX_JUMP_COUNT;
              this.node.y = groundTop;
              1 == this._groundCounts.length && this._animation.play("dropEnd");
            }
          } else cc.director.emit(EventList_1.default.ChEvent.TOUCH_WALL);
        }
      };
      Ch.prototype.onDropCompleted = function() {
        this._run();
      };
      Ch.prototype.die2 = function() {
        this._die();
      };
      Ch.prototype.update = function(dt) {
        this._isFall && this._fall();
      };
      __decorate([ property(cc.Label) ], Ch.prototype, "multiplierLabel", void 0);
      Ch = __decorate([ ccclass ], Ch);
      return Ch;
    }(cc.Component);
    exports.default = Ch;
    cc._RF.pop();
  }, {
    "./EventList": "EventList"
  } ],
  Console: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "baf21kxYhhI2pNQuQK1Kkk1", "Console");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Console = function(_super) {
      __extends(Console, _super);
      function Console() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.balanceLabel = null;
        _this.winLabel = null;
        _this.betLabel = null;
        _this.priceLabel = null;
        _this._multiplier = 1;
        _this._bet = 10;
        _this._game = null;
        _this._ch = null;
        _this._balance = 5e3;
        _this._win = 0;
        return _this;
      }
      Object.defineProperty(Console.prototype, "bet", {
        get: function() {
          return this._bet;
        },
        set: function(value) {
          this._bet = value;
          this.betLabel.string = this._bet.toString();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Console.prototype, "balance", {
        get: function() {
          return this._balance;
        },
        set: function(value) {
          this._balance = value;
          this.balanceLabel.string = this._balance.toString();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Console.prototype, "win", {
        get: function() {
          return this._win;
        },
        set: function(value) {
          this._win = value;
          this.winLabel.string = this._win.toString();
        },
        enumerable: false,
        configurable: true
      });
      Console.prototype.onLoad = function() {
        if (cc.sys.localStorage.getItem("balance")) {
          var balance = JSON.parse(cc.sys.localStorage.getItem("balance"));
          this.balance = balance;
        }
        this.betLabel.string = this._bet.toString();
        this._game = this.node.parent.getComponent("Game");
        this._ch = this._game.ch.getComponent("Ch");
        this._ch.multiplierLabel.string = "X" + this._multiplier;
        cc.director.on(EventList_1.default.ChEvent.DYING, this._setBalance, this);
        cc.director.on(EventList_1.default.ServerEvent.BET, this._onBet, this);
        cc.director.on(EventList_1.default.ServerEvent.NOTIFY_PRICE, this._onNotifyPrice, this);
        cc.director.on(EventList_1.default.ServerEvent.NOTIFY_MULTIPLIER, this._onNotifyMultiplier, this);
      };
      Console.prototype._setBalance = function() {
        cc.sys.localStorage.setItem("balance", this._balance);
      };
      Console.prototype._onNotifyPrice = function(price) {
        var _this = this;
        var thisMultiplier = this._multiplier;
        this._multiplier = 1;
        var priceLabel = cc.instantiate(this.priceLabel);
        priceLabel.getComponent(cc.Label).string = "" + this.bet * price;
        this._ch.node.addChild(priceLabel);
        cc.tween(priceLabel).by(.4, {
          position: cc.v3(-40, 250, 0)
        }).call(function() {
          priceLabel.destroy();
          _this._ch.multiplierLabel.string = "X1";
          var winLabel = cc.instantiate(_this.priceLabel);
          winLabel.getComponent(cc.Label).string = "+" + _this.bet * price * thisMultiplier;
          console.log(_this._ch.multiplierLabel.node.position);
          var worldPos = _this._ch.multiplierLabel.node.convertToWorldSpaceAR(cc.v3(0, 0, 0));
          var nodePos = _this.node.parent.convertToNodeSpaceAR(worldPos);
          winLabel.position = nodePos;
          _this.node.parent.addChild(winLabel);
          cc.tween(winLabel).to(1, {
            position: cc.v3(-380, 307, 0)
          }).call(function() {
            winLabel.destroy();
            _this.balance += _this.bet * price * thisMultiplier;
            _this.win += _this.bet * price * thisMultiplier;
          }).start();
        }).start();
      };
      Console.prototype._onNotifyMultiplier = function(multiplier) {
        this._multiplier += multiplier;
        this._ch.multiplierLabel.string = "X" + this._multiplier;
      };
      Console.prototype._onBet = function() {
        this.balance -= this.bet;
      };
      __decorate([ property(cc.Label) ], Console.prototype, "balanceLabel", void 0);
      __decorate([ property(cc.Label) ], Console.prototype, "winLabel", void 0);
      __decorate([ property(cc.Label) ], Console.prototype, "betLabel", void 0);
      __decorate([ property(cc.Prefab) ], Console.prototype, "priceLabel", void 0);
      Console = __decorate([ ccclass ], Console);
      return Console;
    }(cc.Component);
    exports.default = Console;
    cc._RF.pop();
  }, {
    "./EventList": "EventList"
  } ],
  Distance: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10771bo66xNFY0ZYb1+DFA/", "Distance");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Distance = function(_super) {
      __extends(Distance, _super);
      function Distance() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this._count = 0;
        _this._alive = true;
        _this._distance = 0;
        return _this;
      }
      Distance.prototype.onLoad = function() {
        cc.director.on(EventList_1.default.ChEvent.DYING, this._die, this);
      };
      Distance.prototype.start = function() {};
      Distance.prototype.update = function(dt) {
        if (this._alive) {
          this._count += 1;
          if (15 == this._count) {
            this._count = 0;
            this._distance += 1;
          }
          this.label.string = this._distance.toString();
        }
      };
      Distance.prototype._die = function() {
        this._alive = false;
      };
      __decorate([ property(cc.Label) ], Distance.prototype, "label", void 0);
      Distance = __decorate([ ccclass ], Distance);
      return Distance;
    }(cc.Component);
    exports.default = Distance;
    cc._RF.pop();
  }, {
    "./EventList": "EventList"
  } ],
  EventList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "190adckAa5MpY0+5LugFPA/", "EventList");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EventList = function(_super) {
      __extends(EventList, _super);
      function EventList() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      EventList.ChEvent = {
        DYING: "dying",
        DIE: "die",
        TOUCH_GROUND: "touchGround",
        TOUCH_WALL: "touchWall"
      };
      EventList.ServerEvent = {
        GET_PRIZE: "getPrize",
        BET: "bet",
        NOTIFY_PRICE: "notifyPrice",
        NOTIFY_MULTIPLIER: "notifyMultiplier"
      };
      EventList = __decorate([ ccclass ], EventList);
      return EventList;
    }(cc.Component);
    exports.default = EventList;
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e2551wpd8VL1ZQUZvg8zf7a", "Game");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Game = function(_super) {
      __extends(Game, _super);
      function Game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ch = null;
        _this.console = null;
        _this.distance = null;
        _this.panel = null;
        _this.bg = null;
        return _this;
      }
      Game.prototype.onLoad = function() {
        cc.director.getCollisionManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._pause, this);
        this.node.on(EventList_1.default.ChEvent.DIE, this._panelPopUp, this);
        var self = this;
        console.log("outside this :" + this);
        cc.resources.load("fullVersion/apple", cc.SpriteFrame, function(err, spriteFrame) {
          self._onLoadCallback(spriteFrame);
          console.log("inside this :" + this);
        });
      };
      Game.prototype._onLoadCallback = function(spriteFrame) {
        this.bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        console.log("load apple complete callback");
      };
      Game.prototype._pause = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.p:
          if (cc.director.isPaused()) {
            cc.director.resume();
            break;
          }
          cc.director.pause();
        }
      };
      Game.prototype._panelPopUp = function() {
        var panel = cc.instantiate(this.panel);
        panel.getComponent("Panel").distanceLabel.string = this.distance.getComponent("Distance")._distance + "m";
        panel.getComponent("Panel").totalWinLabel.string = this.console.getComponent("Console").win;
        if (cc.sys.localStorage.getItem("distance")) {
          if (this.distance.getComponent("Distance")._distance > JSON.parse(cc.sys.localStorage.getItem("distance"))) {
            panel.getComponent("Panel").newRecord.active = true;
            cc.sys.localStorage.setItem("distance", this.distance.getComponent("Distance")._distance);
          }
        } else {
          panel.getComponent("Panel").newRecord.active = true;
          cc.sys.localStorage.setItem("distance", this.distance.getComponent("Distance")._distance);
        }
        this.node.addChild(panel);
      };
      __decorate([ property(cc.Node) ], Game.prototype, "ch", void 0);
      __decorate([ property(cc.Node) ], Game.prototype, "console", void 0);
      __decorate([ property(cc.Node) ], Game.prototype, "distance", void 0);
      __decorate([ property(cc.Prefab) ], Game.prototype, "panel", void 0);
      __decorate([ property(cc.Node) ], Game.prototype, "bg", void 0);
      Game = __decorate([ ccclass ], Game);
      return Game;
    }(cc.Component);
    exports.default = Game;
    cc._RF.pop();
  }, {
    "./EventList": "EventList"
  } ],
  Ground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42ebeXMNHVFRLfZ/B2LLY/Y", "Ground");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Ground = function(_super) {
      __extends(Ground, _super);
      function Ground() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.grounds = [];
        _this.area1 = null;
        _this.area2 = null;
        _this._bgMove = false;
        return _this;
      }
      Ground.prototype.onLoad = function() {
        cc.director.on(EventList_1.default.ChEvent.TOUCH_GROUND, this._setMove, this);
        cc.director.on(EventList_1.default.ChEvent.DYING, this._stopMove, this);
        cc.director.on(EventList_1.default.ChEvent.TOUCH_WALL, this._onTouchWall, this);
      };
      Ground.prototype.update = function(dt) {
        if (this._bgMove) {
          this._move(this.area1);
          this._move(this.area2);
        }
      };
      Ground.prototype._move = function(area) {
        if (-1920 == area.x) {
          var children = area.children;
          for (var i = 0; i < children.length; i++) children[i].destroy();
          area.x = 1920;
          var newGround = cc.instantiate(this.grounds[this._getRandomGround(this.grounds.length)]);
          area.addChild(newGround);
        }
        area.x += -10;
      };
      Ground.prototype._bumpWall = function(area) {
        area.x += 50;
      };
      Ground.prototype._onTouchWall = function() {
        this._bgMove = false;
        this._bumpWall(this.area1);
        this._bumpWall(this.area2);
      };
      Ground.prototype._getRandomGround = function(max) {
        return Math.floor(Math.random() * max);
      };
      Ground.prototype._setMove = function() {
        this._bgMove = true;
      };
      Ground.prototype._stopMove = function() {
        this._bgMove = false;
      };
      __decorate([ property([ cc.Prefab ]) ], Ground.prototype, "grounds", void 0);
      __decorate([ property(cc.Node) ], Ground.prototype, "area1", void 0);
      __decorate([ property(cc.Node) ], Ground.prototype, "area2", void 0);
      Ground = __decorate([ ccclass ], Ground);
      return Ground;
    }(cc.Component);
    exports.default = Ground;
    cc._RF.pop();
  }, {
    "./EventList": "EventList"
  } ],
  Lobby: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6d0eNDkfdFsb5VDRSBJwEz", "Lobby");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Lobby = function(_super) {
      __extends(Lobby, _super);
      function Lobby() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.characterSelection = null;
        _this.startBtn = null;
        _this.joinBtn = null;
        _this.leaveBtn = null;
        _this.testBtn = null;
        _this.webviewReq = null;
        _this.webviewRes = null;
        _this._reqUrl = document.location.origin + "/agoraH5/joinReq/index.html?h=100&w=200&action=mockJoin&appId=e3e16446c0d44bb6a04597f0668b9b6a&channelName=superstar_video_3_743872";
        return _this;
      }
      Lobby.prototype.onLoad = function() {
        this.startBtn.node.on("click", this._start, this);
        this.joinBtn.node.on("click", this._join, this);
        this.leaveBtn.node.on("click", this._leave, this);
        this.testBtn.node.on("click", this._test, this);
        this.webviewReq.url = this._reqUrl;
        this.webviewReq.node.active = false;
      };
      Lobby.prototype._start = function() {
        cc.director.loadScene("game");
      };
      Lobby.prototype._join = function() {
        this.webviewReq.node.active = true;
      };
      Lobby.prototype._leave = function() {
        this.webviewReq.node.active = false;
      };
      Lobby.prototype._test = function() {
        this.webviewReq.node.active = true;
      };
      __decorate([ property(cc.ToggleContainer) ], Lobby.prototype, "characterSelection", void 0);
      __decorate([ property(cc.Button) ], Lobby.prototype, "startBtn", void 0);
      __decorate([ property(cc.Button) ], Lobby.prototype, "joinBtn", void 0);
      __decorate([ property(cc.Button) ], Lobby.prototype, "leaveBtn", void 0);
      __decorate([ property(cc.Button) ], Lobby.prototype, "testBtn", void 0);
      __decorate([ property(cc.WebView) ], Lobby.prototype, "webviewReq", void 0);
      __decorate([ property(cc.WebView) ], Lobby.prototype, "webviewRes", void 0);
      Lobby = __decorate([ ccclass ], Lobby);
      return Lobby;
    }(cc.Component);
    exports.default = Lobby;
    cc._RF.pop();
  }, {} ],
  Panel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "747a1KB6XRNSZeNqBzPFVFV", "Panel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Panel = function(_super) {
      __extends(Panel, _super);
      function Panel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.distanceLabel = null;
        _this.totalWinLabel = null;
        _this.restart = null;
        _this.leave = null;
        _this.newRecord = null;
        return _this;
      }
      Panel.prototype.onLoad = function() {
        this.restart.node.on("click", this._restart, this);
        this.leave.node.on("click", this._leave, this);
      };
      Panel.prototype._restart = function() {
        cc.director.loadScene("game");
      };
      Panel.prototype._leave = function() {
        cc.director.loadScene("Lobby");
      };
      __decorate([ property(cc.Label) ], Panel.prototype, "distanceLabel", void 0);
      __decorate([ property(cc.Label) ], Panel.prototype, "totalWinLabel", void 0);
      __decorate([ property(cc.Button) ], Panel.prototype, "restart", void 0);
      __decorate([ property(cc.Button) ], Panel.prototype, "leave", void 0);
      __decorate([ property(cc.Node) ], Panel.prototype, "newRecord", void 0);
      Panel = __decorate([ ccclass ], Panel);
      return Panel;
    }(cc.Component);
    exports.default = Panel;
    cc._RF.pop();
  }, {} ],
  Server: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec1ffXeDGNPTrlDuNQHyfLy", "Server");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Server = function(_super) {
      __extends(Server, _super);
      function Server() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tokenPricesJson = null;
        _this._tokenPrizes = [];
        return _this;
      }
      Server.prototype.onLoad = function() {
        cc.director.on(EventList_1.default.ServerEvent.BET, this._getPrize, this);
        this._tokenPrizes = this.tokenPricesJson.json.tokens;
      };
      Server.prototype._getRandomNumber = function(max) {
        return Math.floor(Math.random() * max);
      };
      Server.prototype._getPrize = function(tokenType) {
        var prizes = [];
        if (Math.random() < .3) {
          prizes = this._tokenPrizes[tokenType].multiplier;
          var multiplier = prizes[this._getRandomNumber(prizes.length)];
          cc.director.emit(EventList_1.default.ServerEvent.NOTIFY_MULTIPLIER, multiplier);
        } else {
          prizes = this._tokenPrizes[tokenType].val;
          var price = prizes[this._getRandomNumber(prizes.length)];
          cc.director.emit(EventList_1.default.ServerEvent.NOTIFY_PRICE, price);
        }
      };
      __decorate([ property(cc.JsonAsset) ], Server.prototype, "tokenPricesJson", void 0);
      Server = __decorate([ ccclass ], Server);
      return Server;
    }(cc.Component);
    exports.default = Server;
    cc._RF.pop();
  }, {
    "./EventList": "EventList"
  } ],
  TokenGenerator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "350c7lQh5hF0L/dS6t5cLot", "TokenGenerator");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TokenEnum = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TokenEnum;
    (function(TokenEnum) {
      TokenEnum[TokenEnum["token0"] = 0] = "token0";
      TokenEnum[TokenEnum["token1"] = 1] = "token1";
    })(TokenEnum = exports.TokenEnum || (exports.TokenEnum = {}));
    var TokenGenerator = function(_super) {
      __extends(TokenGenerator, _super);
      function TokenGenerator() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tokenPos = null;
        _this.tokens = [];
        return _this;
      }
      TokenGenerator.prototype.onLoad = function() {
        var children = this.tokenPos.children;
        for (var i = 0; i < children.length; i++) {
          var tokenIdx = Math.floor(Math.random() * this.tokens.length);
          var token = cc.instantiate(this.tokens[tokenIdx]);
          children[i].addChild(token);
        }
      };
      __decorate([ property(cc.Node) ], TokenGenerator.prototype, "tokenPos", void 0);
      __decorate([ property([ cc.Prefab ]) ], TokenGenerator.prototype, "tokens", void 0);
      TokenGenerator = __decorate([ ccclass ], TokenGenerator);
      return TokenGenerator;
    }(cc.Component);
    exports.default = TokenGenerator;
    cc._RF.pop();
  }, {} ],
  Token: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aed41t/cj5J4Km0i3u4jPei", "Token");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventList_1 = require("./EventList");
    var TokenGenerator_1 = require("./TokenGenerator");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Token = function(_super) {
      __extends(Token, _super);
      function Token() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tokenName = TokenGenerator_1.TokenEnum.token0;
        return _this;
      }
      Token.prototype.onCollisionEnter = function(other, self) {
        cc.director.emit(EventList_1.default.ServerEvent.BET, this.tokenName);
        self.node.destroy();
      };
      __decorate([ property({
        type: cc.Enum(TokenGenerator_1.TokenEnum)
      }) ], Token.prototype, "tokenName", void 0);
      Token = __decorate([ ccclass ], Token);
      return Token;
    }(cc.Component);
    exports.default = Token;
    cc._RF.pop();
  }, {
    "./EventList": "EventList",
    "./TokenGenerator": "TokenGenerator"
  } ]
}, {}, [ "Ch", "ChJeremy", "ChManager", "ChTest", "Console", "Distance", "EventList", "Game", "Ground", "Lobby", "Panel", "Server", "Token", "TokenGenerator" ]);
//# sourceMappingURL=index.js.map
