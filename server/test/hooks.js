import {
    dropTables,
    createTables,
    insertIntoTables,
    dropFunctionsAndTriggers,
    createFuncsAndTriggers
} from '../src/utils/queryFunctions';

before(async() => {
    await createTables();
    await createFuncsAndTriggers();
    await insertIntoTables();
});

after(async () => {
    await dropFunctionsAndTriggers();
    await dropTables();
})