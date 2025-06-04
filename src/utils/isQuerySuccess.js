/**
 * Cek apakah query INSERT berhasil.
 * @param {object} result - Hasil dari db.execute
 * @returns {boolean}
 */
function isInsertSuccess(result) {
  return result?.affectedRows === 1;
}

/**
 * Cek apakah query UPDATE berhasil.
 * @param {object} result - Hasil dari db.execute
 * @returns {boolean}
 */
function isUpdateSuccess(result) {
  return result?.affectedRows > 0;
}

/**
 * Cek apakah query DELETE berhasil.
 * @param {object} result - Hasil dari db.execute
 * @returns {boolean}
 */
function isDeleteSuccess(result) {
  return result?.affectedRows > 0;
}

/**
 * Ambil satu baris data dari hasil SELECT.
 * @param {Array} rows - Hasil dari SELECT query (rows)
 * @returns {object|null}
 */
function extractOne(rows) {
  return rows?.[0] || null;
}

/**
 * Ambil semua data dari hasil SELECT.
 * @param {Array} rows - Hasil dari SELECT query (rows)
 * @returns {Array}
 */
function extractAll(rows) {
  return Array.isArray(rows) ? rows : [];
}

/**
 * Helper umum untuk memeriksa affectedRows apakah sukses (untuk insert/update/delete).
 * @param {object} result - Object hasil query
 * @param {number} [expected=1] - Jumlah baris yang diharapkan berhasil
 * @returns {boolean}
 */
function isQuerySuccess(result, expected = 1) {
  return result?.affectedRows >= expected;
}

module.exports = {
  isInsertSuccess,
  isUpdateSuccess,
  isDeleteSuccess,
  extractOne,
  extractAll,
  isQuerySuccess
};
