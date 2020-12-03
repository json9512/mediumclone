import { pool } from './pools';

export default class Model {
    constructor(table){
        this.pool = pool;
        this.table = table;
        this.pool.on('error', (err, client) => `Error: ${err}, on idle client ${client}`);
    }

    async select(columns, clause){
        let query = `SELECT ${columns} FROM ${this.table}`;
        if (clause) query += clause;
        return this.pool.query(query);
    }

    async insertWithReturn(columns, values, createNew) {
        // First check if id exists (can be done at higher level)
        // Check if post exists
        // Either update or insert new data into database
        let query = "";
        if (createNew) {
            query = `
            INSERT INTO ${this.table}(${columns})
            VALUES(${values})
            RETURNING id, ${columns};
            `;

            console.log(`Insert data into ${this.table} with query: ${query}`)
        }else{
            query = `UPDATE ${this.table} SET `;
            const id = values.split(",")[0]
            
            // Check if data with id exists
            const check = await this.select("*", ` WHERE id=${id};`);
            
            if (check.rowCount === 0){
                return {rows: `Error: data with id: ${id} does not exists in database`, code: 400};
            }

            // Update
            const cols = columns.split(",")
            const vals = values.split(", '")

            // Construct sql query
            for (let i = 0; i < cols.length; i++){
                if (i == cols.length-1){
                    query += cols[i] + "='" + vals[i] + ` WHERE id=${id} RETURNING ${columns};`;
                }else if (i===0){
                    query += cols[i] + "="+vals[i]+",";
                }
                else{
                    query += cols[i] + "='" + vals[i] + ",";
                }
                
            }
            console.log(`Update data into ${this.table} with query: ${query}`)
            
        }

        return this.pool.query(query);
    }

    async checkIfRowExists(){
        const query = `SELECT * FROM ${this.table};`;
        const result = await this.pool.query(query)
        
        if (result.rowCount < 1){
            return false
        }

        return true
    }

    async dropRowWithId(columns, id){
        const q = `DELETE FROM ${this.table} WHERE ${columns}='${id}' RETURNING *;`
        console.log(`Delete data from ${this.table} with query: \n${q}`);
        return this.pool.query(q);
    }
}
