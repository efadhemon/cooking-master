// search button onclick function and get food items Api
function showFoodItems() {
    const searchFood = document.getElementById('search-food').value;
    if (searchFood == false) {
        alert('Add some food... !');
    }
    else {
        const foodApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFood}`
        fetch(foodApi)
            .then(res => res.json())
            .then(data => showFoods(data))
            .catch( () =>  showErrorText())
    }
}

document.getElementById('search-food').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
});

// invalid input error function
const showErrorText = () => {
    const showError = document.getElementById('show-error');
    showError.style.display= 'block';
    showError.innerHTML = '<h1>Please enter a valid food name !</h1>';
    document.getElementById('show-meal-item').style.display = 'none';
    document.getElementById('details-box').style.display = 'none';
}

// display food items function
const showFoods = foodItems => {
    const foodBox = document.getElementById('food-box');
    foodBox.innerHTML = '';
    const foodList = foodItems.meals;
    foodList.forEach(foodItem => {
        const foodName = foodItem.strMeal;
        const foodImage = foodItem.strMealThumb;
        const singleFoodBox = document.createElement('div');
        singleFoodBox.className = 'single-food-box';
        const foodInfo = `
            <img src="${foodImage}">
            <h1>${foodName}</h2>
        `;
        singleFoodBox.innerHTML = foodInfo;
        foodBox.appendChild(singleFoodBox);
        singleFoodBox.addEventListener('click', function(){
            const currentFoodName = this.innerText;
            ShowDetails(currentFoodName);
        })
    });
    document.getElementById('show-meal-item').style.display = 'block';
    document.getElementById('details-box').style.display = 'none';
    document.getElementById('show-error').style.display= 'none';
}


// food details Api call function
function ShowDetails(foodName) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => showDetailsInfo(data));
}

// display food details function
const showDetailsInfo = selectedFood => {
    const showFoodDetails = document.getElementById('show-food-details');
    const food = selectedFood.meals;
    food.forEach(foodItem => {
        const foodName = foodItem.strMeal;
        const foodImage = foodItem.strMealThumb;
        const foodInfo = `
            <div class = "food-img">
                <img src = "${foodImage}">
            </div>
            <div class = "foodInfo-details">
                <h1>${foodName}</h2>
                <h4>Ingredients</h4>
                <p>1. ${foodItem.strIngredient1}</p>
                <p>2. ${foodItem.strIngredient2}</p>
                <p>3. ${foodItem.strIngredient3}</p>
                <p>4. ${foodItem.strIngredient3}</p>
                <p>5. ${foodItem.strIngredient3}</p>
                <p>6. ${foodItem.strIngredient3}</p>
                <p>7. Etc... </p>
            </div>
        `;
        showFoodDetails.innerHTML = foodInfo;
    });
    document.getElementById('details-box').style.display = 'block';
}

document.addEventListener('contextmenu', function(programmerEmon){
    programmerEmon.preventDefault();
})
