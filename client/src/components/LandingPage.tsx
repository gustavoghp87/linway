import React from 'react';
import {Button} from 'react-bootstrap';
import Axios from 'axios';


function LandingPage() {

    let presentation = {marginRight:'15%', marginLeft:'15%', marginTop:'1%', marginBottom:'15%'};
    try {
        //console.log("ANCHO", window.screen.width)
        if (window.screen.width<=767) {
          presentation = {marginRight:'10px', marginLeft:'10px', marginTop:'1%', marginBottom:'15%'};
        }
    } catch(e) {}

    const facturaNueva = () => {
        console.log("click")
        Axios.post('http://localhost:5000/api/product/factura-nueva', {data:{dato:"ok"}})
            .then( resp => {console.log("All right", resp)} )
    };
    
    return (

        <div style={presentation} id="presentation">

            <h2 style={{textAlign:'center'}}> All right! </h2>

            <Button variant="primary" onClick={()=>facturaNueva()}>AFIPi</Button>{' '}

        </div>
    );
}


export default LandingPage
