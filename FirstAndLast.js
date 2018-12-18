/********************************** GLOBAL *******************************************************/
var WindowHeight = window.innerHeight;
var WindowWidth = window.innerWidth;
var CenterWidth = (WindowWidth / 2);
var CenterHeight = (WindowHeight / 2);
var Platforms;
var Cursors;
var Stars;
var Score = 0;
var ScoreText;
var Bombs;
var GroundHeight = 64;
var GroundWidth = 64;
var IsGameOver = false;
var OriginalPlayerWidth = 32;
var OriginalPlayerHeight = 48;
var BgImage;
var BgMusic;
var IsMainPlayerFacingLeft = false;
var ArrowsRight;
var ArrowsLeft;
var SpeedBuff;
var StrengthBuff;
var DoesPlayerHasSpeedBuff = false;
var DoesPlayerHasStrengthBuff = false;
var GrassGroundHeight = 27;
var GrassGroundWidth = 87;
/*Archer */
var IsArrowShot = false;
var ArcherPlayer;
var ArcherEmitter;
var ArcherParticles;
var DidArcherAttackOnce = false;
/*Warrior*/
var DidWarriorAttack = false;
var WarriorPlayer;
var WarriorEmitter;
var WarriorParticles;
var DidWarriorAttackOnce = false;

var config = {
    type: Phaser.AUTO,
    width: WindowWidth,
    height: WindowHeight,
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
    BackgroundLoad(this);

    //Particles
    ParticlesLoad(this);

    //Load sprites for Main Player
    ArcherPlayerLoad(this);

    WarriorPlayerLoad(this);

    //Buff
    BuffsLoad(this);

    //Audio
    Audio(this)
}

function BackgroundLoad(parent) {
    //Sky, ground, etc, is the link in the code when creating game objects    
    parent.load.image('background', './Assets/unity3d-assets/TooCubeForest/backgrounds/BG_cave2_1024.png');
    parent.load.image('star', './Assets/images/star.png');

    parent.load.spritesheet('ground',
        './Assets/unity3d-assets/TooCubeForest/images/Forest_terrain_red_128px.png',
        { frameWidth: 64, frameHeight: 64 }
    );

    parent.load.image('floatingGround1', './Assets/unity3d-assets/TooCubeForest/images/Forest_deco_covers(spring)-1.png');

    //Load animated plants
    for (var i = 0; i <= 60; i++) {
        parent.load.image('alg' + i, './Assets/unity3d-assets/2D-Handcrafted-Art/Sprite/Alg2/Algae1-animation_' + i + '.png');
    }
}

function ParticlesLoad(parent) {
    //TODO: Replace phaser-assets with other graphics    
    parent.load.image('fire3', './Assets/phaser-assets/particles/fire3.png');
}

function Audio(parent) {
    parent.load.audio('collectingSound', './Assets/phaser-assets/audio/SoundEffects/p-ping.mp3');
    parent.load.audio('jump', './Assets/audio/bounce.wav');
    parent.load.audio('gameMusic', './Assets/unity3d-assets/2D-Handcrafted-Art/Music/Tropical moments - loop version.wav');
    parent.load.audio('speedBuffSound', './Assets/phaser-assets/audio/SoundEffects/pickup.wav');
    parent.load.audio('strengthBuffSound', './Assets/phaser-assets/audio/SoundEffects/door_open.wav');
    parent.load.audio('shootingArrow', './Assets/unity3d-assets/BowAndArrow/Sounds/ArrowShoosh2.mp3');
    parent.load.audio('arrowHit', './Assets/unity3d-assets/BowAndArrow/Sounds/ArrowImpactTarget.mp3');
}

function BuffsLoad(parent) {
    parent.load.image('speedBuff', './Assets/unity3d-assets/TooCubeForest/images/rock-speed-buff.png');
    parent.load.image('strengthBuff', './Assets/unity3d-assets/TooCubeForest/images/rock-strength-buff.png');
}

function ArcherPlayerLoad(parent) {
    parent.load.image('arrow-right', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-right.png');
    parent.load.image('arrow-left', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-left.png');

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-attack1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'left.png');
        parent.load.image('mainplayer-attack1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-attack1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack1_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-attack1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack1_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-attack2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'left.png');
        parent.load.image('mainplayer-attack2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-attack2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack2_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-attack2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-death-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'left.png');
        parent.load.image('mainplayer-death-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-death-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Death_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-death-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 4; i++) {
        parent.load.image('mainplayer-hit-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'left.png');
        parent.load.image('mainplayer-hit-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-hit-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Hit_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-hit-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Hit_' + i + 'right.png');
    }

    for (var i = 0; i <= 29; i++) {
        parent.load.image('mainplayer-idle2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'left.png');
        parent.load.image('mainplayer-idle2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-idle2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Idle2_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-idle2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Idle2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-idle1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'left.png');
        parent.load.image('mainplayer-idle1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-idle1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_idle_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-idle1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 12; i++) {
        parent.load.image('mainplayer-jump-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'left.png');
        parent.load.image('mainplayer-jump-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-jump-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Jump_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-jump-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Jump_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('mainplayer-walk-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'left.png');
        parent.load.image('mainplayer-walk-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'right.png');
        parent.load.image('archer2-mainplayer-walk-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_walk_' + i + 'left.png');
        parent.load.image('archer2-mainplayer-walk-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_walk_' + i + 'right.png');
    }

    parent.load.image('arrow-left', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-left.png');
    parent.load.image('arrow-right', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-right.png');
}

function WarriorPlayerLoad(parent) {

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-attack1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack1_' + i + 'left.png');
        parent.load.image('warrior1-attack1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack1_' + i + 'right.png');
        parent.load.image('warrior2-attack1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack1_' + i + 'left.png');
        parent.load.image('warrior2-attack1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack1_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-attack2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack2_' + i + 'left.png');
        parent.load.image('warrior1-attack2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack2_' + i + 'right.png');
        parent.load.image('warrior2-attack2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_' + i + 'left.png');
        parent.load.image('warrior2-attack2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-death-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Death_' + i + 'left.png');
        parent.load.image('warrior1-death-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Death_' + i + 'right.png');
        parent.load.image('warrior2-death-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Death_' + i + 'left.png');
        parent.load.image('warrior2-death-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 4; i++) {
        parent.load.image('warrior1-hit-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Hit_' + i + 'left.png');
        parent.load.image('warrior1-hit-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Hit_' + i + 'right.png');
        parent.load.image('warrior2-hit-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Hit_' + i + 'left.png');
        parent.load.image('warrior2-hit-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Hit_' + i + 'right.png');
    }

    for (var i = 0; i <= 29; i++) {
        parent.load.image('warrior1-idle2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Idle2_' + i + 'left.png');
        parent.load.image('warrior1-idle2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Idle2_' + i + 'right.png');
        parent.load.image('warrior2-idle2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Idle2_' + i + 'left.png');
        parent.load.image('warrior2-idle2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Idle2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-idle1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_idle_' + i + 'left.png');
        parent.load.image('warrior1-idle1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_idle_' + i + 'right.png');
        parent.load.image('warrior2-idle1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_idle_' + i + 'left.png');
        parent.load.image('warrior2-idle1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 12; i++) {
        parent.load.image('warrior1-jump-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Jump_' + i + 'left.png');
        parent.load.image('warrior1-jump-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Jump_' + i + 'right.png');
        parent.load.image('warrior2-jump-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Jump_' + i + 'left.png');
        parent.load.image('warrior2-jump-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Jump_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-walk-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_walk_' + i + 'left.png');
        parent.load.image('warrior1-walk-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_walk_' + i + 'right.png');
        parent.load.image('warrior2-walk-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_walk_' + i + 'left.png');
        parent.load.image('warrior2-walk-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_walk_' + i + 'right.png');
    }
}
/********************************** PRELOAD *******************************************************/

/********************************** CREATE *******************************************************/
function create() {
    Platform(this);
    // ArcherPlayerCreate(this);
    // PlayerArrow(this);
    WarriorPlayerCreate(this);
    ItemsToCollect(this);
    ScoreDisplay(this);
    //TODO: Implement this later
    // Enemy(this);
    SpecialAttackKeys(this);
    Collision(this);
    GameSound(this);
    ParticlesEffect(this);
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

}

function Collision(parent) {
    if (ArcherPlayer != null && ArcherPlayer != undefined) {
        ArcherCollision(parent);
    }

    if (WarriorPlayer != null && WarriorPlayer != undefined) {
        WarriorCollision(parent);
    }
}

function ArcherCollision(parent) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(ArcherPlayer, Platforms);

    //Only this group will collide with each other
    parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    parent.physics.add.overlap(ArcherPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(ArcherPlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(ArcherPlayer, StrengthBuff, CollectStrengthBuff, null, parent);

    parent.physics.add.collider(ArrowsRight, Platforms, CollideWithArrow, null, parent);
    parent.physics.add.collider(ArrowsLeft, Platforms, CollideWithArrow, null, parent);
}

function WarriorCollision(parent) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(WarriorPlayer, Platforms);

    //Only this group will collide with each other
    parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    parent.physics.add.overlap(WarriorPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(WarriorPlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(WarriorPlayer, StrengthBuff, CollectStrengthBuff, null, parent);
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

    //TODO: Uncomment this once done testing or Implement a Mute button
    // bgMusic.play();
}

function ArcherPlayerCreate(parent) {
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
    var attack1FramesLeft2 = [];
    var attack1FramesRight2 = [];
    var attack2FramesLeft2 = [];
    var attack2FramesRight2 = [];
    var deathFramesLeft2 = [];
    var deathFramesRight2 = [];
    var hitFramesLeft2 = [];
    var hitFramesRight2 = [];
    var idle2FramesLeft2 = [];
    var idle2FramesRight2 = [];
    var idle1FramesLeft2 = [];
    var idle1FramesRight2 = [];
    var jumpFramesLeft2 = [];
    var jumpFramesRight2 = [];
    var walkRightFramesLeft2 = [];
    var walkRightFramesRight2 = [];

    //Player    
    //Add starting image of player, width, height
    ArcherPlayer = parent.physics.add.sprite(100, (WindowHeight - GroundHeight - 91), 'mainplayer-idle1-left0');
    ArcherPlayer.setDisplaySize(81, 81);
    ArcherPlayer.setBounce(0.2);
    ArcherPlayer.setCollideWorldBounds(true);
    ArcherPlayer.body.setGravityY(400);

    //Set original player size
    OriginalPlayerWidth = ArcherPlayer.displayWidth;
    OriginalPlayerHeight = ArcherPlayer.displayHeight;

    //Frames
    for (var i = 0; i <= 14; i++) {
        attack1FramesLeft.push({ key: 'mainplayer-attack1-left' + i });
        attack1FramesRight.push({ key: 'mainplayer-attack1-right' + i });
        attack1FramesLeft2.push({ key: 'archer2-mainplayer-attack1-left' + i });
        attack1FramesRight2.push({ key: 'archer2-mainplayer-attack1-right' + i });
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
    parent.anims.create({
        key: 'archer2-attack1-left',
        frames: attack1FramesLeft2,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'archer2-attack1-right',
        frames: attack1FramesRight2,
        frameRate: 15,
        repeat: -1
    });


    for (var i = 0; i <= 14; i++) {
        attack2FramesLeft.push({ key: 'mainplayer-attack2-left' + i });
        attack2FramesRight.push({ key: 'mainplayer-attack2-right' + i });
        attack2FramesLeft2.push({ key: 'archer2-mainplayer-attack2-left' + i });
        attack2FramesRight2.push({ key: 'archer2-mainplayer-attack2-right' + i });
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
    parent.anims.create({
        key: 'archer2-attack2-left',
        frames: attack2FramesLeft2,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'archer2-attack2-right',
        frames: attack2FramesRight2,
        frameRate: 15,
        repeat: -1
    });

    for (var i = 0; i <= 14; i++) {
        deathFramesLeft.push({ key: 'mainplayer-death-left' + i });
        deathFramesRight.push({ key: 'mainplayer-death-right' + i });
        deathFramesLeft2.push({ key: 'archer2-mainplayer-death-left' + i });
        deathFramesRight2.push({ key: 'archer2-mainplayer-death-right' + i });
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
    parent.anims.create({
        key: 'archer2-death-left',
        frames: deathFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'archer2-death-right',
        frames: deathFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 4; i++) {
        hitFramesLeft.push({ key: 'mainplayer-hit-left' + i });
        hitFramesRight.push({ key: 'mainplayer-hit-right' + i });
        hitFramesLeft2.push({ key: 'archer2-mainplayer-hit-left' + i });
        hitFramesRight2.push({ key: 'archer2-mainplayer-hit-right' + i });
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
    parent.anims.create({
        key: 'archer2-hit-left',
        frames: hitFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'archer2-hit-right',
        frames: hitFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 29; i++) {
        idle2FramesLeft.push({ key: 'mainplayer-idle2-left' + i });
        idle2FramesRight.push({ key: 'mainplayer-idle2-right' + i });
        idle2FramesLeft2.push({ key: 'archer2-mainplayer-idle2-left' + i });
        idle2FramesRight2.push({ key: 'archer2-mainplayer-idle2-right' + i });
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
    parent.anims.create({
        key: 'archer2-idle2-left',
        frames: idle2FramesLeft2,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'archer2-idle2-right',
        frames: idle2FramesRight2,
        frameRate: 10,
        repeat: 1
    });

    for (var i = 0; i <= 14; i++) {
        idle1FramesLeft.push({ key: 'mainplayer-idle1-left' + i });
        idle1FramesRight.push({ key: 'mainplayer-idle1-right' + i });
        idle1FramesLeft2.push({ key: 'archer2-mainplayer-idle1-left' + i });
        idle1FramesRight2.push({ key: 'archer2-mainplayer-idle1-right' + i });
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
    parent.anims.create({
        key: 'archer2-idle1-left',
        frames: idle1FramesLeft2,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'archer2-idle1-right',
        frames: idle1FramesRight2,
        frameRate: 10,
        repeat: 1
    });

    for (var i = 0; i <= 12; i++) {
        jumpFramesLeft.push({ key: 'mainplayer-jump-left' + i });
        jumpFramesRight.push({ key: 'mainplayer-jump-right' + i });
        jumpFramesLeft2.push({ key: 'archer2-mainplayer-jump-left' + i });
        jumpFramesRight2.push({ key: 'archer2-mainplayer-jump-right' + i });
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
    parent.anims.create({
        key: 'archer2-jump-left',
        frames: jumpFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'archer2-jump-right',
        frames: jumpFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 14; i++) {
        walkRightFramesLeft.push({ key: 'mainplayer-walk-left' + i });
        walkRightFramesRight.push({ key: 'mainplayer-walk-right' + i });
        walkRightFramesLeft2.push({ key: 'archer2-mainplayer-walk-left' + i });
        walkRightFramesRight2.push({ key: 'archer2-mainplayer-walk-right' + i });
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
    parent.anims.create({
        key: 'archer2-walk-left',
        frames: walkRightFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'archer2-walk-right',
        frames: walkRightFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    ArcherPlayer.anims.play('idle2-right');
}

function PlayerArrow(parent) {
    if (ArcherPlayer != null & ArcherPlayer != undefined) {

        ArrowsRight = parent.physics.add.sprite(ArcherPlayer.displayWidth, ArcherPlayer.displayHeight, 'arrow-right');
        ArrowsRight.setDisplaySize(ArrowsRight.displayWidth / 2.5, ArrowsRight.displayHeight / 2.5);
        ArrowsRight.setCollideWorldBounds(true);
        ArrowsRight.body.setGravityY(0);
        ArrowsRight.disableBody(true, true);

        ArrowsLeft = parent.physics.add.sprite(ArcherPlayer.displayWidth, ArcherPlayer.displayHeight, 'arrow-left');
        ArrowsLeft.setDisplaySize(ArrowsLeft.displayWidth / 2.5, ArrowsLeft.displayHeight / 2.5);
        ArrowsLeft.setCollideWorldBounds(true);
        ArrowsLeft.body.setGravityY(0);
        ArrowsLeft.disableBody(true, true);
    }
}

function WarriorPlayerCreate(parent) {
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
    var attack1FramesLeft2 = [];
    var attack1FramesRight2 = [];
    var attack2FramesLeft2 = [];
    var attack2FramesRight2 = [];
    var deathFramesLeft2 = [];
    var deathFramesRight2 = [];
    var hitFramesLeft2 = [];
    var hitFramesRight2 = [];
    var idle2FramesLeft2 = [];
    var idle2FramesRight2 = [];
    var idle1FramesLeft2 = [];
    var idle1FramesRight2 = [];
    var jumpFramesLeft2 = [];
    var jumpFramesRight2 = [];
    var walkRightFramesLeft2 = [];
    var walkRightFramesRight2 = [];

    //Player    
    //Add starting image of player, width, height
    WarriorPlayer = parent.physics.add.sprite(100, (WindowHeight - GroundHeight - 91), 'warrior1-idle1-left0');
    WarriorPlayer.setDisplaySize(81, 81);
    WarriorPlayer.setBounce(0.2);
    WarriorPlayer.setCollideWorldBounds(true);
    WarriorPlayer.body.setGravityY(400);

    //Set original player size
    OriginalPlayerWidth = WarriorPlayer.displayWidth;
    OriginalPlayerHeight = WarriorPlayer.displayHeight;

    //Frames
    for (var i = 0; i <= 14; i++) {
        attack1FramesLeft.push({ key: 'warrior1-attack1-left' + i });
        attack1FramesRight.push({ key: 'warrior1-attack1-right' + i });
        attack1FramesLeft2.push({ key: 'warrior2-attack1-left' + i });
        attack1FramesRight2.push({ key: 'warrior2-attack1-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-attack1-left',
        frames: attack1FramesLeft,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-attack1-right',
        frames: attack1FramesRight,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-attack1-left',
        frames: attack1FramesLeft2,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-attack1-right',
        frames: attack1FramesRight2,
        frameRate: 15,
        repeat: -1
    });


    for (var i = 0; i <= 14; i++) {
        attack2FramesLeft.push({ key: 'warrior1-attack2-left' + i });
        attack2FramesRight.push({ key: 'warrior1-attack2-right' + i });
        attack2FramesLeft2.push({ key: 'warrior2-attack2-left' + i });
        attack2FramesRight2.push({ key: 'warrior2-attack2-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-attack2-left',
        frames: attack2FramesLeft,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-attack2-right',
        frames: attack2FramesRight,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-attack2-left',
        frames: attack2FramesLeft2,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-attack2-right',
        frames: attack2FramesRight2,
        frameRate: 15,
        repeat: -1
    });

    for (var i = 0; i <= 14; i++) {
        deathFramesLeft.push({ key: 'warrior1-death-left' + i });
        deathFramesRight.push({ key: 'warrior1-death-right' + i });
        deathFramesLeft2.push({ key: 'warrior2-death-left' + i });
        deathFramesRight2.push({ key: 'warrior2-death-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-death-left',
        frames: deathFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-death-right',
        frames: deathFramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-death-left',
        frames: deathFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-death-right',
        frames: deathFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 4; i++) {
        hitFramesLeft.push({ key: 'warrior1-hit-left' + i });
        hitFramesRight.push({ key: 'warrior1-hit-right' + i });
        hitFramesLeft2.push({ key: 'warrior2-hit-left' + i });
        hitFramesRight2.push({ key: 'warrior2-hit-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-hit-left',
        frames: hitFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-hit-right',
        frames: hitFramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-hit-left',
        frames: hitFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-hit-right',
        frames: hitFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 29; i++) {
        idle2FramesLeft.push({ key: 'warrior1-idle2-left' + i });
        idle2FramesRight.push({ key: 'warrior1-idle2-right' + i });
        idle2FramesLeft2.push({ key: 'warrior2-idle2-left' + i });
        idle2FramesRight2.push({ key: 'warrior2-idle2-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-idle2-left',
        frames: idle2FramesLeft,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'warrior1-idle2-right',
        frames: idle2FramesRight,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'warrior2-idle2-left',
        frames: idle2FramesLeft2,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'warrior2-idle2-right',
        frames: idle2FramesRight2,
        frameRate: 10,
        repeat: 1
    });

    for (var i = 0; i <= 14; i++) {
        idle1FramesLeft.push({ key: 'warrior1-idle1-left' + i });
        idle1FramesRight.push({ key: 'warrior1-idle1-right' + i });
        idle1FramesLeft2.push({ key: 'warrior2-idle1-left' + i });
        idle1FramesRight2.push({ key: 'warrior2-idle1-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-idle1-left',
        frames: idle1FramesLeft,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'warrior1-idle1-right',
        frames: idle1FramesRight,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'warrior2-idle1-left',
        frames: idle1FramesLeft2,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'warrior2-idle1-right',
        frames: idle1FramesRight2,
        frameRate: 10,
        repeat: 1
    });

    for (var i = 0; i <= 12; i++) {
        jumpFramesLeft.push({ key: 'warrior1-jump-left' + i });
        jumpFramesRight.push({ key: 'warrior1-jump-right' + i });
        jumpFramesLeft2.push({ key: 'warrior2-jump-left' + i });
        jumpFramesRight2.push({ key: 'warrior2-jump-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-jump-left',
        frames: jumpFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-jump-right',
        frames: jumpFramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-jump-left',
        frames: jumpFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-jump-right',
        frames: jumpFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    for (var i = 0; i <= 14; i++) {
        walkRightFramesLeft.push({ key: 'warrior1-walk-left' + i });
        walkRightFramesRight.push({ key: 'warrior1-walk-right' + i });
        walkRightFramesLeft2.push({ key: 'warrior2-walk-left' + i });
        walkRightFramesRight2.push({ key: 'warrior2-walk-right' + i });
    }

    parent.anims.create({
        key: 'warrior1-walk-left',
        frames: walkRightFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-walk-right',
        frames: walkRightFramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-walk-left',
        frames: walkRightFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-walk-right',
        frames: walkRightFramesRight2,
        frameRate: 10,
        repeat: -1
    });

    WarriorPlayer.anims.play('warrior1-idle2-right');
}


/** Collection **/
function ItemsToCollect(parent) {
    var speedRockWidth = 111;
    var speedRockHeight = 100;
    var strengthRockWidth = 109;
    var strengthRockHeight = 98;

    Stars = parent.physics.add.group({
        key: 'star',
        repeat: (Math.round(WindowWidth / 100) + 1), //Total (1 default + 11)
        setXY: { x: 12, y: 0, stepX: 100 }
    });

    Stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });

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
    // buff.disableBody(true, true);
    buff.disableInteractive();
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
    buff.disableInteractive();
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

function SpecialAttackKeys(parent) {
    parent.mainAttack = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    parent.jumpAlt = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

/********************************** CREATE *******************************************************/

/********************************** UPDATE *******************************************************/
function update() {
    if (ArcherPlayer != null && ArcherPlayer != undefined) {
        ArcherController(this);
        ArcherParticlesOnPlayer(this);
    }

    if (WarriorPlayer != null && WarriorPlayer != undefined) {
        WarriorController(this);
        WarriorParticlesOnPlayer(this);
    }

    GameOver(this);
}

function ArcherController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && ArcherPlayer != null && ArcherPlayer != undefined) {
        //Player Left
        if (Cursors.left.isDown) {
            IsMainPlayerFacingLeft = true;
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190));
            ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'walk-left', true);
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190));
            ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'walk-right', true);
        }
        //Player Not Moving
        else {
            //Stop moving
            ArcherPlayer.setVelocityX(0);

            //Special Attack, change Size
            if (parent.mainAttack.isDown && !IsArrowShot) {

                if (IsMainPlayerFacingLeft) {
                    ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-left', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsLeft.enableBody(true, ArcherPlayer.x - 16, ArcherPlayer.y, true, true);
                        ArrowsLeft.body.setAllowRotation(true);
                        ArrowsLeft.body.setAngularVelocity(-15);
                        ArrowsLeft.body.setAngularAcceleration(-15);
                        game.sound.play('shootingArrow');

                        if (DoesPlayerHasStrengthBuff) {
                            ArrowsLeft.setVelocity(-600, -100);
                            ArrowsLeft.setAcceleration(-600, 100);
                        }
                        else {
                            ArrowsLeft.setVelocity(-400, -100);
                            ArrowsLeft.setAcceleration(-400, 100);
                        }

                        DidArcherAttackOnce = ArcherPlayer.anims.currentFrame.textureKey.includes('attack1');
                    }
                }
                else {
                    ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-right', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsRight.enableBody(true, ArcherPlayer.x + 16, ArcherPlayer.y, true, true);
                        ArrowsRight.body.setAllowRotation(true);
                        ArrowsRight.body.setAngularVelocity(15);
                        ArrowsRight.body.setAngularAcceleration(15);
                        game.sound.play('shootingArrow');

                        if (DoesPlayerHasStrengthBuff) {
                            ArrowsRight.setVelocity(600, -100);
                            ArrowsRight.setAcceleration(600, 100);
                        }
                        else {
                            ArrowsRight.setVelocity(400, -100);
                            ArrowsRight.setAcceleration(400, 100);
                        }

                        DidArcherAttackOnce = ArcherPlayer.anims.currentFrame.textureKey.includes('attack1');
                    }
                }
            }
            else if (IsMainPlayerFacingLeft && ArcherPlayer.body.touching.down && !ArcherPlayer.body.isMoving) {
                ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'idle2-left', true);
            }
            else if (!IsMainPlayerFacingLeft && ArcherPlayer.body.touching.down && !ArcherPlayer.body.isMoving) {
                ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'idle2-right', true);
            }
        }

        //Player Jump
        if ((Cursors.up.isDown || parent.jumpAlt.isDown) && ArcherPlayer.body.touching.down) {
            ArcherPlayer.setVelocityY((DoesPlayerHasStrengthBuff ? -670 : -550));
            ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'jump-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

            //Jumping sound
            game.sound.play('jump');
        }

        ArcherParticlesOnPlayer(this);
    }
}

function ArcherParticlesOnPlayer(parent) {
    ArcherEmitter.setPosition(ArcherPlayer.x, ArcherPlayer.y + (ArcherPlayer.displayHeight / 2));
}

function WarriorController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && WarriorPlayer != null && WarriorPlayer != undefined) {
        //Player Left
        if (Cursors.left.isDown) {
            IsMainPlayerFacingLeft = true;
            WarriorPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190));
            WarriorPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'warrior2-' : 'warrior1-') + 'walk-left', true);
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            WarriorPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190));
            WarriorPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'warrior2-' : 'warrior1-') + 'walk-right', true);
        }
        //Player Not Moving
        else {
            //Stop moving
            WarriorPlayer.setVelocityX(0);

            //Special Attack, change Size
            if (parent.mainAttack.isDown) {

                if (IsMainPlayerFacingLeft) {
                    WarriorPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'warrior2-' : 'warrior1-') + 'attack' + (DidWarriorAttackOnce ? 2 : 1) + '-left', true);

                    //Only attack on the last animation frame
                    if (WarriorPlayer.anims.currentFrame.index >= 13) {
                        game.sound.play('shootingArrow');

                        DidWarriorAttackOnce = WarriorPlayer.anims.currentFrame.textureKey.includes('attack1');                        
                    }
                }
                else {
                    WarriorPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'warrior2-' : 'warrior1-') + 'attack' + (DidWarriorAttackOnce ? 2 : 1) + '-right', true);

                    //Only attack on the last animation frame
                    if (WarriorPlayer.anims.currentFrame.index >= 13) {
                        //TODO: Change to match axe/sword sound
                        game.sound.play('shootingArrow');

                        DidWarriorAttackOnce = WarriorPlayer.anims.currentFrame.textureKey.includes('attack1');
                    }
                }
            }
            else if (IsMainPlayerFacingLeft && WarriorPlayer.body.touching.down && !WarriorPlayer.body.isMoving) {
                WarriorPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'warrior2-' : 'warrior1-') + 'idle2-left', true);
            }
            else if (!IsMainPlayerFacingLeft && WarriorPlayer.body.touching.down && !WarriorPlayer.body.isMoving) {
                WarriorPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'warrior2-' : 'warrior1-') + 'idle2-right', true);
            }
        }

        //Player Jump
        if ((Cursors.up.isDown || parent.jumpAlt.isDown) && WarriorPlayer.body.touching.down) {
            WarriorPlayer.setVelocityY((DoesPlayerHasStrengthBuff ? -670 : -550));
            WarriorPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'warrior2-' : 'warrior1-') + 'jump-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

            //Jumping sound
            game.sound.play('jump');
        }

        WarriorParticlesOnPlayer(this);
    }
}

function WarriorParticlesOnPlayer(parent) {
    WarriorEmitter.setPosition(WarriorPlayer.x, WarriorPlayer.y + (WarriorPlayer.displayHeight / 2));
}

/** GAME OVER **/
function GameOver(parent) {
    if (IsGameOver) {

    }
}
/** GAME OVER **/
/********************************** UPDATE *******************************************************/