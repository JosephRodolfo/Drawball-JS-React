export const startLogin = async (loginInfo, callback, redirectOnSuccess) => {
    try{
  let response = await  fetch(`${process.env.REACT_APP_PORT}/v1/user/login`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
console.log(process.env.REACT_APP_PORT)
    if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
    }
    let data = await response.json();
    callback(data);

  
        if (data.token) {
          redirectOnSuccess();
        } else {
          return;
        }
      }
      catch(e) {
        console.error("Error:", e);
      }
  };
  
  export const startLogout = async (token, callback) => {
    fetch(`${process.env.REACT_APP_PORT}/v1/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  export const startCreateUser = async (
    createUserInfo,
    callback,
    redirectOnSuccess
  ) => {
    fetch(`${process.env.REACT_APP_PORT}/v1/user`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
        "Accept": "/"
      },
      body: JSON.stringify(createUserInfo),
    })
      .then((response) => response.json())
  
      .then((data) => {
        callback(data);
        redirectOnSuccess();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  