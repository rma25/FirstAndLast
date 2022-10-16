//Main function where the archer will be created
function ArcherPlayerCreate(parent, playerId, playerX, playerY) {
    //Player    
    //Add starting image of player, width, height
    var archerPlayer = parent.physics.add.sprite(playerX, playerY, 'archer1-idle1-right0');
    archerPlayer.setDisplaySize(81, 81);
    archerPlayer.setCollideWorldBounds(true);
    archerPlayer.body.setGravityY(400);

    CreateArcherAnimations(parent);

    PlayerArrow(parent, archerPlayer);
    PlayerSpecialAttack1(parent, archerPlayer);
    ArcherParticlesEmitterCreate(parent, archerPlayer);
    ArcherCollision(parent, archerPlayer);
 
    return archerPlayer;
}

function CreateArcherAnimations(parent) {
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
    var specialAttackFrames1Left = [];
    var specialAttackFrames1Right = [];
    var specialAttackFrames2Left = [];
    var specialAttackFrames2Right = [];
    var archerSpecialAttackFrames = [];
    var archerSpecialAttack2Frames2 = [];
    var archerSpecialAttack2Frames1Right = [];
    var archerSpecialAttack2Frames1Left = [];

    //Frames
    for (var i = 0; i <= 14; i++) {
        attack1FramesLeft.push({ key: 'archer1-attack1-left' + i });
        attack1FramesRight.push({ key: 'archer1-attack1-right' + i });
        attack1FramesLeft2.push({ key: 'archer2-attack1-left' + i });
        attack1FramesRight2.push({ key: 'archer2-attack1-right' + i });
    }

    if (!parent.anims.get('archer1-attack1-left'))
        parent.anims.create({
            key: 'archer1-attack1-left',
            frames: attack1FramesLeft,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('archer1-attack1-right'))
        parent.anims.create({
            key: 'archer1-attack1-right',
            frames: attack1FramesRight,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('archer2-attack1-left'))
        parent.anims.create({
            key: 'archer2-attack1-left',
            frames: attack1FramesLeft2,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('archer2-attack1-right'))
        parent.anims.create({
            key: 'archer2-attack1-right',
            frames: attack1FramesRight2,
            frameRate: 15,
            repeat: -1
        });


    for (var i = 0; i <= 14; i++) {
        attack2FramesLeft.push({ key: 'archer1-attack2-left' + i });
        attack2FramesRight.push({ key: 'archer1-attack2-right' + i });
        attack2FramesLeft2.push({ key: 'archer2-attack2-left' + i });
        attack2FramesRight2.push({ key: 'archer2-attack2-right' + i });
    }

    if (!parent.anims.get('archer1-attack2-left'))
        parent.anims.create({
            key: 'archer1-attack2-left',
            frames: attack2FramesLeft,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('archer1-attack2-right'))
        parent.anims.create({
            key: 'archer1-attack2-right',
            frames: attack2FramesRight,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('archer2-attack2-left'))
        parent.anims.create({
            key: 'archer2-attack2-left',
            frames: attack2FramesLeft2,
            frameRate: 15,
            repeat: -1
        });

    if (!parent.anims.get('archer2-attack2-right'))
        parent.anims.create({
            key: 'archer2-attack2-right',
            frames: attack2FramesRight2,
            frameRate: 15,
            repeat: -1
        });

    for (var i = 0; i <= 14; i++) {
        deathFramesLeft.push({ key: 'archer1-death-left' + i });
        deathFramesRight.push({ key: 'archer1-death-right' + i });
        deathFramesLeft2.push({ key: 'archer2-death-left' + i });
        deathFramesRight2.push({ key: 'archer2-death-right' + i });
    }

    if (!parent.anims.get('archer1-death-left'))
        parent.anims.create({
            key: 'archer1-death-left',
            frames: deathFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer1-death-right'))
        parent.anims.create({
            key: 'archer1-death-right',
            frames: deathFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-death-left'))
        parent.anims.create({
            key: 'archer2-death-left',
            frames: deathFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-death-right'))
        parent.anims.create({
            key: 'archer2-death-right',
            frames: deathFramesRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 0; i <= 4; i++) {
        hitFramesLeft.push({ key: 'archer1-hit-left' + i });
        hitFramesRight.push({ key: 'archer1-hit-right' + i });
        hitFramesLeft2.push({ key: 'archer2-hit-left' + i });
        hitFramesRight2.push({ key: 'archer2-hit-right' + i });
    }

    if (!parent.anims.get('archer1-hit-left'))
        parent.anims.create({
            key: 'archer1-hit-left',
            frames: hitFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer1-hit-right'))
        parent.anims.create({
            key: 'archer1-hit-right',
            frames: hitFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-hit-left'))
        parent.anims.create({
            key: 'archer2-hit-left',
            frames: hitFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-hit-right'))
        parent.anims.create({
            key: 'archer2-hit-right',
            frames: hitFramesRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 0; i <= 29; i++) {
        idle2FramesLeft.push({ key: 'archer1-idle2-left' + i });
        idle2FramesRight.push({ key: 'archer1-idle2-right' + i });
        idle2FramesLeft2.push({ key: 'archer2-idle2-left' + i });
        idle2FramesRight2.push({ key: 'archer2-idle2-right' + i });
    }

    if (!parent.anims.get('archer1-idle2-left'))
        parent.anims.create({
            key: 'archer1-idle2-left',
            frames: idle2FramesLeft,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('archer1-idle2-right'))
        parent.anims.create({
            key: 'archer1-idle2-right',
            frames: idle2FramesRight,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('archer2-idle2-left'))
        parent.anims.create({
            key: 'archer2-idle2-left',
            frames: idle2FramesLeft2,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('archer2-idle2-right'))
        parent.anims.create({
            key: 'archer2-idle2-right',
            frames: idle2FramesRight2,
            frameRate: 10,
            repeat: 1
        });

    for (var i = 0; i <= 14; i++) {
        idle1FramesLeft.push({ key: 'archer1-idle1-left' + i });
        idle1FramesRight.push({ key: 'archer1-idle1-right' + i });
        idle1FramesLeft2.push({ key: 'archer2-idle1-left' + i });
        idle1FramesRight2.push({ key: 'archer2-idle1-right' + i });
    }

    if (!parent.anims.get('archer1-idle1-left'))
        parent.anims.create({
            key: 'archer1-idle1-left',
            frames: idle1FramesLeft,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('archer1-idle1-right'))
        parent.anims.create({
            key: 'archer1-idle1-right',
            frames: idle1FramesRight,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('archer2-idle1-left'))
        parent.anims.create({
            key: 'archer2-idle1-left',
            frames: idle1FramesLeft2,
            frameRate: 10,
            repeat: 1
        });

    if (!parent.anims.get('archer2-idle1-right'))
        parent.anims.create({
            key: 'archer2-idle1-right',
            frames: idle1FramesRight2,
            frameRate: 10,
            repeat: 1
        });

    for (var i = 0; i <= 12; i++) {
        jumpFramesLeft.push({ key: 'archer1-jump-left' + i });
        jumpFramesRight.push({ key: 'archer1-jump-right' + i });
        jumpFramesLeft2.push({ key: 'archer2-jump-left' + i });
        jumpFramesRight2.push({ key: 'archer2-jump-right' + i });
    }

    if (!parent.anims.get('archer1-jump-left'))
        parent.anims.create({
            key: 'archer1-jump-left',
            frames: jumpFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer1-jump-right'))
        parent.anims.create({
            key: 'archer1-jump-right',
            frames: jumpFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-jump-left'))
        parent.anims.create({
            key: 'archer2-jump-left',
            frames: jumpFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-jump-right'))
        parent.anims.create({
            key: 'archer2-jump-right',
            frames: jumpFramesRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 0; i <= 14; i++) {
        walkRightFramesLeft.push({ key: 'archer1-walk-left' + i });
        walkRightFramesRight.push({ key: 'archer1-walk-right' + i });
        walkRightFramesLeft2.push({ key: 'archer2-walk-left' + i });
        walkRightFramesRight2.push({ key: 'archer2-walk-right' + i });
    }

    if (!parent.anims.get('archer1-walk-left'))
        parent.anims.create({
            key: 'archer1-walk-left',
            frames: walkRightFramesLeft,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer1-walk-right'))
        parent.anims.create({
            key: 'archer1-walk-right',
            frames: walkRightFramesRight,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-walk-left'))
        parent.anims.create({
            key: 'archer2-walk-left',
            frames: walkRightFramesLeft2,
            frameRate: 10,
            repeat: -1
        });

    if (!parent.anims.get('archer2-walk-right'))
        parent.anims.create({
            key: 'archer2-walk-right',
            frames: walkRightFramesRight2,
            frameRate: 10,
            repeat: -1
        });

    for (var i = 7; i <= 9; i++) {
        specialAttackFrames1Left.push({ key: 'archer1-death-left' + i });
        specialAttackFrames1Right.push({ key: 'archer1-death-right' + i });
        specialAttackFrames2Left.push({ key: 'archer2-death-left' + i });
        specialAttackFrames2Right.push({ key: 'archer2-death-right' + i });
    }

    if (!parent.anims.get('archer1-specialAttack1-left'))
        parent.anims.create({
            key: 'archer1-specialAttack1-left',
            frames: specialAttackFrames1Left,
            frameRate: 3,
            repeat: -1
        });

    if (!parent.anims.get('archer1-specialAttack1-right'))
        parent.anims.create({
            key: 'archer1-specialAttack1-right',
            frames: specialAttackFrames1Right,
            frameRate: 3,
            repeat: -1
        });

    if (!parent.anims.get('archer2-specialAttack1-left'))
        parent.anims.create({
            key: 'archer2-specialAttack1-left',
            frames: specialAttackFrames2Left,
            frameRate: 3,
            repeat: -1
        });

    if (!parent.anims.get('archer2-specialAttack1-right'))
        parent.anims.create({
            key: 'archer2-specialAttack1-right',
            frames: specialAttackFrames2Right,
            frameRate: 3,
            repeat: -1
        });

    for (var j = 0; j <= 3; j++) {
        for (var i = 0; i <= 2; i++) {
            archerSpecialAttackFrames.push({ key: 'archer-specialAttack1-' + i });
        }
    }

    if (!parent.anims.get('archer-specialAttack-1'))
        parent.anims.create({
            key: 'archer-specialAttack-1',
            frames: archerSpecialAttackFrames,
            frameRate: 1,
            repeat: -1
        });

    for (var i = 0; i <= 5; i++) {
        archerSpecialAttack2Frames1Right.push({ key: 'archer-specialAttack2-' + i + 'right' });
    }

    archerSpecialAttack2Frames1Right.push({ key: 'archer-specialAttack2-5right' });
    archerSpecialAttack2Frames1Right.push({ key: 'archer-specialAttack2-5right' });
    archerSpecialAttack2Frames1Right.push({ key: 'archer-specialAttack2-5right' });

    if (!parent.anims.get('archer-specialAttack-2-0-right'))
        parent.anims.create({
            key: 'archer-specialAttack-2-0-right',
            frames: archerSpecialAttack2Frames1Right,
            frameRate: 5,
            repeat: -1
        });

    for (var i = 0; i <= 5; i++) {
        archerSpecialAttack2Frames1Left.push({ key: 'archer-specialAttack2-' + i + 'left' });
    }

    archerSpecialAttack2Frames1Left.push({ key: 'archer-specialAttack2-5left' });
    archerSpecialAttack2Frames1Left.push({ key: 'archer-specialAttack2-5left' });
    archerSpecialAttack2Frames1Left.push({ key: 'archer-specialAttack2-5left' });

    if (!parent.anims.get('archer-specialAttack-2-0-left'))
        parent.anims.create({
            key: 'archer-specialAttack-2-0-left',
            frames: archerSpecialAttack2Frames1Left,
            frameRate: 5,
            repeat: -1
        });

    for (var i = 6; i <= 7; i++) {
        archerSpecialAttack2Frames2.push({ key: 'archer-specialAttack2-' + i + 'ball' });
    }

    if (!parent.anims.get('archer-specialAttack-2-1'))
        parent.anims.create({
            key: 'archer-specialAttack-2-1',
            frames: archerSpecialAttack2Frames2,
            frameRate: 4,
            repeat: -1
        });

}

function PlayerArrow(parent, archerPlayer) {
    if (archerPlayer != null & archerPlayer != undefined) {

        game.ArrowsRight = parent.physics.add.sprite(archerPlayer.displayWidth, archerPlayer.displayHeight, 'arrow-right');
        game.ArrowsRight.setDisplaySize(game.ArrowsRight.displayWidth / 2.5, game.ArrowsRight.displayHeight / 2.5);
        game.ArrowsRight.setCollideWorldBounds(true);
        game.ArrowsRight.body.setGravityY(0);
        game.ArrowsRight.disableBody(true, true);

        game.ArrowsLeft = parent.physics.add.sprite(archerPlayer.displayWidth, archerPlayer.displayHeight, 'arrow-left');
        game.ArrowsLeft.setDisplaySize(game.ArrowsLeft.displayWidth / 2.5, game.ArrowsLeft.displayHeight / 2.5);
        game.ArrowsLeft.setCollideWorldBounds(true);
        game.ArrowsLeft.body.setGravityY(0);
        game.ArrowsLeft.disableBody(true, true);
    }
}

function PlayerSpecialAttack1(parent, archerPlayer) {
    if (archerPlayer != null && archerPlayer != undefined) {
        game.ArcherSpecialAttack1 = parent.physics.add.sprite(archerPlayer.displayWidth, archerPlayer.displayHeight, 'archer-specialAttack1-0');
        game.ArcherSpecialAttack1.setDisplaySize(game.ArcherSpecialAttack1.displayWidth / 5, game.ArcherSpecialAttack1.displayHeight / 5);
        game.ArcherSpecialAttack1.setCollideWorldBounds(true);
        game.ArcherSpecialAttack1.body.setGravityY(0);
        game.ArcherSpecialAttack1.disableBody(true, true);
    }
}

function ArcherParticlesEmitterCreate(parent, archerPlayer) {
    if (archerPlayer != null && archerPlayer != undefined) {
        var archerParticles = parent.add.particles('fire3');
        ArcherEmitter = archerParticles.createEmitter();
        ArcherEmitter.setPosition(archerPlayer.x, archerPlayer.y + (archerPlayer.displayHeight / 2));
        ArcherEmitter.setSpeed(100);
        ArcherEmitter.setScale(0.05, 0.05);
        ArcherEmitter.setAlpha(1, 0, 3000);
        ArcherEmitter.maxParticles = 10;
        ArcherEmitter.on = false;
    }
}

function ArcherCollision(parent, archerPlayer) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(archerPlayer, Platforms);

    //Only this group will collide with each other
    // parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    // parent.physics.add.overlap(ArcherPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(archerPlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(archerPlayer, StrengthBuff, CollectStrengthBuff, null, parent);

    parent.physics.add.collider(game.ArrowsRight, Platforms, CollideWithArrow, null, parent);
    parent.physics.add.collider(game.ArrowsLeft, Platforms, CollideWithArrow, null, parent);

    // parent.physics.add.collider(ArcherSpecialAttack1, Platforms);
}

function CollideWithArrow(arrow, platform) {
    game.IsArrowShot = false;
    arrow.setAngle(0);
    arrow.disableBody(true, true);
    game.sound.play('arrowHit');
}


function CollideTrapWithPlayer(trap, platform) {
    game.IsArrowShot = false;
    trap.setAngle(0);
    trap.disableBody(true, true);
    game.sound.play('arrowHit');
}
