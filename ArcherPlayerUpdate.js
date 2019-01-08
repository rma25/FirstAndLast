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
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? -300 : -190) * (parent.run.isDown ? 1.55 : 1));
            ArcherPlayer.anims.play(currentArcher + 'walk-left', true);
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsPlayerIdle = false;
            IsMainPlayerFacingLeft = false;
            ArcherPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190) * (parent.run.isDown ? 1.55 : 1));
            ArcherPlayer.anims.play(currentArcher + 'walk-right', true);
        }
        //Player Not Moving
        else {
            //Stop moving
            ArcherPlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack1.isDown && !IsArrowShot) {
                IsPlayerIdle = false;
                if (IsMainPlayerFacingLeft) {
                    ArcherPlayer.anims.play(currentArcher + 'attack1-left', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsLeft.setAngle(0);
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
                    ArcherPlayer.anims.play(currentArcher + 'attack2-right', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsRight.setAngle(0);
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
            else if (parent.mainAttack2.isDown && !IsArrowShot) {
                IsPlayerIdle = false;
                if (IsMainPlayerFacingLeft) {
                    ArcherPlayer.anims.play(currentArcher + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-left', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsLeft.setAngle(0);
                        ArrowsLeft.enableBody(true, ArcherPlayer.x - 16, ArcherPlayer.y, true, true);
                        ArrowsLeft.body.setAllowRotation(true);
                        ArrowsLeft.body.setAngularVelocity(-15);
                        ArrowsLeft.body.setAngularAcceleration(-15);
                        game.sound.play('shootingArrow');

                        if (DoesPlayerHasStrengthBuff) {
                            ArrowsLeft.setVelocity(-800, -100);
                            ArrowsLeft.setAcceleration(-800, 100);
                        }
                        else {
                            ArrowsLeft.setVelocity(-600, -100);
                            ArrowsLeft.setAcceleration(-600, 100);
                        }

                        DidArcherAttackOnce = ArcherPlayer.anims.currentFrame.textureKey.includes('attack1');
                    }
                }
                else {
                    ArcherPlayer.anims.play(currentArcher + 'attack' + (DidArcherAttackOnce ? 2 : 1) + '-right', true);

                    //Only attack on the last animation frame
                    if (ArcherPlayer.anims.currentFrame.index >= 10) {
                        IsArrowShot = true;
                        ArrowsRight.setAngle(0);
                        ArrowsRight.enableBody(true, ArcherPlayer.x + 16, ArcherPlayer.y, true, true);
                        ArrowsRight.body.setAllowRotation(true);
                        ArrowsRight.body.setAngularVelocity(15);
                        ArrowsRight.body.setAngularAcceleration(15);
                        game.sound.play('shootingArrow');

                        if (DoesPlayerHasStrengthBuff) {
                            ArrowsRight.setVelocity(800, -100);
                            ArrowsRight.setAcceleration(800, 100);
                        }
                        else {
                            ArrowsRight.setVelocity(600, -100);
                            ArrowsRight.setAcceleration(600, 100);
                        }

                        DidArcherAttackOnce = ArcherPlayer.anims.currentFrame.textureKey.includes('attack1');
                    }
                }
            }
            else if (parent.specialAttack1.isDown && !IsArcherSpecialAttack1Used) {
                IsPlayerIdle = false;
                ArcherPlayer.anims.play(currentArcher + 'specialAttack1-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                //Only attack on the last animation frame
                if (ArcherPlayer.anims.currentFrame.isLast) {
                    ArcherSpecialAttack1 = CreateArcherSpecialAttack1(parent);
                    ArcherSpecialAttack1.play('archer-specialAttack-1')

                    if (IsMainPlayerFacingLeft) {
                        ArcherSpecialAttack1.enableBody(true, ArcherPlayer.x - (ArcherSpecialAttack1.displayWidth / 2), ArcherPlayer.y + (ArcherPlayer.displayHeight / 2) - 3, true, true);
                    }
                    else {
                        ArcherSpecialAttack1.enableBody(true, ArcherPlayer.x + (ArcherSpecialAttack1.displayWidth / 2), ArcherPlayer.y + (ArcherPlayer.displayHeight / 2) - 3, true, true);
                    }

                    setTimeout(DestroyArcherSpecialAttack1, 10000);
                    game.sound.play('shootingArrow');
                    IsArcherSpecialAttack1Used = true;
                }
            }
            else if (parent.specialAttack2.isDown) {
                //TODO: Create Special Attack for Archer (Buff)
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

        //In case it hits a wall (side of the window)
        if (IsMainPlayerFacingLeft) {
            if (ArrowsLeft.body.onWall() && !ArrowsLeft.body.onFloor()) {
                IsArrowShot = false;
            }
        }
        else {
            if (ArrowsRight.body.onWall() && !ArrowsRight.body.onFloor()) {
                IsArrowShot = false;
            }
        }
    }
}

function ArcherParticlesOnPlayer(parent) {
    ArcherEmitter.setPosition(ArcherPlayer.x, ArcherPlayer.y + (ArcherPlayer.displayHeight / 2));
}

function CreateArcherSpecialAttack1(parent) {
    var specialAttack1 = parent.physics.add.sprite(ArcherPlayer.displayWidth, ArcherPlayer.displayHeight, 'archer-specialAttack1-0');

    specialAttack1.setDisplaySize(specialAttack1.displayWidth / 5, specialAttack1.displayHeight / 5);
    specialAttack1.setCollideWorldBounds(true);
    specialAttack1.body.allowGravity = false;
    specialAttack1.disableBody(true, true);

    return specialAttack1;
}

function DestroyArcherSpecialAttack1() {
    if (ArcherSpecialAttack1 != null && ArcherSpecialAttack1 != undefined && ArcherSpecialAttack1.body != null && ArcherSpecialAttack1.body != undefined) {
        IsArcherSpecialAttack1Used = false;
        ArcherSpecialAttack1.destroy();
    }
}