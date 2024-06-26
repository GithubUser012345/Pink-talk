const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
const Chat = require("./schema.js");
// const data = require("./initData.js");

app.set("view engine", "/views");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
main().then(() =>{
        console.log("connection success");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatspot');
}
// Chat.insertMany(data).then(res =>{
//         console.log(res);
//     }).catch(err =>{
//         console.log(err);
//     });

//index route
app.get("/chats", async (req,res) =>{
    let chats = await Chat.find({ });
    res.render("index.ejs", {chats});
});

//new post
app.get("/chats/new", (req,res) =>{
    res.render("new.ejs");
});

app.post("/chats", (req, res) =>{
    let {from: reqFrom, to: reqTo, msg: reqMsg} = req.body;
    let newChat = new Chat({
        from: reqFrom,
        to: reqTo,
        msg: reqMsg,
        created_at: new Date(),
    });
    newChat.save().then(() =>{
        res.redirect(`/chats`);
    }).catch((err) =>{
        res.send("<h1><i>Fill all the flieds</i></h1>");
    });
});

//edit route
app.get("/chats/:id/edit",async (req,res) =>{
    let {id} = req.params;
    let data = await Chat.findOne({_id: id});
    res.render("edit.ejs", {data});
});

app.put("/chats/:id/edit", (req,res) =>{
    let {id} = req.params;
    let newMsg = req.body.msg;
    let updatedMsg = Chat.findByIdAndUpdate({_id: id},{msg: newMsg}, {runValidators: true, new: true}).then(() =>{
        res.redirect("/chats");
    }).catch(() =>{
        res.send("Page lost in space, try again");
    })
});

//delete route
app.delete("/chats/:id",async(req,res) =>{
    let {id} = req.params;
    await Chat.findByIdAndDelete({_id: id});
    res.redirect("/chats");
})


app.get("/", (req,res) =>{
    res.send("this is root route");
})
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});