/*MENU*/
function preloadMenu() {
  LoadingScreen(this);
  MenuLoad(this);
}

function createMenu() {
  MenuCreate(this);
}

function updateMenu() {
  MenuUpdate(this);
}

var MenuBgMusic;

/***************************************************** PRELOAD ******************************************************************/
function MenuLoad(parent) {
  parent.load.audio(
    "menuBgMusic",
    _AssetsDir + "/audio/Unity3D/Ambience_Cave_00.wav"
  );
  parent.load.image(
    "menu-background",
    _AssetsDir + "/images/JoshsDaughter.jpg"
  );
  // parent.load.image('menu-background', _AssetsDir + '/unity3d-assets/TooCubeForest/backgrounds/BG_cave_1024.png');
  parent.load.image(
    "warriorPlayer",
    _AssetsDir +
      "/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_13right.png"
  );
  parent.load.image(
    "magePlayer",
    _AssetsDir +
      "/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast02_2right.png"
  );
  parent.load.image(
    "archerPlayer",
    _AssetsDir +
      "/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Attack1_13right.png"
  );

  parent.load.image(
    "btn-background",
    _AssetsDir + "/images/Menu/UI_board_Large_parchment.png"
  );
  parent.load.image(
    "cancel-btn",
    _AssetsDir + "/images/Menu/TextBTN_Cancel.png"
  );
  parent.load.image(
    "start-btn",
    _AssetsDir + "/images/Menu/TextBTN_New-Start.png"
  );
  parent.load.image("rules-btn", _AssetsDir + "/images/Menu/RulesBtn.png");
  parent.load.image("warrior-btn", _AssetsDir + "/images/Menu/warriorBtn.png");
  parent.load.image("mage-btn", _AssetsDir + "/images/Menu/mageBtn.png");
  parent.load.image("archer-btn", _AssetsDir + "/images/Menu/archerBtn.png");
  parent.load.image(
    "controllers-btn",
    _AssetsDir + "/images/Menu/Controllers.png"
  );
  parent.load.image("close-btn", _AssetsDir + "/images/Menu/Close_Button.png");
  parent.load.image("Q-btn", _AssetsDir + "/images/Menu/Q_key.png");
  parent.load.image("W-btn", _AssetsDir + "/images/Menu/W_key.png");
  parent.load.image("E-btn", _AssetsDir + "/images/Menu/E_key.png");
  parent.load.image("R-btn", _AssetsDir + "/images/Menu/R_key.png");
  parent.load.image("Arrows-btn", _AssetsDir + "/images/Menu/Arrows_key.png");
  parent.load.image("shift-btn", _AssetsDir + "/images/Menu/shift_key.png");
  parent.load.image("space-btn", _AssetsDir + "/images/Menu/space_key.png");

  parent.load.audio(
    "btnClickSound",
    _AssetsDir + "/audio/Unity3D/Menu_Select_00.wav"
  );
}
/***************************************************** PRELOAD ******************************************************************/

/***************************************************** CREATE ******************************************************************/
function MenuCreate(parent) {
  var menuBGImage = parent.add.image(0, 0, "menu-background");
  menuBGImage.setOrigin(0, 0);
  menuBGImage.setDisplaySize(WindowWidth, WindowHeight);

  MenuBtnBackgroundImg = parent.add.image(
    CenterWidth,
    CenterHeight,
    "btn-background"
  );
  MenuBtnBgImgOriginalWidth = MenuBtnBackgroundImg.displayWidth;
  MenuBtnBgImgOriginalHeight = MenuBtnBackgroundImg.displayHeight;

  StartBtn = parent.add.image(CenterWidth, CenterHeight - 100, "start-btn");
  StartBtn.setDisplaySize(
    StartBtn.displayWidth / 2,
    StartBtn.displayHeight / 2
  );
  StartBtn.setInteractive({ userHandCursor: true });

  ControllersBtn = parent.add.image(
    CenterWidth,
    CenterHeight - 25,
    "controllers-btn"
  );
  ControllersBtn.setDisplaySize(
    ControllersBtn.displayWidth / 2,
    ControllersBtn.displayHeight / 2
  );
  ControllersBtn.setInteractive({ userHandCursor: true });

  MenuBgMusic = parent.sound.add("menuBgMusic");
  MenuBgMusic.loop = true;
  MenuBgMusic.play();

  StartBtn.on("pointerdown", () => {
    SelectPlayer(parent);
  });
  ControllersBtn.on("pointerdown", () => {
    ControllersInfo(parent);
  });
}

function SelectPlayer(parent) {
  DisplayMenuBtns(false);
  game.sound.play("btnClickSound");

  if (IsClassSelectionCreated) {
    DisplayPlayerSelection(true);
  } else {
    WarriorPlayerBtn = parent.add.image(
      CenterWidth,
      CenterHeight,
      "warriorPlayer"
    );
    WarriorPlayerBtn.setDisplaySize(150, 150);
    WarriorPlayerBtn.setInteractive({ useHandCursor: true });

    MagePlayerBtn = parent.add.image(
      CenterWidth + 250,
      CenterHeight - 20,
      "magePlayer"
    );
    MagePlayerBtn.setDisplaySize(150, 190);
    MagePlayerBtn.setInteractive({ useHandCursor: true });

    ArcherPlayerBtn = parent.add.image(
      CenterWidth - 250,
      CenterHeight,
      "archerPlayer"
    );
    ArcherPlayerBtn.setDisplaySize(150, 150);
    ArcherPlayerBtn.setInteractive({ useHandCursor: true });

    WarriorBtn = parent.add.image(
      CenterWidth,
      CenterHeight + WarriorPlayerBtn.displayHeight - 30,
      "warrior-btn"
    );
    WarriorBtn.setDisplaySize(
      WarriorBtn.displayWidth / 2,
      WarriorBtn.displayHeight / 2
    );
    WarriorBtn.setInteractive({ userHandCursor: true });

    MageBtn = parent.add.image(
      CenterWidth + 250,
      CenterHeight - 20 + WarriorPlayerBtn.displayHeight - 10,
      "mage-btn"
    );
    MageBtn.setDisplaySize(MageBtn.displayWidth / 2, MageBtn.displayHeight / 2);
    MageBtn.setInteractive({ userHandCursor: true });

    ArcherBtn = parent.add.image(
      CenterWidth - 250,
      CenterHeight + WarriorPlayerBtn.displayHeight - 30,
      "archer-btn"
    );
    ArcherBtn.setDisplaySize(
      ArcherBtn.displayWidth / 2,
      ArcherBtn.displayHeight / 2
    );
    ArcherBtn.setInteractive({ userHandCursor: true });

    MagePlayerBtn.on("pointerdown", () => {
      StartGame(parent, false, false, true);
    });
    WarriorPlayerBtn.on("pointerdown", () => {
      StartGame(parent, true, false, false);
    });
    ArcherPlayerBtn.on("pointerdown", () => {
      StartGame(parent, false, true, false);
    });
    MageBtn.on("pointerdown", () => {
      StartGame(parent, false, false, true);
    });
    WarriorBtn.on("pointerdown", () => {
      StartGame(parent, true, false, false);
    });
    ArcherBtn.on("pointerdown", () => {
      StartGame(parent, false, true, false);
    });

    CreateCloseBtn(parent);

    IsClassSelectionCreated = true;
  }
}

function ControllersInfo(parent) {
  DisplayMenuBtns(false);
  ChangeMenuBgImgSize(true);
  game.sound.play("btnClickSound");

  if (IsControllersInfoCreated) {
    DisplayControllersInfo(true);
  } else {
    QBtn = parent.add.image(CenterWidth - 400, CenterHeight - 100, "Q-btn");
    QBtn.setDisplaySize(QBtn.displayWidth / 2, QBtn.displayHeight / 2);
    QBtnText = parent.add.text(
      QBtn.x + QBtn.displayWidth,
      QBtn.y,
      "Main Attack 1",
      { fontSize: "32px", fill: "#fff" }
    );

    WBtn = parent.add.image(CenterWidth - 400, CenterHeight, "W-btn");
    WBtn.setDisplaySize(WBtn.displayWidth / 2, WBtn.displayHeight / 2);
    WBtnText = parent.add.text(
      WBtn.x + WBtn.displayWidth,
      WBtn.y,
      "Main Attack 2",
      { fontSize: "32px", fill: "#fff" }
    );

    EBtn = parent.add.image(CenterWidth - 400, CenterHeight + 100, "E-btn");
    EBtn.setDisplaySize(EBtn.displayWidth / 2, EBtn.displayHeight / 2);
    EBtnText = parent.add.text(
      EBtn.x + EBtn.displayWidth,
      EBtn.y,
      "Special Attack 1",
      { fontSize: "32px", fill: "#fff" }
    );

    RBtn = parent.add.image(CenterWidth - 400, CenterHeight + 200, "R-btn");
    RBtn.setDisplaySize(RBtn.displayWidth / 2, RBtn.displayHeight / 2);
    RBtnText = parent.add.text(
      RBtn.x + RBtn.displayWidth,
      RBtn.y,
      "Special Attack 2",
      { fontSize: "32px", fill: "#fff" }
    );

    SHIFTBtn = parent.add.image(
      CenterWidth + 100,
      CenterHeight - 100,
      "shift-btn"
    );
    SHIFTBtn.setDisplaySize(
      SHIFTBtn.displayWidth / 2,
      SHIFTBtn.displayHeight / 2
    );
    SHIFTBtnText = parent.add.text(
      SHIFTBtn.x + SHIFTBtn.displayWidth / 1.5,
      SHIFTBtn.y,
      "Hold it to run",
      { fontSize: "32px", fill: "#fff" }
    );

    SPACEBtn = parent.add.image(CenterWidth + 100, CenterHeight, "space-btn");
    SPACEBtn.setDisplaySize(
      SPACEBtn.displayWidth / 2,
      SPACEBtn.displayHeight / 2
    );
    SPACEBtnText = parent.add.text(
      SPACEBtn.x + SPACEBtn.displayWidth / 1.5,
      SPACEBtn.y,
      "Jump",
      { fontSize: "32px", fill: "#fff" }
    );

    ArrowsBtn = parent.add.image(
      CenterWidth + 100,
      CenterHeight + 100,
      "Arrows-btn"
    );
    ArrowsBtn.setDisplaySize(
      ArrowsBtn.displayWidth / 2,
      ArrowsBtn.displayHeight / 2
    );
    ArrowsBtnText = parent.add.text(
      ArrowsBtn.x + ArrowsBtn.displayWidth / 1.5,
      ArrowsBtn.y,
      "Move the character",
      { fontSize: "32px", fill: "#fff" }
    );

    CreateCloseBtn(parent);

    IsControllersInfoCreated = true;
  }
}

function CreateCloseBtn(parent) {
  CloseBtn = parent.add.image(
    CenterWidth + 350,
    CenterHeight / 2 + 50,
    "close-btn"
  );
  CloseBtn.setDisplaySize(
    CloseBtn.displayWidth / 2,
    CloseBtn.displayHeight / 2
  );
  CloseBtn.setInteractive({ userHandCursor: true });
  CloseBtn.on("pointerdown", () => {
    GoBackToMainMenu(parent);
  });
}

function ChangeMenuBgImgSize(isControllerInfo) {
  if (MenuBtnBackgroundImg != null && MenuBtnBackgroundImg != undefined) {
    MenuBtnBackgroundImg.setDisplaySize(
      MenuBtnBgImgOriginalWidth * (isControllerInfo ? 1.5 : 1),
      MenuBtnBgImgOriginalHeight + (isControllerInfo ? 50 : 0)
    );
  }
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
    QBtnText.visible = display;
    WBtnText.visible = display;
    EBtnText.visible = display;
    RBtnText.visible = display;
    SHIFTBtnText.visible = display;
    SPACEBtnText.visible = display;
    ArrowsBtnText.visible = display;
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

  MenuBgMusic.stop();
  game.sound.play("btnClickSound");
  parent.scene.start("MainGame");
}

function GoBackToMainMenu(parent) {
  game.sound.play("btnClickSound");
  DisplayPlayerSelection(false);
  DisplayControllersInfo(false);
  DisplayMenuBtns(true);
  ChangeMenuBgImgSize(false);
}
/***************************************************** CREATE ******************************************************************/

/***************************************************** UPDATE ******************************************************************/
function MenuUpdate(parent) {}
/***************************************************** UPDATE ******************************************************************/

/*MENU*/
