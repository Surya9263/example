async function getDataByCategory(){
    const urlParams=new URLSearchParams(window.location.search)
    const cat=urlParams.get("cat");
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    const data=await res.json()
    return data
}


let user=JSON.parse(localStorage.getItem("currentUser"))

function catData(){

    if(user){
        document.getElementById("user").innerText=user.name.toUpperCase()
        document.getElementById("signup").hidden=true
        document.getElementById("login").innerText="LOGOUT"
        document.getElementById("login").addEventListener("click",function(){
            localStorage.removeItem("currentUser")
        })
    }

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
                console.log(user);
                if(!user){
                    window.location.href="./login.html"
                }else{
                   window.location.href=`./recipe.html?id=${e.idMeal}`
                }
            })
            div.append(img,p,btn)
            document.getElementById("items-card").append(div)
        })
    })
}