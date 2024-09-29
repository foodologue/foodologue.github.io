// script.js

// Function to load content from external HTML files
function loadPage(page) {
    fetch(page) // Fetch the content of the selected HTML file
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text(); // Parse the content as text (HTML)
        })
        .then(data => {
            document.getElementById("main-content").innerHTML = data; // Insert content into the main content area
        })
        .catch(error => {
            document.getElementById("main-content").innerHTML = `<h2>Error</h2><p>${error.message}</p>`; // Fixed: Use backticks for template literals
        });
}

// Automatically load the home page when the site first loads
window.addEventListener("DOMContentLoaded", function() {
    loadPage('pages/home.html'); // Load home.html by default when the page loads
});

// Add event listeners to all links in the left column
document.querySelectorAll(".left-column a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        const page = this.getAttribute("data-page"); // Get the page to load from the data-page attribute
        loadPage(page); // Load the corresponding HTML page
    });
});
