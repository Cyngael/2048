function GameScene()
{
    var that = new Scene();




    that.Start = function ()
    {

        that.board = new Board(4,4);
        that.board.Start();

     
    }

    that.Update = function ()
    {
        that.board.Update();

        that.CheckInput();

    }


    that.CheckInput = function ()
    {


        var x = 0;
        var y = 0;

        if(KeyboardInput.isKeyDown("right")) x ++;
        if(KeyboardInput.isKeyDown("left")) x --;
        if(KeyboardInput.isKeyDown("down")) y ++;
        if(KeyboardInput.isKeyDown("up")) y --;

        if(x != 0)
            y = 0;

        if(x != 0 || y != 0)
            that.board.Move(x,y);
        
    }

    return that;
}
