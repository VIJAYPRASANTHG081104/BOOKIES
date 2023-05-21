import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSetting = {
  // the key name must be same as the key name in firebase i.e `databaseURL`
  databaseURL:
    "https://bookies-387406-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shopingListInDb = ref(database, "books");


onValue(shopingListInDb, function (snapshot) {
  if(snapshot.exists()){
    const snap = Object.entries(snapshot.val());
    for (let i = 0; i < snap.length; i++) {
      let currentItem = snap[i];``
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
  
    console.log(currentItemID, currentItemValue);
    }
  }
  else{
    console.log("no data");
  }
});





//json
const gokul = {
  name: "gokul",
  age: 21,
  address: {
    city: "chennai",
    state: "tamilnadu",
  },
};
// console.log(gokul.name);

// to convert json to arrays
let scrimbaUsers = {
  "00": "sindre@scrimba.com",
  "01": "per@scrimba.com",
  "02": "frode@scrimba.com",
};

// Challenge: Create a let variable called 'scrimbaUsersEmails' and use one of Object methods to set it equal to an array with the values
let scrimbaUsersEmails = Object.values(scrimbaUsers);

// Challenge: Create a let variable called 'scrimbaUsersIDs' and use one of Object methods to set it equal to an array with the keys
let scrimbaUsersIDs = Object.keys(scrimbaUsers);

// Challenge: Create a let variable called 'scrimbaUsersEntries' and use one of Object methods to set it equal to an array with the both the keys and values
let scrimbaUsersEntries = Object.entries(scrimbaUsers);

// console.log(scrimbaUsersEmails)
// console.log(scrimbaUsersEntries)
// console.log(scrimbaUsersIDs)
