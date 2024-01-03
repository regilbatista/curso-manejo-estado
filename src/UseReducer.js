import React from "react";

const SECURITY_CODE = 'paradise';

function UseReducer({ name }){
    
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () => dispatch({ type: actionTypes.reset });
    
    const onWrite = ({target: {value}}) => {
        dispatch({ type: actionTypes.write, payload: value });
    }
    
    React.useEffect(() => {
        console.log("Empezando el efecto")
        if(state.loading){
            setTimeout(() => {
                console.log("Haciendo la validacion")
                if (state.value === SECURITY_CODE){
                    console.log(state.value);
                    onConfirm();
                } else{
                    console.log(state.value);
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
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}
                > comprobar </button>
            </div>
        )
    } else if (!state.delete && !!state.confirmed){
        return(  <React.Fragment>
            <p>¿Estas segurx de que quieres eliminar?</p>
            
            <button onClick={onDelete}>
                Si, eliminar
            </button>
            <button onClick={onReset}> 
                No, me arrenpentí
            </button>
        </React.Fragment>)
    } else {
        return(<React.Fragment>
            <p>Eliminado con éxito</p>
            <button onClick={onReset}> 
                Resetear, volver atras
            </button>
        </React.Fragment>)
    }
}
const initialState = {
    value: '',
    error: false,
    loading: false,
    delete: false,
    confirmed: false
};
const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
    write: 'WRITE'
};
//usando reducer con object
const reducerObject = (state, payload) =>({  
    
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true
    },[actionTypes.error]: {
        ...state ,
        error: true,
        loading: false
    },[actionTypes.check]: {
        ...state ,
        loading: true
    }, [actionTypes.delete]:{
        ...state,
        delete: true 
    }, [actionTypes.reset]: {
        ...state,
        confirmed: false, 
        delete: false,
        value: '',
    }, [actionTypes.write]:{
        ...state,
        value: payload
    }
        
});
const reducer = (state, action) =>{  
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
};
export { UseReducer };


// const reducer = (state, action) =>{   
// };

// //usando reducer con if

// const reducerIf = (state, action) =>{  
//     if(action.type === 'ERROR'){
//         return{
//             ...state ,
//             error: true,
//             loading: false
//         };
//     } else if (action.type === 'CHECK') {
//        return{ 
//             ...state, 
//             loading: true
//         };
//     } else{
//         return{
//             ...state,
//         }
//     }
// };


// //usando reducer con switch
// const reducerSwitch = (state, action) =>{  
//     switch(action.type){
//         case 'ERROR':
//             return{
//                 ...state ,
//                 error: true,
//                 loading: false
//             };
//         case 'CHECK':
//             return{
//                 ...state ,
//                 loading: true
//             };
//         default:
//             return{
//                 ...state,
//             }
//     }
// }