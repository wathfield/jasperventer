// function to fetch and loads external json files. Just type in the path and the function
export function fetchJson(jsonFileName, jsonFunction) {
    // Load external JSON file
    fetch(`json_files/${jsonFileName}.json`)
    .then(function (response) {
            return response.json();
    })
    .then(data => jsonFunction(data))
    .catch(error => console.error('Error loading JSON:', error));
    //createImageGallery(data)
}

const url = 'https://test.com';

//Modern syntax: ES modules