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