import { useContext } from 'react';

import apiContext from '../context/apiContext.js';

const useAPI = () => useContext(apiContext);

export default useAPI;
