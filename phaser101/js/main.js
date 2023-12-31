var gamePrefs =
{
    SHIP_SPEED: 1,
    BULLET_SPEED: -100,
    ENEMY_SPEED: 20,
    MAX_ENEMIES: -1
}

var config = 
{
    type: Phaser.AUTO,
    width: 256,
    height: 512,
    scene:[MainMenu, GameState, GameOver], //array con las escenas
    render:
    {
        pixelArt : true
    },
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default: "arcade",
        arcade:
        {
            gravity:{y: 0}
        }
    }
};

var game = new Phaser.Game(config);