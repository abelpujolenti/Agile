var config = 
{
    type: Phaser.AUTO,
    width: 370,
    height: 550,
    scene:[linkLevel], //array con las escenas
    render:
    {
        pixelArt : true
    }
};

var game = new Phaser.Game(config);