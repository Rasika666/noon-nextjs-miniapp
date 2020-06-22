module.exports = (app) => {
    const posts = require('../controller/postController');

    // Create a new Post
    app.post('/post', posts.create);

    // Retrieve all Post
    app.get('/posts', posts.findAll);

    // Retrieve a single Post with PostId
    app.get('/posts/:postId', posts.findOne);

    

    // Update a Post with PostId
    app.put('/posts/:postId', posts.update);


    // Delete a Post with PostId
    app.delete('/posts/:postId', posts.delete);
}