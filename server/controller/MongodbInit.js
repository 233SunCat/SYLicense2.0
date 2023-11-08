const mongoose = require('mongoose');

//测试链接缉
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })  
  .then(() => {  
    console.log('Database connected');  
  })  
  .catch((err) => {  
    console.error('Error connecting to database:', err);  
  });