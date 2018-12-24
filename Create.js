/********************************** CREATE *******************************************************/
function create() {
    Platform(this);
    // ArcherPlayerCreate(this);
    // PlayerArrow(this);
    // WarriorPlayerCreate(this);
    MagePlayerCreate(this);
    ItemsToCollect(this);
    //ScoreDisplay(this);
    //TODO: Implement this later
    // Enemy(this);
    KeybindingConfig(this);
    Collision(this);
    GameSound(this);
    ParticlesEffect(this);
    CheckIfPlayerIsIdle();
    MuteButton(this);
}

function CheckIfPlayerIsIdle() {
    setInterval(PlayerIsIdle, 10000);
}

function PlayerIsIdle() {
    IsPlayerIdle = true;
}

function ParticlesEffect(parent) {
    if (ArcherPlayer != null && ArcherPlayer != undefined) {
        ArcherParticles = parent.add.particles('fire3');
        ArcherEmitter = ArcherParticles.createEmitter();

        ArcherEmitter.setPosition(ArcherPlayer.x, ArcherPlayer.y + (ArcherPlayer.displayHeight / 2));
        ArcherEmitter.setSpeed(100);
        ArcherEmitter.setScale(0.05, 0.05);
        ArcherEmitter.setAlpha(1, 0, 3000);
        ArcherEmitter.maxParticles = 10;
        ArcherEmitter.on = false;
    }

    if (WarriorPlayer != null && WarriorPlayer != undefined) {
        WarriorParticles = parent.add.particles('fire3');
        WarriorEmitter = WarriorParticles.createEmitter();

        WarriorEmitter.setPosition(WarriorPlayer.x, WarriorPlayer.y + (WarriorPlayer.displayHeight / 2));
        WarriorEmitter.setSpeed(100);
        WarriorEmitter.setScale(0.05, 0.05);
        WarriorEmitter.setAlpha(1, 0, 3000);
        WarriorEmitter.maxParticles = 10;
        WarriorEmitter.on = false;
    }

    if (MagePlayer != null && MagePlayer != undefined) {
        MageParticles = parent.add.particles('fire3');
        MageEmitter = MageParticles.createEmitter();

        MageEmitter.setPosition(MageParticles.x, MageParticles.y + (MageParticles.displayHeight / 2));
        MageEmitter.setSpeed(100);
        MageEmitter.setScale(0.05, 0.05);
        MageEmitter.setAlpha(1, 0, 3000);
        MageEmitter.maxParticles = 10;
        MageEmitter.on = false;
    }

}

function Collision(parent) {
    if (ArcherPlayer != null && ArcherPlayer != undefined) {
        ArcherCollision(parent);
    }

    if (WarriorPlayer != null && WarriorPlayer != undefined) {
        WarriorCollision(parent);
    }

    if (MagePlayer != null && MagePlayer != undefined) {
        MageCollision(parent);
    }
}

function LiveBackground(parent) {
    var algHeight = 117;
    var algWidth = 56;
    var algFrames = [];

    //Load animated plants
    for (var i = 0; i <= 60; i++) {
        algFrames.push({ key: 'alg' + i });
    }

    //Algs        
    parent.anims.create({
        key: 'liveAlg',
        frames: algFrames,
        frameRate: 10,
        repeat: -1
    });

    parent.add.sprite((CenterWidth / 3), WindowHeight - algHeight, 'alg0').play('liveAlg');
    parent.add.sprite(CenterWidth, WindowHeight - algHeight, 'alg0').play('liveAlg');
    parent.add.sprite((CenterWidth + (algWidth * 5)), WindowHeight - algHeight, 'alg0').play('liveAlg');
    parent.add.sprite((CenterWidth + (algWidth * 13)), WindowHeight - algHeight, 'alg0').play('liveAlg');
}

function Platform(parent) {
    var firstHeight = (CenterHeight + 300);
    var secondHeight = (CenterHeight + (GroundHeight * 1.5));
    var thirdHeight = (CenterHeight / 2);

    BgImage = parent.add.image(0, 0, 'background');
    BgImage.setOrigin(0, 0);
    BgImage.setDisplaySize(WindowWidth, WindowHeight);

    //Platform (where user walks on)
    Platforms = parent.physics.add.staticGroup();

    LiveBackground(parent);

    //Main ground        
    for (var i = 0; i <= (WindowWidth + GroundWidth);) {
        Platforms.create(i, WindowHeight - 33, 'ground');
        i += GroundWidth;
    }

    //Place to jump on (From the center)
    Platforms.create(CenterWidth, CenterHeight, 'ground');
    Platforms.create((CenterWidth - GroundWidth), CenterHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 2)), CenterHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 5)), CenterHeight, 'ground');
    Platforms.create((CenterWidth + GroundWidth), (CenterHeight + GroundHeight), 'ground');
    Platforms.create((CenterWidth + (GroundWidth * 2)), secondHeight, 'ground');
    Platforms.create((CenterWidth + (GroundWidth * 3)), secondHeight + 20, 'ground');

    /*First floor*/
    //Left
    Platforms.create(CenterWidth - (GrassGroundWidth), firstHeight, 'floatingGround1');
    Platforms.create(CenterWidth - (GrassGroundWidth * 2), firstHeight, 'floatingGround1');
    Platforms.create(CenterWidth, firstHeight, 'floatingGround1');
    //Right    
    Platforms.create(CenterWidth + GrassGroundWidth, firstHeight, 'floatingGround1');
    Platforms.create(CenterWidth + (GrassGroundWidth * 2), firstHeight, 'floatingGround1');
    Platforms.create(CenterWidth + (GrassGroundWidth * 3), firstHeight, 'floatingGround1');
    Platforms.create(CenterWidth + (GrassGroundWidth * 4), firstHeight, 'floatingGround1');
    /***************/

    /*Second floor*/
    //Right
    Platforms.create(CenterWidth + (GrassGroundWidth * 7), (secondHeight + (GrassGroundHeight * 1.5)), 'floatingGround1');
    Platforms.create(CenterWidth + (GrassGroundWidth * 6), (secondHeight + (GrassGroundHeight * 1.5)), 'floatingGround1');
    Platforms.create(CenterWidth + (GrassGroundWidth * 5), (secondHeight + (GrassGroundHeight * 1.5)), 'floatingGround1');
    /***************/

    /*Third floor*/
    //left
    Platforms.create((CenterWidth - GroundWidth), thirdHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 2)), thirdHeight + GroundHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 5)), thirdHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 6)), thirdHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 7)), thirdHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 8)), thirdHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 9)), thirdHeight, 'ground');
    Platforms.create((CenterWidth - (GroundWidth * 10)), thirdHeight, 'ground');
    /***************/
}

function GameSound(parent) {
    parent.sound.add('collectingSound');
    parent.sound.add('jumpSound');
    BgMusic = parent.sound.add('gameMusic');
    BgMusic.config.loop = true;
    BgMusic.play();
}

/** Collection **/
function ItemsToCollect(parent) {
    var speedRockWidth = 111;
    var speedRockHeight = 100;
    var strengthRockWidth = 109;
    var strengthRockHeight = 98;

    // Stars = parent.physics.add.group({
    //     key: 'star',
    //     repeat: (Math.round(WindowWidth / 100) + 1), //Total (1 default + 11)
    //     setXY: { x: 12, y: 0, stepX: 100 }
    // });

    // Stars.children.iterate(function (child) {
    //     child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    // });

    SpeedBuff = parent.physics.add.group({
        key: 'speedBuff',
        setXY: { x: (WindowWidth - speedRockWidth), y: (WindowHeight - speedRockHeight - 20) }
    });

    StrengthBuff = parent.physics.add.group({
        key: 'strengthBuff',
        setXY: { x: (WindowWidth - strengthRockWidth - speedRockWidth), y: ((CenterHeight + (GroundHeight * 1.5)) - (strengthRockHeight)) }
    });
}

function CollectStar(player, star) {
    //Makes the star disappear
    star.disableBody(true, true);

    game.sound.play('collectingSound');

    //Update Score
    ScoreText.setText('Score: ' + (++Score));

    //Respawn the items to collect
    if (Stars.countActive(true) === 0) {
        Stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }

    //Activate enemies
    if (Stars.countActive(true) <= 0) {
        var x = (player.x < 400) ? Phaser.Math.Between(400, CenterWidth) : Phaser.Math.Between(10, CenterWidth);

        var bomb = Bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

function CollectSpeedBuff(player, buff) {
    //Only allow player to collect buff once
    buff.disableBody(true, true);
    // buff.disableInteractive();
    if (!DoesPlayerHasSpeedBuff) {
        //display particle effects
        if (ArcherEmitter != null && ArcherEmitter != undefined) {
            ArcherEmitter.on = true;
        }

        if (WarriorEmitter != null && WarriorEmitter != undefined) {
            WarriorEmitter.on = true;
        }

        game.sound.play('speedBuffSound');
    }
    DoesPlayerHasSpeedBuff = true;
}

function CollectStrengthBuff(player, buff) {
    buff.disableBody(true, true);
    if (!DoesPlayerHasStrengthBuff) {
        game.sound.play('strengthBuffSound');
    }
    DoesPlayerHasStrengthBuff = true;
}

function CollideWithArrow(arrow, platform) {
    IsArrowShot = false;
    arrow.setAngle(0);
    arrow.disableBody(true, true);
    game.sound.play('arrowHit');
}
/** Collection **/

/** Display **/

function MuteButton(parent) {
    var soundButton = parent.add.image(16, 0, 'sound-icon');
    soundButton.setOrigin(0, 0);
    soundButton.setDisplaySize(soundButton.displayWidth / 10, soundButton.displayHeight / 10);
    soundButton.setInteractive({ useHandCursor: true });

    var muteButton = parent.add.image(16, 0, 'mute-icon');
    muteButton.setOrigin(0, 0);
    muteButton.setDisplaySize(muteButton.displayWidth / 10, muteButton.displayHeight / 10);
    muteButton.visible = false;
    muteButton.setInteractive({ useHandCursor: true });

    soundButton.on('pointerdown', () => { ToggleMute(soundButton, muteButton); });
    muteButton.on('pointerdown', () => { ToggleMute(soundButton, muteButton); });
}

function ToggleMute(soundButton, muteButton) {
    if (!this.game.sound.mute) {
        this.game.sound.mute = true;
        muteButton.visible = true;
        soundButton.visible = false;
    } else {
        this.game.sound.mute = false;
        soundButton.visible = true;
        muteButton.visible = false;
    }
}

function ScoreDisplay(parent) {
    ScoreText = parent.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
}
/** Display **/

/** Enemies **/
function Enemy(parent) {
    //TODO: Fix this
    Bombs = parent.physics.add.group();

    parent.physics.add.collider(Bombs, Platforms);

    parent.physics.add.collider(ArcherPlayer, Bombs, HitBomb, null, parent);
}

function HitBomb(player, bomb) {
    //Game over
    // this.physics.pause();

    //Change color to red
    // player.setTint(0xff0000);

    player.setDisplaySize((player.displayWidth + 5), (player.displayHeight + 5));

    bomb.disableBody(true, true);

    --Score;
    // player.anims.play('turn');

    IsGameOver = true;
}
/** Enemies **/

function KeybindingConfig(parent) {
    parent.mainAttack = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    parent.jumpAlt = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

/********************************** CREATE *******************************************************/