var textarea = document.getElementById('textarea');
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var listening = false; // Flag to control speech recognition loop

function inString(check, main) {
    for (let i = 0; i <= main.length - check.length; i++) {
        if (main.substring(i, i + check.length) === check) {
            return true;
        }
    }
    return false;
}

function getAudio() {
    return new Promise((resolve) => {
        recognition.start();
        textarea.innerHTML = '...Say Nova With A Question';

        recognition.onresult = function (event) {
            var transcript = event.results[0][0].transcript;
            textarea.innerHTML = transcript;

            resolve(transcript.toLowerCase());
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
            textarea.innerHTML = 'Error occurred in recognition: ' + event.error;
            resolve('');
        };
    });
}

function speakText(text) {
    var speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

async function nova() {
   listening = true;
    let user_text = "";

    while (listening) {
        user_text = "";

        // Inner loop for speech recognition until 'nova' is heard
        while (!inString("nova", user_text)) {
            user_text = await getAudio();

            // Check if "nova" is in the user_text to break the loop
            if (inString("nova", user_text)) {
                console.log("User said Nova, breaking out of first loop");
                break;
            }
        }
        // Indicate analysis to user
        textarea.innerHTML = "Analyzing...";
        console.log("Analyzing text");

        recognition.stop();


        fetch('/process_voice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_text: user_text })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response from Nova:", data.response);
            document.getElementById("textarea").textContent = "Nova Is Speaking";

            speakText(data.response);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}


function goToNova() {
    window.location.href = '/nova';
    speakText("Welcome To Nova A.I. lets explore the the cosmose  ")
}


function explore() {
    document.getElementById("explore-button").style.display = "none";
    document.getElementById("land-button").style.display = "flex";
    document.getElementById('textarea').textContent = "Say Nova With A Question To Activate";
    nova();
}

function land() {
    recognition.stop();
    document.getElementById("textarea").textContent = "Click Explore";
    document.getElementById("explore-button").style.display = "flex";
    document.getElementById("land-button").style.display = "none";
}
