function openCvReady() {
    cv['onRuntimeInitialized'] = () => {
        let video = document.getElementById("cam_input"); // video is the id of video tag
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred! " + err);
            });
        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
        let gray = new cv.Mat();
        let cap = new cv.VideoCapture(cam_input);
        let faces = new cv.RectVector();
        let classifier = new cv.CascadeClassifier();
        let utils = new Utils('errorMessage');
        let faceCascadeFile = 'haarcascade_frontalface_default.xml'; // path to xml
        utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
            classifier.load(faceCascadeFile); // in the callback, load the cascade from file
        });

        const FPS = 24;                     // frames per second (detection loop)
        var xf = video.height * 0.5;          // filtered detection x coord
        var yf = video.width * 0.5;           // filtered detection y coord
        const alpha = 0.5;                  // low-pass filter correction factor
        const coord_scale_factor = 0.06;  // scaling factor to provide valid coords to three.js

        function processVideo() {
            let begin = Date.now();
            cap.read(src);
            src.copyTo(dst);
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            try {
                // get detections using haar-cascade detector
                // valid properties (current application):  2, 4, (100, 100)
                classifier.detectMultiScale(gray, faces, scaleFactor = 2, minNeighbors = 4, minSize = (100, 100));
            } catch (err) {
                // console.log(err);
            }

            // check if there are some detections
            if (faces.size() >= 1) {
                // apply the low-apss filter to correct the face detection coordinates

                xf = xf + alpha * (faces.get(0).x - xf);
                yf = yf + alpha * (faces.get(0).y - yf);

                app.cube.p5.x = 150 + (xf - 250) * 0.3;
                app.cube.p5.y = 150 + (yf - 120) * -0.3;

                app.cube.p6.x = 150 + (xf - 250) * 0.3;
                app.cube.p6.y = 450 + (yf - 120) * -0.3;

                app.cube.p7.x = 450 + (xf - 250) * 0.3;
                app.cube.p7.y = 450 + (yf - 120) * -0.3;

                app.cube.p8.x = 450 + (xf - 250) * 0.3;
                app.cube.p8.y = 150 + (yf - 120) * -0.3;


                app.shadow.p1.x = app.initialShadow.p1.x + (xf - 250) * -0.05;
                app.shadow.p1.y = app.initialShadow.p1.y + (yf - 120) * 0.05;

                app.shadow.p2.x = app.initialShadow.p2.x + (xf - 250) * -0.05;
                app.shadow.p2.y = app.initialShadow.p2.y + (yf - 120) * 0.05;

                app.shadow.p3.x = app.initialShadow.p3.x + (xf - 250) * -0.05;
                app.shadow.p3.y = app.initialShadow.p3.y + (yf - 120) * 0.05;

                app.shadow.p4.x = app.initialShadow.p4.x + (xf - 250) * -0.05;
                app.shadow.p4.y = app.initialShadow.p4.y + (yf - 120) * 0.05;



            } else {
                // app.cube.p5.x = 300 + (xf - 300) * 0.2;
                // app.cube.p5.y = 300 + (yf - 200) * -0.2;
            }
            let delay = 1000 / FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        }
        setTimeout(processVideo, 0);
    };
}