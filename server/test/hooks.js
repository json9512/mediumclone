import {
    dropTables,
    createTables,
    insertIntoTables
} from '../src/utils/queryFunctions';

beforeEach(async function mochaBeforeEach(){
    await createTables();
    await insertIntoTables();
})

after(async function mochaAfter(){
    await dropTables();
})