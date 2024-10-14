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

   // Function to close modal
   function closeModal(modalId) {
       var modal = document.getElementById(modalId);
       modal.style.display = "none";
   }

   // Close the modal when the close (X) is clicked
   var closeButtons = document.getElementsByClassName("close");
   for (var i = 0; i < closeButtons.length; i++) {
       closeButtons[i].onclick = function () {
           var modal = this.closest('.modal'); // Find the closest modal container
           modal.style.display = "none";
       };
   }

   // Close modal when clicking outside of it
   window.onclick = function (event) {
       var modals = document.getElementsByClassName('modal');
       for (var i = 0; i < modals.length; i++) {
           if (event.target == modals[i]) {
               modals[i].style.display = "none";
           }
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
       let charQueue = '';

       if (serviceType === 'General') {
           studentName = document.getElementById('general-student-name');
           studentId = document.getElementById('general-student-id');
           purpose = document.getElementById('general-purpose');
           charQueue = 'G';
       } else if (serviceType === 'Records') {
           studentName = document.getElementById('records-student-name');
           studentId = document.getElementById('records-student-id');
           purpose = document.getElementById('records-purpose');
           charQueue = 'R';
       } else if (serviceType === 'Archiving') {
           studentName = document.getElementById('archiving-student-name');
           studentId = document.getElementById('archiving-student-id');
           purpose = document.getElementById('archiving-purpose');
           charQueue = 'A';
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
       <center><h3>CEBU EASTERN COLLEGE</h3></center>
       <center><h4>QUEUING NO.</h4></center>
       <hr>
       <h1>`+ (charQueue + queueNumber) + `</h1>
       <hr>
       <p><strong>Name:</strong> `+ studentName.value + `</p>
       <p><strong>Student ID:</strong> `+ studentId.value + `</p>
       <p><strong>Service Type:</strong> ` + serviceType + ` Service</p>
       <p><strong>Purpose:</strong> `+ purpose.value + `</p>
       <p><strong>Date & Time:</strong> `+ currentDateTime + `</p>
       `;
       let servetype = serviceType;
       $.ajax({
           url: 'inquiry',
           type: 'POST',
           data: {
               queueNum: (charQueue + queueNumber),
               fullname: studentName.value,
               studentid: studentId.value,
               purpose: purpose.value,
               servicetype: servetype
           },
           success: function (response) {
               alert('Success: ' + response);


               // Inject the receipt content into the modal
               document.getElementById('printArea').innerHTML = receiptContent;

               // Show the modal
               var modal = document.getElementById('receiptModal');
               modal.style.display = "block";

               // Automatically print the receipt content
               setTimeout(function () {
                   window.print();
               }, 500); // Optional delay before printing
           },
           error: function (xhr, status, error) {
               alert(error + ' : ' + xhr.responseText);
           }
       });


   }

   // Close the modal when the user clicks the "close" button
   function closeModal() {
       var modal = document.getElementById('receiptModal');
       modal.style.display = "none";
   }