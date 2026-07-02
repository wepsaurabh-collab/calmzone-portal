const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./calmzone.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, pin TEXT UNIQUE, company TEXT, person TEXT, phone TEXT, balance REAL, role TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS pickup_addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, icarry_id TEXT, alias TEXT, name TEXT, phone TEXT, address TEXT, city TEXT, state TEXT, pin TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS shipments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, awb TEXT UNIQUE, courier TEXT, cost REAL, charged REAL, weight REAL, c_name TEXT, c_phone TEXT, c_city TEXT, c_state TEXT, status TEXT, label_url TEXT, disc_status TEXT DEFAULT 'NONE', disc_amt REAL DEFAULT 0)`);
    db.run(`CREATE TABLE IF NOT EXISTS ledger (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, amount REAL, type TEXT, desc TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP)`);

    db.run(`INSERT OR IGNORE INTO users VALUES (1, '0000', 'Super Admin HQ', 'Saurabh Raj Gupta', '9876543210', 999999, 'admin')`);
    db.run(`INSERT OR IGNORE INTO users VALUES (2, '1234', 'Calmzone Client', 'Ranjan Sir', '6362182961', 5000, 'client')`);

    db.run(`INSERT INTO pickup_addresses SELECT 1, 2, '55', 'Primary Warehouse', 'Sanjeev Kumar', '9876543210', 'Plot 42, Ind. Area', 'Baddi', 'Himachal Pradesh', '173205' WHERE NOT EXISTS (SELECT 1 FROM pickup_addresses WHERE id=1)`);
});
db.close();
