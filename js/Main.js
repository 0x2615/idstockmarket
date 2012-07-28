// The StockMarket object the page displays
var sm;

// The graph that will display the data
var graphs;

var UPDATE_INTERVAL = 2000;

// Starts off the machine when the page loads
$(document).ready(function() { start(); });


/**
 * Starts the machine.
 */
function start()
{
	sm = new StockMarket("data.txt");
	graphs = new Array();
	initPage();
	updatePage();
	setInterval(function() { updatePage(); }, UPDATE_INTERVAL);
}

/**
 * Updates the StockMarket and the page visuals
 */
function updatePage()
{
	sm.update();
	updateVisuals();
	for (var i = 0; i < graphs.length; i++)
	{
		graphs[i].update();
	}
}

/**
 * Updates the page to reflect the StockMarket data.
 */
function updateVisuals()
{
	for (var i = 0; i < sm.numCompanies(); i++)
	{
		// Stores id of the price identifier
		var compIdent = '#c' + i + ' h3';
		
		// Stores the Company object reference
		var comp = sm.companies[i];
		
		// Display the price
		$(compIdent).empty().append('$' + comp.price + '.00');
		
		// Change color of stock price depending on if it goes up or down
		// It does this by stripping the current css class and adding the
		// appropriate new one.
		$(compIdent).removeClass();
		if (comp.changeType() == comp.SAME)
			$('#c' + i + ' h3').addClass('neutral_price');
		else if (comp.changeType() == comp.GAIN)
			$('#c' + i + ' h3').addClass('higher_price');
		else if (comp.changeType() == comp.LOSS)
			$('#c' + i + ' h3').addClass('lower_price');
	}
}

/**
 * Handles the initial setup of the divs to hold the company information.
 */
function initPage()
{
	var numUpdates = 0;
	// Clears out the div just in case
	$('#companies').empty();
	for(var i = 0; i < sm.numCompanies(); i++)
	{
		// Creates a new div for each company and gives it its own id in the form of c<#>
		// Puts a the company logo, a h2 for the company title, and a h3 for the price
		if (i > 0)
		{
			$('#companies').append('<div class="fade_line"></div>' + 
					'<div class="company" id="c' + i + '">' +
					'<div class="inner_company">' +
					'<img class="company_pic" src="' + sm.companies[i].iconSrc + '" />' +
					'<h2>' + sm.companies[i].name + '</h2>' + 
					'<h3 class="neutral_price">$' + sm.companies[i].price + '.00</h2>' +
					'</div>' +
					'<div id="chart' + i + '" class="chart"></div>' + 
				'</div>');
		}
		else
		{
			$('#companies').append('<div class="company" id="c' + i + '">' +
					'<div class="inner_company">' +
					'<img class="company_pic" src="' + sm.companies[i].iconSrc + '" />' +
					'<h2>' + sm.companies[i].name + '</h2>' + 
					'<h3 class="neutral_price">$' + sm.companies[i].price + '.00</h2>' +
					'</div>' +
					'<div id="chart' + i + '" class="chart"></div>' + 
				'</div>');
		}
			
		// Creates the graph for each company
		var graph = new Graph(sm.companies[i], 'chart' + i);
		graphs.push(graph);
		
		numUpdates = graph.numPoints;
	}
	
	// Makes enough StockMarket updates so the graph is full at the start
	for (var i = 0; i < numUpdates; i++)
		sm.update();
	
}