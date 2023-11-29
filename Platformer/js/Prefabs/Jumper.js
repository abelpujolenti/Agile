class Jumper extends Enemy
{
    constructor(scene, positionX, positionY, walls, player, health){
        super(scene, positionX, positionY, "jumper", walls, player, "jumper", health);
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);

        if(this.body.blocked.right || this.body.blocked.left)
        {
            this.ChangeDirection();
        }
    }
}