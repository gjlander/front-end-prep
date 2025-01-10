const DuckForm = () => {
    return (
        <section className='flex flex-col items-center gap-4 border-2 rounded-lg p-4 mx-8'>
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
    );
};

export default DuckForm;
