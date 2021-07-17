import Editor from './Editor';
import { useState } from 'react';

const initialLayers = [
    {
        x: 80,
        y: 90,
        width: 250,
        height: 120,
        url: '/assets/textures/kosak2222.png'
    },
    {
        x: 600,
        y: 55,
        width: 300,
        height: 220,
        url: '/assets/textures/big.jpg'
    }
];

const initialLayers2 = [
    {
        x: 80,
        y: 55,
        width: 900,
        height: 220,
        url: '/assets/textures/pattern.jpeg'
    }
];
function App() {
    const [startDate, setStartDate] = useState(initialLayers);
    return (
        <div className="App">
            <button
                onClick={() => {
                    startDate === initialLayers
                    ? setStartDate(initialLayers2)
                    : setStartDate(initialLayers)
                    
                }}
            >
                ZMIEN
            </button>
            <Editor
                initialLayers={startDate}
                bgUrl="./assets/textures/UV_Grid_Sm.alpha.png"
                modelUrl="assets/kubek4.obj"
            />
        </div>
    );
}

export default App;
