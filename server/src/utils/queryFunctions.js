import {pool} from '../models/pools';
import {
    insertMessages,
    dropMessagesTable,
    createMessageTable,
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
        if (index + 1 === stop) resolve();
    });
});


export const dropTables = () => executeQueryArray([dropMessagesTable, dropPostsTable]);
export const createTables = () => executeQueryArray([createMessageTable, createPostTable]);
export const insertIntoTables = () => executeQueryArray([insertMessages, insertPosts]);
export const createFuncsAndTriggers = () => executeQueryArray([createTimeStampFunction, createTimeStampTrigger]);