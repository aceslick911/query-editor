import React, { useState } from "react";
import ReactDOM from "react-dom";


import { ProgressBar } from 'devextreme-react/progress-bar';
import { Button } from 'devextreme-react/button';
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format';

const maxValue = 10;

const formatTime = (seconds) => {
    if (seconds == 0) {
        return "Ready"
    } else {
        return moment.duration(seconds, "s").format("hh:mm:ss") + " remaining";
    }
    //return `00:${Math.trunc(value / 60)}:${(`0${value - (Math.trunc(value / 60) * 60)}`).slice(-2)}`;
}

const statusFormat = (value) => {
    return `Loading: ${Math.round(value * 100) / 100 * 100}%`;
}

let intervalId;


const ProgressInstance = ({ state }) => {

    let activeState = {
        progress: maxValue,
        max: 100,
        seconds: maxValue,
        buttonText: 'Start progress',
        inProgress: false,
        label: "Ready"
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

        actions.setProgress = (current, max, seconds, label) => {
            setState({
                seconds: seconds,
                progress: current,
                max: max,
                label
            })
        }


        return (
            <div className="form">
                <div className="progress-info">
                    {progressState.label} - {formatTime(progressState.seconds)}
                </div>
                <ProgressBar
                    id="progress-bar-status"
                    className={progressState.seconds == 0 ? 'complete' : ''}
                    width="100%"
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
        setProgress: (current, max, seconds, label) => {
            actions.setProgress(current, max, seconds, label)
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
