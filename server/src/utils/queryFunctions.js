import {pool} from '../models/pools';
import {
    insertMessages,
    dropMessagesTable,
    createMessageTable,
    createUserTable,
    createPostTable,
    dropPostsTable
} from './queries';

export const executeQueryArray = async arr => new Promise(resolve => {
    const stop = arr.length;
    arr.forEach(async (q, index)=> {
        await pool.query(q);
        if (index + 1 === stop) resolve();
    });
});

export const executeQuery = async(q) => {
    await pool.query(q);
}

export const dropTables = () => executeQueryArray([dropMessagesTable, dropPostsTable]);
export const createTables = () => executeQueryArray([createMessageTable, createUserTable, createPostTable]);
export const insertIntoTables = () => executeQueryArray([insertMessages]);