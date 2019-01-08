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
var IsWarriorSpecialAttack1Used = false;
var IsWarriorSpecialAttack2Used = false;
var WarriorSpecialAttack1;
var WarriorSpecialAttack2;
/*Mage*/
var DidMageAttack = false;
var MagePlayer;
var MageEmitter;
var MageParticles;
var DidMageAttackOnce = false;
var MageMainAttack1;
var MageMainAttack2;
var MageSpecialAttack1;
var MageSpecialAttack2;
var IsMageMainAttack1Used = false;
var IsMageMainAttack2Used = false;
var IsMageSpecialAttack1Used = false;
var IsMageSpecialAttack2Used = false;
/*Sound*/
var PlayerStepSound;
/*Class Selection*/
var IsMage = false;
var IsWarrior = false;
var IsArcher = false;
var MageBtn;
var ArcherBtn;
var WarriorBtn;
var CloseBtn;
var MagePlayerBtn;
var ArcherPlayerBtn;
var WarriorPlayerBtn;
var IsClassSelectionCreated = false;
/*Controllers Info*/
var QBtn;
var WBtn;
var EBtn;
var RBtn;
var ArrowsBtn;
var SPACEBtn;
var SHIFTBtn;
var IsControllersInfoCreated = false;
var QBtnText;
var WBtnText;
var EBtnText;
var RBtnText;
var ArrowsBtnText;
var SPACEBtnText;
var SHIFTBtnText;
/*Menu*/
var StartBtn;
var ControllersBtn;
var MenuBtnBackgroundImg;
var MenuBtnBgImgOriginalWidth;
var MenuBtnBgImgOriginalHeight;
/*Scenes*/
var MenuScene = new Phaser.Scene('MainMenu');
MenuScene.preload = preloadMenu;
MenuScene.create = createMenu;
MenuScene.update = updateMenu;

var MainGameScene = new Phaser.Scene('MainGame');
MainGameScene.preload = preload;
MainGameScene.create = create;
MainGameScene.update = update;

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
            debug: false
        }
    },
    scene: [MenuScene, MainGameScene]
};

var game = new Phaser.Game(config);

/********************************** GLOBAL *******************************************************/