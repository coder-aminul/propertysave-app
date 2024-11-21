import * as SecureStore from 'expo-secure-store';

export async function savesecureinfo(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export async function getSecureValue(key: string) {
  const result: any = await SecureStore.getItemAsync(key);
  return result;
}
