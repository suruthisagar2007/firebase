# REACT + FIREBASE LAB — GENERAL COMMANDS

## 1. Create React Application
npx create-react-app my-app
cd my-app

## 2. Install Packages
npm install firebase
npm install react-router-dom

## 3. Run React Application
npm start

## 4. Login to Firebase
firebase login

## 5. Configure Firebase Authentication
Enable the required sign-in method in Firebase Console.

## 6. Create Firebase Database
Create a Cloud Firestore database in Firebase Console.

## 7. Configure Firebase
Create src/firebase.js and add Firebase configuration.
Initialize Authentication and Firestore.

## 8. Initialize Firebase Hosting
firebase init

Select:
- Hosting
- Use an existing project
- Select your Firebase project
- Public directory: build
- Single-page app: Yes

## 9. Select Firebase Project
firebase use YOUR_FIREBASE_PROJECT_ID

## 10. Build Application
npm run build

## 11. Deploy Application
firebase deploy

## 12. Update Deployment
npm run build
firebase deploy
