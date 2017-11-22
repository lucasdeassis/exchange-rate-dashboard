import axios from 'axios';
class Dolar {
    const get = () => {
      return axios.get('', {
        params: {

        }
      });
    }
}

export default Dolar;
