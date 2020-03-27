import React, {Component} from "react";

class Publicaciones extends Component{
    render(){
        return(
            <div>
                <h3>{`Hola ${this.props.match.params.key}`}</h3>
            </div>
        );
    }
}

export default Publicaciones;