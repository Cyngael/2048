function Tile(x,y,h,w)
{
	this.x = x;
	this.y = y;
	this.height = h;
	this.width = w;

	this.fillColor = "#000000";
	this.fillLevel = 0;

	this.needToRender = true;

	this.number = null;

}

Tile.prototype =
{

	Start: function ()
	{
	

	},
    Update: function () 
    { 

    	if(this.needToRender)
    	{
    		this.Render(); 
    	}

    },
    Render: function () 
    { 

		if(this.number != null)
		{
	     	var cx = ScreenCanvas.Context;
			cx.fillStyle = this.fillColor;

			cx.fillRect(this.x,this.y, this.width,this.height);

			cx.lineWidth = 6;
			cx.strokeStyle = this.fillLevel > 4 ? "#FFF" : "#000";
			cx.font="55px Verdana";

			var distToDraw = this.x + (this.width/2) - (this.number.toString().length * 17);

			cx.strokeText(this.number,distToDraw,this.y + this.height/1.8);

		}
    },
    SetNumber: function (nb)
    {
    	this.number = nb;

    	if(nb != null)
    	{


			this.fillLevel = Math.round(Math.log2(this.number));


			switch(this.fillLevel)
			{
				case 1 :
			    	this.fillColor = "#FFFF66";
			    break;
		    	case 2 :
			    	this.fillColor = "#FFCC66";
			    break;
			    case 3 :
			    	this.fillColor = "#FF9966";
			    break;
			    case 3 :
			    	this.fillColor = "#FF6600";
			    break;
			    case 4 :
			    	this.fillColor = "#FF0000";
			    break;
			    case 5 :
			    	this.fillColor = "#990000";
			    break;
			    case 6 :
			    	this.fillColor = "#800000";
			    break;
			    case 7 :
			    	this.fillColor = "#400000";
			    break;
			    default : 
			    	this.fillColor = "#000";
			    break;
			}
		}


    },
    HasNumber: function ()
    {
    	return (this.number != null);
    }

}