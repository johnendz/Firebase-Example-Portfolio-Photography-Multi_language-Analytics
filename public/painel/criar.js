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
var storage = firebase.storage();
$(document).ready(function() {
	function dataURLtoBlob(dataURL) {
        var binary = atob(dataURL.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
	}
	function functioncompress(docid) {
		var file = document.getElementById("imagem").files[0];
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext("2d");
		var image = new Image();
		image.onload = function() {
			ctx.canvas.width = image.width;
			ctx.canvas.height = image.height;
			ctx.drawImage(image, 0, 0,image.width,image.height);
			var compress = canvas.toDataURL('image/jpeg', 0.8);
			var imgfile = dataURLtoBlob(compress);
			var size = imgfile.size;
			upload(docid, compress, size);
		};
		image.src = URL.createObjectURL(file);
		$("#add").text("Comprimindo...");
	}
	function upload(docid, compress, size) {
		var uploadTask = storage.ref().child('/photos/' + docid + '.jpg').putString(compress, 'data_url');
		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			var textprogress = progress.toFixed(0);
			$("#add").text("Enviando (%" + textprogress + ")...");
		}, function(error) {
			$("#add").text("Ocorreu um Erro");
			console.log("Error getting documents: ", error);
		}, function() {
			$("#add").text("Salvando...");
			var url = uploadTask.snapshot.downloadURL;
			db.collection("photos").doc(docid).update({
				"img": url,
				"size": size
			});
			setTimeout(function(){
            	window.location.href = "/painel/photos";
            }, 1000);
		});
	}
	$("#add").click(function() {
		$("#add").text("Adicionando...");
		$("#add").prop('disabled', true);
		var pt_titulo = $("#pttext").val();
		var en_titulo = $("#entext").val();
		var location = $("#location").val();
		var files = $("#imagem")[0].files;
		if(files.length != 0){
			var foto = "1";
		}
		if(pt_titulo && en_titulo && location && foto != null){
			db.collection("photos").add({
				"pt_titulo": pt_titulo,
				"en_titulo": en_titulo,
				"desc": location
			})
			.then(function(docRef) {
				var docid = docRef.id;
				functioncompress(docid);
			})
			.catch(function(error) {
				$("#add").text("Ocorreu um Erro");
				setTimeout(function(){
					$("#add").text("Adicionar");
					$("#add").prop('disabled', false);
				}, 3000);
				console.error("Error adding document: ", error);
			});  
		}else{
			$("#add").text("Você esqueceu de alguma coisa");
			setTimeout(function(){
				$("#add").text("Adicionar");
				$("#add").prop('disabled', false);
			}, 3000);
		}
	});
	
	
});
