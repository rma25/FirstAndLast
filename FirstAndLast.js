/********************************** GLOBAL *******************************************************/
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var centerWidth = (windowWidth / 2);
var centerHeight = (windowHeight / 2);
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var bombs;
var groundHeight = 64;
var groundWidth = 64;
var IsGameOver = false;
var originalPlayerWidth = 32;
var originalPlayerHeight = 48;
var bgImage;
var bgMusic;
var IsMainPlayerFacingLeft = false;
var arrows;
var lasers;
var speedBuff;
var DoesPlayerHasSpeedBuff = false;
var strengthBuff;
var DoesPlayerHasStrengthBuff = false;
var grassGroundHeight = 27;
var grassGroundWidth = 87;
var speedRockWidth = 111;
var speedRockHeight = 100;
var strengthRockWidth = 109;
var strengthRockHeight = 98;
var firstHeight = (centerHeight + 300);
var secondHeight = (centerHeight + (groundHeight * 1.5));
var thirdHeight = (centerHeight / 2);
var idlePlayerAnimation;

var config = {
    type: Phaser.AUTO,
    width: windowWidth,
    height: windowHeight,
    physics: {
        //Simple and light weight, good for mobile
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

/********************************** GLOBAL *******************************************************/

/********************************** PRELOAD *******************************************************/

//Phaser will automatically look for this function when it starts and load anything defined within it
function preload() {
    //Sky, ground, etc, is the link in the code when creating game objects    
    this.load.image('background', './Assets/unity3d-assets/TooCubeForest/backgrounds/BG_cave2_1024.png');
    this.load.image('star', './Assets/images/star.png');
    this.load.image('bomb', './Assets/images/green-orb-collect.png');
    this.load.spritesheet('dude',
        './Assets/images/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    this.load.spritesheet('ground',
        './Assets/unity3d-assets/TooCubeForest/images/Forest_terrain_red_128px.png',
        { frameWidth: 64, frameHeight: 64 }
    );

    this.load.image('floatingGround1', './Assets/unity3d-assets/TooCubeForest/images/Forest_deco_covers(spring)-1.png');

    //Load animated plants
    for (var i = 0; i <= 60; i++) {
        this.load.image('alg' + i, './Assets/unity3d-assets/2D-Handcrafted-Art/Sprite/Alg2/Algae1-animation_' + i + '.png');
    }

    //Load sprites for Main Player
    MainPlayerLoad(this);

    //Buff
    BuffsLoad(this);

    //Audio
    this.load.audio('collectingSound', './Assets/phaser-assets/audio/SoundEffects/p-ping.mp3');
    this.load.audio('jump', './Assets/audio/bounce.wav');
    this.load.audio('gameMusic', './Assets/audio/Pamgaea.ogg');
    this.load.audio('speedBuffSound', './Assets/phaser-assets/audio/SoundEffects/pickup.wav');
    this.load.audio('strengthBuffSound', './Assets/phaser-assets/audio/SoundEffects/door_open.wav');
}

function BuffsLoad(parent) {
    parent.load.image('speedBuff', './Assets/unity3d-assets/TooCubeForest/images/rock-speed-buff.png');
    parent.load.image('strengthBuff', './Assets/unity3d-assets/TooCubeForest/images/rock-strength-buff.png');
}

function MainPlayerLoad(parent) {
    //Load animated plants

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-attack1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'left.png');
        parent.load.image('mainplayer-attack1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-attack2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'left.png');
        parent.load.image('mainplayer-attack2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-death-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'left.png');
        parent.load.image('mainplayer-death-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 4; i++) {
        parent.load.image('mainplayer-hit-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'left.png');
        parent.load.image('mainplayer-hit-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'right.png');
    }

    for (var i = 0; i <= 29; i++) {
        parent.load.image('mainplayer-idle2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'left.png');
        parent.load.image('mainplayer-idle2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-idle1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'left.png');
        parent.load.image('mainplayer-idle1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 12; i++) {
        parent.load.image('mainplayer-jump-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'left.png');
        parent.load.image('mainplayer-jump-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-walk-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'left.png');
        parent.load.image('mainplayer-walk-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'right.png');
    }

    parent.load.image('arrow-left', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-left.png');
    parent.load.image('arrow-right', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-right.png');
}
/********************************** PRELOAD *******************************************************/

/********************************** CREATE *******************************************************/
function create() {
    Platform(this);
    Player(this);
    ItemsToCollect(this);
    ScoreDisplay(this);
    Enemy(this);
    SpecialAttackKeys(this);
    Collision(this);
    GameSounnd(this);
    // Arrow(this);
}

function Collision(parent) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(player, platforms);

    //Only this group will collide with each other
    parent.physics.add.collider(stars, platforms);

    //Allow player to overlap with a star
    parent.physics.add.overlap(player, stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(speedBuff, platforms);
    parent.physics.add.overlap(player, speedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(strengthBuff, platforms);
    parent.physics.add.overlap(player, strengthBuff, CollectStrengthBuff, null, parent);
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

    parent.add.sprite((centerWidth / 3), windowHeight - algHeight, 'alg0').play('liveAlg');
    parent.add.sprite(centerWidth, windowHeight - algHeight, 'alg0').play('liveAlg');
    parent.add.sprite((centerWidth + (algWidth * 5)), windowHeight - algHeight, 'alg0').play('liveAlg');
    parent.add.sprite((centerWidth + (algWidth * 13)), windowHeight - algHeight, 'alg0').play('liveAlg');
}

function Platform(parent) {

    bgImage = parent.add.image(0, 0, 'background');
    bgImage.setOrigin(0, 0);
    bgImage.setDisplaySize(windowWidth, windowHeight);

    //Platform (where user walks on)
    platforms = parent.physics.add.staticGroup();

    LiveBackground(parent);

    //Main ground        
    for (var i = 0; i <= (windowWidth + groundWidth);) {
        platforms.create(i, windowHeight - 33, 'ground');
        i += groundWidth;
    }

    //Place to jump on (From the center)
    platforms.create(centerWidth, centerHeight, 'ground');
    platforms.create((centerWidth - groundWidth), centerHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 2)), centerHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 5)), centerHeight, 'ground');
    platforms.create((centerWidth + groundWidth), (centerHeight + groundHeight), 'ground');
    platforms.create((centerWidth + (groundWidth * 2)), secondHeight, 'ground');
    platforms.create((centerWidth + (groundWidth * 3)), secondHeight + 20, 'ground');

    /*First floor*/
    //Left
    platforms.create(centerWidth - (grassGroundWidth), firstHeight, 'floatingGround1');
    platforms.create(centerWidth - (grassGroundWidth * 2), firstHeight, 'floatingGround1');
    platforms.create(centerWidth, firstHeight, 'floatingGround1');
    //Right    
    platforms.create(centerWidth + grassGroundWidth, firstHeight, 'floatingGround1');
    platforms.create(centerWidth + (grassGroundWidth * 2), firstHeight, 'floatingGround1');
    platforms.create(centerWidth + (grassGroundWidth * 3), firstHeight, 'floatingGround1');
    platforms.create(centerWidth + (grassGroundWidth * 4), firstHeight, 'floatingGround1');
    /***************/

    /*Second floor*/
    //Right
    platforms.create(centerWidth + (grassGroundWidth * 7), (secondHeight + (grassGroundHeight * 1.5)), 'floatingGround1');
    platforms.create(centerWidth + (grassGroundWidth * 6), (secondHeight + (grassGroundHeight * 1.5)), 'floatingGround1');
    platforms.create(centerWidth + (grassGroundWidth * 5), (secondHeight + (grassGroundHeight * 1.5)), 'floatingGround1');
    /***************/

    /*Third floor*/
    //left
    platforms.create((centerWidth - groundWidth), thirdHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 2)), thirdHeight + groundHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 5)), thirdHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 6)), thirdHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 7)), thirdHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 8)), thirdHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 9)), thirdHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 10)), thirdHeight, 'ground');
    /***************/
}

function GameSounnd(parent) {
    parent.sound.add('collectingSound');
    parent.sound.add('jumpSound');
    bgMusic = parent.sound.add('gameMusic');
    bgMusic.config.loop = true;

    //TODO: Uncomment this once done testing or Implement a Mute button
    bgMusic.play();
}

// function Arrow(parent) {
//     arrows = parent.add.group();
//     arrows.enableBody = true;
//     arrows.physicsBodyType = Phaser.Physics.ARCADE;
//     arrows.createMultipleCallback(30, 'arrow-right');
//     arrows.setAll('anchor.x', 0.5);
//     arrows.setAll('anchor.y', 1);
//     arrows.setAll('outOfBoundsKill', true);
//     arrows.setAll('checkWorldBounds', true);
// }

// function FireArrow() {
//     //  To avoid them being allowed to fire too fast we set a time limit
//     if (game.time.now > arrowTime) {
//         //  Grab the first bullet we can from the pool
//         arrow = arrows.getFirstExists(false);

//         if (arrow) {
//             //  And fire it
//             arrow.reset(player.x, player.y + 8);
//             arrow.body.velocity.y = -400;
//             arrowTime = game.time.now + 200;
//         }
//     }
// }


// function resetArrow(arrow) {
//     // Destroy the laser
//     arrow.kill();
// }

function Player(parent) {
    var attack1FramesLeft = [];
    var attack1FramesRight = [];
    var attack2FramesLeft = [];
    var attack2FramesRight = [];
    var deathFramesLeft = [];
    var deathFramesRight = [];
    var hitFramesLeft = [];
    var hitFramesRight = [];
    var idle2FramesLeft = [];
    var idle2FramesRight = [];
    var idle1FramesLeft = [];
    var idle1FramesRight = [];
    var jumpFramesLeft = [];
    var jumpFramesRight = [];
    var walkRightFramesLeft = [];
    var walkRightFramesRight = [];

    //Player
    // player = parent.physics.add.sprite(100, windowHeight - 250, 'dude');    
    //Add starting image of player, width, height
    player = parent.physics.add.sprite(100, (windowHeight - groundHeight - 81), 'mainplayer-idle1-left0');
    player.setDisplaySize(81, 81);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(400);

    //Set original player size
    originalPlayerWidth = player.displayWidth;
    originalPlayerHeight = player.displayHeight;

    //Frames
    for (var i = 0; i <= 14; i++) {
        attack1FramesLeft.push({ key: 'mainplayer-attack1-left' + i });
        attack1FramesRight.push({ key: 'mainplayer-attack1-right' + i });
    }

    parent.anims.create({
        key: 'attack1-left',
        frames: attack1FramesLeft,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'attack1-right',
        frames: attack1FramesRight,
        frameRate: 15,
        repeat: -1
    });

    for (var i = 0; i <= 14; i++) {
        attack2FramesLeft.push({ key: 'mainplayer-attack2-left' + i });
        attack2FramesRight.push({ key: 'mainplayer-attack2-right' + i });
    }

    parent.anims.create({
        key: 'attack2-left',
        frames: attack2FramesLeft,
        frameRate: 15,
        repeat: -1
    });

    parent.anims.create({
        key: 'attack2-right',
        frames: attack2FramesRight,
        frameRate: 15,
        repeat: -1
    });

    for (var i = 0; i <= 14; i++) {
        deathFramesLeft.push({ key: 'mainplayer-death-left' + i });
        deathFramesRight.push({ key: 'mainplayer-death-right' + i });
    }

    parent.anims.create({
        key: 'death-left',
        frames: deathFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'death-right',
        frames: deathFramesRight,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 4; i++) {
        hitFramesLeft.push({ key: 'mainplayer-hit-left' + i });
        hitFramesRight.push({ key: 'mainplayer-hit-right' + i });
    }

    parent.anims.create({
        key: 'hit-left',
        frames: hitFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'hit-right',
        frames: hitFramesRight,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 29; i++) {
        idle2FramesLeft.push({ key: 'mainplayer-idle2-left' + i });
        idle2FramesRight.push({ key: 'mainplayer-idle2-right' + i });
    }

    parent.anims.create({
        key: 'idle2-left',
        frames: idle2FramesLeft,
        frameRate: 10,
        repeat: 1
    });

    parent.anims.create({
        key: 'idle2-right',
        frames: idle2FramesRight,
        frameRate: 10,
        repeat: 1
    });

    for (var i = 0; i <= 14; i++) {
        idle1FramesLeft.push({ key: 'mainplayer-idle1-left' + i });
        idle1FramesRight.push({ key: 'mainplayer-idle1-right' + i });
    }

    parent.anims.create({
        key: 'idle1-left',
        frames: idle1FramesLeft,
        frameRate: 10,
        repeat: 1
    });

    parent.anims.create({
        key: 'idle1-right',
        frames: idle1FramesRight,
        frameRate: 10,
        repeat: 1
    });

    for (var i = 0; i <= 12; i++) {
        jumpFramesLeft.push({ key: 'mainplayer-jump-left' + i });
        jumpFramesRight.push({ key: 'mainplayer-jump-right' + i });
    }

    parent.anims.create({
        key: 'jump-left',
        frames: jumpFramesLeft,
        frameRate: 10,
        repeat: -1
    });

    parent.anims.create({
        key: 'jump-right',
        frames: jumpFramesRight,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 14; i++) {
        walkRightFramesLeft.push({ key: 'mainplayer-walk-left' + i });
        walkRightFramesRight.push({ key: 'mainplayer-walk-right' + i });
    }

    parent.anims.create({
        key: 'walk-left',
        frames: walkRightFramesLeft,
        frameRate: 10,
        repeat: -1
    });

    parent.anims.create({
        key: 'walk-right',
        frames: walkRightFramesRight,
        frameRate: 10,
        repeat: -1
    });

    idlePlayerAnimation = player.anims.play('idle2-right');
}

/** Collection **/
function ItemsToCollect(parent) {

    stars = parent.physics.add.group({
        key: 'star',
        repeat: (Math.round(windowWidth / 100) + 1), //Total (1 default + 11)
        setXY: { x: 12, y: 0, stepX: 100 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });

    speedBuff = parent.physics.add.group({
        key: 'speedBuff',
        setXY: { x: (windowWidth - speedRockWidth), y: (windowHeight - speedRockHeight - 20) }
    });

    centerWidth + (grassGroundWidth * 6), (secondHeight + (grassGroundHeight * 1.5))
    strengthBuff = parent.physics.add.group({
        key: 'strengthBuff',
        setXY: { x: centerWidth + (grassGroundWidth * 6), y: (secondHeight + (grassGroundHeight * 1.5)) - strengthRockHeight }
    });
}

function CollectStar(player, star) {
    //Makes the star disappear-
    star.disableBody(true, true);

    game.sound.play('collectingSound');

    //Update Score
    scoreText.setText('Score: ' + (++score));

    //Respawn the items to collect
    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }

    //Activate enemies
    if (stars.countActive(true) <= 0) {
        var x = (player.x < 400) ? Phaser.Math.Between(400, centerWidth) : Phaser.Math.Between(10, centerWidth);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

function CollectSpeedBuff(player, buff) {
    buff.disableInteractive();
    if (!DoesPlayerHasSpeedBuff) {
        game.sound.play('speedBuffSound');
    }
    DoesPlayerHasSpeedBuff = true;
}

function CollectStrengthBuff(player, buff) {
    buff.disableInteractive();
    if (!DoesPlayerHasStrengthBuff) {
        game.sound.play('strengthBuffSound');
    }
    DoesPlayerHasStrengthBuff = true;
}
/** Collection **/

/** Display **/
function ScoreDisplay(parent) {
    scoreText = parent.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
}
/** Display **/

/** Enemies **/
function Enemy(parent) {
    //TODO: Fix this
    bombs = parent.physics.add.group();

    parent.physics.add.collider(bombs, platforms);

    parent.physics.add.collider(player, bombs, HitBomb, null, parent);
}

function HitBomb(player, bomb) {
    //Game over
    // this.physics.pause();

    //Change color to red
    // player.setTint(0xff0000);

    player.setDisplaySize((player.displayWidth + 5), (player.displayHeight + 5));

    bomb.disableBody(true, true);

    --score;
    // player.anims.play('turn');

    IsGameOver = true;
}
/** Enemies **/

function SpecialAttackKeys(parent) {
    parent.specialAttack = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    parent.jumpAlt = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

/********************************** CREATE *******************************************************/

/********************************** UPDATE *******************************************************/
function update() {
    Controller(this);
    GameOver(this);
}

function Controller(parent) {
    cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver) {
        //Player Left
        if (cursors.left.isDown) {
            IsMainPlayerFacingLeft = true;

            if (DoesPlayerHasSpeedBuff) {
                player.setVelocityX(-300);
            }
            else {
                player.setVelocityX(-190);
            }

            player.anims.play('walk-left', true);
        }
        //Player Right
        else if (cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;

            if (DoesPlayerHasSpeedBuff) {
                player.setVelocityX(300);
            }
            else {
                player.setVelocityX(190);
            }
            player.anims.play('walk-right', true);
        }
        //Player Not Moving
        else {
            //Stop moving
            player.setVelocityX(0);

            //Special Attack, change Size
            if (parent.specialAttack.isDown) {
                if (IsMainPlayerFacingLeft) {
                    var attacking1 = player.anims.play('attack1-left', true);
                    if (!attacking1.isPlaying) {
                        //FireArrow();
                        console.log('Done Loading Arrow Left - On the Ground');
                    }
                }
                else {
                    player.anims.play('attack1-right', true);
                    // if (idlePlayerAnimation.isPlaying) {
                    //     //FireArrow();
                    //     console.log('Playing - Loading Arrow right');

                    // }
                    // else {
                    //     console.log('Not Playing - Loading Arrow Right');
                    //     player.anims.play('attack2-right', true);
                    // }
                }
            }
            else if (IsMainPlayerFacingLeft && player.body.touching.down && !player.body.isMoving) {
                player.anims.play('idle2-left', true);
            }
            else if (!IsMainPlayerFacingLeft && player.body.touching.down && !player.body.isMoving) {
                player.anims.play('idle2-right', true);
            }
        }

        //Player Jump
        if ((cursors.up.isDown || parent.jumpAlt.isDown) && player.body.touching.down) {
            //Although I know I could use a ternary operator, I plan on adding more to these statements
            if (DoesPlayerHasStrengthBuff) {
                player.setVelocityY(-670);
            }
            else {
                player.setVelocityY(-550);
            }

            if (IsMainPlayerFacingLeft) {
                player.anims.play('jump-left', true);
            }
            else {
                player.anims.play('jump-right', true);
            }

            //Jumping sound
            game.sound.play('jump');
        }
    }
}

/** GAME OVER **/
function GameOver(parent) {
    if (IsGameOver) {

    }
}
/** GAME OVER **/
/********************************** UPDATE *******************************************************/