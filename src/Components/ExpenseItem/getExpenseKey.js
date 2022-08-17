const getExpenseKey = (expense) => +(new Date(expense.date));
export default getExpenseKey;