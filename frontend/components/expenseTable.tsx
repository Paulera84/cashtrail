import { Expense } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function ExpenseTable({ expenses }: { expenses: Expense[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.expenseId}>
            <TableCell>{expense.date}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{expense.note}</TableCell>
            <TableCell className="text-right">
              ₹{expense.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}