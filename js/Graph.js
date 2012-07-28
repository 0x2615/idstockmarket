// Load the Visualization API and the linegraph package.
google.load('visualization', '1.0', {'packages':['corechart']});

function Graph(company, divName)
{
	// ------- Define Fields -------- //
	this.company = company;
		
	// Time indexing-related fields
	this.updateCount = 0;
	this.numPoints = 10;
	this.lowIndex = 0;
	this.highIndex = this.lowIndex + this.numPoints;
	
	// Data-related fields
	this.dataArray = new Array();
	this.chartData; // The dataArray in a datatype that Google Charts can read
	
	// Initialize the chart and options
	// The chartOptions will be used during the draw upon update
	this.chart = new google.visualization.LineChart(document.getElementById(divName));
	this.chartOptions = 
		{
		  title: this.company.name,
		  legend: {position:'none'},
		  vAxis: {title:'Price'},
		  hAxis: {title:'Time'},
		  animation: {duration:1000, easing:'inAndOut'}
		};
	
	
	// ------ Define Functions ------- //
	this.update = function()
	{
		this.updateData();
		this.chart.draw(this.chartData, this.chartOptions);
	}
	
	/**
	 * Initializes the contents of data array by putting headers and such
	 */
	this.initArray = function()
	{
		this.dataArray = new Array();
		var titles = new Array();
		titles.push('Time');
		titles.push(company.name);
		this.dataArray.push(titles);
	}
	
	/**
	 * Sets the data for the chart, ensuring at least numPoints values
	 */
	this.updateData = function()
	{
		// Clear the contents of the array
		this.initArray();
		
		if (this.highIndex < this.company.priceHistory.length)
			this.increaseIndex();
		
		for(var i = this.lowIndex; i < this.highIndex; i++)
		{
			var entry = new Array();
			entry.push(i.toString()); // Puts in the time
			
			// Puts in a blank entry if there aren't enough in the company
			if (i >= this.company.priceHistory.length)
			{	
				entry.push(0);
			}
			else
			{
				entry.push(this.company.priceHistory[i]);
			}
			this.dataArray.push(entry);
		}
		this.chartData = google.visualization.arrayToDataTable(this.dataArray);
	}
	
	this.increaseIndex = function()
	{
		this.lowIndex++;
		this.highIndex++;
	}
	
	this.initArray();
}



