!function t(e,i,s){function a(n,r){if(!i[n]){if(!e[n]){var l="function"==typeof require&&require;if(!r&&l)return l(n,!0);if(o)return o(n,!0);var h=new Error("Cannot find module '"+n+"'");throw h.code="MODULE_NOT_FOUND",h}var d=i[n]={exports:{}};e[n][0].call(d.exports,function(t){var i=e[n][1][t];return a(i?i:t)},d,d.exports,t,e,i,s)}return i[n].exports}for(var o="function"==typeof require&&require,n=0;n<s.length;n++)a(s[n]);return a}({1:[function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),l=t("./states/BootState"),h=s(l),d=t("./states/LoadState"),u=s(d),c=t("./states/MenuState"),p=s(c),y=t("./states/GameState"),f=s(y),b=function(t){function e(){a(this,e);var t={width:1410,height:725,renderer:Phaser.AUTO,parent:"boom",resolution:window.devicePixelRatio},i=o(this,Object.getPrototypeOf(e).call(this,t));return i.state.add("boot",h["default"],!1),i.state.add("load",u["default"],!1),i.state.add("menu",p["default"],!1),i.state.add("game",f["default"],!1),i}return n(e,t),r(e,[{key:"run",value:function(){this.state.start("boot")}}]),e}(Phaser.Game);i["default"]=b},{"./states/BootState":5,"./states/GameState":6,"./states/LoadState":7,"./states/MenuState":8}],2:[function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),l=function c(t,e,i){null===t&&(t=Function.prototype);var s=Object.getOwnPropertyDescriptor(t,e);if(void 0===s){var a=Object.getPrototypeOf(t);return null===a?void 0:c(a,e,i)}if("value"in s)return s.value;var o=s.get;if(void 0!==o)return o.call(i)},h=t("./Player"),d=s(h),u=function(t){function e(t,i,s){a(this,e);var n=o(this,Object.getPrototypeOf(e).call(this,t,i,s)),r=d["default"].getSpawnPosition(n.spawnRange);return n.sprite=n.state.add.sprite(r,n.spawnHeight,"humstar"),n.state.physics.enable(n.sprite,Phaser.Physics.ARCADE),n.sprite.body.checkCollision.up=!1,n.sprite.scale.set(2),n.sprite.smoothed=!1,n.sprite.anchor.x=.5,n.sprite.anchor.y=.5,n.initialMaxVelocity=500,n.acceleration=2e3,n.sprite.body.drag.x=300,n.sprite.body.maxVelocity.x=n.initialMaxVelocity,n.sprite.body.maxVelocity.y=1e3,n.sprite.body.gravity.y=1500,n.sprite.body.bounce.y=0,n.sprite.animations.add("fly",[0,1,2,3,4,5],10,!0),n.sprite.animations.play("fly"),n.nextFire=0,n.fireRate=250,n.bulletSpeed=1e3,n.weaponMagazine=12,n.weaponReloadTime=1500,n.ammo=n.weaponMagazine,n.shootKnockback=36e3,n.fallPosition=n.sprite.y,n.falling=!1,n.sounds=n.state.add.audio("sounds"),n.sounds.allowMultiple=!0,n.sounds.addMarker("shoot",3,.7),n.sounds.addMarker("explosion",0,2),n.sounds.addMarker("winner",5,1),n.sounds.addMarker("aced",6,1),n.sounds.addMarker("yells",7.5,1.5),n.sounds.addMarker("weee",9,1),n.sounds.addMarker("awesome",10.5,1.2),n.sounds.addMarker("wicked",12.5,1),n.reloadSound=n.state.add.audio("reload"),n.pin=n.state.add.audio("pin"),n.pin.allowMultiple=!0,n.pin.addMarker("throw",.5,2),n.nextGrenade=0,n.grenades=3,n.grenadeRate=200,n.grenadeStrength=0,n.grenadeStrengthMax=100,n}return n(e,t),r(e,[{key:"update",value:function(){l(Object.getPrototypeOf(e.prototype),"update",this).call(this),this.ammo<=0&&this.state.time.now>=this.reloadingEnd&&(this.ammo=this.weaponMagazine,this.reloadSound.play()),this.state.input.gamepad.supported&&this.state.input.gamepad.active&&this.controls.pad.connected?this.listenGamepad():this.listenKeyboard()}},{key:"listenGamepad",value:function(){l(Object.getPrototypeOf(e.prototype),"listenGamepad",this).call(this),this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)||this.controls.pad.isDown(Phaser.Gamepad.XBOX360_B)?this.falling||(this.sprite.body.checkCollision.down=!1,this.fallPosition=this.sprite.y,this.falling=!0):this.sprite.body.checkCollision.down||this.sprite.y>this.fallPosition+20&&(this.sprite.body.checkCollision.down=!0,this.falling=!1),this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)||this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)<-.1?(this.sprite.angle=-20,this.facing="left"):(this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)||this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)>.1)&&(this.sprite.angle=20,this.facing="right")}},{key:"listenKeyboard",value:function(){l(Object.getPrototypeOf(e.prototype),"listenKeyboard",this).call(this),this.controls.down.isDown?this.falling||(this.sprite.body.checkCollision.down=!1,this.fallPosition=this.sprite.y,this.falling=!0):this.sprite.body.checkCollision.down||this.sprite.y>this.fallPosition+20&&(this.sprite.body.checkCollision.down=!0,this.falling=!1),this.controls.left.isDown?(this.sprite.angle=-20,this.facing="left"):this.controls.right.isDown?(this.sprite.angle=20,this.facing="right"):this.sprite.angle=0,this.controls.grenade.isDown&&this.grenades>0?this.grenadeStrength<this.grenadeStrengthMax&&(this.grenadeStrength+=1):this.grenadeStrength>0&&this.throwGrenade(this.grenadeStrength)}},{key:"fire",value:function(){if(!(this.state.time.now<this.nextFire||this.state.time.now<this.reloadingEnd||this.state.bullets.countDead()<=0||this.ammo<=0)){this.nextFire=this.state.time.now+this.fireRate;var t=this.state.bullets.getFirstDead();return t.shootKnockback=this.shootKnockback,t.shooter=this.sprite,this.ammo-=1,this.sounds.play("shoot"),this.ammo<=0?void(this.reloadingEnd=this.state.time.now+this.weaponReloadTime):void("left"===this.facing?(t.reset(this.sprite.x,this.sprite.y),t.body.velocity.x=this.bulletSpeed*-1,this.sprite.body.velocity.x=this.shootKnockback/180):(t.reset(this.sprite.x,this.sprite.y),t.body.velocity.x=this.bulletSpeed,this.sprite.body.velocity.x=this.shootKnockback/180*-1))}}},{key:"throwGrenade",value:function(){var t=this;if(!(this.grenades<=0||this.state.time.now<this.nextGrenade||this.state.grenades.countDead()<=0)){var e=this.state.grenades.getFirstDead();e.reset(this.sprite.x,this.sprite.y),this.pin.play("throw"),this.state.physics.arcade.velocityFromRotation("right"===this.facing?-45:-90,10*this.grenadeStrength,e.body.velocity),this.grenades-=1,this.nextGrenade=this.state.time.now+this.grenadeRate,this.grenadeStrength=0,this.state.time.events.add(1800,function(){for(var i=function(i){var s=t.state.add.sprite(e.x,e.y,"explosion");s.anchor.x=.5,s.anchor.y=.8,s.animations.add("explode"),s.animations.play("explode",24,!1,!0),t.sounds.play("explosion");var a=t.state.players[i];a.sprite.body.maxVelocity.x=1e3;var o=t.state.physics.arcade.distanceBetween(e,t.state.players[i].sprite);e.y-=20;var n=t.state.physics.arcade.angleBetween(e,a.sprite);t.state.physics.arcade.velocityFromRotation(n,1/o*1e5,a.sprite.body.velocity),e.kill(),t.state.time.events.add(Phaser.Timer.HALF,function(){a.sprite.body.maxVelocity.x=t.initialMaxVelocity},t)},s=0;s<t.state.players.length;++s)i(s)},this)}}},{key:"die",value:function(){l(Object.getPrototypeOf(e.prototype),"die",this).call(this),this.ammo=this.weaponMagazine,this.grenades=3;var t=["aced","yells","weee","wicked","awesome"];this.sounds.play(t[Math.floor(Math.random()*t.length)]),this.sprite.body.checkCollision.down=!0,this.falling=!1}}]),e}(d["default"]);i["default"]=u},{"./Player":3}],3:[function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),o=function(){function t(e,i,a){s(this,t),this.spawnRange=e,this.controls=i,this.state=a,this.spawnHeight=-1e3,this.facing="right",this.acceleration=600,this.jumpVelocity=900,this.lives=10,this.pausedGame=!1}return a(t,[{key:"update",value:function(){this.state.input.gamepad.supported&&this.state.input.gamepad.active&&this.controls.pad.connected?this.listenGamepad():this.listenKeyboard(),this.sprite.y>this.state.world.height&&this.die()}},{key:"listenGamepad",value:function(){this.controls.pad.isDown(Phaser.Gamepad.XBOX360_START)&&(this.state.paused&&this.pausedGame?this.state.paused=!1:(this.state.paused=!0,this.pausedGame=!0)),this.controls.pad.isDown(Phaser.Gamepad.XBOX360_A)&&this.sprite.body.onFloor()&&(this.sprite.body.velocity.y=this.jumpVelocity*-1),this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)||this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)<-.1?this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,this.acceleration*-1,this.sprite.body.acceleration):this.controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)||this.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)>.1?this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,this.acceleration,this.sprite.body.acceleration):(this.sprite.body.acceleration.x=0,this.sprite.angle=0),this.controls.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)&&this.fire(),this.controls.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)&&console.log("boom!")}},{key:"listenKeyboard",value:function(){this.controls.left.isDown?this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,this.acceleration*-1,this.sprite.body.acceleration):this.controls.right.isDown?this.state.physics.arcade.accelerationFromRotation(this.sprite.rotation,this.acceleration,this.sprite.body.acceleration):this.sprite.body.acceleration.x=0,this.controls.up.isDown&&this.sprite.body.onFloor()&&(this.sprite.body.velocity.y=this.jumpVelocity*-1),this.controls.shoot.isDown&&this.fire()}},{key:"die",value:function(){this.lives-=1,this.lives<=0?(this.sounds.play("winner"),this.state.stop()):(this.sprite.y=this.spawnHeight,this.sprite.x=t.getSpawnPosition(this.spawnRange))}}],[{key:"getSpawnPosition",value:function(t){var e=t[Math.floor(Math.random()*t.length)];return Math.random()*(e[1]-e[0])+e[0]}}]),t}();i["default"]=o},{}],4:[function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}var a=t("./Game"),o=s(a),n=new o["default"];window.onbeforeunload=function(){return"Are you sure you want to leave?"},n.run()},{"./Game":1}],5:[function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),r=function(t){function e(){return s(this,e),a(this,Object.getPrototypeOf(e).apply(this,arguments))}return o(e,t),n(e,[{key:"preload",value:function(){this.load.image("loading","images/loading.png"),this.physics.startSystem(Phaser.Physics.ARCADE),this.stage.backgroundColor="#ffffff"}},{key:"create",value:function(){this.state.start("load")}}]),e}(Phaser.State);i["default"]=r},{}],6:[function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{"default":t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),l=t("../entities/Humstar"),h=s(l),d=function(t){function e(){return a(this,e),o(this,Object.getPrototypeOf(e).apply(this,arguments))}return n(e,t),r(e,[{key:"create",value:function(){var t=1410,e=725,i=100;this.world.setBounds(-i,-i,1410+i,725+i),this.bg=this.add.tileSprite(0,0,1410,725,"background"),this.bg.fixedToCamera=!0;var s=["arena","line"];this.tilemap=this.add.tilemap(s[Math.floor(Math.random()*s.length)]),this.tilemap.addTilesetImage("tilesheet"),this.platformsLayer=this.tilemap.createLayer("platforms"),this.camera.focusOnXY((t-i)/2,(e-i)/2),this.collisionsLayer=this.tilemap.createLayer("collisions"),this.tilemap.setCollisionBetween(1,1e4,!0,this.collisionsLayer),this.setupPlayers(),this.setupBullets(),this.music=this.add.audio("sonic1"),this.music.loopFull(.8),this.hitSound=this.add.audio("hit"),this.setupHud(),this.setupGrenades();var a=!1;a?this.collisionsLayer.debug=!0:this.collisionsLayer.visible=!1}},{key:"update",value:function(){for(var t=0;t<this.players.length;++t)this.physics.arcade.collide(this.players[t].sprite,this.collisionsLayer),this.physics.arcade.collide(this.bullets,this.players[t].sprite,this.collisionHandler,null,this),this.players[t].update();this.physics.arcade.collide(this.bullets,this.collisionsLayer,this.collisionsLayerHandler,null,this),this.physics.arcade.collide(this.grenades,this.collisionsLayer),this.updateHud()}},{key:"collisionHandler",value:function(t,e){e.shooter!==t&&(t.body.maxVelocity.x=1e3,this.hitSound.play(),e.x<t.x?t.body.acceleration.x=e.shootKnockback:t.body.acceleration.x=e.shootKnockback*-1,e.kill(),this.time.events.add(Phaser.Timer.HALF,function(){t.body.maxVelocity.x=250},this))}},{key:"collisionsLayerHandler",value:function(t,e){"collisions"===e.layer.name&&t.kill()}},{key:"setupPlayers",value:function(){var t=[[200,600]];this.input.gamepad.start();var e={up:this.input.keyboard.addKey(Phaser.Keyboard.UP),down:this.input.keyboard.addKey(Phaser.Keyboard.DOWN),left:this.input.keyboard.addKey(Phaser.Keyboard.LEFT),right:this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),shoot:this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),grenade:this.input.keyboard.addKey(Phaser.Keyboard.ALT),pad:this.input.gamepad.pad1},i={up:this.input.keyboard.addKey(Phaser.Keyboard.Z),down:this.input.keyboard.addKey(Phaser.Keyboard.S),left:this.input.keyboard.addKey(Phaser.Keyboard.Q),right:this.input.keyboard.addKey(Phaser.Keyboard.D),shoot:this.input.keyboard.addKey(Phaser.Keyboard.G),grenade:this.input.keyboard.addKey(Phaser.Keyboard.H),pad:this.input.gamepad.pad2};this.players=[],this.players.push(new h["default"](t,e,this)),this.players.push(new h["default"](t,i,this)),this.players[1].sprite.loadTexture("humstar_blue",0,!1)}},{key:"setupGrenades",value:function(){this.grenades=this.add.group(),this.grenades.enableBody=!0,this.grenades.physicsBodyType=Phaser.Physics.ARCADE,this.grenades.createMultiple(50,"grenade"),this.grenades.setAll("anchor.x",.5),this.grenades.setAll("anchor.y",.5),this.grenades.setAll("body.gravity.y",1500),this.grenades.setAll("body.bounce.y",.4),this.grenades.setAll("body.bounce.x",.4),this.grenades.setAll("body.drag.x",150)}},{key:"setupBullets",value:function(){this.bullets=this.add.group(),this.bullets.enableBody=!0,this.bullets.physicsBodyType=Phaser.Physics.ARCADE,this.bullets.createMultiple(50,"bullet"),this.bullets.setAll("checkWorldBounds",!0),this.bullets.setAll("outOfBoundsKill",!0),this.bullets.setAll("angle",90),this.bullets.setAll("anchor.x",.5),this.bullets.setAll("anchor.y",.5)}},{key:"setupHud",value:function(){this.scoreText=this.add.bitmapText(10,0,"nokia_white","Red: "+this.players[0].lives+"\nBlue: "+this.players[1].lives,16),this.ammoText=this.add.bitmapText(100,0,"nokia_white","Red: "+this.players[0].ammo+"\nBlue: "+this.players[1].ammo,16),this.grenadesText=this.add.bitmapText(250,0,"nokia_white","Red: "+this.players[0].grenades+"\nBlue: "+this.players[1].grenades,16)}},{key:"updateHud",value:function(){this.scoreText.setText("Red: "+this.players[0].lives+"\nBlue: "+this.players[1].lives),this.ammoText.setText("Red: "+this.players[0].ammo+" bullets\nBlue: "+this.players[1].ammo+" bullets"),this.grenadesText.setText("Red: "+this.players[0].grenades+" grenades\nBlue: "+this.players[1].grenades+" grenades")}},{key:"stop",value:function(){this.music.stop(),this.state.start("menu")}}]),e}(Phaser.State);i["default"]=d},{"../entities/Humstar":2}],7:[function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),r=function(t){function e(){return s(this,e),a(this,Object.getPrototypeOf(e).apply(this,arguments))}return o(e,t),n(e,[{key:"preload",value:function(){this.loadingImage=this.add.sprite(this.world.width/2,this.world.height/2,"loading"),this.loadingImage.anchor.set(.5),this.loadingImage.scale.set(.5),this.load.tilemap("line","maps/line.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("arena","maps/arena.json",null,Phaser.Tilemap.TILED_JSON),this.load.image("tilesheet","images/tilesheet.png"),this.load.image("background","images/background.png"),this.load.image("bullet","images/bullet.png"),this.load.image("grenade","images/grenade.png"),this.load.image("underground","images/underground.png"),this.load.spritesheet("humstar","images/humstar.png",32,32),this.load.spritesheet("humstar_blue","images/humstar_blue.png",32,32),this.load.spritesheet("explosion","images/explosion.png",50,128),this.load.spritesheet("button","images/button.png",80,20),this.load.audio("intro","audio/intro.mp3"),this.load.audio("loop1","audio/loop1.mp3"),this.load.audio("loop2","audio/loop2.mp3"),this.load.audio("sonic1","audio/sonic1.mp3"),this.load.audio("sonic2","audio/sonic2.mp3"),this.load.audio("sonic4","audio/sonic4.mp3"),this.load.audio("win","audio/win.mp3"),this.load.audio("loss","audio/loss.mp3"),this.load.audio("hit","audio/hit.mp3"),this.load.audio("reload","audio/reload.mp3"),this.load.audio("sounds","audio/sounds.mp3"),this.load.audio("pin","audio/pin.mp3"),this.load.bitmapFont("nokia","fonts/nokia16black.png","fonts/nokia16black.xml"),this.load.bitmapFont("nokia_white","fonts/nokia16.png","fonts/nokia16.xml")}},{key:"create",value:function(){this.state.start("menu")}}]),e}(Phaser.State);i["default"]=r},{}],8:[function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),r=function(t){function e(){return s(this,e),a(this,Object.getPrototypeOf(e).apply(this,arguments))}return o(e,t),n(e,[{key:"create",value:function(){var t=this;this.background=this.add.image(0,0,"underground"),this.background.scale.x=3,this.background.scale.y=3,this.background.smoothed=!1;var e=this.world.width/2,i=this.world.height/2;this.button=this.add.button(e,i,"button",function(){t.start()},this,0,1,2),this.button.scale.set(1,1.5),this.button.smoothed=!1,this.button.anchor.x=.5,this.button.anchor.y=.5,this.text=this.add.bitmapText(this.button.x-this.button.width/2,this.button.y-this.button.height/2+7,"nokia","Play",16),this.text.x+=this.button.width/2-this.text.textWidth/2;var s=this.input.keyboard.addKey(Phaser.Keyboard.ENTER);s.onDown.addOnce(this.start,this),this.music=this.add.audio("intro"),this.music.loopFull(.8)}},{key:"start",value:function(){this.music.stop(),this.state.start("game")}}]),e}(Phaser.State);i["default"]=r},{}]},{},[4]);