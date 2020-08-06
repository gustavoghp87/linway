import React from 'react';


function Footer() {

    const estilo2 = {
        fontSize: window.screen.width<767 ? '1.5rem' : '1rem',
        paddingTop: '20px',
        paddingBottom: '20px',
        backgroundColor: '#343a40',
        height: '200px'
    };
    
    
    return (

        <>
        <div className="main-footer" style={estilo2}>

            <div style={{display:'flex', margin:'auto', textAlign:'center', alignItems:'center', justifyContent:'center'}}>

                <span style={{display:'inline-block'}}>
                    <a href="https://glamstudio.com.ar" style={{color:'white', fontWeight:'600'}}>
                    &nbsp; </a>
                </span>
                <span style={{display:'inline-block'}}>
                    
                </span>
            </div>
        </div>
        </>
    )
}


export default Footer
