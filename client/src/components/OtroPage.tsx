import React, {useState} from 'react';
import Axios from 'axios';
import {saveAs} from 'file-saver';


function LandingPage() {

    const [name, setName] = useState('')
    const [receiptId, setReceiptId] = useState(0);
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(0);

    const handleChange1 = ({target: {value, name}}) => setName(value);
    const handleChange2 = ({target: {value, name}}) => setReceiptId(parseInt(value));
    const handleChange3 = ({target: {value, name}}) => setPrice1(parseFloat(value));
    const handleChange4 = ({target: {value, name}}) => setPrice2(parseFloat(value));

    let time:number = 0;
    let State = {name, receiptId, price1, price2, time};
    
    const createAndDownloadPdf = () => {
        State.time = Date.now();
        Axios.post('http://localhost:5000/api/product/create-pdf', State)
            .then( () => Axios.get(`http://localhost:5000/api/product/fetch-pdf?time=${State.time}`, {responseType:'blob'}))
            .then( res => {
                console.log("Respuesta de fetch-pdf", res)
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, `recibo_${State.time}.pdf`);
            });
    };

    // console.log("State ghp:", State)
    
    return (
        <div>
            <h2 style={{textAlign:'center'}}> Otro! </h2>

            <input type="text" placeholder="Name" name="name" onChange={handleChange1}/>
            <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange2} />
            <input type="number" placeholder="Price 1" name="price1" onChange={handleChange3} />
            <input type="number" placeholder="Price 2" name="price2" onChange={handleChange4} />
            <button onClick={createAndDownloadPdf}>Download PDF</button>

        </div>
    );
}


export default LandingPage
