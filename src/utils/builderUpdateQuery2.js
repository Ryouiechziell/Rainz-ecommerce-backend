function builderUpdateQuery(table, data, whereClause, whereValues) {
  const fields = Object.keys(data).filter(key => {
    key !== 'user_id' &&
    key !== 'item_id'

  )}
  const values = fields.map(field => data[field]);

  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

  return [sql, [...values, ...whereValues]];
}
