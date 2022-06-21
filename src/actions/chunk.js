export const getChunk = async (token, chunkPositionInfo) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_PORT}/v1/chunk/getchunk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chunkPositionInfo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (e) {
    console.error(`Could not get chunk: ${e}`);
  }
};
export const createChunk = async (token, chunkPositionInfo) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_PORT}/v1/chunk`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
  if (
    updatedChunkInfo.hasOwnProperty("state") &&
    updatedChunkInfo.state === ""
  ) {
    delete updatedChunkInfo.state;
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_PORT}/v1/chunk/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedChunkInfo),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (e) {
    console.error(`Could not edit chunk: ${e}`);
  }
};
