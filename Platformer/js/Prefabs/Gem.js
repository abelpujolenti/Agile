class Gem extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, spriteTag="gem", player, value)
    {
        super(scene, positionX, positionY, spriteTag);
        
        this._scene = scene;
        
        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);
        
        this.body.allowGravity = false;

        this.anims.play("gem");

        this._player = player;

        this._value = value;

        if(this._value == 2)
        {
            this.setTint(0x8800AA);
        }

        this.SetColliders();   
    }

    SetColliders()
    {
        this._scene.physics.add.overlap
        (
            this._player,
            this,
            this.GetGem,
            null, 
            this
        )
    }

    GetGem()
    {
        this._scene.UpdateScore(this._value);
        this.destroy();
    }

}