import NoContextChild from './NoContextChild';
const NoContextParent = ({ user }) => {
    return <NoContextChild user={user} />;
};

export default NoContextParent;
