async function checkUserName(password, userName) {
  var result = {};
  var settings = {
    url: "https://alogol-new-project-5c0d34.appdrag.site/api/userLogin",
    data: {
      password: `${password}`,
      userName: `${userName}`,
      AD_PageNbr: "1",
      AD_PageSize: "500",
    },
    method: "GET",
    async: true,
    crossDomain: true,
    processData: true,
  };
  await $.ajax(settings).done(function (response) {
    console.log(response); // TODO: Do something with the result
    if (response.Table.length > 0) {
      result.data = response.Table;
      result.success = true;
    } else {
      alert("rong");
      result.error = "ERROR:";
      result.success = false;
    }
  });
  return result;
}

async function checkList() {
  var result = {};
  var settings = {
    url: "https://alogol-new-project-5c0d34.appdrag.site/api/userEntrance/uesrsList",
    data: {
      AD_PageNbr: "1",
      AD_PageSize: "500",
    },
    method: "POST",
    async: true,
    crossDomain: true,
    processData: true,
  };
  await $.ajax(settings).done(function (response) {
    console.log(response); // TODO: Do something with the result
    if (response.Table.length > 0) {
      result.data = response.Table;
      result.success = true;
    } else {
      result.success = false;
    }
  });
  return result;
}

function createNewUser( fName, lName, userName, role,email,password, role_entry) {
 console.log(role_entry);
  if (role_entry == "Admin") {
    create_New_User(fName, lName, userName, role, email, password, role_entry);
  } else if (role_entry == "Manager") {
    if (role == "Employee") {
      create_New_User( fName, lName, userName, role,email,password, role_entry);
    } else {
      alert("error1");
    }
  } else {
    alert("error2");
  }
}
async function create_New_User( fName, lName, userName, role,email,password,) {
  var settings = {
    url: "https://alogol-new-project-5c0d34.appdrag.site/api/createNewUser/createNewUser",
    data: {
      fName: `${fName}`,
      lName: `${lName}`,
      userName: `${userName}`,
      password: `${password}`,
      email: `${email}`,
      role: `${role}`,
    },
    method: "POST",
    async: true,
    crossDomain: true,
    processData: true,
  };
  await $.ajax(settings).done(function (response) {
    console.log(response); // TODO: Do something with the result
  });
}

async function deleteCards(id_clicked) {
  var settings = {
    url: "https://alogol-new-project-5c0d34.appdrag.site/api/deleteCars",
    data: {
      id: `${id_clicked}`,
    },
    method: "POST",
    async: true,
    crossDomain: true,
    processData: true,
  };
  await $.ajax(settings).done(function (response) {
    console.log(response); // TODO: Do something with the result
  });
  // tok.style.display = "none";
}

async function updatingUser(fName, lName, userName, role, email, password, id) {
  var settings = {
    url: "https://alogol-new-project-5c0d34.appdrag.site/api/updatingUser/updatingUser",
    data: {
      fName: `${fName}`,
      lName: `${lName}`,
      userName: `${userName}`,
      password: `${password}`,
      role: `${role}`,
      email: `${email}`,
      id: `${id}`,
    },
    method: "POST",
  };
  await $.ajax(settings).done()
}

function audioFunc() {
  var audio = new Audio("../audio/keybord.mp3");
  audio.volume = 0.1;
  audio.play();
}
function audio1Func() {
  var audio = new Audio("../audio/false.mp3");
  audio.volume = 0.1;
  audio.play();
}
function audio2Func() {
  var audio = new Audio("../audio/good.mp3");
  audio.volume = 0.1;
  audio.play();
}
function audio3Func() {
  var audio = new Audio("../audio/police.mp3");
  audio.play();
  audio.volume = 0.1;
}
export {
  checkUserName,
  checkList,
  createNewUser,
  deleteCards,
  updatingUser,
  audioFunc,
  audio1Func,
  audio2Func,
  audio3Func,
};
