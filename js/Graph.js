function Graph(company, divName)
{
	// ------- Define Fields -------- //
	this.company = company;
	this.dataArray = new Array();
	this.updateCount = 0;
	this.numPoints = 30;
	this.divName = divName;
	
	
	// ------ Define Functions ------- //
	this.update = function()
	{
		// update stuff
		this.updateDataArray();
		drawChart(this.dataArray, this.divName, this.company.name);
	}
	
	this.initArray = function()
	{
		var titles = new Array();
		titles.push('Time');
		titles.push(company.name);
		this.dataArray.push(titles);
	}
	
	this.updateDataArray = function()
	{
		var newEntry = new Array();
		newEntry.push((this.updateCount++).toString());
		
		newEntry.push(company.price);
		
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
	  
function drawChart(array, divName, cName) 
{	
	// Create the data table.
	var data = google.visualization.arrayToDataTable(array);

	var options = {
	  title: cName
	};

	var chart = new google.visualization.LineChart(document.getElementById(divName));
	chart.draw(data, options);
}
