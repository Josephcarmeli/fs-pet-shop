import app from './middleware.js';
import postgres from 'postgres';

const PORT = 3001;

export const sql = postgres('postgres://joseph:123@127.0.0.1:5432/petShop');

app.listen(`${PORT}`, function () {
    console.log(`server is running on ${PORT}`);
});

export default sql;