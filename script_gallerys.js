function createImageGallery(jsonData) {
    const galleryContainer = document.getElementById('image-gallery');
    //const galleryContainer = document.getElementsByClassName('.horizontal Hcontainer');

    for (const item of jsonData.rows) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('Vcontainer');

        const serieNameHeading = document.createElement('h3');
        serieNameHeading.textContent = `Serie Name: ${item.serie_name}`;
        rowDiv.appendChild(serieNameHeading);

        const serieNameHDescription = document.createElement('p');
        serieNameHDescription.id = `description`;
        serieNameHDescription.textContent = `Description: ${item.serie_description}`;
        rowDiv.appendChild(serieNameHDescription);

        for (const image of item.images) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('imageTextContainer');
            

            //const availabilityParagraph = document.createElement('p');
            //availabilityParagraph.textContent = `Availability: ${item.attributes.find(attributes => attributes.trait_type === "availability").value}`;
            //imageDiv.appendChild(availabilityParagraph);

            //const mediumParagraph = document.createElement('p');
            //mediumParagraph.textContent = `Medium: ${item.attributes.find(attributes => attributes.trait_type === "medium").value}`;
            //imageDiv.appendChild(mediumParagraph);

            //const sizeParagraph = document.createElement('p');
            //sizeParagraph.textContent = `Size: ${item.attributes.find(attributes => attributes.trait_type === "size").value}`;
            //imageDiv.appendChild(sizeParagraph);

            // div START (around ever images)
            const imagesOnlyContainer = document.createElement('div');
            imagesOnlyContainer.id = `imageOnlyContainer`;
            imageDiv.appendChild(imagesOnlyContainer);

            const imageElement = document.createElement('img');
            imageElement.src = image.image;
            imageElement.alt = `Image ID: ${image.id}`;
            imageElement.id = `images`;
            imageDiv.appendChild(imageElement);

            const imageIdParagraph = document.createElement('p');
            imageIdParagraph.textContent = `Image ID: ${image.id}`;
            imageDiv.appendChild(imageIdParagraph);

            const imageTitleParagraph = document.createElement('p');
            imageTitleParagraph.textContent = `Image Title: ${image.Image_title}`;
            imageDiv.appendChild(imageTitleParagraph);

            // div END (around everi images)
            imagesOnlyContainer.appendChild(imageElement);

            // closes
            rowDiv.appendChild(imageDiv);
        }
        // closes did for everi Vcontainer
        galleryContainer.appendChild(rowDiv);
    }
}

// Load external JSON file
fetch('paintings_json/paintings_array.json')
.then(function (response) {
        return response.json();
})
.then(data => createImageGallery(data))
.catch(error => console.error('Error loading JSON:', error));
//createImageGallery(data)


//change font size on scroll
window.addEventListener('scroll',function(){
    document.querySelector('h3').style.fontSize=((document.body.scrollTop*.05)+14)+'px';
  });