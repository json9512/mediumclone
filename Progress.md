# Progress

This readme shows the weekly progress of the development

# Weekly Progress

|Week|Date|Done|Reason|
|:---|:---|:---|:-----|
|1|11/27|<ul><li>Setup github and basic skeleton for the project</li></ul>|n/a|
|1|11/28|<ul><li>Setup Test cases with Mocha, sinon-chai, supertests</li><li>Setup CI pipepline with Travis, Appveyor</li><li>Setup deployment environment on Heroku</li></ul>|n/a|
|1|11/29|<ul><li>User authentication with Auth0</li></ul>|n/a|
|1|11/30|<ul><li>Read the docs for ProseMirror</li><li>Implement basic ProseMirror editor and bundle with webpack for frontend</li></ul>|To create an editor|
|1|12/01|<ul><li>save & update posts to database from editor page</li></ul>|n/a|
|1|12/02|<ul><li>onclick events to navigate to each post from myposts page</li><li>Problem encountered with Helmet's CSP, webpack, and pug.</li><ul>|Tried to execute inline onclick events to specific post id with pug but was rejected by helmet's CSP integration.<br> Tried using nonce and hash but nonce did not solve inline-script problem and hash was not supported from webpack<br>Unfortunately, chose to allow 'unsafe-inline' on CSP for now|


# Set of features to implement

This will not be a feature for feature clone of the Medium web app.

I expect this to be a minimal version of Medium that supports the following:

1. OAuth2 for user authentication
2. Trending stories in mediumclone (based on number of times visited)
3. user can only post if they are authenticated (Need editor)
4. user can like post (only when they are logged in)
5. user can comment post (only when they are logged in)