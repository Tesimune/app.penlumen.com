import axios from '@/lib/axios';

interface SetResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface AllProps {
  setResponse: (response: SetResponse) => void;
}

interface ShowProps {
  id: string;
  setResponse: (response: SetResponse) => void;
}

interface CreateProps {
  data: any;
  setResponse: (response: SetResponse) => void;
}

interface UpdateProps {
  data: any;
  id: string;
  setResponse: (response: SetResponse) => void;
}

interface RemoveProps {
  id: string;
  setResponse: (response: SetResponse) => void;
}

export const useDrive = () => {
  const all = async ({ setResponse }: AllProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/drives', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse({
        success: true,
        message: 'Request successful!',
        data: response.data,
      });
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.response?.data?.message || 'Failed!',
      });
    }
  };

  const show = async ({ id, setResponse }: ShowProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/drive/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse({
        success: true,
        message: 'Request successful!',
        data: response.data,
      });
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.response?.data?.message || 'Failed!',
      });
    }
  };

  const create = async ({ data, setResponse }: CreateProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/drive', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse({
        success: true,
        message: 'Request successful!',
        data: response.data,
      });
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.response?.data?.message || 'Failed!',
      });
    }
  };

  const update = async ({ data, id, setResponse }: UpdateProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/drive/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse({
        success: true,
        message: 'Request successful!',
        data: response.data,
      });
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.response?.data?.message || 'Failed!',
      });
    }
  };

  const remove = async ({ id, setResponse }: RemoveProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`/drive/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse({
        success: true,
        message: 'Request successful!',
        data: response.data,
      });
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.response?.data?.message || 'Failed!',
      });
    }
  };

  return {
    all,
    show,
    create,
    update,
    remove,
  };
};
