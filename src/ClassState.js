import React from "react";
import { Loading } from "./Loading";


const SECURITY_CODE = 'paradise';
class ClassState extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false
        };
    }

    // UNSAFE_componentWillMount(){
    //     console.log("componentWillMount")
    // }

    // componentDidMount(){
    //     console.log("componentDidMount")
    // }

    componentDidUpdate(){
        console.log("updating")
        
            setTimeout(() => {
                console.log("Haciendo la validacion")

                if(SECURITY_CODE === this.state.value){
                this.setState({error: false, loading: false});
                } else{
                    this.setState({error: true, loading: false});
                }
                console.log("Terminando la validacion")
            }, 3000);
        }

        
        
    render(){
        const{ error, loading, value } = this.state;
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad para comprobar </p>
                
                {(error && !loading) && (
                <p>
                    Error: El código es incorrecto
                </p>
            )}
            
            {loading && (
                <Loading />
            )}
                <input 
                    placeholder="Código de  seguridad"
                    value={ value }
                    onChange={(event) => {
                        this.setState({value: event.target.value})
                    }}
                />
                <button
                onClick={() => 
                    this.setState(prevState => ({loading: true}))}
                >comprobar</button>
            </div>
        );
    }
}

export { ClassState }