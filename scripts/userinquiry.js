// Get all the modals
var generalModal = document.getElementById("general-modal");
var recordsModal = document.getElementById("records-modal");
var archivingModal = document.getElementById("archiving-modal");

// Get the buttons (cards)
var generalBtn = document.getElementById("general-card");
var recordsBtn = document.getElementById("records-card");
var archivingBtn = document.getElementById("archiving-card");

// Get the close elements for each modal
var closeButtons = document.getElementsByClassName("close");

// Function to close modal
function closeModal(modal) {
    modal.style.display = "none";
}

// Open General modal
generalBtn.onclick = function () {
    generalModal.style.display = "block";
}

// Open Records modal
recordsBtn.onclick = function () {
    recordsModal.style.display = "block";
}

// Open Archiving modal
archivingBtn.onclick = function () {
    archivingModal.style.display = "block";
}

// Close the modal when the close (X) is clicked
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
        closeModal(this.parentElement.parentElement);
    }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target == generalModal) {
        closeModal(generalModal);
    }
    if (event.target == recordsModal) {
        closeModal(recordsModal);
    }
    if (event.target == archivingModal) {
        closeModal(archivingModal);
    }
}




//this is for setting queue limit
let currentQueueCount = 0;

// Function to check if the queue is still open based on the limit
function checkQueueLimit() {
    const limit = localStorage.getItem('dailyQueueLimit') || 200;  // Default to 200 if not set
    if (currentQueueCount >= limit) {
        alert('Sorry, the queue for today is full. Please come back tomorrow.');
        return false;
    }
    return true;
}



// Function to print the queue and check if limit is reached
function printQueue(serviceType) {
    let studentName = '';
    let studentId = '';
    let purpose = '';

    if (serviceType === 'General') {
        studentName = document.getElementById('general-student-name').value;
        studentId = document.getElementById('general-student-id').value;
        purpose = document.getElementById('general-purpose').value;
    } else if (serviceType === 'Records') {
        studentName = document.getElementById('records-student-name').value;
        studentId = document.getElementById('records-student-id').value;
        purpose = document.getElementById('records-purpose').value;
    } else if (serviceType === 'Archiving') {
        studentName = document.getElementById('archiving-student-name').value;
        studentId = document.getElementById('archiving-student-id').value;
        purpose = document.getElementById('archiving-purpose').value;
    }

    if (!studentId || !purpose) {
        alert('Please fill in all the details.');
        return;
    }

    // Generate random queue number and current date
    var queueNumber = Math.floor(Math.random() * 900) + 100;  // Random 3-digit number
    var currentDateTime = new Date().toLocaleString();

    // Create the receipt content
    var receiptContent = `
<h3>CEBU EASTERN COLLEGE</h3>
<center><h4>QUEUING NO.</h4>
<hr>
<h1>${queueNumber}</h1>
<hr>
<p>${studentName}</p>
<p>${studentId}</p></center>
<br><br><br>        
<h4>${serviceType} Service</h4>
<p>Purpose: ${purpose}</p>

<p>${currentDateTime}</p>
`;

    // Inject the receipt content into the modal
    document.getElementById('receiptContainer').innerHTML = receiptContent;

    // Show the modal
    var modal = document.getElementById('receiptModal');
    modal.style.display = "block";

    // Automatically print the receipt content
    setTimeout(function () {
        window.print();
    }, 500); // Optional delay before printing
}

// Close the modal when the user clicks the "close" button
function closeModal() {
    var modal = document.getElementById('receiptModal');
    modal.style.display = "none";
}
