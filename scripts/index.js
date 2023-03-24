async function getCategories(){
    const res=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data=await res.json()
    return data
}

function showCategories(){
    getCategories()
    .then(res=>{
        console.log(res.categories);
        res.categories.map((e)=>{
            let div=document.createElement("div")
            div.setAttribute("class","catCard")
            let h3=document.createElement("h3")
            h3.innerText=e.strCategory
            let img=document.createElement("img")
            img.src=e.strCategoryThumb
            let p=document.createElement("p")
            p.innerText=e.strCategoryDescription
            let btn=document.createElement("button")
            btn.innerText="See More >"
            btn.style.padding="10px 25px"
            btn.addEventListener("click",function(){
                window.location.href=`./selectedCategory.html?cat=${e.strCategory}`
            })

            div.append(h3,img,p,btn)
            document.getElementById("category-card").append(div)
        })
    })
}


async function getMealByQuery(){
    let query=document.getElementById("search").value
    console.log(query);
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const data=await res.json()
    console.log(data.meals);
    
    if(!query){
        document.getElementById("searched-items").innerHTML=null
        return
    }

    document.getElementById("searched-items").innerHTML=null

    data.meals.map((e)=>{
        
        let div=document.createElement("div")
        let img=document.createElement("img")
        img.src=e.strMealThumb
        let h3=document.createElement("h3")
        h3.innerText=e.strMeal
        h3.addEventListener("click",function(){
            window.location.href=`./recipe.html?id=${e.idMeal}`
        })
        div.append(img,h3)
        document.getElementById("searched-items").append(div)
    })
}


let id;

function debounce(func,delay){
    if(id){
        clearTimeout(id)
    }
    id=setTimeout(()=>{
        func()
    },delay)
}