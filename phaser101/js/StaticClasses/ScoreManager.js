class ScoreManager
{

    static _scoreId = 0;

    constructor(){

        if(typeof ScoreManager.instance === "object"){
            return ScoreManager.instance;
        }

        ScoreManager.instance = this;
        return this;
    }

    static IncrementScoreId(){
        this._scoreId++;
    }

    static GetScoreId(){
        return this._scoreId;
    }
}