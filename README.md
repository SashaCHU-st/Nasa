# About project

This is a project I worked on to practice building a full stack application.

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
- Node 14 and more;
- npm version v10.8.2;
- MongoDb 

## Steps
1. Clone repository
2. ### For backend
2.1 Move to server directory
```bash
cd server
```
2.2 install dependencies
```bash
npm install
```
2.3 start server
```
npm start
```
the backend will run http://localhost:5000/

3. ### For frontend
3.1 Move to client directory
```bash
cd client
```
3.2 install dependencies
```bash
npm install
```
3.3 start server
```
npm start
```
the frontend will run http://localhost:3000/

### NOTE
This project uses a .env file to manage sensitive environment variables. For security reasons, the .env file is not included in this repository. Instead, an example file is provided.


## TODO LIST
| Feature | done? | 
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
|<span style="color:red;">**Some bugs or future feature**</span>  | 🔴 |
| fix when go after several searches |  |
| for profile + create new picture |  |
| Add update, create notes for favorites |  |
| possible add other's users favorites to mine (after login)|  |



