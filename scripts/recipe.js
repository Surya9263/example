async function getRecipeById(){
    const urlParams=new URLSearchParams(window.location.search)
    const id=urlParams.get("id")
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data=await res.json()
    return data
}


function recipeData(){
    getRecipeById()
    .then(res=>{
        console.log(res.meals);
        res.meals.map((e)=>{
            let div=document.createElement("div")
            let h2=document.createElement("h2")
            h2.innerText=e.strMeal
            let img=document.createElement("img")
            img.src=e.strMealThumb
            let h4=document.createElement("h4")
            h4.innerText=`Category: ${e.strCategory}`
            let p2=document.createElement("p")
            let p3=document.createElement("p")
            p3.innerText=`Instructions: ${e.strInstructions}`
            div.append(h2,img,h4)
            document.getElementById("recipe-card").append(div)
        })
    })
}