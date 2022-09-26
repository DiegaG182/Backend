// Login
const loginForm = document.getElementById('loginForm');

  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    
    try{
    let response = await fetch('/api/sessions/login',{
      method: 'POST',
      body:  JSON.stringify({email:loginForm.email.value,password:loginForm.password.value }),
      headers:{
        "Content-Type":"application/json"
      }
    });
    
    let result = await response.json();
    console.log(result)
    }catch{err => console.log("error"+err)}
    
  } 
    


// Current Session
const currentButton = document.getElementById("current");
currentButton.addEventListener("click", () => {
  fetch("api/sessions/current")
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});

// Logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  fetch("api/sessions/logout")
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
});


