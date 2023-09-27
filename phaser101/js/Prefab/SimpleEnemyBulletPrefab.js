class SimpleEnemyBulletPrefab extends Bullet
{  
    preUpdate()
    {        
        if(this.y >= config.height)
        {            
            this.Deactivate();
        }
        else if(!this.CheckCollision())
        {            
            this.Deactivate();
        }
    }
}