function WarriorController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && WarriorPlayer != null && WarriorPlayer != undefined) {

        var currentWarrior = 'warrior' + (DoesPlayerHasStrengthBuff ? '2' : '1');

        if (DoesPlayerHasStrengthBuff) {
            //Change collision box site
            WarriorPlayer.body.setSize(300, 350);
        }

        //Player Left
        if (Cursors.left.isDown) {
            IsMainPlayerFacingLeft = true;
            WarriorPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190) * (parent.run.isDown ? 1.65 : 1));
            WarriorPlayer.anims.play(currentWarrior + '-walk-left', true);
            IsPlayerIdle = false;

            if (WarriorPlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) == 0) {
                if (!PlayerStepSound.isPlaying) {
                    PlayerStepSound.play();
                }
            }
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            WarriorPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190) * (parent.run.isDown ? 1.65 : 1));
            WarriorPlayer.anims.play(currentWarrior + '-walk-right', true);
            IsPlayerIdle = false;

            if (WarriorPlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) == 0) {
                if (!PlayerStepSound.isPlaying) {
                    PlayerStepSound.play();
                }
            }
        }
        //Player Not Moving
        else {
            //Stop moving
            WarriorPlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack1.isDown) {
                IsPlayerIdle = false;

                WarriorPlayer.anims.play(currentWarrior + '-attack' + (DoesPlayerHasStrengthBuff ? 1 : 2) + '-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (WarriorPlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        game.sound.play('axeAttack2');
                    }
                    else {
                        game.sound.play('swordAttack2');
                    }
                }
            }
            else if (parent.mainAttack2.isDown) {
                IsPlayerIdle = false;

                WarriorPlayer.anims.play(currentWarrior + '-attack2-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (WarriorPlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        game.sound.play('axeAttack2');
                    }
                    else {
                        game.sound.play('swordAttack2');
                    }
                }
            }
            else if (parent.specialAttack1.isDown && !IsWarriorSpecialAttack1Used) {
                IsPlayerIdle = false;
                WarriorPlayer.anims.play(currentWarrior + '-attack' + ((DidWarriorAttackOnce && DoesPlayerHasStrengthBuff) ? 1 : 2) + '-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (WarriorPlayer.anims.currentFrame.index >= 14) {
                    WarriorSpecialAttack1 = CreateWarriorSpecialAttack1(parent);

                    if (IsMainPlayerFacingLeft) {
                        WarriorSpecialAttack1.enableBody(true, WarriorPlayer.x - 32, WarriorPlayer.y, true, true);
                        WarriorSpecialAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? -350 : -250);
                        WarriorSpecialAttack1.setAccelerationX(DoesPlayerHasStrengthBuff ? -300 : -150);
                    }
                    else {
                        WarriorSpecialAttack1.enableBody(true, WarriorPlayer.x + 32, WarriorPlayer.y, true, true);
                        WarriorSpecialAttack1.setVelocityX(DoesPlayerHasStrengthBuff ? 350 : 250);
                        WarriorSpecialAttack1.setAccelerationX(DoesPlayerHasStrengthBuff ? 300 : 150);
                    }

                    if (DoesPlayerHasStrengthBuff) {
                        game.sound.play('axeAttack2');
                    }
                    else {
                        game.sound.play('swordAttack2');
                    }

                    IsWarriorSpecialAttack1Used = true;
                }
            }
            else if (parent.specialAttack2.isDown && !IsWarriorSpecialAttack2Used) {
                IsPlayerIdle = false;
                WarriorPlayer.anims.play(currentWarrior + '-attack' + ((DidWarriorAttackOnce && DoesPlayerHasStrengthBuff) ? 1 : 2) + '-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (WarriorPlayer.anims.currentFrame.index >= 14) {
                    WarriorSpecialAttack2 = CreateWarriorSpecialAttack2(parent);

                    if (IsMainPlayerFacingLeft) {
                        WarriorSpecialAttack2.enableBody(true, WarriorPlayer.x - 32, WarriorPlayer.y, true, true);
                        WarriorSpecialAttack2.setVelocityX(DoesPlayerHasStrengthBuff ? -350 : -250);
                        WarriorSpecialAttack2.setAccelerationX(DoesPlayerHasStrengthBuff ? -300 : -150);
                    }
                    else {
                        WarriorSpecialAttack2.enableBody(true, WarriorPlayer.x + 32, WarriorPlayer.y, true, true);
                        WarriorSpecialAttack2.setVelocityX(DoesPlayerHasStrengthBuff ? 350 : 250);
                        WarriorSpecialAttack2.setAccelerationX(DoesPlayerHasStrengthBuff ? 300 : 150);
                    }

                    if (DoesPlayerHasStrengthBuff) {
                        game.sound.play('axeAttack2');
                    }
                    else {
                        game.sound.play('swordAttack2');
                    }

                    IsWarriorSpecialAttack2Used = true;
                }
            }
            //Idle Left
            else if (IsMainPlayerFacingLeft && !WarriorPlayer.body.isMoving) {
                WarriorPlayer.anims.play(currentWarrior + '-idle' + (IsPlayerIdle ? '2' : '1') + '-left', true);
            }
            //Idle Right
            else if (!IsMainPlayerFacingLeft && !WarriorPlayer.body.isMoving) {
                WarriorPlayer.anims.play(currentWarrior + '-idle' + (IsPlayerIdle ? '2' : '1') + '-right', true);
            }
        }

        //Player Jump
        if ((Cursors.up.isDown || parent.jumpAlt.isDown) && WarriorPlayer.body.touching.down) {
            IsPlayerIdle = false;
            WarriorPlayer.setVelocityY((DoesPlayerHasStrengthBuff ? -670 : -550));
            WarriorPlayer.anims.play(currentWarrior + '-jump-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

            //Jumping sound
            game.sound.play('jump');
        }

        UpdateWarriorAttacks();
        DestroyWarriorAttacks();
        WarriorParticlesOnPlayer();
    }
}

function WarriorParticlesOnPlayer() {
    WarriorEmitter.setPosition(WarriorPlayer.x, WarriorPlayer.y + (WarriorPlayer.displayHeight / 2));
}

function CreateWarriorSpecialAttack1(parent) {
    var specialAttack1 = parent.physics.add.sprite(WarriorPlayer.displayWidth, WarriorPlayer.displayHeight, 'warrior-specialAttack1');

    specialAttack1.setDisplaySize(specialAttack1.displayWidth / 7, specialAttack1.displayHeight / 7);
    specialAttack1.setCollideWorldBounds(true);
    // specialAttack1.setTint('0xff9955');
    specialAttack1.body.allowGravity = false;
    specialAttack1.disableBody(true, true);

    return specialAttack1;
}

function CreateWarriorSpecialAttack2(parent) {
    var specialAttack2 = parent.physics.add.sprite(WarriorPlayer.displayWidth, WarriorPlayer.displayHeight, 'warrior-specialAttack2');

    specialAttack2.setDisplaySize(specialAttack2.displayWidth / 7, specialAttack2.displayHeight / 7);
    specialAttack2.setCollideWorldBounds(true);
    // specialAttack2.setTint('0xff9955');
    specialAttack2.body.allowGravity = false;
    specialAttack2.disableBody(true, true);

    return specialAttack2;
}

function UpdateWarriorAttacks() {
    if (WarriorSpecialAttack1 != null && WarriorSpecialAttack1 != undefined) {
        if (IsMainPlayerFacingLeft) {
            WarriorSpecialAttack1.flipX = false;
        }
        else {
            WarriorSpecialAttack1.flipX = true;
        }
    }

    if (WarriorSpecialAttack2 != null && WarriorSpecialAttack2 != undefined) {
        if (IsMainPlayerFacingLeft) {
            WarriorSpecialAttack2.flipX = true;
            WarriorSpecialAttack2.angle -= DoesPlayerHasStrengthBuff ? 12 : 6;
        }
        else {
            WarriorSpecialAttack2.flipX = false;
            WarriorSpecialAttack2.angle += DoesPlayerHasStrengthBuff ? 12 : 6;
        }
    }
}


function DestroyWarriorAttacks() {
    //In case it hits a wall (side of the window)        
    if (WarriorSpecialAttack1 != null && WarriorSpecialAttack1 != undefined && WarriorSpecialAttack1.body != null && WarriorSpecialAttack1.body != undefined) {
        if (WarriorSpecialAttack1.body.onWall() && !WarriorSpecialAttack1.body.onFloor() && WarriorSpecialAttack1.body.enable) {
            IsWarriorSpecialAttack1Used = false;
            WarriorSpecialAttack1.destroy();
        }
    }

    if (WarriorSpecialAttack2 != null && WarriorSpecialAttack2 != undefined && WarriorSpecialAttack2.body != null && WarriorSpecialAttack2.body != undefined) {
        if (WarriorSpecialAttack2.body.onWall() && !WarriorSpecialAttack2.body.onFloor() && WarriorSpecialAttack2.body.enable) {
            IsWarriorSpecialAttack2Used = false;
            WarriorSpecialAttack2.destroy();
        }
    }
}