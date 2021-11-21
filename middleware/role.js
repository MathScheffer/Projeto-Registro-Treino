const constants = require('../constants/constants');
const jwt = require('jsonwebtoken');

const validarPermissao = (token, permissao, callback) => {

    if(!constants.PERMISSIONS.includes(permissao.toUpperCase())){
        console.log("teste")
        const error = {
            status: 400,
            message: "Necessario informar a Role"
        }
        callback(error,null);
    }

    jwt.verify(token,constants.JWT_VERIFICATOR,(err,payload) => {
        if(err){
            const error = {
                status:403,
                message:"Token invalido"
            }
            callback(error,null)
        }else{
            const permissions = payload.role;
            console.log(permissao)
            if(permissions == permissao && permissao != "DISABLED"){
                callback(null,{
                    status:200,
                    message:"Permissao concedida!"
                 })
            }else{
                const error = {
                    status:401,
                    message:"Permissao nao concedida!"
                 }
                callback(error,null)  
            }
        }
    })
}


exports.validarTokenAdm = (req,res,next) => {
    try{
        const token = req.get('x-auth-token');

        validarPermissao(token, 'ADM',(err,sucess) => {
            if(err){
                res.status(err.status).json(err);
            }else{
                console.log("vai dar next")
                next();
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}


exports.validarTokenUsuarioDesabilitado = (req,res,next) => {
    try{
        const token = req.get('x-auth-token');

        validarPermissao(token, 'DISABLED',(err,sucess) => {
            if(err){
                res.status(err.status).json(err);
            }else{
                console.log("vai dar next")
                next();
            }
        })
    }catch(error){
        console.log(error)
        res.status(500).json({erro: "Erro interno no servidor!"})
    }
}