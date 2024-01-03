import React from "react";

const SECURITY_CODE = 'paradise';

function UseState({ name }){
    
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        delete: false,
        confirmed: false
    });

    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true
        });
    }
    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    }

    const onCheck = () => {
        setState({  
            ...state, 
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            delete: true 
        });
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false, 
            delete: false,
            value: '',
        });
    }

    const onWrite = (newValue) => {
        setState({  ...state, value: newValue})
    }
    React.useEffect(() => {
        console.log("Empezando el efecto")

        if(state.loading){
            
            setTimeout(() => {
                console.log("Haciendo la validacion")

                if (state.value === SECURITY_CODE){
                    onConfirm();
                } else{
                    onError();
                }
                
                console.log("Terminando la validacion")
            }, 3000);

        }
        console.log("Terminando el efecto")
    }, [state.loading]);
    
    if (!state.delete && !state.confirmed) {
        return(
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad para comprobar </p>
                {(state.error && !state.loading) && (
                    <p>
                        Error: El código es incorrecto
                    </p>
                )}
                {state.loading && (
                    <p>
                        Cargando...
                    </p>
                )}
                <input 
                    placeholder="Código de  seguridad"
                    value={state.value}
                    onChange={(event) =>{
                    onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => onCheck() }
                > comprobar </button>
            </div>
        )
    } else if (!state.delete && !!state.confirmed){
        return(  <React.Fragment>
            <p>¿Estas segurx de que quieres eliminar?</p>
            
            <button
                onClick={() => {
                    onDelete();
                }}
            >
                Si, eliminar
            </button>
            <button
                onClick={() => {
                    onReset();
                }}
            > 
            No, me arrenpentí</button>
        </React.Fragment>)
    } else {
        return(<React.Fragment>
            <p>Eliminado con éxito</p>
            <button
                onClick={() => {
                    onReset()
                }}
            > 
            Resetear, volver atras</button>
        </React.Fragment>)
    }
}

export { UseState };