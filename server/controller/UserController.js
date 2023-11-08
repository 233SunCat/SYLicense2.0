
app.post('/users', (req, res) => {  
    const { name, email, password } = req.body;  
    
    const newUser = new User({ name, email, password });  
    
    newUser.save()  
      .then(() => {  
        res.send('User created successfully');  
      })  
      .catch((err) => {  
        res.status(400).send('Error creating user: ' + err);  
      });  
  });