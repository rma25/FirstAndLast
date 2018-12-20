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
    CheckIfPlayerIsIdle();
    MuteButton(this);
}

function PlayerIsIdle() {
    IsPlayerIdle = true;
}

function CheckIfPlayerIsIdle() {
    setInterval(PlayerIsIdle, 10000);
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
    WarriorPlayer = parent.physics.add.sprite(100, (WindowHeight - GroundHeight - 91), 'warrior1-idle1-right0');
    WarriorPlayer.setDisplaySize(81, 81);
    WarriorPlayer.setCollideWorldBounds(true);
    WarriorPlayer.body.setGravityY(450);

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

    //TODO: Need to fix warrior 1 - attack1 going through collision animation
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
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-idle2-right',
        frames: idle2FramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-idle2-left',
        frames: idle2FramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-idle2-right',
        frames: idle2FramesRight2,
        frameRate: 10,
        repeat: -1
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
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior1-idle1-right',
        frames: idle1FramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-idle1-left',
        frames: idle1FramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'warrior2-idle1-right',
        frames: idle1FramesRight2,
        frameRate: 10,
        repeat: -1
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
    // /////////////////////////////
    // //CREATE SOUND TOGGLE BUTTON
    // /////////////////////////////
    // parent.soundButton = parent.game.add.button(parent.game.world.centerX + 240, parent.game.world.centerY - 290, 'sprites', ToggleMute, parent, 'sound-icon', 'sound-icon', 'sound-icon');
    // parent.soundButton.fixedToCamera = true;
    // if (!parent.game.sound.mute) {
    //     parent.soundButton.tint = 16777215;
    // } else {
    //     parent.soundButton.tint = 16711680;
    // }
    // //////////////////////
    // //CREATE PAUSE BUTTON
    // //////////////////////
    // parent.pauseButton = parent.game.add.sprite(parent.game.world.centerX + 320, parent.game.world.centerY - 280, 'sprites', 'mute-icon');
    // parent.pauseButton.inputEnabled = true;
    // parent.pauseButton.fixedToCamera = true;
    // parent.pauseButton.events.onInputUp.add(function () {
    //     parent.game.paused = true;
    //     parent.pauseButton.tint = 16711680;
    // }, parent);
    // parent.game.input.onDown.add(function () {
    //     if (parent.game.paused) parent.game.paused = false;
    //     parent.pauseButton.tint = 16777215;
    // }, parent);
    var soundButton = parent.add.text(WindowWidth - 300, WindowHeight + 300, 'Mute Button', { fill: '#0f0' });
    soundButton.setInteractive();
}

function ToggleMute() {
    if (!this.game.sound.mute) {
        this.game.sound.mute = true;
        this.soundButton.tint = 16711680;
    } else {
        this.game.sound.mute = false;
        this.soundButton.tint = 16777215;
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

function SpecialAttackKeys(parent) {
    parent.mainAttack = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    parent.jumpAlt = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

/********************************** CREATE *******************************************************/