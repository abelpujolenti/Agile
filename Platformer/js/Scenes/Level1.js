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
        this.load.image("door", "spr_door_open_0.png");        
        this.load.image("gemUI", "spr_gui_gem_0.png");
        this.load.spritesheet("player", "hero.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("jumper", "jumper.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("slime", "slime.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("health", "health.png", {frameWidth: 128, frameHeight: 28});
        this.load.spritesheet("gem", "gem.png", {frameWidth: 34, frameHeight: 34});
        
        this.load.setPath("assets/tilesets");
        this.load.image("walls_tileset", "tileset_walls.png");
        this.load.image("moss_tileset", "tileset_moss.png");

        this.load.setPath("assets/maps");
        this.load.tilemapTiledJSON("level1", "level1.json");
        
        this.load.setPath("assets/sounds");

        this.load.setPath("assets/fonts");
        //this.load.bitmapFont("UIFont", "gamFont.png", "gameFont.xml");

    }
    
    create()
    {
        this.add.tileSprite(0, 0, gamePrefs.LEVEL_1_WIDTH, gamePrefs.LEVEL_1_HEIGHT, "background").setOrigin(0);   

        this.LoadAnimations();
        
        this.map = this.add.tilemap("level1");
        this.map.addTilesetImage("walls_tileset");
        this.map.addTilesetImage("moss_tileset");

        this.walls = this.map.createLayer("layer_walls", "walls_tileset");
        this.map.createLayer("moss_layer_right", "moss_tileset");
        this.map.createLayer("moss_layer_left", "moss_tileset");
        this.map.createLayer("moss_layer_up", "moss_tileset");
        this.map.createLayer("moss_layer_down", "moss_tileset");

        this.map.setCollisionByExclusion(-1, true, true, "layer_walls");

        this.door = this.physics.add.sprite(65, 268, "door");
        this.door.body.setAllowGravity(false);
        this.door.body.setImmovable(true);

        this.player = new Player(this, 65, 80, this.walls, this.door);

        this.jumper = new Jumper(this, 260, 280, this.walls, this.player);

        this.slime = new Slime(this, 860, 280, this.walls, this.player, 1010);

        /*this.gemUIText = this.add.bitmapText(20, 20, "UIFont", "x20", 20);
        this.gemUIText.setScrollFactor(0);*/

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gamePrefs.LEVEL_1_WIDTH, gamePrefs.LEVEL_1_HEIGHT);
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