import dbHandler from "../db_handler"
import RejectionController from "../../../controllers/rejectionController"
/**
 * Connect to a new in-memory database before running any tests.
 */
 beforeAll(async () => await dbHandler.connect());

 /**
  * Clear all test data after every test.
  */
 afterEach(async () => await dbHandler.clearDatabase());
 
 /**
  * Remove and close the db and server.
  */
 afterAll(async () => await dbHandler.closeDatabase());


 describe("reject event reuqest", async ()=>{
    expect(2).toEqual(2);
 })
 