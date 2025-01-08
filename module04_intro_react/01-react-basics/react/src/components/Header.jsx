const Header = () => {
    const handleClick = () => {
        console.log('You tried to summon the ducks!');
    };
    return (
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
                onClick={handleClick}
                // onClick={() => console.log('Another way to add an onClick!')}
            >
                Summon the ducks!
            </button>
        </header>
    );
};

export default Header;
