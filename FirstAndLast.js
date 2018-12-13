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
var groundHeight = 73;
var groundWidth = 110;
var IsGameOver = false;

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
    this.load.image('ground', './Assets/images/ground.png');
    this.load.image('star', './Assets/images/star.png');
    this.load.image('bomb', './Assets/images/green-orb-collect.png');
    this.load.spritesheet('dude',
        './Assets/images/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
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

    //Always call this last
    Collision(this);
}

function Collision(parent) {
    //Allows the player to collide with the platforms
    parent.physics.add.collider(player, platforms);

    //Only this group will collide with each other
    parent.physics.add.collider(stars, platforms);

    //Allow player to overlap with a star
    parent.physics.add.overlap(player, stars, CollectStar, null, parent);
}

function Platform(parent) {
    var firstHeight = (centerHeight + 300);
    var secondHeight = (centerHeight + (groundHeight * 2))
    // parent.add.image(centerWidth, (centerHeight + 50), 'ground');

    //Platform (where user walks on)
    platforms = parent.physics.add.staticGroup();

    //Main ground        
    for (var i = 0; i <= (windowWidth + groundWidth);) {
        platforms.create(i, windowHeight - 33, 'ground');
        i += groundWidth;
    }

    //Place to jump on (From the center)
    platforms.create(centerWidth, centerHeight, 'ground');
    platforms.create((centerWidth - groundWidth), centerHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 2)), centerHeight, 'ground');
    platforms.create((centerWidth - (groundWidth * 4)), centerHeight, 'ground');
    platforms.create((centerWidth + groundWidth), (centerHeight + groundHeight), 'ground');
    platforms.create((centerWidth + (groundWidth * 2)), secondHeight, 'ground');

    //Right
    platforms.create(centerWidth + (groundWidth * 2), firstHeight, 'ground');
    platforms.create(centerWidth + (groundWidth * 4), firstHeight, 'ground');

    //Left
    platforms.create(centerWidth - (groundWidth * 1), firstHeight, 'ground');
    platforms.create(centerWidth - (groundWidth * 4), firstHeight, 'ground');
}

function Player(parent) {
    //Player
    player = parent.physics.add.sprite(100, windowHeight - 250, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);

    parent.anims.create({
        key: 'left',
        frames: parent.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    parent.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    parent.anims.create({
        key: 'right',
        frames: parent.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}

/** Collection **/
function ItemsToCollect(parent) {
    stars = parent.physics.add.group({
        key: 'star',
        repeat: 11, //Total (1 default + 11)
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });
}

function CollectStar(player, star) {
    //Makes the star disappear
    star.disableBody(true, true);

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

    var playerWidth = player.displayWidth;
    var playerHeight = player.displayHeight;
    player.setDisplaySize((playerWidth + 5), (playerHeight + 5));

    bomb.disableBody(true, true);

    --score;
    // player.anims.play('turn');

    IsGameOver = true;
}
/** Enemies **/

function SpecialAttackKeys(parent){
    parent.specialAttack = parent.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
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
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            //Stop moving
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        //Jump
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-450);
        }

        //TODO: Set up special attack (Q)
        if (parent.specialAttack.isDown) {
            //Update Score
            scoreText.setText('Score: ' + (++score));
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