const connection = require("./key");

const createDB = () => {
    let sql = ' CREATE TABLE vasts_table_db(id int AUTO_INCREMENT, vast_url VARCHAR(600), position VARCHAR(255), width int, height int, PRIMARY KEY(id) ) ';
    connection.query(sql, (err, res) => {
    });

    let vast = { vast_url: 'https://example-vast.com', position: 'bottom_right', width: 200, height: 200 }
    sql = ' INSERT INTO vasts_table_db SET ? '
    connection.query(sql, vast, (err, res) => {
    });
};

module.exports = createDB;

