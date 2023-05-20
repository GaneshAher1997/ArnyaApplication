import AsyncStorage from "@react-native-async-storage/async-storage";


export const getAsyncData = async (STORAGE_KEY) => {
  try {
    let rawData = await AsyncStorage.getItem(STORAGE_KEY);
    return rawData !== null ? JSON.parse(rawData) : null;
  } catch (e) {
    throw new Error("failed data retrieve from device");
  }
};

export const saveAsyncData = async (STORAGE_KEY, value) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (e) {
    throw new Error("failed data save to device");
  }
};

export const clearAsyncData = async (STORAGE_KEY) => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    throw new Error("failed to remove data from device");
  }
};

export const getObjFromDynamicForm = (arr) => {
  var obj = {};
  for (var i = 0; i < arr.length; ++i) {
    obj[arr[i].key] = arr[i].value;
  }
  return obj;
};

export const capitalize = (s) => {
  if(!s){
    return null;
  }
  let str = s && s.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
};

export const getCapitalizeTextWithoutExtraSpaces = (text) => {
  const words = text.replace(/\s+/g, " ").trim().split(" ");

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
};

// export const shortenNumber = num => {
//   num = num.toString().replace(/[^0-9.]/g, '');
//   if (num < 1000) {
//       return num;
//   }
//   let si = [
//     {v: 1E3, s: "K"},
//     {v: 1E6, s: "M"},
//     {v: 1E9, s: "B"},
//     {v: 1E12, s: "T"},
//     {v: 1E15, s: "P"},
//     {v: 1E18, s: "E"}
//     ];
//   let index;
//   for (index = si.length - 1; index > 0; index--) {
//       if (num >= si[index].v) {
//           break;
//       }
//   }
//   return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
// };

export const shortenNumber = number => {
  if (number < 10000) {
    return number.toString();
  }

  const suffixes = ["", "K", "M", "B", "T"];
  let suffixNum = 0;
  let shortNumber = number;

  while (shortNumber >= 1000 && suffixNum < suffixes.length - 1) {
    shortNumber /= 1000;
    suffixNum++;
  }

  const roundedNumber = Math.floor(shortNumber * 100) / 100;
  return roundedNumber + suffixes[suffixNum];
};