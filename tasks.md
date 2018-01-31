## Bugs

* [ ] rootComments of thread returns every comment since every comment has a thread id
  * [ ] add a sql constraint that only allows one of comment_id or thread_id to be null, the other must not be null
    * [x] Not neccessary, a root comment is a comment that has no parent comment (null comment_id)
  * [ ] learn about sql constraints in general

## Optimisations

* [ ] fetching comments 1 by one generates too many api requests provide different ways of fetching comments

  * [ ] Go by comment level instead, still many requests, but less. Multiple requests are convenient in this case since we use recursive rendering.
    * [ ] Comments component, requests subcomments
  * [ ] Go by entire comments

* [ ] hoist state into redux store so that ui is a function of state.
  * [ ] Comments should not even render subcomments if toggled, no need to render hidden components just to manage state
    * NEVER make anti-semantic decisions just to satisfy conditions (rendering elements with display none is so counter intuitive)

## Tasks

mysql

* [ ] store dates in iso format

planning

* [ ] draw a model for app using QuickDBD
* [ ] plan all features
* [ ] plan database structure

server/database

* [x] root imports on server code (require.main.require)
* [x] connect to aws db
* [ ] deploy app to s3 (automatically)
* [x] make a graphql api
* [x] use knex in graphql resolve functions
* [ ] mysql: how to rename a table or column
* [ ] mysql: how to remove or add rows and columns
* [x] implement authentication using salt and hash, jwt and cookies, bcrypt
* [x] rewrite the graphql schema using the object syntax.
* [x] add join monster to object syntax version
* [x] add join monster to schema language version

models

* [x] relationships (follower/followee)
* [x] likes
* [x] give user firstName and lastName and use these to compute full_name using sqlDeps

features

* [x] should be able to sign up
* [x] login in
* [x] log out
* [x] create thread
* [ ] replies

  * [ ] reply to thread should open an editor below the thread
  * [ ] reply to commnet should open an editor below the comment

* [ ] add actions below comment / thread, reply, like, ...

  * [ ] collapsable comment chains

* [ ] comment on thread
* [ ] comment on comments
* [ ] view user profile
* [ ] edit user profile
* [ ] archive comment (hides the comment contents)
* [ ] archive thread (does not show up on front page or searches)
* [ ] search for threads
* [ ] search for users
* [ ] like threads and posts
* [ ] pagination
  * [ ] Threads, Users, Comments

ui

* [ ] use grid layout
* [ ] render a nested comment tree like reddit

====

* [ ] Add redux-form and form fields

  * [ ] react-widget form fields (copy some from work code)

* [x] Implement forums database
* [ ] draw model diagram in MySqlWorkbench

  * [x] Users
    * [x] many Threads
    * [x] many Comments
  * [x] Threads
    * [x] one User
    * [x] man Threads
  * [x] Comments
    * [x] one User
    * [x] one Thread
    * [x] one Comment
    * [x] many Comments

* [ ] Live Interaction

  * [ ] User graphql subscriptions to update comments and posts as they are being made (two browser instances commenting on each others posts)
  * [ ] Web notifications, someone has responded to your Post/Thread (Refer to web apis notes)
  * [ ] Push notifications, someone has responded to your Post/Thread (Refer to web apis notes)

* [x] use join-monster to speed up queries
  * [x] dataloader doesn't seem like it can handle conditional queries or relational queries, it is only good at loading by given ids
  * [x] Re-write schema using Object definitions
    * [x] Handle circular dependencies of types
* [x] investigate the affects of loading nested comments

* [ ] UI
  * [ ] Create Thread
  * [ ] View All Threads
  * [ ] Create Post

JOIN MONSTER BENEFITS

* add derived data easily
