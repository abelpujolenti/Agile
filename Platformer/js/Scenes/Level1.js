class Level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:"Level1"});
    }
       
    preload()
    {        
       

    }
    
    create()
    {
        this.add.tileSprite(0, 0, gamePrefs.LEVEL_1_WIDTH, gamePrefs.LEVEL_1_HEIGHT, "background").setOrigin(0);   

        this.LoadAnimations();

        this.LoadPools();
        
        this.map = this.add.tilemap("level1");
        this.map.addTilesetImage("walls_tileset");
        this.map.addTilesetImage("moss_tileset");

        this.walls = this.map.createLayer("layer_walls", "walls_tileset");
        this.map.createLayer("layer_moss_right", "moss_tileset");
        this.map.createLayer("layer_moss_left", "moss_tileset");
        this.map.createLayer("layer_moss_up", "moss_tileset");
        this.map.createLayer("layer_moss_bottom", "moss_tileset");

        this.map.setCollisionByExclusion(-1, true, true, "layer_walls");

        this.door = this.physics.add.sprite(65, 268, "door");
        this.door.body.setAllowGravity(false);
        this.door.body.setImmovable(true);

        this.player = new Player(this, 65, 80, this.walls, this.door);

        this.gemUIText = this.add.bitmapText(gamePrefs.GAME_WIDTH/2 + 90, 10, "UIFont", "x00", 20);
        this.gemUIText.setScrollFactor(0);

        this.gemUI = this.add.sprite(gamePrefs.GAME_WIDTH/2 + 110, -15, "gemUI").setOrigin(1, 0).setScrollFactor(0);

        //this.healthUI = new UI(this, 5, 5, "health", (0), this.player.GetLives() - 1);

        this.healthUI = this.add.sprite(5, 5, "health").setOrigin(0).setFrame(this.player.GetLives() - 1);
        this.healthUI.setScrollFactor(0);

        this.score = 0;

        this.layer_elements = this.map.getLayer("layer_elements");
        this.elements = this.layer_elements.data;

        this.game_elements = this.map.getObjectLayer("game_elements");
        this.game_elements.objects.forEach(function (element)
        {
            switch(element.type)
            {
                case "gem":
                    this.gemPool.add(new Gem(this, element.x, element.y, "gem", this.player, element.properties[0].value));
                    break;

                case "slime":
                    this.enemyPool.add(new Slime(this, element.x, element.y, this.walls, this.player, element.properties[1].value, element.properties[0].value));
                    break;

                case "jumper":
                    this.enemyPool.add(new Jumper(this, element.x, element.y, this.walls, this.player, element.properties[0].value));
                    break;
            }

        }, this);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gamePrefs.LEVEL_1_WIDTH, gamePrefs.LEVEL_1_HEIGHT);
    }

    LoadPools()
    {
        this.enemyPool = this.add.group();
        this.gemPool = this.add.group();
    }

    UpdateScore(value)
    {
        this.score += value;
        this.gemUIText.text = "x"+("0" + this.score).slice(-2);
    }

    UpdateLives()
    {
        this.healthUI.setFrame(this.player.GetLives() - 1);
    }

    
}