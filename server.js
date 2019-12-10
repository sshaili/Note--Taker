// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');
var shortid = require("shortid");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  })
  
// TO GET EXISTING NOTES USING GET
// =============================================================

  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
  })


// TO ADD NEW NOTES USING POST
// =============================================================
  app.post("/api/notes", function(req, res) {
    fs.readFile("db/db.json", function(err, data) {
      if (err) {
        console.log('Error!');
      } 
    let allNotes = JSON.parse(data);
    var newNote = {
      title: req.body.title,
      text: req.body.text,
      id: shortid.generate()
    }

    allNotes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(allNotes), (error) => {
      if (error) {
        throw error;
      };
      res.send('200');
    })
  });

    });
  
// DELETE NOTES USING DELETE
// =============================================================
    app.delete("/api/notes/:id", function(req, res) {
      fs.readFile("db/db.json", function(err, data) {
        if (err) {
          console.log('Error!');
        } 
        let allNotes = JSON.parse(data);
        let deleteNotes = req.params.id;
          for (var i = 0; i < allNotes.length; i++){
            if(allNotes[i].id===deleteNotes){
              allNotes.splice(i, 1);  
          }
        }
        fs.writeFile("./db/db.json", JSON.stringify(allNotes), (error) => {
          if (error) {
            throw error;
          };
          res.send('200');
        })
      })
    });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
