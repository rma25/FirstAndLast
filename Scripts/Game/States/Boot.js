var ZenvaRunner = function () { };

ZenvaRunner.Boot = function () { };

ZenvaRunner.Boot.prototype = {
    preload: function () {
        this.load.image('logo', '../../../Assets/images/logo.png');
        this.load.image('preloadbar', '../../../Assets/images/preloader-bar.png');
    },
    create: function () {
        this.game.stage.backgroundColor = '#fff';

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 568;
            this.scale.minHeight = 600;
            this.scale.maxWidth = 2048;
            this.scale.maxHeight = 1536;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');
    }
};

//Update runs every single tick of the game  