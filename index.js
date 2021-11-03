require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { HotSauce } = require('./models/hotsauce');
const mongoose = require('mongoose');

// connect db
connectDB();



const app = express();


const PORT = process.env.PORT || 7017;
//const db = require('./config/keys').mongoURI;

app.use(cors());
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.get('/', (req, res) => {
//    // res.send('<h1>No Java</h1>');
//     res.sendFile('./views/index.html', { root: __dirname });
// });

// app.get('/practice', (req, res) => {
//    // res.send('<h1>Practice Page</h1>');
//      res.sendFile('./views/practice.html', { root: __dirname });
// });

// app.use((req, res) => {
//     res.status(404).sendFile('./views/404.html', { root: __dirname })
// })

// Create data

app.post('/', async (req, res) => {
    console.log(req.body, 'postdata');

    const checkDataExit = await HotSauce.findOne({ name: req.body.name });
    
    if (checkDataExit) {
        res.send({
            msg: 'Sauce already exists'
        });
    } else {
        const data = new HotSauce({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        thumbnail: req.body.thumbnail
    });
    data.save((err, result) => {
        if (err) {
            console.log('Failed to create');
        } else {
            res.send({
                msg: 'Data Created',
                data: result
            });
        }
    });
    }
});

// Update 
app.put('/:id', async (req, res) => {
    const updateData = await HotSauce.updateOne({ _id: req.params.id }, {$set:{ name: req.body.name }});
    if (updateData) {
        res.send({
            msg: 'Data updated'
        })
    }
});

// Read Data

app.get("/", async (req, res) => {
    console.log('getdata');

    const data = await HotSauce.find();

    if (data) {
        res.send({
            msg: 'all data',
            result: data
        });
    } else {
        res.send({
            msg: 'No Data'
        });
    }
});

// Get data id
app.get('/:id',async (req,res)=>{
    console.log(req.params.id,'ids');
    if(req.params.id)
    {
        const checkId = mongoose.isValidObjectId(req.params.id);
        if(checkId===true)  {
            const dataId = await HotSauce.findById({_id:req.params.id});
            if(dataId==null)  {
                res.send({
                    msg:'single data not data',
                    result:dataId
                })
            }  else  {
                res.send({
                    msg:"single data ",
                    result:dataId
                });
            }
        }  else  {
            res.send({
                msg:"invalid user id"
            })
        }
    }
});

// DElete

app.delete('/:id', async (req, res) => {
    console.log('deleted', req.params.id);
    const checkValidId = mongoose.isValidObjectId(req.params.id);
    if (checkValidId == true) {
        const dataId = await HotSauce.deleteOne({ _id: req.params.id });
        if (dataId == null) {
            res.send({
                msg: 'data not found'
            });
        } else {
            res.send({
                msg: 'data deleted'
            });
        };
    } else {
        res.send({
            msg: 'invalid id'
        })
    }
});





app.listen(PORT, () => {
    console.log(`Server is on: ${PORT}`);
});