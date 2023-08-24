import { createContext, useContext, useState } from 'react';

const ScenarioContext = createContext();

export function ScenarioProvider({ children }) {

    const [scenarioIdx, setScenarioIdx] = useState(0)

    console.log(scenarioIdx)

    return (
        <ScenarioContext.Provider value={{
            scenarioIdx, setScenarioIdx
        }}>
            {children}
        </ScenarioContext.Provider>
    );
}

export function useScenario() {
    return useContext(ScenarioContext);
}