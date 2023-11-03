class Level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:"Level1"});
    }
       
    preload()
    {        
        this.load.setPath("assets/sprites");
        this.load.image("background", "bg_green_tile.png");
        this.load.spritesheet("player", "hero.png",{frameWidth: 32, frameHeight: 32});
        
        this.load.setPath("assets/tilesets");
        this.load.image("walls_tileset", "tileset_walls.png");
        this.load.image("moss_tileset", "tileset_moss.png");

        this.load.setPath("assets/maps");
        this.load.tilemapTiledJSON("level1", "level1.json");
        
        this.load.setPath("assets/sounds");

    }
    
    create()
    {
        this.add.tileSprite(0, 0, gamePrefs.LEVEL_1_WIDTH, gamePrefs.LEVEL_1_HEIGHT, "background").setOrigin(0);
        
        this.map = this.add.tilemap("level1");
        this.map.addTilesetImage("walls_tileset");
        this.map.addTilesetImage("moss_tileset");
        this.map.createLayer("layer_walls", "walls_tileset");
        this.map.createLayer("moss_layer_right", "moss_tileset");
        this.map.createLayer("moss_layer_left", "moss_tileset");
        this.map.createLayer("moss_layer_up", "moss_tileset");
        this.map.createLayer("moss_layer_down", "moss_tileset");

        this.player = this.add.sprite(65, 100, "player");
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
    }
    
    update()
    {
        

    }

    InputMovement(){

        if(this.cursors.right.isDown)
        {
            this.movementX += gamePrefs.SHIP_SPEED;            
        }
        if(this.cursors.left.isDown)
        {
            this.movementX -= gamePrefs.SHIP_SPEED;            
        }

        if(this.cursors.up.isDown)
        {
            this.movementY -= gamePrefs.SHIP_SPEED;    
        }
        if(this.cursors.down.isDown)
        {
            this.movementY += gamePrefs.SHIP_SPEED;            
        }  

    }

    LoadGameOver()
    {
        this.scene.start("GameOver", {score: this.scoreText.text, backgroundBack: this.backgroundBack.tilePositionY, backgroundFront: this.backgroundFront.tilePositionY});
    }
}