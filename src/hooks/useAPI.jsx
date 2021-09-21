import { useContext } from 'react';

import apiContext from '../context/apiContext.jsx';

const useAPI = () => useContext(apiContext);

export default useAPI;
