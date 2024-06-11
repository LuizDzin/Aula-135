var video, canvas, pause, playButton;
var status = '';
var objects = [];

function preload() {
video = createVideo("video.mp4");
video.hide()

pause = loadImage("pause.png")
playButton = loadImage("play_button.png")
}

function setup() {
canvas = createCanvas(480,380);
canvas.center();
canvas.mouseMoved(canvasMouseMoved);
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for (i  = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status:  Detectando Objetos";
            document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
if(error) {
    console.log(error);
}
    //console.log(results);
    objects = results;
}

function Play() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
    console.log("Modelo Carregado! :))")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function acao() {
    image(pause, 240, 190, 30, 30);
}

function canvasMouseMoved() {
    console.log("Funcionouuu")
    let intervalo = setInterval(acao);

setTimeout(() => {
    clearInterval(intervalo);
    
}, 3000);
    
    
}