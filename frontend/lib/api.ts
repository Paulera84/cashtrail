
export interface Expense {
    userId: string,
    expenseId: string, 
    amount: number,
    category: string,
    date: string,
    note: string,
    createdAt: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if(!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
}

export async function getExpenses(userId: string): Promise<Expense[]> {
    const res = await fetch(`${API_BASE_URL}/expenses?userId=${userId}`,
        { cache: "no-store"}
    )

    if(!res.ok) {
        throw new Error("Failed to fetch expenses");
    }

    const data  = await res.json();
    return data.expenses;
}

export async function addExpense(expense: {
    userId: string,
    amount: number,
    category: string,
    date: string,
    note: string
}) {
    const res = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    })

    if(!res.ok) {
        throw new Error("Failed to add expense");
    }
    return res.json();
}
