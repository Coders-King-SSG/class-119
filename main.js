function preload() {
    //empty
}

function setup() {
    canvas = createCanvas(500,300);
    canvas.parent('webcamSection');
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Rdp_4cMkZ/model.json', modelLoaded);
}

function modelLoaded() {
    console.log('Model initialized.')
}

function draw() {
    image(video, 0, 0, 500, 300);
    classifier.classify(video, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        var values = [Math.round((results[0].confidence * 100)),Math.round((results[1].confidence * 100)),Math.round((results[2].confidence * 100)), Math.round((results[3].confidence * 100))];
        // console.log('Value1: '+ val1 + '\nValue2: '+ val2 + '\nValue3: '+ val3 + '\nValue2: '+ val3);
        for (let i = 0; i < 4; i++) {
            if (results[i].label == 'Phone') {
                document.getElementById('phone').value = values[i];
            } else if(results[i].label =='Note Book') {
                document.getElementById('notebook').value = values[i];
            } else if(results[i].label == 'Water Bottle') {
                document.getElementById('water-bottle').value = values[i];
            } else if(results[i].label == 'Pencil Box') {
                document.getElementById('pencil_box').value = values[i];
            }
        }
    }
}