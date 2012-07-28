function Company(name, iconSrc, lowPrice, highPrice)
{
	// ------ Define Fields ------- //
	this.SAME = 0; // Constants for changeType()
	this.GAIN = 1;
	this.LOSS = 2;
	
	this.name = name;
	this.iconSrc = iconSrc;
	this.lowPrice = lowPrice;
	this.highPrice = highPrice;
	this.price = Math.round((lowPrice + highPrice)/2);
	this.priceHistory = new Array();
	
	console.info(this.lowPrice + ' ' + this.highPrice + ' ' + this.price)
	
	this.priceHistory.push(this.price);
	
	// ------ Define Functions ------- //
	this.update = function(priceChange)
	{
		this.price += priceChange;
		if (this.price < 0)
			this.price = 0;
		this.priceHistory.push(this.price);		
	}
	
	/**
	* Given the upper and lower bounds, it will determine the upper range
	* of the next price range.
	*/
	this.getUpperRange = function(range)
	{
		var diff = this.highPrice - this.lowPrice;
		var percentFull = this.price / diff;
		var reversePercent = 1 - percentFull;
		return range * reversePercent;
	}
	
	/**
	* Given the upper and lower bounds, it will determine the lower range
	* of the next price range.
	*/
	this.getLowerRange = function(range)
	{
		var diff = this.highPrice - this.lowPrice;
		var percentFull = this.price / diff;
		return range * percentFull;
	}
	
	/**
	* Reports if the price increased, decreased, or stayed the same last update
	*/
	this.changeType = function()
	{
		if (this.priceHistory.length <= 1 || this.price == this.priceHistory[this.priceHistory.length - 2])
			return this.SAME;
		else if (this.price > this.priceHistory[this.priceHistory.length - 2])
			return this.GAIN;
		else 
			return this.LOSS;	
	}
	
	/**
	 * Gives a string representation of the object
	 */
	this.printout = function()
	{
		var s = "";
		s += "Name: " + this.name + "\n";
		s += "Price: " + this.price + "\n";
		s += "Lower Bound: " + this.lowPrice + "\n";
		s += "Upper Bound: " + this.highPrice + "\n";
		s += "Icon: " + this.iconSrc + "\n";
		return s;	
	}
}