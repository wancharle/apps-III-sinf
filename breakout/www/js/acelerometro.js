
var aceleracao_x = 0; 

function onMovement(eixos) {
    aceleracao_x+=1.5*eixos.x;
    if (aceleracao_x > 0 && eixos.x < 0) aceleracao_x=eixos.x;
    if (aceleracao_x < 0 && eixos.x > 0) aceleracao_x=eixos.x;
    document.getElementById("logmsg").innerText= eixos.x;
};

function onMovementError(error) {
    alert('accelerometer error: ' + error.code);
};

function monitoraAcelerometro(){
    var options = {
        frequency: 250
    }; // Update every 0.25 seconds

    watchID = navigator.accelerometer.watchAcceleration(onMovement, onMovementError, options);
}
