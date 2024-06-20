import { useDrag } from 'react-dnd';


const GameDeckToon = ({ dToon }) => {

    console.log('dtoon GAMEDECK', dToon);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'dToon',
        item: { dToon: dToon },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));



    return (

        <img className='gameDeckToon' ref={drag} src={dToon.image} alt='toon image here' />
    
    )
}

export default GameDeckToon;
