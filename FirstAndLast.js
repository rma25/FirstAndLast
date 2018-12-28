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
var IsPlayerIdle = false;
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
/*Mage*/
var DidMageAttack = false;
var MagePlayer;
var MageEmitter;
var MageParticles;
var DidMageAttackOnce = false;
var MageMainAttack1;
var MageSpecialAttack1;
var IsMageMainAttack1Used = false;
var IsMageSpecialAttack1Used = false;
/*Sound*/
var PlayerStepSound;
/*Game Config*/
var config = {
    type: Phaser.AUTO,
    width: WindowWidth,
    height: WindowHeight,
    physics: {
        //Simple and light weight, good for mobile
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
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