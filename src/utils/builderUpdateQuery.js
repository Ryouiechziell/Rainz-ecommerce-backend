function buildUpdateQuery(table, data, whereClause, whereValues = []) {
  if (!table || typeof data !== 'object' || Object.keys(data).length === 0)
    throw new Error('Invalid update data');

  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  const query = `UPDATE ${table} SET ${fields.join(', ')} WHERE ${whereClause}`;
  const allValues = [...values, ...whereValues];

  return { query, values: allValues };
}
