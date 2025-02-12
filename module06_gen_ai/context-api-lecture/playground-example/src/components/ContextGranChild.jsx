import { useContext } from 'react';
import { UserContext } from '../App';
const ContextGranChild = () => {
    // Use the useContext hook to access the user object
    const user = useContext(UserContext);
    return (
        <div className='text-2xl text-center'>
            Hello there my name is {user.name} and I am {user.age} years old
        </div>
    );
};

export default ContextGranChild;
