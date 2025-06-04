function builderUpdateQuery(table, data, whereClause, whereValues, excludeFields = []) {
  const fields = Object.keys(data).filter(key => !excludeFields.includes(key));
  const values = fields.map(field => data[field]);

  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

  return sql;
}

module.exports= builderUpdateQuery
