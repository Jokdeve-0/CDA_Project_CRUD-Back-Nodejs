const {ObjectSeparatesColumnsValuesForAdd} = require('../../helpers/ObjectHandler');
class BaseQuery{

    selectAll(table){
        return {
            table:table,
            query:`SELECT * FROM ${table}`,
            log:`Action 'select all ${table}s' at : `
        }
    }     
    addEntity(table,entity){
        const keysValues = ObjectSeparatesColumnsValuesForAdd(entity);
        return {
            table:table,
            query:`Insert into ${table} (${keysValues.columns}) VALUES (${keysValues.values})`,
            log:`Action 'add a new entity in ${table}s' at : `
        }
    } 
    selectEntity(table,id){
        return {
            table:table,
            query:`SELECT * from ${table} WHERE ${table}.id = ${id};`,
            log:`Action 'select a entity in ${table}s' at : `
        }
    }   
    editEntity(table,entity){
        let sqlString = '';
        for (const property in entity) {
            if(property !== 'created_at')
            sqlString += `${property} = '${entity[property]}',`;
        }
        sqlString = sqlString.slice(0, -1);
        return {
            table:table,
            query:`UPDATE ${table} SET ${sqlString} WHERE ${table}.id=${entity.id};`,
            log:`Action 'edit a entity in ${table}s' at : `
        }
    }
    deleteEntity(table,id){
        return {
            table:table,
            query:`DELETE FROM ${table} WHERE ${table}.id=${id};`,
            log:`Action 'delete a entity in ${table}s' at : `
        }
    }
}
const baseQuery = new BaseQuery()
module.exports = baseQuery;