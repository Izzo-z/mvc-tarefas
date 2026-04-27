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
                    + " values(?,?,?)",
                    [campos.nome, campos.prazo, campos.situacao]
                );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    update: async (dados) => {
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
                    " `prazo_tarefa` = ?, `situacao_tarefa` = ? " +
                    " where id_tarefa = ?",
                    [dados.nome, dados.prazo, dados.situacao, dados.id]
                );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    // ✅ DELETE FÍSICO - remove o registro permanentemente do banco
    deleteFisico: async (id) => {
        try {
            const [resultado] = await
                pool.query("delete from tarefas where id_tarefa = ?", [id]);
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    // ✅ DELETE LÓGICO - apenas marca status_tarefa = 0 (inativa a tarefa)
    deleteLogico: async (id) => {
        try {
            const [resultado] = await
                pool.query("update tarefas set status_tarefa = 0 where id_tarefa = ?", [id]);
            return resultado;
        } catch (erro) {
            return erro;
        }
    }

};

module.exports = { tarefasModel };