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
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
function excluir(elem){
	var postid = elem.id;
	swal({
		title: 'Você tem certeza?',
		text: "Depois de excluir não pode recuperar!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Sim, quero excluir!',
	cancelButtonText: 'Não quero excluir',
	}).then((result) => {
		if (result.value) {
			storage.ref().child('/photos/' + postid + '.jpg').delete().then(function() {
				db.collection("photos").doc(postid).delete().then(function() {
					swal(
						'Foto Excluida!',
						'Sua foto foi excluida com sucesso.',
						'success'
					)
				}).catch(function(error) {
					swal(
						'Oops...',
						'Sua foto não foi excluida.',
						'error'
					)
					console.error("Error removing document: ", error);
				});
			}).catch(function(error) {
				Swal({
					type: 'error',
					title: 'Oops...',
					text: 'Algo deu errado!'
				})
				console.error("Error removing document: ", error);
			});
		}
	})
}
db.collection("photos")
	.onSnapshot(function(querySnapshot) {
		$("#listphotos").html("");
        querySnapshot.forEach(function(doc) {
			var storagestring = formatBytes(doc.data().size);
            $("#listphotos").append("<tr><td>" + doc.data().pt_titulo + "</td><td>" + doc.data().desc + "</td><td>" + storagestring + "</td><td><button type='button' class='btn btn-danger' onclick='excluir(this);' id='" + doc.id + "'>Excluir</button></td></tr>");
        });
});
