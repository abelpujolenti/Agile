class Slime extends Enemy
{
    constructor(scene, positionX, positionY, walls, player, patrol, health){
        super(scene, positionX, positionY, "slime", walls, player, "slime", health);

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