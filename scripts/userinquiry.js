// Function to open modal
function openModal(modalId, serviceType) {
    document.getElementById(modalId).style.display = "flex";
    document.getElementById('serviceNamePrint').innerText = serviceType + ' Inquiry';
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// General function to print queue for any service
function printQueue(serviceType) {
    let name, idNumber, purpose;
    if (serviceType === 'General') {
        name = document.getElementById('general-student-name').value;
        idNumber = document.getElementById('general-student-id').value;
        purpose = document.getElementById('general-purpose').value;
    } else if (serviceType === 'Records') {
        name = document.getElementById('records-student-name').value;
        idNumber = document.getElementById('records-student-id').value;
        purpose = document.getElementById('records-purpose').value;
    } else if (serviceType === 'Archiving') {
        name = document.getElementById('archiving-student-name').value;
        idNumber = document.getElementById('archiving-student-id').value;
        purpose = document.getElementById('archiving-purpose').value;
    }

    // Generate a random queue number
    const queueNumber = Math.floor(Math.random() * 900) + 100;

    // Get the current date and time
    const currentDate = new Date();
    const dateTime = currentDate.toLocaleString();

    // Fill the print area with the user's data
    document.getElementById('queueNumberPrint').innerText = `Queue Number: ${queueNumber}`;
    document.getElementById('queueDetails').innerText = `Name: ${name}\nID Number: ${idNumber}\nPurpose: ${purpose}`;
    document.getElementById('queueDateTime').innerText = `Date and Time: ${dateTime}`;

    // Open the print window
    const printContents = document.getElementById('printArea').innerHTML;
    const printWindow = window.open('', '_blank', 'width=600,height=400');
    printWindow.document.write('<html><head><title>Queue Ticket</title></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function (event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}