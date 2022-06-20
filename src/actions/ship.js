
export const startCreateShip = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}/v1/ship`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
        return data;
    } catch (e) {
      console.error(`Could not add ship: ${e}`);
    }
  };

  export const fetchShip = async (token, id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}/v1/ship/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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