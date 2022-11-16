song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreofleftwrist = 0;
scoreofrightwrist = 0;
function preload(){
    song1 = loadSound("music2.mp3");
    song2 = loadSound("music 3.mp3");
    //Load sound is a predefined function of p5.js which is used to load the audio file.
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    //Video.hide because we will be displaying the webcam live view on the canvas, so we won't need this extra component.

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);//On is a predefined function used to start executing posenet. Got poses will get all 17 coordinates from the model.
}

function modelLoaded(){
    console.log('pose net is initialised');
}

function gotPoses(results){
    //Results contains the x and y coordinates of the 17 body parts
    if(results.length> 0){
        console.log(results);//With this, we can read the result array in the console.

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreofleftwrist = results[0].pose.keypoints[9].score;
        scoreofrightwrist = results[0].pose.keypoints[10].score;
        console.log("score right wrist +" + scoreofrightwrist + "score left wrist +" + scoreofleftwrist);
        console.log("right wrist x = " + rightWristX + "left wrist x = " + leftWristX);
        console.log("right wrist y = " + rightWristY + "left wrist y = " + leftWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

    if(scoreofrightwrist>0.2){
        circle(rightWristX, rightWristY, 25);
        song2.stop();

        if(song1status==false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing peter pan song";
        }
    }


    if(scoreofleftwrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2status ==false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing Harry potter song";
        }
    }
}
// Image is a predefined function of p5.js for loading the image on the canvas.

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1); 
}