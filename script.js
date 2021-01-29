let tdee, bmr, bmi, calorieTarget, targetID, option;
let calOption = false;
// document.getElementById("fitnessGoal").style.display = "none";
// document.getElementById("fitnessButtons").style.display = "none";
// document.getElementById("infoBox").style.display = "none";
// document.getElementById("mealNumber").style.display = "none";
// weight in kg, height in cm, age in years
tdeeCalc = () => {

    let weight = document.getElementById("weightBox").value;
    let height = document.getElementById("heightBox").value;
    let age = document.getElementById("ageBox").value;
    let activity = document.getElementById("activityBox").value;
    let gender = document.getElementById("genderBox").value;

    if (weight == "" || height == "" || age == "" || activity == "" || gender == ""){
        alert("Please complete all input fields!");
    } else {
    
        if (gender == "male"){

            bmr = (10 * weight) + (6.25 * height) - (5 - age) + 5;

        } else {

            bmr = (10 * weight) + (6.25 * height) - (5 - age) - 161;

        } 

        bmi = (weight/Math.pow((height/100),2)).toFixed(1);

        tdeeString = (bmr * activity).toFixed(0);
        tdee = parseInt(tdeeString);
        document.getElementById("tdeeResult").innerHTML = `<span class = "greenText">${tdee}</span> calories!`;
        document.getElementById("bmiResult").innerText = "You have a BMI of " + bmi;
        document.getElementById("bmiImg").src = "img/BMI_categories.png";
    
        if (bmi <= 18.5){
    
            document.getElementById("bmiText").innerText = "You are underweight!"
    
        }else if (bmi >18.5 && bmi <25){
    
            document.getElementById("bmiText").innerText = "Your weight is healthy!"
    
        }else {
    
            document.getElementById("bmiText").innerText = "You are overweight!"
    
        }
    
        document.getElementById("fitnessGoal").style.display = "block";
        document.getElementById("fitnessButtons").style.display = "block";
        console.log(option);
        if (option != undefined){
            requiredCalorie();
        }
        
        if (calOption == true){
            requiredCalorie();
            caloriePerMeal();

        }
            
    }     
}

requiredCalorie = () => {

    if(targetID == "loseW"){
        option = "lose";
        calorieTarget = tdee - 500;
    }else if(targetID == "gainW"){
        option = "gain";
        calorieTarget = tdee + 500;
    }else if(targetID == "sameW"){
        option = "same";
        calorieTarget = tdee;
    } else {
        console.log("Error!")
    }

    document.getElementById("infoPara").innerHTML = `Amount of calories you should eat per day: <br><br>  
    <span class = "greenText">${calorieTarget}</span>`;
    document.getElementById("infoBox").style.display="block";
    document.getElementById("mealNumber").style.display = "block";

    if (calOption == true){
        caloriePerMeal();
    }
}


caloriePerMeal = () => {
    calOption = true;
    mealNum = document.getElementById("mealBox").value;
    perMeal = (calorieTarget/mealNum).toFixed(0);
    document.getElementById("mealAnnounce").innerHTML = `Your meals should each contain around <span class = "orangeText">${perMeal}</span> calories.`;
}

buttonID = (e) => {
    targetID = e.target.id;
    console.log(targetID);
}

//Event Listeners
document.getElementById("calcTdee").addEventListener('click',tdeeCalc);
let buttonArray = document.querySelectorAll(".button2");
buttonArray.forEach((elem) => {
    elem.addEventListener('mousedown', buttonID)
    elem.addEventListener('click', requiredCalorie);
})
document.getElementById("mealBox").addEventListener('keyup', caloriePerMeal);



