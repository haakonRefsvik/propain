import AsyncStorage from '@react-native-async-storage/async-storage';
import Tank from '../constants/Tank';


const storeData = async (key: string, tank: Tank) => {
  try {
      const jsonString = JSON.stringify(tank);
      await AsyncStorage.setItem(key, jsonString);
  } catch (error) {
      console.error('Error storing object', error);
  }
};

const getData = async (key: string) => {
  try {
    const jsonString = await AsyncStorage.getItem(key);
    if (jsonString != null) {
        return JSON.parse(jsonString);
    }
    return null;
  } catch (error) {
      console.error('Error retrieving object', error);
  }
};

const deleteData = async(key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
      throw e
  }
}

const getAllData = async (): Promise<Tank[]> => {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    
    // Retrieve all values associated with the keys
    const items = await AsyncStorage.multiGet(keys);

    // Filter and parse each value from JSON string to Tank object
    const tanks = items
      .map(([key, value]) => {
        try {
          // Parse the JSON string
          const parsedValue = value ? JSON.parse(value) : null;
          // Cast the parsed value to Tank if it is not null
          return parsedValue ? Object.assign(new Tank('', 0, 0, () => <></>), parsedValue) : null;
        } catch (error) {
          console.error(`Error parsing JSON for key "${key}":`, error);
          return null;
        }
      })
      .filter(tank => tank !== null) as Tank[]; // Filter out any null values

    return tanks;
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage:", error);
    return [];  // Return an empty array in case of error
  }
};


export {storeData, getData, getAllData, deleteData}