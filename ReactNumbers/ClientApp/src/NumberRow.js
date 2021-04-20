import React from 'react';

class NumberRow extends React.Component {

    render() {
        const { number, onSelectClick, onUnselectClick, isSelected, isLocked } = this.props;
        return (
            <tr >
                <td>{number.val}</td>
                <td>
                    <button className={`btn btn-${isSelected ? 'danger' : 'success'}`}
                        disabled={`${isLocked ? 'disabled' : ''}`}
                        onClick={isSelected ? onUnselectClick : onSelectClick}>
                        {isSelected ? 'Unselect' : 'Select'}
                    </button>
                </td>
            </tr>
        );
    }
}

export default NumberRow;