// description: hide & show
function showDescription() {
    document.getElementById('invisible').style.display = "block";
    };
function hideDescription() {
    document.getElementById('invisible').style.display = "none";
    };

// IMAGE GALLERY general
function createImageGallery(jsonData) {


    const GridContainer = document.getElementById('discoportraits_container');
    for (const image of jsonData) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image_container');
        GridContainer.appendChild(imageContainer);

        const middle = document.createElement('ul');
        middle.classList.add('middle');
        imageContainer.appendChild(middle);

        const title = document.createElement('li');
        title.classList.add("listElement");
        const imageTitle = document.createElement('p');                
        imageTitle.id = `${image.edition}`;
        imageTitle.textContent = `${image.name}`;
        title.appendChild(imageTitle);
        middle.appendChild(title);

        
        for (const attribute of image.attributes) {
            const ListElement = document.createElement('li')
            ListElement.classList.add("listElement")
            middle.appendChild(ListElement);

                const traitElement = document.createElement('p');
                traitElement.id = `trait`;
                traitElement.textContent = `${attribute.trait_type}:`;
                ListElement.appendChild(traitElement);

                const valueElement = document.createElement('p');
                valueElement.id = `value`;
                valueElement.textContent = `${attribute.value}`;
                ListElement.appendChild(valueElement);

        }
        const imageElement = document.createElement('img');
            imageElement.src = `/images/photography/disco_portraits/image_${image.edition}.jpg`;
            imageElement.alt = `portrait`;
            imageElement.id = `${image.edition}`;
            //imageElement.classList.add('lazy-loading');
            imageElement.loading = 'lazy';
            imageElement.classList.add('imageOnly');
            imageContainer.appendChild(imageElement);

        GridContainer.appendChild(imageContainer);
    }
}

function showImage(image) {
    image.src = image.dataset.src;
    image.classList.remove(lazyClass) 
}


//document.addEventListener('DOMContentLoaded', () => {
//    // Load external JSON file
//    fetch(`json_files/discoportraits/dp_json_meta/_metadata.json`)
//    .then(function (response) {
//            return response.json();
//    })
//    .then(data => createImageGallery(data))
//    .catch(error => console.error('Error loading JSON:', error));
//
//     // lazy-loading
//     const lazyClass = 'lazy-loading';
//     const lazyImages = document.querySelectorAll(`.${lazyClass}`);
// 
//     const lazyObserver = new IntersectionObserver((elements) => {
//         elements.forEach((element) => {
//             if (element.isIntersecting) {
//                 const image = element.target;
//                 showImage(image);
//                 lazyObserver.unobserve(image)
//             }
//         })
//     })
// 
//     lazyImages.forEach(image => {
//         lazyObserver.observe(image);
//     })
//  
//  });



document.addEventListener('DOMContentLoaded', () => {
    var responseClone; // 1
    // Load external JSON file
    fetch(`json_files/discoportraits/dp_json_meta/_metadata.json`)
    .then(function (response) {
        responseClone = response.clone(); // 2
        return response.json();
    })
    .then(data => createImageGallery(data),
    function (rejectionReason) { // 3
        console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
        responseClone.text() // 5
        .then(function (bodyText) {
            console.log('Received the following instead of valid JSON:', bodyText); // 6
        });
    })
    .catch(error => console.error('Error loading JSON:', error));


     // lazy-loading
     const lazyClass = 'lazy-loading';
     const lazyImages = document.querySelectorAll(`.${lazyClass}`);
 
     const lazyObserver = new IntersectionObserver((elements) => {
         elements.forEach((element) => {
             if (element.isIntersecting) {
                 const image = element.target;
                 showImage(image);
                 lazyObserver.unobserve(image)
             }
         })
     })
 
     lazyImages.forEach(image => {
         lazyObserver.observe(image);
     })
  
  });

