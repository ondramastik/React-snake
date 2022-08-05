import React from 'react';
import GameRouter from "./game/game-router/GameRouter";
import Layout from "./layout/Layout";

function App() {
    return (
        <div className="App">
            <Layout>
                <GameRouter/>
            </Layout>
        </div>
    );
}

export default App;
