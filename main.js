Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

var camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'/>"
    });
}

 console.log("ml5 version:" + ml5.version);

 var classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/wNYFeyZwK/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data_1 = "The prediction is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check() {
    var img = document.getElementById('captured_image');
    classifier.classify(img,gotResult)
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
        window.alert("Got error, Please try again !");
    } else {
        console.log(results);
        window.alert("Sucessfully Identified");
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if (results[0].label == "amazing") {
            document.getElementById('update_emoij').innerHTML = "&#128076;"
        }
        if (results[0].label == "best") {
            document.getElementById('update_emoij').innerHTML = "&#128077;"
        }
        if (results[0].label == "victory") {
            document.getElementById('update_emoij').innerHTML = "&#129304;"
        }

    }
}