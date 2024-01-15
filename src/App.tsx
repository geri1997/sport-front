import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const [sports, setSports] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/sports')
            .then((res) => res.json())
            .then(setSports);
    }, []);

    function onEdit(id) {
        const newName = window.prompt('Vendos emrin e ri per sportin:');
        fetch(`http://localhost:4000/sports/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        })
            .then((res) => res.json())
            .then(setSports);
    }

    function createSport() {
        const name = window.prompt('Emri i sportit:');
        fetch('http://localhost:4000/sports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
            .then((res) => res.json())
            .then(setSports);
    }

    return (
        <>
            <div>
                <button onClick={createSport}>Create new Sport</button>
                {sports.map((sport) => {
                    return (
                        <h4>
                            {sport.name}{' '}
                            <span>
                                <button onClick={(e) => onEdit(sport.id)}>
                                    edit
                                </button>
                            </span>
                        </h4>
                    );
                })}
            </div>
        </>
    );
}

export default App;
