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

            let origin=document.createElement("h4")
            origin.innerText=`Origin: ${e.strArea}`

            let p2=document.createElement("p")
            p2.innerText=`Instructions: ${e.strInstructions}`

            let ingr=document.createElement("h3")
            ingr.innerText="Ingredients"

            let table=document.createElement("table")
            let thead=document.createElement("thead")
            let tr=document.createElement("tr")
            let th1=document.createElement("th")
            th1.innerText="Ingredients"
            let th2=document.createElement("th")
            th2.innerText="Quantity"
            tr.append(th1,th2)
            thead.append(tr)
            let tbody=document.createElement("tbody")
            for(let i=1;i<=20;i++){
                let ing=`strIngredient${i}`
                let qty=`strMeasure${i}`
                if(e[ing]){
                    let tr=document.createElement("tr")
                    let td1=document.createElement("td")
                    let td2=document.createElement("td")
                    console.log(e[ing]);
                    td1.innerText=e[ing]
                    td2.innerText=e[qty]
                    tr.append(td1,td2)
                    tbody.append(tr)
                }
            }
            table.append(thead)
            table.append(tbody)
            div.append(img,h2,h4,origin,p2,table)
            document.getElementById("recipe-card").append(div)
        })
    })
}