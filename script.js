const scriptURL = 'https://script.google.com/macros/s/AKfycby0tX-0Gx1Cghlr08QZPFf9spzPqA4dr46hIqbsEhQFrWphVBI0-NL3mnbv7NXSVd8/exec';
const form = document.forms['submit-to-google-sheet'];
const RoutineResponse = document.getElementById('RoutineResponse');
const timeslotDropdown = document.getElementById('timeslot'); // Cache the timeslot dropdown element
const responseMessage = document.getElementById('responseMessage');
const spinner = document.querySelector('.spinner');

// Function to show the popup message
function showPopup(message, isSuccess) {
  const popup = document.createElement('div');
  popup.className = 'popup ' + (isSuccess ? 'popup-success' : 'popup-error');
  popup.textContent = message;

  document.body.appendChild(popup);
  popup.style.display = 'block';

  setTimeout(() => {
    popup.style.display = 'none';
    document.body.removeChild(popup);
  }, 3000);
}

// Form Submission
document.getElementById("Form_Submit").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  var formData = new FormData(form);

  // Format the date before submitting
  var datepicker = document.getElementById('datepicker').value;
  var formattedDate = formatDate(datepicker);
  formData.set('datepicker', formattedDate);

  // Disable the submit button while the request is in progress
  form.querySelector('button').disabled = true;

  // Make a POST request to your Google Apps Script
  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Show success popup message
      showPopup(`Message: ${data.result}, Column: ${data.column}, Row: ${data.row}, Slot: ${data.slot}`, true);
      // Clear the form after successful submission
      form.reset();
    })
    .catch(error => {
      console.error('Error!', error.result);
      // Show error popup message
      showPopup(`Error: ${error.result}`, false);
    })
    .finally(() => {
      // Re-enable the submit button after the request is complete
      form.querySelector('button').disabled = false;
    });
});

function formatDate(dateString) {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Function to populate the time slots dropdown
function populateTimeSlots() {
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

// Function to get the current time slot based on current time
function getTimeSlot() {
  let currentTime = new Date();
  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let currentSlot = 37 - Math.floor((currentHours - 5) * 2 + currentMinutes / 30);
  
  return currentSlot;
}

// Function to fetch data from Google Sheets
async function fetchSheetData(number) {
  const scriptUrl = scriptURL + '?number=' + encodeURIComponent(number);
  try {
    // Show the spinner
    spinner.style.display = 'inline-block';
    const response = await fetch(scriptUrl);
    const result = await response.json();

    if (result.found) {
      RoutineResponse.innerHTML = `You Should be doing : <br/><span class="highlight">${result.tasks}</span>`;
      document.getElementById('textbox').value = result.entry;
      document.getElementById('Category').value = result.taskType;
      document.getElementById(result.screenVal).checked = true;
    } else {
      RoutineResponse.innerHTML = 'Number not found';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    RoutineResponse.innerHTML = `Error: ${error.message}`;
  }
  finally {
    // Hide the spinner
    spinner.style.display = 'none';
  }
}

// Function to fetch data from Google Sheets and display immediately on page load
window.addEventListener('load', async function () {
  const timeslot = timeslotDropdown.value;
  await fetchSheetData(timeslot);
});

// Function to fetch data from Google Sheets and display on selection change
timeslotDropdown.addEventListener('change', async function () {
  const timeslot = timeslotDropdown.value;
  // Show the spinner
  RoutineResponse.innerHTML = ''; // Clear previous response text
  spinner.style.display = 'inline-block';
  await fetchSheetData(timeslot);
});

