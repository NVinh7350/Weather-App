import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAsyncStorage = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, item);
    } catch (error) {
        console.log(error);
    }
};

export const getAsyncStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value) {
            return value;
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
};

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error)
    }
};