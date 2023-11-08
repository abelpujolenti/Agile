class Jumper extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, spriteTag, walls, player){
        super(scene, positionX, positionY, spriteTag);
        
        this._scene = scene;

        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);

        this.anims.play("jumper", true);
        
        this.direction = 1;
        this.body.setVelocityX = gamePrefs.ENEMY_SPEED * this.direction;

        this.SetPhysics(walls, player);
    }

    SetPhysics(walls, player)
    {
        this._scene.physics.add.collider(this, walls);
        this._scene.physics.add.overlap(this, player/*, player*/);
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        if(this.body.blocked.right || this.body.blocked.left)
        {
            this.direction *= -1;
            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direction);
            this.flipX = !this.flipX;
        }

        this.body.velocity.x = this.movementX;
    }
}