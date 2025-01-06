function App() {
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <nav className='flex justify-end bg-slate-800 py-2 px-8 text-2xl mb-6'>
                <ul className='flex gap-6'>
                    <li className='p-2 rounded-lg hover:bg-slate-600'>
                        <a href='index.html'>Home</a>
                    </li>
                    <li className='p-2 rounded-lg hover:bg-slate-600'>
                        <a href='src/myPond.html'>My Pond</a>
                    </li>
                </ul>
            </nav>
            <header className='text-center'>
                <h1
                    // style={{
                    //     backgroundColor: 'red',
                    //     padding: '1rem',
                    // }}
                    className='text-6xl mb-6'
                >
                    The Duck Pond
                </h1>
                <button
                    id='summon-btn'
                    className='bg-purple-600 p-4 rounded-lg text-2xl'
                >
                    Summon the ducks!
                </button>
            </header>
            <main className='flex-grow flex flex-col justify-between py-4'>
                <section
                    id='pond'
                    className='flex justify-center flex-wrap gap-4 p-4 w-full'
                ></section>
                <section className='flex flex-col items-center gap-4 border-2 rounded-lg p-4 mx-8 justify-self-end'>
                    <h2 className='text-4xl'>Add a new duck to my pond!</h2>
                    <form id='add-form' className='flex flex-col gap-4 w-3/4'>
                        <input
                            id='name'
                            type='text'
                            placeholder="What is your duck's name?"
                            className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                        />
                        <input
                            id='img-url'
                            type='url'
                            placeholder='What does your duck look like?'
                            className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                        />
                        <input
                            id='quote'
                            type='text'
                            placeholder='What does your duck say?'
                            className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                        />
                        <button
                            type='submit'
                            className='bg-green-600 p-2 rounded-lg font-bold'
                        >
                            Add duck
                        </button>
                    </form>
                </section>
            </main>
            <footer className='flex justify-center bg-slate-800 py-4 text-2xl w-full'>
                © Copyright Ducks on Ducks on Ducks, all right reserved
            </footer>
        </div>
    );
}

export default App;
