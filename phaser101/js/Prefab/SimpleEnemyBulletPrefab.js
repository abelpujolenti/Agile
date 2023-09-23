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
            this._target.TakeDamage();
            this.Deactivate();
        }
    }
}