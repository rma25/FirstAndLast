ZenvaRunner.Preload = function () {
    this.ready = false;
 };

ZenvaRunner.Preload.prototype = {
    preload: function () {
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.CenterY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.CenterY + 128);
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //Images
        this.load.image('ground', '../../../Assets/images/ground.png');
        this.load.image('background', '../../../Assets/images/background.png');
        this.load.image('ground', '../../../Assets/images/foreground.png');

        //image, height, width, 7 pictures per file
        this.load.spritesheet('coins', '../../../Assets/images/coins-ps.png', 51, 51, 7);
        this.load.spritesheet('player', '../../../Assets/images/jetpack-ps.png', 296, 296, 4);
        this.load.spritesheet('missile', '../../../Assets/images/missiles-ps.png', 361, 218, 4);

        //Audio (must provide mp3 & ogg)
        this.load.audio('gameMusic', ['../../../Assets/audio/Pamgaea.mp3', '../../../Assets/audio/Pamgaea.ogg']);
        this.load.audio('rocket', '../../../Assets/audio/rocket.wav');
        this.load.audio('bounce', '../../../Assets/audio/bounce.wav');
        this.load.audio('coin', '../../../Assets/audio/coin.wav');
        this.load.audio('death', '../../../Assets/audio/death.wav');

        this.load.onComplete.add(this.onLoadComplete, this)
    },
    create: function () {
        this.preloadBar.cropEnabled = false;
    },
    update: function () {
        //Runs every tick
        if (this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
            this.state.start('MainMenu');
        }
    },
    onLoadComplete: function(){
        this.ready = true;
    }

};