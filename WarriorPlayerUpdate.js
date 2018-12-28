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
        }
        //Player Right
        else if (Cursors.right.isDown) {
            IsMainPlayerFacingLeft = false;
            WarriorPlayer.setVelocityX((DoesPlayerHasSpeedBuff ? 300 : 190) * (parent.run.isDown ? 1.65 : 1));
            WarriorPlayer.anims.play(currentWarrior + '-walk-right', true);
            IsPlayerIdle = false;
        }
        //Player Not Moving
        else {
            //Stop moving
            WarriorPlayer.setVelocityX(0);

            //Main attack (regular)
            if (parent.mainAttack1.isDown) {
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
            else if (parent.mainAttack2.isDown) {
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
            else if (parent.specialAttack1.isDown) {
                //TODO: Create Special Attack for Warrior
            }
            else if (parent.specialAttack2.isDown) {
                //TODO: Create Special Attack for Warrior
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