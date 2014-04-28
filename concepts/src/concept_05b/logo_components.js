module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left logo-component--title',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: (width * 0.2) + 'px',
                    right: 'auto',
                    'font-size': '40px',
                    'line-height': '42px'
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
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
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
        
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
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
    cls: 'logo-component--grad text-left logo-component--title',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '20%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1400) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.2) + 'px',
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
    cls: 'logo-component--show text-right logo-component--title',
    type: 'line',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.45) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.85) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.52) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.85) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.52) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.85) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
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
        'line-height': '42px'
    },
    end: {
        top: '95%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.6) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height - 80) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.6) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height - 80) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height - 80) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
},
// {
//     html: 'Rhode Island School of Design<br>'+
//           'Annual Grad Thesis Exhibition',
//     cls: 'logo-component--subheadline text-left',
//     type: 'subsidiary',
//     start: {
//         top: '50%',
//         bottom: 'auto',
//         left: '30%',
//         right: 'auto',
//         'font-size': '20px',
//         'line-height': '28px'
//     },
//     end: {
//         top: '88%',
//         bottom: 'auto',
//         left: '50px',
//         right: 'auto',
//         'font-size': '13px',
//         'line-height': '17px'
//     },
//     rules: function (width, height) {
//         if (width < 768) {
//             return {
//                 start: {
//                     top: (height * 0.5) + 'px',
//                     bottom: 'auto',
//                     left: (width * 0.3) + 'px',
//                     right: 'auto',
//                     'font-size': '20px',
//                     'line-height': '28px'
//                 },
//                 end: {
//                     top: (height * 0.88) + 'px',
//                     bottom: 'auto',
//                     left: '50px',
//                     right: 'auto',
//                     'font-size': '13px',
//                     'line-height': '17px'
//                 }
//             };
//         }
//         if (width < 1024) {
//             return {
//                 start: {
//                     top: (height * 0.5) + 'px',
//                     bottom: 'auto',
//                     left: (width * 0.3) + 'px',
//                     right: 'auto',
//                     'font-size': '20px',
//                     'line-height': '28px'
//                 },
//                 end: {
//                     top: (height * 0.88) + 'px',
//                     bottom: 'auto',
//                     left: '50px',
//                     right: 'auto',
//                     'font-size': '13px',
//                     'line-height': '17px'
//                 }
//             };
//         }
//         return {
//             start: {
//                 top: (height * 0.5) + 'px',
//                 bottom: 'auto',
//                 left: (width * 0.3) + 'px',
//                 right: 'auto',
//                 'font-size': '20px',
//                 'line-height': '28px'
//             },
//             end: {
//                 top: (height * 0.88) + 'px',
//                 bottom: 'auto',
//                 left: '50px',
//                 right: 'auto',
//                 'font-size': '13px',
//                 'line-height': '17px'
//             }
//         };
//     }
// },
{
    html: 'Open 12–5pm Daily<br>'+
          'May 16–31<br><br>' +
          'Opening Reception<br>' +
          'May 15, 6–8pm',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
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
                'font-size': '13px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: 'RI Convention Center<br>'+
          'Exhibition Hall A<br>' +
          'One Sabin Street, Providence',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    rules: function (width, height) {
        if (width < 768) {
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
                    top: (height * 0.88) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '13px',
                    'line-height': '17px'
                }
            };
        }
        if (width < 1024) {
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
                    'font-size': '13px',
                    'line-height': '17px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.55) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.88) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '13px',
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
        if (width < 768) {
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
        if (width < 1024) {
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