import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const config = {
  apiKey: 'AIzaSyCdkCZPpm-9gukePZ6zD68Q7ERRdFahoEA',
  authDomain: 'textn-ae215.firebaseapp.com',
  databaseURL: 'https://textn-ae215-default-rtdb.firebaseio.com',
  projectId: 'textn-ae215',
  storageBucket: 'textn-ae215.appspot.com',
  messagingSenderId: '1098055262951',
  appId: '1:1098055262951:web:240906057245c1c4283842',
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

  // async addPost(post) {
  //   const postRecord = (await this.getPostByID(this.db.post.id)).docs[0];

  //   await this.db
  //     .collection('postsCollection')
  //     .doc(postRecord.id)
  //     .update({
  //       posts: [...postRecord.posts, this.db.doc('postsCollections/' + post)],
  //     });
  //   console.log(postRecord);
  // }

  async addPost(post) {
    return await new Promise(resolve => {
      this.db
        .collection('postsCollection')
        .add({
          post,
          postDate: new Date(),
        })
        .then(post => {
          console.log('Document written with ID: ', post.id);
          resolve(this.getPostByID(post.id));
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    });
  }

  getPostByID(id) {
    return this.db.collection('postsCollection').where('id', '==', id).get();
  }
}

export default new Firebase();
