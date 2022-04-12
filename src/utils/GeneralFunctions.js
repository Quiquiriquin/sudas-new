/* eslint-disable no-undef */
import React from 'react';
import { format } from 'date-fns-tz';
import moment from 'moment';
import { toast } from 'react-toastify';
/**
 * Set local storage items for the keys that items param has
 * @param items { Object }
 */
import ToastNotification from '../components/Shared/ToastNotification/ToastNotification';

export const setLocalStorage = (items) => {
  console.log(items);
  Object.keys(items).forEach((key) => {
    if (typeof items[key] === 'object') {
      if (items[key]) {
        const aux = items[key]
          .map((e) => JSON.stringify(e))
          .join(',');
        localStorage.setItem(key, aux);
      }
    }
    localStorage.setItem(key, items[key]);
  });
};

export const handleNotification = (body, message) => {
  if (body.data) {
    const { data } = body;
    if (data.status === 'successful' || !data.status) {
      toast(<ToastNotification />, {
        data: {
          message,
        },
      });
    }
  } else if (body.status && body.status === 'failed') {
    toast.error(<ToastNotification />, {
      data: {
        message,
      },
    });
  }
};

export const createFileUrl = (file, regex = null) => {
  return new Promise((resolve, reject) => {
    if (!regex) {
      if (file) {
        resolve({
          data_url: URL.createObjectURL(file),
          file,
        });
      }
    } else if (file) {
      const isValid = regex.test(file.type);
      if (isValid) {
        resolve({
          data_url: URL.createObjectURL(file),
          file,
        });
      } else {
        reject(new Error('File is not valid with regex'));
      }
    }
  });
};

export const setToLS = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

// eslint-disable-next-line consistent-return
export const getFromLS = (key) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

export const epochToDate = (epoch) => {
  const tempDate = moment.unix(epoch);
  return tempDate.toDate();
};

export const formatDate = (
  date,
  showTime = false,
  normal = false,
  year = 'YY'
) => {
  if (showTime) {
    return format(new Date(date), 'dd.MM.yyyy/HH:MM', {
      timeZone: 'es-MX',
      locale: es,
    });
  }
  if (normal) {
    return format(new Date(date), 'yyyy-MM-dd', {
      timeZone: 'es-MX',
      locale: es,
    });
  }

  return moment(date).format(`DD.MM.${year}`).toLocaleString();
};
