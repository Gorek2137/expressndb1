



var path = require("path")
var express = require("express")
var app = express()
const PORT = 3000;
app.use(express.json());
const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
// const doc = {
//     a: "a",
//     b: "b"
// };

// coll1.insert(doc, function (err, newDoc) {
//     console.log("dodano dokument (obiekt):")
//     console.log(newDoc)
//     console.log("losowe id dokumentu: " + newDoc._id)
// });

// console.log("PRZED FOR: " + new Date().getMilliseconds())
// for (var i = 0; i < 3; i++) {
//     var doc = {
//         a: "a" + i,
//         b: "b" + i
//     };
//     coll1.insert(doc, function (err, newDoc) {
//         console.log("id dokumentu: " + newDoc._id, "DODANO: " + new Date().getMilliseconds())
//     });
// }
// console.log("PO FOR: " + new Date().getMilliseconds())

// coll1.findOne({ _id: 'pGePrrwqkSgUdEO2' }, function (err, doc) {
//     console.log("----- obiekt pobrany z bazy: ", doc)
//     console.log("----- formatowanie obiektu js na format JSON: ")
//     console.log(JSON.stringify(doc, null, 5))
// });

// coll1.find({}, function (err, docs) {
//     //zwracam dane w postaci JSON
//     console.log("----- tablica obiektów pobrana z bazy: \n")
//     console.log(docs)
//     console.log("----- sformatowany z wcięciami obiekt JSON: \n")
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });

// coll1.find({ a: "a1" }, function (err, docs) {
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });
// coll1.count({}, function (err, count) {
//     console.log("dokumentów jest: ", count)
// });
// coll1.count({ a: "a1" }, function (err, count) {
//     console.log("dokumentów jest: ", count)
// });
// coll1.remove({ a: "a2" }, {}, function (err, numRemoved) {
//     console.log("usunięto dokumentów: ", numRemoved)
// });
// coll1.remove({ a: "a1" }, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto dokumentów: ", numRemoved)
// });
coll1.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("usunięto wszystkie dokumenty: ", numRemoved)
});