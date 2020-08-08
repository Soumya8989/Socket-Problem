
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
var mongoose = require("mongoose");
const accountSchema = require("../models/Account_Schema");
var accountService = require("../services/AccountService");

http.listen(port, () => {
    console.log('Node server running at port :', port);
});

io.on('connection', async (socket) => {


    console.log('5000 Socket ID : ', socket.id);


    /*-------------Account data------------*/

    socket.on('requestAccount', (data) => {
        let accountDetails = data;
        // console.log("getAccount", accountDetails.id);

        accountService.findAccountDetails(accountDetails.id).then((result) => {
            console.log("getAccount : ", result.account_name);
            io.to(socket.id).emit("getAccount", { data: [result] });

        });

        accountSchema.watch().on('change', (data) => {
            console.log(data);
            if (data.documentKey._id == accountDetails.id && data.operationType === 'replace' || data.operationType === 'update') {
                accountService.findAccountDetails(accountDetails.id).then((result) => {
                    console.log("getAccount in watch", result.account_name);
                    io.to(socket.id).emit("getAccount", { data: [result] });
                });
            }
        });

    });



    socket.on('disconnect', async () => {
        console.log('user disconnected from socket 5000', socket.id);
    });

});