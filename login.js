import { account } from "./appwriteconfig";
const loginForm = document.getElementById('lgnForm');

const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pswrd = e.target.password.value;
    console.log(email, pswrd);
    try {
        const res = await account.createEmailSession(email, pswrd);
        console.log(res);
        window.location.href = './index.html';
    } catch (e) {
        alert('error login account')
    }
}

loginForm.addEventListener('submit', login)