import {
    dropTables,
    createTables,
    insertIntoTables
} from '../src/utils/queryFunctions';

before(async function mochaBefore(){
    await createTables();
    await insertIntoTables();
});

after(async function mochaAfter(){
    await dropTables();
})