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
			
		}else{
			window.location.href = '/painel';	
		}
    } else {
        window.location.href = '/painel';
    }
});
var db = firebase.firestore();
var arr = [];
db.collection("devices")
.onSnapshot(function(querySnapshot) {
	querySnapshot.forEach(function(doc) {
		arr.push(doc.data().language);
	});
	var counts = {};
	for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        	counts[num] = counts[num] ? counts[num] + 1 : 1;
	}
	let result = arr.sort().reduce((init, current) => {
	    if (init.length === 0 || init[init.length - 1] !== current) {
	        init.push(current);
			$("#languagescode").append("<th>" + current + "</th>");
			$("#languagescont").append("<td>" + counts[current] + "</td>");
	    }
	    return init;
	}, []);
});
