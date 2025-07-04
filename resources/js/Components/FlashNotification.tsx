import styled from "styled-components";
import parse from 'html-react-parser';
import React from "react";

interface NotificationData {
    style: 'primary'|'success'|'danger',
    text: string,
    isOpen: string,
    onClose(): void
}

export default function ({text, style, isOpen, onClose}: NotificationData) {
    let iconClass = '';

    switch (style) {
        case "primary":
            iconClass = 'fa-regular fa-bell';
            break;
        case "success":
            iconClass = 'fa-regular fa-square-check';
            break;
        case "danger":
            iconClass = 'fa-solid fa-triangle-exclamation';
            break;

    }

    return (
        <Wrapper styletype={style} isopen={isOpen}>
            <div className="row">
                <div className="col-2 my-auto">
                    <i className={iconClass}></i>
                </div>
                <div className="col-10 text-end">
                    <div className="d-flex justify-content-between">
                        <div className="col-8 text-start text-dark">
                            { parse(text) }
                        </div>
                        <div className="col-1 text-end">
                            <small className="text-decoration-underline pe-2"
                                   onClick={() => onClose()}><a className={"text-dark"} href="#"><i className="fa-solid fa-xmark"></i></a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div<{ styletype: string, isopen: string }>`
    max-width: 350px;
    color: ${props => {
        switch (props.styletype) {
            case 'primary':
                return '#1a1a1a';
            case 'success':
                return '#198754';
            case 'danger':
                return '#dc3545';
            default:
                return 'white';
        }
    }};
    background-color: ${props => {
        switch (props.styletype) {
            case 'primary':
                return 'rgba(26, 26, 26, 0.15)';
            case 'success':
                return 'rgba(25, 135, 84, 0.15)';
            case 'danger':
                return 'rgba(220, 53, 69, 0.15)';
            default:
                return 'white';
        }
    }};;
    position: fixed;
    bottom: 160px;
    right: 50px;
    z-index: 10000;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => {
        switch (props.styletype) {
            case 'primary':
                return '#1a1a1a';
            case 'success':
                return '#198754';
            case 'danger':
                return '#dc3545';
            default:
                return 'white';
        }
    }};
    border-radius: 10px;
    padding: 15px;
    transform: ${props => {
        if (props.isopen !== 'false') {
            return undefined;
        } else {
            return 'translateY(400px)';
        }
    }};
    opacity: ${props => {
        if (props.isopen !== 'false') {
            return 1;
        } else {
            return 0;
        }
    }};;
    transition: transform 250ms ease-in, opacity 700ms ease-in, opacity 100ms ease-out;
`
