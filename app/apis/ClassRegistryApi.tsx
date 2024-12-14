import axios from 'axios';

const api = axios.create({
  baseURL: '{{prefix}}', // Thay {{prefix}} bằng URL thực tế
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchOpenClasses = async (token: string) => {
  return api.post('/it5023e/get_open_classes', { token });
};
