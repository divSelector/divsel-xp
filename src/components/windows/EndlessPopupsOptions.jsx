import { useState } from 'react';
import alertIcon from '../../assets/alert.png'
import { useWindow } from '../../hooks/useWindow';
import Window from '../containers/Window';
import EndlessPopups from '../scenarios/EndlessPopups';

const useSlider = (min, max, step, defaultState) => {
    const [state, setSlide] = useState(defaultState);
    const handleChange = e => {
        console.log('setting level', e.target.value)
        setSlide(e.target.value);
    }

    const props = {
        type: 'range',
        min,
        max,
        step: step,
        value: state,
        onChange: handleChange
    }
    return props
}

export default function EndlessPopupsOptions({ isOpen, setIsOpen }) {

    const [isRunning, setIsRunning] = useState(false)

    const startProps = useSlider(8, 20, 2, 8)
    const milisecProps = useSlider(400, 2000, 200, 1000)
    const endProps = useSlider(20, 200, 10, 100)

    const windowSize = { x: 400, y: 200 }
    const windowOptions = {
        initialPosition: {
            x: 200,
            y: 50
        },
        windowSize,
        shouldRaiseZIndex: true,
        iconImg: alertIcon
    }

    const { position, zIndex, commonWindowProps } = useWindow(windowOptions);

    return (
        isOpen && <>
            {!isRunning && <Window
                id="endless-popups-options"
                className="window options"
                windowTitle="endlesspopups.exe config"
                windowStyle={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    width: windowSize.x,
                    zIndex: zIndex,
                }}
                setIsOpen={setIsOpen}
                {...commonWindowProps}
            >
                <div className='options-container'>

                    <div className='options-item'>
                        <div className="field-row">
                            <label htmlFor="start-with">Start</label>
                            <div className="is-vertical">
                                <input
                                    id="start-with"
                                    className="has-box-indicator"
                                    {...startProps}
                                />
                            </div>
                        </div>
                        {startProps.value}
                    </div>


                    <div className='options-item'>
                        <div className="field-row">

                            <label htmlFor="popups-per-msecond">Speed</label>
                            <div className="is-vertical">
                                <input
                                    id="popups-per-msecond"
                                    className="has-box-indicator"
                                    {...milisecProps}
                                />
                            </div>
                        </div>
                        {milisecProps.value}
                    </div>

                    <div className='options-item'>
                        <div className="field-row">
                            <label htmlFor="end-with">End</label>
                            <div className="is-vertical">
                                <input
                                    id="end-with"
                                    className="has-box-indicator"
                                    {...endProps}
                                />
                            </div>
                        </div>
                        {endProps.value}
                    </div>

                </div>

            </Window>}
            {isRunning && <EndlessPopups
                startAt={startProps.value}
                perMiliSec={milisecProps.value}
                endAt={endProps.value}
            />}
        </>
    )
}