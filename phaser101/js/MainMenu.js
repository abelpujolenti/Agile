class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"MainMenu"});
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("003");
        this.load.sceneFile("GameState", "js/GameState.js");
        this.load.image("backgroundBack", "assets/img/background_back.png");
        this.load.image("backgroundFront", "assets/img/background_frontal.png");      
        this.load.image("playButton", "assets/img/btn.png");      
    }

    create()
    {

        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, "backgroundBack").setOrigin(0);
        this.backgroundFront = this.add.tileSprite(0, 0, config.width, config.height, "backgroundFront").setOrigin(0);

        this.titleText = this.add.text
        (
            config.width / 7,
            config.height / 3,
            "Shooter2D",
            {
                fontFamily: "Arial",
                fill: "#FFFFFF",
                fontSize: 40,
                align: "center"
            }
        ).setOrigin(0).setDepth(1);

        this.playButton = this.add.image(config.width / 3.3, config.height / 2, "playButton").setOrigin(0).setScale(0.5).setInteractive()        
        .on("pointerdown", () => 
        {
            this.scene.start("GameState");
        });
    }

    update()
    {        
        this.backgroundBack .tilePositionY -= .25;
        this.backgroundFront.tilePositionY --;



    }

}