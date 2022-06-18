export function searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].position.length){
        current = haystack[i].position;
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
  }

  export function returnIndexChunkMatchingId(array, currentChunk){


   let chunkToColor = array.findIndex((element) => {
      return element.id === currentChunk.id;
    });
    return chunkToColor
  }