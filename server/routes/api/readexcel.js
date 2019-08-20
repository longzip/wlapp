const express = require('express');
const sql = require('mssql');
const path = require('path');
const readXlsxFile = require('read-excel-file/node');

const router = express.Router();

router.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: '111111',
        server: 'localhost', 
        database: 'laravel' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from material_groups', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

router.get('/read', (req, res) => {
    
    var filePath = path.resolve(__dirname,'../../public/excel/vd.xlsx');
    // File path.
    readXlsxFile(filePath).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        console.log(rows)
        res.send('test');
    })
    
});

module.exports = router;