import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedData = { id: 1, title: 'Test title' };

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockedData }),
    });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = axios.create();

    await throttledGetDataFromApi('/posts/1');

    expect(axiosClient.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/posts/1');

    expect(data).toEqual(mockedData);
  });
});
