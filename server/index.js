const express = require('express')
import dbConfig from './config/db';
import middleWareConfig from './config/middleware';
import {userRoutes} from '../src/authModule';
import {videoUploadRoutes} from '../src/videoModule'

const app = express();
dbConfig();
middleWareConfig(app)

app.use('/api', [userRoutes, videoUploadRoutes])

const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`server running on ${PORT}`))