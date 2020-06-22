class Post extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            islike: this.props.islike,
            total_likes: this.props.total_likes,
            isFav : this.props.isFav,
            island: this.props.island
            
        }
        

        this.onclickLikeBtn = this.onclickLikeBtn.bind(this); 
    }

    

    onclickLikeBtn = async (id) => {
        
        if(this.state.island) {
            //to update, check user does not like post, then update
            if(!this.state.islike){

                

                //update the db
                const res = await fetch('http://localhost:8080/posts/'+id,{
                    method: 'PUT',
                    body: JSON.stringify({
                        //update
                        island: this.state.island,
                        isFav: this.state.isFav,
                        islike: true
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    
                });
                
                const data = await res.json();

                this.setState({
                    islike: !this.state.islike,
                    total_likes: this.state.total_likes + 1
                });

                this.props.updateState(id, this.state.islike, this.state.total_likes)
                
            }
        
            // only update when user in fav page
        }else if(this.state.isFav){
            if(this.state.islike){


                //update the db
                const res = await fetch('http://localhost:8080/posts/'+id,{
                    method: 'PUT',
                    body: JSON.stringify({
                        //update
                        island: this.state.island,
                        isFav: this.state.isFav,
                        islike: false
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    
                });
                
                const data = await res.json();


                this.setState({
                    islike: !this.state.islike,
                    total_likes: this.state.total_likes - 1
                });

                this.props.updateState(id, this.state.islike, this.state.total_likes)
            }
        }

    }
    

    render() {
        const {id,username,avator_image_url, image_url, 
             brand, brand_title, brand_detail,tags} = this.props;

        

        const btnstyle = {
        color: 'red'
        };

        return(
        
        <div className="post">
            <div className="avatar">
                <div className="img-avatar">
                    <img src={avator_image_url} alt="profile image" />
                        <div className="name">{username}</div>
                </div>
            </div>
            <div className="image-box">
                <img src={image_url} alt="item" />
                <div className="img-text">
                    <div className="text">
                        
                        {brand_title} <br/>
                        <span>{brand}</span>
    
                    </div>
                    
                        <div className="icon">
                            {/*<!-- icon is here -->*/}
                            <i 
                            onClick={() => this.onclickLikeBtn(id)}
                            style = {this.state.islike ? btnstyle: null}
                            className="fa fa-heart fa-3x"></i>
                        </div>
                
                </div>
            </div>
    
            <div className="bottom-section">
                <div className="like-button">
                    {/*<!-- like button is here -->*/}
                    
                        <i className="fa fa-heart fa-2x"></i>
                    
                    <p>{this.state.total_likes} Likes</p>
                </div>
                <div className="details">
                    <p>  
                        {/*<!-- post details here -->*/}
                        {brand_detail}
                    </p>
                    <p className="tag">
                        {/*<!-- tags here -->*/}
                        {tags.map(elem => "#"+ elem+" ")}
                    </p>
                </div> <br/>
                <div className="comment-section"> View 12 comments</div>
            </div> <br/><br/>
            <hr/>
            


                <style jsx>{`
                    /* local css here*/ 
                    
                `}</style>

        </div>
        
        


        
        )
    }
}

export default Post;