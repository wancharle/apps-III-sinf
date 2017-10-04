window.sons = {}; // dicionario global de sons

function loadMedia (url){
    var u = ""+url;
    var media = new Media(u,
             function () { console.log("playAudio():Audio Success"); },
             function (err) { console.log("playAudio():Audio Error: "); console.log( err); }
    );
    return media;
}

function load_sons(){
	window.sons.beep=loadMedia('som.mp3');
}
