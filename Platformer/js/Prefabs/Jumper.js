class Jumper extends Enemy
{
    constructor(scene, positionX, positionY, walls, player){
        super(scene, positionX, positionY, "jumper", walls, player, "jumper");
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