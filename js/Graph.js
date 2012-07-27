function Graph(stockMarket)
{
	// ------- Define Fields -------- //
	this.sm = stockMarket;
	this.dataArray = new Array();
	this.updateCount = 0;
	
	
	// ------ Define Functions ------- //
	this.update = function()
	{
		// update stuff
		this.updateDataArray();
		drawChart(this.dataArray);
	}
	
	this.initArray = function()
	{
		var titles = new Array();
		titles.push('Time');
		for (i = 0; i < sm.numCompanies(); i++)
		{
			titles.push(sm.companies[i].name);
		}
		this.dataArray.push(titles);
	}
	
	this.updateDataArray = function()
	{
		var newEntry = new Array();
		newEntry.push((this.updateCount++).toString());
		
		for (i = 0; i < sm.numCompanies(); i++)
		{
			newEntry.push(sm.companies[i].price);
		}
		this.dataArray.push(newEntry);
	}
	
	this.initArray();
}

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(this.drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
	  
function drawChart(array) 
{
	var a = new Array();
	for (i = 0; i < array.length; i++)
	{
		a.push(array[i]);
	}
	
	// Create the data table.
	var data = google.visualization.arrayToDataTable(a);

	var options = {
	  title: 'Stock Trends'
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart'));
	chart.draw(data, options);
}
