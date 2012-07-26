// JavaScript Document
function Company(name, iconSrc, price, lowPrice, highPrice)
{
	// ------ Define Fields ------- //
	this.SAME = 0;
	this.GAIN = 1;
	this.LOSS = 2;
	
	this.name = name;
	this.iconSrc = iconSrc;
	this.price = price;
	this.lowPrice = lowPrice;
	this.highPrice = highPrice;
	this.priceHistory = new Array();
	
	this.priceHistory.push(this.price);
	
	// ------ Define Functions ------- //
	this.update = function(priceChange)
	{
		this.price += priceChange;
		if (this.price < 0)
			this.price = 0;
		this.priceHistory.push(this.price);			
	}
	
	this.changeType = function()
	{
		if (this.priceHistory.length <= 1 || this.price == this.priceHistory[this.priceHistory.length - 2])
			return this.SAME;
		else if (this.price > this.priceHistory[this.priceHistory.length - 3])
			return this.GAIN;
		else 
			return this.LOSS;	
	}
	
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