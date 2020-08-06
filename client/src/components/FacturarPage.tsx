import React from 'react';
import {Button} from 'react-bootstrap';
import Axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, log} from '../_actions';


function LandingPage() {

    let presentation = {marginRight:'15%', marginLeft:'15%', marginTop:'1%', marginBottom:'15%'};
    try {
        //console.log("ANCHO", window.screen.width)
        if (window.screen.width<=767) {
          presentation = {marginRight:'10px', marginLeft:'10px', marginTop:'1%', marginBottom:'15%'};
        }
    } catch(e) {};

    const facturaNueva = () => {
        console.log("click")
        Axios.post('http://localhost:5000/api/product/factura-nueva', {data:{dato:"ok"}})
            .then( resp => {console.log("All right", resp)} )
    };

    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();
    
    return (

        <div style={presentation} id="presentation">

            <h2 style={{textAlign:'center'}}> All right! </h2>

            <Button variant="primary" onClick={()=>facturaNueva()}>AFIPi</Button>{' '}

            <br/><br/>
            <h1>Contador: {counter}</h1>
            <button onClick={() => dispatch(increment())}>+1</button>
            <button onClick={() => dispatch(decrement(1))}>-1</button>
            <button onClick={() => dispatch(decrement(2))}>-2</button>

            {isLogged ? <h2>Está logueado</h2> : <h2>No está logueado</h2>}
            <button onClick={() => dispatch(log())}>LogIn/LogOut</button>

        </div>
    );
}


export default LandingPage
