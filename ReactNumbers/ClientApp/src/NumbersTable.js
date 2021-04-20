import React from 'react';
import NumberRow from './NumberRow';
import SelectedNumberRow from './SelectedNumberRow';
import { produce } from 'immer';

class NumbersTable extends React.Component {

    state = {
        number: {
            id: 0,
            val: ''
        },
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }

    onAddClick = () => {
        const nextState = produce(this.state, draftState => {
            draftState.number['id'] = draftState.number['id'] + 1;
            draftState.number['val'] = Math.floor(Math.random() * 1000) + 1;
            draftState.numbers.push(draftState.number);
        });
        this.setState(nextState);
    }

    onSelectClick = (number) => {
        const nextState = produce(this.state, draftState => {
            draftState.selectedNumbers.push(number);
        });

        this.setState(nextState);
    }

    onUnselectClick = number => {
        const filtered = this.state.selectedNumbers.filter(n => n.id !== number.id);
        this.setState({ selectedNumbers: filtered });
    }

    isNumberSelected = number => {
        const selected = this.state.selectedNumbers.find(n => n.id === number.id);
        return !!selected;
    }

    onLockClick = (number) => {
        const nextState = produce(this.state, draftState => {
            draftState.lockedNumbers.push(number);
        });

        this.setState(nextState);
    }

    onUnlockClick = number => {
        const filtered = this.state.lockedNumbers.filter(n => n.id !== number.id);
        this.setState({ lockedNumbers: filtered });
    }

    isLocked = number => {
        const locked = this.state.lockedNumbers.find(n => n.id === number.id);
        return !!locked;
    }

    render() {
        const { numbers, selectedNumbers } = this.state;

        return (
            <div className="container" style={{ marginTop: 60, alignContent: "center" }}>
                <button style={{ fontSize: 30 }}
                    className="btn btn-outline-primary .btn-block"
                    onClick={this.onAddClick}>
                    Click to Add a Number and then do some cool selecting and locking!!
                </button>
                <p>&nbsp;</p>
                {!!numbers.length &&
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Select/Unselect</th>
                            </tr>
                        </thead>
                        <tbody>
                            {numbers.map((n, i) => {
                                const currentNumber = n;
                                return <NumberRow key={i}
                                    number={n}
                                    onSelectClick={() => this.onSelectClick(currentNumber)}
                                    onUnselectClick={() => this.onUnselectClick(currentNumber)}
                                    isSelected={this.isNumberSelected(n)}
                                    isLocked={this.isLocked(currentNumber)}
                                />
                            })}
                        </tbody>
                    </table>
                }
                {!!selectedNumbers.length &&
                    <div className="col-md-6">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Selected Numbers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedNumbers.map((n, i) => {
                                    const currentNumber = n;
                                    return <SelectedNumberRow key={i}
                                        number={n}
                                        onLockClick={() => this.onLockClick(currentNumber)}
                                        onUnlockClick={() => this.onUnlockClick(currentNumber)}
                                        isLocked={this.isLocked(n)}
                                    />
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default NumbersTable;