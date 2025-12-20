
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.setMonthlyIncome = async (event) => {

    try {
        const body = JSON.parse(event.body);
        const { userId, month, income } = body;

        if(!userId || !month || !income) {
            return {
                statusCode: 400,
                body: JSON.stringify({messgae: "Missing fields"}),
            };
        }

        await dynamoDB.put({
            TableName: 'MonthlyIncome',
            Item: {
                userId, month, income,
                updatedAt: new Date().toISOString()
            }
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({message: "Income Saved Successfully"}),
        };
        
    } catch(error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ messgage : "Internal Server Error!"})
        };
    }
}