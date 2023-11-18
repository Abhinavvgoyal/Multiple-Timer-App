
const activeTimers = document.getElementById('activeTimers');

displayNoTimersText();

const startTimerButton = document.getElementById('startTimer');

let isTimerActive = false;
startTimerButton.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;


    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
    
        createTimer(totalSeconds);
        isTimerActive = true;
        removeNoTimersText();
    } else {
        alert("Please enter a valid time.");
    }
});

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} hr : ${m.toString().padStart(2, '0')} min : ${s.toString().padStart(2, '0')} sec`;
}

function createTimer(totalSeconds) {
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');

    const timeLeftElement = document.createElement('div');
    timeLeftElement.classList.add('time-left');
    timeLeftElement.textContent = 'Time Left:';

    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');


    const timerControls = document.createElement('div');
    timerControls.classList.add('timer-controls');

    const stopButton = document.createElement('button');
    stopButton.classList.add('control-button', 'stop-button');
    stopButton.textContent = 'Stop Timer';

    // Create the 'Delete' button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('control-button', 'delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.display = 'none'; 

    let timerInterval;

    // Function to update the timer display
    function updateTimerDisplay() {
        totalSeconds--;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.classList.add('timer-ended');
            timerElement.textContent = "Time is up!";
            stopButton.style.display = 'none'; 
            deleteButton.style.display = 'inline'; 
            timeLeftElement.style.display = 'none';
            // Play an audio alert when Time is up!
            playAudioAlert();
        } else {
            timerElement.textContent = formatTime(totalSeconds);
        }
    }

    // Add a click event listener to the 'Stop Timer' button
    stopButton.addEventListener('click', () => {
        // Stop the timer and remove the timer container
        clearInterval(timerInterval);
        timerContainer.remove();
        isTimerActive = false; 
        
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });

    // Add a click event listener to the 'Delete' button
    deleteButton.addEventListener('click', () => {
       
        timerContainer.remove();
      
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });

    // Start the timer interval
    timerInterval = setInterval(updateTimerDisplay, 1000);

    // Append timer control elements to the timer container
    timerControls.appendChild(stopButton);
    timerControls.appendChild(deleteButton);

    // Append timer elements to the timer container
    timerContainer.appendChild(timeLeftElement);
    timerContainer.appendChild(timerElement);
    timerContainer.appendChild(timerControls);

    // Append the timer container to the 'activeTimers' element
    activeTimers.appendChild(timerContainer);
}

// Function to display "You have no timers currently!" text
function displayNoTimersText() {
    const noTimersText = document.createElement('p');
    noTimersText.classList.add('no-timers-text');
    noTimersText.textContent = 'You have no timers currently!';
    noTimersText.style.fontSize = "14px";
    activeTimers.appendChild(noTimersText);
}

function removeNoTimersText() {
    
    const noTimersText = activeTimers.querySelector('.no-timers-text');
    if (noTimersText) {
        noTimersText.remove();
    }
}

// Function to play an audio alert
function playAudioAlert() {
    const audio = new Audio('./alert.mp3'); 
    audio.play();
}