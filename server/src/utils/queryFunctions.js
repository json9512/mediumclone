import {pool} from '../models/pools';
import {
    createPostTable,
    dropPostsTable,
    createTimeStampFunction,
    insertPosts,
    createTimeStampTrigger,
} from './queries';

const createPromise = async(query) => {
    return await new Promise(async (resolve) => {
        await pool.query(query).catch(err => console.log(err));
        resolve();
    })
}

export const dropTables = async() => {
    return await createPromise(dropPostsTable); 
} 

export const createTables = async() => {
    return await new Promise(async(resolve) => {
        await pool.query(createPostTable).catch(err => console.log(err));
        await pool.query(createTimeStampFunction).catch(err => console.log(err));
        await pool.query(createTimeStampTrigger).catch(err => console.log(err));
        resolve();
    })
}

export const insertIntoTables = async() =>  {
    return await createPromise(insertPosts); 
}