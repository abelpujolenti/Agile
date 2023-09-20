class linkLevel extends Phaser.Scene
{
    constructor()
    {
        super({key:"linkLevel"});
    }

    //Carga assets en memoria        
    preload()
    {
        this.load.image("background", "assets/images/grass.png");
        this.load.spritesheet("linkAnimation", "assets/images/link.png", 
        {frameWidth:120, frameHeight:130});
    }

    //Pinta assets en pantalla
    create()
    {
        this.bg = this.add.tileSprite(config.width / 2, config.height / 2, config.width, config.height, "background");        
        this.linkAnimation = this.add.sprite(config.width / 2, config.height / 2, "linkAnimation");
        this.arrowKeys = this.input.keyboard.createCursorKeys();

        this.loadAnimations();
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: "walkDown",
                frames: this.anims.generateFrameNumbers("linkAnimation", 
                {start:0, end:9}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(            
            {
                key: "walkLeft",
                frames: this.anims.generateFrameNumbers("linkAnimation", 
                {start:10, end:19}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "walkUp",
                frames: this.anims.generateFrameNumbers("linkAnimation", 
                {start:20, end:29}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(

            {
                key: "walkRight",
                frames: this.anims.generateFrameNumbers("linkAnimation", 
                {start:30, end:39}),
                frameRate: 10,
                repeat: -1
            }
        )

    }

    //Actualiza whatever       
    update()
    {
        if(this.arrowKeys.right.isDown)
        {
            this.linkAnimation.x += 1;
            this.linkAnimation.anims.play("walkRight");
        }
        if(this.arrowKeys.left.isDown)
        {
            this.linkAnimation.x -= 1;
            this.linkAnimation.anims.play("walkLeft");
        }
        if(this.arrowKeys.down.isDown)
        {
            this.linkAnimation.y += 1;
            this.linkAnimation.anims.play("walkDown");
        }
        if(this.arrowKeys.up.isDown)
        {
            this.linkAnimation.y -= 1;
            this.linkAnimation.anims.play("walkUp");
        }
    }
}