// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// central: database identifies which database the users are stored within
const val = await central(2);
// console.log(val); // returns-> db1

// db1, db2. db3: databases contain the user's basic information, including username, website, and company.
const val2 = await db1(2)
// console.log(val2);

// val: The personal data for each user is contained within the vault database since its access and usage is restricted by law.
const val3 = await vault(2);
// console.log(val3);

// central(10).then(db => console.log(db))
db3(10).then(userBasicInfo => console.log(userBasicInfo))
vault(10).then(userPersonalInfo => console.log(userPersonalInfo))



async function getUserData(id) {
    // Ensures id entered is valid
    if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");

    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3,
    };

    try {
        // Get the database name from central
        const dbName = await central(id);

        // Fetch user data from the correct database
        const userBasicInfo = await dbs[dbName](id);

        // Fetch personal data from the vault
        const userPersonalInfo = await vault(id);

        // Merge the data into a single object
        return {
            id: id,
            name: userPersonalInfo.name,
            username: userBasicInfo.username,
            email: userPersonalInfo.email,
            address: userPersonalInfo.address,
            phone: userPersonalInfo.phone,
            website: userBasicInfo.website,
            company: userBasicInfo.company
        };

    } catch (error) {
        // Step 5: Throw an error instead of returning a rejected promise
        throw new Error(`Error fetching user data: ${error.message}`);
    }
}

// Test functions to see if it works with different IDs
(async () => {
    try {
        const result = await getUserData(7);
        console.log(result);
    } catch (error) {
        console.error("Error:", error.message);
    }
})();

// Returns error based on range
(async () => {
    try {
        const result = await getUserData(34);
        console.log(result);
    } catch (error) {
        console.error("Error:", error.message);
    }
})();

// Returns error based on type
getUserData("info");