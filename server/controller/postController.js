const Post = require('../model/post');

// Create and Save a new post
exports.create = (req, res) => {
   
    // Create a post
    const post = new Post({

        username: req.body.username,
        avator_image_url: req.body.avator_image_url,
        image_url: req.body.image_url,
        total_likes: req.body.total_likes,
        islike: req.body.islike,
        brand: req.body.brand,
        brand_title: req.body.brand_title,
        brand_detail: req.body.brand_detail,
        tags: req.body.tags
    });
    

    // Save Note in the database
    post.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the posts."
        });
    });
};

// Retrieve and return all posts from the database.
exports.findAll = (req, res) => {
    Post.find()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single post with a postId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });            
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving post with id " + req.params.postId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    inc_num = 0;
    if (req.body.isFav){
        inc_num = -1;
    }else if(req.body.island){
        inc_num = 1;
    }

    // Find post and update it with the request body
    Post.findByIdAndUpdate(req.params.postId, {
        
        $inc: {total_likes: inc_num},
        islike: req.body.islike

        // username: req.body.username,
        // avator_image_url: req.body.avator_image_url,
        // image_url: req.body.image_url,
        // total_likes: req.body.total_likes,
        // islike: req.body.islike,
        // brand: req.body.brand,
        // brand_title: req.body.brand_title,
        // brand_detail: req.body.brand_detail,
        // tags: req.body.tags

    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error updating post with id " + req.params.postId
        });
    });

};



// Delete a post with the specified postId in the request
exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });
        }
        res.send({message: "post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.postId
        });
    });
};