const express = require("express")
const mongoose =require("mongoose")

const app = express()
 const cors = require("cors")
 app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/Employee")
.then(()=> console.log("connected to mongodb........."))
.catch((err)=> console.log(err))

const EmpSchema = mongoose.Schema({
    Empid : Number,
    Empname : String,
    Empsalary : Number

})
const Empmodel = mongoose.model('Empinfo',EmpSchema)

app.get('/empget', async (req , res) => {

    try{ 
        const data = await Empmodel.find();
        res.send(data)
    }
    catch(error){
        console.log(error)
    }
})

app.post('/emppost', async (req,res) =>{
    try{
        const {Empid,Empname,Empsalary} = req.body;

        const Empdata = new Empmodel({
            Empid, Empname, Empsalary
        })
        const userdata = await Empdata.save()
        res.send({ userdata })
    }
    catch(error){
        console.log(error)
    }
})

app.delete('/empdelete/:id', async (req,res) =>{
    try{
        const id = req.params.id
        const data = await Empmodel.findByIdAndDelete(id)
        res.send("grvbhjkjebe")
    }
    catch(error){
        console.log(error)
    }
})


app.put('/updatedata/:id', async (req, res) => {
    const { id } = req.params;
    const { Empid , Empname , Empsalary } = req.body;

 
    try {
       const updatedEmp = await Empmodel.findByIdAndUpdate(
          id, { Empid , Empname , Empsalary });
 
       if (!updatedEmp) {
          return 
          res.status(404).send({ error: 'Student not found' });
       }
 
       res.send(updatedEmp);
    } catch (error) {
       res.status(500).send(error);
    }
 });

app.listen(8000, () => {
    console.log("Port running on local host 8000")
})