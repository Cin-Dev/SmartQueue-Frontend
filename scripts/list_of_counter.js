var dropdown = document.getElementsByClassName("button-profile");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {

        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

// Get elements
const addAccountButton = document.querySelector('.add-account-btn');
const closeModalButton = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// Function to open the modal
function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Event listeners
addAccountButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

var dropdown = document.getElementsByClassName("button-profile");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {

        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

var staffListInfo = document.getElementById("tablelist");

//need to update this function
function updateData() {
    var request = new XMLHttpRequest();
    request.open('GET', '/JsonStudentListAPI');
    request.onload = function () {
        var data = JSON.parse(request.responseText);
        renderHTML(data);
    }
    request.send();
}

//What is this function?
function renderHTML(data) {
    // var htmlString = ``;

    // for (var i = 0; i < data.length; i++) {

    //     htmlString += "<tr>";
    //     htmlString += "<td>" + data[i].idnumber + "</td>";
    //     htmlString += "<td>" + data[i].firstname + " " + data[i].middlename + " " + data[i].lastname + " </td>";
    //     htmlString += "<td>" + data[i].course + "</td>";
    //     htmlString += '<td><a href="update?staffId=' + data[i].staffID + '"><button class="update" style="background-color: #97BE5A;">Update</button></a> ';
    //     htmlString += '<a href="delete?staffId=' + data[i].staffID + '"><button class="delete" style="background-color: #EE4E4E;">Delete</button></a>';
    //     htmlString += "</tr>";
    // }

    //     staffListInfo.innerHTML = htmlString;

}

setInterval(updateData, 10000);


//button-profile being active btn
document.getElementById('button-profile').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('adminProfile').classList.toggle('show');
});