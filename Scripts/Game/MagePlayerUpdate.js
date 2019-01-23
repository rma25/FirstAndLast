function MageController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    var magePlayer = game.playerMap[CurrentClientId];
    var playerInfo = {};
    playerInfo.PlayerId = CurrentClientId;

    if (!IsGameOver && magePlayer != null && magePlayer != undefined) {
        var currentMage = 'mage' + (game.DoesPlayerHasStrengthBuff ? '2' : '1');

        if (game.DoesPlayerHasStrengthBuff) {
            magePlayer.body.setSize(200, 295);
        }
        else {
            if (parent.run.isDown && magePlayer.body.isMoving) {
                magePlayer.body.setSize(200, 265);
            }
            else {
                //Default collision box size
                magePlayer.body.setSize(170, 265);
            }
        }

        //Player Left
        if (Cursors.left.isDown) {
            playerInfo.IsWalkingLeft = true;
            playerInfo.IsWalkingRight = false;
            playerInfo.IsRunning = parent.run.isDown;
            playerInfo.IsMainPlayerFacingLeft = true;

            magePlayer.setVelocityX((game.DoesPlayerHasSpeedBuff ? -300 : -190) * (parent.run.isDown ? 1.5 : 1));
            magePlayer.anims.play(currentMage + '-' + (parent.run.isDown && !game.DoesPlayerHasStrengthBuff ? 'walk' : 'walk') + 'forward-left', true);

            game.IsMainPlayerFacingLeft = true;
            game.IsPlayerIdle = false;

            if (magePlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) == 0) {
                if (!PlayerStepSound.isPlaying) {
                    PlayerStepSound.play();
                }
            }
        }
        //Player Right
        else if (Cursors.right.isDown) {
            playerInfo.IsWalkingLeft = false;
            playerInfo.IsWalkingRight = true;
            playerInfo.IsRunning = parent.run.isDown;
            playerInfo.IsMainPlayerFacingLeft = false;

            magePlayer.setVelocityX((game.DoesPlayerHasSpeedBuff ? 300 : 190) * (parent.run.isDown ? 1.5 : 1));
            magePlayer.anims.play(currentMage + '-' + (parent.run.isDown && !game.DoesPlayerHasStrengthBuff ? 'walk' : 'walk') + 'forward-right', true);

            game.IsMainPlayerFacingLeft = false;
            game.IsPlayerIdle = false;

            if (magePlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) == 0) {
                if (!PlayerStepSound.isPlaying) {
                    PlayerStepSound.play();
                }
            }
        }
        //Player Not Moving
        else {

            //Stop moving
            magePlayer.setVelocityX(0);

            playerInfo.IsMainAttack1Down = parent.mainAttack1.isDown;
            playerInfo.IsMainAttack2Down = parent.mainAttack2.isDown;
            playerInfo.IsSpecialAttack1Down = parent.specialAttack1.isDown;
            playerInfo.IsSpecialAttack2Down = parent.specialAttack2.isDown;

            //Main attack (regular)
            if (parent.mainAttack1.isDown && !game.IsMageMainAttack1Used) {
                playerInfo.IsPlayerIdle = false;

                game.IsPlayerIdle = false;
                magePlayer.anims.play(currentMage + '-attack1-' + (game.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                //Only attack on the last animation frame
                if (magePlayer.anims.currentFrame.index >= 17) {
                    playerInfo.UsingMageMainAttack1 = true;

                    game.MageMainAttack1 = CreateMageMainAttack1(parent, magePlayer);

                    if (game.IsMainPlayerFacingLeft) {
                        game.MageMainAttack1.enableBody(true, magePlayer.x - 16, magePlayer.y, true, true);
                        game.MageMainAttack1.setVelocityX(game.DoesPlayerHasStrengthBuff ? -500 : -350);
                    }
                    else {
                        game.MageMainAttack1.enableBody(true, magePlayer.x + 16, magePlayer.y, true, true);
                        game.MageMainAttack1.setVelocityX(game.DoesPlayerHasStrengthBuff ? 500 : 350);
                    }

                    game.sound.play('mageMainAttack1');

                    game.IsMageMainAttack1Used = true;
                    playerInfo.IsMageMainAttack1Used = true;
                }
            }
            else if (parent.mainAttack2.isDown && !game.IsMageMainAttack2Used) {
                playerInfo.IsPlayerIdle = false;

                game.IsPlayerIdle = false;
                magePlayer.anims.play(currentMage + '-attack2-' + (game.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (magePlayer.anims.currentFrame.index >= 20) {
                    playerInfo.UsingMageMainAttack2 = true;
                    game.MageMainAttack2 = CreateMageMainAttack2(parent, magePlayer);
                    game.MageMainAttack2.play('mage-mainAttack2');

                    if (game.IsMainPlayerFacingLeft) {
                        game.MageMainAttack2.enableBody(true, magePlayer.x - 32, magePlayer.y, true, true);
                        game.MageMainAttack2.setVelocityX(game.DoesPlayerHasStrengthBuff ? -350 : -250);
                        game.MageMainAttack2.setAccelerationX(game.DoesPlayerHasStrengthBuff ? -300 : -150);
                    }
                    else {
                        game.MageMainAttack2.enableBody(true, magePlayer.x + 32, magePlayer.y, true, true);
                        game.MageMainAttack2.setVelocityX(game.DoesPlayerHasStrengthBuff ? 350 : 250);
                        game.MageMainAttack2.setAccelerationX(game.DoesPlayerHasStrengthBuff ? 300 : 150);
                    }
                    game.sound.play('mageMainAttack2');
                    game.IsMageMainAttack2Used = true;
                }

            }
            //Cast Special Attack
            else if (parent.specialAttack1.isDown && !game.IsMageSpecialAttack1Used) {
                playerInfo.IsPlayerIdle = false;

                game.IsPlayerIdle = false;
                magePlayer.anims.play(currentMage + '-cast1-' + (game.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                //Only attack on the last animation frame
                if (magePlayer.anims.currentFrame.index >= 20) {
                    playerInfo.UsingMageSpecialAttack1 = true;
                    game.MageSpecialAttack1 = CreateMageSpecialAttack1(parent, magePlayer);

                    if (game.IsMainPlayerFacingLeft) {
                        game.MageSpecialAttack1.enableBody(true, magePlayer.x - 32, magePlayer.y, true, true);
                        game.MageSpecialAttack1.setVelocityX(game.DoesPlayerHasStrengthBuff ? -350 : -250);
                        game.MageSpecialAttack1.setAccelerationX(game.DoesPlayerHasStrengthBuff ? -300 : -150);
                    }
                    else {
                        game.MageSpecialAttack1.enableBody(true, magePlayer.x + 32, magePlayer.y, true, true);
                        game.MageSpecialAttack1.setVelocityX(game.DoesPlayerHasStrengthBuff ? 350 : 250);
                        game.MageSpecialAttack1.setAccelerationX(game.DoesPlayerHasStrengthBuff ? 300 : 150);
                    }
                    game.sound.play('mageSpecialAttack1');
                    game.IsMageSpecialAttack1Used = true;
                }
            }
            //Cast Special Attack
            else if (parent.specialAttack2.isDown && !game.IsMageSpecialAttack2Used) {
                playerInfo.IsPlayerIdle = false;

                game.IsPlayerIdle = false;
                magePlayer.anims.play(currentMage + '-cast2-' + (game.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (magePlayer.anims.currentFrame.index >= 16) {
                    playerInfo.UsingMageSpecialAttack2 = true;
                    game.MageSpecialAttack2 = CreateMageSpecialAttack2(parent, magePlayer);

                    if (game.IsMainPlayerFacingLeft) {
                        game.MageSpecialAttack2.enableBody(true, magePlayer.x, magePlayer.y, true, true);
                    }
                    else {
                        game.MageSpecialAttack2.enableBody(true, magePlayer.x, magePlayer.y, true, true);
                    }

                    //Make sure the buff goes away after sometime
                    setTimeout(DestroyMageSpecialAttack2, 10000);

                    game.sound.play('mageSpecialAttack2');
                    game.IsMageSpecialAttack2Used = true;
                }
            }
            //Idle Left
            else if (game.IsMainPlayerFacingLeft && !magePlayer.body.isMoving) {
                magePlayer.anims.play(currentMage + '-idle1-left', true);
            }
            //Idle Right
            else if (!game.IsMainPlayerFacingLeft && !magePlayer.body.isMoving) {
                magePlayer.anims.play(currentMage + '-idle1-right', true);
            }
        }

        //Player Jump
        if ((Cursors.up.isDown || parent.jumpAlt.isDown) && magePlayer.body.touching.down) {
            game.IsPlayerIdle = false;
            magePlayer.setVelocityY((game.DoesPlayerHasStrengthBuff ? -600 : -550));
            magePlayer.anims.play(currentMage + '-jump-' + (game.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

            //Jumping sound
            game.sound.play('jump');
        }

        UpdateMageAttacks(magePlayer);
        DestroyMageAttacks();
        MageParticlesOnPlayer(parent, magePlayer);

        playerInfo.IsMageMainAttack1Used = game.IsMageMainAttack1Used;
        playerInfo.IsMageMainAttack2Used = game.IsMageMainAttack2Used;
        playerInfo.IsMageSpecialAttack1Used = game.IsMageSpecialAttack1Used;
        playerInfo.IsMageSpecialAttack2Used = game.IsMageSpecialAttack2Used;
        playerInfo.DoesPlayerHasStrengthBuff = game.DoesPlayerHasStrengthBuff;
        playerInfo.DoesPlayerHasSpeedBuff = game.DoesPlayerHasSpeedBuff;
        playerInfo.IsMainPlayerFacingLeft = game.IsMainPlayerFacingLeft;
        playerInfo.x = magePlayer.x;
        playerInfo.y = magePlayer.y;
        playerInfo.IsMageChar = true;
        game.IsMageChar = true;
        playerInfo.DisplayHeight = magePlayer.displayHeight;
        playerInfo.DisplayWidth = magePlayer.displayWidth;


        Client.sendPlayerInfo(magePlayer);
    }
}

function CreateMageMainAttack1(parent, magePlayer) {
    var mainAttack1 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage-mainattack1');

    mainAttack1.setDisplaySize(mainAttack1.displayWidth / 10, mainAttack1.displayHeight / 10);
    mainAttack1.setCollideWorldBounds(true);
    mainAttack1.setTint('0xff9955');
    mainAttack1.body.allowGravity = false;
    mainAttack1.disableBody(true, true);

    return mainAttack1;
}

function CreateMageMainAttack2(parent, magePlayer) {
    var mainAttack2 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage2-mainAttack0');

    mainAttack2.setDisplaySize(mainAttack2.displayWidth, mainAttack2.displayHeight);
    mainAttack2.setCollideWorldBounds(true);
    mainAttack2.setTint('0xff9955');
    mainAttack2.body.allowGravity = false;
    mainAttack2.disableBody(true, true);

    return mainAttack2;
}

function CreateMageSpecialAttack1(parent, magePlayer) {
    var specialAttack1 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage-specialAttack1');

    specialAttack1.setDisplaySize(specialAttack1.displayWidth / 7, specialAttack1.displayHeight / 7);
    specialAttack1.setCollideWorldBounds(true);
    specialAttack1.setTint('0xff9955');
    specialAttack1.body.allowGravity = false;
    specialAttack1.disableBody(true, true);

    return specialAttack1;
}

function CreateMageSpecialAttack2(parent, magePlayer) {
    var specialAttack2 = parent.physics.add.sprite(magePlayer.displayWidth, magePlayer.displayHeight, 'mage-specialAttack2');

    specialAttack2.setDisplaySize(specialAttack2.displayWidth / 4, specialAttack2.displayHeight / 4);
    specialAttack2.setCollideWorldBounds(true);
    specialAttack2.setTint('0xff9955');
    specialAttack2.body.allowGravity = false;
    specialAttack2.disableBody(true, true);

    return specialAttack2;
}

function DestroyMageAttacks() {
    //In case it hits a wall (side of the window)        
    if (game.MageMainAttack1 != null && game.MageMainAttack1 != undefined && game.MageMainAttack1.body != null && game.MageMainAttack1.body != undefined) {
        if (game.MageMainAttack1.body.onWall() && !game.MageMainAttack1.body.onFloor() && game.MageMainAttack1.body.enable) {
            game.MageMainAttack1.destroy();
            game.IsMageMainAttack1Used = false;
        }
    }

    if (game.MageMainAttack2 != null && game.MageMainAttack2 != undefined && game.MageMainAttack2.body != null && game.MageMainAttack2.body != undefined) {
        if (game.MageMainAttack2.body.onWall() && !game.MageMainAttack2.body.onFloor() && game.MageMainAttack2.body.enable) {
            game.IsMageMainAttack2Used = false;
            game.MageMainAttack2.destroy();
        }
    }

    if (game.MageSpecialAttack1 != null && game.MageSpecialAttack1 != undefined && game.MageSpecialAttack1.body != null && game.MageSpecialAttack1.body != undefined) {
        if (game.MageSpecialAttack1.body.onWall() && !game.MageSpecialAttack1.body.onFloor() && game.MageSpecialAttack1.body.enable) {
            game.IsMageSpecialAttack1Used = false;
            game.MageSpecialAttack1.destroy();
        }
    }
}

function DestroyMageMainAttack2() {
    if (game.MageMainAttack2 != null && game.MageMainAttack2 != undefined && game.MageMainAttack2.on) {
        game.MageMainAttack2.on = false;
        game.IsMageMainAttack2Used = false;
    }
}

//This is a buff so it has to be destroyed after a certain time
function DestroyMageSpecialAttack2() {
    if (game.MageSpecialAttack2 != null && game.MageSpecialAttack2 != undefined && game.MageSpecialAttack2.body != null && game.MageSpecialAttack2.body != undefined) {
        game.IsMageSpecialAttack2Used = false;
        game.MageSpecialAttack2.destroy();
    }
}

function UpdateMageAttacks(magePlayer) {
    if (game.MageSpecialAttack1 != null && game.MageSpecialAttack1 != undefined) {
        if (game.IsMainPlayerFacingLeft) {
            game.MageSpecialAttack1.flipX = true;
            game.MageSpecialAttack1.angle -= 3;
        }
        else {
            game.MageSpecialAttack1.flipX = false;
            game.MageSpecialAttack1.angle += 3;
        }
    }

    if (game.MageSpecialAttack2 != null && game.MageSpecialAttack2 != undefined) {
        if (game.IsMainPlayerFacingLeft) {
            game.MageSpecialAttack2.flipX = true;
            game.MageSpecialAttack2.setPosition(magePlayer.x + 16, magePlayer.y);
        }
        else {
            game.MageSpecialAttack2.flipX = false;
            game.MageSpecialAttack2.setPosition(magePlayer.x - 16, magePlayer.y);
        }
    }
}

function MageParticlesOnPlayer(parent, magePlayer) {
    game.MageEmitter.setPosition(magePlayer.x, magePlayer.y + (magePlayer.displayHeight / 2));
}

/*****************************************CLIENT UPDATE CODE******************************************/

var ClientMageMainAttack1Sprite = {};
var ClientMageMainAttack2Sprite = {};
var ClientMageSpecialAttack1Sprite = {};
var ClientMageSpecialAttack2Sprite = {};
var ClientMagePlayer;

var TEMPMage;

function UpdateClientMage(playerInfo) {
    if (CurrentClientId != -1) {
        game.playerMap[playerInfo.PlayerId] = playerInfo;

        /*ClientMagePlayer = game.playerMap[playerInfo.PlayerId];
        ClientMagePlayer.setCollideWorldBounds(true);
        ClientMagePlayer.body.setGravityY(400);
        game.scene.getScene('MainGame').physics.add.collider(ClientMagePlayer, Platforms);

        if (ClientMagePlayer != null && ClientMagePlayer != undefined) {
            var currentMage = 'mage' + (playerInfo.DoesPlayerHasStrengthBuff ? '2' : '1');

            TEMPMage = playerInfo;

            ClientMagePlayer.x = playerInfo.x;
            ClientMagePlayer.y = playerInfo.y;
            ClientMagePlayer.setDisplaySize(playerInfo.DisplayWidth, playerInfo.DisplayHeight);


            if (playerInfo.IsWalkingLeft) {
                ClientMagePlayer.setVelocityX((playerInfo.DoesPlayerHasSpeedBuff ? -300 : -190) * (playerInfo.IsRunning ? 1.5 : 1));
                ClientMagePlayer.anims.play(currentMage + '-walkforward-left', true);
            }
            //Player Right
            else if (playerInfo.IsWalkingRight) {
                ClientMagePlayer.setVelocityX((playerInfo.DoesPlayerHasSpeedBuff ? 300 : 190) * (playerInfo.IsRunning ? 1.5 : 1));
                ClientMagePlayer.anims.play(currentMage + '-walkforward-right', true);
            }
            else {
                ClientMagePlayer.setVelocityX(0);

                if (playerInfo.IsMainAttack1Down && !playerInfo.IsMageMainAttack1Used) {
                    ClientMagePlayer.anims.play(currentMage + '-attack1-' + (playerInfo.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    //Only attack on the last animation frame
                    if (playerInfo.UsingMageMainAttack1 || ClientMagePlayer.anims.currentFrame.index >= 17) {
                        try {
                            console.log('Creating ClientMageMainAttack1Sprite');
                            ClientMageMainAttack1Sprite = CreateMageMainAttack1(game.scene.getScene('MainGame'), ClientMagePlayer);
                            console.log('Created ClientMageMainAttack1Sprite ', ClientMageMainAttack1Sprite);

                            if (playerInfo.IsMainPlayerFacingLeft) {
                                ClientMageMainAttack1Sprite.enableBody(true, ClientMagePlayer.x - 16, ClientMagePlayer.y, true, true);
                                ClientMageMainAttack1Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? -500 : -350);
                            }
                            else {
                                ClientMageMainAttack1Sprite.enableBody(true, ClientMagePlayer.x + 16, ClientMagePlayer.y, true, true);
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

                    ClientMagePlayer.anims.play(currentMage + '-attack2-' + (playerInfo.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    if (ClientMagePlayer.anims.currentFrame.index >= 20) {
                        ClientMageMainAttack2Sprite = CreateMageMainAttack2(game.scene.getScene('MainGame'), ClientMagePlayer);
                        ClientMageMainAttack2Sprite.play('mage-mainAttack2');

                        if (playerInfo.IsMainPlayerFacingLeft) {
                            ClientMageMainAttack2Sprite.enableBody(true, ClientMagePlayer.x - 32, ClientMagePlayer.y, true, true);
                            ClientMageMainAttack2Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? -350 : -250);
                            ClientMageMainAttack2Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? -300 : -150);
                        }
                        else {
                            ClientMageMainAttack2Sprite.enableBody(true, ClientMagePlayer.x + 32, ClientMagePlayer.y, true, true);
                            ClientMageMainAttack2Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? 350 : 250);
                            ClientMageMainAttack2Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? 300 : 150);
                        }
                        game.sound.play('mageMainAttack2');
                    }

                }
                //Cast Special Attack
                else if (playerInfo.IsSpecialAttack1Down && !playerInfo.IsMageSpecialAttack1Used) {
                    ClientMagePlayer.anims.play(currentMage + '-cast1-' + (playerInfo.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    //Only attack on the last animation frame
                    if (ClientMagePlayer.anims.currentFrame.index >= 20) {
                        ClientMageSpecialAttack1Sprite = CreateMageSpecialAttack1(game.scene.getScene('MainGame'), ClientMagePlayer);

                        if (playerInfo.IsMainPlayerFacingLeft) {
                            ClientMageSpecialAttack1Sprite.enableBody(true, ClientMagePlayer.x - 32, ClientMagePlayer.y, true, true);
                            ClientMageSpecialAttack1Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? -350 : -250);
                            ClientMageSpecialAttack1Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? -300 : -150);
                        }
                        else {
                            ClientMageSpecialAttack1Sprite.enableBody(true, ClientMagePlayer.x + 32, ClientMagePlayer.y, true, true);
                            ClientMageSpecialAttack1Sprite.setVelocityX(playerInfo.DoesPlayerHasStrengthBuff ? 350 : 250);
                            ClientMageSpecialAttack1Sprite.setAccelerationX(playerInfo.DoesPlayerHasStrengthBuff ? 300 : 150);
                        }

                        game.sound.play('mageSpecialAttack1');
                    }
                }
                //Cast Special Attack
                else if (playerInfo.IsSpecialAttack2Down && !playerInfo.IsMageSpecialAttack2Used) {
                    ClientMagePlayer.anims.play(currentMage + '-cast2-' + (ClientMagePlayer.IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                    if (ClientMagePlayer.anims.currentFrame.index >= 16) {
                        ClientMageSpecialAttack2Sprite = CreateMageSpecialAttack2(game.scene.getScene('MainGame'), ClientMagePlayer);

                        if (playerInfo.IsMainPlayerFacingLeft) {
                            ClientMageSpecialAttack2Sprite.enableBody(true, ClientMagePlayer.x, ClientMagePlayer.y, true, true);
                        }
                        else {
                            ClientMageSpecialAttack2Sprite.enableBody(true, ClientMagePlayer.x, ClientMagePlayer.y, true, true);
                        }

                        //Make sure the buff goes away after sometime
                        setTimeout(DestroyClientMageSpecialAttack2, 10000);

                        game.sound.play('mageSpecialAttack2');
                    }
                }
                //Idle Left
                else if (playerInfo.IsMainPlayerFacingLeft && !ClientMagePlayer.body.isMoving) {
                    ClientMagePlayer.anims.play(currentMage + '-idle1-left', true);
                }
                //Idle Right
                else if (!playerInfo.IsMainPlayerFacingLeft && !ClientMagePlayer.body.isMoving) {
                    ClientMagePlayer.anims.play(currentMage + '-idle1-right', true);
                }
            }

            DestroyClientMageAttacks();
        }*/
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

/*****************************************CLIENT UPDATE CODE******************************************/
