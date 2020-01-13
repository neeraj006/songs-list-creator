import LinkedList from "./LinkedList";

// this function assign weight to each song base on its position in the user list and no. of users listening to that song.
//It created an object where key is songId and value is its weight

export function songListCreator(songsList) {
  const allSongsWithWeight = {};
  // highest weight is a value we assign to the first song is each user list . Each subsequent song in each user list will be  less than this base on
  // their index . weight can be negative also if songs list is too long .
  const HIGHEST_WEIGHT_FOR_SONG = 10;

  songsList.forEach(user =>
    user.forEach((value, index) => {
      if (allSongsWithWeight[value]) {
        //if song is already in our object because some other user already like the song . we increase its weight further
        allSongsWithWeight[value] += HIGHEST_WEIGHT_FOR_SONG - index;
      } else {
        // first occurrence of any song
        allSongsWithWeight[value] = HIGHEST_WEIGHT_FOR_SONG - index;
      }
    })
  );

  let finalSongsList = new LinkedList();

  //extracting the songs from object and sort them according to weight and making a linked list of that . Using linked list because insertion in array
  // and shifting values will be expensive .
  for (let [songId, songWeight] of Object.entries(allSongsWithWeight)) {
    insertAtSortedPosition(finalSongsList, songId, songWeight);
  }
  finalSongsList.getSongsList();
  return finalSongsList;
}

function insertAtSortedPosition(finalSongsList, songId, songWeight) {
  let iterator = finalSongsList.head;

  let index = 0;
  while (iterator != null && iterator.songWeight > songWeight) {
    index++;
    iterator = iterator.next;
  }
  finalSongsList.insertAt(songId, songWeight, index);
}
