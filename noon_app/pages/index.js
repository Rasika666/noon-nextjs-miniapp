import MainLayout from '../componets/MainLayout';
import Post from '../componets/Post';
import NavBar from '../componets/NavBar';

class Index extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      isFav: false,
      island: true,
      posts: []
    }

    this.updateState = this.updateState.bind(this);
  }

  
  async componentDidMount(){
    const res = await fetch('http://localhost:8080/posts');
    const data = await res.json();

    this.setState({
      posts: data
    });
    
    
  }

  clickHome = () =>{

    this.setState({
      isFav: false,
      island: true
    });

    this.forceUpdate();

    
  }

  clickFav = () => {

    this.setState({
      isFav: true,
      island: false
    });

    this.forceUpdate();

    
  }

  updateState = (id, islike, t_num) => {
    
    //update the object
    const newPostList = this.state.posts.map(obj => {
      if(obj._id == id) {
        const updateitem = {
            ...obj,
            total_likes: t_num,
            islike: islike
        };

        return updateitem;
      }
      return obj
    });

    this.setState({
      posts: newPostList
    });
  }

  render() {

    const {isFav, island} = this.state;
    
    return (
      <MainLayout>
      
        <>

          {this.state.posts.map(obj => {
            if (this.state.isFav && obj.islike){
              return(
                <Post 
                  key = {obj._id}
                  id = {obj._id}
                  username= {obj.username}
                  avator_image_url = {obj.avator_image_url} 
                  image_url = {obj.image_url}
                  total_likes= {obj.total_likes}
                  islike = {obj.islike} 
                  brand = {obj.brand}
                  brand_title = {obj.brand_title} 
                  brand_detail = {obj.brand_detail} 
                  tags = {obj.tags}
                  isFav = {isFav}
                  island = {island}
                  updateState = {this.updateState}
                /> 
              )
            } else if(this.state.island && !obj.islike) {
              return (
                <Post 
                  key = {obj._id}
                  id = {obj._id}
                  username= {obj.username}
                  avator_image_url = {obj.avator_image_url} 
                  image_url = {obj.image_url}
                  total_likes= {obj.total_likes}
                  islike = {obj.islike} 
                  brand = {obj.brand}
                  brand_title = {obj.brand_title} 
                  brand_detail = {obj.brand_detail} 
                  tags = {obj.tags}
                  isFav = {isFav}
                  island = {island}
                  updateState = {this.updateState}
                />
              )
            } 
          }
             
          )}
  
          </>
        
          <NavBar stateobj = {{isFav: this.state.isFav, island: this.state.island}}
            clickHome = {this.clickHome.bind(this)}
            clickFav = {this.clickFav.bind(this)}
          />


      </MainLayout>
    )
  }
}
  

export default Index;