Status = "";
input_text = "";

function setup()
{
    canvas = createCanvas(300, 290);
    canvas.position(480, 250);

    video = createCapture(VIDEO);
    video.size(300, 290);
    video.hide();
}

function Start()
{
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Trying To Detect Objects";
    input_text = document.getElementById("input_id").value;
}

function modelLoaded()
{
    console.log("The Modal Is Loaded!")
    Status = true;
}

function draw()
{
    image(video, 0, 0, 300, 290);

    if(Status != "")
    {
        object_detector.detect(video, gotResults)
        for(i = 0;i < objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            console.log(objects.length);
            fill();
            percent = floor(objects[i].confidence * 100);
            Text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == input_text)
            {
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_text + " Found";
                var synth = window.SpeechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}