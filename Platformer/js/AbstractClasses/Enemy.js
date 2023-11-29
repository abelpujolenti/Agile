class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, spriteTag, walls, player, animTag, health){
        super(scene, positionX, positionY, spriteTag);
        
        this._scene = scene;

        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);

        this.anims.play(animTag);
        
        this._direction = 1;

        this._health = health;

        this.body.setVelocityX = gamePrefs.ENEMY_SPEED * this._direction;

        this.SetPhysics(walls, player);
        
        this.body.velocity.x = gamePrefs.ENEMY_SPEED * this._direction;
    }
    

    SetPhysics(walls, player)
    {
        this._scene.physics.add.collider(this, walls);
        this._scene.physics.add.overlap(this, player, player.HitHero, null, player);
    }
    
    ChangeDirection()
    {
        this._direction *= -1;            
        this.flipX = !this.flipX;
        this.body.velocity.x = gamePrefs.ENEMY_SPEED * this._direction;
    }
}