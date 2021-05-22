<!-- # API Documentation

## Users endpoints

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

## Post endpoints

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

## Likes endpoints

Like/Unlike a post:

```
POST /likes
```

## Friends endpoints

Add a friend:

```
POST /friends/add
```

Remove a friend:

```
POST /friends/remove
```

## Comment endpoints

Create a comment:

```
POST /comments/
```

Edit a comment:

```
PATCH /comments/:commentId
``` -->
<div class="postman-run-button"
data-postman-action="collection/import"
data-postman-var-1="251169c9de1050340f2d"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>
