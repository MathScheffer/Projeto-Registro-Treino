const Rotina = require('../model/rotina');
const BadRequestErrors = require('./utils/badRequestErrors')
const Utils = require('./utils/utils')
const Constants = require('../constants/constants');

exports.adicionar = (req,res) => {
    const rotina = new Rotina(req.body);
    rotina.save((err,Rotina) => {
        if(err) {
            const badRequest = new BadRequestErrors(JSON.parse(JSON.stringify(err.errors || err)))
            
            if(badRequest.getMessages())
                res.status(400).json(badRequest.getMessages())
            else
                res.status(500).json({"Message":"Erro interno no servidor!"})
        }else{
            res.status(201).json(Rotina);
        }
    })
}

exports.listar = (req,res) => {
    try{
        Rotina.find({}, (err, listaRotinas) => {
            if(err){
                res.status(500).json({erro: "Erro interno no servidor!"})
            }

            if(listaRotinas){
                res.json(listaRotinas)
            }else{
                res.status(404).json({erro: "Nao ha rotinas registradas!"})
            }
        })
    }catch{
        
    }
}

exports.encontrarRotina = (req,res) => {
    Rotina.findById(req.params.id, (err,Rotina) => {
        if(err){
            res.send(err)
        }else{
            res.json(Rotina)
        }
    })
}

exports.atualizar = (req,res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        Rotina.findByIdAndUpdate(id, body,{new:true},(err,rotina) => {
            if(err){
                res.status(500).json({erro: "Houve um problema ao atualizar rotina!"})
            }

            if(rotina){
                res.status(200).json({message: "Rotina atualizada com sucesso!", rotina: rotina})
            }else{
                res.status(404).json({message: "Rotina nao encontrada!"})
            }
        })
    }catch{
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}


exports.atualizarExercicio = (req,res) => {
    try{
        const id = req.params.id_exercicio;
        const body = req.body

        if(!Utils.validaParametrosValidos(body, Constants.EXERCICIOS_PARAMS)){
            res.status(400).json(
                {
                    erro:"Ha parametros que nao sao validos no corpo da requisicao!",
                    parametros_validos: Constants.EXERCICIOS_PARAMS
                })

        }else if (!Utils.validaJsonVazio(body)){
            res.json({Message:"Corpo da requisicao Vazio: Nenhum dado foi modificado!"})    

        }else{
            const bodyFormatado = Utils.formatarObjetoInterno("exercicios",body);

            Rotina.findOneAndUpdate({'exercicios._id':id},
            {$set:bodyFormatado},
            {new:true},(err,exercicio) => {
                if(err){
                    const badRequest = new BadRequestErrors(JSON.parse(JSON.stringify(err.errors || err)))
                    
                    if(Utils.validaJsonVazio(badRequest.getMessages()))
                        res.status(400).json(badRequest.getMessages())
                    else
                        res.status(500).json({erro: "Houve um problema ao atualizar exercicio!"})
                }
                else if(exercicio){
                    res.status(200).json({message: "Exercicio da rotina atualizado com sucesso!", exercicio: exercicio})
                }else{
                    res.status(404).json({message: "Exericicio nao encontrado!"})
                }
            })
        }

    }catch(error){
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}

exports.registrarExercicio = (req,res) => {
    try{
        const id = req.params.id_exercicio;
        const body = req.body

        if(!Utils.validaParametrosValidos(body, Constants.EXERCICIOS_REGISTRO)){
            res.status(400).json(
                {
                    erro:"Ha parametros que nao sao validos no corpo da requisicao!",
                    parametros_validos: Constants.EXERCICIOS_REGISTRO
                })

        }else if (!Utils.validaJsonVazio(body)){
            res.json({Message:"Corpo da requisicao Vazio: Nenhum dado foi modificado!"})    

        }else{
            const bodyFormatado = Utils.formatarObjetoInterno("exercicios",body);

            Rotina.findOneAndUpdate({'exercicios._id':id},
            {$set:bodyFormatado},
            {new:true},(err,exercicio) => {
                if(err){
                    const badRequest = new BadRequestErrors(JSON.parse(JSON.stringify(err.errors || err)))
                    
                    if(Utils.validaJsonVazio(badRequest.getMessages()))
                        res.status(400).json(badRequest.getMessages())
                    else
                        res.status(500).json({erro: "Houve um problema ao atualizar exercicio!"})
                }
                else if(exercicio){
                    res.status(200).json({message: "Exercicio da rotina atualizado com sucesso!", exercicio: exercicio})
                }else{
                    res.status(404).json({message: "Exericicio nao encontrado!"})
                }
            })
        }

    }catch(error){
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}

exports.excluir = (req,res) => {
    try{
        const id = req.params.id;
        
        Rotina.findOneAndDelete({_id:id}, (err, rotinaDeletada) => {
            if(err){
                res.status(500).json({erro: "Erro interno no servidor!"})
            }

            if(rotinaDeletada){
                res.json({message: "Rotina excluida com sucesso!"})
            }else{
                res.status(404).send("Rotina nao encontrada!")
            }
        })
    }catch{
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}