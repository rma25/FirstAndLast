/********************************** UPDATE *******************************************************/
function update() {
    if (IsGameOver) {
        GameOver(this);
    }
    else {
        if (ArcherPlayer != null && ArcherPlayer != undefined) {
            ArcherController(this);
        }

        if (WarriorPlayer != null && WarriorPlayer != undefined) {
            WarriorController(this);
        }

        var magePlayer = game.playerMap[CurrentClientId];

        if (magePlayer != null && magePlayer != undefined) {
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
