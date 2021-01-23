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
|1|12/02|<ul><li>onclick events to navigate to each post from myposts page</li><li>~~Problem encountered with Helmet's CSP, webpack, and pug.~~ Solved</li><li>Render content on Post/Editor pages from database</li><ul>|n/a|
|1|12/03|<ul><li>Like functionality for each post</li><li>Post deletion</li></ul>|n/a|
|2|12/04|<ul><li>Dynamic content load on main page</li><li>Application functionality completed</li><li>Apply last design touches</li></ul>|n/a|
|2|12/05|<ul><li>CI pipeline error fix</li></ul>|n/a|
|2|12/06|<ul><li>Additional unit tests created</li><li>Started refactoring</li></ul>|n/a|
|2|12/07|<ul><li>Custom modal created</li></ul>|n/a|
|2|12/08|<ul><li>Create check user email verified</li><li>Edit to use profile image, content image instead of random images</li><ul>|n/a|
|2|12/09|<ul><li>Create tagging system</li><li>Create "More from idiom" contents on post page</li><ul>|n/a|
|2|12/10|<ul><li>Create post list by tag, or author</li><li>Create tests for /list route</li><ul>|n/a|
|3|12/11|<ul><li>Remove duplicate code</li><li>Edit final styles</li><ul>|n/a|
|3|12/12|<ul><li>Merge final app to main</li><ul>|n/a|


# Set of features to implement

This will not be a feature for feature clone of the Medium web app.

I expect this to be a minimal version of Medium that supports the following:

1. OAuth2 for user authentication
2. Trending stories in mediumclone (based on number of times visited)
3. user can only post if they are authenticated (Need editor)
4. user can like post (only when they are logged in)
5. ~~user can comment post (only when they are logged in)~~

## More

Things I learnt/Decisions I made listed on [WHY](https://www.github.com/json9512/mediumclone/blob/master/WHY.md)
