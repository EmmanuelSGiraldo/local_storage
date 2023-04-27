import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

// Lee las variables de entorno desde un archivo .env
dotenv.config();

// Lee la URI de la base de datos de las variables de entorno
const uri = process.env.URI_MONGODB;

// Función para agregar un usuario a la base de datos
async function addUser(userDocument) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('FS06');
    const userCollection = database.collection('user');
    const result = await userCollection.insertOne(userDocument);
    console.log(result);
  } finally {
    await client.close();
  }
}

// Función para agregar varios usuarios a la base de datos
async function addUsers(userDocuments) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('FS06');
    const userCollection = database.collection('user');
    const result = await userCollection.insertMany(userDocuments);
    console.log(result);
  } finally {
    await client.close();
  }
}

// Función para actualizar un usuario en la base de datos
async function updateUser(filter, update) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('FS06');
    const userCollection = database.collection('user');
    const result = await userCollection.updateOne(filter, update);
    console.log(result);
  } finally {
    await client.close();
  }
}

// Función para eliminar un usuario de la base de datos
async function deleteUser(filter) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('FS06');
    const userCollection = database.collection('user');
    const result = await userCollection.deleteOne(filter);
    console.log(result);
  } finally {
    await client.close();
  }
}

// Ejemplo de uso para agregar un solo usuario
const userDocument = {
  id: 8,
  name: "samuelo",
  age: 16,
};

addUser(userDocument).catch(console.dir);

// // Ejemplo de uso para agregar varios usuarios
const users = [
  { id: 5, name: "emiliano", age: 25 },
  { id: 6, name: "valentin", age: 30 },
  { id: 7, name: "maria antonia ", age: 22 }
];

addUsers(users).catch(console.dir);

// Ejemplo de uso para actualizar un usuario
const filter = { id: 8 };
const update = { $set: { id:4, name: "Samuel Giraldo" } };

updateUser(filter, update).catch(console.dir);

// Ejemplo de uso para eliminar un usuario
const deleteFilter = { id: 2 };
deleteUser(deleteFilter).catch(console.dir);

// const db_name = 'db_local_storage'
// const db_data = new Array()

// // Valores iniciales
// db_data[1] = {name:'Fabio', age: 39}
// db_data[2] = {name:'Talita', age: 30}
// db_data[4] = {name:'Isabela', age: 1}
// fSyncData()


// // Actualiza el item
// function fUpsert(){
//     const data = mountItemData()

//     if(isNaN(parseInt(data.id)))
//     {
//         data.id = fGetAllItems().length
//     }


//     if(!!data.name.trim() && !!data.age.trim())
//     {
//         db_data[data.id] = {name: data.name, age: data.age}
    
//         clearFormData()
//         fSyncData()
//     }
// }

// // Elimina el registro
// function fDelete(id){
    
//     console.log(`Id ${id} removido!`)

//     delete db_data[id]

//     fSyncData()
    
// }

// // Setea el item
// function fSetItem(id){

//     document.getElementById("id").value = id
//     document.getElementById("name").value = db_data[id].name
//     document.getElementById("age").value = db_data[id].age
// }

// // Registra
// function fSyncData(){

//     localStorage.setItem(db_name, JSON.stringify(db_data))
//     createDataTable(db_data)
// }

// // Retorna un array con todos os items de la base de dados
// function fGetAllItems() {
//     return JSON.parse(localStorage.getItem(db_name))
// }

// // Prepara objeto para armazena-lo na base de dados
// function mountItemData(){
//     const id = document.getElementById("id").value
//     const name = document.getElementById("name").value
//     const age = document.getElementById("age").value

//     return {id, name, age}
// }

// // Limpia campos
// function clearFormData(){
//     document.getElementById("id").value = ''
//     document.getElementById("name").value = ''
//     document.getElementById("age").value = ''
// }

// // Crea una tabla 
// function createDataTable(db_data)
// {
   
//     const linhas = db_data.map((item, id) => {

//         const tdId = document.createElement('td')
//         tdId.innerHTML = id

//         const tdName = document.createElement('td')
//         tdName.innerHTML = item.name

//         const tdAge = document.createElement('td')
//         tdAge.innerHTML = item.age

//         const tdAct = document.createElement('td')
//         tdAct.innerHTML = `
//             <button id="edit_${id}" act="${id}" class="btn btn-sm btn-outline-primary" onclick="fSetItem(this.attributes.act.value)">Edit</button>
//             <button id="delete_${id}" act="${id}" class="btn btn-sm btn-outline-danger" onclick="fDelete(this.attributes.act.value)" >Delete</button>
//         `

//         const tr = document.createElement('tr')
//         tr.appendChild(tdId)
//         tr.appendChild(tdName)
//         tr.appendChild(tdAge)
//         tr.appendChild(tdAct)
        
//         return tr

//     })

//     const tbody = document.getElementById("items");
//     tbody.innerHTML = "";

//     const tabela = document.getElementById('items')
//     linhas.forEach(item => tabela.appendChild(item))
// }
// function changeView(id){

//     const url = window.location.origin
//     let page

//     if(id == 'bootstrap')
//     {
//         page = `${url}/crud-with-bootstrap.html`
//     }
//     else
//     {
//         page = `${url}/index.html`
//     }

//     window.open(page, '_self')
// }
