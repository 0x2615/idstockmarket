function StockMarket(filepath)
{
	// ------ Define Fields ------- //
	this.companies = new Array();  // A list of companies
	this.RANGE = 15;  		 		 // How big the spread of values will be
	this.filepath = filepath;		 // The filepath of where the data is stored
	
	// ------ Define Functions ------- //
	
	/**
	* Parses the text file and stores it in Company objects
	*/
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
			console.error("Error executing XMLHttpRequest call!");
		}
	}
	
	/**
	* Chooses between three events - normal, boom, and bust.
	*/
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
	
	/**
	* Reasonable and equal amount of positive/negative fluctuation
	*/
	this.normalUpdate = function()
	{
		for (var i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			change = this.getIntBetween(-c.getLowerRange(this.RANGE), c.getUpperRange(this.RANGE));
			c.update(change);
		}
	}
	
	/**
	* Big positive increase
	*/
	this.boomUpdate = function()
	{
		for (var i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			change = this.getIntBetween(0, c.getUpperRange(this.RANGE) * 2);
			c.update(change);	
		}
	}
	
	/**
	* Big negative decrease
	*/
	this.bustUpdate = function()
	{
		for (var i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			change = this.getIntBetween(-c.getLowerRange(this.RANGE) * 2, 0);
			c.update(change);	
		}
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
		for (var i = 0; i < this.companies.length; i++)
		{
			var c = this.companies[i];
			console.info(c.printout());	
		}
	}
	
	// -------- Call Functions --------- //
	this.parseFile();
}


