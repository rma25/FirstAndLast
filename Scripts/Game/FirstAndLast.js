/********************************** GLOBAL *******************************************************/
const _ParentDir = './GameJs';
const _AssetsDir = './GameAssets';
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
            debug: false
        }
    },
    scene: [MenuScene, MainGameScene]
};

var game = new Phaser.Game(config);

//It will make the game keep reacting to messages from the server even when the game window doesn't have focus (which is a desired behavior for most games)
game.init = function() {
    game.stage.disableVisibilityChange = true;
}

game.addNewPlayer = function(id, x, y, allPlayers) {
    console.log('Id is ', id, 'X is ', x, 'Y is ', y, 'All Players ', allPlayers);
    if (game.playerMap != null && game.playerMap != undefined) {
        game.playerMap[id] = CreateNewPlayer(id, x, y);
    }
};

game.removePlayer = function(id) {
    game.playerMap[id].destroy();
    delete game.playerMap[id];
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
        else if (playerInfo.IsArcherChar) {
            //TODO: Needs implemented
        }
        else if (playerInfo.IsWarriorChar) {
            //TODO: Needs implemented
        }

    }
};

var ClientMageMainAttack1Sprite = {};
var ClientMageMainAttack2Sprite = {};
var ClientMageSpecialAttack1Sprite = {};
var ClientMageSpecialAttack2Sprite = {};

function UpdateClientMage(playerInfo) {
    if (CurrentClientId != -1) {
        var player = game.playerMap[playerInfo.PlayerId];

        if (player != null && player != undefined) {
            var currentMage = 'mage' + (playerInfo.DoesPlayerHasStrengthBuff ? '2' : '1');

            player.x = playerInfo.x;
            player.y = playerInfo.y;

            if (playerInfo.IsWalkingLeft) {
                player.setVelocityX((playerInfo.DoesPlayerHasSpeedBuff ? -300 : -190) * (playerInfo.IsRunning ? 1.5 : 1));
                player.anims.play(currentMage + '-walkforward-left', true);
            }
            //Player Right
            else if (playerInfo.IsWalkingRight) {
                player.setVelocityX((playerInfo.DoesPlayerHasSpeedBuff ? 300 : 190) * (playerInfo.IsRunning ? 1.5 : 1));
                player.anims.play(currentMage + '-walkforward-right', true);
            }
            else {
                player.setVelocityX(0);

                if (playerInfo.IsMainAttack1Down && !playerInfo.IsMageMainAttack1Used) {
                    player.anims.play(currentMage + '-attack1-' + (playerInfo.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    //Only attack on the last animation frame
                    if (playerInfo.UsingMageMainAttack1 || player.anims.currentFrame.index >= 17) {
                        try {
                            console.log('Creating ClientMageMainAttack1Sprite');
                            ClientMageMainAttack1Sprite = CreateMageMainAttack1(game.scene.getScene('MainGame'), player);
                            console.log('Created ClientMageMainAttack1Sprite ', ClientMageMainAttack1Sprite);

                            if (playerInfo.IsMainPlayerFacingLeft) {
                                ClientMageMainAttack1Sprite.enableBody(true, player.x - 16, player.y, true, true);
                                ClientMageMainAttack1Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? -500 : -350);
                            }
                            else {
                                ClientMageMainAttack1Sprite.enableBody(true, player.x + 16, player.y, true, true);
                                ClientMageMainAttack1Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? 500 : 350);
                            }

                            game.sound.play('mageMainAttack1');
                        }
                        catch (err) {
                            console.log('Error happened', err);
                        }
                    }
                }
                else if (playerInfo.IsMainAttack2Down && !playerInfo.IsMageMainAttack2Used) {

                    player.anims.play(currentMage + '-attack2-' + (playerInfo.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    if (player.anims.currentFrame.index >= 20) {
                        ClientMageMainAttack2Sprite = CreateMageMainAttack2(game.scene.getScene('MainGame'), player);
                        ClientMageMainAttack2Sprite.play('mage-mainAttack2');

                        if (playerInfo.IsMainPlayerFacingLeft) {
                            ClientMageMainAttack2Sprite.enableBody(true, player.x - 32, player.y, true, true);
                            ClientMageMainAttack2Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? -350 : -250);
                            ClientMageMainAttack2Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? -300 : -150);
                        }
                        else {
                            ClientMageMainAttack2Sprite.enableBody(true, player.x + 32, player.y, true, true);
                            ClientMageMainAttack2Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? 350 : 250);
                            ClientMageMainAttack2Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? 300 : 150);
                        }
                        game.sound.play('mageMainAttack2');
                    }

                }
                //Cast Special Attack
                else if (playerInfo.IsSpecialAttack1Down && !playerInfo.IsMageSpecialAttack1Used) {
                    player.anims.play(currentMage + '-cast1-' + (playerInfo.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    //Only attack on the last animation frame
                    if (player.anims.currentFrame.index >= 20) {
                        ClientMageSpecialAttack1Sprite = CreateMageSpecialAttack1(game.scene.getScene('MainGame'), player);

                        if (playerInfo.IsMainPlayerFacingLeft) {
                            ClientMageSpecialAttack1Sprite.enableBody(true, player.x - 32, player.y, true, true);
                            ClientMageSpecialAttack1Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? -350 : -250);
                            ClientMageSpecialAttack1Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? -300 : -150);
                        }
                        else {
                            ClientMageSpecialAttack1Sprite.enableBody(true, player.x + 32, player.y, true, true);
                            ClientMageSpecialAttack1Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? 350 : 250);
                            ClientMageSpecialAttack1Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? 300 : 150);
                        }

                        game.sound.play('mageSpecialAttack1');
                    }
                }
                //Cast Special Attack
                else if (player.IsSpecialAttack2Down && !player.IsMageSpecialAttack2Used) {
                    player.anims.play(currentMage + '-cast2-' + (player.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    if (player.anims.currentFrame.index >= 16) {
                        ClientMageSpecialAttack2Sprite = CreateMageSpecialAttack2(game.scene.getScene('MainGame'), player);

                        if (player.IsMainPlayerFacingLeft) {
                            ClientMageSpecialAttack2Sprite.enableBody(true, player.x, player.y, true, true);
                        }
                        else {
                            ClientMageSpecialAttack2Sprite.enableBody(true, player.x, player.y, true, true);
                        }

                        //Make sure the buff goes away after sometime
                        setTimeout(DestroyClientMageSpecialAttack2, 10000);

                        game.sound.play('mageSpecialAttack2');
                    }
                }
                //Idle Left
                else if (playerInfo.IsMainPlayerFacingLeft && !player.body.isMoving) {
                    player.anims.play(currentMage + '-idle1-left', true);
                }
                //Idle Right
                else if (!playerInfo.IsMainPlayerFacingLeft && !player.body.isMoving) {
                    player.anims.play(currentMage + '-idle1-right', true);
                }
            }

            DestroyClientMageAttacks();
        }
    }
}

function DestroyClientMageAttacks() {
    //Destroy attacks
    if (ClientMageMainAttack1Sprite != null && ClientMageMainAttack1Sprite != undefined && ClientMageMainAttack1Sprite.body != null && ClientMageMainAttack1Sprite.body != undefined) {
        if (ClientMageMainAttack1Sprite.body.onWall() && !ClientMageMainAttack1Sprite.body.onFloor() && ClientMageMainAttack1Sprite.body.enable) {
            console.log('Destroying mage main attack1 for client player');
            ClientMageMainAttack1Sprite.destroy();
        }
    }

    if (ClientMageSpecialAttack1Sprite != null && ClientMageSpecialAttack1Sprite != undefined && ClientMageSpecialAttack1Sprite.body != null && ClientMageSpecialAttack1Sprite.body != undefined) {
        if (ClientMageSpecialAttack1Sprite.body.onWall() && !ClientMageSpecialAttack1Sprite.body.onFloor() && ClientMageSpecialAttack1Sprite.body.enable) {
            ClientMageSpecialAttack1Sprite.destroy();
        }
    }

    if (ClientMageMainAttack2Sprite != null && ClientMageMainAttack2Sprite != undefined && ClientMageMainAttack2Sprite.body != null && ClientMageMainAttack2Sprite.body != undefined) {
        if (ClientMageMainAttack2Sprite.body.onWall() && !ClientMageMainAttack2Sprite.body.onFloor() && ClientMageMainAttack2Sprite.body.enable) {
            ClientMageMainAttack2Sprite.destroy();
        }
    }
}

//This is a buff so it has to be destroyed after a certain time
function DestroyClientMageSpecialAttack2() {
    if (ClientMageSpecialAttack2Sprite != null && ClientMageSpecialAttack2Sprite != undefined && ClientMageSpecialAttack2Sprite.body != null && ClientMageSpecialAttack2Sprite.body != undefined) {
        ClientMageSpecialAttack2Sprite.destroy();
    }
}

/********************************** GLOBAL *******************************************************/
