import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
  apiKey: 'fwfhweuhiasIHUIFHSjon787',
  authDomain: 'myapp@firebase.com',
  databaseURL: 'https://myapp@firebase.com',
  projectId: 'myapp',
  storageBucket: 'myapp@firebase.com',
  messagingSenderId: '739752720028',
  appId: '1:5830530990:web:80345830958305',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async login({ email, password }) {
    await this.auth.signInWithEmailAndPassword(email, password);
    return this.getUserByID(this.auth.currentUser.uid);
  }

  logout() {
    return this.auth.signOut();
  }

  async register({ firstName, lastName, email, password, birthDate }) {
    const { user } = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await this.db.collection('usersCollection').add({
      uid: user.uid,
      firstName,
      lastName,
      birthDate,
      registrationDate: new Date(),
      email,
      subscriptions: [],
      posts: [],
    });

    return this.getUserByID(this.auth.currentUser.uid);
  }

  getUserByID(uid) {
    console.log(uid);
    return this.db.collection('usersCollection').where('uid', '==', uid).get();
  }

  async isInitialized() {
    await new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
    console.log(this.auth.currentUser);
    if (this.auth.currentUser)
      return this.getUserByID(this.auth.currentUser.uid);
    return null;
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayFirstName;
  }

  async editProfile(values) {
    const userRecord = (await this.getUserByID(this.auth.currentUser.uid))
      .docs[0];

    await this.db
      .collection('usersCollection')
      .doc(userRecord.id)
      .update(values);
  }

  async subscribe(userID) {
    const userRecord = (await this.getUserByID(this.auth.currentUser.uid))
      .docs[0];

    await this.db
      .collection('usersCollection')
      .doc(userRecord.id)
      .update({
        subscriptions: [
          ...userRecord.subscriptions,
          this.db.doc('usersCollections/' + userID),
        ],
      });
  }

  async unsubscribe(userID) {
    const userRecord = await this.getUserByID(this.auth.currentUser.uid);
    await this.db
      .collection('usersCollection')
      .doc(userRecord.id)
      .delete({
        subscriptions: [
          ...userRecord.subscriptions,
          this.db.doc('usersCollections/' + userID),
        ],
      });
  }

  async addPost(postID) {
    const postRecord = await this.getPostByID(this.auth.currentUser.uid)
      .docs[0];

    await this.db
      .collection('postsCollection')
      .add({ posts: [] })
      .doc(postRecord.id)
      .update({
        posts: [...postRecord.posts, this.db.doc('postsCollections/' + postID)],
      });
    return this.getPostByID;
  }

  getPostByID(id) {
    console.log(id);
    return this.db.collection('postsCollection').where('id', '==', id).get();
  }
}

export default new Firebase();
