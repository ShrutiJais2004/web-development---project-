const API = "http://localhost:3000";

// REGISTER
function register(){

  if(username.value === "" || password.value === ""){

    alert("Fill all fields");

    return;

  }

  fetch(API + "/register",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      username:username.value,
      password:password.value

    })

  })

  .then(res=>res.json())

  .then(data=>{

    if(data.success){

      alert("Registration Successful");

      window.location="login.html";

    }else{

      alert(data.message);

    }

  });

}

// LOGIN
function login(){

  fetch(API + "/login",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      username:username.value,
      password:password.value

    })

  })

  .then(res=>res.json())

  .then(data=>{

    if(data.success){

      localStorage.setItem(
        "user",
        username.value
      );

      window.location="index.html";

    }else{

      alert("Invalid Login");

    }

  });

}

// LOGOUT
function logout(){

  localStorage.removeItem("user");

  window.location="login.html";

}

// ADD TASK
function addTask(){

  if(task.value === ""){

    alert("Enter task");

    return;

  }

  fetch(API + "/tasks",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      task:task.value,
      completed:false

    })

  })

  .then(()=>{

    task.value="";

    loadTasks();

  });

}

// LOAD TASKS
function loadTasks(){

  fetch(API + "/tasks")

  .then(res=>res.json())

  .then(data=>{

    tasks.innerHTML="";

    data.forEach((t,index)=>{

      tasks.innerHTML += `

      <div class="task">

        <h3 class="${
          t.completed ? "completed" : ""
        }">

          ${t.task}

        </h3>

        <div class="actions">

          <button onclick="completeTask(${index})">
            Complete
          </button>

          <button onclick="deleteTask(${index})">
            Delete
          </button>

        </div>

      </div>

      `;

    });

  });

}

// COMPLETE TASK
function completeTask(index){

  fetch(API + "/tasks/" + index,{

    method:"PUT"

  })

  .then(()=>loadTasks());

}

// DELETE TASK
function deleteTask(index){

  fetch(API + "/tasks/" + index,{

    method:"DELETE"

  })

  .then(()=>loadTasks());

}

// SEARCH TASK
function searchTask(){

  let value =
    search.value.toLowerCase();

  let allTasks =
    document.querySelectorAll(".task");

  allTasks.forEach(task=>{

    let text =
      task.innerText.toLowerCase();

    if(text.includes(value)){

      task.style.display="block";

    }else{

      task.style.display="none";

    }

  });

}

// WELCOME USER
window.onload = function(){

  let user =
    localStorage.getItem("user");

  if(user){

    document.getElementById(
      "welcome"
    ).innerHTML =
      "Welcome, " + user;

  }

  loadTasks();

}