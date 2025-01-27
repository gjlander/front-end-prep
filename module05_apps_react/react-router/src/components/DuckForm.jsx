import { useState } from 'react';
const DuckForm = ({ setDucks }) => {
    const [form, setForm] = useState({
        name: '',
        imgUrl: '',
        quote: '',
    });
    const handleChange = (e) => {
        // console.log(e.target.value);

        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newDuck = { ...form, _id: crypto.randomUUID() };
        console.log(newDuck);

        setDucks((prev) => [...prev, newDuck]);
        setForm({
            name: '',
            imgUrl: '',
            quote: '',
        });
    };
    return (
        <section className='flex flex-col items-center gap-4 border-2 rounded-lg p-4 mx-8'>
            <h2 className='text-4xl'>Add a new duck to my pond!</h2>
            <form
                onSubmit={handleSubmit}
                id='add-form'
                className='flex flex-col gap-4 w-3/4'
            >
                <label className='input input-bordered flex items-center gap-2'>
                    <span className='text-xl'>Name:</span>
                    <input
                        onChange={handleChange}
                        value={form.name}
                        name='name'
                        type='text'
                        placeholder="What is your duck's name?"
                        className='grow'
                    />
                </label>
                <label className='input input-bordered flex items-center gap-2'>
                    <span className='text-xl'>Image:</span>
                    <input
                        onChange={handleChange}
                        value={form.imgUrl}
                        name='imgUrl'
                        type='url'
                        placeholder='What does your duck look like?'
                        className='grow'
                    />
                </label>
                <label className='input input-bordered flex items-center gap-2'>
                    <span className='text-xl'>Quote:</span>
                    <input
                        onChange={handleChange}
                        value={form.quote}
                        name='quote'
                        type='text'
                        placeholder='What does your duck say?'
                        className='grow'
                    />
                </label>
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
