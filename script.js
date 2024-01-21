//All the required Configs
const scriptURL = 'https://script.google.com/macros/s/AKfycbyaXe3kFEuMjZSL928TT0kwdicq2vX03i5V-9Do4Ox7NA_ZInHjF1Ai7kpEUyUQ2l0/exec';
const form = document.forms['submit-to-google-sheet'];
const responseMessage = document.getElementById('responseMessage');

//Form Submission
form.addEventListener('submit', e => {
    e.preventDefault();
    // Disable the submit button during the request
    form.querySelector('button').disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(data => {
            // Update the HTML with the response data
            responseMessage.innerHTML = `Test Result: ${data[0]}, Row: ${data.row}, Column: ${data.column}`;
            // Clear the form after successful submission
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            // Update the HTML with the error message
            responseMessage.innerHTML = `Error: ${error.message}`;
        })
        .finally(() => {
            // Re-enable the submit button after the request is complete
            form.querySelector('button').disabled = false;
        });
});

// Function to populate the time slots dropdown
function populateTimeSlots() {
    let timeslotDropdown = document.getElementById('timeslot');

    let startTime = formatTime(5, 0);
    let endTimeHours = 5;

    for (let i = 37; i >= 0; i--) {
        // Calculate ending time for the current slot
        let endTimeMinutes = 30 * (37 - i) + 30;
        endTimeHours += 0.5;
        endTimeMinutes %= 60;
        const endTime = formatTime(Math.floor(endTimeHours), endTimeMinutes);

        const option = document.createElement('option');
        option.value = i < 10 ? '0' + i : i.toString();
        option.setAttribute('name', option.value);
        option.text = option.value + ' = ' + startTime + ' - ' + endTime;

        console.log(option.text)

        // Set default selected option based on the current time
        let CurrentSlot = getTimeSlot();
        if (i === CurrentSlot) {
            option.selected = true;
        }

        timeslotDropdown.add(option);

        // Update starting time for the next slot
        startTime = endTime;
    }
}

// Function to format time in HH:mm AM/PM format
function formatTime(hours, minutes) {
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + period;
}

// Call the function to populate the dropdown
populateTimeSlots();

function getTimeSlot() {
    // Get the current time
    let currentTime = new Date();
    let currentHours = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSlot = 37 % Math.floor((currentHours - 5) * 2 + currentMinutes / 30);

    return currentSlot;
}

// Example usage
let CurrentTimeSlot = getTimeSlot();
console.log('Current Time Slot:', CurrentTimeSlot);