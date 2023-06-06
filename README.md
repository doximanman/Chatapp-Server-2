# Chat App
## The Aim of the App
  This app aims to allow people to chat with each other from anywhere in the world easily and intuitively, from one app.

## Current functionality
* ### Register page:
  You can register to the website. Registration requires a username, password, a display name and a profile picture.
  
  Once you provide valid credentials (specified by the requirements that show when you start typing), you can hit the "register" button and
  you will be fully registered and sent to the login page to log in.
  (note: registrations only last per session- meaning on a refresh of the page or a restart of the server the registered accounts will reset.)
  
  If you've already registered, you can click on the bottom of the page to go to the login page.
    
* ### Login page:
  On this page you can login to the website using the credentials you've provided in the registration form.
  
  Once you typed in your username and password, they will be checked and validated according to past registrations.
  If the username-password combo match an existing registered user you will be logged in and set to the chat page.
  
  If you haven't logged in yet, you can click on the bottom of the page to go the register page.
    
* ### Chat page:
  This is the main page of the app. On the left you can see your display name and your profile picture at the top,
  along with a button to add new chats to your chat list, which you can see right underneath. You can also logout
  using the red button that says "logout".
  
  The chat list contains the list of all the chats that you have added in the past. Every chat is identified in the list
  with a profile picture, a display name, and the last message sent or recieved, with its date.
  
  From the chat list you can select a chat to display on the right side. If a chat is selected, it will be highlighted
  in blue.
  
  On the right side you can see the selected chat. At the top you have the other person's profile picture and display
  name. Below that you have the chat itself containing all the messages, and below that you have the message box along
  with a send button.
  
  You can change the selected chat, add a new contact, send messages, and logout.
  Currently you cannot receive messages because all the data is stored in memory and is local.
  Messages are reset on login.
  
  Pay attention that you cannot browse the chat page unless you are connected to the app by inserting your correct username and password to the login page.
  
## How to launch the project
  In order to run the project you'll need to have NodeJS installed (preferably version 18 and above), then you can choose to run the server
  or the client:
  1. save the files in a folder (unzipped)
  To run the server:
  2. open a terminal in the Server folder
  3. run
    '''
    npm i
    npm start
    '''
  4. run
  
