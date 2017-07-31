import * as firebase from 'firebase'

export let database

let userKey

export const init = () => {
  let config = {
    apiKey: "AIzaSyBU1D5w3YQkGebNARG05jGPfWOnCL1igp8",
    authDomain: "focusapp-cf1b4.firebaseapp.com",
    databaseURL: "https://focusapp-cf1b4.firebaseio.com",
    projectId: "focusapp-cf1b4",
    storageBucket: "focusapp-cf1b4.appspot.com",
    messagingSenderId: "978036637525"
  }
  firebase.initializeApp(config)
  database = firebase.database()
}

export const addUserToRoom = (userName) => {
  const rootRef = database.ref('foret/users').push()
  userKey = rootRef.key
  database.ref('foret/users/'+ userKey).set({ userName: userName, status: 'available' })
}

export const setUserStatus = (userStatus) => {
  database.ref('foret/users/' + userKey).update({
    status:userStatus
  })
}
