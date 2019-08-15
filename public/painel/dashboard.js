//config do firebase web (copie do firebase e cole sobre o codigo abaixo)
var config = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: ""
};
firebase.initializeApp(config);
//config do firebase web
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		if(user.uid == "id do usuario"){
			document.cookie = "notrack=true;path=/";
		}else{
			window.location.href = '/painel';	
		}
    } else {
        window.location.href = '/painel';
    }
});
var db = firebase.firestore();
var storage = firebase.storage();
//photos
var photoscont = 0;
var storagecont = 0;
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
db.collection("photos").get().then(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		photoscont++;
		var storage = doc.data().size;
		storagecont = storagecont + storage;
	});
	if(photoscont == "0"){
		$("#photos").text("0 Fotografia Disponivel");
	}else{
		$("#photos").text(photoscont + " Fotografias Disponiveis");
	}
	if(storagecont == "0"){
		$("#storage").text("Armazenamento Usado: 0 Bytes");
	}else{
		var storagestring = formatBytes(storagecont);
		$("#storage").text("Armazenamento Usado: " + storagestring);
	}
});
//analytics
var devicescont = 0;
var mobilecont = 0;
var desktopcont = 0;
var languagearray = [];
var countryarray = [];
db.collection("devices").get().then(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		devicescont++;
		languagearray.push(doc.data().language);
		countryarray.push(doc.data().countrycode);
		if(doc.data().mobile == true){
			mobilecont++;
		}else{
			desktopcont++;
		}
	});
	if(devicescont == "0"){
		$("#devices").text("Nenhum Dispositivo Indentificado");
		$("#osdefine").text("Nenhum Dispositivo Indentificado");
	}else{
		if(mobilecont > desktopcont){
			$("#osdefine").text("Mais acessado pelo Mobile (" + mobilecont + ")");
		}else{
			$("#osdefine").text("Mais acessado pelo Desktop (" + desktopcont + ")");
		}
		$("#devices").text(devicescont + " Dispositivos Indentificados");
	}
	function language(arr) {
	    var a = [], b = [], prev;
	    
	    arr.sort();
	    for ( var i = 0; i < arr.length; i++ ) {
	        if ( arr[i] !== prev ) {
	            a.push(arr[i]);
	            b.push(1);
	        } else {
	            b[b.length-1]++;
	        }
	        prev = arr[i];
	    }
	    
	    return [a, b];
	}
	function country(arr) {
	    var a = [], b = [], prev;
	    
	    arr.sort();
	    for ( var i = 0; i < arr.length; i++ ) {
	        if ( arr[i] !== prev ) {
	            a.push(arr[i]);
	            b.push(1);
	        } else {
	            b[b.length-1]++;
	        }
	        prev = arr[i];
	    }
	    
	    return [a, b];
	}
	var result = language(languagearray);
	var result2 = country(countryarray);
	var languagescont = result[0].length;
	var countrycont = result2[0].length;
	if(languagescont == "0"){
		$("#languages").text("Nenhum Idioma Indentificado");
	}else{
		$("#languages").text(languagescont + " Idiomas Indentificados");
	}
	if(countrycont == "0"){
		$("#country").text("Nenhum Pais Indentificado");
	}else{
		$("#country").text(countrycont + " Pais Indentificados");
	}
});
//analytics views
var viewscont = 0;
var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
db.collection("devices").orderBy("date").startAt(firstDay).endAt(lastDay).get().then(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		viewscont++;
	});
	if(viewscont == "0"){
		$("#views").text("Nenhuma Visualização Mensal");
	}else{
		$("#views").text(viewscont + " Visualizações Mensais");
	}
});
//analytics clicks
var clickscont = 0;
db.collection("clicks").get().then(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		clickscont++;
	});
	if(clickscont == "0"){
		$("#clicks").text("Nenhum Clique Indentificado");
	}else{
		$("#clicks").text(clikscont + " Cliques Indentificados");
	}
});
$("#infos").text("Informações - ultima atualização: " + new Date());
