
/*
 * GET users listing.
 */

var express = require('express');
var router = express.Router();

router.get('/albums', function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM album',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('albums',{page_title:"albums - Node.js",data:rows});


         });

         //console.log(query.sql);
    });

});

router.get('/albums/add', function(req, res){
  res.render('add_album',{page_title:"Add an album - Node.js"});
});

router.get('/albums/edit/:id', function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM album WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_album',{page_title:"Edit albums - Node.js",data:rows});


         });

         //console.log(query.sql);
    });
});

/*Save the album*/
router.post('/albums/save', function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            title        : input.title,
            artist       : input.artist,
            release_year : input.release_year

        };

        var query = connection.query("INSERT INTO album set ? ",data, function(err, rows)
        {

          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/albums');

        });

       // console.log(query.sql); get raw query

    });
});

router.post('/albums/edit/:id', function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            title        : input.title,
            artist       : input.artist,
            release_year : input.release_year

        };

        connection.query("UPDATE album set ? WHERE id = ? ",[data,id], function(err, rows)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/albums');

        });

    });
});


router.get('/albums/delete/:id', function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM album  WHERE id = ? ",[id], function(err, rows)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/albums');

        });

     });
});

module.exports = router;
