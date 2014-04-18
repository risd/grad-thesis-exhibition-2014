module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left logo-component--title',
    start: {
        top: '30%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '60px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '20px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '60px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '20px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left logo-component--title',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '60px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '20px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '60px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '20px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right logo-component--title',
    type: 'line',
    start: {
        top: '45%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '60px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '20px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.45) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '60px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '20px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right logo-component--title',
    type: 'line',
    start: {
        top: '60%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '60px'
    },
    end: {
        top: '95%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '20px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '60px'
            },
            end: {
                top: (height - 80) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '20px'
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
}, {
    html: 'RI Convention Center<br>'+
          'Exhibition Hall A<br>' +
          'One Sabin Street, Providence<br><br>' +
          'Open 12–5pm Daily<br>'+
          'May 16–31',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: '<svg>' +
          '</svg>',
    cls: 'logo-component--asterisk text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];