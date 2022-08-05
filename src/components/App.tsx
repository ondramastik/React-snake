import React from 'react';
import GameRouter from "./game/game-router/GameRouter";
import Layout from "./common/layout/Layout";

function App() {
    return (
        <div className="App bg-slate-700">
            <Layout>
                <GameRouter/>
            </Layout>
        </div>
    );
}

export default App;
