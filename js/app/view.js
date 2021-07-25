var main = document.getElementById("main");
function displayHTML() {
  main.innerHTML = `<section>
  <div class="input-group mb-3" id="userDiv">
    <input
    id="userName"
      type="text"
      class="form-control"
      placeholder="Enter Your userName"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <div class="input-group-append">
      <button class="input-group-text" id="userNameBtn" id="basic-addon2">Enter Your userName</button>
    </div>
  </div>
</section>
`;
}
//
function displayBlock() {
  main.innerHTML = `<div class="calculator">
  <div class="numbers">
   <div class="number"  id="1">1<br> <span id="leters">*</span> </div>
    <div class="number"  id="2">2<br> <span id="leters">ABC</span></div>
    <div class="number"  id="3">3<br> <span id="leters">DEF</span></div>
  </div> 
  <div class="numbers"> 
    <div class="number"  id="4">4<br> <span id="leters">GHI</span></div>
    <div class="number" id="5">5<br> <span id="leters">JKL</span></div>
    <div class="number"  id="6">6<br> <span id="leters">MNO</span></div>
  </div>
  <div class="numbers">
    <div class="number" id="7">7<br> <span id="leters">PQRS</span></div>
    <div class="number"  id="8">8<br> <span id="leters">TYV</span></div>
    <div class="number" id="9">9<br> <span id="leters">WXYZ</span></div>
  </div>

  <div class="numbers">
    <div class="number" id="0">0</div>
  </div>
</div>
`;
}

var toAppend;
function colorNumber(btn) {
  // $("#" + e).css("background-color", "yellow");
  $("#" + btn).css("background-color", "rgb(124, 218, 95)");
  // btn.style.background = "rgb(124, 218, 95)";
}
async function success(list, res) {
  var newlist = list.data;

  toAppend = `<h6>Home | About | Login</h6>
  <section id="a">
<form >
   <div id="list">
  <h1>Add an Employee</h1>
  <label for="fName"></label>
  <input class="input" type="text" id="fName"  placeholder="Fisrt Name"required>
  <label for="lName" ></label>
  <input class="input" type="text" id="lName" required placeholder="Lest Name">
  <label for="userName"></label>
  <input class="input" type="text" id="userName" required placeholder="userName">
  <label for="pass"></label>
  <input class="input" type="password" required placeholder="password" id="password" name="password" autocomplete="on">
  <label for="email"></label>
  <input class="input" type="email" id="email" required placeholder="Email">
  <select class="input" required name="" id="role">
    <option class="role" value="Manager">Manager</option>
    <option class="role" value="Employee">Employee</option>

  </select>
  <div  class="submit" id="submit">Add Employee</div></div>
</form>

<div id="border">
<h1>Current Employee</h1>
<table class="tab">
  <tbody id="tbody">
      <tr>
         <th class="th">First Name</th>
         <th class="th">Last Name</th>
         <th class="th">User-Name</th>
         <th class="th">Role</th>
         <th class="th">Email</th>
         <th class="th">Pin</th>
         <th class="th">Action</th>
      </tr>
</div>
    `;

  newlist.forEach(createCards);
  main.innerHTML = toAppend;
}

function createCards(listNew, i) {
  toAppend += `
    <tr id="tr_Id">
      <td class="user">${listNew.fName}</td>
      <td class="user">${listNew.lName}</td>
      <td class="user">${listNew.userName}</td>
      <td class="user">${listNew.role}</td>
      <td class="user">${listNew.email}</td>
      <td class="user">${listNew.password}</td>
      <td class="user" style="display: none;">${listNew.id}</td>
      <td>
        <a>
          <img src="/images/Pencil-1.png" alt="" id="edit" class="edit user">
          <img src="/images/g-1.png" alt="" class="delete" >
        </a>
      </td> 
    </tr>
    `;
}

// function theRolesPermissions() {
//   console.log(this);
//   var td = document.querySelectorAll("td");
//   // if (roles == "Manager") {
//     td.forEach(element => {
//       console.log(element[3].innerText );
//       if (element[3].innerText == "Seles") {
//         var active = element.parentElement.children[6].childNodes[0].children[0];
//         var delet = element.parentElement.children[6].childNodes[0].children[2];
//         console.log(active);
//         active.style.display = "block";
//         delet.style.display = "block";
//       }else{
//         active.style.display = "none";
//         delet.style.display = "none";
//       }
//     });
//   // }
// }

export { displayHTML, displayBlock, colorNumber, success };
