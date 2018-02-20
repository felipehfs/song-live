var Song = require('../models/song'),
    formidable = require('formidable'),
    fs = require('fs');
    

exports.create = function(req, res){

	let form = new formidable.IncomingForm();
	form.uploadDir = './uploads';
	form.keepExtensions = true;
	form.multiple = true;

	// Parseando dados da requisição
	form.parse(req, function (err, fields, files){
        var audio = fields;
        audio.file = files.file.path
        var newSong = new  Song(audio);
        // Salvando as informações no banco de dados
        newSong.save(audio, (err, data) => { 
            if(err) {
                res.status(404).send(err); 
            } else {
                res.json(data);
            }
        });
    });
}


// Busca o arquivo pelo seu id
exports.find = function(req, res){
    Song.findById(req.params.id, function(err, data){
        if(err){
            throw err;
        }
        let path = data.file;
        let stat = fs.statSync(path);

	    res.writeHead(200, {
		'Content-Type': 'audio/mpeg',
		'Content-Length': stat.size
        });

        if(data.file){
            fs.createReadStream(path).pipe(res);
        } else {
            res.status(404).json({status: "Not found"});
        }
       
    });
	
}

exports.remove = function(req, res){
    Song.findById(req.params.id, function (err, data) { 
        if(err){
            throw err;
        }
        // Remoção no diretório de arquivos
        fs.unlinkSync(data.file);
        // Remoção do documento no banco de dados
        data.remove((err) => {if(err){ res.status(500).send(err); }});
        res.json(data);
    });
}