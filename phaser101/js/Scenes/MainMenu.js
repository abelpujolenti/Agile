class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key:"MainMenu"});
    }

    init (data)
    {        
        this.backgroundBackTilePosition = data.backgroundBack;
        this.backgroundFrontTilePosition = data.backgroundFront;
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("003");
        this.load.image("backgroundBack", "assets/img/background_back.png");
        this.load.image("backgroundFront", "assets/img/background_frontal.png");      
        this.load.image("playButton", "assets/img/btn.png");      
    }

    create()
    {

        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, "backgroundBack").setOrigin(0);
        if(this.backgroundBackTilePosition){
            this.backgroundBack.tilePositionY = this.backgroundBackTilePosition;
        }

        this.backgroundFront = this.add.tileSprite(0, 0, config.width, config.height, "backgroundFront").setOrigin(0);
        if(this.backgroundFrontTilePosition){
            this.backgroundFront.tilePositionY = this.backgroundFrontTilePosition;
        }

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

        this.playButton = this.add.image(config.width / 3.3, config.height / 2, "playButton").setOrigin(0).setScale(0.5).setInteractive();

        var itemsToFade = [this.titleText, this.playButton];

        this.playButton.on("pointerdown", () => 
        {
            this.tweens.add(
                {
                    targets: itemsToFade,
                    alpha: { from: 1, to: 0},
                    duration: 1000,
                    onComplete: this.LoadGameState.bind(this)
                }
            )
        });
    }

    update()
    {        
        this.backgroundBack.tilePositionY -= .25;
        this.backgroundFront.tilePositionY --;
    }

    LoadGameState(){
        this.scene.start("GameState", {backgroundBack: this.backgroundBack.tilePositionY, backgroundFront: this.backgroundFront.tilePositionY});
    }

}