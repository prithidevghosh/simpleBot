const express = require('express');
const sequelize=require('./utils/ormConfig.js')
const app = express();




app.listen(3000, (error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log('server started at 3000');

})