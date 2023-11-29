class Preloader extends Phaser.Scene
{
    constructor()
    {
        super({key: "Preloader"});
    }

    preload()
    {
        this.load.setPath("assets/sprites/");
        this.load.image("backgroundGreen", "bg_green_tile.png");
        this.load.spritesheet("player", "hero.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("slime", "slime.png", {frameWidth: 32, frameHeight: 32});

        this.load.setPath("assets/fonts/");
        this.load.bitmapFont("gameFont", "GameFont (3).png", "GameFont (3).xml");

        this.load.on("complete", function()
        {
            this.scene.start("Menu");
        },this);

    }
}