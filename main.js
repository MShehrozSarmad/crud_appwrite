import './style.css';
import { crtDataHandler, delhandler, getDataHandler, updateHandler, logout, getUserData } from './appwriteconfig';

const form = document.getElementById('form');
const list = document.getElementById('list');
const usrCntnr = document.getElementById('userData');
const name = document.getElementById('name');
let edtbl = false;

// ------------------------------------------------------------------------------------------

async function checkUser() {
  try {
    const user = await getUserData();
    if (!user.$id) {
      window.location.href = './login.html';
    }

    const btn = document.createElement('button');
    btn.textContent = 'Logout';
    btn.addEventListener('click', logout)
    usrCntnr.appendChild(btn);

    name.textContent = `Welcome ${user.name} !`


  } catch (error) {
    console.error(error);
    window.location.href = './login.html';
  }
}
checkUser();


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
  buttonDel.addEventListener('click', async () => {
    document.getElementById(data.$id).remove();
    await delhandler(data.$id)
    //   list.insertAdjacentElement('afterbegin', li);
  });


  // update handler
  buttonEdt.addEventListener('click', async (e) => {
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
      await updateHandler( data.$id ,{ 'task': targett.textContent })
    }
  })

  li.childNodes[0].addEventListener('dblclick', async (e) => {
    data.status = !data.status;
    e.target.className = `taskStts-${data.status}`
    await updateHandler(data.$id, { 'status': data.status })
  })

}


// get tasks
async function getTasks() {
  const data = await getDataHandler();
  console.log(data.documents);
  for (const task of data.documents) {
    renderTasks(task)
  }
}
getTasks();


// add tasks
async function addTask(tskVal) {
  const response = await crtDataHandler({ 'task': tskVal, 'status': false })
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

