import React, { useState } from "react";
import ReactDOM from "react-dom";


import { ProgressBar } from 'devextreme-react/progress-bar';
import { Button } from 'devextreme-react/button';

const maxValue = 10;

const formatTime = (value) => {
    return `00:00:${(`0${value}`).slice(-2)}`;
}

const statusFormat = (value) => {
    return `Loading: ${value * 100}%`;
}

let intervalId;


const ProgressInstance = ({ state }) => {

    let activeState = {
        progress: 0,
        max: 100,
        seconds: maxValue,
        buttonText: 'Start progress',
        inProgress: false
    };
    let actions = {
        setProgress: null
    };
    let handlers = {

    };

    const Progress = ({

    }) => {
        let [progressState, doSetState] = useState(activeState)


        const setState = (newState) => {
            activeState = {
                ...progressState,
                ...newState
            };
            doSetState(activeState);
        }

        actions.setProgress = (current, max, seconds) => {
            setState({
                seconds: seconds,
                progress: current,
                max: max
            })
        }


        const onButtonClick = () => {
            const state = {
                inProgress: !activeState.inProgress
            };

            if (activeState.inProgress) {
                state.buttonText = 'Continue progress';
                clearInterval(intervalId);
            } else {
                state.buttonText = 'Stop progress';

                if (activeState.seconds === 0) {
                    state.seconds = maxValue;
                }

                intervalId = setInterval(() => timer(), 1000);
            }

            setState(state);
        }

        const timer = () => {
            const state = {
                seconds: activeState.seconds - 1
            };

            if (state.seconds == 0) {
                state.buttonText = 'Restart progress';
                state.inProgress = !activeState.inProgress;
                clearInterval(intervalId);
            }

            setState(state);
        }
        return (
            <div className="form">
                <Button
                    id="progress-button"
                    text={progressState.buttonText}
                    width={200}
                    onClick={onButtonClick}
                />
                <div className="progress-info">
                    Time left {formatTime(progressState.seconds)}
                </div>
                <ProgressBar
                    id="progress-bar-status"
                    className={progressState.seconds == 0 ? 'complete' : ''}
                    width="90%"
                    min={0}
                    max={progressState.max}
                    statusFormat={statusFormat}
                    value={progressState.progress}
                />
            </div>
        )
    }

    return {
        component: <Progress state={state}></Progress>,
        on: (action, handler) => {
            switch (action) {
                case "":
                    return;
            }
        },
        setProgress: (current, max, seconds) => {
            actions.setProgress(current, max, seconds)
        }
    }
}

export const create = ({ element, state }) => {
    const instance = ProgressInstance({
        state: state,
    });
    const QueryEditor = instance.component;
    ReactDOM.render(QueryEditor, element);
    return instance;
};
