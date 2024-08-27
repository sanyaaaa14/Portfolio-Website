
// var tablinks=document.getElementsByClassName("tab-links");
// var tabContents=document.getElementsByClassName("tab-contents");

// function opentab(tabname){
//     for(tablinks of tablinks){
//         tablinks.classList.remove("active-links");
//     }
//     for(tabContents of tabContents){
//         tabContents.classList.remove("active-tab");
//     }
//     event.currentTarget.classList.add("active-links");
//     document.getElementById(tabname).classList.add("active-tab");
// }

// Function to open a tab
function opentab(event, tabname) {
    // Get all tab links and tab contents
    var tablinks = document.getElementsByClassName("tab-links");
    var tabContents = document.getElementsByClassName("tab-contents");

    // Remove active class from all tab links and tab contents
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-links");
    }
    for (var j = 0; j < tabContents.length; j++) {
        tabContents[j].classList.remove("active-tab");
    }

    // Add active class to the clicked tab link and the corresponding tab content
    event.currentTarget.classList.add("active-links");
    document.getElementById(tabname).classList.add("active-tab");
}

// Add event listeners to tab links in your HTML
document.querySelectorAll('.tab-links').forEach(tab => {
    tab.addEventListener('click', function(event) {
        opentab(event, this.getAttribute('data-tab'));
    });
});
var sidemenu=document.getElementById("sidemenu")
function openmenu(){
    sidemenu.style.right="0";
}
function closemenu(){
    sidemenu.style.right="-200px";
}
// const scriptURL = 'https://script.google.com/macros/s/AKfycbz3vS_7a-C_DQEfcS2oqTS6kxU8QWQunS8bC2dD-iXuXwvaQj-hKDv30OUy0nHJM_RxcA/exec';
// const form = document.forms['submit-to-google-sheet'];
// const msg = document.getElementById('msg');

// form.addEventListener('submit', e => {
//   e.preventDefault();
  
//   const formData = new FormData(form);
//   fetch(scriptURL, { method: 'POST', body: formData })
//     .then(response => {
//       return response.json(); // Parse the JSON response
//     })
//     .then(result => {
//       msg.innerHTML = "Message sent successfully";
//       setTimeout(function() {
//         msg.innerHTML = "";
//       }, 5000);
//       form.reset();
//     })
//     .catch(error => {
//       console.error('Error!', error.message);
//     });
// });
const scriptURL = 'https://script.google.com/macros/s/AKfycbz3vS_7a-C_DQEfcS2oqTS6kxU8QWQunS8bC2dD-iXuXwvaQj-hKDv30OUy0nHJM_RxcA/exec'; // Replace with your actual script URL
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = new FormData(form);

    fetch(scriptURL, { 
        method: 'POST', 
        body: formData 
    })
    .then(response => response.json())
    .then(result => {
        // Check the result for success
        if (result.result === "success") {
            msg.innerHTML = "Message sent successfully";
            setTimeout(() => msg.innerHTML = "", 5000);
            form.reset(); // Reset the form only after success
        } else {
            msg.innerHTML = "Failed to send message.";
            setTimeout(() => msg.innerHTML = "", 5000);
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
        msg.innerHTML = "Failed to send message.";
        setTimeout(() => msg.innerHTML = "", 5000);
    });
});


const sheetName = 'Form Responses';
const scriptProp = PropertiesService.getScriptProperties();

function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
        SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName).appendRow(["Name", "Email", "Message"]);
    }

    const data = e.parameter;
    const name = data.Name || "No Name";
    const email = data.Email || "No Email";
    const message = data.Message || "No Message";

    sheet.appendRow([name, email, message]);

    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
                         .setMimeType(ContentService.MimeType.JSON);
}
