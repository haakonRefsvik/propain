import AsyncStorage from '@react-native-async-storage/async-storage';


// value: liters of the tank
// key: users name of the tank
const storeData = async (value: number, key: string) => {
        try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (e) {
        throw e
    }
  };

const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("data found", value)
      }
      else{
        console.log("no data found...")
      }
    } catch (e) {
        throw e
    }
};

const getAllData = async () => {
  try {
      const keys = await AsyncStorage.getAllKeys()
      const items = await AsyncStorage.multiGet(keys)

      return items.map(([key, value]) => ({ key, value: value ? JSON.parse(value) : null }));

  } catch (error) {
      console.log(error, "problemo")
  }
};


export {storeData, getData, getAllData}