/********************************** PRELOAD *******************************************************/

//Phaser will automatically look for this function when it starts and load anything defined within it
function preload() {
    BackgroundLoad(this);

    //Particles
    ParticlesLoad(this);

    //Load sprites for Main Player
    ArcherPlayerLoad(this);

    WarriorPlayerLoad(this);

    MagePlayerLoad(this);

    //Buff
    BuffsLoad(this);

    //Audio
    GameAudio(this)
}

function BackgroundLoad(parent) {
    //Sky, ground, etc, is the link in the code when creating game objects    
    parent.load.image('background', './Assets/unity3d-assets/TooCubeForest/backgrounds/BG_cave2_1024.png');
    parent.load.image('sound-icon', './Assets/images/sound-icon.png');
    parent.load.image('mute-icon', './Assets/images/mute-icon.png');
    //TODO: Get rid of this and all other phaser assets
    parent.load.image('star', './Assets/images/star.png');

    parent.load.spritesheet('ground',
        './Assets/unity3d-assets/TooCubeForest/images/Forest_terrain_red_128px.png',
        { frameWidth: 64, frameHeight: 64 }
    );

    parent.load.image('floatingGround1', './Assets/unity3d-assets/TooCubeForest/images/Forest_deco_covers(spring)-1.png');

    //Load animated plants
    for (var i = 0; i <= 60; i++) {
        parent.load.image('alg' + i, './Assets/unity3d-assets/2D-Handcrafted-Art/Sprite/Alg2/Algae1-animation_' + i + '.png');
    }
}

function ParticlesLoad(parent) {
    //TODO: Replace phaser-assets with other graphics    
    parent.load.image('fire3', './Assets/phaser-assets/particles/fire3.png');
}

function GameAudio(parent) {
    parent.load.audio('collectingSound', './Assets/phaser-assets/audio/SoundEffects/p-ping.mp3');
    parent.load.audio('jump', './Assets/audio/bounce.wav');
    parent.load.audio('gameMusic', './Assets/unity3d-assets/2D-Handcrafted-Art/Music/Tropical moments - loop version.wav');
    parent.load.audio('speedBuffSound', './Assets/phaser-assets/audio/SoundEffects/pickup.wav');
    parent.load.audio('strengthBuffSound', './Assets/phaser-assets/audio/SoundEffects/door_open.wav');
    parent.load.audio('shootingArrow', './Assets/unity3d-assets/BowAndArrow/Sounds/ArrowShoosh2.mp3');
    parent.load.audio('arrowHit', './Assets/unity3d-assets/BowAndArrow/Sounds/ArrowImpactTarget.mp3');
    parent.load.audio('swordAttack1', './Assets/unity3d-assets/AxeSwingDamageSounds/Axe_swing_s_e01.wav');
    parent.load.audio('swordAttack2', './Assets/unity3d-assets/AxeSwingDamageSounds/Axe_swing_s_e02.wav');
    parent.load.audio('axeAttack1', './Assets/unity3d-assets/AxeSwingDamageSounds/Axe_swing_m_e02.wav');
    parent.load.audio('axeAttack2', './Assets/unity3d-assets/AxeSwingDamageSounds/Axe_swing_m_e03.wav');
}

function BuffsLoad(parent) {
    parent.load.image('speedBuff', './Assets/unity3d-assets/TooCubeForest/images/rock-speed-buff.png');
    parent.load.image('strengthBuff', './Assets/unity3d-assets/TooCubeForest/images/rock-strength-buff.png');
}

function ArcherPlayerLoad(parent) {
    parent.load.image('arrow-right', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-right.png');
    parent.load.image('arrow-left', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-left.png');

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-attack1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'left.png');
        parent.load.image('archer1-attack1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'right.png');
        parent.load.image('archer2-attack1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack1_' + i + 'left.png');
        parent.load.image('archer2-attack1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack1_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-attack2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'left.png');
        parent.load.image('archer1-attack2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'right.png');
        parent.load.image('archer2-attack2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack2_' + i + 'left.png');
        parent.load.image('archer2-attack2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Attack2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-death-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'left.png');
        parent.load.image('archer1-death-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'right.png');
        parent.load.image('archer2-death-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Death_' + i + 'left.png');
        parent.load.image('archer2-death-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 4; i++) {
        parent.load.image('archer1-hit-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'left.png');
        parent.load.image('archer1-hit-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'right.png');
        parent.load.image('archer2-hit-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Hit_' + i + 'left.png');
        parent.load.image('archer2-hit-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Hit_' + i + 'right.png');
    }

    for (var i = 0; i <= 29; i++) {
        parent.load.image('archer1-idle2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'left.png');
        parent.load.image('archer1-idle2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'right.png');
        parent.load.image('archer2-idle2-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Idle2_' + i + 'left.png');
        parent.load.image('archer2-idle2-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Idle2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-idle1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'left.png');
        parent.load.image('archer1-idle1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'right.png');
        parent.load.image('archer2-idle1-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_idle_' + i + 'left.png');
        parent.load.image('archer2-idle1-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 12; i++) {
        parent.load.image('archer1-jump-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'left.png');
        parent.load.image('archer1-jump-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'right.png');
        parent.load.image('archer2-jump-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Jump_' + i + 'left.png');
        parent.load.image('archer2-jump-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_Jump_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-walk-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'left.png');
        parent.load.image('archer1-walk-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'right.png');
        parent.load.image('archer2-walk-left' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_walk_' + i + 'left.png');
        parent.load.image('archer2-walk-right' + i, './Assets/unity3d-assets/SpritesArchers/Archer3/FantasyArcher_03_walk_' + i + 'right.png');
    }

    parent.load.image('arrow-left', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-left.png');
    parent.load.image('arrow-right', './Assets/unity3d-assets/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-right.png');
}

function WarriorPlayerLoad(parent) {

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-attack1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack1_' + i + 'left.png');
        parent.load.image('warrior1-attack1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack1_' + i + 'right.png');
        parent.load.image('warrior2-attack1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack1_' + i + 'left.png');
        parent.load.image('warrior2-attack1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack1_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-attack2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack2_' + i + 'left.png');
        parent.load.image('warrior1-attack2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack2_' + i + 'right.png');
        parent.load.image('warrior2-attack2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_' + i + 'left.png');
        parent.load.image('warrior2-attack2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-death-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Death_' + i + 'left.png');
        parent.load.image('warrior1-death-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Death_' + i + 'right.png');
        parent.load.image('warrior2-death-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Death_' + i + 'left.png');
        parent.load.image('warrior2-death-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 4; i++) {
        parent.load.image('warrior1-hit-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Hit_' + i + 'left.png');
        parent.load.image('warrior1-hit-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Hit_' + i + 'right.png');
        parent.load.image('warrior2-hit-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Hit_' + i + 'left.png');
        parent.load.image('warrior2-hit-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Hit_' + i + 'right.png');
    }

    for (var i = 0; i <= 29; i++) {
        parent.load.image('warrior1-idle2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Idle2_' + i + 'left.png');
        parent.load.image('warrior1-idle2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Idle2_' + i + 'right.png');
        parent.load.image('warrior2-idle2-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Idle2_' + i + 'left.png');
        parent.load.image('warrior2-idle2-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Idle2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-idle1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_idle_' + i + 'left.png');
        parent.load.image('warrior1-idle1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_idle_' + i + 'right.png');
        parent.load.image('warrior2-idle1-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_idle_' + i + 'left.png');
        parent.load.image('warrior2-idle1-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 12; i++) {
        parent.load.image('warrior1-jump-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Jump_' + i + 'left.png');
        parent.load.image('warrior1-jump-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_Jump_' + i + 'right.png');
        parent.load.image('warrior2-jump-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Jump_' + i + 'left.png');
        parent.load.image('warrior2-jump-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_Jump_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-walk-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_walk_' + i + 'left.png');
        parent.load.image('warrior1-walk-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior1/FantasyWarrior_01_walk_' + i + 'right.png');
        parent.load.image('warrior2-walk-left' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_walk_' + i + 'left.png');
        parent.load.image('warrior2-walk-right' + i, './Assets/unity3d-assets/SpritesWarriors/Warrior3/FantasyWarrior_01_walk_' + i + 'right.png');
    }
}

function MagePlayerLoad(parent) {
    for (var i = 0; i <= 17; i++) {
        parent.load.image('mage1-idle1-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Idle/MageHeroRank02_Idle_' + i + 'left.png');
        parent.load.image('mage1-idle1-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Idle/MageHeroRank02_Idle_' + i + 'right.png');
        parent.load.image('mage2-idle1-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Idle/MageHeroRank03_Idle_' + i + 'left.png');
        parent.load.image('mage2-idle1-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Idle/MageHeroRank03_Idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 20; i++) {
        parent.load.image('mage1-attack1-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack_01/MageHeroRank02_Attack01_' + i + 'left.png');
        parent.load.image('mage1-attack1-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack_01/MageHeroRank02_Attack01_' + i + 'right.png');
        parent.load.image('mage2-attack1-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack_01/MageHeroRank03_Attack01_' + i + 'left.png');
        parent.load.image('mage2-attack1-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack_01/MageHeroRank03_Attack01_' + i + 'right.png');
    }

    for (var i = 0; i <= 20; i++) {
        parent.load.image('mage1-attack2-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack_02/MageHeroRank02_Attack02_' + i + 'left.png');
        parent.load.image('mage1-attack2-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack_02/MageHeroRank02_Attack02_' + i + 'right.png');
        parent.load.image('mage2-attack2-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack_02/MageHeroRank03_Attack02_' + i + 'left.png');
        parent.load.image('mage2-attack2-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack_02/MageHeroRank03_Attack02_' + i + 'right.png');
    }

    for (var i = 0; i <= 20; i++) {
        parent.load.image('mage1-death-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Death/MageHeroRank02_Death_' + i + 'left.png');
        parent.load.image('mage1-death-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Death/MageHeroRank02_Death_' + i + 'right.png');
        parent.load.image('mage2-death-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Death/MageHeroRank03_Death_' + i + 'left.png');
        parent.load.image('mage2-death-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Death/MageHeroRank03_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 9; i++) {
        parent.load.image('mage1-hit-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Damage/MageHeroRank02_Damage_' + i + 'left.png');
        parent.load.image('mage1-hit-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Damage/MageHeroRank02_Damage_' + i + 'right.png');
        parent.load.image('mage2-hit-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Damage/MageHeroRank03_Damage_' + i + 'left.png');
        parent.load.image('mage2-hit-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Damage/MageHeroRank03_Damage_' + i + 'right.png');
    }

    for (var i = 0; i <= 17; i++) {
        parent.load.image('mage1-walkforward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Forward/MageHeroRank02_Walk_Forward_' + i + 'left.png');
        parent.load.image('mage1-walkforward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Forward/MageHeroRank02_Walk_Forward_' + i + 'right.png');
        parent.load.image('mage2-walkforward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Forward/MageHeroRank03_Walk_Forward_' + i + 'left.png');
        parent.load.image('mage2-walkforward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Forward/MageHeroRank03_Walk_Forward_' + i + 'right.png');
    }

    for (var i = 0; i <= 17; i++) {
        parent.load.image('mage1-walkbackward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Back/MageHeroRank02_Walk_Back_' + i + 'left.png');
        parent.load.image('mage1-walkbackward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Back/MageHeroRank02_Walk_Back_' + i + 'right.png');
        parent.load.image('mage2-walkbackward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Back/MageHeroRank03_Walk_Back_' + i + 'left.png');
        parent.load.image('mage2-walkbackward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Back/MageHeroRank03_Walk_Back_' + i + 'right.png');
    }

    for (var i = 0; i <= 15; i++) {
        parent.load.image('mage1-runbackward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Back/MageHeroRank02_Run_Back_' + i + 'left.png');
        parent.load.image('mage1-runbackward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Back/MageHeroRank02_Run_Back_' + i + 'right.png');
        parent.load.image('mage2-runbackward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Back/MageHeroRank03_Run_Back_' + i + 'left.png');
        parent.load.image('mage2-runbackward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Back/MageHeroRank03_Run_Back_' + i + 'right.png');
    }

    for (var i = 0; i <= 15; i++) {
        parent.load.image('mage1-runforward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Forward/MageHeroRank02_Run_Forward_' + i + 'left.png');
        parent.load.image('mage1-runforward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Forward/MageHeroRank02_Run_Forward_' + i + 'right.png');
        parent.load.image('mage2-runforward-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Forward/MageHeroRank03_Run_Forward_' + i + 'left.png');
        parent.load.image('mage2-runforward-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Forward/MageHeroRank03_Run_Forward_' + i + 'right.png');
    }

    for (var i = 0; i <= 22; i++) {
        parent.load.image('mage1-cast1-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast_01/MageHeroRank02_Cast01_' + i + 'left.png');
        parent.load.image('mage1-cast1-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast_01/MageHeroRank02_Cast01_' + i + 'right.png');
        parent.load.image('mage2-cast1-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast_01/MageHeroRank03_Cast01_' + i + 'left.png');
        parent.load.image('mage2-cast1-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast_01/MageHeroRank03_Cast01_' + i + 'right.png');
    }

    for (var i = 0; i <= 17; i++) {
        parent.load.image('mage1-cast2-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast_02/MageHeroRank02_Cast02_' + i + 'left.png');
        parent.load.image('mage1-cast2-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast_02/MageHeroRank02_Cast02_' + i + 'right.png');
        parent.load.image('mage2-cast2-left' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast_02/MageHeroRank03_Cast02_' + i + 'left.png');
        parent.load.image('mage2-cast2-right' + i, './Assets/unity3d-assets/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast_02/MageHeroRank03_Cast02_' + i + 'right.png');
    }

    parent.load.image('mage-mainattack1', './Assets/unity3d-assets/FireMagicVFX/fx-textures/flare-alpha.png');

}
/********************************** PRELOAD *******************************************************/