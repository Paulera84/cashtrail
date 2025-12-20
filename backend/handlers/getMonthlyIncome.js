const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.getMonthlyIncome = async (event) => {
    try {
        const userId = event.queryStringParameters?.userId;
        const month = event.queryStringParameters?.month;

        const res = await dynamoDB.get({
            TableName: "MonthlyIncome",
            Key : {userId, month},
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                income: res.Item?.income || 0,
            })
        };

    } catch(error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error!'})
        };
    }
}