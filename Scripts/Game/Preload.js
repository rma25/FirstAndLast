/********************************** PRELOAD *******************************************************/

//Phaser will automatically look for this function when it starts and load anything defined within it
function preload() {
    LoadingScreen(this);
    GameLoad(this);
}

function LoadingScreen(parent) {
    var progressBar = parent.add.graphics();
    var progressBox = parent.add.graphics();
    var width = parent.cameras.main.width;
    var height = parent.cameras.main.height;
    var loadingText = parent.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    var percentText = parent.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    var assetText = parent.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });

    assetText.setOrigin(0.5, 0.5);
    percentText.setOrigin(0.5, 0.5);
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(CenterWidth - 160, CenterHeight - 30, 320, 50);
    loadingText.setOrigin(0.5, 0.5);

    parent.load.on('progress', function(value) {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(CenterWidth - 150, CenterHeight - 20, 300 * value, 30);
        percentText.setText(parseInt(value * 100) + '%');
    });

    parent.load.on('fileprogress', function(file) {
        assetText.setText('Loading asset: ' + file.key);
    });

    parent.load.on('complete', function() {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });
}

function GameLoad(parent) {
    //Audio
    GameAudio(parent);
    
    BackgroundLoad(parent);

    //Particles
    ParticlesLoad(parent);

    //Load sprites for Main Player
    if (IsArcher) {
        ArcherPlayerLoad(parent);
    }
    else if (IsWarrior) {
        WarriorPlayerLoad(parent);
    }
    else if (IsMage) {
        MagePlayerLoad(parent);
    }
    else {
        //Default
        ArcherPlayerLoad(parent);
    }

    //Buff
    BuffsLoad(parent);

}

function BackgroundLoad(parent) {
    //Sky, ground, etc, is the link in the code when creating game objects    
    parent.load.image('background', _AssetsDir + '/images/Unity3D/Platforms/BG_cave2_1024.png');
    parent.load.image('sound-icon', _AssetsDir + '/images/sound-icon.png');
    parent.load.image('mute-icon', _AssetsDir + '/images/mute-icon.png');

    parent.load.spritesheet('ground',
        _AssetsDir + '/images/Unity3D/Platforms/Forest_terrain_red_128px.png', { frameWidth: 64, frameHeight: 64 }
    );

    parent.load.image('floatingGround1', _AssetsDir + '/images/Unity3D/Platforms/Forest_deco_covers(spring)-1.png');

    //Load animated plants
    for (var i = 0; i <= 60; i++) {
        parent.load.image('alg' + i, _AssetsDir + '/images/Unity3D/Algae1-animation_' + i + '.png');
    }
}

function ParticlesLoad(parent) {
    parent.load.image('fire3', _AssetsDir + '/images/Unity3D/fire-random-sheet-alpha1.png');
}

function GameAudio(parent) {
    parent.load.audio('jump', _AssetsDir + '/audio/Unity3D/jump_27.wav');
    parent.load.audio('gameMusic', _AssetsDir + '/audio/Unity3D/Tropical moments - loop version.wav');
    parent.load.audio('speedBuffSound', _AssetsDir + '/audio/Unity3D/power_up_13.wav');
    parent.load.audio('strengthBuffSound', _AssetsDir + '/audio/Unity3D/power_up_11.wav');
    parent.load.audio('shootingArrow', _AssetsDir + '/audio/Unity3D/ArrowShoosh2.mp3');
    parent.load.audio('arrowHit', _AssetsDir + '/audio/Unity3D/ArrowImpactTarget.mp3');
    parent.load.audio('swordAttack1', _AssetsDir + '/audio/Unity3D/Axe_swing_s_e01.wav');
    parent.load.audio('swordAttack2', _AssetsDir + '/audio/Unity3D/Axe_swing_s_e02.wav');
    parent.load.audio('axeAttack1', _AssetsDir + '/audio/Unity3D/Axe_swing_m_e02.wav');
    parent.load.audio('axeAttack2', _AssetsDir + '/audio/Unity3D/Axe_swing_m_e03.wav');

    parent.load.audio('playerStep', _AssetsDir + '/audio/Unity3D/Footstep_Dirt_01.wav');
    parent.load.audio('mageMainAttack1', _AssetsDir + '/audio/Unity3D/Spell_01.wav');
    parent.load.audio('mageMainAttack2', _AssetsDir + '/audio/Unity3D/Footstep_Water_00.wav');
    parent.load.audio('mageSpecialAttack1', _AssetsDir + '/audio/Unity3D/Spell_02.wav');
    parent.load.audio('mageSpecialAttack2', _AssetsDir + '/audio/Unity3D/Spell_04.wav');

    parent.load.audio('cannonReloading', _AssetsDir + '/audio/Unity3D/Handling_Gun_01_Arming_SFX.wav');
    parent.load.audio('cannonShooting', _AssetsDir + '/audio/Unity3D/Pistol_01_Generic_Tail_SFX.wav');
    parent.load.audio('trapSetting', _AssetsDir + '/audio/Unity3D/Menu_Select_00.wav');
}

function BuffsLoad(parent) {
    parent.load.image('speedBuff', _AssetsDir + '/images/Unity3D/Platforms/rock-speed-buff.png');
    parent.load.image('strengthBuff', _AssetsDir + '/images/Unity3D/Platforms/rock-strength-buff.png');
}

function ArcherPlayerLoad(parent) {
    parent.load.image('arrow-right', _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-right.png');
    parent.load.image('arrow-left', _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-left.png');

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-attack1-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'left.png');
        parent.load.image('archer1-attack1-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack1_' + i + 'right.png');
        parent.load.image('archer2-attack1-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Attack1_' + i + 'left.png');
        parent.load.image('archer2-attack1-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Attack1_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-attack2-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'left.png');
        parent.load.image('archer1-attack2-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack2_' + i + 'right.png');
        parent.load.image('archer2-attack2-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Attack2_' + i + 'left.png');
        parent.load.image('archer2-attack2-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Attack2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-death-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'left.png');
        parent.load.image('archer1-death-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Death_' + i + 'right.png');
        parent.load.image('archer2-death-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Death_' + i + 'left.png');
        parent.load.image('archer2-death-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 4; i++) {
        parent.load.image('archer1-hit-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'left.png');
        parent.load.image('archer1-hit-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Hit_' + i + 'right.png');
        parent.load.image('archer2-hit-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Hit_' + i + 'left.png');
        parent.load.image('archer2-hit-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Hit_' + i + 'right.png');
    }

    for (var i = 0; i <= 29; i++) {
        parent.load.image('archer1-idle2-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'left.png');
        parent.load.image('archer1-idle2-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Idle2_' + i + 'right.png');
        parent.load.image('archer2-idle2-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Idle2_' + i + 'left.png');
        parent.load.image('archer2-idle2-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Idle2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-idle1-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'left.png');
        parent.load.image('archer1-idle1-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_idle_' + i + 'right.png');
        parent.load.image('archer2-idle1-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_idle_' + i + 'left.png');
        parent.load.image('archer2-idle1-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 12; i++) {
        parent.load.image('archer1-jump-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'left.png');
        parent.load.image('archer1-jump-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Jump_' + i + 'right.png');
        parent.load.image('archer2-jump-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Jump_' + i + 'left.png');
        parent.load.image('archer2-jump-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_Jump_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('archer1-walk-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'left.png');
        parent.load.image('archer1-walk-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_walk_' + i + 'right.png');
        parent.load.image('archer2-walk-left' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_walk_' + i + 'left.png');
        parent.load.image('archer2-walk-right' + i, _AssetsDir + '/images/Unity3D/SpritesArchers/Archer3/FantasyArcher_03_walk_' + i + 'right.png');
    }

    parent.load.image('arrow-left', _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-left.png');
    parent.load.image('arrow-right', _AssetsDir + '/images/Unity3D/SpritesArchers/Archer2/FantasyArcher_02_Attack2_arrow-right.png');

    for (var i = 0; i <= 2; i++) {
        parent.load.image('archer-specialAttack1-' + i, _AssetsDir + '/images/Unity3D/archerSpecialAttack1-' + i + '.png');
    }

    for (var i = 6; i <= 7; i++) {
        parent.load.image('archer-specialAttack2-' + i + 'ball', _AssetsDir + '/images/Unity3D/archerSpecialAttack2-' + i + '.png');
    }

    for (var i = 0; i <= 5; i++) {
        parent.load.image('archer-specialAttack2-' + i + 'left', _AssetsDir + '/images/Unity3D/archerSpecialAttack2-' + i + 'left.png');
        parent.load.image('archer-specialAttack2-' + i + 'right', _AssetsDir + '/images/Unity3D/archerSpecialAttack2-' + i + 'right.png');
    }
}

function WarriorPlayerLoad(parent) {

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-attack1-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack1_' + i + 'left.png');
        parent.load.image('warrior1-attack1-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack1_' + i + 'right.png');
        parent.load.image('warrior2-attack1-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack1_' + i + 'left.png');
        parent.load.image('warrior2-attack1-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack1_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-attack2-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack2_' + i + 'left.png');
        parent.load.image('warrior1-attack2-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Attack2_' + i + 'right.png');
        parent.load.image('warrior2-attack2-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_' + i + 'left.png');
        parent.load.image('warrior2-attack2-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Attack2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-death-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Death_' + i + 'left.png');
        parent.load.image('warrior1-death-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Death_' + i + 'right.png');
        parent.load.image('warrior2-death-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Death_' + i + 'left.png');
        parent.load.image('warrior2-death-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Death_' + i + 'right.png');
    }

    for (var i = 0; i <= 4; i++) {
        parent.load.image('warrior1-hit-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Hit_' + i + 'left.png');
        parent.load.image('warrior1-hit-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Hit_' + i + 'right.png');
        parent.load.image('warrior2-hit-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Hit_' + i + 'left.png');
        parent.load.image('warrior2-hit-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Hit_' + i + 'right.png');
    }

    for (var i = 0; i <= 29; i++) {
        parent.load.image('warrior1-idle2-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Idle2_' + i + 'left.png');
        parent.load.image('warrior1-idle2-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Idle2_' + i + 'right.png');
        parent.load.image('warrior2-idle2-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Idle2_' + i + 'left.png');
        parent.load.image('warrior2-idle2-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Idle2_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-idle1-left' + i, _AssetsDir + '/images/Unity3Ds/SpritesWarriors/Warrior1/FantasyWarrior_01_idle_' + i + 'left.png');
        parent.load.image('warrior1-idle1-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_idle_' + i + 'right.png');
        parent.load.image('warrior2-idle1-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_idle_' + i + 'left.png');
        parent.load.image('warrior2-idle1-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_idle_' + i + 'right.png');
    }

    for (var i = 0; i <= 12; i++) {
        parent.load.image('warrior1-jump-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Jump_' + i + 'left.png');
        parent.load.image('warrior1-jump-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_Jump_' + i + 'right.png');
        parent.load.image('warrior2-jump-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Jump_' + i + 'left.png');
        parent.load.image('warrior2-jump-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_Jump_' + i + 'right.png');
    }

    for (var i = 0; i <= 14; i++) {
        parent.load.image('warrior1-walk-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_walk_' + i + 'left.png');
        parent.load.image('warrior1-walk-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior1/FantasyWarrior_01_walk_' + i + 'right.png');
        parent.load.image('warrior2-walk-left' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_walk_' + i + 'left.png');
        parent.load.image('warrior2-walk-right' + i, _AssetsDir + '/images/Unity3D/SpritesWarriors/Warrior3/FantasyWarrior_01_walk_' + i + 'right.png');
    }

    parent.load.image('warrior-specialAttack1', _AssetsDir + '/images/Unity3D/2DDeathTraps/warriorSpecialAttack1.png');
    parent.load.image('warrior-specialAttack2', _AssetsDir + '/images/Unity3D/2DDeathTraps/warriorSpecialAttack2.png');
}

function MagePlayerLoad(parent) {

    for (var i = 0; i <= 22; i++) {
        if (i <= 8) {
            parent.load.image('mage2-mainAttack' + i, _AssetsDir + '/images/Unity3D/Bubble-' + i + '.png');
        }

        if (i <= 9) {
            //Hit
            parent.load.image('mage1-hit-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Damage_' + i + 'left.png');
            parent.load.image('mage1-hit-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Damage_' + i + 'right.png');
            parent.load.image('mage2-hit-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Damage_' + i + 'left.png');
            parent.load.image('mage2-hit-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Damage_' + i + 'right.png');
        }

        if (i <= 15) {
            //Run Backwards
            parent.load.image('mage1-runbackward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Back_' + i + 'left.png');
            parent.load.image('mage1-runbackward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Back_' + i + 'right.png');
            parent.load.image('mage2-runbackward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Back_' + i + 'left.png');
            parent.load.image('mage2-runbackward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Back_' + i + 'right.png');
            //Run Forwards
            parent.load.image('mage1-runforward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Forward_' + i + 'left.png');
            parent.load.image('mage1-runforward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Run_Forward_' + i + 'right.png');
            parent.load.image('mage2-runforward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Forward_' + i + 'left.png');
            parent.load.image('mage2-runforward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Run_Forward_' + i + 'right.png');
        }

        if (i <= 17) {
            //Idle 1
            parent.load.image('mage1-idle1-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Idle_' + i + 'left.png');
            parent.load.image('mage1-idle1-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Idle_' + i + 'right.png');
            parent.load.image('mage2-idle1-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Idle_' + i + 'left.png');
            parent.load.image('mage2-idle1-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Idle_' + i + 'right.png');
            //Walk Forward
            parent.load.image('mage1-walkforward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Forward_' + i + 'left.png');
            parent.load.image('mage1-walkforward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Forward_' + i + 'right.png');
            parent.load.image('mage2-walkforward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Forward_' + i + 'left.png');
            parent.load.image('mage2-walkforward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Forward_' + i + 'right.png');
            //Walk Backwards
            parent.load.image('mage1-walkbackward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Back_' + i + 'left.png');
            parent.load.image('mage1-walkbackward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Walk_Back_' + i + 'right.png');
            parent.load.image('mage2-walkbackward-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Back_' + i + 'left.png');
            parent.load.image('mage2-walkbackward-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Walk_Back_' + i + 'right.png');
            //Cast 2
            parent.load.image('mage1-cast2-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast02_' + i + 'left.png');
            parent.load.image('mage1-cast2-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast02_' + i + 'right.png');
            parent.load.image('mage2-cast2-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast02_' + i + 'left.png');
            parent.load.image('mage2-cast2-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast02_' + i + 'right.png');
        }

        if (i <= 20) {
            //Attack1
            parent.load.image('mage1-attack1-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack01_' + i + 'left.png');
            parent.load.image('mage1-attack1-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack01_' + i + 'right.png');
            parent.load.image('mage2-attack1-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack01_' + i + 'left.png');
            parent.load.image('mage2-attack1-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack01_' + i + 'right.png');
            //Attack 2
            parent.load.image('mage1-attack2-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack02_' + i + 'left.png');
            parent.load.image('mage1-attack2-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Attack02_' + i + 'right.png');
            parent.load.image('mage2-attack2-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack02_' + i + 'left.png');
            parent.load.image('mage2-attack2-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Attack02_' + i + 'right.png');
            //Death
            parent.load.image('mage1-death-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Death_' + i + 'left.png');
            parent.load.image('mage1-death-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Death_' + i + 'right.png');
            parent.load.image('mage2-death-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Death_' + i + 'left.png');
            parent.load.image('mage2-death-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Death_' + i + 'right.png');
        }

        if (i <= 22) {
            //Cast 1
            parent.load.image('mage1-cast1-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast01_' + i + 'left.png');
            parent.load.image('mage1-cast1-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank02/MageHeroRank02_Cast01_' + i + 'right.png');
            parent.load.image('mage2-cast1-left' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast01_' + i + 'left.png');
            parent.load.image('mage2-cast1-right' + i, _AssetsDir + '/images/Unity3D/SpritesMageHero/MageHeroRank03/MageHeroRank03_Cast01_' + i + 'right.png');
        }
    }

    parent.load.image('mage-mainattack1', _AssetsDir + '/images/Unity3D/flare-alpha.png');
    parent.load.image('mage-specialAttack1', _AssetsDir + '/images/Unity3D/ring-energy-sample-alpha.png');
    parent.load.image('mage-specialAttack2', _AssetsDir + '/images/Unity3D/ring-energy-1.png');
}
/********************************** PRELOAD *******************************************************/
