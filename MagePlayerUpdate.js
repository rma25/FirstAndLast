function MageController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && MagePlayer != null && MagePlayer != undefined) {
        var currentMage = 'mage' + (DoesPlayerHasStrengthBuff ? '2' : '1');

        if (DoesPlayerHasStrengthBuff) {
            MagePlayer.body.setSize(200, 295);
        }
        else {
            if (parent.run.isDown && MagePlayer.body.isMoving) {
                MagePlayer.body.setSize(200, 265);
            }
            else {
                //Default collision box size
                MagePlayer.body.setSize(170, 265);
            }
        }

        //Player Left
        if (Cursors.left.isDown) {
            IsMainPlayerFacingLeft = true;
            MagePlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190) * (parent.run.isDown ? 1.5 : 1));
            MagePlayer.anims.play(currentMage + '-' + (parent.run.isDown && !DoesPlayerHasStrengthBuff ? 'walk' : 'walk') + 'forward-left', true);
            IsPlayerIdle = false;

            if (MagePlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) == 0) {
                if (!PlayerStepSound.isPlaying) {
                    PlayerStepSound.play();
                }
            }
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            MagePlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190) * (parent.run.isDown ? 1.5 : 1));
            MagePlayer.anims.play(currentMage + '-' + (parent.run.isDown && !DoesPlayerHasStrengthBuff ? 'walk' : 'walk') + 'forward-right', true);
            IsPlayerIdle = false;

            if (MagePlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) == 0) {
                if (!PlayerStepSound.isPlaying) {
                    PlayerStepSound.play();
                }
            }
        }
        //Player Not Moving
        else {
            //Stop moving
            MagePlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack1.isDown && !IsMageMainAttack1Used) {
                IsPlayerIdle = false;
                MagePlayer.anims.play(currentMage + '-attack1-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                //Only attack on the last animation frame
                if (MagePlayer.anims.currentFrame.index >= 17) {
                    MageMainAttack1 = CreateMageMainAttack1(parent);

                    if (IsMainPlayerFacingLeft) {
                        MageMainAttack1.enableBody(true, MagePlayer.x - 16, MagePlayer.y, true, true);
                        MageMainAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? -500 : -350);
                    }
                    else {
                        MageMainAttack1.enableBody(true, MagePlayer.x + 16, MagePlayer.y, true, true);
                        MageMainAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? 500 : 350);
                    }
                    game.sound.play('mageMainAttack1');
                    IsMageMainAttack1Used = true;
                }
            }
            else if (parent.mainAttack2.isDown && !IsMageMainAttack2Used) {
                IsPlayerIdle = false;
                MagePlayer.anims.play(currentMage + '-attack2-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (MagePlayer.anims.currentFrame.index >= 20) {
                    MageMainAttack2 = CreateMageMainAttack2(parent);
                    MageMainAttack2.play('mage-mainAttack2');

                    if (IsMainPlayerFacingLeft) {
                        MageMainAttack2.enableBody(true, MagePlayer.x - 32, MagePlayer.y, true, true);
                        MageMainAttack2.setVelocityX(DoesPlayerHasStrengthBuff ? -350 : -250);
                        MageMainAttack2.setAccelerationX(DoesPlayerHasStrengthBuff ? -300 : -150);
                    }
                    else {
                        MageMainAttack2.enableBody(true, MagePlayer.x + 32, MagePlayer.y, true, true);
                        MageMainAttack2.setVelocityX(DoesPlayerHasStrengthBuff ? 350 : 250);
                        MageMainAttack2.setAccelerationX(DoesPlayerHasStrengthBuff ? 300 : 150);
                    }
                    game.sound.play('mageMainAttack2');
                    IsMageMainAttack2Used = true;
                }

            }
            //Cast Special Attack
            else if (parent.specialAttack1.isDown && !IsMageSpecialAttack1Used) {
                IsPlayerIdle = false;
                MagePlayer.anims.play(currentMage + '-cast1-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                //Only attack on the last animation frame
                if (MagePlayer.anims.currentFrame.index >= 20) {
                    MageSpecialAttack1 = CreateMageSpecialAttack1(parent);

                    if (IsMainPlayerFacingLeft) {
                        MageSpecialAttack1.enableBody(true, MagePlayer.x - 32, MagePlayer.y, true, true);
                        MageSpecialAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? -350 : -250);
                        MageSpecialAttack1.setAccelerationX(DoesPlayerHasStrengthBuff ? -300 : -150);
                    }
                    else {
                        MageSpecialAttack1.enableBody(true, MagePlayer.x + 32, MagePlayer.y, true, true);
                        MageSpecialAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? 350 : 250);
                        MageSpecialAttack1.setAccelerationX(DoesPlayerHasStrengthBuff ? 300 : 150);
                    }
                    game.sound.play('mageSpecialAttack1');
                    IsMageSpecialAttack1Used = true;
                }
            }
            //Cast Special Attack
            else if (parent.specialAttack2.isDown && !IsMageSpecialAttack2Used) {
                IsPlayerIdle = false;
                MagePlayer.anims.play(currentMage + '-cast2-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (MagePlayer.anims.currentFrame.index >= 16) {
                    MageSpecialAttack2 = CreateMageSpecialAttack2(parent);

                    if (IsMainPlayerFacingLeft) {
                        MageSpecialAttack2.enableBody(true, MagePlayer.x, MagePlayer.y, true, true);
                    }
                    else {
                        MageSpecialAttack2.enableBody(true, MagePlayer.x, MagePlayer.y, true, true);
                    }

                    //Make sure the buff goes away after sometime
                    setTimeout(DestroyMageSpecialAttack2, 10000);

                    game.sound.play('mageSpecialAttack2');
                    IsMageSpecialAttack2Used = true;
                }
            }
            //Idle Left
            else if (IsMainPlayerFacingLeft && !MagePlayer.body.isMoving) {
                MagePlayer.anims.play(currentMage + '-idle1-left', true);
            }
            //Idle Right
            else if (!IsMainPlayerFacingLeft && !MagePlayer.body.isMoving) {
                MagePlayer.anims.play(currentMage + '-idle1-right', true);
            }
        }

        //Player Jump
        if ((Cursors.up.isDown || parent.jumpAlt.isDown) && MagePlayer.body.touching.down) {
            IsPlayerIdle = false;
            MagePlayer.setVelocityY((DoesPlayerHasStrengthBuff ? -600 : -550));
            // MagePlayer.anims.play(currentMage + '-jump-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

            //Jumping sound
            game.sound.play('jump');
        }

        UpdateMageAttacks();
        DestroyMageAttacks();
        MageParticlesOnPlayer(parent);
    }
}

function CreateMageMainAttack1(parent) {
    var mainAttack1 = parent.physics.add.sprite(MagePlayer.displayWidth, MagePlayer.displayHeight, 'mage-mainattack1');

    mainAttack1.setDisplaySize(mainAttack1.displayWidth / 10, mainAttack1.displayHeight / 10);
    mainAttack1.setCollideWorldBounds(true);
    mainAttack1.setTint('0xff9955');
    mainAttack1.body.allowGravity = false;
    mainAttack1.disableBody(true, true);

    return mainAttack1;
}

function CreateMageMainAttack2(parent) {
    var mainAttack2 = parent.physics.add.sprite(MagePlayer.displayWidth, MagePlayer.displayHeight, 'mage2-mainAttack0');

    mainAttack2.setDisplaySize(MageSpecialAttack1.displayWidth, MageSpecialAttack1.displayHeight);
    mainAttack2.setCollideWorldBounds(true);
    mainAttack2.setTint('0xff9955');
    mainAttack2.body.allowGravity = false;
    mainAttack2.disableBody(true, true);

    return mainAttack2;
}

function CreateMageSpecialAttack1(parent) {
    var specialAttack1 = parent.physics.add.sprite(MagePlayer.displayWidth, MagePlayer.displayHeight, 'mage-specialAttack1');

    specialAttack1.setDisplaySize(specialAttack1.displayWidth / 7, specialAttack1.displayHeight / 7);
    specialAttack1.setCollideWorldBounds(true);
    specialAttack1.setTint('0xff9955');
    specialAttack1.body.allowGravity = false;
    specialAttack1.disableBody(true, true);

    return specialAttack1;
}

function CreateMageSpecialAttack2(parent) {
    var specialAttack2 = parent.physics.add.sprite(MagePlayer.displayWidth, MagePlayer.displayHeight, 'mage-specialAttack2');

    specialAttack2.setDisplaySize(specialAttack2.displayWidth / 4, specialAttack2.displayHeight / 4);
    specialAttack2.setCollideWorldBounds(true);
    specialAttack2.setTint('0xff9955');
    specialAttack2.body.allowGravity = false;
    specialAttack2.disableBody(true, true);

    return specialAttack2;
}

function DestroyMageAttacks() {
    //In case it hits a wall (side of the window)        
    if (MageMainAttack1 != null && MageMainAttack1 != undefined && MageMainAttack1.body != null && MageMainAttack1.body != undefined) {
        if (MageMainAttack1.body.onWall() && !MageMainAttack1.body.onFloor() && MageMainAttack1.body.enable) {
            IsMageMainAttack1Used = false;
            MageMainAttack1.destroy();
        }
    }

    if (MageMainAttack2 != null && MageMainAttack2 != undefined && MageMainAttack2.body != null && MageMainAttack2.body != undefined) {
        if (MageMainAttack2.body.onWall() && !MageMainAttack2.body.onFloor() && MageMainAttack2.body.enable) {
            IsMageMainAttack2Used = false;
            MageMainAttack2.destroy();
        }
    }

    if (MageSpecialAttack1 != null && MageSpecialAttack1 != undefined && MageSpecialAttack1.body != null && MageSpecialAttack1.body != undefined) {
        if (MageSpecialAttack1.body.onWall() && !MageSpecialAttack1.body.onFloor() && MageSpecialAttack1.body.enable) {
            IsMageSpecialAttack1Used = false;
            MageSpecialAttack1.destroy();
        }
    }
}

function DestroyMageMainAttack2() {
    if (MageMainAttack2 != null && MageMainAttack2 != undefined && MageMainAttack2.on) {
        MageMainAttack2.on = false;
        IsMageMainAttack2Used = false;
    }
}

//This is a buff so it has to be destroyed after a certain time
function DestroyMageSpecialAttack2() {
    if (MageSpecialAttack2 != null && MageSpecialAttack2 != undefined && MageSpecialAttack2.body != null && MageSpecialAttack2.body != undefined) {
        IsMageSpecialAttack2Used = false;
        MageSpecialAttack2.destroy();
    }
}

function UpdateMageAttacks() {
    if (MageSpecialAttack1 != null && MageSpecialAttack1 != undefined) {
        if (IsMainPlayerFacingLeft) {
            MageSpecialAttack1.flipX = true;
            MageSpecialAttack1.angle -= 3;
        }
        else {
            MageSpecialAttack1.flipX = false;
            MageSpecialAttack1.angle += 3;
        }
    }

    if (MageSpecialAttack2 != null && MageSpecialAttack2 != undefined) {
        if (IsMainPlayerFacingLeft) {
            MageSpecialAttack2.flipX = true;
            MageSpecialAttack2.setPosition(MagePlayer.x + 16, MagePlayer.y);
        }
        else {
            MageSpecialAttack2.flipX = false;
            MageSpecialAttack2.setPosition(MagePlayer.x - 16, MagePlayer.y);
        }
    }
}

function MageParticlesOnPlayer(parent) {
    MageEmitter.setPosition(MagePlayer.x, MagePlayer.y + (MagePlayer.displayHeight / 2));
}
