import {
    collection,
    addDoc,
    query,
    getDocs,
    where,
    Timestamp,
} from 'firebase/firestore';
import { db, doc, setDoc, updateDoc } from './firebase.js';

import { clients, data } from '../util/constants.js';
import { logs } from '../util/logs.js';
import { getUTCDateRange } from '../util/helpers.js';

/* Settings */

// reads vs writes?

// BFS has O(V + E) time complexity compared to recursion
const populateClientSetting = async (node, clientName) => {
    const queue = [node];

    try {
        while (queue.length > 0) {
            const node = queue.shift();

            let obj = {
                name: node.name,
                checked: node.checked,
                children: [],
            };

            for (let child of node.children) {
                obj.children.push(child.name);
                queue.push(child);
            }

            const docRef = await addDoc(
                collection(db, `${clientName}_settings`),
                obj
            );
            console.log('Pushed doc with ref: ', docRef);
        }
    } catch (e) {
        console.error('Something went wrong while adding settings to DB: ', e);
    }
};

// Populate all of the documents for a client
export const populateSettings = async (tree, clients) => {
    // clients.forEach((client) => {
    //     for (let child of tree.children) {
    //         populateClientSetting(child, client.name);
    //     }
    // });
};

export const retrieveOneClientSettings = async (clientName) => {
    const docsRef = (db, `${clientName}_settings`);
    const q = query(docsRef);
    const querySnapshot = await getDocs(q);
    // TODO
};

export const updateOneClientSettings = async (clientName, node) => {
    console.log('Updating...');
    const queue = [node];

    try {
        while (queue.length > 0) {
            const node = queue.shift();

            let obj = {
                name: node.name,
                checked: node.checked,
                children: [],
            };

            for (let child of node.children) {
                obj.children.push(child.name);
                queue.push(child);
            }

            await updateOneClientSingleSetting(
                clientName,
                node.name,
                node.checked
            );
        }
    } catch (e) {
        console.error('Something went wrong while adding settings to DB: ', e);
    }
};

export const updateOneClientSingleSetting = async (clientName, name, value) => {
    try {
        const q = query(
            collection(db, `${clientName}_settings`),
            where('name', '==', name)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            console.log(doc.data());
            const docRef = await updateDoc(doc, {
                checked: value,
            });
            console.log('Updated doc with ID: ', docRef);
        });
    } catch (e) {
        console.error('Something went wrong with updating record: ', e);
    }
};

/* Calendar logs */

export const populateSampleLogs = async () => {
    try {
        const logsGMT7 = logs.map((log) => {
            const dateObj = new Date(log.date);
            // Add 7 hours in milliseconds
            const gmt7Time = new Date(dateObj.getTime() + 7 * 60 * 60 * 1000);
            // Return in ISO format (still with 'Z' removed for local time feel)
            return {
                date: gmt7Time.toISOString().replace('Z', '+07:00'),
                text: log.text,
            };
        });

        for (let log of logsGMT7) {
            const docRef = await addDoc(collection(db, 'logs'), {
                date: Timestamp.fromDate(new Date(log.date)),
                text: log.text,
            });
            console.log('Doc added: ', docRef.id);
        }
    } catch (e) {
        console.error('Error adding doc: ', e);
    }
};

// export const retrieveSampleLogs = async () => {
//     try {
//         const querySnapshot = await getDocs(collection(db, 'logs'));
//         querySnapshot.forEach((doc) => {
//             console.log(doc.data());
//         });
//     } catch (e) {
//         console.error('Error retrieving logs: ', e);
//     }
// };

export const querySampleLogs = async (date) => {
    try {
        console.log(`Retrieving log for date ${date}`);
        const logsRef = collection(db, 'logs');

        const { start, end } = getUTCDateRange(date);
        const startTime = Timestamp.fromDate(start);
        const endTime = Timestamp.fromDate(end);

        const q = query(
            logsRef,
            where('date', '>=', startTime),
            where('date', '<=', endTime)
        );

        const logs = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            logs.push(doc.data());
        });
        return logs;
    } catch (e) {
        console.error('Error retrieving logs: ', e);
    }
};
