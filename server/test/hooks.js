import {
    dropTables,
    createTables,
    insertIntoTables,
    dropFunctionsAndTriggers,
    createFuncsAndTriggers
} from '../src/utils/queryFunctions';

before(async() => {
    await createTables();
    await insertIntoTables();
    await createFuncsAndTriggers();
    
});

after(async () => {
    await dropFunctionsAndTriggers();
    await dropTables();
})