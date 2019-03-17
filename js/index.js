import "../css/style.scss";
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/database";

// API SECTION

document.querySelector(".form").addEventListener("submit", function(e) {
  e.preventDefault();
  axios
    .get(
      "http://www.omdbapi.com/?apikey=8ccbb63c&s==" +
        document.querySelector(".input").value
    )
    .then(result => {
      console.log(result);
      result.data.Search.forEach(movie => {
        console.log(movie);
        document.querySelector(".movieResult").innerHTML += `<li data-id="${
          movie.imdbID
        }">${movie.Title}</li>`;
      });
    })
    .then((document.querySelector(".movieResult").innerHTML = ""));
  document.querySelector(".form").reset();
});

//FIREBASE SECTION

// Config

var config = {
  apiKey: "AIzaSyCPuBwtJ-ILiZURMPSGIyGsJrbcINij0j8",
  //authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://start-to-firebase.firebaseio.com/",
  projectId: "testproject-start-to-firebase"
  //storageBucket: "<BUCKET>.appspot.com",
  //messagingSenderId: "<SENDER_ID>",
};

firebase.initializeApp(config);

const formRef = document.querySelector(".imgHolder");
const inputDbRef = firebase.database().ref("/movie-api/");

//Send Data to Firebase

document.querySelector(".movieResult").addEventListener("click", function(e) {
  if (e.target.nodeName === "LI") {
    axios
      .get("http://www.omdbapi.com/?apikey=8ccbb63c&i=" + e.target.dataset.id)
      .then(response => {
        //console.log(response);
        const myObj = {
          Poster: response.data.Poster
        };
        inputDbRef.push(myObj);
      });
    //.then((document.querySelector(".imgHolder").innerHTML = ""));
  }
});
document.querySelector(".imgHolder").removeEventListener("click", function(e) {
  if (e.target.nodeName === "LI") {
    // axios
    //   .get("http://www.omdbapi.com/?apikey=8ccbb63c&i=" + e.target.dataset.id)
    //   .then(response => {
    //     //console.log(response);
    //     const myObj = {
    //       Poster: response.data.Poster
    //     };
    //     inputDbRef.set(myObj);
    //   });
    //.then((document.querySelector(".imgHolder").innerHTML = ""));
  }
});
//Send Firebase Data to UI
inputDbRef.on("value", function(snapshot) {
  const fbData = snapshot.val();
  console.log(snapshot.val());
  for (const prop in fbData) {
    formRef.innerHTML += `<li><img src="${fbData[prop].Poster}" alt=""></li>`;
  }
  //document.querySelector(".imgHolder").reset();
});

//Remove a img

// inputDbRef.on("value", function(snapshot) {
//   const fbData = snapshot.val();
//   console.log(snapshot.val());
//   for (const prop in fbData) {
//     formRef.innerHTML += `<li><img src="${fbData[prop].Poster}" alt=""></li>`;
//   }
//   //document.querySelector(".imgHolder").reset();
// });
