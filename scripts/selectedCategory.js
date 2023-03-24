async function getDataByCategory(){
    const urlParams=new URLSearchParams(window.location.search)
    const cat=urlParams.get("cat");
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    const data=await res.json()
    return data
}

function catData(){
    getDataByCategory()
    .then(res=>{
        console.log(res.meals)
        res.meals.map((e)=>{
            let div=document.createElement("div")
            let img=document.createElement("img")
            img.src=e.strMealThumb
            let p=document.createElement("p")
            p.innerText=e.strMeal
            let btn=document.createElement("button")
            btn.innerText="See Recipe"
            btn.style.padding="10px 25px"
            btn.addEventListener("click",function(){
                window.location.href=`./recipe.html?id=${e.idMeal}`
            })
            div.append(img,p,btn)
            document.getElementById("items-card").append(div)
        })
    })
}