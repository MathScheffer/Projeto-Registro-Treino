const BadRequestErrors = require('./badRequestErrors');

class Utils{
    static validarErro(err){
        if(err){
            const badRequest = new BadRequestErrors(JSON.parse(JSON.stringify(err.errors || err)))
        if(badRequest.getMessages())
            res.status(400).json(badRequest.getMessages())
        else
            res.status(500).json({"Message":"Erro interno no servidor!"})
        }
    }

    static validaJsonVazio(json){
        return Object.keys(json).length > 0;
    }

    static validaParametrosValidos(json, arrayParamsValidos){
        for(const key in json){
            if(!arrayParamsValidos.includes(key)){
                return false;
            }
        }

        return true;
    }

    //Formata um "body" para que seja possível fazer uma busca interna no objeto para atualizá-lo
    static formatarObjetoInterno(nomeObjetoInterno, objetoInterno){
        const novoObjeto = {}
        
        for(const key in objetoInterno){
            let chaveAtualizada = nomeObjetoInterno+".$."+key
            novoObjeto[chaveAtualizada] = objetoInterno[key];
        }

        return novoObjeto
    }
}

module.exports = Utils;