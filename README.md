# App Description

A signal like chat app written in react native using expo.

## App Structure

The app initialises from App.js. The stack navigator divides the app into 5 screens

- Login Screen
- Register Screen
- Home Screen
- AddChat Screen
- Chat Screen

Login screen is the initial screen. It renders app logo, a login form with inputs for email and password, and a login and register button. Register button navigates to the the Register screen. Login function calls signin function which call firebase auth method for signing in. an auth change listener is registerd with useEffect which fire after sign in and navigate user to the Home page.

Register Screen renders the app icon and Registration form. The form has 4 text inputs for Full name, email, password and profile picture url and register button. The register button calls register function which call firebase auth create user method and update user display name and photoURL.There is also a login button which takes user back to the login page.

HomeScreen render multiple custom List items inside a scrollView. Each customListItem component is react native element List component with avatar and message of the last message in the chat. Clicking on the chat navigate user to the chatScreen.The data is fetched from firebase db and set to state in the document. Header details are modified from inside the component. Header display users image, app name and button to addChat. AddChat button nnavigate to AddChatScreen.

AddChatScreen - renders an input box with button to add chat room. Creating a new chat room add a new document with chat name in db chats collection.

ChatScreen - fetches all chats and render them in either sender style or receiver style. There is a text input component which can be used to send message. Each message is added as a doc to chat messages collection with user details and message. Two useLayout effect are used - one to render custom header component and the other to fetch all chat data.

## State Management

State is managed local to the component.

## Authentication

Firebase auth is used for user authentication. Only email/password signup and login methods are used.

## Database

The app use firebase database for storing chat and user information. All the chats are stored in chats collection with each chat room as document. Each document contain chat room name and another collection for messages. Each message has message data and the user information acquired from firebase auth.

## CSS and Styling

The app use Style sheet component to generate in-component styles.
