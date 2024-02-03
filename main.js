// appwrite config
import './style.css';
import { Client, Databases, ID } from 'appwrite';
const dbID = '';
const collecID = '';
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65bcb8973e5e140c8a6e');
const db = new Databases(client);
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

const form = document.getElementById('form');
const list = document.getElementById('list');
let edtbl = false;


const renderTasks = async (data) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const buttonEdt = document.createElement('button');
  const buttonDel = document.createElement('button');
  const btns = document.createElement('div');

  span.textContent = data.task;
  span.className = `taskStts-${data.status}`;
  buttonEdt.textContent = '✏️';
  buttonDel.textContent = '❌';
  btns.appendChild(buttonEdt);
  btns.appendChild(buttonDel);

  li.appendChild(span);
  li.appendChild(btns);
  li.id = data.$id;
  li.classList.add('listItem')
  list.insertAdjacentElement('afterbegin', li);

  // del handler
  buttonDel.addEventListener('click', () => {
    document.getElementById(data.$id).remove();
    db.deleteDocument(dbID, collecID, data.$id)
      .catch((error) => {
        console.error('Failed to delete document:', error);
        list.insertAdjacentElement('afterbegin', li);
      });
  });


  // update handler
  buttonEdt.addEventListener('click', (e) => {
    let targett = document.getElementById(data.$id);
    targett = targett.childNodes[0];
    edtbl = !edtbl;
    if (edtbl) {
      e.target.textContent = '📝'
      targett.contentEditable = true;
      targett.focus();
    } else {
      e.target.textContent = '✏️'
      targett.contentEditable = false;
      db.updateDocument(dbID, collecID, data.$id, { 'task': targett.textContent })
    }
  })

  li.childNodes[0].addEventListener('dblclick', async (e) => {
    data.status = !data.status;
    e.target.className = `taskStts-${data.status}`
    db.updateDocument(dbID, collecID, data.$id, { 'status': data.status })
  })

}


// get tasks
async function getTasks() {
  const data = await db.listDocuments(dbID, collecID);
  console.log(data.documents);
  for (const task of data.documents) {
    renderTasks(task)
  }
}
getTasks();


// add tasks
async function addTask(tskVal) {
  const response = await db.createDocument(dbID, collecID, ID.unique(), { 'task': tskVal, 'status': false });
  console.log(response);
  renderTasks(response);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = e.target.data.value;
  console.log(data);
  addTask(data);
  form.reset();
})
