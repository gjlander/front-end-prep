import DuckCard from './DuckCard';
// import { duck } from '../data/ducks';

const DuckPond = ({ ducks }) => {
    return (
        <section
            id='pond'
            className='flex justify-center flex-wrap gap-4 p-4 w-full'
        >
            {/* <DuckCard
                {...duck}
                // duck={duck}
            /> */}
            {ducks.map((duck) => (
                <DuckCard key={duck._id} {...duck} />
            ))}
        </section>
    );
};
export default DuckPond;
