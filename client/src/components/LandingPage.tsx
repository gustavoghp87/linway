import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';


function LandingPage(props:any) {

    interface Usuarios {
        usuarios: any[] 
    };

    interface Fotos {
        fotos: any[]
    };

    const [users, setUsers] = useState<Usuarios>({ usuarios: [] });
    const [photos, setPhotos] = useState<Fotos>({ fotos: [] });

    useEffect( () => {
        const retrieve = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const response1 = await fetch('https://jsonplaceholder.typicode.com/photos');
            const resJson = await response.json();
            const resJson1 = await response1.json();
            // console.log(resJson);
            setUsers({usuarios: resJson});
            setPhotos({fotos: resJson1});
        };
        retrieve();
    }, []);

    let presentation = {marginRight:'15%', marginLeft:'15%', marginTop:'1%', marginBottom:'15%'};
    try {
        //console.log("ANCHO", window.screen.width)
        if (window.screen.width<=767) {
          presentation = {marginRight:'10px', marginLeft:'10px', marginTop:'1%', marginBottom:'15%'};
        }
    } catch(e) {}
    
    const alerta = () => {
        props.history.push('/facturar')
    };

    return (

        <div style={presentation} id="presentation">

            <h2 style={{textAlign:'center'}}> All right! </h2>
            <br/>

            {users && users.usuarios.map((item) => {
                // console.log("ITEM:", item)
                return (
                    <Card style={{ width:'100%', marginBottom:'15px' }} key={item.id} onClick={() => alerta()}>
                        <Card.Body>
                            <Card.Title> {item.name} </Card.Title>
                            <Card.Text> {item.email} </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}

            {photos && photos.fotos.map((foto) => {
                // console.log("Photo:", foto.url);
                return (
                    <img src={foto.url} key={foto.id}/>
                )
            })}

        </div>
    );
};


export default LandingPage;
