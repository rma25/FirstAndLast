function MagePlayerCreate(parent, playerId, playerX, playerY) {
    //Player    
    //Add starting image of player, width, height
    /*magePlayer = parent.physics.add.sprite(100, (WindowHeight - GroundHeight - 91), 'mage1-idle1-right0');*/
    var magePlayer = parent.physics.add.sprite(playerX, playerY, 'mage1-idle1-right0');
    magePlayer.setDisplaySize(71, 81);
    magePlayer.setCollideWorldBounds(true);
    magePlayer.body.setGravityY(400);

    CreateMageAnimations(parent);

    if (magePlayer != null & magePlayer != undefined) {
        game.MageMainAttack1 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage-mainattack1');
        game.MageMainAttack1.setDisplaySize(game.MageMainAttack1.displayWidth / 10, game.MageMainAttack1.displayHeight / 10);
        game.MageMainAttack1.setCollideWorldBounds(true);
        game.MageMainAttack1.body.allowGravity = false;
        game.MageMainAttack1.disableBody(true, true);
    }

    if (magePlayer != null & magePlayer != undefined) {
        game.MageSpecialAttack1 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage-specialAttack1');
        game.MageSpecialAttack1.setDisplaySize(game.MageSpecialAttack1.displayWidth / 7, game.MageSpecialAttack1.displayHeight / 7);
        game.MageSpecialAttack1.setCollideWorldBounds(true);
        game.MageSpecialAttack1.setTint('0xff9955');
        game.MageSpecialAttack1.body.allowGravity = false;
        game.MageSpecialAttack1.disableBody(true, true);
    }

    if (magePlayer != null && magePlayer != undefined) {
        game.MageParticles = parent.add.particles('fire3');
        game.MageEmitter = game.MageParticles.createEmitter();
        game.MageEmitter.setPosition(game.MageParticles.x, game.MageParticles.y + (game.MageParticles.displayHeight / 2));
        game.MageEmitter.setSpeed(100);
        game.MageEmitter.setScale(0.05, 0.05);
        game.MageEmitter.setAlpha(1, 0, 3000);
        game.MageEmitter.maxParticles = 10;
        game.MageEmitter.on = false;
    }

    //Allows the player to collide with the platforms
    parent.physics.add.collider(magePlayer, Platforms);

    //Only this group will collide with each other
    // parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    // parent.physics.add.overlap(ArcherPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(magePlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(magePlayer, StrengthBuff, CollectStrengthBuff, null, parent);

    //Attacks
    parent.physics.add.collider(game.MageMainAttack1, Platforms, CollideWithMageMainAttack1, null, parent);
    parent.physics.add.collider(game.MageSpecialAttack1, Platforms, CollideWithMageSpecialAttack1, null, parent);

    /*MageMainAttack1Create(parent);
    MageSpecialAttack1Create(parent);*/

    return magePlayer;
}

function CreateMageAnimations(parent) {
    var attack1FramesLeft = [];
    var attack1FramesRight = [];
    var attack2FramesLeft = [];
    var attack2FramesRight = [];
    var deathFramesLeft = [];
    var deathFramesRight = [];
    var hitFramesLeft = [];
    var hitFramesRight = [];
    var idle1FramesLeft = [];
    var idle1FramesRight = [];
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
    var idle1FramesLeft2 = [];
    var idle1FramesRight2 = [];
    var walkRightFramesLeft2 = [];
    var walkRightFramesRight2 = [];
    var castRightFramesRight = [];
    var castRightFramesLeft = [];
    var castRightFramesRight2 = [];
    var castRightFramesLeft2 = [];
    var cast2RightFramesRight = [];
    var cast2RightFramesLeft = [];
    var cast2RightFramesRight2 = [];
    var cast2RightFramesLeft2 = [];
    var runforwardLeft = [];
    var runforwardRight = [];
    var runforwardLeft2 = [];
    var runforwardRight2 = [];
    var mageMainAttack2 = [];


    //Frames
    for (var i = 0; i <= 20; i++) {
        attack1FramesLeft.push({ key: 'mage1-attack1-left' + i });
        attack1FramesRight.push({ key: 'mage1-attack1-right' + i });
        attack1FramesLeft2.push({ key: 'mage2-attack1-left' + i });
        attack1FramesRight2.push({ key: 'mage2-attack1-right' + i });
    }

    if (!parent.anims.get('mage1-attack1-left')) {
        parent.anims.create({
            key: 'mage1-attack1-left',
            frames: attack1FramesLeft,
            frameRate: 15,
            repeat: -1
        });
    }

    if (!parent.anims.get('mage1-attack1-right'))
        parent.anims.create({
            key: 'mage1-attack1-right',
            frames: attack1FramesRight,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-attack1-left'))
        parent.anims.create({
            key: 'mage2-attack1-left',
            frames: attack1FramesLeft2,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-attack1-right'))
        parent.anims.create({
            key: 'mage2-attack1-right',
            frames: attack1FramesRight2,
            frameRate: 15,
            repeat: -1
        });

    for (var i = 0; i <= 22; i++) {
        castRightFramesLeft.push({ key: 'mage1-cast1-left' + i });
        castRightFramesRight.push({ key: 'mage1-cast1-right' + i });
        castRightFramesLeft2.push({ key: 'mage2-cast1-left' + i });
        castRightFramesRight2.push({ key: 'mage2-cast1-right' + i });
    }

    if (!parent.anims.get('mage1-cast1-left'))
        parent.anims.create({
            key: 'mage1-cast1-left',
            frames: castRightFramesLeft,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage1-cast1-right'))
        parent.anims.create({
            key: 'mage1-cast1-right',
            frames: castRightFramesRight,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-cast1-left'))
        parent.anims.create({
            key: 'mage2-cast1-left',
            frames: castRightFramesLeft2,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-cast1-right'))
        parent.anims.create({
            key: 'mage2-cast1-right',
            frames: castRightFramesRight2,
            frameRate: 15,
            repeat: -1
        });

    for (var i = 0; i <= 17; i++) {
        cast2RightFramesLeft.push({ key: 'mage1-cast2-left' + i });
        cast2RightFramesRight.push({ key: 'mage1-cast2-right' + i });
        cast2RightFramesLeft2.push({ key: 'mage2-cast2-left' + i });
        cast2RightFramesRight2.push({ key: 'mage2-cast2-right' + i });
    }

    if (!parent.anims.get('mage1-cast2-left'))
        parent.anims.create({
            key: 'mage1-cast2-left',
            frames: cast2RightFramesLeft,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage1-cast2-right'))
        parent.anims.create({
            key: 'mage1-cast2-right',
            frames: cast2RightFramesRight,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-cast2-left'))
        parent.anims.create({
            key: 'mage2-cast2-left',
            frames: cast2RightFramesLeft2,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-cast2-right'))
        parent.anims.create({
            key: 'mage2-cast2-right',
            frames: cast2RightFramesRight2,
            frameRate: 15,
            repeat: -1
        });

    for (var i = 0; i <= 20; i++) {
        attack2FramesLeft.push({ key: 'mage1-attack2-left' + i });
        attack2FramesRight.push({ key: 'mage1-attack2-right' + i });
        attack2FramesLeft2.push({ key: 'mage2-attack2-left' + i });
        attack2FramesRight2.push({ key: 'mage2-attack2-right' + i });
    }

    if (!parent.anims.get('mage2-attack2-left'))
        parent.anims.create({
            key: 'mage1-attack2-left',
            frames: attack2FramesLeft,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage1-attack2-right'))
        parent.anims.create({
            key: 'mage1-attack2-right',
            frames: attack2FramesRight,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-attack2-left'))
        parent.anims.create({
            key: 'mage2-attack2-left',
            frames: attack2FramesLeft2,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('mage2-attack2-right'))
        parent.anims.create({
            key: 'mage2-attack2-right',
            frames: attack2FramesRight2,
            frameRate: 15,
            repeat: -1
        });

    for (var i = 0; i <= 20; i++) {
        deathFramesLeft.push({ key: 'mage1-death-left' + i });
        deathFramesRight.push({ key: 'mage1-death-right' + i });
        deathFramesLeft2.push({ key: 'mage2-death-left' + i });
        deathFramesRight2.push({ key: 'mage2-death-right' + i });
    }

    if (!parent.anims.get('mage1-death-left'))
        parent.anims.create({
            key: 'mage1-death-left',
            frames: deathFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage1-death-right'))
        parent.anims.create({
            key: 'mage1-death-right',
            frames: deathFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage2-death-left'))
        parent.anims.create({
            key: 'mage2-death-left',
            frames: deathFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage2-death-right'))
        parent.anims.create({
            key: 'mage2-death-right',
            frames: deathFramesRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 0; i <= 9; i++) {
        hitFramesLeft.push({ key: 'mage1-hit-left' + i });
        hitFramesRight.push({ key: 'mage1-hit-right' + i });
        hitFramesLeft2.push({ key: 'mage2-hit-left' + i });
        hitFramesRight2.push({ key: 'mage2-hit-right' + i });
    }

    if (!parent.anims.get('mage1-hit-left'))
        parent.anims.create({
            key: 'mage1-hit-left',
            frames: hitFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage1-hit-right'))
        parent.anims.create({
            key: 'mage1-hit-right',
            frames: hitFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage2-hit-left'))
        parent.anims.create({
            key: 'mage2-hit-left',
            frames: hitFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage2-hit-right'))
        parent.anims.create({
            key: 'mage2-hit-right',
            frames: hitFramesRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 0; i <= 17; i++) {
        idle1FramesLeft.push({ key: 'mage1-idle1-left' + i });
        idle1FramesRight.push({ key: 'mage1-idle1-right' + i });
        idle1FramesLeft2.push({ key: 'mage2-idle1-left' + i });
        idle1FramesRight2.push({ key: 'mage2-idle1-right' + i });
    }

    if (!parent.anims.get('mage1-idle1-left'))
        parent.anims.create({
            key: 'mage1-idle1-left',
            frames: idle1FramesLeft,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('mage1-idle1-right'))
        parent.anims.create({
            key: 'mage1-idle1-right',
            frames: idle1FramesRight,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('mage2-idle1-left'))
        parent.anims.create({
            key: 'mage2-idle1-left',
            frames: idle1FramesLeft2,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('mage2-idle1-right'))
        parent.anims.create({
            key: 'mage2-idle1-right',
            frames: idle1FramesRight2,
            frameRate: 10,
            repeat: 1
        });

    for (var i = 0; i <= 17; i++) {
        walkRightFramesLeft.push({ key: 'mage1-walkforward-left' + i });
        walkRightFramesRight.push({ key: 'mage1-walkforward-right' + i });
        walkRightFramesLeft2.push({ key: 'mage2-walkforward-left' + i });
        walkRightFramesRight2.push({ key: 'mage2-walkforward-right' + i });
    }

    if (!parent.anims.get('mage1-walkforward-left'))
        parent.anims.create({
            key: 'mage1-walkforward-left',
            frames: walkRightFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage1-walkforward-right'))
        parent.anims.create({
            key: 'mage1-walkforward-right',
            frames: walkRightFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage2-walkforward-left'))
        parent.anims.create({
            key: 'mage2-walkforward-left',
            frames: walkRightFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage2-walkforward-right'))
        parent.anims.create({
            key: 'mage2-walkforward-right',
            frames: walkRightFramesRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 0; i <= 15; i++) {
        runforwardLeft.push({ key: 'mage1-runforward-left' + i });
        runforwardRight.push({ key: 'mage1-runforward-right' + i });
        runforwardLeft2.push({ key: 'mage2-runforward-left' + i });
        runforwardRight2.push({ key: 'mage2-runforward-right' + i });
    }

    if (!parent.anims.get('mage1-runforward-left'))
        parent.anims.create({
            key: 'mage1-runforward-left',
            frames: runforwardLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage1-runforward-right'))
        parent.anims.create({
            key: 'mage1-runforward-right',
            frames: runforwardRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage2-runforward-left'))
        parent.anims.create({
            key: 'mage2-runforward-left',
            frames: runforwardLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('mage1-runforward-right'))
        parent.anims.create({
            key: 'mage2-runforward-right',
            frames: runforwardRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 0; i <= 8; i++) {
        mageMainAttack2.push({ key: 'mage2-mainAttack' + i });
    }

    if (!parent.anims.get('mage-mainAttack2'))
        parent.anims.create({
            key: 'mage-mainAttack2',
            frames: mageMainAttack2,
            frameRate: 10,
            repeat: -1
        });
}

function MageMainAttack1Create(parent, magePlayer) {
    if (magePlayer != null & magePlayer != undefined) {
        game.MageMainAttack1 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage-mainattack1');
        game.MageMainAttack1.setDisplaySize(game.MageMainAttack1.displayWidth / 10, game.MageMainAttack1.displayHeight / 10);
        game.MageMainAttack1.setCollideWorldBounds(true);
        game.MageMainAttack1.body.allowGravity = false;
        game.MageMainAttack1.disableBody(true, true);
    }
}

function MageSpecialAttack1Create(parent, magePlayer) {
    if (magePlayer != null & magePlayer != undefined) {
        game.MageSpecialAttack1 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage-specialAttack1');
        game.MageSpecialAttack1.setDisplaySize(game.MageSpecialAttack1.displayWidth / 7, game.MageSpecialAttack1.displayHeight / 7);
        game.MageSpecialAttack1.setCollideWorldBounds(true);
        game.MageSpecialAttack1.setTint('0xff9955');
        game.MageSpecialAttack1.body.allowGravity = false;
        game.MageSpecialAttack1.disableBody(true, true);
    }
}

function MageCollision(parent) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(magePlayer, Platforms);

    //Only this group will collide with each other
    // parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    // parent.physics.add.overlap(ArcherPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(magePlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(magePlayer, StrengthBuff, CollectStrengthBuff, null, parent);

    //Attacks
    parent.physics.add.collider(MageMainAttack1, Platforms, CollideWithMageMainAttack1, null, parent);
    parent.physics.add.collider(MageSpecialAttack1, Platforms, CollideWithMageSpecialAttack1, null, parent);
}


function CollideWithMageMainAttack1(mainAttack1, platform) {
    game.IsMageMainAttack1Used = false;
    mainAttack1.setAngle(0);
    mainAttack1.disableBody(true, true);
    //TODO: Implement Sound
    // game.sound.play('arrowHit');
}

function CollideWithMageSpecialAttack1(specialAttack1, platform) {
    game.IsMageSpecialAttack1Used = false;
    specialAttack1.setAngle(0);
    specialAttack1.disableBody(true, true);
    //TODO: Implement Sound
    // game.sound.play('arrowHit');
}
