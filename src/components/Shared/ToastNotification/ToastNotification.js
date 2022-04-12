import React, { useEffect, useState } from 'react';
import './ToastNotification.scss';
import { withTheme } from 'styled-components';
import CloseButton from './CloseButton';
import notificationImage from '../../../assets/svgs/freemium.svg';

const ToastNotification = ({
  closeToast,
  toastProps,
  theme,
  data,
  ...props
}) => {
  return (
    <div className="teament-notification">
      <CloseButton />
      <div className="flex items-center">
        {toastProps.type !== 'error' && data && !data.img && (
          <div className="leaf-container">
            <img src={notificationImage} alt="Leaf" />
          </div>
        )}
        {toastProps.type !== 'error' && data && data.img && (
          <div
            className="profile-container"
            style={{
              ...(props.theme
                ? { borderColor: props.theme.secondary }
                : {}),
            }}
          >
            <img src={data.img} alt="Persona" />
          </div>
        )}
        <div className="notification-body-container flex flex-col">
          {data && data.who && (
            <div className="notification-header mb-1 flex justify-between">
              <div className="who">{data.who}</div>
              <div className="date">{data.date}</div>
            </div>
          )}
          {data && data.event && (
            <div className="notification-event mb-1">
              {data.event}
            </div>
          )}
          <div className="message">{data.message}</div>
        </div>
      </div>
    </div>
  );
};
export default withTheme(ToastNotification);
