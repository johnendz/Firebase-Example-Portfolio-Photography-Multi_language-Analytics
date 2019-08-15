popup = {
				  init: function(){
				    $('figure').click(function(){
				      popup.open($(this));
				    });
				    
				    $(document).on('click', '.popup img', function(){
				      return false;
				    }).on('click', '.popup', function(){
				      popup.close();
				    })
				  },
				  open: function($figure) {
				    $('.gallery').addClass('pop');
				    $popup = $('<div class="popup" />').appendTo($('body'));
				    $fig = $figure.clone().appendTo($('.popup'));
				    $bg = $('<div class="bg" />').appendTo($('.popup'));
				    $close = $('<div class="close"><svg><use xlink:href="#close"></use></svg></div>').appendTo($fig);
				    $shadow = $('<div class="shadow" />').appendTo($fig);
				    src = $('img', $fig).attr('src');
					var id = $figure.attr("id");
					clickcount(id);
				    $shadow.css({backgroundImage: 'url(' + src + ')'});
				    $bg.css({backgroundImage: 'url(' + src + ')'});
				    setTimeout(function(){
				      $('.popup').addClass('pop');
				    }, 10);
				  },
				  close: function(){
				    $('.gallery, .popup').removeClass('pop');
				    setTimeout(function(){
				      $('.popup').remove()
				    }, 100);
				  }
}
var config = {
	apiKey: "AIzaSyAdt7DQf3k3zzvAq-wV6OK29GDLqMVQBmY",
	authDomain: "kin-network-me.firebaseapp.com",
	databaseURL: "https://kin-network-me.firebaseio.com",
	projectId: "kin-network-me",
	storageBucket: "kin-network-me.appspot.com",
	messagingSenderId: "694927497991"
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.collection("photos")
.onSnapshot(function(querySnapshot) {
	$(".gallery").html("");
	querySnapshot.forEach(function(doc) {
		if(langCode == "pt"){
			$(".gallery").append("<figure id='" + doc.id + "'><img src='" + doc.data().img + "'><figcaption>" + doc.data().pt_titulo + " <small>" + doc.data().desc + "</small></figcaption></figure>");
		}else{
			$(".gallery").append("<figure id='" + doc.id + "'><img src='" + doc.data().img + "'><figcaption>" + doc.data().en_titulo + " <small>" + doc.data().desc + "</small></figcaption></figure>");
		}
	});
	popup.init();
});
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
    }

    window.device = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion
    };
}(this));
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}
function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);
 
    if (begin == -1) {
 
        begin = cookies.indexOf(prefix);
         
        if (begin != 0) {
            return null;
        }
 
    } else {
        begin += 2;
    }
 
    var end = cookies.indexOf(";", begin);
     
    if (end == -1) {
        end = cookies.length;                        
    }
 
    return unescape(cookies.substring(begin + prefix.length, end));
}
var osfull = device.os + " " + device.osVersion;
var browserfull = device.browser + " " + device.browserMajorVersion + " (" + device.browserVersion + ")";
if (getCookie("view") != "true" && getCookie("notrack") != "true"){
function ipLookUp () {
$.ajax('https://ipapi.co/json').then(
	function success(response) {
		setCookie("ip", response.ip, "1");
		db.collection("devices").add({
		    os: device.os,
			osfull: osfull,
			browser: device.browser,
			browserfull: browserfull,
			mobile: device.mobile,
			screensize: device.screen,
			useragent: navigator.userAgent,
			date: new Date().getTime(),
			country: response.country_name,
			countrycode: response.country,
			ip: response.ip,
			region: response.region,
			city: response.city,
			language: navigator.language
		});
		setCookie("view", "true", "1");
    },
	function fail(data, status) {
        db.collection("devices").add({
		    os: device.os,
			osfull: osfull,
			browser: device.browser,
			browserfull: browserfull,
			mobile: device.mobile,
			screensize: device.screen,
			useragent: navigator.userAgent,
			date: new Date().getTime(),
			language: navigator.language
		});
		setCookie("view", "true", "1");
      }
  );
}
ipLookUp()
}
var clickid = {openbook: 'openbook', telegram: 'telegram', steam: 'steam'};
function clickcount(clickid) {
	if (getCookie("notrack") != "true"){
		db.collection("clicks").add({
			id: clickid,
			date: new Date().getTime(),
			ip: getCookie("ip")
		});
	}
}