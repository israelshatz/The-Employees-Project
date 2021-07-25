import * as Model from "../app/model.js";
import * as View from "../app/view.js";
var taimer;
var number = true; 
var Counting = 0;
var userData = { user: "", pass: "" };
export function init() {
  View.displayHTML();
  $("#userNameBtn").click(check);
}

async function check() {
  userData.user += $("#userName").val();
  View.displayBlock(); //numbers
  // keydownNumber();
  if (userData.user == "") {
    alert("enter your Name Menyak");
    init();
    // delete window.ktiva;
  }
  checkNumber();
}

function checkNumber() {
  //mouse
  $(".number").on("click", function () {
    var number = this.textContent; //textContent == value
    thePasswordTimeout(number.substring(0, 1));
  });
  //keyBord
  var num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  // check_KeyBord(num)

  $(document).keydown(function (e) {
    if (num.includes(e.key)) {
      thePasswordTimeout(e.key);
    }
  });
}

function thePasswordTimeout(btn) {
  // delete window.check_KeyBord;
  Model.audioFunc();
  clearTimeout(taimer);
  userData.pass += btn;
  if (userData.pass.length == 4) {
    thePasswordCkeck(btn);
  } else {
    thePasswordEroor(btn);
  }
}
function thePasswordEroor(btn) {
  View.colorNumber(btn);
  taimer = setTimeout(() => {
    // Model.audio1Func();
    userData.pass = "";
    View.displayBlock();
    $(document).off("keydown");
    checkNumber();
    // check_KeyBord();
  }, 3000);
}
async function thePasswordCkeck(btn) {
  View.colorNumber(btn);
  Counting += 1;
  var result = await Model.checkUserName(userData.pass, userData.user);
  userData.pass = "";
  // result == id + role
  if (result.success) {
    thePasswordSuccess(result);
    $(document).off("keydown");
  } else {
    $(document).off("keydown");
    thePasswordFinelFunc();
  }
}
var data_user = [];
async function thePasswordSuccess(result) {
  number = false;
  Counting -= 1;
  var list = await Model.checkList();
  await View.success(list, result);
  data_user.push(result.data[0].id, result.data[0].role);
  func_edit(data_user[0], data_user[1]);
  myFunClick(data_user[0], data_user[1]);
  delete_fonc(data_user[0], data_user[1]);
}

function thePasswordFinelFunc() {
  if (Counting == 3) {
    Model.audio3Func();
    alert("Call police!!!");
    userData.pass = "";
    View.displayBlock();
    checkNumber(userData.user);
    setTimeout(() => {
      location.reload();
    }, 300);
  } 
  userData.pass = "";
  View.displayBlock();
  checkNumber(userData.user);
}

async function myFunClick(id, role) {
  $(".submit").on("click", function () { // add
    after_btn_click_add(role);
  });
}
function func_edit(id, role) {
  $(".edit").on("click", function () {
    after_btn_click(this, id, role, "edit");//edit
  });
}

function delete_fonc(id, role) {
  $(".delete").on("click", function () {
    after_btn_click(this, id, role, "trash");//delete
  });
}
function after_btn_click_add(role) {
  if (role == "Admin" || role == "Manager") {
    createNewUser(role);
  }
}
function after_btn_click(thi, id, role, typ) {
  var row = thi.parentElement.parentElement.parentElement;
  var inputs = row.querySelectorAll(".user");
  var _id = row.children[6].innerHTML;
  var _role = row.children[3].innerHTML;
  //_id == id_clicked
  //_role == row_clicked
  //id == id Of the person enters
  //role == id Of the person enters
  // inputs == row_box of d person clicked
  check_Roles(_id, _role, inputs, id, role, typ, row);
}

function check_Roles(_id, _role, inputs, id, role, typ, row) {
  if (role == "Admin") {
    admin_func(_id, inputs, typ, row);
  } else if (role == "Manager") {
    manager_Edit(_role, _id, inputs, id, typ, row);
  } else if (role == "Employee") {
    employee_Edit(_id, inputs, id, typ, row);
  }
}

function admin_func(_id, inputs, typ, row) {
  if (typ == "edit") {
    able_Edit(inputs);
  } else {
    deleteCards(_id, row);
  }
}

function manager_Edit(_role, _id, inputs, id, typ, row) {
  if (_role == "Employee" || id == _id) {
    if (typ == "edit") {
      able_Edit(inputs);
    } else {
      deleteCards(_id, row);
    }
  }
}

function employee_Edit(_id, inputs, id, typ, row) {
  if (_id == id) {
    if (typ == "edit") {
      able_Edit(inputs);
    } else {
      deleteCards(_id, row);
    }
  }
}

function able_Edit(item) {
  //item == To All "td" of D User
  if (!item[1].isContentEditable) {
    able_Editable(item, "true");
    $(item[7]).css("background-color", "green");
  } else {
    able_Editable(item, "false")
    $(item[7]).css("background-color", "");
    updatingUser(item);
  }
}

function able_Editable(item, bol) {
  for (let i = 0; i <= 5; i++) {
    item[i].contentEditable = bol;
  }
}

async function updatingUser(item) {
  await Model.updatingUser(
    item[0].innerText, //fName
    item[1].innerText, //lName
    item[2].innerText, //userName
    item[3].innerText, //role
    item[4].innerText, //email
    item[5].innerText, //pin
    item[6].innerText //id
  );
}

async function createNewUser(role_entry) {
  var fName = $("#fName");
  var lName = $("#lName");
  var userName = $("#userName");
  var email = $("#email");
  var password = $("#password");
  var role = $("#role");
  await Model.createNewUser(
    fName.val(),
    lName.val(),
    userName.val(),
    role.val(),
    email.val(),
    password.val(),
    role_entry
  );
  updateing();
}

async function updateing() {
  var list = await Model.checkList();
  await View.success(list);
  func_edit(data_user[0], data_user[1]);
  myFunClick(data_user[0], data_user[1]);
  delete_fonc(data_user[0], data_user[1]);
}

function deleteCards(_id, row) {
  Model.deleteCards(_id);
  $(row).remove();
}
