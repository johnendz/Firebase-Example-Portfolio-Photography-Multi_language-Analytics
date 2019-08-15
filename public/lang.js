var translate = function (jsdata)
{	
	$("[tkey]").each (function (index)
	{
		var strTr = jsdata [$(this).attr ('tkey')];
	    $(this).html (strTr);
	});
}
var langCode = navigator.language.substr (0, 2);
switch(langCode) {
	case "pt":
    	$.getJSON('lang/pt.json', translate);
    	break;
	default:
    	$.getJSON('lang/en.json', translate);
}