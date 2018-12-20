/********************************** UPDATE *******************************************************/
function update() {
    if (ArcherPlayer != null && ArcherPlayer != undefined) {
        ArcherController(this);
        ArcherParticlesOnPlayer(this);
    }

    if (WarriorPlayer != null && WarriorPlayer != undefined) {
        WarriorController(this);
        WarriorParticlesOnPlayer(this);
    }

    GameOver(this);
}

function ArcherController(parent) {
    Cursors = parent.input.keyboard.createCursorKeys();

    if (!IsGameOver && ArcherPlayer != null && ArcherPlayer != undefined) {
        //Player Left
        if (Cursors.left.isDown) {
            IsMainPlayerFacingLeft = true;
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190));
            ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'walk-left', true);
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190));
            ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'walk-right', true);
        }
        //Player Not Moving
        else {
            //Stop moving
            ArcherPlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack.isDown && !IsArrowShot) {

                if (IsMainPlayerFacingLeft) {
                    ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-left', true);

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
                    ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-right', true);

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
                ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'idle2-left', true);
            }
            else if (!IsMainPlayerFacingLeft && ArcherPlayer.body.touching.down && !ArcherPlayer.body.isMoving) {
                ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'idle2-right', true);
            }
        }

        //Player Jump
        if ((Cursors.up.isDown || parent.jumpAlt.isDown) && ArcherPlayer.body.touching.down) {
            ArcherPlayer.setVelocityY((DoesPlayerHasStrengthBuff ? -670 : -550));
            ArcherPlayer.anims.play((DoesPlayerHasStrengthBuff ? 'archer2-' : '') + 'jump-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

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

                WarriorPlayer.anims.play(currentWarrior + '-attack' + (DidWarriorAttackOnce && DoesPlayerHasStrengthBuff ? 1 : 2) + '-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                if (WarriorPlayer.anims.currentFrame.index === 3) {
                    if (DoesPlayerHasStrengthBuff) {
                        game.sound.play('axeAttack2');
                    }
                    else {
                        game.sound.play('swordAttack2');
                    }
                }

                if (WarriorPlayer.anims.currentFrame.index >= 14) {
                    DidWarriorAttackOnce = WarriorPlayer.anims.currentFrame.textureKey.includes('attack1');
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

/** GAME OVER **/
function GameOver(parent) {
    if (IsGameOver) {

    }
}
/** GAME OVER **/
/********************************** UPDATE *******************************************************/