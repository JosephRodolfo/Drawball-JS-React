export const startLogin = async (loginInfo, redirectOnSuccess) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PORT}/v1/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();

    if (data.token) {
      redirectOnSuccess();
      return data;
    } else {
      return;
    }
  } catch (e) {
    console.error("Error:", e);
  }
};

export const startLogout = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PORT}/v1/user/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error:", e);
  }
};

export const startCreateUser = async (createUserInfo, redirectOnSuccess) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_PORT}/v1/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "/",
      },
      body: JSON.stringify(createUserInfo),
    });
    console.log(response);

    const data = await response.json();
    redirectOnSuccess();
    return data;
  } catch (e) {
    console.error("Error:", e);
  }
};
