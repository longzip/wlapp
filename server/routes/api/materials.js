const express = require('express');
const sql = require('mssql');

const config = require( "../../config" );

const router = express.Router();

// Get Uoms
router.get('/', async (req, res) => {
    let pool = await sql.connect(config)
    let result = await pool.request()
        .query('select * from materials')
        await sql.close();
    res.send(result.recordset);
});

// Add Uom
router.post('/', async (req, res) =>{
    let pool = await sql.connect(config)
    let result = await pool.request()
        .input('name', sql.NVarChar, req.body.name)
        .input('factor', sql.NVarChar, req.body.factor)
        .query('insert into uoms(name, factor) values(@name, @factor)');
    await sql.close();
    res.status(201).send();
});

// Update Uom
router.put('/:id', async(req, res) => {  
    let pool = await sql.connect(config)
    let result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .input('name', sql.NVarChar, req.body.name)
    .input('factor', sql.NVarChar, req.body.factor)
    .query('update uoms set name = @name, factor = @factor where id = @id');
    await sql.close();
    res.status(200).send({});
});

// Delete Uom
router.delete('/:id', async(req, res) => {
    await sql.close();
    let pool = await sql.connect(config)
    let result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('delete from uoms where id = @id');
    await sql.close();
    res.status(200).send({});
});

module.exports = router;