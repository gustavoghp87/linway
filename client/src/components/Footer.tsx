import React from 'react';


function Footer() {

    let estilo1 = {fontSize:38};
    let estilo2 = {fontSize:'1.5rem', paddingTop:'20px', paddingBottom:'20px', backgroundColor:'#eeeeee'};
    let estilo3 = {fontSize:35};
    let marginIg = {color:'violet', marginLeft:'40px'}

    try {
        if (window.screen.width<767) {
            estilo1 = {fontSize:25};
            estilo2 = {fontSize:'1rem', paddingTop:'20px', paddingBottom:'20px', backgroundColor:'#eeeeee'};
            estilo3 = {fontSize:20, marginLeft:'10px'};
            marginIg = {color:'violet', marginLeft:'5px'}
        }
    } catch(e) {}
    
    return (

        <>
        <p style={{textAlign:'center'}}>Ver <a href={'/condiciones-de-uso'}>Condiciones de Uso</a></p>

        <div className="main-footer" style={estilo2}>

            <div style={{display:'flex', margin:'auto', textAlign:'center', alignItems:'center', justifyContent:'center'}}>

                <span style={{display:'inline-block'}}>
                    <a href="https://glamstudio.com.ar" style={{color:'violet', fontWeight:'600'}}>
                    &nbsp; Linway </a>
                </span>
                <span style={{display:'inline-block'}}>
                    Footer
                </span>
            </div>
        </div>
        </>
    )
}


export default Footer
