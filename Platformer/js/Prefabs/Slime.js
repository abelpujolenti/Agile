class Slime extends Enemy
{
    constructor(scene, positionX, positionY, walls, player, patrol){
        super(scene, positionX, positionY, "slime", walls, player, "slime");

        this._patrol = patrol;
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        if(this.x > this._patrol || this.body.blocked.left)
        {
            this.ChangeDirection();
        }
    }
}