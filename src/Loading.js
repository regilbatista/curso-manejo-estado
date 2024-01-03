import React from "react";

class Loading extends React.Component{

    componentWillUnmount(){
        
    }

    render(){
        return (
            <div>
                <p>
                    Cargando...
                </p>
            </div>
        );
    }
}

export { Loading }