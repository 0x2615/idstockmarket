// JavaScript Document
function go()
{
	var sm = new StockMarket("data.txt");
	alert("Intial imported values:");
	sm.printout();	
	sm.update();
	alert("After one printout:");
	sm.printout();
}

function StockMarket(filepath)
{
	// ------ Define Fields ------- //
	this.companies = new Array();
	this.DEFAULT_RANGE = 15;
	this.filepath = filepath;
	
	// ------ Define Functions ------- //
	this.parseFile = function()
	{
		var request = new XMLHttpRequest();
		request.open("Get", filepath, false);
		request.setRequestHeader("User-Agent", navigator.userAgent);
		request.send(null);
		if (request.status == 200)
		{
			var results = request.responseText;
			var lines = results.split("\n");
			for(i = 0; i < lines.length; i++)
			{
				var name = lines[i++];
				var icon = lines[i++];
				var price = parseInt(lines[i++]);
				var lowPrice = parseInt(lines[i++]);
				var highPrice = parseInt(lines[i++]);
				c = new Company(name, icon, price, lowPrice, highPrice);
				this.companies.push(c);	
			}
		}
		else
		{
			alert("Error executing XMLHttpRequest call!");
		}
	}
	
	this.update = function()
	{
		var eventChance = Math.random();
		if (eventChance < .05)
			this.boomUpdate();
		else if (eventChance < .10)
			this.bustUpdate();
		else
			this.normalUpdate();
	}
	
	this.normalUpdate = function()
	{
		for (i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			change = this.getIntBetween(-this.getLowerRange(c), this.getUpperRange(c));
			c.update(change);
		}
	}
	
	this.boomUpdate = function()
	{
		for (i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			change = this.getIntBetween(0, this.getUpperRange(c) * 2);
			c.update(change);	
		}
	}
	
	this.bustUpdate = function()
	{
		for (i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			change = this.getIntBetween(-this.getLowerRange(c) * 2, 0);
			c.update(change);	
		}
	}
	
	this.getUpperRange = function(company)
	{
		var diff = company.highPrice - company.lowPrice;
		var percentFull = company.price / diff;
		var reversePercent = 1 - percentFull;
		return this.DEFAULT_RANGE * reversePercent;
	}
	
	this.getLowerRange = function(company)
	{
		var diff = company.highPrice - company.lowPrice;
		var percentFull = company.price / diff;
		return this.DEFAULT_RANGE * percentFull;
	}
	
	
	this.numCompanies = function()
	{
		return this.companies.length;	
	}
	
	this.getCompanyList = function()
	{
		return this.companies;	
	}
	
	this.getIntBetween = function(low, high)
	{
		return Math.round(Math.random() * (high - low) + low);
	}
	
	this.printout = function()
	{
		for (i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			alert(c.printout());	
		}
	}
	
	// -------- Call Functions --------- //
	this.parseFile();
}


