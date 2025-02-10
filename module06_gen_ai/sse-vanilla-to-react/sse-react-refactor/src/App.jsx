import { useState } from 'react';
import Form from './components/Form';
import Chat from './components/Chat';
function App() {
    const [dataResult, setDataResult] = useState('');
    return (
        <div className='h-screen container mx-auto p-5 flex flex-col justify-between gap-5'>
            <Form setDataResult={setDataResult} />
            <Chat dataResult={dataResult} />
        </div>
    );
}

export default App;
