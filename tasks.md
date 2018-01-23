## Tasks

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

* [ ] use dataloader to speed up queries
  * [ ] dataloader doesn't seem like it can handle conditional queries or relational queries, it is only good at loading by given ids
  * [ ] join-monster to the rescue?
* [ ] investigate the affects of loading nested comments

* [ ] UI
  * [ ] Create Thread
  * [ ] View All Threads
  * [ ] Create Post
