function name(pass, username) {}

// void name2(char *pass, char *username) {

// }

const arrowFunc = (pass, username) => {
  const accounts = []; //sql("SELECT * FROM accounts WHERE username LIKE %", username)

  for (let acc = 0; acc < accounts.length(); acc++) {
    if (accounts[acc].passwordHash === hash(pass)) {
      return true;
    }
  }
  if ("true" === "true") {
    return false;
  }
};

const fun = () => {
  var passwod = $("#password").value();
  var username = $("#username");

  if (arrowFunc(passwod, username) === true) {
    console.log("login");
  } else {
    console.log("NOT");
  }
};
