var sm;

function start()
{
	sm = new StockMarket("data.txt");
	initPage();
	setInterval(function() { updatePage(); }, 1000);
}

function updatePage()
{
	sm.update();
	updateVisuals();
}

function updateVisuals()
{
	for (i = 0; i < sm.numCompanies(); i++)
	{
		var compIdent = '#c' + i + ' h3';
		var comp = sm.companies[i];
		$(compIdent).empty().append('$' + comp.price + '.00');
		
		
		// Change color
		$(compIdent).removeClass();
		console.info(comp.changeType());
		if (comp.changeType() == comp.SAME)
			$('#c' + i + ' h3').addClass('neutralPrice');
		else if (comp.changeType() == comp.GAIN)
			$('#c' + i + ' h3').addClass('higherPrice');
		else if (comp.changeType() == comp.LOSS)
			$('#c' + i + ' h3').addClass('lowerPrice');
	}
}

function initPage()
{
	$('#companies').empty();
	for(i = 0; i < sm.numCompanies(); i++)
	{
		$('#companies').append('<div class="company" id="c' + i + '">' +
				'<img class="company_pic" src="' + sm.companies[i].iconSrc + '" />' +
				'<h2>' + sm.companies[i].name + '</h2>' + 
				'<h3 class="neutralPrice">$' + sm.companies[i].price + '.00</h2>' +
			'</div>');
	}
}