async function getRecipe(){
    const res=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=c")
    const data=await res.json()
    return data
}

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

