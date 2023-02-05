
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  const urlParams = new URLSearchParams(search);
  let cityName = urlParams.get("city");

  return cityName;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let city_name = city;
  const res = await fetch(config.backendEndpoint + `/adventures?city=${city_name}`);
  const data = await res.json();
  // console.log(data);
  return data;
 
  } catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  adventures.forEach((key) => {
    var elem = document.createElement("div");
    elem.className = "col-6 col-lg-3 mb-4";
    elem.innerHTML = `
                      <a href="detail/?adventure=${key.id}" id=${key.id}>
                      <div class="category-banner">${key.category}</div>
                      <div class = "activity-card">
                      <img class= "img-responsive"
                      src=${key.image}
                      />
                      <div class="activity-card-text text-md-center w-100 mt-3">
                      <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                        <h5 class="text-left">${key.name}</h5>
                        <p>₹${key.costPerHead}</p>
                      </div>
                        <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                        <h5 class="text-left">Duration</h5>
                        <p>${key.duration} Hours</p>
                      </div>
                      </div>
                      </div>
                      </a>
    
    
    
    `;
    document.getElementById("data").appendChild(elem);

  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];

  list.map((key) => {
    if (key.duration > low && key.duration <= high) {
      filteredList.push(key);
    }
  });

  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  // console.log(list);
  // console.log(categoryList);
  
  let filteredList = [];
  categoryList.map((category) => {
    list.map((key) => {
      if (key.category === category) {
        filteredList.push(key);
      }
    });
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredList = [];

  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  // let loc=JSON.stringify(filters);
  // localStorage.setItem("filter" , loc);
  localStorage.setItem("filters", JSON.stringify(filters));


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  return JSON.parse(localStorage.getItem("filters")); 


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills

  document.getElementById("duration-select").value = filters.duration;

  //Iterates over category filters and inserts category pills into DOM
  filters["category"].map((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                 <div>${key}</div>
                `;

    document.getElementById("category-list").appendChild(ele);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
