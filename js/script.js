const loadCardsData = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const res = await fetch(url);
  const data = await res.json();
  storeDataInArray(data.meals);
  showData();
  console.log(data.meals);
};

const cardsContainer = document.getElementById("cards-container");
const searchName = () => {
  const inputField = document.getElementById("input-field").value;
  loadCardsData(inputField);
};

let counter = 0;
const storData = [];
console.log(storData);
const storeDataInArray = (data) => {
  data.forEach((meal) => {
    storData.push(meal);
  });
};
const showData = () => {
  const cardsContainer = document.getElementById("cards-container");
  storData.forEach((meal) => {
    if (counter !== 6) {
      innerHtmlSet();
      counter += 1;
    } else {
      return false;
    }
  });
};

const showAll = document.getElementById("show-all");
showAll.addEventListener("click", function () {
  storData.forEach((d) => {
    if (counter !== storData.length) {
      innerHtmlSet();
      counter += 1;
    } else {
      showAll.setAttribute("disable", "");
      showAll.classList.add("bg-slate-400");
      showAll.classList.add("text-white");
      showAll.classList.add("cursor-default");
      return false;
    }
  });
});

// inner HTML set
const innerHtmlSet = () => {
  return (cardsContainer.innerHTML += `
    <!-- single card start -->
          <div class="shadow-xl rounded-md">
            <div class="grid grid-cols-12">
              <img src="${storData[counter].strMealThumb}" alt="" class="col-span-4 h-[300px] object-center object-cover rounded-md" />
              <div class="col-span-8 ml-6 flex items-center">
                <div>
                  <h3 class="text-[#403F3F] text-2xl font-bold">${storData[counter].strMeal}</h3>
                  <p class="text-lg text-[#706F6F] mt-4 mb-6">There are many variations of passages of available, but the majority have suffered</p>
                  <label  for="my-modal-3"  class="text-lg text-[#FFC107] underline cursor-pointer" onclick="loadModalData(${storData[counter].idMeal})">View Details</label>
              </div>
            </div>
          </div>
          <!-- single card end -->
    `);
};

const loadModalData = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const res = await fetch(url);
  const data = await res.json();
  displayModal(data.meals);
};

const displayModal = (data) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
   <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-2xl font-semibold text-gray-900">${data[0].strMeal}</h3>
        </div>
        <div>
          <img src="${data[0].strMealThumb}" alt="" class="w-[300px] h-[200px] object-cover rounded-md object-center my-0 mx-auto" />
          <p class="text-lg font-normal text-[#403F3F]">Category: <span class="text-[#706F6F]">${data[0].strCategory}</span></p>
          <p class="text-lg font-normal text-[#403F3F]">Area: <span class="text-[#706F6F]">${data[0].strArea}</span></p>
          <p class="text-xl font-normal text-[#403F3F]">Instructions: <span class="text-[#706F6F]"> AThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </span></p>
          <p class="text-xl font-normal text-[#403F3F]">Youtube: <a href="${data[0].strYoutube}" class="text-[#706F6F]">${data[0].strYoutube}</a></p> 
        </div>
      </div>
    `;
  console.log(data);
};

// modal inner HTML
const modalInnerHtml = () => {
  return;
};
