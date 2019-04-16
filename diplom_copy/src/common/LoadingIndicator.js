import React from 'react';
import { Spinner, Button } from 'react-bootstrap';


export default function LoadingIndicator(props) {

    return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}