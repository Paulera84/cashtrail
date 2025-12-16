const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.createExpense = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const expense = {
      userId: body.userId,
      expenseId: Date.now().toString(),
      amount: body.amount,
      category: body.category,
      date: body.date,
      note: body.note || "",
      createdAt: new Date().toISOString(),
    };

    await dynamoDB.put({
      TableName: "Expenses",
      Item: expense,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Expense created successfully",
        expense,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
