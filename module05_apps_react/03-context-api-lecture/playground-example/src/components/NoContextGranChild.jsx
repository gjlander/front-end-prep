const NoContextGranChild = ({ user }) => {
    return (
        <div className='text-2xl text-center'>
            Hello there my name is {user.name} and I am {user.age} years old
        </div>
    );
};

export default NoContextGranChild;
