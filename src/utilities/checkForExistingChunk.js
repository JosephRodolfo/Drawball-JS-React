import { getChunk } from "../actions/chunk";

export const checkForExistingChunk = async (token, chunkData) => {
  const response = await getChunk(token, chunkData);
  return response;
};
