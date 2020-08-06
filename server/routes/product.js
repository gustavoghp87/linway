const express = require('express');
const router = express.Router();
const {Product} = require("../models/Product");
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');
const path = require('path');


router.post('/create-pdf', (req, res) => {
    console.log("Create-pdf:", req.body)
    pdf.create(pdfTemplate(req.body), {}).toFile(`pdfs/result_${req.body.time}.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});


router.get('/fetch-pdf', (req, res) => {
    console.log("Solicitud a fetch-pdf", req.query.time)
    let dir = path.join(__dirname, '..', '..', 'pdfs');
    // console.log("Directorio:", dir)
    res.sendFile(`${dir}/result_${req.query.time}.pdf`)
    // console.log("File:", `${dir}/result_${req.query.time}.pdf`)
});

router.post('/factura-nueva', async (req, res) => {
    console.log("factura nueva...")
    const Afip = require('@afipsdk/afip.js');
    const CUIT = 20329907482; 
    const afip = new Afip({CUIT});

    const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    console.log("Fecha:", fecha)

    const lastVoucher = await afip.ElectronicBilling.getLastVoucher(1,6); //Devuelve el número del último comprobante creado para el punto de venta 1 y el tipo de comprobante 6 (Factura B)

    let data = {
        'CantReg' 	: 1,  // Cantidad de comprobantes a registrar
        'PtoVta' 	: 1,  // Punto de venta
        'CbteTipo' 	: 6,  // Tipo de comprobante (ver tipos disponibles) 
        'Concepto' 	: 1,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
        'DocTipo' 	: 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
        'DocNro' 	: 0,  // Número de documento del comprador (0 consumidor final)
        'CbteDesde' 	: lastVoucher+1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
        'CbteHasta' 	: lastVoucher+1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
        'CbteFch' 	: parseInt(fecha.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
        'ImpTotal' 	: 121, // Importe total del comprobante
        'ImpTotConc' 	: 0,   // Importe neto no gravado
        'ImpNeto' 	: 100, // Importe neto gravado
        'ImpOpEx' 	: 0,   // Importe exento de IVA
        'ImpIVA' 	: 21,  //Importe total de IVA
        'ImpTrib' 	: 0,   //Importe total de tributos
        'MonId' 	: 'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
        'MonCotiz' 	: 1,     // Cotización de la moneda usada (1 para pesos argentinos)  
        'Iva' 		: [ // (Opcional) Alícuotas asociadas al comprobante
            {
                'Id' 		: 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
                'BaseImp' 	: 100, // Base imponible
                'Importe' 	: 21 // Importe 
            }
        ],
    };

    const response = await afip.ElectronicBilling.createVoucher(data);

    console.log("Response AFIPi:", response)
    console.log(response['CAE']); //CAE asignado el comprobante
    console.log(response['CAEFchVto']); //Fecha de vencimiento del CAE (yyyy-mm-dd)

    res.status(200).send("All right");
});


// información de un comprobante consumidor final:
router.get('/info-comprobante', async (res, req) => {
    const comprobante = req.query.comprobante;
    const voucherInfo = await afip.ElectronicBilling.getVoucherInfo(comprobante,1,6); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)

    if (voucherInfo === null) console.log('El comprobante no existe');
    else console.log('Esta es la información del comprobante:', voucherInfo);

    res.status(200).json({voucherInfo});
});





router.post("/uploadProduct", (req, res) => {

    //save all the data we got from the client into the DB
    console.log("Creando producto,", req.body)
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/getProducts", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    //console.log(findArgs)

    if (term) {
        let busqueda = [];
        let terminos = term.trim().split(' ');
        terminos.forEach(palabra => {
            busqueda.push( new RegExp(palabra, "i") )
        });
        
        //console.log(busqueda, skip, limit, sortBy, order, findArgs)

        Product.find(findArgs)
            .find( {$and: [ {$and: [ {$or: [{title:busqueda}, {description:busqueda}]}, {eliminado:false} ]}, {envio:false} ]} )
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    } else {
        console.log("aca")
        Product.find(findArgs)
            .find( {$and: [{eliminado:false}, {envio:false} ]})
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    }

});


//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array 


router.get("/products_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    //console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //console.log("productIds", productIds)

    //we need to find the product information that belong to product Id 
    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
        
});


router.get('/deleteProduct', async (req, res) => {
    productId = req.query._id;
    console.log("A REMOVER: ", productId)

    // Product.deleteOne({_id:productId}, (err, info) => {
    //     if (err) res.json({remove:false})
    //     res.json({remove:true})
    // })


    Product.updateOne({_id:productId}, {eliminado:true}, (err, info) => {
        if (err) res.json({remove:false})
        res.json({remove:true})
    })

});


router.post('/editProduct', (req, res) => {
    //console.log("A EDITAR: ", req.query)
    productId = req.query;
    console.log(req.body)
    const {title, description, price, types} = req.body;

    //console.log(title, description, price, types)

    Product.updateOne({_id:productId}, {title, description, price, types}, (err, info) => {
        console.log(info)
        if (err) res.json({edited:false})
        res.json({edited:true})
    });

});


module.exports = router;
