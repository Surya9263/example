async function getRecipeById() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  return data;
}

let users = JSON.parse(localStorage.getItem("users"));

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

function recipeData() {
  if (currentUser) {
    document.getElementById("user").innerText = `${currentUser.name.toUpperCase()}`;
    document.getElementById("signup").hidden = true;
    document.getElementById("login").innerText = "LOGOUT";
    document.getElementById("login").addEventListener("click", function () {
      localStorage.removeItem("currentUser");
    });
  }else{
    window.location.href="./login.html"
  }

  getRecipeById().then((res) => {
    if(!res.meals){
        window.location.href="./index.html"
    }
    console.log(res.meals);
    res.meals.map((e) => {
      let div = document.createElement("div");

      let h2 = document.createElement("h2");
      h2.innerText = e.strMeal;

      let img = document.createElement("img");
      img.src = e.strMealThumb;

      let h4 = document.createElement("h4");
      h4.innerText = `Category: ${e.strCategory}`;

      let btn = document.createElement("button");
      btn.innerText = "Add To Favourites";

      btn.addEventListener("click", function () {
        users.map((el) => {
          if (el.email == currentUser.email) {
            if (!el.favourites.includes(e.idMeal)) {
              el.favourites.push(e.idMeal);
              currentUser.favourites.push(e.idMeal)
              localStorage.setItem("currentUser",JSON.stringify(currentUser))
              localStorage.setItem("users", JSON.stringify(users));
              alert("Recipe added to favourites...");
            } else {
              alert("Recipe already present in favourites!");
            }
          }
        });
      });

      let origin = document.createElement("h4");
      origin.innerText = `Origin: ${e.strArea}`;

      let p2 = document.createElement("p");
      p2.innerText = `${e.strInstructions}`;

      let instr = document.createElement("h3");
      instr.innerText = "Instructions";

      let table = document.createElement("table");
      let thead = document.createElement("thead");
      let tr = document.createElement("tr");
      let th1 = document.createElement("th");
      th1.innerText = "Ingredients";
      let th2 = document.createElement("th");
      th2.innerText = "Quantity";
      tr.append(th1, th2);
      thead.append(tr);
      let tbody = document.createElement("tbody");
      for (let i = 1; i <= 20; i++) {
        let ing = `strIngredient${i}`;
        let qty = `strMeasure${i}`;
        if (e[ing]) {
          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          let td2 = document.createElement("td");
          td1.innerText = e[ing];
          td2.innerText = e[qty];
          tr.append(td1, td2);
          tbody.append(tr);
        }
      }
      table.append(thead);
      table.append(tbody);
      div.append(img, h2, h4, origin, btn, table, instr, p2);
      document.getElementById("recipe-card").append(div);
    });
  });
}

