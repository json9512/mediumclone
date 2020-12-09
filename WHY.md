# Why ?
Lists things I learnt, decisions I made throughout the project.

# Learnt

- Learnt how to set up basic CI/CD pipeline with Appveyor, Travis, and coverall through this [tutorial](https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/#top)

- Learnt a bit more about web and helmet such as managing CSPs, http headers, etc by utilizing helmet middlewares on express.

- Learnt the chaos of server-side-rendered (~~dynamic...~~) static web pages with template engines. Learnt the tidiness of frontend frameworks like React, Vue.

- Learnt how to compile files with webpack

- Learnt async IIFE 

- Learnt how to create basic read/write editor with ProseMirror

# Why

- PUG - I've used PUG with one of my uni assignments. The experience I had was not bad, so I decided to use it here. (~~I was kind of tired of using React~~) <br>Besides, I wanted to experience server-side-rendering and not having to fire up a separate frontend app. Crucially, I assumed the project would be simple enough to build with PUG.

- express, nodejs - django and python came to my mind first. However, I assumed (again) that the project was simple enough and the quick setup with express/nodejs was the go to.

- Postgresql - I did consider alternatives such as MySQL, MongoDB, cloud databases. However, I chose to stick with psql because I had prior experience and I wanted to learn more about the SQL language.

- ProseMirror - This was the suggested opensource tool for editors by a Medium developer. I've had experience with react-wysiwyg before but I struggled customizing it. <br>Whereas, ProseMirror was great for customizing the editor. But I ended up using the simple example they provided. 

- Express-Session - to use passport, express-session is a requirement. User info is saved on session after authentication through passport and the session is stored on the server. The client will be assigned a session_id which is stored in the cookie. Hence, I did not see the necessity to implement auth_token with JWT. <br>Basically, the server becomes stateful when the application uses sessions to store information. Stateful servers tend to have difficulties when scaling out. Since the client is always required to access the server which holds the appropriate session information, stateful servers sitting behind a load balancer needs to share the session information through a storage of some sort(Cache, database, etc).
<br>However, this medium-clone app may not face such problem since web pages are served from the server.

- User table - mediumclone only stores the username and the associated image.  Since Auth0 manages the users for this application and the user data is saved on session once they login through Auth0, there is no users table in the mediumclone database.