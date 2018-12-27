function MageController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && MagePlayer != null && MagePlayer != undefined) {
        var mageMainAttack1;
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
            MagePlayer.anims.play(currentMage + '-' + (parent.run.isDown && !DoesPlayerHasStrengthBuff ? 'run' : 'walk') + 'forward-left', true);
            IsPlayerIdle = false;
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            MagePlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190) * (parent.run.isDown ? 1.5 : 1));
            MagePlayer.anims.play(currentMage + '-' + (parent.run.isDown && !DoesPlayerHasStrengthBuff ? 'run' : 'walk') + 'forward-right', true);
            IsPlayerIdle = false;
        }
        //Player Not Moving
        else {
            //Stop moving
            MagePlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack1.isDown && !IsMageMainAttack1Used) {
                IsPlayerIdle = false;
                MagePlayer.anims.play(currentMage + '-attack1-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (MagePlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        //TODO: Implement sound
                        //game.sound.play('axeAttack2');
                    }
                    else {
                        //game.sound.play('swordAttack2');
                    }
                }

                //Only attack on the last animation frame
                if (MagePlayer.anims.currentFrame.isLast) {
                    mageMainAttack1 = CreateMageMainAttack1(parent);
                    IsMageMainAttack1Used = true;
                    mageMainAttack1.setAngle(0);

                    if (IsMainPlayerFacingLeft) {
                        mageMainAttack1.enableBody(true, MagePlayer.x - 16, MagePlayer.y, true, true);
                        mageMainAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? -300 : -150);
                        mageMainAttack1.setAccelerationX(DoesPlayerHasStrengthBuff ? -300 : -200);
                    }
                    else {
                        mageMainAttack1.enableBody(true, MagePlayer.x + 16, MagePlayer.y, true, true);
                        mageMainAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? 300 : 150);
                        mageMainAttack1.setAccelerationX(DoesPlayerHasStrengthBuff ? 300 : 200);
                    }
                    game.sound.play('shootingArrow');
                }
            }
            else if (parent.mainAttack2.isDown) {
                IsPlayerIdle = false;

                MagePlayer.anims.play(currentMage + '-attack2-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (MagePlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        //game.sound.play('axeAttack2');
                    }
                    else {
                        //game.sound.play('swordAttack2');
                    }
                }
            }
            //Cast Special Attack
            else if (parent.specialAttack1.isDown) {
                IsPlayerIdle = false;

                MagePlayer.anims.play(currentMage + '-cast1-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (MagePlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        //game.sound.play('axeAttack2');
                    }
                    else {
                        //game.sound.play('swordAttack2');
                    }
                }
            }
            //Cast Special Attack
            else if (parent.specialAttack2.isDown) {
                IsPlayerIdle = false;

                MagePlayer.anims.play(currentMage + '-cast2-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (MagePlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        //game.sound.play('axeAttack2');
                    }
                    else {
                        //game.sound.play('swordAttack2');
                    }
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

        //In case it hits a wall (side of the window)
        // if (MageMainAttack1.body.onWall() && !MageMainAttack1.body.onFloor() && MageMainAttack1.body.enable) {
        //     IsMageMainAttack1Used = false;            
        // }

        DestroyMageMainAttack1(mageMainAttack1);
        MageParticlesOnPlayer(parent);
    }
}

function CreateMageMainAttack1(parent) {
    var mainAttack1 = parent.physics.add.sprite(MagePlayer.displayWidth, MagePlayer.displayHeight, 'mage-mainattack1');

    mainAttack1.setDisplaySize(mainAttack1.displayWidth / 10, mainAttack1.displayHeight / 10);
    mainAttack1.setCollideWorldBounds(true);
    mainAttack1.body.allowGravity = false;
    mainAttack1.disableBody(true, true);

    return mainAttack1;
}

function DestroyMageMainAttack1(mageMainAttack1) {
    if (mageMainAttack1 != null && mageMainAttack1 != undefined) {
        if (mageMainAttack1.body.onWall() && !mageMainAttack1.body.onFloor() && mageMainAttack1.body.enable) {
            IsMageMainAttack1Used = false;
        }
    }
}

function MageParticlesOnPlayer(parent) {
    MageEmitter.setPosition(MagePlayer.x, MagePlayer.y + (MagePlayer.displayHeight / 2));
}