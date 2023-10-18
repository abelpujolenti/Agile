class GameOver extends Phaser.Scene
{

    constructor()
    {
        super({key:"GameOver"});
        this._scoreArray = [];
    }

    init (data)
    {        
        this.score = data.score;
        if(!localStorage.hasOwnProperty("ScoreTableLength"))
        {
            localStorage.setItem("ScoreTableLength", 0);
        }
        else
        {
            localStorage.setItem("ScoreTableLength", parseInt(localStorage.getItem("ScoreTableLength")) + 1);
        }
        var scoreID = "score" + localStorage.getItem("ScoreTableLength");

        localStorage.setItem(scoreID, this.score)
        //localStorage.clear()
        this.backgroundBackTilePosition = data.backgroundBack;
        this.backgroundFrontTilePosition = data.backgroundFront;
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("003");
        this.load.image("backgroundBack", "assets/img/background_back.png");
        this.load.image("backgroundFront", "assets/img/background_frontal.png");      
        this.load.image("menuButton", "assets/img/menu_button.png");      
    }

    create()
    {

        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, "backgroundBack").setOrigin(0);
        this.backgroundBack.tilePositionY = this.backgroundBackTilePosition;

        this.backgroundFront = this.add.tileSprite(0, 0, config.width, config.height, "backgroundFront").setOrigin(0);
        this.backgroundFront.tilePositionY = this.backgroundFrontTilePosition;

        this.titleText = this.add.text
        (
            config.width - (config.width / 1.03),
            config.height - (config.height / 1.03),
            "GAME OVER",
            {
                fontFamily: "Arial",
                fill: "#FFFFFF",
                fontSize: 40,
                align: "center"
            }
        ).setOrigin(0).setDepth(1);   
        
        this.scoreText = this.add.text
        (
            config.width / 5,
            config.height / 7,
            "Score: " + this.score,
            {
                fontFamily: "Arial",
                fill: "#FFFFFF",
                fontSize: 30,
                align: "center"
            }
        ).setOrigin(0).setDepth(1);

        this.scoreTableText = this.add.text
        (
            config.width / 7.3,
            config.height / 3.7,
            "High Score Table",
            {
                fontFamily: "Arial",
                fill: "#FFFFFF",
                fontSize: 25,
                align: "center"
            }
        )

        this.GetScoreTable();
        
        this.scoreTable = this.add.text
        (
            config.width / 2.6,
            config.height / 3.1,
            this._scoreArray,
            {
                fontFamily: "Arial",
                fill: "#FFFFFF",
                fontSize: 25,
                align: "center"
            }
        ).setOrigin(0).setDepth(1);

        this.menuButton = this.add.image(config.width / 3.7, config.height - (config.height / 5), "menuButton").setOrigin(0).setScale(0.25).setInteractive();

        var itemsToFade = [this.titleText, this.scoreText, this.scoreTableText, this.scoreTable, this.menuButton];

        this.menuButton.on("pointerdown", () => 
        {
            this.tweens.add(
                {
                    targets: itemsToFade,
                    alpha: { from: 1, to: 0},
                    duration: 1000,
                    onComplete: this.LoadMainMenu.bind(this)
                }
            )
        });
    }

    update()
    {        
        this.backgroundBack .tilePositionY -= .25;
        this.backgroundFront.tilePositionY --;
    }

    GetScoreTable(){
        
        for (let i = 0; i <= localStorage.getItem("ScoreTableLength"); i++) {
            this._scoreArray[i] = localStorage.getItem("score" + i);            
        }
        this._scoreArray.sort(function(a, b){return b - a})

        this._scoreArray.length = 10;

    }

    LoadMainMenu()
    {
        this.scene.start("MainMenu", {backgroundBack: this.backgroundBack.tilePositionY, backgroundFront: this.backgroundFront.tilePositionY});
    }

}