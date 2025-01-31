import { Account, Client, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.aniket.aora',
    projectId: '679ceb2f002beee0e119',
    databaseId: '679cedab0014eecfd559',
    userCollectionId: '679cedc7000c572279be',
    videoCollectionId: '679cede1000767e7fffc',
    storageId: '679cef390009d23126b0'

}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = async () => {
    try {
        const response = await account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe');
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
    