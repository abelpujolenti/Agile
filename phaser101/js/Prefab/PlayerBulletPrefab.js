class PlayerBulletPrefab extends Bullet
{
    preUpdate()
    {        
        if(this.y <= 0)
        {            
            this.Deactivate();
        }
    }
}