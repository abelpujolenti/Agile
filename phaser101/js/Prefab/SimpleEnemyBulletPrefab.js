class SimpleEnemyBulletPrefab extends Bullet
{  
    preUpdate()
    {        
        if(this.y >= config.height)
        {            
            this.Deactivate();
        }
    }
}