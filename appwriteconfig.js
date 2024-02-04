import { Client, Databases, ID, Account, Query } from 'appwrite';
const dbID = '';
const collecID = '';
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('');
const db = new Databases(client);
export const account = new Account(client);

export const getUserData = async () => {
    const res = await account.get('current');
    return res;
}

// utils
export const getDataHandler = async () => {
    return await db.listDocuments(dbID, collecID, [Query.equal('email', (await getUserData()).email)]);
}

export const crtDataHandler = async (rec) => {
    return await db.createDocument(dbID, collecID, ID.unique(), { 'email': (await getUserData()).email, ...rec });
}

export const updateHandler = async (recID, rec) => {
    await db.updateDocument(dbID, collecID, recID, rec)
}

export const delhandler = async (recID) => {
    await db.deleteDocument(dbID, collecID, recID)
        .catch((error) => {
            alert('failed to delete')
            console.error('Failed to delete document:', error);
        });
}


// ------------------------------------------------------------------------------------------

export const logout = async () => {
    try {
        await account.deleteSession('current');
        window.location.href = './login.html';
        alert('successfully logged out')
    } catch (e) {
        alert('error logging out')
    }
}
