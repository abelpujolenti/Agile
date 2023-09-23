class PlayerBulletPrefab extends Bullet
{
    preUpdate()
    {        
        if(this.y <= 0)
        {            
            this.Deactivate();
        }
        else if(!this.CheckCollision())
        {            
            this._target.getChildren().forEach(element => {
                //console.log(element)
                
                element.TakeDamage();
                this.Deactivate();
            });
        }
    }
}