import {createTables, insertIntoTables, createFuncsAndTriggers} from './queryFunctions';

(async() => {
    await createTables();
    await createFuncsAndTriggers();
    await insertIntoTables();
})();