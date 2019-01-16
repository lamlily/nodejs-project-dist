const {
  MongoClient,
  ObjectId
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'demo';
// Use connect method to connect to the server

// 连接
let connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err)
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        resolve({
          db,
          client
        })
      }
    });
  })
}


// 添加
let insert = (col, arr) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.insertMany(arr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
        client.close();
      }
    })
  })
}


// 查询
let find = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.find({
      ...obj
    }).toArray(function (err, docs) {
      if (err) {
        reject(err)
      } else {
        resolve(docs);
        client.close();
      }
    });
  })
}


// 删除
let del = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.deleteMany({
        ...obj
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


// // 修改
// let update = (col, obj1,obj2) => {
//   return new Promise(async (resolve, reject) => {
//     let {
//       db,
//       client
//     } = await connect();
//     const collection = db.collection(col);
//     collection.updateMany({
//       ...obj1
//     },{
//       ...obj2
//     })
//     .then((res)=>{
//       resolve(res)
//     })
//     .catch((err)=>{
//       reject(err)
//     });
//   })
// }

let update = (col, obj1, obj2) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.update({
      ...obj1
    }, { ...obj2
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    });
  })
}






module.exports = {
  connect,
  insert,
  find,
  del,
  update,
  ObjectId
}

// node express mongodb jquery