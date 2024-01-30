const express = require('express')
const mongoose=require('mongoose')
const app = express()
const port = process.env.PORT||3000
const expense =require('./models/expense')
mongoose.connect('mongodb+srv://sridevi:sri1802@cluster0.8nurjy5.mongodb.net/expense?retryWrites=true&w=majority',{ //to connect the monngoose(const,mongoose connect,find command)
    useUnifiedTopology:true
});
app.use(express.json())
app.get('/expense', async (req, res) => 
{
    const result=await expense.find();//to fetch the data from the mongodb
    res.send(result)
        // res.send('<h1>Hello world</h1>')
});
 
//to get datas from the mongodb api
// app.get('/:id', async (req, res) => {
//     try{
//     const id=req.params.id;
//     // console.log(req.params)
//      const result=await expense.findById(id);//to fetch the data from the mongodb
//     //  res.send(result)
//   res.send('<h1>Hello world</h1>')
// if(result)
//     res.send(result);
// else
//     res.send("No responses Found!!!");
// }catch(err){
//     res.send(err)
// }
// })

// to delete the data
app.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const result=await expense.findById(id);
        if(result)
            res.send(result);
        else    
            res.send("no expenses with that id");
    }catch(err){
        res.send(err)
    }
});

//post cant be get in browser ,use in postman software
app.post('/expense', async(req, res) => {
    res.send('<h1>Hi world</h1>')
    console.log(req.body)  //to add data in database
    const newexpense=req.body;
    await expense.create(newexpense)
    res.send('created')
  });

app.put('/expense/:id',async(req,res)=>{
    const id=req.params.id;
    const updateObject=req.body;
    const updatedObject=await expense.findByIdAndUpdate(id,{$set:updateObject},{
    new:true
})
res.send(updatedObject);
})

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})