const usersLog = {}

exports.getUsersLog = () => {
  console.log(JSON.stringify(usersLog));
  return usersLog;
}

exports.isLoggedIn = (username) => {
  // console.log(usersLog)
  return usersLog.hasOwnProperty(username) && usersLog[username].loggedIn;
}