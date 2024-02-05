import { account } from "./appwriteconfig";

const regForm = document.getElementById('regForm');

const register = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pswrd = e.target.password.value;
    console.log(name, email, pswrd);
    try {
        const res = await account.create('unique()', email, pswrd, name);
        console.log(res);
        await account.createEmailSession(email, pswrd);
        window.location.href = './index.html';
    } catch (e) {
        alert('error creating account', e)
    }
}

regForm.addEventListener('submit', register);