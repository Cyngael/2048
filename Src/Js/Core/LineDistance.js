function lineDistance( point1, point2 )
{
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function vectorNormalize(vector)
{

	var newVector = {x : 0, y : 0};

	if(Math.abs(vector.y) > Math.abs(vector.x))
	{

		newVector.x = (vector.x / vector.y) * sign(vector.x);
		if(sign(newVector.x) != sign(vector.x))newVector.x = - newVector.x;
		newVector.y = 1 * sign(vector.y);
	}
	else
	{
		newVector.y = (vector.y / vector.x);
		if(sign(newVector.y) != sign(vector.y))newVector.y = - newVector.y;
		newVector.x = 1 * sign(vector.x);
	}

    return newVector;
}

function sign(n){ return n == 0 ? 0 : n/Math.abs(n); }