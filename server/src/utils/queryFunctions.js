import {pool} from '../models/pools';
import {
    createPostTable,
    dropPostsTable,
    createTimeStampFunction,
    insertPosts,
    createTimeStampTrigger
} from './queries';

export const dropTables = async() => {
    return await new Promise(async (resolve) => {
        await pool.query(dropPostsTable)
        resolve();
    });
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
    return await new Promise(async(resolve) => {
        await pool.query(insertPosts).catch(err => console.log(err));
        resolve();
})}