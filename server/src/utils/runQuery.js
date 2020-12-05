import {createTables, insertIntoTables, createFuncsAndTriggers} from './queryFunctions';

(() => {
     createTables();
     createFuncsAndTriggers();
     insertIntoTables();
})();