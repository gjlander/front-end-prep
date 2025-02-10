import Form from './components/Form';
import Chat from './components/Chat';
function App() {
    return (
        <div className='h-screen container mx-auto p-5 flex flex-col justify-between gap-5'>
            <Form />
            <Chat />
        </div>
    );
}

export default App;
