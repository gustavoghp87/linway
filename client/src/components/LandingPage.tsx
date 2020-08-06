import React from 'react';


function LandingPage() {

    let presentation = {marginRight:'15%', marginLeft:'15%', marginTop:'1%', marginBottom:'15%'};
    try {
        //console.log("ANCHO", window.screen.width)
        if (window.screen.width<=767) {
          presentation = {marginRight:'10px', marginLeft:'10px', marginTop:'1%', marginBottom:'15%'};
        }
    } catch(e) {}

    
    return (

        <div style={presentation} id="presentation">

            <h2 style={{textAlign:'center'}}> All right! </h2>

        </div>
    );
}


export default LandingPage
