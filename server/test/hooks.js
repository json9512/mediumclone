import {
    dropTables,
    createTables,
    insertIntoTables
} from '../src/utils/queryFunctions';

before(() => {
    createTables();
    insertIntoTables();
});

after(() => {
    dropTables();
})