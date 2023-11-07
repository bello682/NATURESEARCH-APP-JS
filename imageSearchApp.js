const accessKeyApi = "elFYcHogv_tQEdOMQhageEuo8cCoBCnK52IYorvOEAY";

const formEl = document.querySelector("form");
const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const searchResult = document.getElementById("search_results");
const showMoreButton = document.getElementById("show_more_button");

let inputData = "";
let page = 1;

async function searchImage() {
	inputData = searchInput.value;
	let url = `https://api.unsplash.com./search/photos?page=${page}&query=${inputData}&client_id=${accessKeyApi}`;

	const response = await fetch(url);
	const data = await response.json();
	// console.log(data);


    if (page === 1) {
        searchInput.value = "";

            // this step i use to remove the original html element(clear previous one) i wrote my sef and replace with the one from the api by setting the searchResult to empty.

        searchResult.innerHTML = "";
    }

    //  Note we are creating a variable name of results, but note that there is a name of results which has a properties of Array store in it from the API url which we have saved inside the variable name of data. so therefor that is where our result is coming from.
    const results = data.results;

    
    // 1. Note wwe re creating new div Element inside the html using javascript.
        // 1a. the result is from the results Api url Array.

    results.map((result) => {
            // created a div and gave it a classname and store it inside imageWrapper
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add( "search_result"); 
            // now creating an img tag with it src and alt inside the div
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
            // now creating an link(a) tag with it href inside the div
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

            // After creating all the element now we want to append() them into our imageWrapper div by saying.....
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

            //  now we want to append the imageWrapper div inside the searhResults in our html.
        searchResult.appendChild(imageWrapper);
        
    }); 

   page++;
   console.log(page)

    if (page > 1) {
        showMoreButton.style.display = "block";

    }

}

formEl.addEventListener("submit", formElSUbmet);

function formElSUbmet(e) {
	e.preventDefault();
    page = 1;
	searchImage();
}

 showMoreButton.addEventListener('click', () => {
	searchImage();
    
});
