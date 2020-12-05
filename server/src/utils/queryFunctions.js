import {pool} from '../models/pools';
import {
    createPostTable,
    dropPostsTable,
    createTimeStampFunction,
    insertPosts,
    createTimeStampTrigger
} from './queries';

export const executeQueryArray = async arr => new Promise(resolve => {
    const stop = arr.length;
    arr.forEach(async (q, index)=> {
        await pool.query(q);
        if (index + 1 === stop) return resolve();
    });
});


export const dropTables = () =>  executeQueryArray([dropPostsTable]);
export const createTables = () =>  executeQueryArray([createPostTable, createTimeStampFunction ,createTimeStampTrigger]);
export const insertIntoTables = () =>  executeQueryArray([insertPosts]);