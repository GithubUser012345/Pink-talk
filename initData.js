const mongoose = require('mongoose');
const Chat = require("./schema.js");

let allChats = [
    {
        from: "krishna",
        to: "kamal",
        msg: "Long time no see!",
        created_at: new Date(),
    },
    {
        from: "mouny",
        to: "manisha",
        msg: "I need your practical notes",
        created_at: new Date(),
    },
    {
        from: "abhai",
        to: "akshit",
        msg: "what are the timings",
        created_at: new Date(),
    },
];

module.exports = allChats;