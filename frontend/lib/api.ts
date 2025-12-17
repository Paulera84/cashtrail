
export interface Expense {
    userId: string,
    expenseId: string, 
    amount: number,
    category: string,
    date: string,
    note: string,
    createdAt: string
}

const API_BASE_URL = process.env.BASE_API_URL;

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

