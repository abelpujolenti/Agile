class level extends Phaser.Scene
{
    constructor()
    {
        super({key:"level"});
    }

    //Carga assets en memoria        
    preload()
    {
        this.load.image("background", "assets/images/bg.jpg");
        this.load.image("i'mabird", "assets/images/bird.png");
        this.load.spritesheet("i'mabirdAnimation", "assets/images/birdAnim.png", 
        {frameWidth:17, frameHeight:12});
    }

    //Pinta assets en pantalla
    create()
    {
        //this.bg = this.add.image(config.width / 2, config.height / 2, "background");        
        this.bg = this.add.tileSprite(config.width / 2, config.height / 2, config.width, config.height, "background");
        this.bird = this.add.sprite(config.width / 2, config.height / 2, "i'mabird");
        this.birdAnimation = this.add.sprite(config.width / 2, config.height / 2, "i'mabirdAnimation").setScale(3);
        this.arrowKeys = this.input.keyboard.createCursorKeys();

        this.loadAnimations();
        this.birdAnimation.anims.play("fly");
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: "fly",
                frames: this.anims.generateFrameNumbers("i'mabirdAnimation", 
                {start:0, end:2}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
    }

    //Actualiza whatever       
    update()
    {
        this.bg.tilePositionX += 1;

        if(this.arrowKeys.right.isDown)
        {
            this.birdAnimation.x += 1;
        }
        if(this.arrowKeys.left.isDown)
        {
            this.birdAnimation.x -= 1;
        }
        if(this.arrowKeys.down.isDown)
        {
            this.birdAnimation.y += 1;
        }
        if(this.arrowKeys.up.isDown)
        {
            this.birdAnimation.y -= 1;
        }
    }
}