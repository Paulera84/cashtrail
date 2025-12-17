const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.deleteExpense = async(event) => {
    try {
        const expenseId = event.pathParameters?.expenseId;
        const userId = event.queryStringParameters?.userId;

        if(!userId || !expenseId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message:"userId and expenseId are required !"})
            }
        }

        await dynamoDB.delete({
            TableName: 'Expenses',
            Key: {
                userId,
                expenseId
            },
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({message: "Expense deleted successfully"})
        }
    } catch(error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to delete expense"})
        }
    }
}