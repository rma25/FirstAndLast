function WarriorPlayerCreate(parent, playerId, playerX, playerY) {
    //Player    
    //Add starting image of player, width, height
    var warriorPlayer = parent.physics.add.sprite(playerX, playerY, 'warrior1-idle1-right0');
    warriorPlayer.setDisplaySize(81, 81);
    warriorPlayer.setCollideWorldBounds(true);
    warriorPlayer.body.setGravityY(450);

    //Set original player size
    OriginalPlayerWidth = warriorPlayer.displayWidth;
    OriginalPlayerHeight = warriorPlayer.displayHeight;

    CreateWarriorAnimations(parent);

    if (warriorPlayer != null && warriorPlayer != undefined) {
        game.WarriorParticles = parent.add.particles('fire3');
        game.WarriorEmitter = game.WarriorParticles.createEmitter();
        game.WarriorEmitter.setPosition(warriorPlayer.x, warriorPlayer.y + (warriorPlayer.displayHeight / 2));
        game.WarriorEmitter.setSpeed(100);
        game.WarriorEmitter.setScale(0.05, 0.05);
        game.WarriorEmitter.setAlpha(1, 0, 3000);
        game.WarriorEmitter.maxParticles = 10;
        game.WarriorEmitter.on = false;
    }

    //Allows the player to collide with the platforms
    parent.physics.add.collider(warriorPlayer, Platforms);

    //Only this group will collide with each other
    // parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    // parent.physics.add.overlap(WarriorPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(warriorPlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(warriorPlayer, StrengthBuff, CollectStrengthBuff, null, parent);

    return warriorPlayer;
}

function CreateWarriorAnimations(parent) {
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

    //Frames
    for (var i = 0; i <= 14; i++) {
        attack1FramesLeft.push({ key: 'warrior1-attack1-left' + i });
        attack1FramesRight.push({ key: 'warrior1-attack1-right' + i });
        attack1FramesLeft2.push({ key: 'warrior2-attack1-left' + i });
        attack1FramesRight2.push({ key: 'warrior2-attack1-right' + i });
    }

    if (!parent.anims.get('warrior1-attack1-left'))
        //TODO: Need to fix warrior 1 - attack1 going through collision animation
        parent.anims.create({
            key: 'warrior1-attack1-left',
            frames: attack1FramesLeft,
            frameRate: 18,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-attack1-right'))
        parent.anims.create({
            key: 'warrior1-attack1-right',
            frames: attack1FramesRight,
            frameRate: 18,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-attack1-left'))
        parent.anims.create({
            key: 'warrior2-attack1-left',
            frames: attack1FramesLeft2,
            frameRate: 18,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-attack1-right'))
        parent.anims.create({
            key: 'warrior2-attack1-right',
            frames: attack1FramesRight2,
            frameRate: 18,
            repeat: -1
        });


    for (var i = 0; i <= 14; i++) {
        attack2FramesLeft.push({ key: 'warrior1-attack2-left' + i });
        attack2FramesRight.push({ key: 'warrior1-attack2-right' + i });
        attack2FramesLeft2.push({ key: 'warrior2-attack2-left' + i });
        attack2FramesRight2.push({ key: 'warrior2-attack2-right' + i });
    }

    if (!parent.anims.get('warrior1-attack2-left'))
        parent.anims.create({
            key: 'warrior1-attack2-left',
            frames: attack2FramesLeft,
            frameRate: 18,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-attack2-right'))
        parent.anims.create({
            key: 'warrior1-attack2-right',
            frames: attack2FramesRight,
            frameRate: 18,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-attack2-left'))
        parent.anims.create({
            key: 'warrior2-attack2-left',
            frames: attack2FramesLeft2,
            frameRate: 18,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-attack2-right'))
        parent.anims.create({
            key: 'warrior2-attack2-right',
            frames: attack2FramesRight2,
            frameRate: 18,
            repeat: -1
        });

    for (var i = 0; i <= 14; i++) {
        deathFramesLeft.push({ key: 'warrior1-death-left' + i });
        deathFramesRight.push({ key: 'warrior1-death-right' + i });
        deathFramesLeft2.push({ key: 'warrior2-death-left' + i });
        deathFramesRight2.push({ key: 'warrior2-death-right' + i });
    }

    if (!parent.anims.get('warrior1-death-left'))
        parent.anims.create({
            key: 'warrior1-death-left',
            frames: deathFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-death-right'))
        parent.anims.create({
            key: 'warrior1-death-right',
            frames: deathFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-death-left'))
        parent.anims.create({
            key: 'warrior2-death-left',
            frames: deathFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-death-right'))
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

    if (!parent.anims.get('warrior1-hit-left'))
        parent.anims.create({
            key: 'warrior1-hit-left',
            frames: hitFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-hit-right'))
        parent.anims.create({
            key: 'warrior1-hit-right',
            frames: hitFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-hit-left'))
        parent.anims.create({
            key: 'warrior2-hit-left',
            frames: hitFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-hit-right'))
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

    if (!parent.anims.get('warrior1-idle2-left'))
        parent.anims.create({
            key: 'warrior1-idle2-left',
            frames: idle2FramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-idle2-right'))
        parent.anims.create({
            key: 'warrior1-idle2-right',
            frames: idle2FramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-idle2-left'))
        parent.anims.create({
            key: 'warrior2-idle2-left',
            frames: idle2FramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-idle2-right'))
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

    if (!parent.anims.get('warrior1-idle1-left'))
        parent.anims.create({
            key: 'warrior1-idle1-left',
            frames: idle1FramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-idle1-right'))
        parent.anims.create({
            key: 'warrior1-idle1-right',
            frames: idle1FramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-idle1-left'))
        parent.anims.create({
            key: 'warrior2-idle1-left',
            frames: idle1FramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-idle1-right'))
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

    if (!parent.anims.get('warrior1-jump-left'))
        parent.anims.create({
            key: 'warrior1-jump-left',
            frames: jumpFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-jump-right'))
        parent.anims.create({
            key: 'warrior1-jump-right',
            frames: jumpFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-jump-left'))
        parent.anims.create({
            key: 'warrior2-jump-left',
            frames: jumpFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-jump-right'))
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

    if (!parent.anims.get('warrior1-walk-left'))
        parent.anims.create({
            key: 'warrior1-walk-left',
            frames: walkRightFramesLeft,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('warrior1-walk-right'))
        parent.anims.create({
            key: 'warrior1-walk-right',
            frames: walkRightFramesRight,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-walk-left'))
        parent.anims.create({
            key: 'warrior2-walk-left',
            frames: walkRightFramesLeft2,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('warrior2-walk-right'))
        parent.anims.create({
            key: 'warrior2-walk-right',
            frames: walkRightFramesRight2,
            frameRate: 15,
            repeat: -1
        });
}


function WarriorCollision(parent) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(WarriorPlayer, Platforms);

    //Only this group will collide with each other
    // parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    // parent.physics.add.overlap(WarriorPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(WarriorPlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(WarriorPlayer, StrengthBuff, CollectStrengthBuff, null, parent);
}
