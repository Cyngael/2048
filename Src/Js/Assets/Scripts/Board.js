function Board(h,w)
{
	this.height = h;
	this.width = w;

	this.strokeColor = "#333333";

	this.strokeWidth = 15;

	this.needToRender = true;
	this.isMoving = false;
    this.movingTime = 330; //ms

	this.popPossibilities = {
		numbers : [4,2],
		weights : [0.1,1]
	}

    this.isGameOver = false;

}

Board.prototype =
{

	Start: function ()
	{
		this.heightOffset = (ScreenCanvas.Canvas.height / this.height) -  this.strokeWidth/this.height;
    	this.widthOffset = (ScreenCanvas.Canvas.width / this.width) -  this.strokeWidth/this.width;

        //tab[x][y]
		this.tab = new Array(this.width);

		for (var i = 0; i < this.width; i++) {
			this.tab[i] = new Array(this.height);
		};

		
    	for (var i = 0; i < this.tab.length; i++) {
    		for (var j = 0; j < this.tab[i].length; j++) {
    			this.tab[i][j] = new Tile(this.strokeWidth + (this.widthOffset * i),
    										this.strokeWidth + (this.heightOffset * j),
    										this.heightOffset - this.strokeWidth,
    										this.widthOffset -this.strokeWidth
    									);
    		};
    	};

		this.PopRandomNumber();
		this.PopRandomNumber();


	},
    Update: function () 
    { 



    	if(this.needToRender)
    	{
    		this.Render(); 

    		for (var i = 0; i < this.tab.length; i++) {
	    		for (var j = 0; j < this.tab[i].length; j++) {
	    			this.tab[i][j].Update();
	    		};
	    	};


            if(this.isGameOver)
            {
                this.DrawGameOver();
            }
    	}

		

    },
    GetRandomNumber: function ()
    {


    	for (var i = 0; i < this.popPossibilities.numbers.length; i++) 
    	{
    		if(Math.random() <= this.popPossibilities.weights[i]) 
    		{
    			return this.popPossibilities.numbers[i];
    		}
    		
    	};
    },
    PopRandomNumber: function(context)
    {

        var that = context || this;

    	var randomI = (Math.random() * this.width) << 0 ;
    	var randomJ = (Math.random() * this.height) << 0 ;


		for (var i = randomI; i < that.tab.length; i++) 
		{
    		for (var j = randomJ; j < that.tab[i].length; j++) 
    		{
    			if(!that.tab[i][j].HasNumber())
    			{
    				that.needToRender = true;
    				that.tab[i][j].SetNumber(that.GetRandomNumber());

                    that.CheckGameOver();

    				return;
    			}
    		};
    	};

    	for (var i = 0; i < that.tab.length; i++) 
		{
    		for (var j = 0; j < that.tab[i].length; j++) 
    		{
    			if(!that.tab[i][j].HasNumber())
    			{
    				that.needToRender = true;
    				that.tab[i][j].SetNumber(that.GetRandomNumber());
                    that.CheckGameOver();

    				return;
    			}
    		};
    	};

        that.CheckGameOver();
    	
		
    },
    Render: function () 
    { 

    	ScreenCanvas.Clear();

    	
    	var cx = ScreenCanvas.Context;
    	cx.strokeStyle = this.strokeColor;
     	cx.lineWidth = this.strokeWidth;


		cx.beginPath();

		for (var i = 0; i <= this.height; i++) {
			cx.moveTo(0,(this.heightOffset * i)  + this.strokeWidth/2  );
			cx.lineTo(ScreenCanvas.Canvas.height ,(this.heightOffset * i) + this.strokeWidth/2 );
		};


		for (var i = 0; i <= this.width; i++) {
			cx.moveTo((this.widthOffset * i) + this.strokeWidth/2  ,this.strokeWidth);
			cx.lineTo((this.widthOffset * i) + this.strokeWidth/2 ,ScreenCanvas.Canvas.width);
		};
	
	
		cx.stroke();

		this.needToRender = false;
    },
    DrawGameOver : function()
    {
        var cx = ScreenCanvas.Context;
        cx.globalAlpha = 0.8;
        cx.fillStyle = "#FF9933";
        cx.fillRect(0,0,ScreenCanvas.Canvas.width, ScreenCanvas.Canvas.height);
        cx.globalAlpha = 1;

        cx.strokeStyle = "#000"
        cx.strokeText("Game Over",ScreenCanvas.Canvas.width/3.5,ScreenCanvas.Canvas.height/2);

    },
    Move: function (x, y)
    {
    	if(this.isMoving == false && this.isGameOver == false)
    	{

			this.isMoving = true;

            setTimeout(this.StopMove,this.movingTime,this);

            var borne = this.height > this.width ? this.height : this.width;

            for (var k = 0; k < borne; k ++) 
            {
                setTimeout(function(that,x,y){
                    if(x > 0 || y > 0)//droite ou bas
                    {

                        for (var i = that.tab.length - 1; i >= 0; i--) {
                            for (var j = that.tab[i].length - 1; j >= 0; j--) 
                            {
                                if(i + x < that.width && i + x >= 0 && j + y < that.height && j + y >= 0)
                                {

                                    if(that.tab[i][j].HasNumber())
                                    {
                                        that.needToRender = true;
                                        that.CombineTile(that.tab[i][j],that.tab[i + x][j + y]);

                                    }
                                }

                            };
                        };
                    }
                    else
                    {

                        for (var i = 0; i < that.tab.length; i++) {
                            for (var j = 0; j < that.tab[i].length; j++) 
                            {
                                if(i + x < that.width && i + x >= 0 && j + y < that.height && j + y >= 0)
                                {
                                    if(that.tab[i][j].HasNumber())
                                    {
                                        that.needToRender = true;
                                        that.CombineTile(that.tab[i][j],that.tab[i + x][j + y]);

                                    }
                                }

                            };
                        };
                    }

                },k * (this.movingTime / borne),this,x,y);


            };


    	}
    	


    },
    StopMove: function(ctx)
    {

        ctx.isMoving = false;

        if(ctx.hasMoved)
        {
            ctx.hasMoved = false;
            ctx.PopRandomNumber(ctx);
        }
    },
    CheckGameOver : function()
    {

        var gameOver = false;

        for (var i = 0; i < this.tab.length; i++) {
            for (var j = 0; j < this.tab[i].length; j++) 
            {
               
                gameOver = !(this.CheckIfTileCanMove(i,j,1,0) || this.CheckIfTileCanMove(i,j,-1,0) || this.CheckIfTileCanMove(i,j,0,1) || this.CheckIfTileCanMove(i,j,0,-1) );

                if(!gameOver)
                    return;

            };
        };

        console.log("GAME OVER");

        this.isGameOver = gameOver;
    },
    CheckIfTileCanMove : function(i,j,x,y)
    {
        if(i + x < this.width && i + x >= 0 && j + y < this.height && j + y >= 0)
        {
            if(this.tab[i][j].HasNumber())
            {
                if(this.tab[i + x][j + y].HasNumber())
                {
                    if(this.tab[i + x][j + y].number == this.tab[i][j].number)
                        return true;
                }
                else
                {
                    return true;
                }

            }
            else
            {
                return true;
            }

        }
        return false;
    },
    CombineTile: function(tileOut, tileIn)
    {


    	if(tileIn.HasNumber())
    	{
    		if(tileIn.number == tileOut.number)
    		{
                this.hasMoved = true;

    			tileIn.SetNumber(tileOut.number * 2);
    			tileOut.SetNumber(null);
    		}

    	}
    	else
    	{
             this.hasMoved = true;

    		 tileIn.SetNumber(tileOut.number);
    		 tileOut.SetNumber(null);
    	}

    }
}