// function to fetch and loads external json files. Just type in the path and the function
function fetchJson(jsonFileName, jsonFunction) {
    // Load external JSON file
    fetch(`json_files/${jsonFileName}.json`)
    .then(function (response) {
            return response.json();
    })
    .then(data => jsonFunction(data))
    .catch(error => console.error('Error loading JSON:', error));
    //createImageGallery(data)
}


//// lazy-loading
//const lazyClass = 'lazy-loading';
//const lazyImages = document.querySelectorAll(`.${lazyClass}`);
//
//const lazyObserver = new IntersectionObserver((elements) => {
//    elements.forEach((element) => {
//        if (element.isIntersecting) {
//            const image = element.target;
//            showImage(image);
//            lazyObserver.unobserve(image)
//        }
//    })
//})
//
//lazyImages.forEach(image => {
//    lazyObserver.observe(image);
//})
//
//function showImage(image) {
//    image.src = image.dataset.src;
//    image.classList.remove(lazyClass) 
//}

// IMAGE GALLERY PAINTING
function createImageGallery(jsonData) {
    const galleryContainer = document.getElementById('image-gallery');
    for (const item of jsonData.rows) {
        const rowDiv = document.createElement('div');
        rowDiv.id = `Vcontainer-${item?.row}`;
        rowDiv.classList.add('Vcontainer');
        galleryContainer.appendChild(rowDiv);

        const HeadingContainer = document.createElement('div');
        HeadingContainer.classList.add('SerieHeadingContainer');
        rowDiv.appendChild(HeadingContainer);

        const serieNameHeading = document.createElement('h3');
        serieNameHeading.textContent = `${item?.serie_name}`;
        serieNameHeading.id = `${item?.serie_alias}`;
        HeadingContainer.appendChild(serieNameHeading);

        const serieNameHDescription = document.createElement('p');
        serieNameHDescription.id = `description`;
        serieNameHDescription.textContent = `${item?.serie_description}`;
        HeadingContainer.appendChild(serieNameHDescription);

        for (const image of item.images) {
            // IMAGE AND TEXT CONTAINER
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('imageTextContainer');
            rowDiv.appendChild(imageDiv);

            // IMAGE AND TEXT CONTAINER (INNER WITCH NO HEIGHT TO ALIGN IMAGE AND TEXT)
            const imageDivInner = document.createElement('div');
            imageDivInner.classList.add('imageTextContainerInner');
            imageDiv.appendChild(imageDivInner);

            // ADD IMAGE
            const imagesOnlyContainer = document.createElement('div');
            imagesOnlyContainer.id = `imageOnlyContainer`;
            imageDivInner.appendChild(imagesOnlyContainer);

            const imageElement = document.createElement('img');
            imageElement.src = `${image?.image}/image${image?.id}.jpg`;
            imageElement.alt = `${image?.Image_title}`;
            imageElement.id = `${image?.id}`;
            imageElement.loading = 'lazy';
            imageElement.classList.add('imageOnly')
            imagesOnlyContainer.appendChild(imageElement);
            //imageElement.setAttribute("onclick", "enlargeImg()");

            // ADD TEXT: Title, Medium, Size, Availability
            const textOnlyContainer = document.createElement('div');
            textOnlyContainer.id = `textOnlyContainer`;
            imageDivInner.appendChild(textOnlyContainer);

            const imageTitleParagraph = document.createElement('p');
            imageTitleParagraph.textContent = `${image?.Image_title}`;
            textOnlyContainer.appendChild(imageTitleParagraph);

            const mediumParagraph = document.createElement('p');
            mediumParagraph.textContent = `${image?.attributes.find(attributes => attributes?.trait_type === "medium").value}`;
            textOnlyContainer.appendChild(mediumParagraph);

            const sizeParagraph = document.createElement('p');
            sizeParagraph.textContent = `${image?.attributes.find(attributes => attributes?.trait_type === "size").value}`;
            textOnlyContainer.appendChild(sizeParagraph);

            const availabilityParagraph = document.createElement('p');
            availabilityParagraph.textContent = `${image?.attributes.find(attributes => attributes?.trait_type === "availability").value}`;
            textOnlyContainer.appendChild(availabilityParagraph);
        }
    }
}

//change font size on scroll
//window.addEventListener('scroll',function(){
//    document.querySelector('h3').style.fontSize=((document.body.scrollTop*.05)+14)+'px';
//  });

// MAKE IMAGE BIGGER ON CLICK
img = document.getElementById("images");
img = document.querySelector("#images");

// Function to increase image size
function enlargeImg() {
    // Get the img object using its Id
    img = document.getElementById("images");
    // Set image size to 1.5 times original
    img.style.transform = "scale(1.5)";
    // Animation effect
    img.style.transition = "transform 0.25s ease";
}
// Function to reset image size
function resetImg() {
    // Set image size to original
    img.style.transform = "scale(1)";
    img.style.transition = "transform 0.25s ease";
}

// change width of Vcontainer (row) on click
function toggleColumn(column) {
    //const handleClick = (e) => { 
    //    if(condition) { 
    //      //Perform the tasks 
    //    } else return; 
    //  }



    const allColumns = document.querySelectorAll('.Vcontainer');

    if (column.style.flexBasis === '80vw') {
        // Column is expanded, collapse it
        //column.style.flex = '0';
        column.style.flexBasis = '20vw';
    } else {
        // Collapse all columns
        allColumns.forEach(col => col.style.flexBasis = '20vw'); // allColumns.forEach(col => col.style.flex = '0');

        // Expand the clicked column
        //column.style.flex = '1';
        column.style.flexBasis = '80vw';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Load external JSON file to generate image gallery
    fetchJson("paintings_array", createImageGallery);  

    // Make each row container expandable for better preview
    const imageGallery = document.getElementById("image-gallery");
    imageGallery.addEventListener('click', function (event) {
        //console.log(`You clicked on item: ${event.target.innerHTML}`);
        // Check if the clicked element has the class "Vcontainer"
        //if (event.target.classList.contains("Vcontainer")) {

        // Access the individual element that got clicked
        const clickedVcontainer = event.target;

        // look for the the closest ancestor which is a div and has a parent ".image-grid-gallery"
        const currentContainer = clickedVcontainer.closest(".image-grid-gallery > div");
        
        //const childImages = document.querySelectorAll(`#${currentContainerName} img`);
        //const elements = document.querySelectorAll('#SubMenu > .nav-list *');

        //childImages.forEach((element) => {
        //    //element.classList.remove('noHoverBlur');
        //    //element.classList.toggle('imageOnly');
        //    element.classList.toggle('changeWidth');
        //});

        // Change the width of the clicked Vcontainer by adding ".expand" class in css
        //currentContainer.classList.toggle('expand');


        toggleColumn(currentContainer);
        console.log(
            `%c Toggled Row: ${currentContainer.id}`,
            `font-size: 18vw; color: red;`);

        // Change the width of the clicked Vcontainer (example: increase by 50px)
        //clickedVcontainer.style.width = (parseInt(clickedVcontainer.style.width) + 50) + 'px';
    //}
    });
});