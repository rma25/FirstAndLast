function MagePlayerCreate(parent) {
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

    //Player    
    //Add starting image of player, width, height
    MagePlayer = parent.physics.add.sprite(100, (WindowHeight - GroundHeight - 91), 'mage1-idle1-right0');
    MagePlayer.setDisplaySize(81, 91);
    MagePlayer.setCollideWorldBounds(true);
    MagePlayer.body.setGravityY(400);

    //Set original player size
    OriginalPlayerWidth = MagePlayer.displayWidth;
    OriginalPlayerHeight = MagePlayer.displayHeight;

    //Frames
    for (var i = 0; i <= 20; i++) {
        attack1FramesLeft.push({ key: 'mage1-attack1-left' + i });
        attack1FramesRight.push({ key: 'mage1-attack1-right' + i });
        attack1FramesLeft2.push({ key: 'mage2-attack1-left' + i });
        attack1FramesRight2.push({ key: 'mage2-attack1-right' + i });
    }

    parent.anims.create({
        key: 'mage1-attack1-left',
        frames: attack1FramesLeft,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage1-attack1-right',
        frames: attack1FramesRight,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-attack1-left',
        frames: attack1FramesLeft2,
        frameRate: 15,
        repeat: -1
    });
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

    parent.anims.create({
        key: 'mage1-cast1-left',
        frames: castRightFramesLeft,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage1-cast1-right',
        frames: castRightFramesRight,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-cast1-left',
        frames: castRightFramesLeft2,
        frameRate: 15,
        repeat: -1
    });
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

    parent.anims.create({
        key: 'mage1-cast2-left',
        frames: cast2RightFramesLeft,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage1-cast2-right',
        frames: cast2RightFramesRight,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-cast2-left',
        frames: cast2RightFramesLeft2,
        frameRate: 15,
        repeat: -1
    });
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

    parent.anims.create({
        key: 'mage1-attack2-left',
        frames: attack2FramesLeft,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage1-attack2-right',
        frames: attack2FramesRight,
        frameRate: 15,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-attack2-left',
        frames: attack2FramesLeft2,
        frameRate: 15,
        repeat: -1
    });
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

    parent.anims.create({
        key: 'mage1-death-left',
        frames: deathFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage1-death-right',
        frames: deathFramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-death-left',
        frames: deathFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
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

    parent.anims.create({
        key: 'mage1-hit-left',
        frames: hitFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage1-hit-right',
        frames: hitFramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-hit-left',
        frames: hitFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
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

    parent.anims.create({
        key: 'mage1-idle1-left',
        frames: idle1FramesLeft,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'mage1-idle1-right',
        frames: idle1FramesRight,
        frameRate: 10,
        repeat: 1
    });
    parent.anims.create({
        key: 'mage2-idle1-left',
        frames: idle1FramesLeft2,
        frameRate: 10,
        repeat: 1
    });
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

    parent.anims.create({
        key: 'mage1-walkforward-left',
        frames: walkRightFramesLeft,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage1-walkforward-right',
        frames: walkRightFramesRight,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-walkforward-left',
        frames: walkRightFramesLeft2,
        frameRate: 10,
        repeat: -1
    });
    parent.anims.create({
        key: 'mage2-walkforward-right',
        frames: walkRightFramesRight2,
        frameRate: 10,
        repeat: -1
    });
}

function MageCollision(parent) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(MagePlayer, Platforms);

    //Only this group will collide with each other
    // parent.physics.add.collider(Stars, Platforms);

    //Allow player to overlap with a star
    // parent.physics.add.overlap(ArcherPlayer, Stars, CollectStar, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(SpeedBuff, Platforms);
    parent.physics.add.overlap(MagePlayer, SpeedBuff, CollectSpeedBuff, null, parent);

    //Allow player to interact with speed buff
    parent.physics.add.collider(StrengthBuff, Platforms);
    parent.physics.add.overlap(MagePlayer, StrengthBuff, CollectStrengthBuff, null, parent);
}