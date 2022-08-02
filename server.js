import express from "express";
import { pool } from "./database.js";



//config server
const server = express();
const port = 8000; 
server.use(express.json());
server.use(express.static("static"));
var currentUser;
//routes
server
     //login request
    .post('/api/aniquote/userauthentication', async (req,res) => {
        //if the username or password field is empty return a console
        if ((req.body["username"] || req.body["password"]) === '') {
            console.log("undefined input on login submit")
            res.send("undefined input")
           } else {
            //otherwise if they are defined
                try {
                    //query database to find any matching password or username
                    const getUsers = (await (await pool.query('SELECT * FROM users WHERE username=$1 AND password=$2', [req.body["username"], req.body["password"] ])).rows[0]);
                    if (getUsers) {
                        currentUser = getUsers["userid"];
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                    
                } catch (error) {
                    console.error(error.message);
                }
            }
    })
    .post('/api/aniquote/savequote' , async (req, res) => {
        console.log('We got your save quote request!')
        let currentSave =  req.body.contents[0];
        if (currentSave === {}) {
            return [];
        } else {
            try {
                let saveQuotes = (await pool.query('INSERT INTO quotes (contents) VALUES ($1) RETURNING quoteid;', [currentSave]));
                let saveUnderUser = (await pool.query('INSERT INTO saves (quoteid, userid) VALUES ($1, $2);', [saveQuotes.rows[0]["quoteid"], currentUser]))
            } catch (error) {
                
            }
        }
        console.log(`Saved value: ${currentSave}`);
    })
  .get('/api/aniquote/getpins', async (req,res) => {
     try {
        const queryForPinId = (await pool.query('SELECT quoteid FROM saves WHERE userid = $1;',[currentUser]))
        const quoteIds = queryForPinId.rows;
        let array = [];
        for (const element of quoteIds) {
            let newId = element["quoteid"];
            const queryForPin = (await pool.query('SELECT * FROM quotes WHERE quoteid = $1;', [newId])).rows;
            array.push(queryForPin);
        }
        res.send(array);

     } catch (error) {
        console.error(error.message)
     }
  }) 
  //delete saved quotes by user id 
.post('/api/aniquote/deletepins', async (req, res) => {
    try {
        let quote = req.body["data"];
        console.log('we got your delete request on server side');
        const queryForPinId = (await pool.query('SELECT quoteid FROM saves WHERE userid = $1;',[currentUser]))
        const quoteIds = queryForPinId.rows;
        let array = [];
        for (const element of quoteIds) {
            let newId = element["quoteid"];
            const queryForPin = (await pool.query('SELECT * FROM quotes WHERE quoteid = $1;', [newId])).rows;
            array.push(queryForPin);
        }
        console.log(array);
        for (let i = 0; i < array.length; i++) {
            for(const element of array[i]) {
            if (quote == element["contents"]["quote"]) {
                let matchingId = element["quoteid"];
                console.log(`itmatches!: ${matchingId}`);
                await pool.query('DELETE FROM quotes WHERE quoteid = $1;', [matchingId]);
            }
            }
        }
    } catch (error) {
        
    }
})

//server listening on a port
server.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
})

