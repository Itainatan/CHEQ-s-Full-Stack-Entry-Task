const express = require("express");
const router = express.Router();
const vasts = require("../utils/key");
const getXml = require("../utils/xml");
var xml = require('xml');

router.get("/fetch_vasts", ({ }, res) => {
    returnList(res);
});

router.post("/create_vast", (req, res) => {
    const { vast } = req.body;
    let sql = ' INSERT INTO vasts_table_db SET ? '
    makeQuery(sql, vast, res);
});

router.post("/edit_vast", (req, res) => {
    const { vast } = req.body;
    let sql = ` UPDATE vasts_table_db SET ? WHERE id = ${vast.id} `
    makeQuery(sql, vast, res);
});

router.get("/vast/id=:id", (req, res) => {
    const { id } = req.params;
    const sql = ` SELECT * from vasts_table_db WHERE id = ${id} `
    vasts.query(sql, (err, response) => {
        if (err) res.status(404).json("")
        else res.status(200).json({
            xmlResponse: xml(getXml(response))
        });
    });
});

makeQuery = (sql, vast, res) => {
    vasts.query(sql, vast, (err) => {
        if (err) res.status(404).json("");
        else returnList(res)
    });
}

returnList = (res) => {
    let sql = ' SELECT * from vasts_table_db '
    vasts.query(sql, (err, response) => {
        if (err) res.status(404).json("");
        else res.status(200).json({ list: response });
    });
}

module.exports = router;