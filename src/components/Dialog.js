import React from 'react';

const Dialog = (props) => {
    return (
        <div className="dialog">
            <div className="dialog-content">
                <p>{props.dialog.content}</p>
            </div>
            <div className="dialog-button">
                <button className="dialog-button__cancel">Cancel</button>
                <button className="dialog-button__delete">Delete</button>
            </div>
        </div>
    );
};

export default Dialog;