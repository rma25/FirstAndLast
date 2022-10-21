function ArcherController(parent) {
  Cursors = parent.input.keyboard.createCursorKeys();

  var archerPlayer = game.player;
  var playerInfo = {};
  playerInfo.PlayerId = CurrentClientId;
  playerInfo.IsWarriorChar = true;
  game.IsArcherChar = true;

  if (!IsGameOver && archerPlayer != null && archerPlayer != undefined) {
    var currentArcher = game.DoesPlayerHasStrengthBuff
      ? "archer2-"
      : "archer1-";

    if (game.DoesPlayerHasStrengthBuff) {
      //Change collision box site
      archerPlayer.body.setSize(300, 350);
    }

    //Change animation frame Rate to 15 otherwise back to original if player is not running
    archerPlayer.anims.frameRate = parent.run.isDown ? 24 : 10;

    //Player Left
    if (Cursors.left.isDown) {
      game.IsPlayerIdle = false;
      game.IsMainPlayerFacingLeft = true;
      archerPlayer.setVelocityX(
        (game.DoesPlayerHasSpeedBuff ? -350 : -240) *
          (parent.run.isDown ? 1.55 : 1)
      );
      archerPlayer.anims.play(currentArcher + "walk-left", true);

      if (
        archerPlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) ==
        0
      ) {
        if (!PlayerStepSound.isPlaying) {
          PlayerStepSound.play();
        }
      }
    }
    //Player Right
    else if (Cursors.right.isDown) {
      game.IsPlayerIdle = false;
      game.IsMainPlayerFacingLeft = false;
      archerPlayer.setVelocityX(
        (game.DoesPlayerHasSpeedBuff ? 350 : 240) *
          (parent.run.isDown ? 1.55 : 1)
      );
      archerPlayer.anims.play(currentArcher + "walk-right", true);

      if (
        archerPlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) ==
        0
      ) {
        if (!PlayerStepSound.isPlaying) {
          PlayerStepSound.play();
        }
      }
    }
    //Player Not Moving
    else {
      //Stop moving
      archerPlayer.setVelocityX(0);

      //Main attack (regular)
      if (parent.mainAttack1.isDown && !game.IsArrowShot) {
        game.IsPlayerIdle = false;
        if (game.IsMainPlayerFacingLeft) {
          archerPlayer.anims.play(currentArcher + "attack2-left", true);

          //Only attack on the last animation frame
          if (archerPlayer.anims.currentFrame.index >= 10) {
            game.IsArrowShot = true;
            game.ArrowsLeft.setAngle(0);
            game.ArrowsLeft.enableBody(
              true,
              archerPlayer.x - 16,
              archerPlayer.y,
              true,
              true
            );
            game.ArrowsLeft.body.setAllowRotation(true);
            game.ArrowsLeft.body.setAngularVelocity(-15);
            game.ArrowsLeft.body.setAngularAcceleration(-15);
            game.sound.play("shootingArrow");

            if (game.DoesPlayerHasStrengthBuff) {
              game.ArrowsLeft.setVelocity(-600, -100);
              game.ArrowsLeft.setAcceleration(-600, 100);
            } else {
              game.ArrowsLeft.setVelocity(-400, -100);
              game.ArrowsLeft.setAcceleration(-400, 100);
            }

            game.DidArcherAttackOnce =
              archerPlayer.anims.currentFrame.textureKey.includes("attack1");
          }
        } else {
          archerPlayer.anims.play(currentArcher + "attack2-right", true);

          //Only attack on the last animation frame
          if (archerPlayer.anims.currentFrame.index >= 10) {
            game.IsArrowShot = true;
            game.ArrowsRight.setAngle(0);
            game.ArrowsRight.enableBody(
              true,
              archerPlayer.x + 16,
              archerPlayer.y,
              true,
              true
            );
            game.ArrowsRight.body.setAllowRotation(true);
            game.ArrowsRight.body.setAngularVelocity(15);
            game.ArrowsRight.body.setAngularAcceleration(15);
            game.sound.play("shootingArrow");

            if (game.DoesPlayerHasStrengthBuff) {
              game.ArrowsRight.setVelocity(600, -100);
              game.ArrowsRight.setAcceleration(600, 100);
            } else {
              game.ArrowsRight.setVelocity(400, -100);
              game.ArrowsRight.setAcceleration(400, 100);
            }

            game.DidArcherAttackOnce =
              archerPlayer.anims.currentFrame.textureKey.includes("attack1");
          }
        }
      }
      //Fast Arrow
      else if (parent.mainAttack2.isDown && !game.IsArrowShot) {
        game.IsPlayerIdle = false;

        if (game.IsMainPlayerFacingLeft) {
          archerPlayer.anims.play(currentArcher + "attack1-left", true);

          //Only attack on the last animation frame
          if (archerPlayer.anims.currentFrame.index >= 10) {
            game.IsArrowShot = true;
            game.ArrowsLeft.setAngle(0);
            game.ArrowsLeft.enableBody(
              true,
              archerPlayer.x - 16,
              archerPlayer.y,
              true,
              true
            );
            game.ArrowsLeft.body.setAllowRotation(true);
            game.ArrowsLeft.body.setAngularVelocity(-15);
            game.ArrowsLeft.body.setAngularAcceleration(-15);
            game.sound.play("shootingArrow");

            if (game.DoesPlayerHasStrengthBuff) {
              game.ArrowsLeft.setVelocity(-800, -100);
              game.ArrowsLeft.setAcceleration(-800, 100);
            } else {
              game.ArrowsLeft.setVelocity(-600, -100);
              game.ArrowsLeft.setAcceleration(-600, 100);
            }

            game.DidArcherAttackOnce =
              archerPlayer.anims.currentFrame.textureKey.includes("attack1");
          }
        } else {
          archerPlayer.anims.play(currentArcher + "attack1-right", true);

          //Only attack on the last animation frame
          if (archerPlayer.anims.currentFrame.index >= 10) {
            game.IsArrowShot = true;
            game.ArrowsRight.setAngle(0);
            game.ArrowsRight.enableBody(
              true,
              archerPlayer.x + 16,
              archerPlayer.y,
              true,
              true
            );
            game.ArrowsRight.body.setAllowRotation(true);
            game.ArrowsRight.body.setAngularVelocity(15);
            game.ArrowsRight.body.setAngularAcceleration(15);
            game.sound.play("shootingArrow");

            if (game.DoesPlayerHasStrengthBuff) {
              game.ArrowsRight.setVelocity(800, -100);
              game.ArrowsRight.setAcceleration(800, 100);
            } else {
              game.ArrowsRight.setVelocity(600, -100);
              game.ArrowsRight.setAcceleration(600, 100);
            }

            game.DidArcherAttackOnce =
              archerPlayer.anims.currentFrame.textureKey.includes("attack1");
          }
        }
      }
      //Trap
      else if (
        parent.specialAttack1.isDown &&
        !game.IsArcherSpecialAttack1Used
      ) {
        game.IsPlayerIdle = false;
        archerPlayer.anims.play(
          currentArcher +
            "specialAttack1-" +
            (game.IsMainPlayerFacingLeft ? "left" : "right"),
          true
        );

        //Only attack on the last animation frame
        if (archerPlayer.anims.currentFrame.isLast) {
          game.ArcherSpecialAttack1 = CreateArcherSpecialAttack1(
            parent,
            archerPlayer
          );
          game.ArcherSpecialAttack1.play("archer-specialAttack-1");

          if (game.IsMainPlayerFacingLeft) {
            game.ArcherSpecialAttack1.enableBody(
              true,
              archerPlayer.x - game.ArcherSpecialAttack1.displayWidth / 2,
              archerPlayer.y + archerPlayer.displayHeight / 2 - 3,
              true,
              true
            );
          } else {
            game.ArcherSpecialAttack1.enableBody(
              true,
              archerPlayer.x + game.ArcherSpecialAttack1.displayWidth / 2,
              archerPlayer.y + archerPlayer.displayHeight / 2 - 3,
              true,
              true
            );
          }

          setTimeout(DestroyArcherSpecialAttack1, 10000);
          game.sound.play("trapSetting");
          game.IsArcherSpecialAttack1Used = true;
        }
      }
      //Cannon Ball
      else if (
        parent.specialAttack2.isDown &&
        !game.IsArcherSpecialAttack2Used
      ) {
        game.IsPlayerIdle = false;
        archerPlayer.anims.play(
          currentArcher +
            "specialAttack1-" +
            (game.IsMainPlayerFacingLeft ? "left" : "right"),
          true
        );

        //Only attack on the last animation frame
        if (archerPlayer.anims.currentFrame.isLast) {
          game.ArcherSpecialAttack2_Cannon = CreateArcherSpecialAttack2_Cannon(
            parent,
            archerPlayer
          );
          game.ArcherSpecialAttack2_Cannon.play(
            "archer-specialAttack-2-0-" +
              (game.IsMainPlayerFacingLeft ? "left" : "right")
          );
          game.IsCannonFacingLeft = game.IsMainPlayerFacingLeft;

          if (game.IsMainPlayerFacingLeft) {
            game.ArcherSpecialAttack2_Cannon.enableBody(
              true,
              archerPlayer.x -
                game.ArcherSpecialAttack2_Cannon.displayWidth / 2,
              archerPlayer.y + 15,
              true,
              true
            );
          } else {
            game.ArcherSpecialAttack2_Cannon.enableBody(
              true,
              archerPlayer.x +
                game.ArcherSpecialAttack2_Cannon.displayWidth / 2,
              archerPlayer.y + 15,
              true,
              true
            );
          }

          game.IsArcherSpecialAttack2Used = true;
          game.sound.play("cannonReloading");
        }
      } else if (
        game.IsMainPlayerFacingLeft &&
        archerPlayer.body.touching.down &&
        !archerPlayer.body.isMoving
      ) {
        archerPlayer.anims.play(
          currentArcher + "idle" + (game.IsPlayerIdle ? "2" : "1") + "-left",
          true
        );
      } else if (
        !game.IsMainPlayerFacingLeft &&
        archerPlayer.body.touching.down &&
        !archerPlayer.body.isMoving
      ) {
        archerPlayer.anims.play(
          currentArcher + "idle" + (game.IsPlayerIdle ? "2" : "1") + "-right",
          true
        );
      }
    }

    const isPlayerTouchingDown = archerPlayer.body.touching.down;

    //Player Jump
    if ((Cursors.up.isDown || parent.jumpAlt.isDown) && isPlayerTouchingDown) {
      archerPlayer.setVelocityY(game.DoesPlayerHasStrengthBuff ? game.jumpVelocityHigh : game.jumpVelocityNormal);
      archerPlayer.anims.play(
        currentArcher +
          "jump-" +
          (game.IsMainPlayerFacingLeft ? "left" : "right"),
        true
      );

      //Jumping sound
      game.sound.play("jump");
    }

    //Shoot cannon ball
    ShootCannonBall(parent, archerPlayer);

    ArcherParticlesOnPlayer(this, archerPlayer);
    UpdateArcherAttacks();
    DestroyArcherAttacks();
  }
}

function ShootCannonBall(parent, archerPlayer) {
  if (
    game.ArcherSpecialAttack2_Cannon != null &&
    game.ArcherSpecialAttack2_Cannon != undefined &&
    game.ArcherSpecialAttack2_Cannon.anims != null &&
    game.ArcherSpecialAttack2_Cannon.anims != undefined
  ) {
    if (game.ArcherSpecialAttack2_Cannon.anims.currentFrame.isLast) {
      game.ArcherSpecialAttack2_Ball = CreateArcherSpecialAttack2_Ball(
        parent,
        archerPlayer
      );
      game.ArcherSpecialAttack2_Ball.play("archer-specialAttack-2-1");

      if (game.IsCannonFacingLeft) {
        game.ArcherSpecialAttack2_Ball.enableBody(
          true,
          game.ArcherSpecialAttack2_Cannon.x -
            game.ArcherSpecialAttack2_Ball.displayWidth / 2,
          game.ArcherSpecialAttack2_Cannon.y,
          true,
          true
        );
        game.ArcherSpecialAttack2_Ball.setVelocityX(
          game.DoesPlayerHasStrengthBuff ? -700 : -600
        );
        game.ArcherSpecialAttack2_Ball.setAccelerationX(
          game.DoesPlayerHasStrengthBuff ? -300 : -150
        );
      } else {
        game.ArcherSpecialAttack2_Ball.enableBody(
          true,
          game.ArcherSpecialAttack2_Cannon.x +
            game.ArcherSpecialAttack2_Ball.displayWidth / 2,
          game.ArcherSpecialAttack2_Cannon.y,
          true,
          true
        );
        game.ArcherSpecialAttack2_Ball.setVelocityX(
          game.DoesPlayerHasStrengthBuff ? 700 : 600
        );
        game.ArcherSpecialAttack2_Ball.setAccelerationX(
          game.DoesPlayerHasStrengthBuff ? 300 : 150
        );
      }

      //Make sure cannon dissapears
      game.ArcherSpecialAttack2_Cannon.destroy();

      game.sound.play("cannonShooting");
      game.IsArcherSpecialAttack2Used = true;
    }
  }
}

function ArcherParticlesOnPlayer(parent, archerPlayer) {
  ArcherEmitter.setPosition(
    archerPlayer.x,
    archerPlayer.y + archerPlayer.displayHeight / 2
  );
}

function CreateArcherSpecialAttack1(parent, archerPlayer) {
  var specialAttack1 = parent.physics.add.sprite(
    archerPlayer.displayWidth,
    archerPlayer.displayHeight,
    "archer-specialAttack1-0"
  );

  specialAttack1.setDisplaySize(
    specialAttack1.displayWidth / 5,
    specialAttack1.displayHeight / 5
  );
  specialAttack1.setCollideWorldBounds(true);
  specialAttack1.body.allowGravity = false;
  specialAttack1.disableBody(true, true);

  return specialAttack1;
}

function CreateArcherSpecialAttack2_Cannon(parent, archerPlayer) {
  var specialAttack2Cannon = parent.physics.add.sprite(
    archerPlayer.displayWidth,
    archerPlayer.displayHeight,
    "archer-specialAttack2-0"
  );

  specialAttack2Cannon.setDisplaySize(
    specialAttack2Cannon.displayWidth / 5,
    specialAttack2Cannon.displayHeight / 5
  );
  specialAttack2Cannon.setCollideWorldBounds(true);
  specialAttack2Cannon.body.allowGravity = false;
  specialAttack2Cannon.disableBody(true, true);

  return specialAttack2Cannon;
}

function CreateArcherSpecialAttack2_Ball(parent, archerPlayer) {
  var specialAttack2Ball = parent.physics.add.sprite(
    archerPlayer.displayWidth,
    archerPlayer.displayHeight,
    "archer-specialAttack2-7"
  );

  specialAttack2Ball.setDisplaySize(
    specialAttack2Ball.displayWidth / 7,
    specialAttack2Ball.displayHeight / 7
  );
  specialAttack2Ball.setCollideWorldBounds(true);
  specialAttack2Ball.body.allowGravity = false;
  specialAttack2Ball.disableBody(true, true);

  return specialAttack2Ball;
}

function UpdateArcherAttacks() {
  //Make sure the cannon is facing the right
  if (
    game.ArcherSpecialAttack2_Ball != null &&
    game.ArcherSpecialAttack2_Ball != undefined
  ) {
    if (game.IsMainPlayerFacingLeft) {
      game.ArcherSpecialAttack2_Ball.flipX = true;
    } else {
      game.ArcherSpecialAttack2_Ball.flipX = false;
    }
  }

  //In case it hits a wall (side of the window)
  if (game.IsMainPlayerFacingLeft) {
    if (game.ArrowsLeft.body.onWall() && !game.ArrowsLeft.body.onFloor()) {
      game.IsArrowShot = false;
    }
  } else {
    if (game.ArrowsRight.body.onWall() && !game.ArrowsRight.body.onFloor()) {
      game.IsArrowShot = false;
    }
  }
}

function DestroyArcherSpecialAttack1() {
  if (
    game.ArcherSpecialAttack1 != null &&
    game.ArcherSpecialAttack1 != undefined &&
    game.ArcherSpecialAttack1.body != null &&
    game.ArcherSpecialAttack1.body != undefined
  ) {
    game.IsArcherSpecialAttack1Used = false;
    game.ArcherSpecialAttack1.destroy();
  }
}

function DestroyArcherAttacks() {
  //In case it hits a wall (side of the window)
  if (
    game.ArcherSpecialAttack2_Ball != null &&
    game.ArcherSpecialAttack2_Ball != undefined &&
    game.ArcherSpecialAttack2_Ball.body != null &&
    game.ArcherSpecialAttack2_Ball.body != undefined
  ) {
    if (
      game.ArcherSpecialAttack2_Ball.body.onWall() &&
      !game.ArcherSpecialAttack2_Ball.body.onFloor() &&
      game.ArcherSpecialAttack2_Ball.body.enable
    ) {
      game.IsArcherSpecialAttack2Used = false;
      game.ArcherSpecialAttack2_Ball.destroy();
    }
  }
}
