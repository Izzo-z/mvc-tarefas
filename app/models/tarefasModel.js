const pool = require("../../config/pool_conexoes");

const tarefasModel = {

    findAll: async () => {
        try {
            const [resultado] = await pool.query("select * from tarefas where status_tarefa = 1 ");
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    findAllInativos: async () => {
        try {
            const [resultado] = await pool.query("select * from tarefas where status_tarefa = 0 ");
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    findById: async (id) => {
        try {
            const [resultado] = await
                pool.query("select * from tarefas where status_tarefa = 1 and id_tarefa = ?",
                    [id]
                );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },
    create: async (campos) => {
        // campos é um json no seguinte formato
        // { 
        // nome:"ONONON", 
        // prazo:"9999-99-99"
        // situacao:9
        // }
        try {
            const [resultado] = await
                pool.query("insert into tarefas(`nome_tarefa`,`prazo_tarefa`,`situacao_tarefa`) "
                    +" values(?,?,?)",
                    [campos.nome, campos.prazo, campos.situacao]
                )
                return resultado;
        } catch (erro) {
            return erro;
        }

    },

    // faltam os métodos: update, delete fisico e delete lógico
    update: async (dados)=>{
        // dados é um json no seguinte formato
        // { 
        // id: 9
        // nome:"ONONON", 
        // prazo:"9999-99-99"
        // situacao:9
        // }
            try {
            const [resultado] = await
                pool.query("update tarefas set `nome_tarefa`= ?, " + 
                    " `prazo_tarefa` = ?, `situacao_tarefa` = ? "+
                    " where id_tarefa = ?",
                    [dados.nome, dados.prazo, dados.situacao, dados.id]
                )
                return resultado;
        } catch (erro) {
            return erro;
        }
    
    
    
    }

}



module.exports = {tarefasModel};