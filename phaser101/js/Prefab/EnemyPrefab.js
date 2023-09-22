class EnemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _positionX, _positionY, _spriteTag = "enemy")
    {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        this.anims.play("enemyIdle");
        this._health = 2;
    }    

    preUpdate(time, delta)
    {        
        if(this._health <= 0 || this.y > config.height + 8)
        {
            this.active = false;
        }
        super.preUpdate(time, delta);
    }
}