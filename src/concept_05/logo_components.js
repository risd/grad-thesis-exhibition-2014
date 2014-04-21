module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left',
    start: {
        top: '30%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right',
    type: 'line',
    start: {
        top: 'auto',
        bottom: '60%',
        left: 'auto',
        right: '30%',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: 'auto',
        bottom: '50%',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: 'auto',
                bottom: (height * 0.6) + 'px',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: 'auto',
                bottom: (height * 0.5) + 'px',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right',
    type: 'line',
    start: {
        top: 'auto',
        bottom: '40%',
        left: 'auto',
        right: '30%',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: 'auto',
        bottom: '50px',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: 'auto',
                bottom: (height * 0.4) + 'px',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: 'auto',
                bottom: '50px',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Rhode Island School of Design<br>'+
          'Annual Grad Thesis Exhibition',
    cls: 'logo-component--subheadline text-left',
    type: 'subsidiary',
    start: {
        top: '50%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '60%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];