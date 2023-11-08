var gamePrefs =
{
    GAME_WIDTH: 960,
    GAME_HEIGHT: 540,
    LEVEL_1_WIDTH: 1280, //40*32
    LEVEL_1_HEIGHT: 800, //25*32
    HERO_SPEED: 200,
    HERO_JUMP: 450,
    HERO_GRAVITY: 1000,
    ENEMY_SPEED: 100
}

var config = 
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[Level1], //array con las escenas
    render:
    {
        pixelArt : true
    },
    scale:
    {
        mode: Phaser.Scale.FIT,
        width: gamePrefs.GAME_WIDTH / 1.5,
        height: gamePrefs.GAME_HEIGHT / 1.5,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default: "arcade",
        arcade:
        {
            gravity:{y: gamePrefs.HERO_GRAVITY},
            debug: true
        }
    }
};

var game = new Phaser.Game(config);