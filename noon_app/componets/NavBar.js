

class NavBar extends React.Component {


    render() {
        const stylecss = {
            color: 'blue'
        };
    
        
        return(
            <footer>
                <div className="home">
                    <i onClick={() => this.props.clickHome()} 
                    style = {this.props.stateobj.island ? stylecss: null}
                    className="fa fa-home fa-3x"></i>
                </div>
                <div className="fav">
                    <i onClick={() => this.props.clickFav()} 
                    style = {this.props.stateobj.isFav ? stylecss: null}
                    className="fa fa-heart fa-3x"></i>
                </div>
            </footer>
        )
    }
 
}

export default NavBar;