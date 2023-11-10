import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menu (id INTEGER PRIMARY KEY not null, name TEXT, description TEXT, price FLOAT, category TEXT, image TEXT);'
        );
      }
    , reject
    , resolve
    );
  });
}

export async function deleteTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DROP TABLE menu;'
        );
      }
    , reject
    , resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menu', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  const query = 'INSERT INTO menu (name, description, price, category, image) VALUES '
  + menuItems.map(() => '(?, ?, ?, ?, ?)').join(',')
  ;
  const itemList = menuItems.reduce((a, item) => (
    a.concat([item.name, item.description, item.price, item.category, item.image])
  ), []);

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, itemList);
      }
    , reject
    , resolve
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  const categories  = (activeCategories && activeCategories.length > 0);

  let sql = 'SELECT * FROM menu'
  if (query || categories) {
    sql += ' WHERE ';
    if (query) {
      sql += `name LIKE '%${query}%'`;
    }
    if (query && categories) {
      sql += ' AND ';
    }
    if (categories) {
      sql += 'category IN ('
      + activeCategories.map((cat) => `'${cat}'`).join(',')
      + ')'
      ;
    }
  }
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(sql, [], (_, { rows }) => {
          resolve(rows._array);
        });
      }
    , reject
    );
  });
}