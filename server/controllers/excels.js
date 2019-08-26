const xlsx = require('xlsx');
const path = require('path');

// let file = path.
module.exports = {
    read: (req, res) => {
        let result = {};
        let status = 201;
        let fileName = path.join(__dirname, "../public/excel/tuan.xls");
        let wb = xlsx.readFile(fileName);
        
        console.dir(xlsx.utils.sheet_to_json(wb.Sheets));
        result.status = status;
        result.result = "sdfdsf";
        return res.status(status).send(result);
    },

    save: (req, res) => {

    }
}