class PowerUp extends Phaser.GameObjects.Sprite
{
    constructor(scene, positionX, positionY, target, powerUpNumber)
    {
        super(scene, positionX, positionY);
        scene.add.existing(this);

        this._scene = scene;
        this._powerUpNumber = powerUpNumber;

        this._powerUpCollider = scene.physics.add.overlap(this, target, this.DeliverPowerup, null, this);        

        var powerUp = "powerUp" + (this._powerUpNumber + "");
        this.anims.play(powerUp);
        this.Activate();       
    }

    preUpdate()
    {
        if(this.y >= config.height)
        {            
            this.Deactivate();
        }
    }

    Activate()
    {        
        this._powerUpCollider.active = true;
        this.active = true;
        this.visible = true;
    }

    Deactivate()
    {     
        this._powerUpCollider.active = false;
        this.active = false;
        this.visible = false;
    }

    DeliverPowerup(powerup, target)
    {        
        powerup.Deactivate();        
        target.TakePowerup(this._powerUpNumber);
    }

    GetPowerUpNumber()
    {
        return powerUpNumber;
    }
}