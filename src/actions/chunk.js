import { config } from "../config";

export const getChunk = async (token, {chunkX, chunkY}) => {
  try {
    const response = await fetch(`${config.url.API_URL}/v1/chunk/?chunkX=${chunkX}&chunkY=${chunkY}`, {
      method: "GET",
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
    console.error(`Could not get chunk: ${e}`);
  }
};
export const createChunk = async (token, chunkPositionInfo) => {
  try {
    const response = await fetch(`${config.url.API_URL}/v1/chunk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',

      body: JSON.stringify(chunkPositionInfo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Could not create chunk: ${e}`);
  }
};

export const updateChunk = async (token, updatedChunkInfo) => {
  try {
    const response = await fetch(
      `${config.url.API_URL}/v1/chunk/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(updatedChunkInfo),
      }
    );

    if (response.status === 401){
      alert("Sorry, you've been logged out due to inactivity. Log in again to keep playing.");
      throw new Error(`HTTP error: ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Could not edit chunk: ${e}`);
  }
};
