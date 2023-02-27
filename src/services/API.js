import axios from 'axios';

axios.defaults.baseURL = 'https://63fc7e48859df29986bdab7d.mockapi.io';

export const fetchAllContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};

export const postContact = async newContact => {
  const response = await axios.post('/contacts', newContact);
  return response.data;
};

export const deleteContactById = async id => {
  await axios.delete(`/contacts/${id}`);
};
