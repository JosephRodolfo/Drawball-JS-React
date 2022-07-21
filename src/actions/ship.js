import { config } from "../config";
export const startCreateShip = async (token) => {
    try {
      const response = await fetch(`${config.url.API_URL}/v1/ship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
        return data;
    } catch (e) {
      console.error(`Could not create ship: ${e}`);
    }
  };

  export const fetchShip = async (token, id) => {
    try {
      const response = await fetch(`${config.url.API_URL}/v1/ship/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      let data = await response.json();
      return data;
    } catch (e) {
      console.error(`Could not get ship: ${e}`);
    }
  };

  export const updateShip = async (token, id, updatedShipInfo) => {
  
    try {
      const response = await fetch(
        `${config.url.API_URL}/v1/ship/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedShipInfo),
          credentials: 'include',

        }
      );

      if (response.status === 401){
        alert("Sorry, you've been logged out due to inactivity. Log in again to keep playing.");
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      let data = await response.json();
      return data;
    } catch (e) {
      console.error(`Could not edit ship: ${e}`);
    }
  };
  