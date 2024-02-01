// NAVIGATION
const jsonDataNav = {
    "nav_sections": {
        "work": [
            {
                "nav_section": "1",
                "nav_title": "painting",
                "nav_link": "painting.html",
                "nav_subs": [
                    { "id": "1", "sub_title": "Lucky Boy", "sub_link": "/painting.html#luckyboy" },
                    { "id": "2", "sub_title": "City Crash", "sub_link": "/painting.html#citycrash" },
                    { "id": "3", "sub_title": "jes! @IRRE SPACE", "sub_link": "/painting.html#jes" },
                    { "id": "4", "sub_title": "Kitchen Session", "sub_link": "/painting.html#kitchensession" }
                ]
            },
            {
                "nav_section": "2",
                "nav_title": "photography",
                "nav_link": "comingsoon.html",
                "nav_subs": [
                    {"id": "1", "sub_title": "All images", "sub_link": "/comingsoon.html"}
                ]
            },
            {
                "nav_section": "3",
                "nav_title": "graphic",
                "nav_link": "comingsoon.html",
                "nav_subs": [
                    {"id": "1", "sub_title": "All images", "sub_link": "/comingsoon.html"}
                ]
            }
            // More work sections...
        ],
        "projects": [
            {
                "nav_section": "1",
                "nav_title": "disco portraits",
                "nav_link":"discoportraits.html",
                "nav_subs": []
            },
            {
                "nav_section": "2",
                "nav_title": "100PVZM",
                "nav_link": "https://www.irre-bauhaus.de/",
                "nav_subs": []
            },
            // More project sections...
        ],
        "biography": [
            {
                "nav_section": "1",
                "nav_title": "exhibitions",
                "nav_link":"biography.html#exhibitions",
                "nav_subs": []
            },
            {
                "nav_section": "2",
                "nav_title": "education",
                "nav_link": "biography.html#education",
                "nav_subs": []
            }
            // More project sections...
        ]
    }
};

//obj = JSON.parse(jsonDataNav);
//shareInfoLen = Object.keys(obj.shareInfo[0]).length;

function blurItem(maincategorie) {
    // Remove class from all children elements of .container div
    const elements = document.querySelectorAll('#MainMenu > .nav-list *');
    elements.forEach((element) => {
      element.classList.remove('noHoverBlur');
    });
    document.getElementById(`${maincategorie}`).classList.add('noHoverBlur');
}

function blurSubItem(subcategorie) {
    // Remove class from all children elements of .container div
    const elements = document.querySelectorAll('#SubMenu > .nav-list *');
    elements.forEach((element) => {
      element.classList.remove('noHoverBlur');
    });
    document.getElementById(`${subcategorie}`).classList.add('noHoverBlur');
}

function blurSubSubItem(subsubcategorie){
    // Remove class from all children elements of .container div
    const elements = document.querySelectorAll('#SubSubMenu > .nav-list *');
    elements.forEach((element) => {
      element.classList.remove('noHoverBlur');
    });
    document.getElementById(`${subsubcategorie}`).classList.add('noHoverBlur');
}

// Executed when hovering over main nav titles
function displaySubMenu(categoryId) {
    //highlight the category title
    const mainContent = document.getElementById("main");
    if (mainContent){
        mainContent.style.filter = "grayscale(100%) blur(3px)";
    }
    
    // Keep only last hovered element unblurred
    blurItem(`${categoryId}`);

    // Clear previous content
    //const subMenuElement = document.getElementById(`${categoryId}SubMenu`);
    const subMenuElement = document.getElementById(`SubMenu`);
    subMenuElement.innerHTML = "";

    const subsubMenuElement = document.getElementById(`SubSubMenu`);
    subsubMenuElement.innerHTML = "";

    // ADD LIST OF SUB-TITLES
    const navSubList = document.createElement('ul');
    navSubList.id = `${categoryId}`;
    navSubList.classList.add('nav-list');
    subMenuElement.appendChild(navSubList);


    if (jsonDataNav.nav_sections.hasOwnProperty(categoryId)) {
        jsonDataNav.nav_sections[categoryId].forEach(section => {
            
            const navSubListElement = document.createElement('li');
            //navSubListElement.style.filter = "grayscale(100%) blur(1px)";
            navSubListElement.id = section.nav_title;
            navSubListElement.classList.add('inactive');

            // new
            navSubListElement.addEventListener("mouseenter", () => displaySecondSubMenu(`${categoryId}`, `${section.nav_title}`));

            const navTitle = document.createElement("a");
            navTitle.href = section.nav_link;

            var sumNavSubs = section.nav_subs.length;
            navSubListElement.appendChild(navTitle);
            navSubList.appendChild(navSubListElement);
            // if sub nav has zero content then don't add the sum.
            if(sumNavSubs != 0){
                navTitle.textContent = `${section.nav_title} ${sumNavSubs}`;
                subMenuElement.appendChild(navTitle);
            }
            else {
                navTitle.textContent = section.nav_title;
                subMenuElement.appendChild(navTitle);     
            }navSubListElement.appendChild(navTitle);         
        });
    }
}

// Executed when hovering over sub nav titles
function displaySecondSubMenu(mainCategory, categoryId) {
    //highlight the category title
    const mainContent = document.getElementById("main");
    if (mainContent){
        mainContent.style.filter = "grayscale(100%) blur(3px)";
    }

    blurSubItem(`${categoryId}`);
    //blurSubCategory(categoryId);
    //document.getElementById(`${categoryId}`).style.filter = "grayscale(0%) blur(0px)";

    // Clear previous content
    const subMenuElement = document.getElementById(`SubSubMenu`);
    subMenuElement.innerHTML = "";

    // ADD LIST OF SUB-TITLES
    const navSubList = document.createElement('ul');
    navSubList.id = `${categoryId}`;
    navSubList.classList.add('nav-list');
    subMenuElement.appendChild(navSubList);


    if (jsonDataNav.nav_sections.hasOwnProperty(mainCategory)) {
        const selectedSection = jsonDataNav.nav_sections[mainCategory].find(section => section.nav_title === `${categoryId}`);

        if (selectedSection) {
            selectedSection.nav_subs.forEach(sub => {
                // Access individual properties of each nav_sub
                const navSubListElement = document.createElement('li');
                navSubListElement.classList.add('inactive');
                navSubListElement.id = sub.sub_title;

                navSubListElement.addEventListener("mouseenter", () => displayThirdSubMenu(`${sub.sub_title}`));

                const navTitle = document.createElement("a");
                navTitle.href = sub.sub_link;
                navTitle.textContent = sub.sub_title;
                navSubListElement.appendChild(navTitle);  
                navSubList.appendChild(navSubListElement);
                subMenuElement.appendChild(navSubList);    
            });
        }
    }
};

// Executed when hovering over subsub nav titles
function displayThirdSubMenu(categoryId){
    //highlight the category title
    const mainContent = document.getElementById("main");
    if (mainContent){
        mainContent.style.filter = "grayscale(100%) blur(3px)";
    }
    blurSubSubItem(`${categoryId}`);
};

// unblurres main page on hover
function unBlur() {
    const bio = document.getElementById("main");
    if (bio){
        bio.style.filter = "grayscale(0%) blur(0px)";
    }
};

// STICKY NAVBAR
// home button and header sticks on scroll

window.onscroll = function() {stickyHeader()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

// FOOTER
function loadFooter(){
    const footerContainer = document.getElementById('footer');

    const li = document.createElement('li');
    li.id = 'footer_li';
    footerContainer.appendChild(li);

    const a_section = document.createElement('a');
    a_section.href = '/contact.html';
    a_section.classList.add('footer_text');
    li.appendChild(a_section);

    const footerTitle = document.createElement('h1');
    footerTitle.textContent = `\u00A9 Jasper Venter`;
    a_section.appendChild(footerTitle);
    footerContainer.appendChild(li);
};

//get current container
function toggleNavCss() {
    document.getElementById("nav_btn_img").classList.toggle('btn_rotate');
    document.getElementById("NavContainer0").classList.toggle('nav_translateY');
    document.getElementById("NavContainer1").classList.toggle('nav_translateY');
    document.getElementById("NavContainer2").classList.toggle('nav_translateY');
    document.getElementById("myHeader").classList.toggle('header_fix');
    return;
};

  document.addEventListener('DOMContentLoaded', () => {
    // LOAD FOOTER
    loadFooter();

    // NAV HOVER
    document.getElementById("home").addEventListener("mouseenter", () => displaySubMenu("home"));
    document.getElementById("work").addEventListener("mouseenter", () => displaySubMenu("work"));
    document.getElementById("projects").addEventListener("mouseenter", () => displaySubMenu("projects"));
    document.getElementById("biography").addEventListener("mouseenter", () => displaySubMenu("biography"));
    document.getElementById("contact").addEventListener("mouseenter", () => displaySubMenu("contact"));

    // HIDE NAV ON CLICK
    document.getElementById("nav_btn_img").addEventListener("click",() => toggleNavCss());
    // UNBLUR MAIN CONTENT
    document.getElementById("myHeader").addEventListener("mouseleave", () => unBlur());
  });