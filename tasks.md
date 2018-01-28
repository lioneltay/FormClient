## Tasks

@@@@ Weekend (Reddit Clone)

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
* [ ] rewrite the graphql schema using the object syntax.
* [ ] add join monster to object syntax version
* [ ] add join monster to schema language version

models

* [ ] relationships (follower/followee)
* [ ] likes
* [ ] give user first_name and last_name and use these to compute full_name using sqlDeps

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
