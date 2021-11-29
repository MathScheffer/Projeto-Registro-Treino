const bcrypt = require('bcrypt')
const Usuario = require('../model/usuario');
const BadRequestErrors = require('./utils/badRequestErrors');
const UnprocessableEntityErrors = require('./utils/unprocessableEntityErrors');
const Utils = require('./utils/utils');


exports.adicionar =(req,res) => {
    try{
        req.body.senha = req.body.senha ? bcrypt.hashSync(req.body.senha,10) : null;
        req.body.role = req.body.role ? req.body.role.toUpperCase() : req.body.role;
        const user = new Usuario(req.body);
        
        user.save((err,User) => {
            if(err){
                console.log(JSON.parse(JSON.stringify(err)))
                const badRequest = new BadRequestErrors(JSON.parse(JSON.stringify(err.errors || err)))
                const unprocessableError = new UnprocessableEntityErrors(JSON.parse(JSON.stringify(err)))

                //TODO: Adicionar um validador caso a mensagme saia com chave:Array vazio
                
                if(Utils.validaJsonVazio(badRequest.getMessages()))
                    res.status(400).json(badRequest.getMessages())
                else if(Utils.validaJsonVazio(unprocessableError.getMessages()))
                    res.status(422).json(unprocessableError.getMessages())
                else
                    res.status(500).json({"Message":"Erro interno no servidor!"})
            }else{
                res.status(201).json(User)
            }
        })
    }catch(erro){
        res.status(500).json({message:"Erro interno no servidor!"})
    }
}

exports.listar = (req,res) => {
   try{
        Usuario.find({}, (err,User) => {
            if(err){
                res.status(500).send("Erro interno no servidor!")
            }else{
                res.json(User)
            }
        })
   }catch{
        res.status(500).send("Erro interno no servidor!")
    }
}

exports.encontrarUsuario = (req,res) => {
    //try{
        Usuario.findById(req.params.id, (err, User) => {
            if(err){
                res.status(500).send("Erro interno no servidor!")
            }else{
                res.json(User)
            } 
        })
    /*}catch{
        res.status(500).send("Erro interno no Servidor!")
    }*/
}


exports.atualizarUsuario = (req,res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        Usuario.findOneAndUpdate({_id: id},body,{new:true},(err,usuario) => {
            if(err){
                const badRequest = new BadRequestErrors(JSON.parse(JSON.stringify(err.errors || err)))
                const unprocessableError = new UnprocessableEntityErrors(JSON.parse(JSON.stringify(err)))

                if(Utils.validaJsonVazio(badRequest.getMessages()))
                    res.status(400).json(badRequest.getMessages())
                else if(Utils.validaJsonVazio(unprocessableError.getMessages()))
                    res.status(422).json(unprocessableError.getMessages())
                else
                    res.status(500).json({erro: "Houve um problema ao atualizar usuario!"})

            }else if(usuario){
                console.log("atualizando")
                res.status(200).json({message: "Usuario atualizado com sucesso!", usuario: usuario})
            }else{
                res.status(404).json({message: "Usuario nao encontrado!"})
            }
        })
    }catch{
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}


exports.excluirUsuario = (req,res) => {
    try{
        const id = req.params.id;

        Usuario.findOneAndDelete({_id: id}, (err, usuarioDeletado) => {
            if(err){
                res.status(500).json({erro: "Erro interno no servidor!"})
            }else{
                res.status(200).json({message: "Usuario excluido com sucesso!"})
            }
        })
    }catch{
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}

exports.incrementarRotina = async(req,res) => {
    try{
        const id = req.params.id;
        const body = req.body.rotina;

        if(body){
            const user = await Usuario.findOne({_id: id}).populate('rotina').exec();
            const userRotina = user.rotina;
            const res = userRotina.filter(r => r.dia)
            res.send(user)
/*             if(!user.rotina.includes(rotina)){
                user.rotina.push(rotina);
            }else{
                res.status(422).json({message: "Rotina ja adicionada!"})
                res.end()
            }


            Usuario.findOneAndUpdate({_id: id},{rotina:user.rotina},{new:true},(err,usuario) => {
                if(err){
                    const badRequest = new BadRequestErrors(JSON.parse(JSON.stringify(err.errors || err)))
                    const unprocessableError = new UnprocessableEntityErrors(JSON.parse(JSON.stringify(err)))
    
                    if(Utils.validaJsonVazio(badRequest.getMessages()))
                        res.status(400).json(badRequest.getMessages())
                    else if(Utils.validaJsonVazio(unprocessableError.getMessages()))
                        res.status(422).json(unprocessableError.getMessages())
                    else
                        res.status(500).json({erro: "Houve um problema ao atualizar usuario!"})
    
                }else if(usuario){
                    console.log("atualizando")
                    res.status(200).json({message: "Usuario atualizado com sucesso!", usuario: usuario})
                }else{
                    res.status(404).json({message: "Usuario nao encontrado!"})
                }
            })
         */
        }else{
            res.status(400).json({message: "Necessario informar a rotina!"})
        }
        
    }catch(err){
        res.status(500).json({erro: "Erro interno no servidor!", message:err})
    }
}