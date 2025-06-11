# Table of Contents
      
- [About Project](#about-project)
- [Watch Demo](#watch-demo)
- [What Works Now](#what-works-now)
  - [When Not Logged In](#when-not-logged-in)
  - [When Logged In](#when-logged-in)
- [Usage in Local Computer](#usage-in-local-computer)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [TODO LIST](#todo-list)

# About project 

Fully deployed: https://nasa-gyvq.vercel.app/

This is a project I worked on to practice building a full stack application, using MongoDB, Node.js(Express), React,TypeScript, NASA API.

There are still some bugs, which I am aware of, and from time to time, I try to fix them little by little.

The code contains a lot of comments because, as this was a new experience for me, I made notes to help myself learn and remember what each part does.

# Watch Demo
[![Watch the video](https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1979766631-dc12e9bbcf084abbfb80d6d6f0e3f0ae97ff50b5382bfeb39c435850e53b3e2a-d_295x166&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png)](https://vimeo.com/1054408419/fd1d62809b)

# What works now:
## When NOT logged in:
- Can see the default page, just main info about this project;
- at Users page can see list of registered users;
- Can check what other user's favorites;
- Login or signup

![Logout](https://github.com/user-attachments/assets/4c165120-431c-433d-9e2d-26e709c45df9)

## When logged in:
- search something from NASA API;
- add to favorite;
- check details;
- remove from favorite;
- in profile can update name and password
- Logout
  
![Login](https://github.com/user-attachments/assets/051d0a25-4da4-4dae-b696-6012b7d9608f)

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
- Example whne already user logged in and searching e.g. "Mars"
![image](https://github.com/user-attachments/assets/4d4ee975-f57f-4953-a4c1-69c831f0cdaa)



 ### ⚛️4. Testing (will be added more)
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
# ✅TODO LIST
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
| fix mobile version | done |
|<span style="color:red;">**Some bugs or future feature**</span>  | 🔴 |
| Change fecth/axios to ReactQuery for better cashing  |  |
| fix search, when goes after several searches |  |
| for profile create new picture |  |
| Add update, create notes for favorites |  |
| possible add other's users favorites to mine (after login)|  |
| when there is no picture in the article, fix the bug|  |
| more secured passwords checks|  |
| make more tests|  |
| accessibility |  |
| fix ids |  |
| make hooks|  |
| eslint |  |
| comments|  |
| Add message about loading ASAP|  |


