document.querySelector("form").addEventListener("submit",handleLogin)

let users=JSON.parse(localStorage.getItem("users")) || []

function handleLogin(event){
    event.preventDefault()
    let email=document.getElementById("email").value;
    let password=document.getElementById("pass").value;
    if(!isUser(email)){
        alert("User does not exists...")
    }else if(!isValid(email,password)){
        alert("Incorrect email or password...")
    }else{
        let filtered=users.filter((e)=>e.email===email)
        localStorage.setItem("currentUser",JSON.stringify(filtered[0]))
        window.location.href="./index.html"
    }
}


function isUser(email){
    let filtered=users.filter((e)=>e.email===email)
    return filtered.length>0
}


function isValid(email,pass){
    let filtered=users.filter((e)=>e.email===email)
    return filtered[0].email===email && filtered[0].password===pass
}