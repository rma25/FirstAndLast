function WarriorController(parent) {
  Cursors = parent.input.keyboard.createCursorKeys();

  var warriorPlayer = game.player;
  var playerInfo = {};
  playerInfo.PlayerId = CurrentClientId;
  playerInfo.IsWarriorChar = true;
  game.IsWarriorChar = true;

  if (!IsGameOver && warriorPlayer != null && warriorPlayer != undefined) {
    var currentWarrior =
      "warrior" + (game.DoesPlayerHasStrengthBuff ? "2" : "1");

    if (game.DoesPlayerHasStrengthBuff) {
      //Change collision box site
      warriorPlayer.body.setSize(300, 350);
    }

    //Player Left
    if (Cursors.left.isDown) {
      game.IsMainPlayerFacingLeft = true;
      warriorPlayer.setVelocityX(
        (game.DoesPlayerHasSpeedBuff ? -300 : -190) *
          (parent.run.isDown ? 1.65 : 1)
      );
      warriorPlayer.anims.play(currentWarrior + "-walk-left", true);
      game.IsPlayerIdle = false;

      playerInfo.IsWalkingLeft = true;
      playerInfo.IsWalkingRight = false;
      playerInfo.IsRunning = parent.run.isDown;
      playerInfo.IsMainPlayerFacingLeft = true;

      if (
        warriorPlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) ==
        0
      ) {
        if (!PlayerStepSound.isPlaying) {
          PlayerStepSound.play();
        }
      }
    }
    //Player Right
    else if (Cursors.right.isDown) {
      console.log("Walking Right");

      game.IsMainPlayerFacingLeft = false;
      warriorPlayer.setVelocityX(
        (game.DoesPlayerHasSpeedBuff ? 300 : 190) *
          (parent.run.isDown ? 1.65 : 1)
      );
      warriorPlayer.anims.play(currentWarrior + "-walk-right", true);
      game.IsPlayerIdle = false;

      playerInfo.IsWalkingLeft = false;
      playerInfo.IsWalkingRight = true;
      playerInfo.IsRunning = parent.run.isDown;
      playerInfo.IsMainPlayerFacingLeft = false;

      if (
        warriorPlayer.anims.currentFrame.index % (parent.run.isDown ? 3 : 6) ==
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
      warriorPlayer.setVelocityX(0);

      playerInfo.IsMainAttack1Down = parent.mainAttack1.isDown;
      playerInfo.IsMainAttack2Down = parent.mainAttack2.isDown;
      playerInfo.IsSpecialAttack1Down = parent.specialAttack1.isDown;
      playerInfo.IsSpecialAttack2Down = parent.specialAttack2.isDown;

      //Main attack (regular)
      if (parent.mainAttack1.isDown) {
        game.IsPlayerIdle = false;
        playerInfo.IsPlayerIdle = false;
        playerInfo.UsingWarriorMainAttack1 = true;

        warriorPlayer.anims.play(
          currentWarrior +
            "-attack" +
            (game.DoesPlayerHasStrengthBuff ? 1 : 2) +
            "-" +
            (game.IsMainPlayerFacingLeft ? "left" : "right"),
          true
        );

        if (warriorPlayer.anims.currentFrame.index === 3) {
          if (game.DoesPlayerHasStrengthBuff) {
            game.sound.play("axeAttack2");
          } else {
            game.sound.play("swordAttack2");
          }
        }
      } else if (parent.mainAttack2.isDown) {
        game.IsPlayerIdle = false;
        playerInfo.IsPlayerIdle = false;
        playerInfo.UsingWarriorMainAttack2 = true;

        warriorPlayer.anims.play(
          currentWarrior +
            "-attack2-" +
            (game.IsMainPlayerFacingLeft ? "left" : "right"),
          true
        );

        if (warriorPlayer.anims.currentFrame.index === 3) {
          if (game.DoesPlayerHasStrengthBuff) {
            game.sound.play("axeAttack2");
          } else {
            game.sound.play("swordAttack2");
          }
        }
      } else if (
        parent.specialAttack1.isDown &&
        !game.IsWarriorSpecialAttack1Used
      ) {
        game.IsPlayerIdle = false;
        playerInfo.IsPlayerIdle = false;

        warriorPlayer.anims.play(
          currentWarrior +
            "-attack" +
            (game.DidWarriorAttackOnce && game.DoesPlayerHasStrengthBuff
              ? 1
              : 2) +
            "-" +
            (game.IsMainPlayerFacingLeft ? "left" : "right"),
          true
        );

        if (warriorPlayer.anims.currentFrame.index >= 14) {
          playerInfo.UsingWarriorSpecialAttack1 = true;
          game.WarriorSpecialAttack1 = CreateWarriorSpecialAttack1(
            parent,
            warriorPlayer
          );

          if (game.IsMainPlayerFacingLeft) {
            game.WarriorSpecialAttack1.enableBody(
              true,
              warriorPlayer.x - 32,
              warriorPlayer.y,
              true,
              true
            );
            game.WarriorSpecialAttack1.setVelocityX(
              game.DoesPlayerHasStrengthBuff ? -350 : -250
            );
            game.WarriorSpecialAttack1.setAccelerationX(
              game.DoesPlayerHasStrengthBuff ? -300 : -150
            );
          } else {
            game.WarriorSpecialAttack1.enableBody(
              true,
              warriorPlayer.x + 32,
              warriorPlayer.y,
              true,
              true
            );
            game.WarriorSpecialAttack1.setVelocityX(
              game.DoesPlayerHasStrengthBuff ? 350 : 250
            );
            game.WarriorSpecialAttack1.setAccelerationX(
              game.DoesPlayerHasStrengthBuff ? 300 : 150
            );
          }

          if (game.DoesPlayerHasStrengthBuff) {
            game.sound.play("axeAttack2");
          } else {
            game.sound.play("swordAttack2");
          }

          game.IsWarriorSpecialAttack1Used = true;
          playerInfo.IsWarriorSpecialAttack1Used = true;
        }
      } else if (
        parent.specialAttack2.isDown &&
        !game.IsWarriorSpecialAttack2Used
      ) {
        game.IsPlayerIdle = false;
        playerInfo.IsPlayerIdle = false;

        warriorPlayer.anims.play(
          currentWarrior +
            "-attack" +
            (game.DidWarriorAttackOnce && game.DoesPlayerHasStrengthBuff
              ? 1
              : 2) +
            "-" +
            (game.IsMainPlayerFacingLeft ? "left" : "right"),
          true
        );

        if (warriorPlayer.anims.currentFrame.index >= 14) {
          playerInfo.UsingWarriorSpecialAttack2 = true;
          game.WarriorSpecialAttack2 = CreateWarriorSpecialAttack2(
            parent,
            warriorPlayer
          );

          if (game.IsMainPlayerFacingLeft) {
            game.WarriorSpecialAttack2.enableBody(
              true,
              warriorPlayer.x - 32,
              warriorPlayer.y,
              true,
              true
            );
            game.WarriorSpecialAttack2.setVelocityX(
              game.DoesPlayerHasStrengthBuff ? -350 : -250
            );
            game.WarriorSpecialAttack2.setAccelerationX(
              game.DoesPlayerHasStrengthBuff ? -300 : -150
            );
          } else {
            game.WarriorSpecialAttack2.enableBody(
              true,
              warriorPlayer.x + 32,
              warriorPlayer.y,
              true,
              true
            );
            game.WarriorSpecialAttack2.setVelocityX(
              game.DoesPlayerHasStrengthBuff ? 350 : 250
            );
            game.WarriorSpecialAttack2.setAccelerationX(
              game.DoesPlayerHasStrengthBuff ? 300 : 150
            );
          }

          if (game.DoesPlayerHasStrengthBuff) {
            game.sound.play("axeAttack2");
          } else {
            game.sound.play("swordAttack2");
          }

          game.IsWarriorSpecialAttack2Used = true;
          playerInfo.IsWarriorSpecialAttack2Used = true;
        }
      }
      //Idle Left
      else if (game.IsMainPlayerFacingLeft && !warriorPlayer.body.isMoving) {
        warriorPlayer.anims.play(
          currentWarrior + "-idle" + (game.IsPlayerIdle ? "2" : "1") + "-left",
          true
        );
      }
      //Idle Right
      else if (!IsMainPlayerFacingLeft && !warriorPlayer.body.isMoving) {
        warriorPlayer.anims.play(
          currentWarrior + "-idle" + (game.IsPlayerIdle ? "2" : "1") + "-right",
          true
        );
      }
    }

    //Player Jump
    if (
      (Cursors.up.isDown || parent.jumpAlt.isDown) &&
      warriorPlayer.body.touching.down
    ) {
      game.IsPlayerIdle = false;
      warriorPlayer.setVelocityY(game.DoesPlayerHasStrengthBuff ? game.jumpVelocityHigh : game.jumpVelocityNormal);
      warriorPlayer.anims.play(
        currentWarrior +
          "-jump-" +
          (game.IsMainPlayerFacingLeft ? "left" : "right"),
        true
      );

      //Jumping sound
      game.sound.play("jump");
    }

    UpdateWarriorAttacks(warriorPlayer);
    DestroyWarriorAttacks();
    WarriorParticlesOnPlayer(warriorPlayer);

    playerInfo.IsWarriorMainAttack1Used = game.IsWarriorMainAttack1Used;
    playerInfo.IsWarriorMainAttack2Used = game.IsWarriorMainAttack2Used;
    playerInfo.IsWarriorSpecialAttack1Used = game.IsWarriorSpecialAttack1Used;
    playerInfo.IsWarriorSpecialAttack2Used = game.IsWarriorSpecialAttack2Used;
    playerInfo.DoesPlayerHasStrengthBuff = game.DoesPlayerHasStrengthBuff;
    playerInfo.DoesPlayerHasSpeedBuff = game.DoesPlayerHasSpeedBuff;
    playerInfo.IsMainPlayerFacingLeft = game.IsMainPlayerFacingLeft;
    playerInfo.x = warriorPlayer.x;
    playerInfo.y = warriorPlayer.y;
    playerInfo.IsWarriorChar = true;
    playerInfo.DisplayWidth = warriorPlayer.displayWidth;
    playerInfo.DisplayHeight = warriorPlayer.displayHeight;

    // TODO: Uncomment for multiplayer
    // Client.sendPlayerInfo(playerInfo);
  }
}

function WarriorParticlesOnPlayer(warriorPlayer) {
  if (warriorPlayer != null && warriorPlayer != undefined) {
    WarriorEmitter.setPosition(
      warriorPlayer.x,
      warriorPlayer.y + warriorPlayer.displayHeight / 2
    );
  }
}

function CreateWarriorSpecialAttack1(parent, warriorPlayer) {
  var specialAttack1 = parent.physics.add.sprite(
    warriorPlayer.displayWidth,
    warriorPlayer.displayHeight,
    "warrior-specialAttack1"
  );

  specialAttack1.setDisplaySize(
    specialAttack1.displayWidth / 7,
    specialAttack1.displayHeight / 7
  );
  specialAttack1.setCollideWorldBounds(true);
  // specialAttack1.setTint('0xff9955');
  specialAttack1.body.allowGravity = false;
  specialAttack1.disableBody(true, true);

  return specialAttack1;
}

function CreateWarriorSpecialAttack2(parent, warriorPlayer) {
  var specialAttack2 = parent.physics.add.sprite(
    warriorPlayer.displayWidth,
    warriorPlayer.displayHeight,
    "warrior-specialAttack2"
  );

  specialAttack2.setDisplaySize(
    specialAttack2.displayWidth / 7,
    specialAttack2.displayHeight / 7
  );
  specialAttack2.setCollideWorldBounds(true);
  // specialAttack2.setTint('0xff9955');
  specialAttack2.body.allowGravity = false;
  specialAttack2.disableBody(true, true);

  return specialAttack2;
}

function UpdateWarriorAttacks() {
  if (
    game.WarriorSpecialAttack1 != null &&
    game.WarriorSpecialAttack1 != undefined
  ) {
    if (game.IsMainPlayerFacingLeft) {
      game.WarriorSpecialAttack1.flipX = false;
    } else {
      game.WarriorSpecialAttack1.flipX = true;
    }
  }

  if (
    game.WarriorSpecialAttack2 != null &&
    game.WarriorSpecialAttack2 != undefined
  ) {
    if (game.IsMainPlayerFacingLeft) {
      game.WarriorSpecialAttack2.flipX = true;
      game.WarriorSpecialAttack2.angle -= game.DoesPlayerHasStrengthBuff
        ? 12
        : 6;
    } else {
      game.WarriorSpecialAttack2.flipX = false;
      game.WarriorSpecialAttack2.angle += game.DoesPlayerHasStrengthBuff
        ? 12
        : 6;
    }
  }
}

function DestroyWarriorAttacks() {
  //In case it hits a wall (side of the window)
  if (
    game.WarriorSpecialAttack1 != null &&
    game.WarriorSpecialAttack1 != undefined &&
    game.WarriorSpecialAttack1.body != null &&
    game.WarriorSpecialAttack1.body != undefined
  ) {
    if (
      game.WarriorSpecialAttack1.body.onWall() &&
      !game.WarriorSpecialAttack1.body.onFloor() &&
      game.WarriorSpecialAttack1.body.enable
    ) {
      game.IsWarriorSpecialAttack1Used = false;
      game.WarriorSpecialAttack1.destroy();
    }
  }

  if (
    game.WarriorSpecialAttack2 != null &&
    game.WarriorSpecialAttack2 != undefined &&
    game.WarriorSpecialAttack2.body != null &&
    game.WarriorSpecialAttack2.body != undefined
  ) {
    if (
      game.WarriorSpecialAttack2.body.onWall() &&
      !game.WarriorSpecialAttack2.body.onFloor() &&
      game.WarriorSpecialAttack2.body.enable
    ) {
      game.IsWarriorSpecialAttack2Used = false;
      game.WarriorSpecialAttack2.destroy();
    }
  }
}

/*****************************************CLIENT UPDATE CODE******************************************/
var ClientWarriorMainAttack1Sprite = {};
var ClientWarriorMainAttack2Sprite = {};
var ClientWarriorSpecialAttack1Sprite = {};
var ClientWarriorSpecialAttack2Sprite = {};
var TEMPWarrior;

function UpdateClientWarrior(playerInfo) {
  if (CurrentClientId != -1) {
    var player = game.playerMap[playerInfo.PlayerId];

    if (player != null && player != undefined) {
      var currentWarrior =
        "warrior" + (playerInfo.DoesPlayerHasStrengthBuff ? "2" : "1");

      player.x = playerInfo.x;
      player.y = playerInfo.y;
      player.setDisplaySize(playerInfo.DisplayWidth, playerInfo.DisplayHeight);
      player.setCollideWorldBounds(true);
      player.body.setGravityY(400);

      TEMPWarrior = playerInfo;

      if (playerInfo.IsWalkingLeft) {
        player.setVelocityX(
          (playerInfo.DoesPlayerHasSpeedBuff ? -300 : -190) *
            (playerInfo.IsRunning ? 1.65 : 1)
        );
        player.anims.play(currentWarrior + "-walk-left", true);
      }
      //Player Right
      else if (playerInfo.IsWalkingRight) {
        player.setVelocityX(
          (playerInfo.DoesPlayerHasSpeedBuff ? 300 : 190) *
            (playerInfo.IsRunning ? 1.65 : 1)
        );
        player.anims.play(currentWarrior + "-walk-right", true);
      } else {
        player.setVelocityX(0);

        if (playerInfo.IsMainAttack1Down) {
          player.anims.play(
            currentWarrior +
              "-attack" +
              (playerInfo.DoesPlayerHasStrengthBuff ? 1 : 2) +
              "-" +
              (playerInfo.IsMainPlayerFacingLeft ? "left" : "right"),
            true
          );

          if (player.anims.currentFrame.index === 3) {
            if (playerInfo.DoesPlayerHasStrengthBuff) {
              game.sound.play("axeAttack2");
            } else {
              game.sound.play("swordAttack2");
            }
          }
        } else if (playerInfo.IsMainAttack2Down) {
          player.anims.play(
            currentWarrior +
              "-attack2-" +
              (playerInfo.IsMainPlayerFacingLeft ? "left" : "right"),
            true
          );

          if (player.anims.currentFrame.index === 3) {
            if (playerInfo.DoesPlayerHasStrengthBuff) {
              game.sound.play("axeAttack2");
            } else {
              game.sound.play("swordAttack2");
            }
          }
        }
        //Cast Special Attack
        else if (
          playerInfo.IsSpecialAttack1Down &&
          !playerInfo.IsWarriorSpecialAttack1Used
        ) {
          player.anims.play(
            currentWarrior +
              "-attack" +
              (playerInfo.DidWarriorAttackOnce &&
              playerInfo.DoesPlayerHasStrengthBuff
                ? 1
                : 2) +
              "-" +
              (playerInfo.IsMainPlayerFacingLeft ? "left" : "right"),
            true
          );

          if (player.anims.currentFrame.index >= 14) {
            playerInfo.UsingWarriorSpecialAttack1 = true;
            ClientWarriorSpecialAttack1Sprite = CreateWarriorSpecialAttack1(
              parent,
              player
            );

            if (game.IsMainPlayerFacingLeft) {
              ClientWarriorSpecialAttack1Sprite.enableBody(
                true,
                player.x - 32,
                player.y,
                true,
                true
              );
              ClientWarriorSpecialAttack1Sprite.setVelocityX(
                playerInfo.DoesPlayerHasStrengthBuff ? -350 : -250
              );
              ClientWarriorSpecialAttack1Sprite.setAccelerationX(
                playerInfo.DoesPlayerHasStrengthBuff ? -300 : -150
              );
            } else {
              ClientWarriorSpecialAttack1Sprite.enableBody(
                true,
                player.x + 32,
                player.y,
                true,
                true
              );
              ClientWarriorSpecialAttack1Sprite.setVelocityX(
                playerInfo.DoesPlayerHasStrengthBuff ? 350 : 250
              );
              ClientWarriorSpecialAttack1Sprite.setAccelerationX(
                playerInfo.DoesPlayerHasStrengthBuff ? 300 : 150
              );
            }

            if (playerInfo.DoesPlayerHasStrengthBuff) {
              game.sound.play("axeAttack2");
            } else {
              game.sound.play("swordAttack2");
            }
          }
        }
        //Cast Special Attack
        else if (
          playerInfo.IsSpecialAttack2Down &&
          !playerInfo.IsWarriorSpecialAttack2Used
        ) {
          player.anims.play(
            currentWarrior +
              "-attack" +
              (playerInfo.DidWarriorAttackOnce &&
              playerInfo.DoesPlayerHasStrengthBuff
                ? 1
                : 2) +
              "-" +
              (playerInfo.IsMainPlayerFacingLeft ? "left" : "right"),
            true
          );

          if (player.anims.currentFrame.index >= 14) {
            playerInfo.UsingWarriorSpecialAttack2 = true;
            ClientWarriorSpecialAttack2Sprite = CreateWarriorSpecialAttack2(
              parent,
              player
            );

            if (playerInfo.IsMainPlayerFacingLeft) {
              ClientWarriorSpecialAttack2Sprite.enableBody(
                true,
                player.x - 32,
                player.y,
                true,
                true
              );
              ClientWarriorSpecialAttack2Sprite.setVelocityX(
                playerInfo.DoesPlayerHasStrengthBuff ? -350 : -250
              );
              ClientWarriorSpecialAttack2Sprite.setAccelerationX(
                playerInfo.DoesPlayerHasStrengthBuff ? -300 : -150
              );
            } else {
              ClientWarriorSpecialAttack2Sprite.enableBody(
                true,
                player.x + 32,
                player.y,
                true,
                true
              );
              ClientWarriorSpecialAttack2Sprite.setVelocityX(
                playerInfo.DoesPlayerHasStrengthBuff ? 350 : 250
              );
              ClientWarriorSpecialAttack2Sprite.setAccelerationX(
                playerInfo.DoesPlayerHasStrengthBuff ? 300 : 150
              );
            }

            if (playerInfo.DoesPlayerHasStrengthBuff) {
              game.sound.play("axeAttack2");
            } else {
              game.sound.play("swordAttack2");
            }
          }
        }
        //Idle Left
        else if (playerInfo.IsMainPlayerFacingLeft && !player.body.isMoving) {
          player.anims.play(
            currentWarrior +
              "-idle" +
              (playerInfo.IsPlayerIdle ? "2" : "1") +
              "-left",
            true
          );
        }
        //Idle Right
        else if (!playerInfo.IsMainPlayerFacingLeft && !player.body.isMoving) {
          player.anims.play(
            currentWarrior +
              "-idle" +
              (playerInfo.IsPlayerIdle ? "2" : "1") +
              "-right",
            true
          );
        }
      }

      DestroyClientWarriorAttacks();
    }
  }
}

function DestroyClientWarriorAttacks() {
  if (
    ClientWarriorSpecialAttack2Sprite != null &&
    ClientWarriorSpecialAttack2Sprite != undefined &&
    ClientWarriorSpecialAttack2Sprite.body != null &&
    ClientWarriorSpecialAttack2Sprite.body != undefined
  ) {
    ClientWarriorSpecialAttack2Sprite.destroy();
  }

  if (
    ClientWarriorSpecialAttack1Sprite != null &&
    ClientWarriorSpecialAttack1Sprite != undefined &&
    ClientWarriorSpecialAttack1Sprite.body != null &&
    ClientWarriorSpecialAttack1Sprite.body != undefined
  ) {
    ClientWarriorSpecialAttack1Sprite.destroy();
  }
}

/*****************************************CLIENT UPDATE CODE******************************************/
