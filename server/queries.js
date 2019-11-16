const apiToken = 'SELECT COUNT(*) as count FROM apikeys WHERE key = ?';
const existingFile = 'SELECT filename, hash, filename, user, delid, COUNT(*) as count FROM files WHERE hash = ? and size = ?';
const insertFile = 'INSERT INTO files (hash, originalname, filename, size, date, expire, delid, user) VALUES(?, ?, ?, ?, ?, ?, ?)';
const deleteFile = 'DELETE FROM files WHERE delid = ?';

export default { apiToken, deleteFile, existingFile, insertFile };