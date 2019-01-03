/********************************** GLOBAL *******************************************************/
var WindowHeight = window.innerHeight;
var WindowWidth = window.innerWidth;
var CenterWidth = (WindowWidth / 2);
var CenterHeight = (WindowHeight / 2);
var Platforms;
var Cursors;
var Stars;
var Score = 0;
var ScoreText;
var Bombs;
var GroundHeight = 64;
var GroundWidth = 64;
var IsGameOver = false;
var OriginalPlayerWidth = 32;
var OriginalPlayerHeight = 48;
var BgImage;
var BgMusic;
var IsMainPlayerFacingLeft = false;
var ArrowsRight;
var ArrowsLeft;
var SpeedBuff;
var StrengthBuff;
var DoesPlayerHasSpeedBuff = false;
var DoesPlayerHasStrengthBuff = false;
var GrassGroundHeight = 27;
var GrassGroundWidth = 87;
var IsPlayerIdle = false;
/*Archer */
var IsArrowShot = false;
var ArcherPlayer;
var ArcherEmitter;
var ArcherParticles;
var DidArcherAttackOnce = false;
/*Warrior*/
var DidWarriorAttack = false;
var WarriorPlayer;
var WarriorEmitter;
var WarriorParticles;
var DidWarriorAttackOnce = false;
/*Mage*/
var DidMageAttack = false;
var MagePlayer;
var MageEmitter;
var MageParticles;
var DidMageAttackOnce = false;
var MageMainAttack1;
var MageMainAttack2;
var MageSpecialAttack1;
var MageSpecialAttack2;
var IsMageMainAttack1Used = false;
var IsMageMainAttack2Used = false;
var IsMageSpecialAttack1Used = false;
var IsMageSpecialAttack2Used = false;
/*Sound*/
var PlayerStepSound;
/*Class Selection*/
var IsMage = false;
var IsWarrior = false;
var IsArcher = false;
var MageBtn;
var ArcherBtn;
var WarriorBtn;
var CloseBtn;
var MagePlayerBtn;
var ArcherPlayerBtn;
var WarriorPlayerBtn;
var IsClassSelectionCreated = false;
/*Controllers Info*/
var QBtn;
var WBtn;
var EBtn;
var RBtn;
var ArrowsBtn;
var SPACEBtn;
var SHIFTBtn;
var IsControllersInfoCreated = false;
/*Menu*/
var StartBtn;
var ControllersBtn;
/*Scenes*/
var MenuScene = new Phaser.Scene('MainMenu');
MenuScene.preload = preloadMenu;
MenuScene.create = createMenu;
MenuScene.update = updateMenu;

var MainGameScene = new Phaser.Scene('MainGame');
MainGameScene.preload = preload;
MainGameScene.create = create;
MainGameScene.update = update;

/*Game Config*/
var config = {
    type: Phaser.AUTO,
    width: WindowWidth,
    height: WindowHeight,
    physics: {
        //Simple and light weight, good for mobile
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [MenuScene, MainGameScene]
};

var game = new Phaser.Game(config);

/********************************** GLOBAL *******************************************************/

/*MENU*/
function preloadMenu() {
    MenuLoad(this);
}

function createMenu() {
    MenuCreate(this);
}

function updateMenu() {
    MenuUpdate(this);
}

function MenuLoad(parent) {
    // parent.load.image('menu-background', './Assets/images/JoshsDaughter.jpg');
    parent.load.image('menu-background', './Assets/unity3d-assets/TooCubeForest/backgrounds/BG_cave_1024.png');
    parent.load.image('warriorPlayer', './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_13right.png');
    parent.load.image('magePlayer', './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast_02/MageHeroRank03_Cast02_2right.png');
    parent.load.image('archerPlayer', './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack1_13right.png');

    parent.load.image('btn-background', './Assets/unity3d-assets/FantasyWoodenGUI/UI_board_Large_parchment.png');
    parent.load.image('cancel-btn', './Assets/unity3d-assets/FantasyWoodenGUI/TextBTN_Cancel.png')
    parent.load.image('start-btn', './Assets/unity3d-assets/FantasyWoodenGUI/TextBTN_New-Start.png')
    parent.load.image('rules-btn', './Assets/unity3d-assets/FantasyWoodenGUI/RulesBtn.png');
    parent.load.image('warrior-btn', './Assets/unity3d-assets/FantasyWoodenGUI/warriorBtn.png');
    parent.load.image('mage-btn', './Assets/unity3d-assets/FantasyWoodenGUI/mageBtn.png');
    parent.load.image('archer-btn', './Assets/unity3d-assets/FantasyWoodenGUI/archerBtn.png');
    parent.load.image('controllers-btn', './Assets/unity3d-assets/FantasyWoodenGUI/Controllers.png');
    parent.load.image('close-btn', './Assets/unity3d-assets/FantasyWoodenGUI/Close_Button.png');
    parent.load.image('Q-btn', './Assets/unity3d-assets/FantasyWoodenGUI/Q_key.png');
    parent.load.image('W-btn', './Assets/unity3d-assets/FantasyWoodenGUI/W_key.png');
    parent.load.image('E-btn', './Assets/unity3d-assets/FantasyWoodenGUI/E_key.png');
    parent.load.image('R-btn', './Assets/unity3d-assets/FantasyWoodenGUI/R_key.png');
    parent.load.image('Arrows-btn', './Assets/unity3d-assets/FantasyWoodenGUI/Arrows_key.png');
    parent.load.image('shift-btn', './Assets/unity3d-assets/FantasyWoodenGUI/shift_key.png');
    parent.load.image('space-btn', './Assets/unity3d-assets/FantasyWoodenGUI/space_key.png');
}

function MenuCreate(parent) {
    var menuBGImage = parent.add.image(0, 0, 'menu-background');
    menuBGImage.setOrigin(0, 0);
    menuBGImage.setDisplaySize(WindowWidth, WindowHeight);

    parent.add.image(CenterWidth, CenterHeight, 'btn-background');

    StartBtn = parent.add.image(CenterWidth, CenterHeight - 100, 'start-btn');
    StartBtn.setDisplaySize(StartBtn.displayWidth / 2, StartBtn.displayHeight / 2);
    StartBtn.setInteractive({ userHandCursor: true });

    ControllersBtn = parent.add.image(CenterWidth, CenterHeight - 25, 'controllers-btn');
    ControllersBtn.setDisplaySize(ControllersBtn.displayWidth / 2, ControllersBtn.displayHeight / 2);
    ControllersBtn.setInteractive({ userHandCursor: true });

    StartBtn.on('pointerdown', () => { SelectPlayer(parent); });
    ControllersBtn.on('pointerdown', () => { ControllersInfo(parent); });
}

function SelectPlayer(parent) {
    DisplayMenuBtns(false);

    if (IsClassSelectionCreated) {
        DisplayPlayerSelection(true);
    }
    else {
        WarriorPlayerBtn = parent.add.image(CenterWidth, CenterHeight, 'warriorPlayer');
        WarriorPlayerBtn.setDisplaySize(150, 150);
        WarriorPlayerBtn.setInteractive({ useHandCursor: true });

        MagePlayerBtn = parent.add.image(CenterWidth + 250, CenterHeight - 20, 'magePlayer');
        MagePlayerBtn.setDisplaySize(150, 190);
        MagePlayerBtn.setInteractive({ useHandCursor: true });

        ArcherPlayerBtn = parent.add.image(CenterWidth - 250, CenterHeight, 'archerPlayer');
        ArcherPlayerBtn.setDisplaySize(150, 150);
        ArcherPlayerBtn.setInteractive({ useHandCursor: true });

        WarriorBtn = parent.add.image(CenterWidth, (CenterHeight + WarriorPlayerBtn.displayHeight - 30), 'warrior-btn');
        WarriorBtn.setDisplaySize(WarriorBtn.displayWidth / 2, WarriorBtn.displayHeight / 2);
        WarriorBtn.setInteractive({ userHandCursor: true });

        MageBtn = parent.add.image(CenterWidth + 250, ((CenterHeight - 20) + WarriorPlayerBtn.displayHeight - 10), 'mage-btn');
        MageBtn.setDisplaySize(MageBtn.displayWidth / 2, MageBtn.displayHeight / 2);
        MageBtn.setInteractive({ userHandCursor: true });

        ArcherBtn = parent.add.image(CenterWidth - 250, (CenterHeight + WarriorPlayerBtn.displayHeight - 30), 'archer-btn');
        ArcherBtn.setDisplaySize(ArcherBtn.displayWidth / 2, ArcherBtn.displayHeight / 2);
        ArcherBtn.setInteractive({ userHandCursor: true });

        MagePlayerBtn.on('pointerdown', () => { StartGame(parent, false, false, true); });
        WarriorPlayerBtn.on('pointerdown', () => { StartGame(parent, true, false, false); });
        ArcherPlayerBtn.on('pointerdown', () => { StartGame(parent, false, true, false); });
        MageBtn.on('pointerdown', () => { StartGame(parent, false, false, true); });
        WarriorBtn.on('pointerdown', () => { StartGame(parent, true, false, false); });
        ArcherBtn.on('pointerdown', () => { StartGame(parent, false, true, false); });

        CreateCloseBtn(parent);

        IsClassSelectionCreated = true;
    }
}

function ControllersInfo(parent) {
    DisplayMenuBtns(false);

    if (IsControllersInfoCreated) {
        DisplayControllersInfo(true);
    }
    else {
        QBtn = parent.add.image(CenterWidth - 250, CenterHeight - 100, 'Q-btn');
        QBtn.setDisplaySize(QBtn.displayWidth / 2, QBtn.displayHeight / 2);

        WBtn = parent.add.image(CenterWidth - 250, CenterHeight, 'W-btn');
        WBtn.setDisplaySize(WBtn.displayWidth / 2, WBtn.displayHeight / 2);

        EBtn = parent.add.image(CenterWidth - 250, CenterHeight + 100, 'E-btn');
        EBtn.setDisplaySize(EBtn.displayWidth / 2, EBtn.displayHeight / 2);

        RBtn = parent.add.image(CenterWidth - 250, CenterHeight + 200, 'R-btn');
        RBtn.setDisplaySize(RBtn.displayWidth / 2, RBtn.displayHeight / 2);

        SHIFTBtn = parent.add.image(CenterWidth + 50, CenterHeight - 100, 'shift-btn');
        SHIFTBtn.setDisplaySize(SHIFTBtn.displayWidth / 2, SHIFTBtn.displayHeight / 2);

        SPACEBtn = parent.add.image(CenterWidth + 50, CenterHeight, 'space-btn');
        SPACEBtn.setDisplaySize(SPACEBtn.displayWidth / 2, SPACEBtn.displayHeight / 2);

        ArrowsBtn = parent.add.image(CenterWidth + 50, CenterHeight + 100, 'Arrows-btn');
        ArrowsBtn.setDisplaySize(ArrowsBtn.displayWidth / 2, ArrowsBtn.displayHeight / 2);

        CreateCloseBtn(parent);

        IsControllersInfoCreated = true;
    }
}

function CreateCloseBtn(parent) {
    CloseBtn = parent.add.image(CenterWidth + 350, (CenterHeight / 2) + 50, 'close-btn');
    CloseBtn.setDisplaySize(CloseBtn.displayWidth / 2, CloseBtn.displayHeight / 2);
    CloseBtn.setInteractive({ userHandCursor: true });
    CloseBtn.on('pointerdown', () => { GoBackToMainMenu(parent); });
}

function DisplayCloseBtn(display) {
    if (CloseBtn != null && CloseBtn != undefined) {
        CloseBtn.visible = display;
    }
}

function DisplayControllersInfo(display) {
    if (IsControllersInfoCreated) {
        QBtn.visible = display;
        WBtn.visible = display;
        EBtn.visible = display;
        RBtn.visible = display;
        SHIFTBtn.visible = display;
        SPACEBtn.visible = display;
        ArrowsBtn.visible = display;
        DisplayCloseBtn(display);
    }
}

function DisplayMenuBtns(display) {
    StartBtn.visible = display;
    ControllersBtn.visible = display;
}

function DisplayPlayerSelection(display) {
    if (IsClassSelectionCreated) {
        MageBtn.visible = display;
        ArcherBtn.visible = display;
        WarriorBtn.visible = display;
        WarriorPlayerBtn.visible = display;
        ArcherPlayerBtn.visible = display;
        MagePlayerBtn.visible = display;
        DisplayCloseBtn(display);
    }
}

function StartGame(parent, isWarrior, isArcher, isMage) {
    //Start the game (new scene)
    IsWarrior = isWarrior;
    IsArcher = isArcher;
    IsMage = isMage;

    parent.scene.start('MainGame');
}

function GoBackToMainMenu(parent) {
    DisplayPlayerSelection(false);
    DisplayControllersInfo(false);
    DisplayMenuBtns(true);
}

function MenuUpdate(parent) {
    //Nothing for now
}
/*MENU*/