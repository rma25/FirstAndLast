/********************************** UPDATE *******************************************************/
function update() {
    if (IsGameOver) {
        GameOver(this);
    }
    else {
        if (game.IsArcherChar) {
            ArcherController(this);
        }
        else if (game.IsWarriorChar) {
            WarriorController(this);
        }
        else if (game.IsMageChar) {
            MageController(this);
        }

        PlayBackgroundMusic();
    }
}

function PlayBackgroundMusic() {
    if (BgMusic != null && BgMusic != undefined && !BgMusic.isPlaying) {
        BgMusic.play();
    }
}

function DisableBuffs() {
    if (MageEmitter != null && MageEmitter != undefined) {
        MageEmitter.on = false;
        DoesPlayerHasSpeedBuff = false
    }

    if (WarriorEmitter != null && WarriorEmitter != undefined) {
        WarriorEmitter.on = false;
        DoesPlayerHasSpeedBuff = false
    }

    if (ArcherEmitter != null && ArcherEmitter != undefined) {
        ArcherEmitter.on = false;
        DoesPlayerHasSpeedBuff = false
    }
}

/** GAME OVER **/
function GameOver(parent) {
    if (IsGameOver) {

    }
}
/** GAME OVER **/
/********************************** UPDATE *******************************************************/
