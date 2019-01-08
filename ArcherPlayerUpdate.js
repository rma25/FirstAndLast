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
            //Fast Arrow
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
            //Trap
            else if (parent.specialAttack1.isDown && !IsArcherSpecialAttack1Used) {
                IsPlayerIdle = false;
                ArcherPlayer.anims.play(currentArcher + 'specialAttack1-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                //Only attack on the last animation frame
                if (ArcherPlayer.anims.currentFrame.isLast) {
                    ArcherSpecialAttack1 = CreateArcherSpecialAttack1(parent);
                    ArcherSpecialAttack1.play('archer-specialAttack-1');

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
            //Cannon Ball
            else if (parent.specialAttack2.isDown && !IsArcherSpecialAttack2Used) {
                IsPlayerIdle = false;
                ArcherPlayer.anims.play(currentArcher + 'specialAttack1-' + (IsMainPlayerFacingLeft ? 'left' : 'right'), true);

                //Only attack on the last animation frame
                if (ArcherPlayer.anims.currentFrame.isLast) {
                    ArcherSpecialAttack2_Cannon = CreateArcherSpecialAttack2_Cannon(parent);
                    ArcherSpecialAttack2_Cannon.play('archer-specialAttack-2-0-' + (IsMainPlayerFacingLeft ? 'left' : 'right'));
                    IsCannonFacingLeft = IsMainPlayerFacingLeft;

                    if (IsMainPlayerFacingLeft) {
                        ArcherSpecialAttack2_Cannon.enableBody(true, ArcherPlayer.x - (ArcherSpecialAttack2_Cannon.displayWidth / 2), ArcherPlayer.y + 15, true, true);
                    }
                    else {
                        ArcherSpecialAttack2_Cannon.enableBody(true, ArcherPlayer.x + (ArcherSpecialAttack2_Cannon.displayWidth / 2), ArcherPlayer.y + 15, true, true);
                    }

                    IsArcherSpecialAttack2Used = true;
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

        //Shoot cannon ball
        if (ArcherSpecialAttack2_Cannon != null && ArcherSpecialAttack2_Cannon != undefined && ArcherSpecialAttack2_Cannon.anims != null && ArcherSpecialAttack2_Cannon.anims != undefined) {
            if (ArcherSpecialAttack2_Cannon.anims.currentFrame.isLast) {
                ArcherSpecialAttack2_Ball = CreateArcherSpecialAttack2_Ball(parent);
                ArcherSpecialAttack2_Ball.play('archer-specialAttack-2-1');

                if (IsCannonFacingLeft) {
                    ArcherSpecialAttack2_Ball.enableBody(true, ArcherSpecialAttack2_Cannon.x - (ArcherSpecialAttack2_Ball.displayWidth / 2), ArcherSpecialAttack2_Cannon.y + 20, true, true);
                    ArcherSpecialAttack2_Ball.setVelocityX(DoesPlayerHasStrengthBuff ? -350 : -250);
                    ArcherSpecialAttack2_Ball.setAccelerationX(DoesPlayerHasStrengthBuff ? -300 : -150);
                }
                else {
                    ArcherSpecialAttack2_Ball.enableBody(true, ArcherSpecialAttack2_Cannon.x + (ArcherSpecialAttack2_Ball.displayWidth / 2), ArcherSpecialAttack2_Cannon.y + 20, true, true);
                    ArcherSpecialAttack2_Ball.setVelocityX(DoesPlayerHasStrengthBuff ? 350 : 250);
                    ArcherSpecialAttack2_Ball.setAccelerationX(DoesPlayerHasStrengthBuff ? 300 : 150);
                }

                //Make sure cannon dissapears                
                ArcherSpecialAttack2_Cannon.destroy();

                game.sound.play('shootingArrow');
                IsArcherSpecialAttack2Used = true;
            }
        }

        ArcherParticlesOnPlayer(this);
        UpdateArcherAttacks();
        DestroyArcherAttacks();
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

function CreateArcherSpecialAttack2_Cannon(parent) {
    var specialAttack2Cannon = parent.physics.add.sprite(ArcherPlayer.displayWidth, ArcherPlayer.displayHeight, 'archer-specialAttack2-0');

    specialAttack2Cannon.setDisplaySize(specialAttack2Cannon.displayWidth / 5, specialAttack2Cannon.displayHeight / 5);
    specialAttack2Cannon.setCollideWorldBounds(true);
    specialAttack2Cannon.body.allowGravity = false;
    specialAttack2Cannon.disableBody(true, true);

    return specialAttack2Cannon;
}

function CreateArcherSpecialAttack2_Ball(parent) {
    var specialAttack2Ball = parent.physics.add.sprite(ArcherPlayer.displayWidth, ArcherPlayer.displayHeight, 'archer-specialAttack2-7');

    specialAttack2Ball.setDisplaySize(specialAttack2Ball.displayWidth / 5, specialAttack2Ball.displayHeight / 5);
    specialAttack2Ball.setCollideWorldBounds(true);
    specialAttack2Ball.body.allowGravity = false;
    specialAttack2Ball.disableBody(true, true);

    return specialAttack2Ball;
}

function UpdateArcherAttacks() {
    //Make sure the cannon is facing the right
    if (ArcherSpecialAttack2_Ball != null && ArcherSpecialAttack2_Ball != undefined) {
        if (IsMainPlayerFacingLeft) {
            ArcherSpecialAttack2_Ball.flipX = true;
        }
        else {
            ArcherSpecialAttack2_Ball.flipX = false;
        }
    }

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

function DestroyArcherSpecialAttack1() {
    if (ArcherSpecialAttack1 != null && ArcherSpecialAttack1 != undefined && ArcherSpecialAttack1.body != null && ArcherSpecialAttack1.body != undefined) {
        IsArcherSpecialAttack1Used = false;
        ArcherSpecialAttack1.destroy();
    }
}

function DestroyArcherAttacks() {
    //In case it hits a wall (side of the window)        
    if (ArcherSpecialAttack2_Ball != null && ArcherSpecialAttack2_Ball != undefined && ArcherSpecialAttack2_Ball.body != null && ArcherSpecialAttack2_Ball.body != undefined) {
        if (ArcherSpecialAttack2_Ball.body.onWall() && !ArcherSpecialAttack2_Ball.body.onFloor() && ArcherSpecialAttack2_Ball.body.enable) {
            IsArcherSpecialAttack2Used = false;
            ArcherSpecialAttack2_Ball.destroy();
        }
    }
}