function startChat() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "flex";
}

function stopChat() {
    document.getElementById("welcome-screen").style.display = "flex";
    document.getElementById("chat-screen").style.display = "none";
}

// Function to initialize the audio context and visualizer
function initAudioVisualizer() {
    // Check if AudioContext is supported
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    // Create an AnalyserNode to get audio frequency data
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Number of data points for the analysis
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength); // Array to store audio data

    // Create a canvas for visualizer and get its context
    const canvas = document.getElementById("visualizer");
    const canvasContext = canvas.getContext("2d");

    // Configure audio source (here we simulate a response using SpeechSynthesis)
    const audioSource = audioContext.createMediaStreamSource(new MediaStream());
    audioSource.connect(analyser); // Connect audio source to analyser

    // Function to draw the visualizer on canvas
    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);

        // Get frequency data from the analyser node
        analyser.getByteFrequencyData(dataArray);

        // Clear the canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        // Set bar width based on buffer length
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        // Loop through data array and draw bars
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            // Set color based on height of each bar
            canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
            canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    }

    // Start drawing visualizer
    drawVisualizer();

    // Example response using Speech Synthesis
    const utterance = new SpeechSynthesisUtterance("Hello, I am Nova AI, your chatbot assistant.");
    utterance.onstart = () => {
        // Connect the visualizer to audio context when speech starts
        const audioStream = audioContext.createMediaElementSource(new Audio());
        audioStream.connect(analyser);
    };
    speechSynthesis.speak(utterance);
}

// Call this function when chat is started
function startChat() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "flex";
    initAudioVisualizer();
}

function stopChat() {
    document.getElementById("welcome-screen").style.display = "flex";
    document.getElementById("chat-screen").style.display = "none";
    // Stop visualizer or additional cleanup if needed
}

