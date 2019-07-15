// @ts-check
const mysql = require('mysql');
const express = require('express');
let app = express();
const bodyparser =require('body-parser');
const cors = require('cors');

app.use(bodyparser.json());
app.use(cors());


let mysqlconncstion = mysql.createConnection({
  host     : 'sql7.freemysqlhosting.net',
  user     : 'sql7298647',
  password : '1FyF2RCWzL',
  database : 'sql7298647'
});

mysqlconncstion.connect((err)=>{
  if(!err)
  console.log('db is connected')
  else
  console.log('db connection FAILD ! ! ! ' + JSON.stringify(err,undefined,2))
});

app.listen(4000,()=>console.log('express running on port no : 4000'));
app.get('/servers', (req,res) => {
  mysqlconncstion.query('SELECT servers.*, hostings.name as hosting_name FROM servers LEFT JOIN hostings ON `servers`.`hosting_id` = `hostings`.`id` ', (err, rows, fileds) => {
    if (!err) { 
      res.send(rows);
    } else {
      res.sendStatus(500);
      console.log(err);
    }
  });
});

app.get('/hosting', (req, res) => {
  mysqlconncstion.query('SELECT * from hostings', (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      res.sendStatus(500);
      console.log(err);
    }
  })
});


app.put('/status', (req, res) => {
  const { serverId, status } = req.body;
  mysqlconncstion.query(`UPDATE servers SET status=${status} WHERE id=${serverId}`, (err) => {
    if (!err) {
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  });
});

app.post('/servers', (req, res) => {
  const { name, ip, hostingId } = req.body;
  console.log(name, ip, hostingId);
  mysqlconncstion.query(`INSERT INTO servers (name, ip, hosting_id) VALUES ('${name}', '${ip}', '${hostingId}')`, (err) => {
    if (!err) {
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  });
});

app.delete('/servers/:id', (req, res) => {
  const { id } = req.params;
  mysqlconncstion.query(`DELETE FROM servers WHERE id = ${id}`, (err) => {
    if (!err) {
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  })
});
