import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

const toastOptions = {
    duration: 5000,
    close: false,
    gravity: 'bottom',
    position: 'right',
};

export default {
    install (Vue, opts) {

        Vue.prototype.$notify = {

            /**
            * @name info
            * @description Shows info toast message.
            */
            info: (text) => {

                Toastify(Object.assign({
                    text: text,
                    className: 'wen-toast wen-toast-info',
                }, toastOptions)).showToast();
            },

            /**
            * @name success
            * @description Shows success toast message.
            */
            success: (text) => {

                Toastify(Object.assign({
                    text: text,
                    className: 'wen-toast wen-toast-success',
                }, toastOptions)).showToast();
            },

            /**
            * @name error
            * @description Shows error toast message.
            */
            error: (text) => {

                Toastify(Object.assign({
                    text: text,
                    className: 'wen-toast wen-toast-error',
                }, toastOptions)).showToast();
            }
        };
    }
};
