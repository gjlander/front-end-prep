import { useState } from 'react';
//since the data passed via the outlet, we import the useOutletContext hook from react-router
import { useOutletContext } from 'react-router';
import DuckPond from '../components/DuckPond';
import DuckForm from '../components/DuckForm';

const MyPond = () => {
    const [myDucks, setMyDucks] = useState(
        JSON.parse(localStorage.getItem('myDucks')) || []
    );
    // to access the state (or any data), we simply deconstruct it
    const { signedIn } = useOutletContext();

    //then we can use it to conditionally render
    if (!signedIn)
        return (
            <h2 className='text-center text-6xl'>
                Please sign in to access your personal pond.
            </h2>
        );
    return (
        <>
            <DuckForm setDucks={setMyDucks} />
            <DuckPond ducks={myDucks} />
        </>
    );
};

export default MyPond;
