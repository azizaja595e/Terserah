import express from 'express';

const app = express()

app.use((req,res,next) => {
    if(false) {
        next(new Error('Kau tuh salah tekak bantah'));
        return;
    }
    next ();
})

app.use((req,res,next) => {
    console.log(`Kau kesini dulu ${req.path}`);
    next();
});

app.get('/',(req,res) => {
    res.send('Hello Ziz!');
});

app.get('/say/:greeting', (req,res) => {
    const { greeting } = req.params;
    res.send( greeting );
});

app.use((err,req,res,next) => {
    res.send('Error dong');
});






app.listen(3000);