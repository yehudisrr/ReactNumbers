import React from 'react';
import { Lock, Unlock } from 'react-bootstrap-icons';

class SelectedNumberRow extends React.Component {

    render() {
        const { number, onLockClick, onUnlockClick, isLocked } = this.props;

        return (
            <tr>
                <td>{isLocked ? <Lock /> : <Unlock />}
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    {number.val}
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <button className={`btn btn-${isLocked ? 'danger' : 'success'}`}
                        onClick={isLocked ? onUnlockClick : onLockClick}>
                        {isLocked ? 'Unlock' : 'Lock'}
                    </button>
                </td>
            </tr>
        );
    }
}

export default SelectedNumberRow;
