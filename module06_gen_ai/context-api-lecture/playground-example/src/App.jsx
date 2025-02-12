/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react';
import './index.css';
import ContextParent from './components/ContextParent';
import NoContextParent from './components/NoContextParent';

// Create a Context for the user object
export const UserContext = createContext();
const App = () => {
    const user = { name: 'Onur Erdogan', age: 95 };

    return (
        <>
            {/* In the no-context tree we need to pass the user as prop from NoContextParent
        all the way to the NoContextGrandchild */}
            <NoContextParent user={user} />
            <br />
            {/* For the context tree we use the Context Provider object, which is a component,
      define a value. This value is then accessible via the usage of the useContext hook directly in ContextGranChild */}
            <UserContext.Provider value={user}>
                <ContextParent />
            </UserContext.Provider>
        </>
    );
};

export default App;
