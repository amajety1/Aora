import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  

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
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = await database.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        })
        return newUser
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
    
export async function signIn(email, password) {
    console.log("Signing in with email:", email); // Log the email

    try {
        // Check if a session is already active
        try {
            const currentSession = await account.getSession("current");
            console.log("User is already signed in:", currentSession);

            // If there's an active session, log the user out before signing in again
            await account.deleteSession("current");
            console.log("Existing session deleted, signing in again...");
        } catch (error) {
            // If there's no active session, we proceed to sign in
            console.log("No active session found, proceeding to sign in.");
        }

        // Now create a new session
        const session = await account.createEmailPasswordSession(email, password);
        console.log("Session created:", session); // Log the session

        return session; // Return the session object
    } catch (error) {
        console.error("Error during sign in:", error);
        throw new Error(error.message || "An error occurred during sign in.");
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get(); // Use account.get() instead of getAccount()
        console.log("Current account:", currentAccount); // Log the current account

        if (!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );
        console.log("Current user:", currentUser); // Log the current user

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

