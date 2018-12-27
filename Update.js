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

/** GAME OVER **/
function GameOver(parent) {
    if (IsGameOver) {

    }
}
/** GAME OVER **/
/********************************** UPDATE *******************************************************/