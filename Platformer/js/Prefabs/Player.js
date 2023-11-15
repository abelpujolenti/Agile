class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, walls, door){
        super(scene, positionX, positionY, "player");
        
        this._scene = scene;

        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);
        
        this.cursors = this._scene.input.keyboard.createCursorKeys();

        this.SetPhysics(walls, door);
    }

    HitHero(enemy)
    {
        if(enemy.body.touching.up && this.body.touching.down)
        {
            enemy.destroy();
            this.body.setVelocityY(-gamePrefs.HERO_JUMP);
            return;
        }

        this.body.reset(65, 100);
        this._scene.cameras.main.shake(250, 0.05);
        this._scene.cameras.main.flash(500, 255, 0, 0);
    }

    SetPhysics(walls, door)
    {
        this._scene.physics.add.collider(this, walls);
        this._scene.physics.add.overlap(this, door);
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        this.InputMovement();

        this.body.velocity.x = this.movementX;
    }

    InputMovement()
    {

        this.movementX = 0;

        if(this.cursors.right.isDown)
        {
            this.movementX = gamePrefs.HERO_SPEED;                
            this.setFlipX(false);
            this.anims.play("run", true);
        }
        else if(this.cursors.left.isDown)
        {
            this.movementX = -gamePrefs.HERO_SPEED;   
            this.setFlipX(true);
            this.anims.play("run", true);
        }
        else
        {
            this.movementX = 0;
            this.anims.stop().setFrame(0);
        }

        if(this.cursors.up.isDown &&
            this.body.blocked.down &&
            Phaser.Input.Keyboard.DownDuration(this.cursors.up, 250))
        {
            this.body.setVelocityY(-gamePrefs.HERO_JUMP);
        }

        if(!this.body.blocked.down)
        {
            this.anims.stop().setFrame(6);
        }
    }
}