const express = require("express");
const db = require("./db");
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());



app.listen(3000, () => console.log("Server is running on port 3000"));

app.post("/user/createticket", async (req, res) => {
  console.log(req.body);
  const { title, description, contact }  = req.body;
  const status = "pending";
  console.log(title,description,contact);
  try {
    db.query(
      "INSERT INTO ticket_detail(title, description,contact,status) VALUES (?,?,?,?)",
      [title, description, contact, status],
      (err, results, field) => {
        if (err) {
          console.log(
            "Error while inserting a ticket_detail into the database",
            err
          );
          return res.status(400).send();
        }
        return res.status(200).json({ message: "Insert succesfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.get("/user/gettickeet_detail", async (req,res) => {
  try{
      db.query("SELECT id,title,description,status,DATE_FORMAT(create_date, '%d/%m/%Y') AS create_date,DATE_FORMAT(update_date, '%d/%m/%Y') AS update_date FROM ticket_detail",
      (err,result,field) => {
          if(err){
              console.log(err);
              return res.status(500).json({message: "Error retrieving ticket details from database"});
          }
          res.status(200).json({data:result});
      })
  }catch (err){
      console.log(err);
      return res.status(500).json({message: "Error retrieving ticket details from database"});
  }
});



// app.delete("/user/delect/ticket-detail/:id" , async (req,res) => {
//     const id = req.params.id;
//     try{
//         db.query("DELETE FROM ticket_detail WHERE id = ?",[id],
//         (err,result,field) => {
//             if(err){
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             if(results.affectedRows ===0){
//             return res.status(404).json({message: "Don't Have Data" }); }
//             return res.status(200).json({message: "Delect succesfully"})
//         })
//     }catch (err){
//         console.log(err);
//         return res.status(500).send();
//     }
// })

app.patch("/admin/update/stsatus/:id" , async (req,res) => {
    const id = req.params.id;
    const newStatus = req.body.newStatus;
    try{
        db.query("UPDATE ticket_detail SET status= ? ,update_date = now() WHERE id = ?",[newStatus,id],
        (err,result,field) => {
            if(err){
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({message: "Update status succesfully",data:result });
        })
    }catch (err){
        console.log(err);
        return res.status(500).send();
    }
})