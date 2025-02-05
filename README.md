# About project 

Fully deployed: https://nasa-gyvq.vercel.app/

This is a project I worked on to practice building a full stack application, using MongoDB, Express, React,TypeScript, NASA API.

There are still some bugs, which I am aware of, and from time to time, I try to fix them little by little.

The code contains a lot of comments because, as this was a new experience for me, I made notes to help myself learn and remember what each part does.


# What works now:
## When not logged in:
- Can see the default page, just main info about this project;
- at Users page can see list of registered users;
- Login or signup

## When logged in:
- search something from NASA API;
- add to favorite;
- check details;
- remove from favorite;
- in profile can update name and password

# Usage in local computer
## Requirements:
- Node version 22;
- npm version v10.8.2;

## Steps
1.💻 Clone repository

 ### 🚀2. For backend
2.1 Move to server directory
```bash
cd server
```
2.2 Install dependencies
```bash
npm install
```
### ❗ NOTE
This project uses a .env file to manage sensitive environment variables. 

For security reasons, the .env file is not included in this repository. Instead, an example file is provided.

2.2.1 Replace the enviroment values with your own.
    
2.3 Start server
```
npm start
```
the backend will run http://localhost:5000/

 ### 🚀3. For frontend
3.1 Move to client directory
```bash
cd client
```
3.2 Install dependencies
```bash
npm install
```
This project uses a .env file to manage sensitive environment variables. 
### ❗ NOTE
For security reasons, the .env file is not included in this repository. Instead, an example file is provided.

3.2.1 Replace the enviroment values with your own.
  
3.3 Start server
```
npm start
```
the frontend will run http://localhost:3000/
![image](https://github.com/user-attachments/assets/4d4ee975-f57f-4953-a4c1-69c831f0cdaa)



 ### 🚀4. Testing (will be added more)
4.1 Move to client directory
```bash
cd client
```
4.2 
```bash
npx vitest
```
![image](https://github.com/user-attachments/assets/aec848d0-17a8-4b27-beac-4b5e7e04fb29)


### Project is still have issuies, that I am working on:
## ✅TODO LIST
| Feature/bug | done? | 
|----------|----------|
| **Fixed** | 🟢|
  users=> login/signup/logout/getusers | done  |
  articles=> add to favorite/show all favorite/delete from favorite | done  |
| Show in favorites| done |
| Fix picture in favorites | done |
| Delete from favorite |  done|
| Fixing isues when signup | done |
| Fix image for details, after favorite | done |
| Create profile for user/update password/name |  done|
| Go back to search page | done |
| Check what other users liked articles | done |
| maximum amount of character at name, password and email, need to fix| done |
|<span style="color:red;">**Some bugs or future feature**</span>  | 🔴 |
| fix serach, when goes after several searches |  |
| for profile create new picture |  |
| Add update, create notes for favorites |  |
| possible add other's users favorites to mine (after login)|  |
| when there is no picture in the article, fix the bug|  |
| more secured passwords checks|  |
| make more tests|  |
