// JavaScript Document
var sm;

function start()
{
	sm = new StockMarket("data.txt");
	update();
	setInterval(function() { update(); }, 1000);
}

function update()
{
	sm.update();
	$('#companies').empty();
	for(i = 0; i < sm.numCompanies(); i++)
	{
		$('#companies').append('<div class="company">' +
				'<img class="company_pic" src="' + sm.companies[i].iconSrc + '" />' +
				'<h2>' + sm.companies[i].name + '</h2>' + 
				'<h3>' + sm.companies[i].price + '</h2>' +
			'</div>');
	}
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
			console.error("Error executing XMLHttpRequest call!");
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
			
		this.updateColor();
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
	
	this.updateColor = function()
	{
		
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
			console.info(c.printout());	
		}
	}
	
	// -------- Call Functions --------- //
	this.parseFile();
}


