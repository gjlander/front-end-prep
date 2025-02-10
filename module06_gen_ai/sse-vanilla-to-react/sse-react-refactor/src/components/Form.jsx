import { useState } from 'react';
const Form = () => {
    const [isStream, setIsStream] = useState(false);
    const [prompt, setPrompt] = useState('');
    return (
        <div className='h-1/3 w-full p-8 bg-slate-600 rounded-lg shadow-md'>
            <form>
                <input id='stream' type='checkbox' />
                <label htmlFor='stream'>Stream response?</label>
                <textarea
                    id='prompt'
                    rows='5'
                    placeholder='Ask me anything...'
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                ></textarea>
                <button
                    id='submit'
                    type='submit'
                    className='mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    Submit✨
                </button>
            </form>
        </div>
    );
};

export default Form;
