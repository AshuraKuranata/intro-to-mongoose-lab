// mongoose and env file set-up
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const Customer = require('./models/mongoose-lab.js')

// prompt module set-up
const prompt = require('prompt-sync')();

/* Functions */
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await customerQueries();
    await mongoose.disconnect(); // mongoose.connection.close()
    console.log('MongoDB Disconnect Successful.')
}

// Action Selections
const customerQueries = async () => {
    let queryLoop = true
    while (queryLoop === true) {
    console.log("\nSelect option by typing number in parenthesis: \n(1)-Create customer \n(2)-View customers \n(3)-Update customer \n(4)-Delete customer \n(5)-Quit")
    let userAct = prompt('')
        if (userAct === '1') {
            let custName = prompt("Type Customer Name: ");
            let custAge = prompt("Input Customer Age: ");
            let custCool = '';
            while (custCool === "") {
                custCool = prompt("Is the Customer Cool? (Y) (N): ")
                custCool = custCool.toLowerCase()
                if (custCool === "y") {
                    custCool = true;
                    break
                } else if (custCool === "n") {
                    custCool = false;
                    break
                } else {
                    console.log("\nInvalid input, please type in (Y) or (N)\n")
                    custCool = '';
                    continue
                }
            }
            const createCustomer = {
                name: custName,
                age: custAge,
                isCool: custCool,
            }
            await Customer.create(createCustomer);
            console.log('Thank you for adding in a new customer into our database!');
            userAct = null;
            continue
        }
        if (userAct === '2') {
            console.log("Here is a list of all the customers: \n");
            const allCust =  await Customer.find();
            for (let cust of allCust) {
                console.log(`${cust.id} --- Name: ${cust.name} Age: ${cust.age} Is Cool? ${cust.isCool}`);
            }
            userAct = null;
            continue;
        }
        if (userAct === '3') {
            const allCust =  await Customer.find();
            for (let cust of allCust) {
                console.log(`${cust.id} --- Name: ${cust.name} Age: ${cust.age} Is Cool? ${cust.isCool}`);
            }
            const custId = prompt("\nPlease input the customer's ID string to update: ");
            const custUpdate = await Customer.findById(custId)
            console.log("\nPlease select which field you wish to update: (1)-Name (2)-Age (3)-Coolness \n")
            const update = prompt("")
            if (update === '1') {
                const nameUpdate = prompt(`'${custUpdate.name}' is the current name, please input new name: `)
                custUpdate.name = nameUpdate;
                await custUpdate.save()
                console.log(`Customer's name is now ${custUpdate.name}.`)
                continue
            } else if (update === '2') {
                const ageUpdate = prompt(`'${custUpdate.age}' is the current age, please input new age: `)
                custUpdate.age = ageUpdate;
                await custUpdate.save()
                console.log(`Customer's age is now ${custUpdate.age}.`)
                continue
            } else if (update === '3') {
                if (custUpdate.isCool === true) {
                    custUpdate.isCool = false;
                    await custUpdate.save()
                    console.log(`${custUpdate.name} is not cool anymore.`)
                    continue
                } else {
                    custUpdate.isCool = true;
                    await custUpdate.save()
                    console.log(`${custUpdate.name} is cool. Nice!`)
                    continue
                }
            }
            console.log("Input invalid, return back to menu and try again.")
            userAct = null;
            continue;
        }
        if (userAct === '4') {
            for (let cust of allCust) {
                console.log(`${cust.id} --- Name: ${cust.name} Age: ${cust.age} Is Cool? ${cust.isCool}`);
            }
            const custId = prompt("Please input the customer's ID string: ");
            try {
                const delCust = async (id) => {
                    await Customer.findByIdAndDelete(id)
                }
                await delCust(custId);
                console.log(`Customer ${custId} deleted.`);
                userAct = null;
                continue;
            } catch (error) {
                console.log("Invalid entry, please reselect and input correct customer ID.")
                continue;
            }     
        }
        if (userAct === '5') {
            console.log('Thank you for logging into the Great Emporium Data Site.  Please come again!');
            queryLoop = false;
            return
        } else {
            console.log("\nInvalid input.\n");
            userAct = null;
            continue
        }
    }
}

// Program Running

console.log("Welcome to the Great Emporium Data Site.")

connect()






