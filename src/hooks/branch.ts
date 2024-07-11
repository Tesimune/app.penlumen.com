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
  uuid: string;
  setResponse: (response: SetResponse) => void;
}

interface CreateProps {
  data: any;
  setResponse: (response: SetResponse) => void;
}

interface UpdateProps {
  data: any;
  uuid: string;
  setResponse: (response: SetResponse) => void;
}

interface RemoveProps {
  uuid: string;
  setResponse: (response: SetResponse) => void;
}

export const useBranch = () => {
  const all = async ({ setResponse }: AllProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/drafts', {
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

  const show = async ({ uuid, setResponse }: ShowProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/draft/${uuid}`, {
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
      const response = await axios.post('/draft', data, {
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

  const update = async ({ data, uuid, setResponse }: UpdateProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/draft/${uuid}`, data, {
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

  const remove = async ({ uuid, setResponse }: RemoveProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`/draft/${uuid}`, {
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
