export type Organization = {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: string | number;
  category: string | null;
  created_at: string;
  organization_id: string;
};
