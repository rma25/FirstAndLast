/********************************** GLOBAL *******************************************************/
const _ParentDir = '/src/Scripts/Game';
const _AssetsDir = '/src/Assets';
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
var ArcherSpecialAttack1;
var ArcherSpecialAttack2_Cannon;
var ArcherSpecialAttack2_Ball;
var IsArcherSpecialAttack1Used = false;
var IsArcherSpecialAttack2Used = false;
var IsCannonFacingLeft = false;
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
            //Set to true to see the collision boxes
            debug: false
        }
    },
    scene: [MenuScene, MainGameScene]
};

var game = new Phaser.Game(config);

//It will make the game keep reacting to messages from the server even when the game window doesn't have focus (which is a desired behavior for most games)
/*game.init = function() {
    game.stage.disableVisibilityChange = true;
}*/

game.addNewPlayer = function(id, x, y) {
    console.log('Adding new player');
    if (game.playerMap != null && game.playerMap != undefined) {
        game.playerMap[id] = CreateNewPlayer(id, x, y);
    }
};

game.removePlayer = function(id) {
    if (id != null && id != undefined && game != null && game != undefined && game.playerMap != null && game.playerMap != undefined) {
        game.playerMap[id].destroy();
        delete game.playerMap[id];
    }
};

game.movePlayer = function(id, x, y) {
    //Waits until the player starts the game to show other players moving
    if (CurrentClientId != -1) {
        var player = game.playerMap[id];

        if (player != null && player != undefined) {
            player.x = x;
            player.y = y;
        }
    }
};


//TODO: Remove this once done testing
var TEMP = {};

game.updatePlayer = function(playerInfo) {
    //Waits until the player starts the game to show other players moving
    if (CurrentClientId != -1 && playerInfo != null && playerInfo != undefined) {
        TEMP = playerInfo;

        //Check which update is required
        if (playerInfo.IsMageChar) {
            UpdateClientMage(playerInfo);
        }

        if (playerInfo.IsArcherChar) {
            //TODO: Needs implemented
        }

        if (playerInfo.IsWarriorChar) {
            UpdateClientWarrior(playerInfo);
        }

    }
};

/********************************** GLOBAL *******************************************************/
