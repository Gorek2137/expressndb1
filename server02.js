//var formidable = require('formidable');
var path = require("path")
var express = require("express")
var app = express()
const PORT = 3000;
var hbs = require('express-handlebars');
app.use(express.json());

app.use(express.static('static'))

const Datastore = require('nedb')
const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});




app.get("/handleform", function (req, res) {
    let obj = {
        ubezppieczenie: req.query.ubezpieczenie == 'on' ? "tak" : "nie",
        paliwo: req.query.benzyna == 'on' ? "tak" : "nie",
        stan: req.query.uszkodzony == 'on' ? "tak" : "nie",
        naped: req.query.naped4x4 == "on" ? "tak" : "nie",
    }
    console.log(obj)

    coll1.insert(obj, function (err, newDoc) {
        coll1.find({}, function (err, docs) {
            res.render('indexdb.hbs', {docs});
        });
    });
    

})


app.get("/delete", function (req, res) {
    
    coll1.remove({ _id: req.query.impostor }, {}, function (err, numRemoved) {
    console.log("usunięto dokumentów: ", numRemoved)
    res.redirect("/")
    })

})

app.get('/editthisbsplz', async (req, res) => {
    let obj = {
        ubezppieczenie: req.query.ubzepieczenie == 'tak' ? "tak" : req.query.ubzepieczenie == 'nie' ? "nie":"",
        paliwo: req.query.paliwo == 'tak' ? "tak" : req.query.paliwo == 'nie' ? "nie":"",
        stan: req.query.stan == 'tak' ? "tak" : req.query.stan == 'nie' ? "nie":"",
        naped: req.query.naped == 'tak' ? "tak" : req.query.naped == 'nie' ? "nie":""
    }
    coll1.update({_id:req.query.impostor},{ $set: obj },function(){res.redirect("/")})
    
});


app.get('/edit', async (req, res) => {
    coll1.find({}, function (err, docs) {
        for (let i=0; i<docs.length;i++) {
            if (docs[i]._id === req.query.impostor) {

                docs[i].edited = true;
            
            }
        }
        res.render("indexdb.hbs", {docs}); 
    });
    
    
});

app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    coll1.find({}, function (err, docs) {
        res.render('indexdb.hbs',{docs});
    });
    
})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

