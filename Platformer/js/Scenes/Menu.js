class Menu extends Phaser.Scene
{
    constructor()
    {
        super({key: "Menu"});
    }

    init()
    {
        this.background = this.add.tileSprite(0, 0, gamePrefs.GAME_WIDTH,
            gamePrefs.GAME_HEIGHT, "backgroundGreen").setOrigin(0);

            this.bar = this.add.rectangle(150, 200, 200, 20).setOrigin(0, 0.5);
            this.bar.setStrokeStyle(2, 0xFFFFFF);

            this.fill = this.add.rectangle(154, 200, 50 ,12, 0xFFFFFF).setOrigin(0, 0.5);
            this.perText = this.add.bitmapText(
                164,
                180,
                "gameFont",
                "Loading... 0%",
                12)
                .setCenterAlign()
                .setOrigin(0, 0.5);

                this.perText.valor = 0;
            

    }

    preload()
    {
        this.load.setPath("assets/sprites");
        this.load.image("door", "spr_door_open_0.png");        
        this.load.image("gemUI", "spr_gui_gem_0.png");
        this.load.spritesheet("jumper", "jumper.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("health", "health.png", {frameWidth: 128, frameHeight: 28});        
        this.load.spritesheet("gem", "gem.png", {frameWidth: 34, frameHeight: 34});
        
        this.load.setPath("assets/tilesets");
        this.load.image("walls_tileset", "tileset_walls.png");
        this.load.image("moss_tileset", "tileset_moss.png");

        this.load.setPath("assets/maps");
        this.load.tilemapTiledJSON("level1", "level1.json");
        
        this.load.setPath("assets/sounds");

        this.load.setPath("assets/fonts");
        this.load.bitmapFont("UIFont", "gameFont.png", "gameFont.xml");

        this.load.on("progress", function(value)
        {
            var num = Phaser.Math.RoundTo(value * 100, 0);
            var fillWidth = Phaser.Math.RoundTo(num / 100 * 192);
            this.fill.setSize(fillWidth, this.fill.height);
            this.perText.text = "Loading... " + num + "%";
        }, this);

        this.load.on("complete", function()
        {
            //this.FinishLoad();
        }, this);
    }
    
    FinishLoad()
    {
        //this.player = this.add.sprite
    }

    create()
    {
        this.LoadAnimations();
    }

    LoadAnimations()
    {
        this.anims.create(
            {
                key: "run",
                frames: this.anims.generateFrameNumbers("player", {start:2, end:5}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "jumper",
                frames: this.anims.generateFrameNumbers("jumper", {start: 0, end: 3}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "slime",
                frames: this.anims.generateFrameNumbers("slime", {start:0, end:3}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "gem",
                frames: this.anims.generateFrameNumbers("gem", {start:0, end:3}),
                frameRate: 10,
                repeat: -1
            }
        )
    }
}