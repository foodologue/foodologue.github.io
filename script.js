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
            sessionStorage.setItem('currentPage', page); // Save the current page to sessionStorage
        })
        .catch(error => {
            document.getElementById("main-content").innerHTML = `<h2>Error</h2><p>${error.message}</p>`; // Use backticks for template literals
        });
}

// Automatically load the last visited page or the home page if it's the first visit
window.addEventListener("DOMContentLoaded", function() {
    const lastPage = sessionStorage.getItem('currentPage');
    if (lastPage) {
        loadPage(lastPage); // Load the last visited page from sessionStorage
    } else {
        loadPage('pages/home.html'); // Load home.html by default if no page is stored
    }
});

// Add event listeners to all links in the left column
document.querySelectorAll(".left-column a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        const page = this.getAttribute("data-page"); // Get the page to load from the data-page attribute
        loadPage(page); // Load the corresponding HTML page
    });
});

