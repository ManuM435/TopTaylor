// common.js

function fetchAndInsertCommonContent(classes) {
    fetch('common.html')
        .then(response => response.text())
        .then(data => {
            insertCommonContent(data, classes);
        })
        .catch(error => console.error('Error loading common content:', error));
}

function insertCommonContent(htmlContent, classes) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    classes.forEach(className => {
        const elements = doc.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            // Insert each element into the corresponding container on the page
            const container = document.getElementById(`${className}`);
            container.appendChild(element.cloneNode(true));
        });
    });
}

// Aca agregar en el input, todas las funciones de codigo repetido que quieras
fetchAndInsertCommonContent(["header"]);
