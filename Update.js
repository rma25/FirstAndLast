/********************************** UPDATE *******************************************************/
function update() {
    if (ArcherPlayer != null && ArcherPlayer != undefined) {
        ArcherController(this);
    }

    if (WarriorPlayer != null && WarriorPlayer != undefined) {
        WarriorController(this);
    }

    if (MagePlayer != null && MagePlayer != undefined) {
        MageController(this);
    }

    GameOver(this);
}

function ArcherController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && ArcherPlayer != null && ArcherPlayer != undefined) {
        var currentArcher = (DoesPlayerHasStrengthBuff ? 'archer2-' : 'archer1-');

        if (DoesPlayerHasStrengthBuff) {
            //Change collision box site
            ArcherPlayer.body.setSize(300, 350);
        }

        //Player Left
        if (Cursors.left.isDown) {
            IsPlayerIdle = false;
            IsMainPlayerFacingLeft = true;
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190));
            ArcherPlayer.anims.play(currentArcher + 'walk-left', true);
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsPlayerIdle = false;
            IsMainPlayerFacingLeft = false;
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190));
            ArcherPlayer.anims.play(currentArcher + 'walk-right', true);
        }
        //Player Not Moving
        else {
            //Stop moving
            ArcherPlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack.isDown && !IsArrowShot) {
                IsPlayerIdle = false;
                if (IsMainPlayerFacingLeft) {
                    ArcherPlayer.anims.play(currentArcher + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-left', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsLeft.enableBody(true, ArcherPlayer.x - 16, ArcherPlayer.y, true, true);
                        ArrowsLeft.body.setAllowRotation(true);
                        ArrowsLeft.body.setAngularVelocity(-15);
                        ArrowsLeft.body.setAngularAcceleration(-15);
                        game.sound.play('shootingArrow');

                        if (DoesPlayerHasStrengthBuff) {
                            ArrowsLeft.setVelocity(-600, -100);
                            ArrowsLeft.setAcceleration(-600, 100);
                        }
                        else {
                            ArrowsLeft.setVelocity(-400, -100);
                            ArrowsLeft.setAcceleration(-400, 100);
                        }

                        DidArcherAttackOnce = ArcherPlayer.anims.currentFrame.textureKey.includes('attack1');
                    }
                }
                else {
                    ArcherPlayer.anims.play(currentArcher + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-right', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsRight.enableBody(true, ArcherPlayer.x + 16, ArcherPlayer.y, true, true);
                        ArrowsRight.body.setAllowRotation(true);
                        ArrowsRight.body.setAngularVelocity(15);
                        ArrowsRight.body.setAngularAcceleration(15);
                        game.sound.play('shootingArrow');

                        if (DoesPlayerHasStrengthBuff) {
                            ArrowsRight.setVelocity(600, -100);
                            ArrowsRight.setAcceleration(600, 100);
                        }
                        else {
                            ArrowsRight.setVelocity(400, -100);
                            ArrowsRight.setAcceleration(400, 100);
                        }

                        DidArcherAttackOnce = ArcherPlayer.anims.currentFrame.textureKey.includes('attack1');
                    }
                }
            }
            else if (IsMainPlayerFacingLeft && ArcherPlayer.body.touching.down && !ArcherPlayer.body.isMoving) {
                ArcherPlayer.anims.play(currentArcher + 'idle' + (IsPlayerIdle ? '2' : '1') + '-left', true);
            }
            else if (!IsMainPlayerFacingLeft && ArcherPlayer.body.touching.down && !ArcherPlayer.body.isMoving) {
                ArcherPlayer.anims.play(currentArcher + 'idle' + (IsPlayerIdle ? '2' : '1') + '-right', true);
            }
        }

        //Player Jump
        if ((Cursors.up.isDown || parent.jumpAlt.isDown) && ArcherPlayer.body.touching.down) {
            ArcherPlayer.setVelocityY((DoesPlayerHasStrengthBuff ? -670 : -550));
            ArcherPlayer.anims.play(currentArcher + 'jump-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

            //Jumping sound
            game.sound.play('jump');
        }

        ArcherParticlesOnPlayer(this);
    }
}

function ArcherParticlesOnPlayer(parent) {
    ArcherEmitter.setPosition(ArcherPlayer.x, ArcherPlayer.y + (ArcherPlayer.displayHeight / 2));
}

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
            WarriorPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190));
            WarriorPlayer.anims.play(currentWarrior + '-walk-left', true);
            IsPlayerIdle = false;
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            WarriorPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190));
            WarriorPlayer.anims.play(currentWarrior + '-walk-right', true);
            IsPlayerIdle = false;
        }
        //Player Not Moving
        else {
            //Stop moving
            WarriorPlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack.isDown) {
                IsPlayerIdle = false;

                WarriorPlayer.anims.play(currentWarrior + '-attack' + ((DidWarriorAttackOnce && DoesPlayerHasStrengthBuff) ? 1 : 2) + '-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (WarriorPlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        game.sound.play('axeAttack2');
                    }
                    else {
                        game.sound.play('swordAttack2');
                    }
                }

                if (WarriorPlayer.anims.currentFrame.index >= 14) {
                    DidWarriorAttackOnce = WarriorPlayer.anims.currentFrame.textureKey.includes('attack2');
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

        WarriorParticlesOnPlayer(this);
    }
}

function WarriorParticlesOnPlayer(parent) {
    WarriorEmitter.setPosition(WarriorPlayer.x, WarriorPlayer.y + (WarriorPlayer.displayHeight / 2));
}

function MageController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && MagePlayer != null && MagePlayer != undefined) {

        var currentMage = 'mage' + (DoesPlayerHasStrengthBuff ? '2' : '1');

        if (DoesPlayerHasStrengthBuff) {
            //Change collision box site
            MagePlayer.body.height = OriginalPlayerHeight + 10;
        }

        //Player Left
        if (Cursors.left.isDown) {
            IsMainPlayerFacingLeft = true;
            MagePlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190));
            MagePlayer.anims.play(currentMage + '-walkforward-left', true);
            IsPlayerIdle = false;
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            MagePlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190));
            MagePlayer.anims.play(currentMage + '-walkforward-right', true);
            IsPlayerIdle = false;
        }
        //Player Not Moving
        else {
            //Stop moving
            MagePlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack.isDown) {
                IsPlayerIdle = false;

                MagePlayer.anims.play(currentMage + '-attack' + ((DidMageAttackOnce) ? 2 : 1) + '-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (MagePlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        //game.sound.play('axeAttack2');
                    }
                    else {
                        //game.sound.play('swordAttack2');
                    }
                }

                if (MagePlayer.anims.currentFrame.index >= 14) {
                    DidMageAttackOnce = MagePlayer.anims.currentFrame.textureKey.includes('attack1');
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
            MagePlayer.setVelocityY((DoesPlayerHasStrengthBuff ? -670 : -550));
            // MagePlayer.anims.play(currentMage + '-jump-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

            //Jumping sound
            game.sound.play('jump');
        }

        MageParticlesOnPlayer(this);
    }
}

function MageParticlesOnPlayer(parent) {
    MageEmitter.setPosition(MagePlayer.x, MagePlayer.y + (MagePlayer.displayHeight / 2));
}

/** GAME OVER **/
function GameOver(parent) {
    if (IsGameOver) {

    }
}
/** GAME OVER **/
/********************************** UPDATE *******************************************************/