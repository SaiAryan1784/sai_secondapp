import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
    endpoint: 'https:///cloud.appwrite.io/v1',
    platform: 'com.sai.app1',
    projectId: '66df10a80034f99f1057',
    databaseId: '66df4f6e000364d5b178',
    userCollectionId: '66df4f9700192f5b86bf',
    videoCollectionId: '66df4fd30011647b068c',
    storageId:'66e050a100217a05e3de'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform) 
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials()

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

    } 
        catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password){
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        throw new Error(error);
    }
}
