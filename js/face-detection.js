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

                app.xf = (xf - 250) * 0.05;
                app.yf = (yf - 150) * 0.05;

            } else {
            }
            let delay = 1000 / FPS - (Date.now() - begin);

            requestAnimationFrame(processVideo);
        }

        processVideo();
    };
}