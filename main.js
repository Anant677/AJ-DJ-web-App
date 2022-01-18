song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreleft = 0;
scoreright = 0;
function preload(){
song = loadSound("music.mp3");

}
function setup(){
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(600,500);
    canvas.center();

    poseNet = ml5.poseNet(video,modeLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    circle(rightWristX,rightWristY,20);
    fill("red");
    stroke("red");
    circle(leftWristX,leftWristY,20);
    if(rightWristY>0 && rightWristY<100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x ";
        song.rate(0.5);
    }else if(rightWristY>100 && rightWristY<200){
        document.getElementById("speed").innerHTML = "Speed = 1x ";
        song.rate(1);
    }else if(rightWristY>200 && rightWristY<300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x ";
        song.rate(1.5);
    }else if(rightWristY>400 && rightWristY<500){
        document.getElementById("speed").innerHTML = "Speed = 2x ";
        song.rate(2);
    }

    if(scoreright < 0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x ";
            song.rate(0.5);
        }else if(rightWristY>100 && rightWristY<200){
            document.getElementById("speed").innerHTML = "Speed = 1x ";
            song.rate(1);
        }else if(rightWristY>200 && rightWristY<300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x ";
            song.rate(1.5);
        }else if(rightWristY>400 && rightWristY<500){
            document.getElementById("speed").innerHTML = "Speed = 2x ";
            song.rate(2);
        }    
    }
    

        if(scoreleft > 0.2) { 
            fill("red");
            stroke("red");
            circle(leftWristX,leftWristY,20);
            InNumberleftWristY = Number(leftWristY);
           new_leftWristY = floor(InNumberleftWristY *2);
           leftWristY_divide_1000 = new_leftWristY/1000;
           document.getElementById("vol").innerHTML = "Volume = " + leftWristY_divide_1000;
          song.setVolume(leftWristY_divide_1000); };


    
}
function Play_music(){
    song.play();
    song.setVolume(2);
    song.rate(1);
}
function gotPoses(results){
    console.log("done");
if(results.length>0){
    console.log(results);
    scoreright = results[0].pose.keypoints[10].score;
    scoreleft = results[0].pose.keypoints[9].score;
    console.log("Score Left is ",scoreleft," score right is ",scoreright);
    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    console.log("LeftX "+leftWristX+" RightX "+rightWristX);
    leftWristY = results[0].pose.leftWrist.y;
    rightWristY  = results[0].pose.rightWrist.y;
    console.log("LeftY "+leftWristY+" RightY "+rightWristY);
}
}
function modeLoaded(){
    console.log("PoseNet is Initialised");
}
