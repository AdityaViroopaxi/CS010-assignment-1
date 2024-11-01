function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = form.style.display === "none" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const bioDataForm = document.getElementById("biodataForm");
    const resumeForm = document.getElementById("resumeForm");

    bioDataForm?.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(bioDataForm);
        displayData("displayBioData", formData);
        bioDataForm.reset();
    });

    resumeForm?.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(resumeForm);
        displayData("displayResume", formData);
        resumeForm.reset();
    });
});

function displayData(displayId, formData) {
    const displaySection = document.getElementById(displayId);
    displaySection.innerHTML = ""; // Clear previous data

    formData.forEach((value, key) => {
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        displaySection.appendChild(p);
    });
}

function downloadPDF(displayId, filename) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Set up styles for the PDF
    pdf.setFontSize(16);
    pdf.text('ProfileMaster', 10, 10);
    pdf.setFontSize(12);
    
    // Add header
    pdf.text('-----------------------------', 10, 20);
    pdf.text('Your Information:', 10, 30);
    pdf.text('-----------------------------', 10, 40);
    
    // Get display data
    const displaySection = document.getElementById(displayId);
    let y = 50; // Start y position for text

    // Loop through each displayed data point and add to PDF
    Array.from(displaySection.querySelectorAll("p")).forEach(p => {
        pdf.text(p.textContent, 10, y);
        y += 10; // Increment y position
    });

    // Save the PDF
    pdf.save(filename);
}

// Assign download functionality to buttons
function setupDownloadButtons() {
    document.querySelector("#biodataDownloadButton").onclick = () => downloadPDF('displayBioData', 'biodata.pdf');
    document.querySelector("#resumeDownloadButton").onclick = () => downloadPDF('displayResume', 'resume.pdf');
}

document.addEventListener("DOMContentLoaded", setupDownloadButtons);
