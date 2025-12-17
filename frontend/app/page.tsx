import { getExpenses } from "@/lib/api";
import { ExpenseTable } from "@/components/expenseTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {

  const expenses = await getExpenses("user123");

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>CashTrail — Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseTable expenses={sortedExpenses} />
        </CardContent>
      </Card>
    </main>
  );
}
