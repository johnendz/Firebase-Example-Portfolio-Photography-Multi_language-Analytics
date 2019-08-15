var config = {
	apiKey: "AIzaSyAdt7DQf3k3zzvAq-wV6OK29GDLqMVQBmY",
	authDomain: "kin-network-me.firebaseapp.com",
	databaseURL: "https://kin-network-me.firebaseio.com",
	projectId: "kin-network-me",
	storageBucket: "kin-network-me.appspot.com",
	messagingSenderId: "694927497991"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		if(user.uid == "tAamW4K4cdUYcr6L5CsmK8e0VUj1"){
			
		}else{
			window.location.href = '/painel';	
		}
    } else {
        window.location.href = '/painel';
    }
});
var db = firebase.firestore();
db.collection("devices").orderBy("date", "desc")
.onSnapshot(function(querySnapshot) {
	$("#listdevices").html("");
    querySnapshot.forEach(function(doc) {
		if(doc.data().date != null){
			var data = new Date(doc.data().date);
		    var dia  = data.getDate();
		    if (dia< 10) {
		    dia  = "0" + dia;
		    }
		    var mes  = data.getMonth() + 1;
		    if (mes < 10) {
		    mes  = "0" + mes;
		    }
		    var ano  = data.getFullYear();
		    var hora  = data.getHours();
			var minuto = data.getMinutes();
			if (hora < 10) {
		    hora  = "0" + hora;
		    }
			if (minuto < 10) {
			minuto  = "0" + minuto;
			}
		    var fulldata = dia + "/" + mes + "/" + ano + "  " + hora + ":" + minuto;
		}else{
			var fulldata = "undefined";
		}
		if(doc.data().country != null){
		    var localizacao = doc.data().city + " , " + doc.data().region + " - " + doc.data().country;
		}else{
			var localizacao = "undefined";
		}
    	$("#listdevices").append("<tr><td>" + localizacao + "</td><td>" + doc.data().browserfull + "</td><td>" + doc.data().language + "</td><td>" + doc.data().osfull + "</td><td>" + doc.data().screensize + "</td><td>" + fulldata + "</td><td>" + doc.data().useragent + "</td></tr>");
    });
});
