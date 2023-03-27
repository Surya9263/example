let currentUser=JSON.parse(localStorage.getItem("currentUser"))
let users=JSON.parse(localStorage.getItem("users"))

function loadFavourites(){

    if(currentUser){
        document.getElementById("user").innerText=`${currentUser.name.toUpperCase()}`
        document.getElementById("signup").hidden=true
        document.getElementById("login").innerText="LOGOUT"
        document.getElementById("login").addEventListener("click",function(){
            localStorage.removeItem("currentUser")
        })
    }else{
        window.location.href="./login.html"
    }

    currentUser.favourites.map((e)=>{
        getRecipeById(e).then(res=>{
            let div=document.createElement("div")
            let img=document.createElement("img")
            img.src=res.meals[0].strMealThumb
            let h3=document.createElement("h3")
            h3.innerText=res.meals[0].strMeal

            h3.addEventListener("click",function(){
                window.location.href=`./recipe.html?id=${e}`
            })

            let btn=document.createElement("button")
            btn.innerText="REMOVE"

            btn.addEventListener("click",function(){
                deleteRecipe(e)
            })

            div.append(img,h3,btn)
            document.getElementById("favourites").append(div)
        })
    })
}



async function getRecipeById(id) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data;
  }
  
  function deleteRecipe(id){
    let filtered=currentUser.favourites.filter((e)=>e!==id)
    currentUser.favourites=filtered
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    document.getElementById("favourites").innerHTML=null
    filtered.map((e)=>{
        getRecipeById(e).then(res=>{
            let div=document.createElement("div")
            let img=document.createElement("img")
            img.src=res.meals[0].strMealThumb
            let h3=document.createElement("h3")
            h3.innerText=res.meals[0].strMeal

            let btn=document.createElement("button")
            btn.innerText="REMOVE"

            btn.addEventListener("click",function(){
                deleteRecipe(e)
            })

            div.append(img,h3,btn)
            document.getElementById("favourites").append(div)
        })
    })
  }