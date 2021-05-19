## Docs

### Users endpoints

Login User:

```
POST users/signin
```

Create a new user:

```
POST users/signup
```

Delete User:

```
DELETE users/delete
```

Update User:

```
PATCH users/update
```

Get all Users Posts:

```
GET /users/:userID/posts
```

Get all Users Friends:

```
GET /users/:userID/friends
```

### Post endpoints

Create new post:

```
POST /posts/
```

Edit post:

```
PATCH /posts/:postID
```

Delete post:

```
DELETE /posts/:postID
```

Get a single post:

```
GET /posts/:postID
```

### Likes endpoints

Like/Unlike a post:

```
POST /likes
```

### Friends endpoints

Add a friend:

```
POST /friends/add
```

Remove a friend:

```
POST /friends/remove
```
