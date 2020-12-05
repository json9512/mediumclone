import {
    dropTables,
    createTables,
    insertIntoTables,
    createFuncsAndTriggers
} from '../src/utils/queryFunctions';

before(async() => {
    await createTables();
    await createFuncsAndTriggers();
    await insertIntoTables();
});

after(async () => {
    await dropTables();
})