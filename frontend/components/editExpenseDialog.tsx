'use client';

import { useState, useEffect } from "react";
import { updateExpense, Expense } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = ["Shopping", "Food", "Rent", "Utilities", "Entertainment", "Transport", "Fixed", "Other"];

interface Props {
  expense: Expense;
  open: boolean;
  onClose: () => void;
  onUpdated: (updated: Expense) => void;
}

export function EditExpenseDialog({
  expense,
  open,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Expense>(expense);

  // Sync form state if the expense prop changes
  useEffect(() => {
    setForm(expense);
  }, [expense]);

  async function handleSave() {
    setLoading(true);
    try {
      const res = await updateExpense(expense.expenseId, {
        userId: expense.userId,
        amount: form.amount,
        category: form.category,
        date: form.date,
        note: form.note,
      });

      onUpdated(res.expense);
      onClose();
    } catch (error) {
      alert("Failed to update expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="edit-amount">Amount (₹)</Label>
            <Input
              id="edit-amount"
              type="number"
              value={form.amount}
              className="bg-background"
              onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
            />
          </div>

          {/* Category Field (Dropdown) */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select 
              value={form.category} 
              onValueChange={(val) => setForm({ ...form, category: val })}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Field */}
          <div className="space-y-2">
            <Label htmlFor="edit-date">Date</Label>
            <Input
              id="edit-date"
              type="date"
              value={form.date}
              className="bg-background"
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>

          {/* Note Field */}
          <div className="space-y-2">
            <Label htmlFor="edit-note">Note</Label>
            <Textarea
              id="edit-note"
              value={form.note || ""}
              className="bg-background"
              placeholder="Update your notes..."
              onChange={e => setForm({ ...form, note: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading} className="flex-1">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}