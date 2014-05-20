(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function () {
    var self = {},
        container_sel,
        mobile_container_sel,
        deptartment_sel,
        mobile_department_sel,
        mobile_activator_sel,
        mobile_blanket_sel,
        mobile_active = false,
        selected = 'All',
        cls = 'department',
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('click');

    var departments = [
        'All',
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture Design',
        'Glass',
        'Graphic Design',
        'Industrial Design',
        'Interior Architecture',
        'Jewelry + Metalsmithing',
        'Landscape Architecture',
        'Painting',
        'Photography',
        'Printmaking',
        'Sculpture',
        'Textiles'
    ];

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.mobile = function (_) {
        if (!arguments.length) return mobile_container_sel;
        mobile_container_sel = _;
        return self;
    };

    self.activatorVisible = function (_) {
        if (!mobile_activator_sel) return;
        mobile_activator_sel.classed('visible', _);
    };

    self.selection = function () {
        if (!arguments.length) return deptartment_sel;
        deptartment_sel = _;
        return self;
    };

    self.asArray = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.isFilterable = function (data) {
        check_filterable(data);
        update_department_sel();
        return self;
    };

    self.render = function () {
        if (!container_sel) throw "requires a wrapper";

        var data = departments.map(function (d, i) {
            var v = {
                name: d,
                escaped: escape_department(d),
                filterable: false,
                selected: false
            };

            if (d === selected) {
                v.selected = true;
                v.filterable = true;
            }

            return v;
        });


        // setup structure
        mobile_activator_sel = mobile_container_sel.append('div')
            .attr('class', cls + '-activator')
            .text(selected)
            .on('click.navActivator', function () {
                mobile_active = true;
                update_nav();
            });

        mobile_blanket_sel = mobile_container_sel.append('div')
            .attr('class', cls + '-blanket')
            .on('click.navBlanket', function () {
                mobile_active = false;
                update_nav();
            });

        mobile_department_sel = mobile_container_sel
            .append('div')
            .attr('class', cls + '-elements departments')
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .attr('class', function (d) {
                var kls = '';
                if (d.filterable) kls += ' filterable';
                if (d.selected) kls += ' selected';
            })
            .text(function (d) {
                return d.name;
            })
            .on('click.departments', function (d, i) {
                // only responds to filterable items
                if (!d.filterable) return;

                department_sel
                    .each(function (dd, di) {
                        dd.selected = false;
                    });

                d.selected = true;

                self.dispatch.click(d.escaped);

                update_department_sel();

                mobile_active = false;
                selected = d.name;
                update_nav();

                department_sel.data(mobile_department_sel.data());
            });

        // the business

        department_sel = container_sel
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .attr('class', function (d) {
                var kls = '';
                if (d.filterable) kls += ' filterable';
                if (d.selected) kls += ' selected';
            })
            .text(function (d) {
                return d.name;
            })
            .on('click.departments', function (d, i) {
                // only responds to filterable items
                if (!d.filterable) return;

                department_sel
                    .each(function (dd, di) {
                        dd.selected = false;
                    });

                d.selected = true;

                self.dispatch.click(d.escaped);

                update_department_sel();

                mobile_active = false;
                selected = d.name;
                update_nav();

                mobile_department_sel.data(department_sel.data());
            });
    };

    function update_nav () {
        mobile_container_sel.classed('active', mobile_active);
        body_sel.classed('no-scroll', mobile_active);
        mobile_activator_sel.text(selected);
    }

    function update_department_sel () {
        department_sel
            .classed('filterable', function (d) {
                return d.filterable;
            })
            .classed('selected', function (d) {
                return d.selected;
            });
        mobile_department_sel
            .classed('filterable', function (d) {
                return d.filterable;
            })
            .classed('selected', function (d) {
                return d.selected;
            });
    }

    function check_filterable (data) {
        // given some data, check to see if
        // each category is filterable
        
        data.forEach(function (d, i) {
            department_sel
                .each(function (dd, di) {
                    if (d === dd.name) {
                        dd.filterable = true;
                    }
                });
            mobile_department_sel
                .each(function (dd, di) {
                    if (d === dd.name) {
                        dd.filterable = true;
                    }
                });
        });
    }

    function escape_department(d) {
        return d.toLowerCase().replace(/ /g, '-');
    }


    return self;
};
},{}],2:[function(require,module,exports){
module.exports = function hashFactory (context) {
    var self = {};
    var index_indicator = '!';
    var index_hash = '#' + index_indicator;
    var overlays = ['Go!'];

    self.dispatch = d3.dispatch('change');

    d3.select(window)
        .on('hashchange', function () {
            var current = self.is();
            self.dispatch.change(current);
        });

    self.is = function (d) {
        // getter
        if (!arguments.length) {
            return parse_hash(window.location.hash);
        }

        // setter
        var hash = index_hash;
        var keys = Object.keys(d);
        if ('id' in d) {
            // { id: 1, student_name: '', project_name: ''}
            hash = format_lightbox_hash(d);
            d.type = 'project';
        } else if ('overlay' in d) {
            // { overlay: 'Go!' }
            if (overlays.indexOf(d.overlay) > -1) {
                hash = format_overlay_hash(d);
                d.type = 'overlay';
            }
        }
        window.location = hash;

        return hash;
    };

    self.index = function (_) {
        if (!arguments.length) return index_hash;
        index_hash = _;
        return self;
    };

    function parse_hash (hash) {
        if (hash.indexOf('#') === 0) {
            hash = hash.substr(1);
        }
        var args = hash.split('/');
        if (args.length === 3) {
            // its a project
            return {
                id: args[0],
                student_name: args[0],
                project_name: args[2],
                type: 'project'
            };
        } else if (args.length === 1) {
            if ((args[0] === index_indicator) |
                (args[0] === '')) {
                return {
                    type: 'index'
                };
            } else {
                // its an overlay
                return {
                    overlay: args[0],
                    type: 'overlay'
                };
            }
        } else {
            return {
                type: 'index'
            };
        }
    }

    function format_lightbox_hash (d) {
        return '#' + [d.id,
                      escape_for_url(d.student_name),
                      escape_for_url(d.project_name)].join('/');
    }

    function format_overlay_hash (d) {
        return '#' + d.overlay;
    }

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }

    return self;
};
},{}],3:[function(require,module,exports){
var Nav      = require('./overlay/nav');
var Logo     = require('./logo/index');
var Work     = require('./work/index');
var Lightbox = require('./work/lightbox');
var Hash     = require('./hash');
var Router   = require('./router');

var work_args = {
    live: true,
    layout: 'image'
};


site()
    .colors()
    .overlay()
    .logo()
    .work(work_args)
    .router()
    .reveal();


function site () {
    var self = {},
        color_values = {
            purple: 'rgb(38, 34, 98);',
            orange: 'rgb(255, 61, 56);',
            'lt-purple': 'rgb(146, 53, 125)',
            blue: 'rgb(43, 89, 184)'
        },
        use_images_as_overlay_background = true,
        background_image_rotation_method = 'block',
        background_image_rotation_methods = ['fade', 'block'],
        body = d3.select('body'),
        root_html = d3.select('html');

    var colors = Object.keys(color_values);

    var context = {};
    context.hash     = Hash(context);
    // references hash
    context.nav      = Nav(context);
    context.logo     = Logo(context);
    // references hash
    context.lightbox = Lightbox(context);
    // references hash
    context.work     = Work(context);
    // references lightbox & nav
    context.router   = Router(context);

    self.colors = function () {
        var random_index = Math.floor(Math.random() * colors.length);

        var color = colors[random_index];
        var alt_colors = colors.slice(0,random_index)
                               .concat(colors.slice(
                                                random_index + 1,
                                                colors.length));

        var alt_color = alt_colors[
                            Math.floor(
                                Math.random() *
                                alt_colors.length)];

        root_html.classed('body-' + color, true);
        root_html.classed('body-alt-' + alt_color, true);

        return self;
    };

    self.overlay = function () {
        var pairs = d3.selectAll('.overlay-nav-item')
            .datum(function () { return this.dataset; });

        // setup click tracking with google analytics
        context.nav.dispatch
            .on('asteriskClick', function (overlaid_boolean) {
                if (!_gaq) return;
                if (overlaid_boolean) {
                    // opening
                    _gaq.push(['_trackEvent',
                               'GoButton',
                               'Asterisk Click - Open',
                               'Home',
                               1,
                               true]);
                } else {
                    // closing
                    _gaq.push(['_trackEvent',
                               'GoButton',
                               'Asterisk Click - Close',
                               'About',
                               2,
                               true]);
                }
            });

        context.nav.selection(pairs)
            .setup()
            .attachResize();

        return self;
    };

    self.logo = function () {
        context.logo.container(d3.select('.logo-line'))
            .attachResize()
            .render();

        return self;
    };

    self.work = function (args) {
        if (args.live) {
            // set up
            context.lightbox
                   .container(d3.select('.lightbox'))
                   .initialize();

            context.work.container(d3.select('.work-container'))
                .filters(d3.select('.department-container'))
                .layout(args.layout)
                .intro(d3.select('.intro-quote'))
                .initialize();
        } else {
            d3.select('.work-section').remove();
            d3.select('.lightbox').remove();
        }
        return self;
    };

    self.router = function () {
        context.router.initialize();
        return self;
    };

    self.reveal = function () {
        var vendor =
            ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
            function (p, v) {
                return v +
                      "transform" in document.body.style ? v : p;
            });
        var travel = (-(window.innerHeight*0.8));
        var transfrom_start = 'translate(0px,' + travel + 'px)';
        var transfrom_end = 'translate(0px,0px)';
        var reveal = d3.selectAll('.reveal-me');

        reveal
            .style('opacity', 0)
            .style(vendor+'transform', transfrom_start);

        reveal
            .transition()
            .delay(800)
            .duration(1200)
            .ease('cubic-inout')
            .style('opacity', 1)
            .styleTween(vendor+'transform', function() {
                return d3.interpolateString(
                        transfrom_start,
                        transfrom_end);

            });
    };

    return self;
}
},{"./hash":2,"./logo/index":4,"./overlay/nav":7,"./router":8,"./work/index":11,"./work/lightbox":14}],4:[function(require,module,exports){
var connectLogoScale = require('./scale');
var Utility = require('./svg');

module.exports = function logo () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        logo_svg,
        logo_text_sel,
        logo_line_merged_sel,
        straight_line = d3.svg.line(),
        connect_logo_scale = connectLogoScale(),
        delay_past_reveal_sel,
        prev_window_height = 0
        cur_window_height = 0;

    var utility = Utility();

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.delayPastReveal = function (_) {
        if (!arguments.length) return delay_past_reveal_sel;
        delay_past_reveal_sel = _;
        return self;
    };

    self.attachResize = function () {
        window_sel
            .on('resize.logo', function () {
                recalulate_logo_line();
            })
            .on('touchmove.logo', function () {
                check_window_height();
            });
            
        return self;
    };

    self.render = function () {
        // set up svg
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        // selection of the text that will define the line
        logo_text_sel = d3.select('header')
                          .selectAll('.logo-text-component');

        // verticies for 
        var text_verticies = logo_line_text_verticies(logo_text_sel,
                                                      window_width);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              window_width,
                                              window_height);

        text_verticies.push(connect_2014_and_go(text_verticies));

        var merged_d = merge_lines(text_verticies,
                                   connecting_segments);

        logo_line_merged_sel = logo_svg.selectAll('.logo-line-merged')
            .data([merged_d])
            .enter()
            .append('path')
                .attr('class', 'logo-line-merged')
                .attr('d', function (d) { return d; });

        logo_line_merged_sel.call(tween_in);
    };

    function check_window_height () {
        var cur_window_height = window.innerHeight;
        if (cur_window_height !== prev_window_height) {
            recalulate_logo_line();
            prev_window_height = cur_window_height;
        }
    }

    function recalulate_logo_line () {
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg
            .attr('width', window_width)
            .attr('height', window_height);

        if (logo_line_merged_sel) {
            update_logo_line(window_width, window_height);
        }
    }

    function update_logo_line (wwidth, wheight) {
        var text_verticies = logo_line_text_verticies(logo_text_sel,
                                                      wwidth);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              wwidth,
                                              wheight);

        text_verticies.push(connect_2014_and_go(text_verticies));

        var merged_d = merge_lines(text_verticies,
                                   connecting_segments);

        logo_line_merged_sel
            .data([merged_d])
            .attr('d', function (d) { return d; });
    }

    function logo_line_text_verticies (sel, wwidth) {
        var text_verticies = [];

        sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if ((i === 1) | (i === 2)) {
                first = [bounds.left - 2,
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if (i === 3) {
                first = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.55)))];
                second = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.55)))];
                
            }

            text_verticies.push([first, second]);

        });

        return text_verticies;
    }

    function logo_line_connecting_segments (start_end_points,
                                            wwidth,
                                            wheight) {
        var line_size_to_draw =
                connect_logo_scale.choose_size(wwidth, wheight);

        var connecting_segments = [];
        for (var i = 0; i < start_end_points.length; i++) {

            if ((i+1) < start_end_points.length) {
                var start = start_end_points[i][1],
                    end = start_end_points[i+1][0];

                connecting_segments
                    .push(
                        connect_logo_scale
                            [i]
                            .scale[line_size_to_draw](start,
                                                      end));
            }
        }
        return connecting_segments;
    }

    function merge_lines(text_verticies, connecting_segments) {
        // takes array of vertex pairs, and path
        // elements of connecting segments.
        // returns on path d attribute
        var d = '';

        var temp_svg = d3.select('body')
            .append('svg');
        var temp_path = temp_svg
            .selectAll('temp-path')
            .data(text_verticies)
            .enter()
            .append('path')
            .attr('d', straight_line)
            .attr('class', 'temp-path')
            .style('display', 'none');

        temp_path.each(function (td, ti) {
            // console.log(td);
            var text_d = d3.select(this).attr('d');
            d += text_d;
            if (connecting_segments[ti]) {
                var connecting_d = connecting_segments[ti];
                d += connecting_d;
            }
        });

        utility.convertToRelative(temp_path.attr('d', d).node());
        // replace all `m` instructions with `l`, except
        // for the first one. this is a reverse regex
        d = temp_path.attr('d').replace(/(?!^)m/g, 'l');

        temp_svg.remove();
        temp_path.remove();

        return d;
    }

    function tween_in(path) {
        path.transition()
            .duration(8000)
            .attrTween('stroke-dasharray', tweenDash)
            .each('end', function () {
                // remove dash array, as resizing
                // the browser will change the length
                // and there is no need to re-compute
                // the dash array to fit it.
                d3.select(this).attr('stroke-dasharray', 'none');
            });
    }

    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString('0,' + l, l + "," + l);
        return function (t) { return i(t); };
    }

    function add_color_stops (sel){
        sel.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 0);
        sel.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 1);
    }

    function connect_2014_and_go (text_verticies) {
        // final strech is composed of the x,y pair
        // that defines the end of the last line
        // and the x,y pair made by combining the x
        // of the first element, with the y of the last
        var line_to_go = [text_verticies[3][1],
                           // first pair, second coordinate, x
                          [text_verticies[0][1][0],
                           // last pair, second coordinate, y
                           text_verticies[3][1][1]]];
        return line_to_go;
    }

    return self;
};
},{"./scale":5,"./svg":6}],5:[function(require,module,exports){
var Utility = require('./svg');

module.exports = function logo_scale () {
    var utility = Utility();

    var segments = [{
            from: 'RISD',
            to: 'Grad',
            scaleUsing: {
                '300': utility.scaleProportionalY,
                '768': utility.scaleProportionalY,
                '1024': utility.scaleProportionalY
            },
            drawn_delta: {
                '300': {
                    x: -27.999984592199326,
                    y: 490.6319885253906
                },
                '768': {
                    x: -5.900031089782715,
                    y: 343.3740234375
                },
                '1024': {
                    x: -0.16998529434204102,
                    y: 391.4689636230469
                }
            },
            paths: {
                '300': 'M-0.469,0'+
                  'h4.993'+
                  'c0,0,0,23.597,0,52.073'+
                  'c0,63.14,49.421,99.097,111.84,99.097'+
                  'c127.5,0,90.959-116.783,16.382-116.783'+
                  'c-23.636,0-48.267,0-48.267,0'+
                  'v165.951'+
                  'c0,0,47.251,76.484,94.946,95.897'+
                  'c54.925,22.355,55.242-58.969,3.128-46.302'+
                  'c-30.68,7.457-95.548,77.421-161.066,70.641'+
                  'c-70.622-7.308-41.122-95.308,24.044-56.641'+
                  'c142.483,84.542-78.045,179.859-78.045,182.593'+
                  'c0,8.729,0,44.106,0,44.106'+
                  'h4.045',
                '768': 'M5,0h580.719'+
                  'c0,0-13.087,26.674-49.544,47.023'+
                  'c-33.271,18.572-48.605,13.438-85.34,50.681'+
                  'c-56.949,57.737-3.166,186.293-145.844,186.293'+
                  'c-33.138,0-99.88,0.003-99.88,0.003l0-215.105'+
                  'c0,0,14.293-0.134,34.5,0'+
                  'c170.362,1.128,176.608,153.713,54.608,153.713'+
                  'c-153,0-128.333-165.791-232.96-165.791'+
                  'C1.336,56.817-5.263,343.374-5.263,343.374'+
                  'h4.529',
                '1024': 'M4.107,0'+
                  'h919.199'+
                  'c0,83.872-31.132,129.615-165.592,129.615'+
                  'c-135.274,0,25.689,214.565-203.786,214.565'+
                  'c-53.298,0-160.641,0.005-160.641,0.005'+
                  'l0-286.092'+
                  'c0,0,91.606,0,124.106,0'+
                  'c160.334,0,151.334,203.135,5.214,203.135'+
                  'c-156.958,0-266.364-162.099-372.654-162.099'+
                  'c-108.195,0-164.462,121.926-164.462,292.34'+
                  'c3.797,0,10.603,0,10.603,0'
            }
        }, {
            from: 'Grad',
            to: 'Show',
            scaleUsing: {
                '300': utility.scaleProportionalX,
                '768': utility.scaleProportionalX,
                '1024': utility.scaleProportionalX
            },
            drawn_delta: {
                '300': {
                    x: 253.5,
                    y: 0
                },
                '768': {
                    x: 786.0529764890671,
                    y: 0.000021755695343017578
                },
                '1024': {
                    x: 1260.5000624656677,
                    y: -0.00003796815872192383
                }
            },
            paths: {
                '300': 'M0,0'+
                  'c0,0,41.853,0,68.667,0'+
                  'c64,0,99.688-55.139,98.492-92.747'+
                  'c-1.992-62.619-74.992-39.619-55.941,11.244'+
                  'C123.207-49.491,172.334,0,211.764,0'+
                  'c20.17,0,41.736,0,41.736,0',
                '768': 'M1.698-0.734'+
                  'H9'+
                  'v179.95'+
                  'c0,0-23.332,0-65.478,0'+
                  'c0-128.588,108.27-243.045,259.339-243.045'+
                  'C449.289-63.829,416.934,223,133.966,223'+
                  'c-167.641,0-17.215-190.534,242.808-190.534'+
                  'C646.751,32.466,663.751,195,663.751,195'+
                  's-134.01,0.018-167.5,0.018'+
                  'c0-127.018,81.5-195.752,263.5-195.752'+
                  'c6.437,0,28,0,28,0',
                '1024': 'M3.539,0.583'+
                  'h18.476'+
                  'v241.17'+
                  'c0,0-100.018,0-147.01,0'+
                  'c0-102.243,75.862-151.737,147.01-151.737'+
                  'c162.92,0,210.353,245.91,310.97,245.91'+
                  'c197.302,0,136.545-537.723-120.696-537.723'+
                  'c-188.211,0-142.841,307.137,276,307.137'+
                  'c346.005,0,314.145-104.757,667.987-104.757'+
                  'c36.753,0,107.763,0,107.763,0'
            }
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: {
                '300': utility.scaleProportionalY,
                '768': utility.scaleProportionalY,
                '1024': utility.scaleProportionalY
            },
            drawn_delta: {
                '300': {
                    x: 5.894000053405762,
                    y: 69.93599700927734
                },
                '768': {
                    x: 0,
                    y: 325.2509868144989
                },
                '1024': {
                    x: -0.0010223388671875,
                    y: 415.2390081882477
                }
            },
            paths: {
                '300': 'M0,0 ' +
                    'l 0.666 0 ' +
                    'l 2.614 0 ' +
                    'l 2.614 34.968 ' +
                    'l 0 34.968 ',
                '768': 'M0-1.727'+
                  'c0,0-6-62.766-70.488-62.766'+
                  'c-82.512,0-125.405,122.407-8.012,208.5'+
                  'C-5.185,197.774,0,283.007,0,323.524',
                '1024': 'M1-2.268'+
                  'h2.0' +
                  'c0-54.927-37.938-120.92-121.493-120.92'+
                  'c-273.782,0-331.685,472.456-675.252,472.456'+
                  'c-155.657,0-149.47-175.371-2.215-175.371'+
                  'c176.523,0,268.487,175.491,412.479,175.491'+
                  'c149.992,0,140.628-276.197,282.138-276.197'+
                  'c51.664,0,84.091,36.964,84.091,82.104'+
                  'c0,118.206-315.529,192.343-124.768,192.343'+
                  'c35.333,0,145.019,0,145.019,0'+
                  'v65.333'+
                  'h-2.0'
            }
        }];

    var temp_svg = d3.select('body')
        .append('svg')
        .style('display', 'none');
    var temp_path = temp_svg
        .append('path');

    var measure_for_ff = false;

    segments.forEach(function (d, i) {
        d.relative_paths_d = {};
        d.relative_paths = {};
        d.scale = {};

        if (measure_for_ff) {
            console.log(segments[i].from + ' ' + segments[i].to);
        }

        for (var path_size in d.paths) {
            temp_path.attr('d', d.paths[path_size]);
            utility.convertToRelative(temp_path.node());
            d.relative_paths_d[path_size] = temp_path.attr('d');
            d.relative_paths[path_size] = temp_path.node();
            
            if (measure_for_ff) {
                console.log('size: ', path_size);
                console.log('delta: ', utility.pathDelta(
                    d.relative_paths[path_size]));
            }

            d.scale[path_size] =
                d.scaleUsing[path_size](d.relative_paths[path_size],
                                        d.drawn_delta[path_size]);
        }
    });

    temp_svg.remove();
    temp_path.remove();

    var sizes = Object.keys(segments[0].paths);
    segments.choose_size = function (window_width, window_height) {
        var chosen = 0;
        sizes.forEach(function (d, i) {
            if (d <= window_width) {
                chosen = d;
            }
        });
        return chosen.toString();
    };

    window.segments = segments;

    return segments;
};
},{"./svg":6}],6:[function(require,module,exports){
module.exports = function svg () {
    var self = {};

    self.convertToRelative = function (path) {
        function set(type) {
            var args = [].slice.call(arguments, 1),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            segs.replaceItem(rseg, i);
        }
        var dx, dy, x0, y0, x1, y1, x2, y2,
            segs = path.pathSegList;
        for (var x = 0, y = 0, i = 0, len = segs.numberOfItems;
             i < len;
             i++) {
            
            var seg = segs.getItem(i),
                c   = seg.pathSegTypeAsLetter;

            if (/[MLHVCSQTAZz]/.test(c)) {
                if ('x1' in seg) x1 = seg.x1 - x;
                if ('x2' in seg) x2 = seg.x2 - x;
                if ('y1' in seg) y1 = seg.y1 - y;
                if ('y2' in seg) y2 = seg.y2 - y;
                if ('x'  in seg) dx = -x + (x = seg.x);
                if ('y'  in seg) dy = -y + (y = seg.y);
                switch (c) {
                    case 'M':
                        set('Moveto',dx,dy);
                        break;
                    case 'L':
                        set('Lineto',dx,dy);
                        break;
                    case 'H':
                        set('LinetoHorizontal',dx);
                        break;
                    case 'V':
                        set('LinetoVertical',dy);
                        break;
                    case 'C':
                        set('CurvetoCubic',dx,dy,x1,y1,x2,y2);
                        break;
                    case 'S':
                        set('CurvetoCubicSmooth',dx,dy,x2,y2);
                        break;
                    case 'Q':
                        set('CurvetoQuadratic',dx,dy,x1,y1);
                        break;
                    case 'T':
                        set('CurvetoQuadraticSmooth',dx,dy);
                        break;
                    case 'A':
                        set('Arc',dx,dy,seg.r1,seg.r2,seg.angle,
                            seg.largeArcFlag,seg.sweepFlag);
                        break;
                    case 'Z': case 'z': x = x0; y = y0; break;
                }
            } else {
                if ('x' in seg) x += seg.x;
                if ('y' in seg) y += seg.y;
            }
            // store the start of a subpath
            if (c == 'M' || c == 'm') {
                x0 = x;
                y0 = y;
            }
        }
        path.setAttribute('d',
                          path.getAttribute('d')
                              .replace(/Z/g, 'z'));
    };

    self.pathDelta = function (path) {
        var delta = {
            x: 0,
            y: 0
        };

        var start = path.getPointAtLength(0),
            end = path.getPointAtLength(path.getTotalLength());

        delta.x = end.x - start.x;
        delta.y = end.y - start.y;

        return delta;
    };

    // pass in a path element
    // and the path segement indicies
    // that will be scaled
    self.scaleAnchorY = function (path, anchors) {
        // console.log('scaleAnchorY');
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        return function (start, end) {
            // current delta
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            for (var name in anchors) {
                var to_replace = segments.getItem(anchors[name]);
                var replace_with =
                    path.createSVGPathSegCurvetoCubicRel(
                        to_replace.x,
                        to_replace.y + ((delta.current.y-
                                         delta.drawn.y)/2),
                        to_replace.x1,
                        to_replace.y1,
                        to_replace.x2,
                        to_replace.y2);
                segments.replaceItem(replace_with, anchors[name]);
            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportional = function (path, drawn_delta) {
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d');

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            // console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y  * ratio.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalY = function (path, drawn_delta) {
        // scale y, fit x
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d'),
            fit_x = false;

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }
        if (Math.abs(delta.drawn.x) > 0.1) {
            fit_x = true;
        }

        return function (start, end) {
            // console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };

            delta.diff = {
                x: delta.current.x - delta.drawn.x,
                y: delta.current.y - delta.drawn.y
            };

            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1],
                segment_count = segments.numberOfItems;
            for (var i = 1; i < segment_count; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1;
                if ('x2' in seg) x2 = seg.x2;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if (fit_x) {
                    if ('x' in seg) dx = seg.x +
                                    (delta.diff.x/(segment_count-1));
                } else {
                    if ('x' in seg) dx = seg.x;
                }
                if ('y'  in seg) dy = seg.y  * ratio.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalYConstrainX = function (path, drawn_delta) {
        // scale y, fit x, and constrain the
        // maximum width of any horizontal lines
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d'),
            fit_x = false;

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }
        if (Math.abs(delta.drawn.x) > 0.1) {
            fit_x = true;
        }

        return function (start, end, wwidth, wheight) {
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };

            delta.diff = {
                x: delta.current.x - delta.drawn.x,
                y: delta.current.y - delta.drawn.y
            };

            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };

            var max = {
                x: wwidth/delta.drawn.width
            };


            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1],
                segment_count = segments.numberOfItems;
            for (var i = 1; i < segment_count; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1;
                if ('x2' in seg) x2 = seg.x2;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                // if (fit_x) {
                //     if ('x' in seg) dx = seg.x +
                //                     (delta.diff.x/(segment_count-1));
                // } else {
                //     if ('x' in seg) dx = seg.x;
                // }
                if ('x' in seg) dx = seg.x * max.x;
                if ('y'  in seg) dy = seg.y  * ratio.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalX = function (path, drawn_delta) {
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d');

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            // console.log('scaleProportionalX');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };

            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1;
                if ('y2' in seg) y2 = seg.y2;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    return self;
};
},{}],7:[function(require,module,exports){
module.exports = function nav (context) {
    var self = {},
        target_sel,
        overlaid = false,
        body_sel = d3.select('body'),
        removable_text = [{
            text: 'Go!'
        }];

    self.dispatch = d3.dispatch('asteriskClick', 'close', 'open');

    self.dispatch.on('close.nav', function () {
        overlaid = false;
        activate_deactivate(target_sel.datum());
    });

    self.dispatch.on('open.nav', function () {
        overlaid = true;
        activate_deactivate(target_sel.datum());
    });

    self.selection = function (_) {
        if (!arguments.length) return target_sel;
        target_sel = _;
        return self;
    };

    self.overlaid = function (_) {
        if (!arguments.length) return overlaid;
        overlaid = _;
        return self;
    };

    self.setup = function () {
        if (!target_sel) throw "requires elements to pair";
        target_sel
            .on('click.nav', function (d, di) {
                overlaid = overlaid ? false : true;
                activate_deactivate(d);
                self.dispatch.asteriskClick(overlaid);
                update_hash();
            });

        var hash_args = context.hash.is();
        if ((hash_args) && (hash_args.type === 'overlay')) {
            if (hash_args.overlay === 'Go!') {
                overlaid = true;
            }
        }
        activate_deactivate(target_sel.datum());

        return self;
    };

    self.attachResize = function () {
        d3.select(window)
            .on('resize.nav', function () {
                place_button();
            })
            .on('scroll.nav', function () {
                place_button();
            })
            .on('touchmove.nav', function () {
                place_button();
            });

        return self;
    };

    function activate_deactivate (d) {
        var overlay = d3.selectAll(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);

        // update button location
        place_button();
    }

    function update_hash () {
        var set_hash_to = {};
        if (overlaid) {
            set_hash_to = { 'overlay': 'Go!' };
        }
        context.hash.is(set_hash_to);
    }

    function place_button () {

        var wwidth = window.innerWidth;
        var wheight = window.innerHeight;

        var matching_sel;
        var bbox;

        if (overlaid) {
            bbox = target_sel.node().getBoundingClientRect();
            var p_bbox = target_sel
                                .select('p')
                                .node()
                                .getBoundingClientRect();
            
            var target_height = bbox.height;
            matching_sel =
                d3.select('.logo-text-component--risd');
            
            target_sel.style('left', (wwidth +
                                      p_bbox.width -
                                      bbox.width -
                                      (+matching_sel
                                        .style('left')
                                        .split('p')[0])) +
                                     'px');
            target_sel.style('bottom', (wheight -
                                        bbox.height -
                                        (+matching_sel
                                           .style('top')
                                           .split('p')[0])) +
                                       'px');
        } else {
            matching_sel =
                d3.select('.logo-text-component--2014');
            target_sel
                .style('left', matching_sel.style('right'))
                .style('bottom', matching_sel.style('bottom'));
        }
    }

    return self;
};
},{}],8:[function(require,module,exports){
module.exports = function router (context) {
    var self = {};
    var previous_type = 'index';

    context.hash.dispatch
        .on('change.router', function (d) {
            set(d);
        });

    self.initialize = function (_) {
        set(context.hash.is());
        return self;
    };

    function set (d) {
        if (d.type === 'index') {
            if (previous_type === 'overlay') {
                // close about overlay
                context.nav.dispatch.close();
            } else if (previous_type === 'project') {
                // close lightbox
                context.lightbox.dispatch.close();
            }
        } else if (d.type === 'overlay') {
            // activate overlay
            context.nav.dispatch.open();
        } else if (d.type === 'project') {
            // activate lightbox
            context.lightbox.dispatch.open(d);
        }

        previous_type = d.type;
    }

    return self;
};
},{}],9:[function(require,module,exports){
module.exports = function Data () {
    var self = {},
        requested = [],
        available,
        s3 = 'https://risdgradshow2014.s3.amazonaws.com/';

    self.dispatch = d3.dispatch('data','endOfData', 'piece', 'metadata');

    self.fetch_piece = function (id) {
        d3.json(s3 + 'projects/' + id + '.json', process_piece);
    };

    self.fetch_paginated_data = function () {
        if (!available) {
            d3.json(s3 + 'data/metadata.json', process_metadata);
        } else {
            process_request();
        }
    };

    function process_metadata (raw_meta) {
        available = raw_meta.pages;
        self.dispatch.metadata(raw_meta);
        process_request();
    }

    function process_request () {
        var next_to_load = choose_and_remove_from_available();
        if (next_to_load) {
            d3.json(next_to_load, function (data) {
                self.dispatch.data(data);
            });
        } else {
            self.dispatch.endOfData();
        }
    }

    function process_piece (piece) {
        self.dispatch.piece(piece);
    }

    function choose_and_remove_from_available () {
        var selected;
        var index = Math.random() * available.length;

        if (index > -1) {
            selected = available.splice(index, 1)[0];
        }

        return selected;
    }

    return self;
};
},{}],10:[function(require,module,exports){
module.exports = function fixed () {
    // when container hits the top, switch that element to fixed
    // plus the additional padding

    var self = {},
        not_fixed_sel,
        fixed_sel,
        not_fixed_distance = 0,
        fixed_class = 'fixed',
        margin_to_prevent_overlap = 0,
        to_prevent_overlap_sel,
        extra_distance_beyond_prevented_overlap = 40;

    self.dispatch = d3.dispatch('activatorVisible');

    self.notFixed = function (_) {
        if (!arguments.length) return not_fixed_sel;
        not_fixed_sel = _;
        return self;
    };

    self.fixed = function (_) {
        if (!arguments.length) return fixed_sel;
        fixed_sel = _;
        return self;
    };

    self.preventOverlap = function (_) {
        if (!arguments.length) return to_prevent_overlap_sel;
        to_prevent_overlap_sel = _;
        return self;
    };

    self.top = function () {
        // used to determine the position to scroll to
        // and the point at which to dispatch activatorVisible
        var top = not_fixed_distance;
        if (window.innerWidth < 768) {
            // iOS does not respect the margin of the element
            // the way desktops do. so we can build it into
            // our check to dispatch the change of section,
            // and our scrolling position.
            top -= extra_distance_beyond_prevented_overlap;
        }
        return top;
    };

    self.initialize = function () {
        calc_contraints();

        d3.select(window)
            .on('scroll.fixed', function () {
                configure_fixed();
            })
            .on('touchmove.fixed', function () {
                configure_fixed();
            })
            .on('resize.fixed', function () {
                calc_contraints();
                configure_fixed();
            });
    };

    function configure_fixed () {
        var fixed_y = 0;
        var top = self.top();

        if ((top - pageYOffset) < 0) {
            fixed_y = pageYOffset - top;
        }

        var fixed = (fixed_y === 0) ? false : true;

        self.dispatch
            .activatorVisible(fixed);

        fixed_sel.classed(fixed_class, fixed);

        if ((window.innerWidth > 768) && (fixed)) {
            to_prevent_overlap_sel
                .style('margin-top', margin_to_prevent_overlap + 'px');
        } else {
            to_prevent_overlap_sel
                .style('margin-top',
                       extra_distance_beyond_prevented_overlap + 'px');
        }
    }

    function calc_contraints () {
        var not_fixed_margin =
                parseInt(
                    not_fixed_sel
                        .style('margin-top'), 10) +
                parseInt(
                    not_fixed_sel
                        .style('margin-bottom'), 10);
        var not_fixed_height =
                not_fixed_sel
                    .node()
                    .getBoundingClientRect()
                    .height;

        not_fixed_distance = not_fixed_margin +
                             not_fixed_height;

        margin_to_prevent_overlap =
            parseInt(fixed_sel.style('height'), 10) +
            parseInt(fixed_sel.style('margin-top'), 10) +
            extra_distance_beyond_prevented_overlap;

    }

    return self;
};
},{}],11:[function(require,module,exports){
var behance = require('./data')();
var departments = require('../departments')();
var transform = require('./transform')();
var smooth_scroll = require('./scrollto')({ duration: 1000 });
var fixed = require('./fixed')();
var layout_image = require('./layout_image')();
var layout_fixed = require('./layout_fixed')();

module.exports = function work (context) {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_container_sel,
        department_container_sel,
        department_wrapper_sel,
        work_sel,
        iso,
        layout = 'image',
        layouts = {
            image: {
                render: render_image,
                resize: resize_image
            },
            fixed: {
                render: render_fixed,
                resize: resize_fixed
            }
        },
        intro_sel,
        html_sel = d3.select('html');

    behance.dispatch
        .on('data', function (requested) {

            if (!requested) throw 'Work. Got no data.';
            var transformed = transform(requested.objects);

            if (window.localStorage) {
                transformed.forEach(function (d, i) {
                    window.localStorage
                          .setItem(d.id, JSON.stringify(d));
                });
            }

            data = data.concat(transformed);
            render();

            behance.fetch_paginated_data();
        })
        .on('endOfData', function () {
            work_container_sel.classed('work-loaded', true);
        })
        .on('metadata', function (meta) {
            // update the filterable list
            departments.isFilterable(meta.included_departments);
        });

    fixed.dispatch
        .on('activatorVisible', function (d) {
            departments.activatorVisible(d);
            html_sel.classed('in-work', d);
        });

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.filters = function (_) {
        if (!arguments.length) return department_container_sel;
        department_container_sel = _;
        return self;
    };

    self.intro = function (_) {
        if (!arguments.length) return intro_sel;
        intro_sel = _;
        return self;
    };

    self.layout = function (_) {
        if (!arguments.length) return layout;
        layout = _;
        return self;
    };

    self.infiniteScroll = function (_) {
        if (!arguments.length) return infinite_scroll_bool;
        infinite_scroll_bool = _;

        if (infinite_scroll_bool === true) {
            // setup infinite scroll
        }

        return self;
    };

    self.initialize = function (_) {
        var hash_args = context.hash.is();
        if ((hash_args) && (hash_args.type === 'project')) {
            behance.dispatch
                .on('piece', function (d) {
                    var transformed = transform([d])[0];
                    if (window.localStorage) {
                        window.localStorage
                              .setItem(transformed.id,
                                       JSON.stringify(transformed));
                    }
                    context.hash.is(transformed);
                    // lightbox.show(transformed);
                    behance.dispatch.on('piece', null);
                });
            behance.fetch_piece(hash_args.id);
        }

        set_intro_height();

        if (!container_sel) throw "Work requires a container";
        container_sel.call(add_structure);
        layout_fixed.container(work_container_sel);
        layout_image.container(work_container_sel);

        // will be the thing to call render
        behance.fetch_paginated_data();

        // filtering
        departments.dispatch
            .on('click.work', function (department) {

            if (department === 'all') department = '';

            if (iso) {
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                            .classed(department);
                    }
                });
                set_work_height();
                smooth_scroll.to(fixed.top() + 10);
            }
        });

        fixed.initialize();

        d3.select(window)
            .on('resize.work', function () {
                resize();
                set_intro_height();
            });

        return self;
    };

    function render () {
        layouts[layout].render();
    }

    function resize () {
        layouts[layout].resize();
    }

    function render_fixed () {
        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div');

        layout_fixed
            .attributes(work_sel_enter);
        var masonry = layout_fixed.masonry();

        work_sel_enter
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            })
            .attr('class', function (d, i) {
                return 'fixed-piece piece ' +
                        d.risd_program_class +
                        ' orientation-' + d.orientation;
            });

        work_sel_enter
            .append('div')
                .attr('class', 'piece-wrapper')
                .style('height', function (d) {
                    return (d.masonry_height -
                            d.meta_space) + 'px';
                })
            .append('div')
                .attr('class', 'piece-img-wrapper')
                .style('width', function (d) {
                    return d.masonry_width;
                })
                .style('height', function (d) {
                    return (d.masonry_height -
                            d.meta_space) + 'px';
                })
                .call(add_image);
        
        work_sel_enter
            .append('div')
                .attr('class', 'piece-meta-wrapper')
                .call(add_meta);

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel.on('click.work', function (d, i) {
            context.hash.is(d);
            // lightbox.show(d);
        });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
        } else {
            work_sel_enter.each(function () {
                iso.appended(this);
            });
            iso.layout();
        }
    }

    function render_image ()  {
        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    return 'image-piece piece ' +
                           d.risd_program_class;
                });

        layout_image
            .attributes(work_sel_enter);
        var masonry = layout_image.masonry();

        work_sel_enter
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            });

        work_sel_enter
            .append('div')
                .attr('class', 'piece-wrapper')
                .call(add_image);
        
        work_sel_enter
            .append('div')
                .attr('class', 'piece-meta-wrapper')
                .call(add_meta);

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel.on('click.work', function (d, i) {
            context.hash.is(d);
            // lightbox.show(d);
        });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
            iso.unbindResize();
        } else {
            work_sel_enter.each(function () {
                iso.appended(this);
            });
            iso.layout();
        }
    }

    function resize_image () {

        layout_image
            .attributes(work_sel);
        var masonry = layout_image.masonry();

        work_sel
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
        } else {
            iso.options.masonry = masonry;
            iso.layout();
        }
    }

    function resize_fixed () {

        layout_fixed
            .attributes(work_sel);
        var masonry = layout_fixed.masonry();

        work_sel
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            });

        work_sel
            .selectAll('.piece-wrapper')
            .style('height', function (d) {
                return (d.masonry_height -
                        d.meta_space) + 'px';
            });

        work_sel
            .selectAll('.piece-img-wrapper')
            .style('width', function (d) {
                return d.masonry_width;
            })
            .style('height', function (d) {
                return (d.masonry_height -
                        d.meta_space) + 'px';
            });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
            iso.unbindResize();
        } else {
            iso.options.masonry = masonry;
            iso.layout();
        }
    }

    function add_structure (sel)  {
        department_wrapper_sel = department_container_sel
            .append('article')
            .attr('class', 'departments grid z-15');

        work_container_sel = sel.append('article')
            .attr('class', 'work grid z-10 '+
                           'work-layout-' + layout);

        departments
            .container(department_wrapper_sel)
            .mobile(d3.select('.nav-mobile'))
            .render();

        fixed
            .notFixed(intro_sel)
            .fixed(department_container_sel)
            .preventOverlap(work_container_sel);
    }

    function add_meta (sel) {
        sel.append('p')
            .attr('class', 'student-name piece-meta')
            .text(function (d) {
                return d.student_name;
            });

        sel.append('p')
            .attr('class', 'risd-program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });
    }

    function add_image (sel) {
        sel.append('img')
            .attr('src', function (d) {
                return d.cover.src;
            });
    }

    function set_intro_height () {
        var height =
            intro_sel
                .node()
                .getBoundingClientRect().height +
            parseInt(intro_sel.style('margin-top'), 10) +
            parseInt(intro_sel.style('margin-bottom'), 10);

        if (height < window.innerHeight) {
            var difference = window.innerHeight - height;
            intro_sel.style('padding-bottom', difference + 'px');
        }
    }

    function set_work_height () {
        var base_margin = 100;

        var work_height = work_container_sel
                .node()
                .getBoundingClientRect().height;

        var to_clear_height;

        if (window.innerWidth > 768) {
            var dept_height =
                parseInt(department_wrapper_sel.style('height'), 10) +
                parseInt(department_wrapper_sel.style('margin-top'), 10);

            to_clear_height = work_height + dept_height;

        } else {
            to_clear_height = work_height;
        }


        if (to_clear_height < window.innerHeight) {
            var difference = window.innerHeight - to_clear_height;
            work_container_sel
                .style('margin-bottom', difference + 'px');
        } else {
            work_container_sel.style('margin-bottom',
                                      base_margin + 'px');
        }
    }

    return self;
};
},{"../departments":1,"./data":9,"./fixed":10,"./layout_fixed":12,"./layout_image":13,"./scrollto":15,"./transform":17}],12:[function(require,module,exports){
module.exports = function layout_fixed () {
    var self = {};
    var container_sel;
    var counter = {
        tall: 0,
        wide: 0
    };
    var frequency = {
        large: 15,
        tall: 8,
        wide: 6
    };
    var meta_space = 50;
    var masonry = {
        gutter: 0,
        columnWidth: 0,
        columnWidthDouble: 0
    };

    self.masonry = function () {
        return masonry;
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.attributes = function (sel) {
        counter = 0;
        masonry = masonry_settings();

        sel.each(function (d, i) {
            d.meta_space = meta_space;
            var multiplier = 1;

            if (i % frequency.large === 0) {

                // large
                multiplier = 2;

                if ((d.cover.original_width/
                     d.cover.original_height) > 1) {
                    d.orientation = 'landscape';
                } else {
                    d.orientation = 'portrait';
                }

                d.masonry_width =
                    (masonry.columnWidth *
                     multiplier) +
                    ((multiplier === 1) ?
                      0 : masonry.gutter);

                d.masonry_height = d.masonry_width;

            } else if ((d.cover.original_width/
                        d.cover.original_height) > 1) {

                // landscape
                counter.wide += 1;
                if (counter.wide % frequency.wide === 0) {
                    multiplier = 2;
                }

                d.masonry_width =
                    (masonry.columnWidth *
                     multiplier) +
                    ((multiplier === 1) ?
                      0 : masonry.gutter);

                d.masonry_height = d.masonry_width;
                d.orientation = 'landscape';
            } else {
                // portrait
                counter.tall += 1;
                if (counter.tall % frequency.tall === 0) {
                    multiplier = 2;
                }

                d.masonry_height =
                    (masonry.columnWidth *
                     multiplier) +
                    ((multiplier === 1) ?
                      0 : masonry.gutter);

                d.masonry_width = masonry.columnWidth;
                d.orientation = 'portrait';
            }
        });
    };

    function masonry_settings () {
        var total_work_width = container_sel
                                    .node()
                                    .getBoundingClientRect()
                                    .width;

        var number_of_columns = 2;

        if (window.innerWidth >= 768) {
            number_of_columns = 4;
        }

        var gutter = 0;
        var column_width = (total_work_width / number_of_columns) -
                           (gutter * (number_of_columns - 1));

        return {
            gutter: gutter,
            columnWidth: column_width,
            columnDoubleWidth: column_width * 2 + gutter
        };
    }

    return self;
};
},{}],13:[function(require,module,exports){
module.exports = function layout_image () {
    var self = {};
    var container_sel;
    var meta_space = 35;
    var counter = 0;
    var frequency = 14;
    var masonry = {
        gutter: 0,
        columnWidth: 0,
        columnWidthDouble: 0
    };

    self.masonry = function () {
        return masonry;
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.attributes = function (sel) {
        counter = 0;
        masonry = masonry_settings();

        sel.each(function (d, i) {
            if ((d.cover.original_width/
                 d.cover.original_height) >
                1.8) {

                d.masonry_width = masonry.columnDoubleWidth;
                d.masonry_height =
                    ((d.masonry_width *
                      d.cover.original_height)/
                     d.cover.original_width) + meta_space;

            } else {
                counter += 1;

                // make every 5th one big.
                if (counter % frequency === 0) {
                    d.masonry_width =
                        masonry.columnDoubleWidth;
                } else {
                    d.masonry_width = masonry.columnWidth;
                }
                d.masonry_height =
                    ((d.masonry_width *
                      d.cover.original_height)/
                     d.cover.original_width) +
                    meta_space;
            }
        });
    };

    function masonry_settings () {
        var total_work_width = container_sel
                                    .node()
                                    .getBoundingClientRect()
                                    .width;

        var number_of_columns = 2;

        if (window.innerWidth >= 768) {
            number_of_columns = 4;
        }

        var gutter = 0;
        var column_width = (total_work_width / number_of_columns) -
                           (gutter * (number_of_columns - 1));

        return {
            gutter: gutter,
            columnWidth: column_width,
            columnDoubleWidth: column_width * 2 + gutter
        };
    }

    return self;
};
},{}],14:[function(require,module,exports){
var svg_cross = require('./svgCross');

module.exports = function lightbox (context) {
    var self = {},
        container_sel,
        body_sel = d3.select('body'),
        html_sel = d3.select('html');

    self.dispatch = d3.dispatch('clickClosed', 'close', 'open');

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.initialize = function () {
        self.dispatch
            .on('close.lightbox', function () {
                // message set by router, via hash change
                close();
            })
            .on('open.lightbox', function (d) {
                // message set by router, via hash change
                var data;
                if (window.localStorage) {
                    data = window.localStorage.getItem(d.id);
                    self.show(JSON.parse(data));
                }
            })
            .on('clickClosed.lightbox', function () {
                context.hash.is({});
            });
        return self;
    };

    self.show = function (data) {
        if (!container_sel) throw "Lightbox. Requires container.";
        
        var blanket = container_sel
            .append('div')
            .attr('class', 'fixed-fullscreen blanket');

        var lightbox_grid_sel = container_sel
            .append('div')
            .attr('class', 'grid');

        var lightbox_controls_grid_sel = container_sel
            .append('div')
            .attr('class', 'lightbox-controls-container '+
                           'fixed-full-width')
            .append('div')
            .attr('class', 'grid');

        var lightbox_controls =
            lightbox_controls_grid_sel
                .append('div')
                .attr('class', 'lightbox-controls')
                .call(svg_cross);

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class',
                      'lightbox-work '+
                      'offset-percent-2-10 '+
                      'col-percent-8-10');

        if (window.innerWidth < 768) {
            lightbox_meta_sel
                .style('width', '100%');
        } else {
            lightbox_meta_sel
                .style('width',
                       (parseInt(lightbox_work_sel
                                .style('margin-left')) - 20) + 'px');
        }

        d3.select(window)
            .on('resize.lightbox', function () {
                if (window.innerWidth < 768) {
                    lightbox_meta_sel
                        .style('width', '100%');
                } else {
                    lightbox_meta_sel
                        .style('width',
                               (parseInt(lightbox_work_sel
                                        .style('margin-left')) - 20) +
                                        'px');
                }
            });

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        if (data.project_name != data.description) {
            lightbox_work_sel
                .append('p')
                .attr('class', 'lightbox-description')
                .text(data.description);
        }

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .each(add_modules);

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        if (data.personal_link.length > 0) {
            lightbox_meta_info_sel
                .append('p')
                .attr('class', 'lightbox-meta-info--personal-link')
                .append('a')
                .attr('href', data.personal_link)
                .attr('target', '_blank')
                .text('Personal Website');
        }

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--personal-link')
            .append('a')
            .attr('href', data.url)
            .attr('target', '_blank')
            .text('Behance Portfolio');

        container_sel.classed('active', true);
        body_sel.classed('no-scroll', true);
        html_sel.classed('in-lightbox', true);

        lightbox_controls.select('.cross-svg')
            .on('click', function () {
                close();
                self.dispatch.clickClosed();
            });

        blanket
            .on('click', function () {
                close();
                self.dispatch.clickClosed();
            });
    };

    function close () {
        container_sel
            .classed('active', false)
            .html('');

        body_sel.classed('no-scroll', false);
        html_sel.classed('in-lightbox', false);

        container_sel.on('click', null);
        
        d3.select(window)
            .on('resize.lightbox', null);
    }

    function add_modules (d, i) {
        var sel = d3.select(this);

        if (d.type === 'image') {
            sel.append('img')
                .attr('src',
                    d.sizes.max_1240 ? d.sizes.max_1240 : d.src);
        }
        if (d.type === 'text') {
            sel.append('p')
                .attr('class', 'piece-module-text')
                .text(d.text_plain);
        }
        if ((d.type === 'embed') | (d.type === 'video')) {
            sel.append('div')
                .attr('class', 'piece-module-embed')
                .html(d.embed);
        }
    }

    return self;
};
},{"./svgCross":16}],15:[function(require,module,exports){
module.exports = function scrollto (args) {
    var options = args || {};
    options.duration = args.duration || 2000;
    var self = {};

    self.dispatch = d3.dispatch('scrollEnd');

    function scroll_tween (offset) {
        return function () {
            var i = d3.interpolateNumber(
                        window.pageYOffset ||
                            document.documentElement.scrollTop,
                        offset);
            return function (t) {
                scrollTo(0, i(t));
            };
        };
    }

    self.to = function (offset) {
        d3.transition()
            .duration(options.duration)
            .tween('scroll', scroll_tween(offset))
            .each('end', function () {
                self.dispatch.scrollEnd();
            });
    };

    return self;
};
},{}],16:[function(require,module,exports){
module.exports = function svgCross (sel) {
    var button_size = 28;

    // add the closing x as svg
    var svg = sel.append('svg')
        .attr('class', 'cross-svg')
        .attr('width', button_size)
        .attr('height', button_size);

    svg
        .selectAll('line')
        .data([
            { x1: 0, y1: 0,
              x2: button_size, y2: button_size },
            { x1: button_size, y1: 0,
              x2: 0, y2: button_size }
        ])
        .enter()
        .append('line')
            .attr('x1', function (d) {
                return d.x1;
            })
            .attr('y1', function (d) {
                return d.y1;
            })
            .attr('x2', function (d) {
                return d.x2;
            })
            .attr('y2', function (d) {
                return d.y2;
            })
            .attr('stroke-width', 1);

    svg
        .append('rect')
        .attr('class', 'blanket')
        .attr('height', button_size)
        .attr('width', button_size);
};
},{}],17:[function(require,module,exports){
// requires d3.scale.ordinal
module.exports = transform;

function transform () {
    return function (input) {
        var formatted = format_data_cover_with_modules(input);
        return shuffle(formatted);
    };
}

function format_data_cover_with_modules (data) {

    var formatted_data = [];

    // determine the extent of widths
    var all_modules = [];
    data.forEach(function (d, i) {
        d.details.modules.forEach(function (md, mi) {
            if (md.type === 'image') {
                all_modules.push(md);
            }
        });
    });

    data.forEach(function (d, i) {
        var modules_for_cover = [];
        var modules_to_include = [];
        d.details.modules.forEach(function (md, mi) {
            if (md.type === 'image') {
                modules_for_cover.push(md);
            }
            // these are all cases that are
            // covered in lightbox.js
            if ((md.type === 'image') |
                (md.type === 'text') |
                (md.type === 'embed') |
                (md.type === 'video')) {

                modules_to_include.push(md);
            }
        });

        var random_cover;
        if (modules_for_cover.length > 0) {
            // random_cover_option
            // based on images to include
            var random_module =
                modules_for_cover[Math.floor(Math.random() *
                                   modules_for_cover.length)];

            random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;
        } else {
            // otherwise, just use a the cover that
            // is included
            random_cover = {
                original_width: 404,
                original_height: 316,
                src: d.details.covers['404']
            };
        }
        formatted_data.push({
            'project_name': d.name,
            'student_name': d.owners[0].display_name,
            'risd_program': d.risd_program,
            'risd_program_class':
                escape_department(d.risd_program),
            'modules': modules_to_include,
            'cover': random_cover,
            description: d.details.description,
            url: d.owners[0].url,
            personal_link: d.personal_link,
            id: d.id
        });
    });

    return formatted_data;
}

function shuffle (o) {
    for(var j, x, i = o.length;
        i;
        j = Math.floor(Math.random() * i),
        x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function escape_department(d) {
    return d.toLowerCase().replace(/ /g, '-');
}
},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2RlcGFydG1lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2hhc2guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3NjYWxlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vc3ZnLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL292ZXJsYXkvbmF2LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3JvdXRlci5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9maXhlZC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ZpeGVkLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ltYWdlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGlnaHRib3guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9zY3JvbGx0by5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL3N2Z0Nyb3NzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvdHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbGZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGRlcHRhcnRtZW50X3NlbCxcbiAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsLFxuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbCxcbiAgICAgICAgbW9iaWxlX2JsYW5rZXRfc2VsLFxuICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2UsXG4gICAgICAgIHNlbGVjdGVkID0gJ0FsbCcsXG4gICAgICAgIGNscyA9ICdkZXBhcnRtZW50JyxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2xpY2snKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IFtcbiAgICAgICAgJ0FsbCcsXG4gICAgICAgICdBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnQ2VyYW1pY3MnLFxuICAgICAgICAnRGlnaXRhbCArIE1lZGlhJyxcbiAgICAgICAgJ0Z1cm5pdHVyZSBEZXNpZ24nLFxuICAgICAgICAnR2xhc3MnLFxuICAgICAgICAnR3JhcGhpYyBEZXNpZ24nLFxuICAgICAgICAnSW5kdXN0cmlhbCBEZXNpZ24nLFxuICAgICAgICAnSW50ZXJpb3IgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0pld2VscnkgKyBNZXRhbHNtaXRoaW5nJyxcbiAgICAgICAgJ0xhbmRzY2FwZSBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnUGFpbnRpbmcnLFxuICAgICAgICAnUGhvdG9ncmFwaHknLFxuICAgICAgICAnUHJpbnRtYWtpbmcnLFxuICAgICAgICAnU2N1bHB0dXJlJyxcbiAgICAgICAgJ1RleHRpbGVzJ1xuICAgIF07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5tb2JpbGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBtb2JpbGVfY29udGFpbmVyX3NlbDtcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hY3RpdmF0b3JWaXNpYmxlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFtb2JpbGVfYWN0aXZhdG9yX3NlbCkgcmV0dXJuO1xuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbC5jbGFzc2VkKCd2aXNpYmxlJywgXyk7XG4gICAgfTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZXB0YXJ0bWVudF9zZWw7XG4gICAgICAgIGRlcHRhcnRtZW50X3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJkZXBhcnRtZW50cyBpcyBhIGdldHRlclwiO1xuICAgICAgICByZXR1cm4gZGVwYXJ0bWVudHM7XG4gICAgfTtcblxuICAgIHNlbGYuaXNGaWx0ZXJhYmxlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY2hlY2tfZmlsdGVyYWJsZShkYXRhKTtcbiAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGEgd3JhcHBlclwiO1xuXG4gICAgICAgIHZhciBkYXRhID0gZGVwYXJ0bWVudHMubWFwKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBkLFxuICAgICAgICAgICAgICAgIGVzY2FwZWQ6IGVzY2FwZV9kZXBhcnRtZW50KGQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGQgPT09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdi5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gc2V0dXAgc3RydWN0dXJlXG4gICAgICAgIG1vYmlsZV9hY3RpdmF0b3Jfc2VsID0gbW9iaWxlX2NvbnRhaW5lcl9zZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xzICsgJy1hY3RpdmF0b3InKVxuICAgICAgICAgICAgLnRleHQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdkFjdGl2YXRvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbmF2KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBtb2JpbGVfYmxhbmtldF9zZWwgPSBtb2JpbGVfY29udGFpbmVyX3NlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBjbHMgKyAnLWJsYW5rZXQnKVxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXZCbGFua2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbmF2KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWwgPSBtb2JpbGVfY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGNscyArICctZWxlbWVudHMgZGVwYXJ0bWVudHMnKVxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChjbHMpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIga2xzID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGQuZmlsdGVyYWJsZSkga2xzICs9ICcgZmlsdGVyYWJsZSc7XG4gICAgICAgICAgICAgICAgaWYgKGQuc2VsZWN0ZWQpIGtscyArPSAnIHNlbGVjdGVkJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm5hbWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljay5kZXBhcnRtZW50cycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSByZXNwb25kcyB0byBmaWx0ZXJhYmxlIGl0ZW1zXG4gICAgICAgICAgICAgICAgaWYgKCFkLmZpbHRlcmFibGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkZCwgZGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNsaWNrKGQuZXNjYXBlZCk7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVfZGVwYXJ0bWVudF9zZWwoKTtcblxuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGQubmFtZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbmF2KCk7XG5cbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50X3NlbC5kYXRhKG1vYmlsZV9kZXBhcnRtZW50X3NlbC5kYXRhKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhlIGJ1c2luZXNzXG5cbiAgICAgICAgZGVwYXJ0bWVudF9zZWwgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKGNscylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBrbHMgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZC5maWx0ZXJhYmxlKSBrbHMgKz0gJyBmaWx0ZXJhYmxlJztcbiAgICAgICAgICAgICAgICBpZiAoZC5zZWxlY3RlZCkga2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHJlc3BvbmRzIHRvIGZpbHRlcmFibGUgaXRlbXNcbiAgICAgICAgICAgICAgICBpZiAoIWQuZmlsdGVyYWJsZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xpY2soZC5lc2NhcGVkKTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCgpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZC5uYW1lO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcblxuICAgICAgICAgICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbC5kYXRhKGRlcGFydG1lbnRfc2VsLmRhdGEoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX25hdiAoKSB7XG4gICAgICAgIG1vYmlsZV9jb250YWluZXJfc2VsLmNsYXNzZWQoJ2FjdGl2ZScsIG1vYmlsZV9hY3RpdmUpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCBtb2JpbGVfYWN0aXZlKTtcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwudGV4dChzZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2RlcGFydG1lbnRfc2VsICgpIHtcbiAgICAgICAgZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgIC5jbGFzc2VkKCdmaWx0ZXJhYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5maWx0ZXJhYmxlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAuY2xhc3NlZCgnZmlsdGVyYWJsZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZmlsdGVyYWJsZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnNlbGVjdGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tfZmlsdGVyYWJsZSAoZGF0YSkge1xuICAgICAgICAvLyBnaXZlbiBzb21lIGRhdGEsIGNoZWNrIHRvIHNlZSBpZlxuICAgICAgICAvLyBlYWNoIGNhdGVnb3J5IGlzIGZpbHRlcmFibGVcbiAgICAgICAgXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkID09PSBkZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PT0gZGQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuZmlsdGVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlX2RlcGFydG1lbnQoZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc2hGYWN0b3J5IChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgaW5kZXhfaW5kaWNhdG9yID0gJyEnO1xuICAgIHZhciBpbmRleF9oYXNoID0gJyMnICsgaW5kZXhfaW5kaWNhdG9yO1xuICAgIHZhciBvdmVybGF5cyA9IFsnR28hJ107XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NoYW5nZScpO1xuXG4gICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgLm9uKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBzZWxmLmlzKCk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNoYW5nZShjdXJyZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICBzZWxmLmlzID0gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gZ2V0dGVyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlX2hhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0dGVyXG4gICAgICAgIHZhciBoYXNoID0gaW5kZXhfaGFzaDtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkKTtcbiAgICAgICAgaWYgKCdpZCcgaW4gZCkge1xuICAgICAgICAgICAgLy8geyBpZDogMSwgc3R1ZGVudF9uYW1lOiAnJywgcHJvamVjdF9uYW1lOiAnJ31cbiAgICAgICAgICAgIGhhc2ggPSBmb3JtYXRfbGlnaHRib3hfaGFzaChkKTtcbiAgICAgICAgICAgIGQudHlwZSA9ICdwcm9qZWN0JztcbiAgICAgICAgfSBlbHNlIGlmICgnb3ZlcmxheScgaW4gZCkge1xuICAgICAgICAgICAgLy8geyBvdmVybGF5OiAnR28hJyB9XG4gICAgICAgICAgICBpZiAob3ZlcmxheXMuaW5kZXhPZihkLm92ZXJsYXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBoYXNoID0gZm9ybWF0X292ZXJsYXlfaGFzaChkKTtcbiAgICAgICAgICAgICAgICBkLnR5cGUgPSAnb3ZlcmxheSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gaGFzaDtcblxuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9O1xuXG4gICAgc2VsZi5pbmRleCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGluZGV4X2hhc2g7XG4gICAgICAgIGluZGV4X2hhc2ggPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGFyc2VfaGFzaCAoaGFzaCkge1xuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJncyA9IGhhc2guc3BsaXQoJy8nKTtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAvLyBpdHMgYSBwcm9qZWN0XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBhcmdzWzBdLFxuICAgICAgICAgICAgICAgIHN0dWRlbnRfbmFtZTogYXJnc1swXSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0X25hbWU6IGFyZ3NbMl0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Byb2plY3QnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoKGFyZ3NbMF0gPT09IGluZGV4X2luZGljYXRvcikgfFxuICAgICAgICAgICAgICAgIChhcmdzWzBdID09PSAnJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5kZXgnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaXRzIGFuIG92ZXJsYXlcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBhcmdzWzBdLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnb3ZlcmxheSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5kZXgnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X2xpZ2h0Ym94X2hhc2ggKGQpIHtcbiAgICAgICAgcmV0dXJuICcjJyArIFtkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZV9mb3JfdXJsKGQuc3R1ZGVudF9uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVfZm9yX3VybChkLnByb2plY3RfbmFtZSldLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfb3ZlcmxheV9oYXNoIChkKSB7XG4gICAgICAgIHJldHVybiAnIycgKyBkLm92ZXJsYXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlX2Zvcl91cmwgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIE5hdiAgICAgID0gcmVxdWlyZSgnLi9vdmVybGF5L25hdicpO1xudmFyIExvZ28gICAgID0gcmVxdWlyZSgnLi9sb2dvL2luZGV4Jyk7XG52YXIgV29yayAgICAgPSByZXF1aXJlKCcuL3dvcmsvaW5kZXgnKTtcbnZhciBMaWdodGJveCA9IHJlcXVpcmUoJy4vd29yay9saWdodGJveCcpO1xudmFyIEhhc2ggICAgID0gcmVxdWlyZSgnLi9oYXNoJyk7XG52YXIgUm91dGVyICAgPSByZXF1aXJlKCcuL3JvdXRlcicpO1xuXG52YXIgd29ya19hcmdzID0ge1xuICAgIGxpdmU6IHRydWUsXG4gICAgbGF5b3V0OiAnaW1hZ2UnXG59O1xuXG5cbnNpdGUoKVxuICAgIC5jb2xvcnMoKVxuICAgIC5vdmVybGF5KClcbiAgICAubG9nbygpXG4gICAgLndvcmsod29ya19hcmdzKVxuICAgIC5yb3V0ZXIoKVxuICAgIC5yZXZlYWwoKTtcblxuXG5mdW5jdGlvbiBzaXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb2xvcl92YWx1ZXMgPSB7XG4gICAgICAgICAgICBwdXJwbGU6ICdyZ2IoMzgsIDM0LCA5OCk7JyxcbiAgICAgICAgICAgIG9yYW5nZTogJ3JnYigyNTUsIDYxLCA1Nik7JyxcbiAgICAgICAgICAgICdsdC1wdXJwbGUnOiAncmdiKDE0NiwgNTMsIDEyNSknLFxuICAgICAgICAgICAgYmx1ZTogJ3JnYig0MywgODksIDE4NCknXG4gICAgICAgIH0sXG4gICAgICAgIHVzZV9pbWFnZXNfYXNfb3ZlcmxheV9iYWNrZ3JvdW5kID0gdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2QgPSAnYmxvY2snLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZHMgPSBbJ2ZhZGUnLCAnYmxvY2snXSxcbiAgICAgICAgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICByb290X2h0bWwgPSBkMy5zZWxlY3QoJ2h0bWwnKTtcblxuICAgIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhjb2xvcl92YWx1ZXMpO1xuXG4gICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICBjb250ZXh0Lmhhc2ggICAgID0gSGFzaChjb250ZXh0KTtcbiAgICAvLyByZWZlcmVuY2VzIGhhc2hcbiAgICBjb250ZXh0Lm5hdiAgICAgID0gTmF2KGNvbnRleHQpO1xuICAgIGNvbnRleHQubG9nbyAgICAgPSBMb2dvKGNvbnRleHQpO1xuICAgIC8vIHJlZmVyZW5jZXMgaGFzaFxuICAgIGNvbnRleHQubGlnaHRib3ggPSBMaWdodGJveChjb250ZXh0KTtcbiAgICAvLyByZWZlcmVuY2VzIGhhc2hcbiAgICBjb250ZXh0LndvcmsgICAgID0gV29yayhjb250ZXh0KTtcbiAgICAvLyByZWZlcmVuY2VzIGxpZ2h0Ym94ICYgbmF2XG4gICAgY29udGV4dC5yb3V0ZXIgICA9IFJvdXRlcihjb250ZXh0KTtcblxuICAgIHNlbGYuY29sb3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmFuZG9tX2luZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3JzLmxlbmd0aCk7XG5cbiAgICAgICAgdmFyIGNvbG9yID0gY29sb3JzW3JhbmRvbV9pbmRleF07XG4gICAgICAgIHZhciBhbHRfY29sb3JzID0gY29sb3JzLnNsaWNlKDAscmFuZG9tX2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoY29sb3JzLnNsaWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX2luZGV4ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9ycy5sZW5ndGgpKTtcblxuICAgICAgICB2YXIgYWx0X2NvbG9yID0gYWx0X2NvbG9yc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0X2NvbG9ycy5sZW5ndGgpXTtcblxuICAgICAgICByb290X2h0bWwuY2xhc3NlZCgnYm9keS0nICsgY29sb3IsIHRydWUpO1xuICAgICAgICByb290X2h0bWwuY2xhc3NlZCgnYm9keS1hbHQtJyArIGFsdF9jb2xvciwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhaXJzID0gZDMuc2VsZWN0QWxsKCcub3ZlcmxheS1uYXYtaXRlbScpXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICAvLyBzZXR1cCBjbGljayB0cmFja2luZyB3aXRoIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgICAgY29udGV4dC5uYXYuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignYXN0ZXJpc2tDbGljaycsIGZ1bmN0aW9uIChvdmVybGFpZF9ib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfZ2FxKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb3BlbmluZ1xuICAgICAgICAgICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0dvQnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQXN0ZXJpc2sgQ2xpY2sgLSBPcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSG9tZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2luZ1xuICAgICAgICAgICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0dvQnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQXN0ZXJpc2sgQ2xpY2sgLSBDbG9zZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Fib3V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb250ZXh0Lm5hdi5zZWxlY3Rpb24ocGFpcnMpXG4gICAgICAgICAgICAuc2V0dXAoKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRleHQubG9nby5jb250YWluZXIoZDMuc2VsZWN0KCcubG9nby1saW5lJykpXG4gICAgICAgICAgICAuYXR0YWNoUmVzaXplKClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi53b3JrID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MubGl2ZSkge1xuICAgICAgICAgICAgLy8gc2V0IHVwXG4gICAgICAgICAgICBjb250ZXh0LmxpZ2h0Ym94XG4gICAgICAgICAgICAgICAgICAgLmNvbnRhaW5lcihkMy5zZWxlY3QoJy5saWdodGJveCcpKVxuICAgICAgICAgICAgICAgICAgIC5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgICAgIGNvbnRleHQud29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yay1jb250YWluZXInKSlcbiAgICAgICAgICAgICAgICAuZmlsdGVycyhkMy5zZWxlY3QoJy5kZXBhcnRtZW50LWNvbnRhaW5lcicpKVxuICAgICAgICAgICAgICAgIC5sYXlvdXQoYXJncy5sYXlvdXQpXG4gICAgICAgICAgICAgICAgLmludHJvKGQzLnNlbGVjdCgnLmludHJvLXF1b3RlJykpXG4gICAgICAgICAgICAgICAgLmluaXRpYWxpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLndvcmstc2VjdGlvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcubGlnaHRib3gnKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yb3V0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRleHQucm91dGVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmV2ZWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmVuZG9yID1cbiAgICAgICAgICAgIFtcIlwiLCBcIi13ZWJraXQtXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIFwiLW8tXCJdLnJlZHVjZShcbiAgICAgICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHYgK1xuICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciB0cmF2ZWwgPSAoLSh3aW5kb3cuaW5uZXJIZWlnaHQqMC44KSk7XG4gICAgICAgIHZhciB0cmFuc2Zyb21fc3RhcnQgPSAndHJhbnNsYXRlKDBweCwnICsgdHJhdmVsICsgJ3B4KSc7XG4gICAgICAgIHZhciB0cmFuc2Zyb21fZW5kID0gJ3RyYW5zbGF0ZSgwcHgsMHB4KSc7XG4gICAgICAgIHZhciByZXZlYWwgPSBkMy5zZWxlY3RBbGwoJy5yZXZlYWwtbWUnKTtcblxuICAgICAgICByZXZlYWxcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLCB0cmFuc2Zyb21fc3RhcnQpO1xuXG4gICAgICAgIHJldmVhbFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KDgwMClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxMjAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAuc3R5bGVUd2Vlbih2ZW5kb3IrJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZnJvbV9zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZnJvbV9lbmQpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59IiwidmFyIGNvbm5lY3RMb2dvU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nbyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCksXG4gICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZSA9IGNvbm5lY3RMb2dvU2NhbGUoKSxcbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsLFxuICAgICAgICBwcmV2X3dpbmRvd19oZWlnaHQgPSAwXG4gICAgICAgIGN1cl93aW5kb3dfaGVpZ2h0ID0gMDtcblxuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRlbGF5UGFzdFJldmVhbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbDtcbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3dfc2VsXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlY2FsdWxhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCd0b3VjaG1vdmUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGVja193aW5kb3dfaGVpZ2h0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHNldCB1cCBzdmdcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIC8vIHNlbGVjdGlvbiBvZiB0aGUgdGV4dCB0aGF0IHdpbGwgZGVmaW5lIHRoZSBsaW5lXG4gICAgICAgIGxvZ29fdGV4dF9zZWwgPSBkMy5zZWxlY3QoJ2hlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5sb2dvLXRleHQtY29tcG9uZW50Jyk7XG5cbiAgICAgICAgLy8gdmVydGljaWVzIGZvciBcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfd2lkdGgpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIHRleHRfdmVydGljaWVzLnB1c2goY29ubmVjdF8yMDE0X2FuZF9nbyh0ZXh0X3ZlcnRpY2llcykpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwuY2FsbCh0d2Vlbl9pbik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrX3dpbmRvd19oZWlnaHQgKCkge1xuICAgICAgICB2YXIgY3VyX3dpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGlmIChjdXJfd2luZG93X2hlaWdodCAhPT0gcHJldl93aW5kb3dfaGVpZ2h0KSB7XG4gICAgICAgICAgICByZWNhbHVsYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgcHJldl93aW5kb3dfaGVpZ2h0ID0gY3VyX3dpbmRvd19oZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNhbHVsYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICBpZiAobG9nb19saW5lX21lcmdlZF9zZWwpIHtcbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKHd3aWR0aCwgd2hlaWdodCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlaWdodCk7XG5cbiAgICAgICAgdGV4dF92ZXJ0aWNpZXMucHVzaChjb25uZWN0XzIwMTRfYW5kX2dvKHRleHRfdmVydGljaWVzKSk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX3RleHRfdmVydGljaWVzIChzZWwsIHd3aWR0aCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBbXTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGkgPT09IDEpIHwgKGkgPT09IDIpKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSAyLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMykge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRleHRfdmVydGljaWVzLnB1c2goW2ZpcnN0LCBzZWNvbmRdKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGV4dF92ZXJ0aWNpZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHMgKHN0YXJ0X2VuZF9wb2ludHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlaWdodCkge1xuICAgICAgICB2YXIgbGluZV9zaXplX3RvX2RyYXcgPVxuICAgICAgICAgICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZS5jaG9vc2Vfc2l6ZSh3d2lkdGgsIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBpZiAoKGkrMSkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHN0YXJ0X2VuZF9wb2ludHNbaV1bMV0sXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0X2VuZF9wb2ludHNbaSsxXVswXTtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2NhbGVbbGluZV9zaXplX3RvX2RyYXddKHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpbmdfc2VnbWVudHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsIGNvbm5lY3Rpbmdfc2VnbWVudHMpIHtcbiAgICAgICAgLy8gdGFrZXMgYXJyYXkgb2YgdmVydGV4IHBhaXJzLCBhbmQgcGF0aFxuICAgICAgICAvLyBlbGVtZW50cyBvZiBjb25uZWN0aW5nIHNlZ21lbnRzLlxuICAgICAgICAvLyByZXR1cm5zIG9uIHBhdGggZCBhdHRyaWJ1dGVcbiAgICAgICAgdmFyIGQgPSAnJztcblxuICAgICAgICB2YXIgdGVtcF9zdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJyk7XG4gICAgICAgIHZhciB0ZW1wX3BhdGggPSB0ZW1wX3N2Z1xuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5kYXRhKHRleHRfdmVydGljaWVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RlbXAtcGF0aCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHRlbXBfcGF0aC5lYWNoKGZ1bmN0aW9uICh0ZCwgdGkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRkKTtcbiAgICAgICAgICAgIHZhciB0ZXh0X2QgPSBkMy5zZWxlY3QodGhpcykuYXR0cignZCcpO1xuICAgICAgICAgICAgZCArPSB0ZXh0X2Q7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGluZ19zZWdtZW50c1t0aV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ubmVjdGluZ19kID0gY29ubmVjdGluZ19zZWdtZW50c1t0aV07XG4gICAgICAgICAgICAgICAgZCArPSBjb25uZWN0aW5nX2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLmF0dHIoJ2QnLCBkKS5ub2RlKCkpO1xuICAgICAgICAvLyByZXBsYWNlIGFsbCBgbWAgaW5zdHJ1Y3Rpb25zIHdpdGggYGxgLCBleGNlcHRcbiAgICAgICAgLy8gZm9yIHRoZSBmaXJzdCBvbmUuIHRoaXMgaXMgYSByZXZlcnNlIHJlZ2V4XG4gICAgICAgIGQgPSB0ZW1wX3BhdGguYXR0cignZCcpLnJlcGxhY2UoLyg/IV4pbS9nLCAnbCcpO1xuXG4gICAgICAgIHRlbXBfc3ZnLnJlbW92ZSgpO1xuICAgICAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5faW4ocGF0aCkge1xuICAgICAgICBwYXRoLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdzdHJva2UtZGFzaGFycmF5JywgdHdlZW5EYXNoKVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGFzaCBhcnJheSwgYXMgcmVzaXppbmdcbiAgICAgICAgICAgICAgICAvLyB0aGUgYnJvd3NlciB3aWxsIGNoYW5nZSB0aGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gcmUtY29tcHV0ZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBkYXNoIGFycmF5IHRvIGZpdCBpdC5cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICdub25lJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2VlbkRhc2goKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKCcwLCcgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9jb2xvcl9zdG9wcyAoc2VsKXtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzAlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAwKTtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCAnd2hpdGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbm5lY3RfMjAxNF9hbmRfZ28gKHRleHRfdmVydGljaWVzKSB7XG4gICAgICAgIC8vIGZpbmFsIHN0cmVjaCBpcyBjb21wb3NlZCBvZiB0aGUgeCx5IHBhaXJcbiAgICAgICAgLy8gdGhhdCBkZWZpbmVzIHRoZSBlbmQgb2YgdGhlIGxhc3QgbGluZVxuICAgICAgICAvLyBhbmQgdGhlIHgseSBwYWlyIG1hZGUgYnkgY29tYmluaW5nIHRoZSB4XG4gICAgICAgIC8vIG9mIHRoZSBmaXJzdCBlbGVtZW50LCB3aXRoIHRoZSB5IG9mIHRoZSBsYXN0XG4gICAgICAgIHZhciBsaW5lX3RvX2dvID0gW3RleHRfdmVydGljaWVzWzNdWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlyc3QgcGFpciwgc2Vjb25kIGNvb3JkaW5hdGUsIHhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3RleHRfdmVydGljaWVzWzBdWzFdWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdCBwYWlyLCBzZWNvbmQgY29vcmRpbmF0ZSwgeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dF92ZXJ0aWNpZXNbM11bMV1bMV1dXTtcbiAgICAgICAgcmV0dXJuIGxpbmVfdG9fZ287XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvX3NjYWxlICgpIHtcbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHZhciBzZWdtZW50cyA9IFt7XG4gICAgICAgICAgICBmcm9tOiAnUklTRCcsXG4gICAgICAgICAgICB0bzogJ0dyYWQnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTI3Ljk5OTk4NDU5MjE5OTMyNixcbiAgICAgICAgICAgICAgICAgICAgeTogNDkwLjYzMTk4ODUyNTM5MDZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC01LjkwMDAzMTA4OTc4MjcxNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMzQzLjM3NDAyMzQzNzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMC4xNjk5ODUyOTQzNDIwNDEwMixcbiAgICAgICAgICAgICAgICAgICAgeTogMzkxLjQ2ODk2MzYyMzA0NjlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ00tMC40NjksMCcrXG4gICAgICAgICAgICAgICAgICAnaDQuOTkzJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsMjMuNTk3LDAsNTIuMDczJytcbiAgICAgICAgICAgICAgICAgICdjMCw2My4xNCw0OS40MjEsOTkuMDk3LDExMS44NCw5OS4wOTcnK1xuICAgICAgICAgICAgICAgICAgJ2MxMjcuNSwwLDkwLjk1OS0xMTYuNzgzLDE2LjM4Mi0xMTYuNzgzJytcbiAgICAgICAgICAgICAgICAgICdjLTIzLjYzNiwwLTQ4LjI2NywwLTQ4LjI2NywwJytcbiAgICAgICAgICAgICAgICAgICd2MTY1Ljk1MScrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw0Ny4yNTEsNzYuNDg0LDk0Ljk0Niw5NS44OTcnK1xuICAgICAgICAgICAgICAgICAgJ2M1NC45MjUsMjIuMzU1LDU1LjI0Mi01OC45NjksMy4xMjgtNDYuMzAyJytcbiAgICAgICAgICAgICAgICAgICdjLTMwLjY4LDcuNDU3LTk1LjU0OCw3Ny40MjEtMTYxLjA2Niw3MC42NDEnK1xuICAgICAgICAgICAgICAgICAgJ2MtNzAuNjIyLTcuMzA4LTQxLjEyMi05NS4zMDgsMjQuMDQ0LTU2LjY0MScrXG4gICAgICAgICAgICAgICAgICAnYzE0Mi40ODMsODQuNTQyLTc4LjA0NSwxNzkuODU5LTc4LjA0NSwxODIuNTkzJytcbiAgICAgICAgICAgICAgICAgICdjMCw4LjcyOSwwLDQ0LjEwNiwwLDQ0LjEwNicrXG4gICAgICAgICAgICAgICAgICAnaDQuMDQ1JyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ001LDBoNTgwLjcxOScrXG4gICAgICAgICAgICAgICAgICAnYzAsMC0xMy4wODcsMjYuNjc0LTQ5LjU0NCw0Ny4wMjMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMzMuMjcxLDE4LjU3Mi00OC42MDUsMTMuNDM4LTg1LjM0LDUwLjY4MScrXG4gICAgICAgICAgICAgICAgICAnYy01Ni45NDksNTcuNzM3LTMuMTY2LDE4Ni4yOTMtMTQ1Ljg0NCwxODYuMjkzJytcbiAgICAgICAgICAgICAgICAgICdjLTMzLjEzOCwwLTk5Ljg4LDAuMDAzLTk5Ljg4LDAuMDAzbDAtMjE1LjEwNScrXG4gICAgICAgICAgICAgICAgICAnYzAsMCwxNC4yOTMtMC4xMzQsMzQuNSwwJytcbiAgICAgICAgICAgICAgICAgICdjMTcwLjM2MiwxLjEyOCwxNzYuNjA4LDE1My43MTMsNTQuNjA4LDE1My43MTMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTUzLDAtMTI4LjMzMy0xNjUuNzkxLTIzMi45Ni0xNjUuNzkxJytcbiAgICAgICAgICAgICAgICAgICdDMS4zMzYsNTYuODE3LTUuMjYzLDM0My4zNzQtNS4yNjMsMzQzLjM3NCcrXG4gICAgICAgICAgICAgICAgICAnaDQuNTI5JyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNNC4xMDcsMCcrXG4gICAgICAgICAgICAgICAgICAnaDkxOS4xOTknK1xuICAgICAgICAgICAgICAgICAgJ2MwLDgzLjg3Mi0zMS4xMzIsMTI5LjYxNS0xNjUuNTkyLDEyOS42MTUnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTM1LjI3NCwwLDI1LjY4OSwyMTQuNTY1LTIwMy43ODYsMjE0LjU2NScrXG4gICAgICAgICAgICAgICAgICAnYy01My4yOTgsMC0xNjAuNjQxLDAuMDA1LTE2MC42NDEsMC4wMDUnK1xuICAgICAgICAgICAgICAgICAgJ2wwLTI4Ni4wOTInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsOTEuNjA2LDAsMTI0LjEwNiwwJytcbiAgICAgICAgICAgICAgICAgICdjMTYwLjMzNCwwLDE1MS4zMzQsMjAzLjEzNSw1LjIxNCwyMDMuMTM1JytcbiAgICAgICAgICAgICAgICAgICdjLTE1Ni45NTgsMC0yNjYuMzY0LTE2Mi4wOTktMzcyLjY1NC0xNjIuMDk5JytcbiAgICAgICAgICAgICAgICAgICdjLTEwOC4xOTUsMC0xNjQuNDYyLDEyMS45MjYtMTY0LjQ2MiwyOTIuMzQnK1xuICAgICAgICAgICAgICAgICAgJ2MzLjc5NywwLDEwLjYwMywwLDEwLjYwMywwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnR3JhZCcsXG4gICAgICAgICAgICB0bzogJ1Nob3cnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMjUzLjUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDc4Ni4wNTI5NzY0ODkwNjcxLFxuICAgICAgICAgICAgICAgICAgICB5OiAwLjAwMDAyMTc1NTY5NTM0MzAxNzU3OFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuNTAwMDYyNDY1NjY3NyxcbiAgICAgICAgICAgICAgICAgICAgeTogLTAuMDAwMDM3OTY4MTU4NzIxOTIzODNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ00wLDAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsNDEuODUzLDAsNjguNjY3LDAnK1xuICAgICAgICAgICAgICAgICAgJ2M2NCwwLDk5LjY4OC01NS4xMzksOTguNDkyLTkyLjc0NycrXG4gICAgICAgICAgICAgICAgICAnYy0xLjk5Mi02Mi42MTktNzQuOTkyLTM5LjYxOS01NS45NDEsMTEuMjQ0JytcbiAgICAgICAgICAgICAgICAgICdDMTIzLjIwNy00OS40OTEsMTcyLjMzNCwwLDIxMS43NjQsMCcrXG4gICAgICAgICAgICAgICAgICAnYzIwLjE3LDAsNDEuNzM2LDAsNDEuNzM2LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTEuNjk4LTAuNzM0JytcbiAgICAgICAgICAgICAgICAgICdIOScrXG4gICAgICAgICAgICAgICAgICAndjE3OS45NScrXG4gICAgICAgICAgICAgICAgICAnYzAsMC0yMy4zMzIsMC02NS40NzgsMCcrXG4gICAgICAgICAgICAgICAgICAnYzAtMTI4LjU4OCwxMDguMjctMjQzLjA0NSwyNTkuMzM5LTI0My4wNDUnK1xuICAgICAgICAgICAgICAgICAgJ0M0NDkuMjg5LTYzLjgyOSw0MTYuOTM0LDIyMywxMzMuOTY2LDIyMycrXG4gICAgICAgICAgICAgICAgICAnYy0xNjcuNjQxLDAtMTcuMjE1LTE5MC41MzQsMjQyLjgwOC0xOTAuNTM0JytcbiAgICAgICAgICAgICAgICAgICdDNjQ2Ljc1MSwzMi40NjYsNjYzLjc1MSwxOTUsNjYzLjc1MSwxOTUnK1xuICAgICAgICAgICAgICAgICAgJ3MtMTM0LjAxLDAuMDE4LTE2Ny41LDAuMDE4JytcbiAgICAgICAgICAgICAgICAgICdjMC0xMjcuMDE4LDgxLjUtMTk1Ljc1MiwyNjMuNS0xOTUuNzUyJytcbiAgICAgICAgICAgICAgICAgICdjNi40MzcsMCwyOCwwLDI4LDAnLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ00zLjUzOSwwLjU4MycrXG4gICAgICAgICAgICAgICAgICAnaDE4LjQ3NicrXG4gICAgICAgICAgICAgICAgICAndjI0MS4xNycrXG4gICAgICAgICAgICAgICAgICAnYzAsMC0xMDAuMDE4LDAtMTQ3LjAxLDAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLTEwMi4yNDMsNzUuODYyLTE1MS43MzcsMTQ3LjAxLTE1MS43MzcnK1xuICAgICAgICAgICAgICAgICAgJ2MxNjIuOTIsMCwyMTAuMzUzLDI0NS45MSwzMTAuOTcsMjQ1LjkxJytcbiAgICAgICAgICAgICAgICAgICdjMTk3LjMwMiwwLDEzNi41NDUtNTM3LjcyMy0xMjAuNjk2LTUzNy43MjMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTg4LjIxMSwwLTE0Mi44NDEsMzA3LjEzNywyNzYsMzA3LjEzNycrXG4gICAgICAgICAgICAgICAgICAnYzM0Ni4wMDUsMCwzMTQuMTQ1LTEwNC43NTcsNjY3Ljk4Ny0xMDQuNzU3JytcbiAgICAgICAgICAgICAgICAgICdjMzYuNzUzLDAsMTA3Ljc2MywwLDEwNy43NjMsMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZnJvbTogJ1Nob3cnLFxuICAgICAgICAgICAgdG86ICcyMDE0JyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmF3bl9kZWx0YToge1xuICAgICAgICAgICAgICAgICczMDAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDUuODk0MDAwMDUzNDA1NzYyLFxuICAgICAgICAgICAgICAgICAgICB5OiA2OS45MzU5OTcwMDkyNzczNFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMzI1LjI1MDk4NjgxNDQ5ODlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMC4wMDEwMjIzMzg4NjcxODc1LFxuICAgICAgICAgICAgICAgICAgICB5OiA0MTUuMjM5MDA4MTg4MjQ3N1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTAsMCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2wgMC42NjYgMCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2wgMi42MTQgMCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2wgMi42MTQgMzQuOTY4ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbCAwIDM0Ljk2OCAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTAtMS43MjcnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtNi02Mi43NjYtNzAuNDg4LTYyLjc2NicrXG4gICAgICAgICAgICAgICAgICAnYy04Mi41MTIsMC0xMjUuNDA1LDEyMi40MDctOC4wMTIsMjA4LjUnK1xuICAgICAgICAgICAgICAgICAgJ0MtNS4xODUsMTk3Ljc3NCwwLDI4My4wMDcsMCwzMjMuNTI0JyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMS0yLjI2OCcrXG4gICAgICAgICAgICAgICAgICAnaDIuMCcgK1xuICAgICAgICAgICAgICAgICAgJ2MwLTU0LjkyNy0zNy45MzgtMTIwLjkyLTEyMS40OTMtMTIwLjkyJytcbiAgICAgICAgICAgICAgICAgICdjLTI3My43ODIsMC0zMzEuNjg1LDQ3Mi40NTYtNjc1LjI1Miw0NzIuNDU2JytcbiAgICAgICAgICAgICAgICAgICdjLTE1NS42NTcsMC0xNDkuNDctMTc1LjM3MS0yLjIxNS0xNzUuMzcxJytcbiAgICAgICAgICAgICAgICAgICdjMTc2LjUyMywwLDI2OC40ODcsMTc1LjQ5MSw0MTIuNDc5LDE3NS40OTEnK1xuICAgICAgICAgICAgICAgICAgJ2MxNDkuOTkyLDAsMTQwLjYyOC0yNzYuMTk3LDI4Mi4xMzgtMjc2LjE5NycrXG4gICAgICAgICAgICAgICAgICAnYzUxLjY2NCwwLDg0LjA5MSwzNi45NjQsODQuMDkxLDgyLjEwNCcrXG4gICAgICAgICAgICAgICAgICAnYzAsMTE4LjIwNi0zMTUuNTI5LDE5Mi4zNDMtMTI0Ljc2OCwxOTIuMzQzJytcbiAgICAgICAgICAgICAgICAgICdjMzUuMzMzLDAsMTQ1LjAxOSwwLDE0NS4wMTksMCcrXG4gICAgICAgICAgICAgICAgICAndjY1LjMzMycrXG4gICAgICAgICAgICAgICAgICAnaC0yLjAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dO1xuXG4gICAgdmFyIHRlbXBfc3ZnID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB2YXIgdGVtcF9wYXRoID0gdGVtcF9zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpO1xuXG4gICAgdmFyIG1lYXN1cmVfZm9yX2ZmID0gZmFsc2U7XG5cbiAgICBzZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIGQucmVsYXRpdmVfcGF0aHNfZCA9IHt9O1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzID0ge307XG4gICAgICAgIGQuc2NhbGUgPSB7fTtcblxuICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlZ21lbnRzW2ldLmZyb20gKyAnICcgKyBzZWdtZW50c1tpXS50byk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBwYXRoX3NpemUgaW4gZC5wYXRocykge1xuICAgICAgICAgICAgdGVtcF9wYXRoLmF0dHIoJ2QnLCBkLnBhdGhzW3BhdGhfc2l6ZV0pO1xuICAgICAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGgubm9kZSgpKTtcbiAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNfZFtwYXRoX3NpemVdID0gdGVtcF9wYXRoLmF0dHIoJ2QnKTtcbiAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5ub2RlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtZWFzdXJlX2Zvcl9mZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaXplOiAnLCBwYXRoX3NpemUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWx0YTogJywgdXRpbGl0eS5wYXRoRGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkLnNjYWxlW3BhdGhfc2l6ZV0gPVxuICAgICAgICAgICAgICAgIGQuc2NhbGVVc2luZ1twYXRoX3NpemVdKGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmRyYXduX2RlbHRhW3BhdGhfc2l6ZV0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0ZW1wX3N2Zy5yZW1vdmUoKTtcbiAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICB2YXIgc2l6ZXMgPSBPYmplY3Qua2V5cyhzZWdtZW50c1swXS5wYXRocyk7XG4gICAgc2VnbWVudHMuY2hvb3NlX3NpemUgPSBmdW5jdGlvbiAod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KSB7XG4gICAgICAgIHZhciBjaG9zZW4gPSAwO1xuICAgICAgICBzaXplcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA8PSB3aW5kb3dfd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjaG9zZW4gPSBkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNob3Nlbi50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuc2VnbWVudHMgPSBzZWdtZW50cztcblxuICAgIHJldHVybiBzZWdtZW50cztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdmcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLmNvbnZlcnRUb1JlbGF0aXZlID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0KHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgc2Vncy5yZXBsYWNlSXRlbShyc2VnLCBpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZHgsIGR5LCB4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgc2VncyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgIGZvciAodmFyIHggPSAwLCB5ID0gMCwgaSA9IDAsIGxlbiA9IHNlZ3MubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgICBpIDwgbGVuO1xuICAgICAgICAgICAgIGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2VnID0gc2Vncy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgIGMgICA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICBpZiAoL1tNTEhWQ1NRVEFael0vLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gLXggKyAoeCA9IHNlZy54KTtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gLXkgKyAoeSA9IHNlZy55KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ01vdmV0bycsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvSG9yaXpvbnRhbCcsZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG9WZXJ0aWNhbCcsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvQ3ViaWMnLGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljU21vb3RoJyxkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWMnLGR4LGR5LHgxLHkxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b1F1YWRyYXRpY1Ntb290aCcsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdBcmMnLGR4LGR5LHNlZy5yMSxzZWcucjIsc2VnLmFuZ2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZy5sYXJnZUFyY0ZsYWcsc2VnLnN3ZWVwRmxhZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWic6IGNhc2UgJ3onOiB4ID0geDA7IHkgPSB5MDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgeCArPSBzZWcueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knIGluIHNlZykgeSArPSBzZWcueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBzdGFydCBvZiBhIHN1YnBhdGhcbiAgICAgICAgICAgIGlmIChjID09ICdNJyB8fCBjID09ICdtJykge1xuICAgICAgICAgICAgICAgIHgwID0geDtcbiAgICAgICAgICAgICAgICB5MCA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvWi9nLCAneicpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5wYXRoRGVsdGEgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdGFydCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aCgwKSxcbiAgICAgICAgICAgIGVuZCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChwYXRoLmdldFRvdGFsTGVuZ3RoKCkpO1xuXG4gICAgICAgIGRlbHRhLnggPSBlbmQueCAtIHN0YXJ0Lng7XG4gICAgICAgIGRlbHRhLnkgPSBlbmQueSAtIHN0YXJ0Lnk7XG5cbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH07XG5cbiAgICAvLyBwYXNzIGluIGEgcGF0aCBlbGVtZW50XG4gICAgLy8gYW5kIHRoZSBwYXRoIHNlZ2VtZW50IGluZGljaWVzXG4gICAgLy8gdGhhdCB3aWxsIGJlIHNjYWxlZFxuICAgIHNlbGYuc2NhbGVBbmNob3JZID0gZnVuY3Rpb24gKHBhdGgsIGFuY2hvcnMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlQW5jaG9yWScpO1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjdXJyZW50IGRlbHRhXG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGFuY2hvcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9fcmVwbGFjZSA9IHNlZ21lbnRzLmdldEl0ZW0oYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2Vfd2l0aCA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueSArICgoZGVsdGEuY3VycmVudC55LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YS5kcmF3bi55KS8yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54MixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueTIpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2Vfd2l0aCwgYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsID0gZnVuY3Rpb24gKHBhdGgsIGRyYXduX2RlbHRhKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogZHJhd25fZGVsdGFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWSA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICAvLyBzY2FsZSB5LCBmaXQgeFxuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyksXG4gICAgICAgICAgICBmaXRfeCA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLmRyYXduLngpID4gMC4xKSB7XG4gICAgICAgICAgICBmaXRfeCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVsdGEuZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LnggLSBkZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueSAtIGRlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXSxcbiAgICAgICAgICAgICAgICBzZWdtZW50X2NvdW50ID0gc2VnbWVudHMubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDE7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoZml0X3gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLnggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRlbHRhLmRpZmYueC8oc2VnbWVudF9jb3VudC0xKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLng7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxZQ29uc3RyYWluWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICAvLyBzY2FsZSB5LCBmaXQgeCwgYW5kIGNvbnN0cmFpbiB0aGVcbiAgICAgICAgLy8gbWF4aW11bSB3aWR0aCBvZiBhbnkgaG9yaXpvbnRhbCBsaW5lc1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyksXG4gICAgICAgICAgICBmaXRfeCA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLmRyYXduLngpID4gMC4xKSB7XG4gICAgICAgICAgICBmaXRfeCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHd3aWR0aCwgd2hlaWdodCkge1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVsdGEuZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LnggLSBkZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueSAtIGRlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1heCA9IHtcbiAgICAgICAgICAgICAgICB4OiB3d2lkdGgvZGVsdGEuZHJhd24ud2lkdGhcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdLFxuICAgICAgICAgICAgICAgIHNlZ21lbnRfY291bnQgPSBzZWdtZW50cy5udW1iZXJPZkl0ZW1zO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50X2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyO1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIC8vIGlmIChmaXRfeCkge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueCArXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAoZGVsdGEuZGlmZi54LyhzZWdtZW50X2NvdW50LTEpKTtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueDtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLnggKiBtYXgueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyO1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB0YXJnZXRfc2VsLFxuICAgICAgICBvdmVybGFpZCA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICByZW1vdmFibGVfdGV4dCA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnR28hJ1xuICAgICAgICB9XTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYXN0ZXJpc2tDbGljaycsICdjbG9zZScsICdvcGVuJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdjbG9zZS5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG92ZXJsYWlkID0gZmFsc2U7XG4gICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUodGFyZ2V0X3NlbC5kYXR1bSgpKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ29wZW4ubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvdmVybGFpZCA9IHRydWU7XG4gICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUodGFyZ2V0X3NlbC5kYXR1bSgpKTtcbiAgICB9KTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGFyZ2V0X3NlbDtcbiAgICAgICAgdGFyZ2V0X3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXJsYWlkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3ZlcmxhaWQ7XG4gICAgICAgIG92ZXJsYWlkID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGFyZ2V0X3NlbCkgdGhyb3cgXCJyZXF1aXJlcyBlbGVtZW50cyB0byBwYWlyXCI7XG4gICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgIC5vbignY2xpY2submF2JywgZnVuY3Rpb24gKGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxhaWQgPSBvdmVybGFpZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZV9kZWFjdGl2YXRlKGQpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYXN0ZXJpc2tDbGljayhvdmVybGFpZCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2hhc2goKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoYXNoX2FyZ3MgPSBjb250ZXh0Lmhhc2guaXMoKTtcbiAgICAgICAgaWYgKChoYXNoX2FyZ3MpICYmIChoYXNoX2FyZ3MudHlwZSA9PT0gJ292ZXJsYXknKSkge1xuICAgICAgICAgICAgaWYgKGhhc2hfYXJncy5vdmVybGF5ID09PSAnR28hJykge1xuICAgICAgICAgICAgICAgIG92ZXJsYWlkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhY3RpdmF0ZV9kZWFjdGl2YXRlKHRhcmdldF9zZWwuZGF0dW0oKSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLm5hdicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3RvdWNobW92ZS5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVfZGVhY3RpdmF0ZSAoZCkge1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGQzLnNlbGVjdEFsbChkLmFjdGl2YXRlKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc2VkKCdvdmVybGFpZCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKGQuYm9keSwgb3ZlcmxhaWQpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBidXR0b24gbG9jYXRpb25cbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2hhc2ggKCkge1xuICAgICAgICB2YXIgc2V0X2hhc2hfdG8gPSB7fTtcbiAgICAgICAgaWYgKG92ZXJsYWlkKSB7XG4gICAgICAgICAgICBzZXRfaGFzaF90byA9IHsgJ292ZXJsYXknOiAnR28hJyB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuaGFzaC5pcyhzZXRfaGFzaF90byk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VfYnV0dG9uICgpIHtcblxuICAgICAgICB2YXIgd3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciB3aGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHZhciBtYXRjaGluZ19zZWw7XG4gICAgICAgIHZhciBiYm94O1xuXG4gICAgICAgIGlmIChvdmVybGFpZCkge1xuICAgICAgICAgICAgYmJveCA9IHRhcmdldF9zZWwubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIHBfYmJveCA9IHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgncCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2hlaWdodCA9IGJib3guaGVpZ2h0O1xuICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS1yaXNkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRhcmdldF9zZWwuc3R5bGUoJ2xlZnQnLCAod3dpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcF9iYm94LndpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmJveC53aWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgICAgIHRhcmdldF9zZWwuc3R5bGUoJ2JvdHRvbScsICh3aGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYm94LmhlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoaW5nX3NlbCA9XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tMjAxNCcpO1xuICAgICAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIG1hdGNoaW5nX3NlbC5zdHlsZSgncmlnaHQnKSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIG1hdGNoaW5nX3NlbC5zdHlsZSgnYm90dG9tJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm91dGVyIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgcHJldmlvdXNfdHlwZSA9ICdpbmRleCc7XG5cbiAgICBjb250ZXh0Lmhhc2guZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdjaGFuZ2Uucm91dGVyJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHNldChkKTtcbiAgICAgICAgfSk7XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBzZXQoY29udGV4dC5oYXNoLmlzKCkpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0IChkKSB7XG4gICAgICAgIGlmIChkLnR5cGUgPT09ICdpbmRleCcpIHtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c190eXBlID09PSAnb3ZlcmxheScpIHtcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSBhYm91dCBvdmVybGF5XG4gICAgICAgICAgICAgICAgY29udGV4dC5uYXYuZGlzcGF0Y2guY2xvc2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldmlvdXNfdHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gY2xvc2UgbGlnaHRib3hcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpZ2h0Ym94LmRpc3BhdGNoLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZC50eXBlID09PSAnb3ZlcmxheScpIHtcbiAgICAgICAgICAgIC8vIGFjdGl2YXRlIG92ZXJsYXlcbiAgICAgICAgICAgIGNvbnRleHQubmF2LmRpc3BhdGNoLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgLy8gYWN0aXZhdGUgbGlnaHRib3hcbiAgICAgICAgICAgIGNvbnRleHQubGlnaHRib3guZGlzcGF0Y2gub3BlbihkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzX3R5cGUgPSBkLnR5cGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRGF0YSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgcmVxdWVzdGVkID0gW10sXG4gICAgICAgIGF2YWlsYWJsZSxcbiAgICAgICAgczMgPSAnaHR0cHM6Ly9yaXNkZ3JhZHNob3cyMDE0LnMzLmFtYXpvbmF3cy5jb20vJztcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZGF0YScsJ2VuZE9mRGF0YScsICdwaWVjZScsICdtZXRhZGF0YScpO1xuXG4gICAgc2VsZi5mZXRjaF9waWVjZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBkMy5qc29uKHMzICsgJ3Byb2plY3RzLycgKyBpZCArICcuanNvbicsIHByb2Nlc3NfcGllY2UpO1xuICAgIH07XG5cbiAgICBzZWxmLmZldGNoX3BhZ2luYXRlZF9kYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWF2YWlsYWJsZSkge1xuICAgICAgICAgICAgZDMuanNvbihzMyArICdkYXRhL21ldGFkYXRhLmpzb24nLCBwcm9jZXNzX21ldGFkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2Nlc3NfcmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NfbWV0YWRhdGEgKHJhd19tZXRhKSB7XG4gICAgICAgIGF2YWlsYWJsZSA9IHJhd19tZXRhLnBhZ2VzO1xuICAgICAgICBzZWxmLmRpc3BhdGNoLm1ldGFkYXRhKHJhd19tZXRhKTtcbiAgICAgICAgcHJvY2Vzc19yZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc19yZXF1ZXN0ICgpIHtcbiAgICAgICAgdmFyIG5leHRfdG9fbG9hZCA9IGNob29zZV9hbmRfcmVtb3ZlX2Zyb21fYXZhaWxhYmxlKCk7XG4gICAgICAgIGlmIChuZXh0X3RvX2xvYWQpIHtcbiAgICAgICAgICAgIGQzLmpzb24obmV4dF90b19sb2FkLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5lbmRPZkRhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NfcGllY2UgKHBpZWNlKSB7XG4gICAgICAgIHNlbGYuZGlzcGF0Y2gucGllY2UocGllY2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNob29zZV9hbmRfcmVtb3ZlX2Zyb21fYXZhaWxhYmxlICgpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkO1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aDtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSBhdmFpbGFibGUuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaXhlZCAoKSB7XG4gICAgLy8gd2hlbiBjb250YWluZXIgaGl0cyB0aGUgdG9wLCBzd2l0Y2ggdGhhdCBlbGVtZW50IHRvIGZpeGVkXG4gICAgLy8gcGx1cyB0aGUgYWRkaXRpb25hbCBwYWRkaW5nXG5cbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBub3RfZml4ZWRfc2VsLFxuICAgICAgICBmaXhlZF9zZWwsXG4gICAgICAgIG5vdF9maXhlZF9kaXN0YW5jZSA9IDAsXG4gICAgICAgIGZpeGVkX2NsYXNzID0gJ2ZpeGVkJyxcbiAgICAgICAgbWFyZ2luX3RvX3ByZXZlbnRfb3ZlcmxhcCA9IDAsXG4gICAgICAgIHRvX3ByZXZlbnRfb3ZlcmxhcF9zZWwsXG4gICAgICAgIGV4dHJhX2Rpc3RhbmNlX2JleW9uZF9wcmV2ZW50ZWRfb3ZlcmxhcCA9IDQwO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhY3RpdmF0b3JWaXNpYmxlJyk7XG5cbiAgICBzZWxmLm5vdEZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbm90X2ZpeGVkX3NlbDtcbiAgICAgICAgbm90X2ZpeGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZml4ZWRfc2VsO1xuICAgICAgICBmaXhlZF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5wcmV2ZW50T3ZlcmxhcCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRvX3ByZXZlbnRfb3ZlcmxhcF9zZWw7XG4gICAgICAgIHRvX3ByZXZlbnRfb3ZlcmxhcF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi50b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG9cbiAgICAgICAgLy8gYW5kIHRoZSBwb2ludCBhdCB3aGljaCB0byBkaXNwYXRjaCBhY3RpdmF0b3JWaXNpYmxlXG4gICAgICAgIHZhciB0b3AgPSBub3RfZml4ZWRfZGlzdGFuY2U7XG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgLy8gaU9TIGRvZXMgbm90IHJlc3BlY3QgdGhlIG1hcmdpbiBvZiB0aGUgZWxlbWVudFxuICAgICAgICAgICAgLy8gdGhlIHdheSBkZXNrdG9wcyBkby4gc28gd2UgY2FuIGJ1aWxkIGl0IGludG9cbiAgICAgICAgICAgIC8vIG91ciBjaGVjayB0byBkaXNwYXRjaCB0aGUgY2hhbmdlIG9mIHNlY3Rpb24sXG4gICAgICAgICAgICAvLyBhbmQgb3VyIHNjcm9sbGluZyBwb3NpdGlvbi5cbiAgICAgICAgICAgIHRvcCAtPSBleHRyYV9kaXN0YW5jZV9iZXlvbmRfcHJldmVudGVkX292ZXJsYXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvcDtcbiAgICB9O1xuXG4gICAgc2VsZi5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxjX2NvbnRyYWludHMoKTtcblxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdzY3JvbGwuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCd0b3VjaG1vdmUuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2FsY19jb250cmFpbnRzKCk7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlX2ZpeGVkICgpIHtcbiAgICAgICAgdmFyIGZpeGVkX3kgPSAwO1xuICAgICAgICB2YXIgdG9wID0gc2VsZi50b3AoKTtcblxuICAgICAgICBpZiAoKHRvcCAtIHBhZ2VZT2Zmc2V0KSA8IDApIHtcbiAgICAgICAgICAgIGZpeGVkX3kgPSBwYWdlWU9mZnNldCAtIHRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaXhlZCA9IChmaXhlZF95ID09PSAwKSA/IGZhbHNlIDogdHJ1ZTtcblxuICAgICAgICBzZWxmLmRpc3BhdGNoXG4gICAgICAgICAgICAuYWN0aXZhdG9yVmlzaWJsZShmaXhlZCk7XG5cbiAgICAgICAgZml4ZWRfc2VsLmNsYXNzZWQoZml4ZWRfY2xhc3MsIGZpeGVkKTtcblxuICAgICAgICBpZiAoKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSAmJiAoZml4ZWQpKSB7XG4gICAgICAgICAgICB0b19wcmV2ZW50X292ZXJsYXBfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tdG9wJywgbWFyZ2luX3RvX3ByZXZlbnRfb3ZlcmxhcCArICdweCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9fcHJldmVudF9vdmVybGFwX3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbWFyZ2luLXRvcCcsXG4gICAgICAgICAgICAgICAgICAgICAgIGV4dHJhX2Rpc3RhbmNlX2JleW9uZF9wcmV2ZW50ZWRfb3ZlcmxhcCArICdweCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY19jb250cmFpbnRzICgpIHtcbiAgICAgICAgdmFyIG5vdF9maXhlZF9tYXJnaW4gPVxuICAgICAgICAgICAgICAgIHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgICBub3RfZml4ZWRfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi10b3AnKSwgMTApICtcbiAgICAgICAgICAgICAgICBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICAgbm90X2ZpeGVkX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tYm90dG9tJyksIDEwKTtcbiAgICAgICAgdmFyIG5vdF9maXhlZF9oZWlnaHQgPVxuICAgICAgICAgICAgICAgIG5vdF9maXhlZF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgLmhlaWdodDtcblxuICAgICAgICBub3RfZml4ZWRfZGlzdGFuY2UgPSBub3RfZml4ZWRfbWFyZ2luICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90X2ZpeGVkX2hlaWdodDtcblxuICAgICAgICBtYXJnaW5fdG9fcHJldmVudF9vdmVybGFwID1cbiAgICAgICAgICAgIHBhcnNlSW50KGZpeGVkX3NlbC5zdHlsZSgnaGVpZ2h0JyksIDEwKSArXG4gICAgICAgICAgICBwYXJzZUludChmaXhlZF9zZWwuc3R5bGUoJ21hcmdpbi10b3AnKSwgMTApICtcbiAgICAgICAgICAgIGV4dHJhX2Rpc3RhbmNlX2JleW9uZF9wcmV2ZW50ZWRfb3ZlcmxhcDtcblxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgYmVoYW5jZSA9IHJlcXVpcmUoJy4vZGF0YScpKCk7XG52YXIgZGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpKCk7XG52YXIgdHJhbnNmb3JtID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0nKSgpO1xudmFyIHNtb290aF9zY3JvbGwgPSByZXF1aXJlKCcuL3Njcm9sbHRvJykoeyBkdXJhdGlvbjogMTAwMCB9KTtcbnZhciBmaXhlZCA9IHJlcXVpcmUoJy4vZml4ZWQnKSgpO1xudmFyIGxheW91dF9pbWFnZSA9IHJlcXVpcmUoJy4vbGF5b3V0X2ltYWdlJykoKTtcbnZhciBsYXlvdXRfZml4ZWQgPSByZXF1aXJlKCcuL2xheW91dF9maXhlZCcpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoY29udGV4dCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gZmFsc2UsXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsLFxuICAgICAgICBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGRlcGFydG1lbnRfd3JhcHBlcl9zZWwsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICBpc28sXG4gICAgICAgIGxheW91dCA9ICdpbWFnZScsXG4gICAgICAgIGxheW91dHMgPSB7XG4gICAgICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgICAgIHJlbmRlcjogcmVuZGVyX2ltYWdlLFxuICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplX2ltYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZml4ZWQ6IHtcbiAgICAgICAgICAgICAgICByZW5kZXI6IHJlbmRlcl9maXhlZCxcbiAgICAgICAgICAgICAgICByZXNpemU6IHJlc2l6ZV9maXhlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnRyb19zZWwsXG4gICAgICAgIGh0bWxfc2VsID0gZDMuc2VsZWN0KCdodG1sJyk7XG5cbiAgICBiZWhhbmNlLmRpc3BhdGNoXG4gICAgICAgIC5vbignZGF0YScsIGZ1bmN0aW9uIChyZXF1ZXN0ZWQpIHtcblxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0ZWQpIHRocm93ICdXb3JrLiBHb3Qgbm8gZGF0YS4nO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHJhbnNmb3JtKHJlcXVlc3RlZC5vYmplY3RzKTtcblxuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZC5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldEl0ZW0oZC5pZCwgSlNPTi5zdHJpbmdpZnkoZCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQodHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgcmVuZGVyKCk7XG5cbiAgICAgICAgICAgIGJlaGFuY2UuZmV0Y2hfcGFnaW5hdGVkX2RhdGEoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlbmRPZkRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWwuY2xhc3NlZCgnd29yay1sb2FkZWQnLCB0cnVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtZXRhZGF0YScsIGZ1bmN0aW9uIChtZXRhKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGZpbHRlcmFibGUgbGlzdFxuICAgICAgICAgICAgZGVwYXJ0bWVudHMuaXNGaWx0ZXJhYmxlKG1ldGEuaW5jbHVkZWRfZGVwYXJ0bWVudHMpO1xuICAgICAgICB9KTtcblxuICAgIGZpeGVkLmRpc3BhdGNoXG4gICAgICAgIC5vbignYWN0aXZhdG9yVmlzaWJsZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBkZXBhcnRtZW50cy5hY3RpdmF0b3JWaXNpYmxlKGQpO1xuICAgICAgICAgICAgaHRtbF9zZWwuY2xhc3NlZCgnaW4td29yaycsIGQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmZpbHRlcnMgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGRlcGFydG1lbnRfY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmludHJvID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaW50cm9fc2VsO1xuICAgICAgICBpbnRyb19zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5sYXlvdXQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsYXlvdXQ7XG4gICAgICAgIGxheW91dCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmluZmluaXRlU2Nyb2xsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaW5maW5pdGVfc2Nyb2xsX2Jvb2w7XG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gXztcblxuICAgICAgICBpZiAoaW5maW5pdGVfc2Nyb2xsX2Jvb2wgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHNldHVwIGluZmluaXRlIHNjcm9sbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHZhciBoYXNoX2FyZ3MgPSBjb250ZXh0Lmhhc2guaXMoKTtcbiAgICAgICAgaWYgKChoYXNoX2FyZ3MpICYmIChoYXNoX2FyZ3MudHlwZSA9PT0gJ3Byb2plY3QnKSkge1xuICAgICAgICAgICAgYmVoYW5jZS5kaXNwYXRjaFxuICAgICAgICAgICAgICAgIC5vbigncGllY2UnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0cmFuc2Zvcm0oW2RdKVswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRJdGVtKHRyYW5zZm9ybWVkLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodHJhbnNmb3JtZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXModHJhbnNmb3JtZWQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBsaWdodGJveC5zaG93KHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgICAgICAgICAgYmVoYW5jZS5kaXNwYXRjaC5vbigncGllY2UnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJlaGFuY2UuZmV0Y2hfcGllY2UoaGFzaF9hcmdzLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldF9pbnRyb19oZWlnaHQoKTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiV29yayByZXF1aXJlcyBhIGNvbnRhaW5lclwiO1xuICAgICAgICBjb250YWluZXJfc2VsLmNhbGwoYWRkX3N0cnVjdHVyZSk7XG4gICAgICAgIGxheW91dF9maXhlZC5jb250YWluZXIod29ya19jb250YWluZXJfc2VsKTtcbiAgICAgICAgbGF5b3V0X2ltYWdlLmNvbnRhaW5lcih3b3JrX2NvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgIC8vIHdpbGwgYmUgdGhlIHRoaW5nIHRvIGNhbGwgcmVuZGVyXG4gICAgICAgIGJlaGFuY2UuZmV0Y2hfcGFnaW5hdGVkX2RhdGEoKTtcblxuICAgICAgICAvLyBmaWx0ZXJpbmdcbiAgICAgICAgZGVwYXJ0bWVudHMuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkZXBhcnRtZW50KSB7XG5cbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50ID09PSAnYWxsJykgZGVwYXJ0bWVudCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoaXNvKSB7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChkZXBhcnRtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNldF93b3JrX2hlaWdodCgpO1xuICAgICAgICAgICAgICAgIHNtb290aF9zY3JvbGwudG8oZml4ZWQudG9wKCkgKyAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZpeGVkLmluaXRpYWxpemUoKTtcblxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNpemUoKTtcbiAgICAgICAgICAgICAgICBzZXRfaW50cm9faGVpZ2h0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICAgICAgbGF5b3V0c1tsYXlvdXRdLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZSAoKSB7XG4gICAgICAgIGxheW91dHNbbGF5b3V0XS5yZXNpemUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZml4ZWQgKCkge1xuICAgICAgICB3b3JrX3NlbCA9IHdvcmtfY29udGFpbmVyX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB2YXIgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpO1xuXG4gICAgICAgIGxheW91dF9maXhlZFxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWxfZW50ZXIpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9maXhlZC5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ZpeGVkLXBpZWNlIHBpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5yaXNkX3Byb2dyYW1fY2xhc3MgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBvcmllbnRhdGlvbi0nICsgZC5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5tZXRhX3NwYWNlKSArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLWltZy13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKGFkZF9pbWFnZSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbWV0YS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfbWV0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbC5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoZCk7XG4gICAgICAgICAgICAvLyBsaWdodGJveC5zaG93KGQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWlzbykge1xuICAgICAgICAgICAgaXNvID0gbmV3IElzb3RvcGUod29ya19jb250YWluZXJfc2VsLm5vZGUoKSwge1xuICAgICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5waWVjZScsXG4gICAgICAgICAgICAgICAgbWFzb25yeTogbWFzb25yeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3b3JrX3NlbF9lbnRlci5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpc28uYXBwZW5kZWQodGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9pbWFnZSAoKSAge1xuICAgICAgICB3b3JrX3NlbCA9IHdvcmtfY29udGFpbmVyX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB2YXIgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdpbWFnZS1waWVjZSBwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGQucmlzZF9wcm9ncmFtX2NsYXNzO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxheW91dF9pbWFnZVxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWxfZW50ZXIpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9pbWFnZS5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2Utd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX2ltYWdlKTtcbiAgICAgICAgXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tZXRhLXdyYXBwZXInKVxuICAgICAgICAgICAgICAgIC5jYWxsKGFkZF9tZXRhKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGNvbnRleHQuaGFzaC5pcyhkKTtcbiAgICAgICAgICAgIC8vIGxpZ2h0Ym94LnNob3coZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby51bmJpbmRSZXNpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX2ltYWdlICgpIHtcblxuICAgICAgICBsYXlvdXRfaW1hZ2VcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfaW1hZ2UubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfZml4ZWQgKCkge1xuXG4gICAgICAgIGxheW91dF9maXhlZFxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWwpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9maXhlZC5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnBpZWNlLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucGllY2UtaW1nLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLnVuYmluZFJlc2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfc3RydWN0dXJlIChzZWwpICB7XG4gICAgICAgIGRlcGFydG1lbnRfd3JhcHBlcl9zZWwgPSBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlcGFydG1lbnRzIGdyaWQgei0xNScpO1xuXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbCA9IHNlbC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmsgZ3JpZCB6LTEwICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnd29yay1sYXlvdXQtJyArIGxheW91dCk7XG5cbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC5jb250YWluZXIoZGVwYXJ0bWVudF93cmFwcGVyX3NlbClcbiAgICAgICAgICAgIC5tb2JpbGUoZDMuc2VsZWN0KCcubmF2LW1vYmlsZScpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIGZpeGVkXG4gICAgICAgICAgICAubm90Rml4ZWQoaW50cm9fc2VsKVxuICAgICAgICAgICAgLmZpeGVkKGRlcGFydG1lbnRfY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgIC5wcmV2ZW50T3ZlcmxhcCh3b3JrX2NvbnRhaW5lcl9zZWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9tZXRhIChzZWwpIHtcbiAgICAgICAgc2VsLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3R1ZGVudC1uYW1lIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdHVkZW50X25hbWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyaXNkLXByb2dyYW0gcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnJpc2RfcHJvZ3JhbTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9pbWFnZSAoc2VsKSB7XG4gICAgICAgIHNlbC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5zcmM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRfaW50cm9faGVpZ2h0ICgpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9XG4gICAgICAgICAgICBpbnRyb19zZWxcbiAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArXG4gICAgICAgICAgICBwYXJzZUludChpbnRyb19zZWwuc3R5bGUoJ21hcmdpbi10b3AnKSwgMTApICtcbiAgICAgICAgICAgIHBhcnNlSW50KGludHJvX3NlbC5zdHlsZSgnbWFyZ2luLWJvdHRvbScpLCAxMCk7XG5cbiAgICAgICAgaWYgKGhlaWdodCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBoZWlnaHQ7XG4gICAgICAgICAgICBpbnRyb19zZWwuc3R5bGUoJ3BhZGRpbmctYm90dG9tJywgZGlmZmVyZW5jZSArICdweCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0X3dvcmtfaGVpZ2h0ICgpIHtcbiAgICAgICAgdmFyIGJhc2VfbWFyZ2luID0gMTAwO1xuXG4gICAgICAgIHZhciB3b3JrX2hlaWdodCA9IHdvcmtfY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gICAgICAgIHZhciB0b19jbGVhcl9oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICB2YXIgZGVwdF9oZWlnaHQgPVxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGRlcGFydG1lbnRfd3JhcHBlcl9zZWwuc3R5bGUoJ2hlaWdodCcpLCAxMCkgK1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGRlcGFydG1lbnRfd3JhcHBlcl9zZWwuc3R5bGUoJ21hcmdpbi10b3AnKSwgMTApO1xuXG4gICAgICAgICAgICB0b19jbGVhcl9oZWlnaHQgPSB3b3JrX2hlaWdodCArIGRlcHRfaGVpZ2h0O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b19jbGVhcl9oZWlnaHQgPSB3b3JrX2hlaWdodDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRvX2NsZWFyX2hlaWdodCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b19jbGVhcl9oZWlnaHQ7XG4gICAgICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi1ib3R0b20nLCBkaWZmZXJlbmNlICsgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWwuc3R5bGUoJ21hcmdpbi1ib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlX21hcmdpbiArICdweCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGF5b3V0X2ZpeGVkICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuICAgIHZhciBjb3VudGVyID0ge1xuICAgICAgICB0YWxsOiAwLFxuICAgICAgICB3aWRlOiAwXG4gICAgfTtcbiAgICB2YXIgZnJlcXVlbmN5ID0ge1xuICAgICAgICBsYXJnZTogMTUsXG4gICAgICAgIHRhbGw6IDgsXG4gICAgICAgIHdpZGU6IDZcbiAgICB9O1xuICAgIHZhciBtZXRhX3NwYWNlID0gNTA7XG4gICAgdmFyIG1hc29ucnkgPSB7XG4gICAgICAgIGd1dHRlcjogMCxcbiAgICAgICAgY29sdW1uV2lkdGg6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoRG91YmxlOiAwXG4gICAgfTtcblxuICAgIHNlbGYubWFzb25yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBtYXNvbnJ5ID0gbWFzb25yeV9zZXR0aW5ncygpO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkLm1ldGFfc3BhY2UgPSBtZXRhX3NwYWNlO1xuICAgICAgICAgICAgdmFyIG11bHRpcGxpZXIgPSAxO1xuXG4gICAgICAgICAgICBpZiAoaSAlIGZyZXF1ZW5jeS5sYXJnZSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgLy8gbGFyZ2VcbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gMjtcblxuICAgICAgICAgICAgICAgIGlmICgoZC5jb3Zlci5vcmlnaW5hbF93aWR0aC9cbiAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZC5vcmllbnRhdGlvbiA9ICdsYW5kc2NhcGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAncG9ydHJhaXQnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIChtYXNvbnJ5LmNvbHVtbldpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIpICtcbiAgICAgICAgICAgICAgICAgICAgKChtdWx0aXBsaWVyID09PSAxKSA/XG4gICAgICAgICAgICAgICAgICAgICAgMCA6IG1hc29ucnkuZ3V0dGVyKTtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPSBkLm1hc29ucnlfd2lkdGg7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkgPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBsYW5kc2NhcGVcbiAgICAgICAgICAgICAgICBjb3VudGVyLndpZGUgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlci53aWRlICUgZnJlcXVlbmN5LndpZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IDI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgKG1hc29ucnkuY29sdW1uV2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllcikgK1xuICAgICAgICAgICAgICAgICAgICAoKG11bHRpcGxpZXIgPT09IDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAwIDogbWFzb25yeS5ndXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9IGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHBvcnRyYWl0XG4gICAgICAgICAgICAgICAgY291bnRlci50YWxsICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIudGFsbCAlIGZyZXF1ZW5jeS50YWxsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAobWFzb25yeS5jb2x1bW5XaWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKSArXG4gICAgICAgICAgICAgICAgICAgICgobXVsdGlwbGllciA9PT0gMSkgP1xuICAgICAgICAgICAgICAgICAgICAgIDAgOiBtYXNvbnJ5Lmd1dHRlcik7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbldpZHRoO1xuICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAncG9ydHJhaXQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFzb25yeV9zZXR0aW5ncyAoKSB7XG4gICAgICAgIHZhciB0b3RhbF93b3JrX3dpZHRoID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2lkdGg7XG5cbiAgICAgICAgdmFyIG51bWJlcl9vZl9jb2x1bW5zID0gMjtcblxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XG4gICAgICAgICAgICBudW1iZXJfb2ZfY29sdW1ucyA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ3V0dGVyID0gMDtcbiAgICAgICAgdmFyIGNvbHVtbl93aWR0aCA9ICh0b3RhbF93b3JrX3dpZHRoIC8gbnVtYmVyX29mX2NvbHVtbnMpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChndXR0ZXIgKiAobnVtYmVyX29mX2NvbHVtbnMgLSAxKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGd1dHRlcjogZ3V0dGVyLFxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbl93aWR0aCxcbiAgICAgICAgICAgIGNvbHVtbkRvdWJsZVdpZHRoOiBjb2x1bW5fd2lkdGggKiAyICsgZ3V0dGVyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGF5b3V0X2ltYWdlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuICAgIHZhciBtZXRhX3NwYWNlID0gMzU7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBmcmVxdWVuY3kgPSAxNDtcbiAgICB2YXIgbWFzb25yeSA9IHtcbiAgICAgICAgZ3V0dGVyOiAwLFxuICAgICAgICBjb2x1bW5XaWR0aDogMCxcbiAgICAgICAgY29sdW1uV2lkdGhEb3VibGU6IDBcbiAgICB9O1xuXG4gICAgc2VsZi5tYXNvbnJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWFzb25yeTtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0cmlidXRlcyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIG1hc29ucnkgPSBtYXNvbnJ5X3NldHRpbmdzKCk7XG5cbiAgICAgICAgc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmICgoZC5jb3Zlci5vcmlnaW5hbF93aWR0aC9cbiAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpID5cbiAgICAgICAgICAgICAgICAxLjgpIHtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9IG1hc29ucnkuY29sdW1uRG91YmxlV2lkdGg7XG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICgoZC5tYXNvbnJ5X3dpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX3dpZHRoKSArIG1ldGFfc3BhY2U7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlciArPSAxO1xuXG4gICAgICAgICAgICAgICAgLy8gbWFrZSBldmVyeSA1dGggb25lIGJpZy5cbiAgICAgICAgICAgICAgICBpZiAoY291bnRlciAlIGZyZXF1ZW5jeSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzb25yeS5jb2x1bW5Eb3VibGVXaWR0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbldpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAgICAgKChkLm1hc29ucnlfd2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfd2lkdGgpICtcbiAgICAgICAgICAgICAgICAgICAgbWV0YV9zcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1hc29ucnlfc2V0dGluZ3MgKCkge1xuICAgICAgICB2YXIgdG90YWxfd29ya193aWR0aCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpZHRoO1xuXG4gICAgICAgIHZhciBudW1iZXJfb2ZfY29sdW1ucyA9IDI7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbnVtYmVyX29mX2NvbHVtbnMgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGd1dHRlciA9IDA7XG4gICAgICAgIHZhciBjb2x1bW5fd2lkdGggPSAodG90YWxfd29ya193aWR0aCAvIG51bWJlcl9vZl9jb2x1bW5zKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoZ3V0dGVyICogKG51bWJlcl9vZl9jb2x1bW5zIC0gMSkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBndXR0ZXI6IGd1dHRlcixcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgICBjb2x1bW5Eb3VibGVXaWR0aDogY29sdW1uX3dpZHRoICogMiArIGd1dHRlclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgc3ZnX2Nyb3NzID0gcmVxdWlyZSgnLi9zdmdDcm9zcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpZ2h0Ym94IChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKSxcbiAgICAgICAgaHRtbF9zZWwgPSBkMy5zZWxlY3QoJ2h0bWwnKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2xpY2tDbG9zZWQnLCAnY2xvc2UnLCAnb3BlbicpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjbG9zZS5saWdodGJveCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBtZXNzYWdlIHNldCBieSByb3V0ZXIsIHZpYSBoYXNoIGNoYW5nZVxuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdvcGVuLmxpZ2h0Ym94JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAvLyBtZXNzYWdlIHNldCBieSByb3V0ZXIsIHZpYSBoYXNoIGNoYW5nZVxuICAgICAgICAgICAgICAgIHZhciBkYXRhO1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvdyhKU09OLnBhcnNlKGRhdGEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGlja0Nsb3NlZC5saWdodGJveCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmhhc2guaXMoe30pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiTGlnaHRib3guIFJlcXVpcmVzIGNvbnRhaW5lci5cIjtcbiAgICAgICAgXG4gICAgICAgIHZhciBibGFua2V0ID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmaXhlZC1mdWxsc2NyZWVuIGJsYW5rZXQnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfZ3JpZF9zZWwgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfY29udHJvbHNfZ3JpZF9zZWwgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWNvbnRyb2xzLWNvbnRhaW5lciAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZpeGVkLWZ1bGwtd2lkdGgnKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRyb2xzID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2NvbnRyb2xzX2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtY29udHJvbHMnKVxuICAgICAgICAgICAgICAgIC5jYWxsKHN2Z19jcm9zcyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X21ldGFfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YScpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF93b3JrX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAnbGlnaHRib3gtd29yayAnK1xuICAgICAgICAgICAgICAgICAgICAgICdvZmZzZXQtcGVyY2VudC0yLTEwICcrXG4gICAgICAgICAgICAgICAgICAgICAgJ2NvbC1wZXJjZW50LTgtMTAnKTtcblxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgIGxpZ2h0Ym94X21ldGFfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaWdodGJveF9tZXRhX3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAocGFyc2VJbnQobGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tbGVmdCcpKSAtIDIwKSArICdweCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxpZ2h0Ym94JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgICAgICAgICBsaWdodGJveF9tZXRhX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwYXJzZUludChsaWdodGJveF93b3JrX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbWFyZ2luLWxlZnQnKSkgLSAyMCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5wcm9qZWN0X25hbWUpO1xuXG4gICAgICAgIGlmIChkYXRhLnByb2plY3RfbmFtZSAhPSBkYXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBsaWdodGJveF93b3JrX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgICAgLnRleHQoZGF0YS5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBsaWdodGJveF93b3JrX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhLm1vZHVsZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZScpXG4gICAgICAgICAgICAuZWFjaChhZGRfbW9kdWxlcyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X21ldGFfaW5mb19zZWwgPSBsaWdodGJveF9tZXRhX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8nKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXN0dWRlbnQtbmFtZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnN0dWRlbnRfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1yaXNkLXByb2dyYW0nKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5yaXNkX3Byb2dyYW0pO1xuXG4gICAgICAgIGlmIChkYXRhLnBlcnNvbmFsX2xpbmsubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgZGF0YS5wZXJzb25hbF9saW5rKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICAgICAgICAgICAgICAudGV4dCgnUGVyc29uYWwgV2Vic2l0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1wZXJzb25hbC1saW5rJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnVybClcbiAgICAgICAgICAgIC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICAgICAgICAgIC50ZXh0KCdCZWhhbmNlIFBvcnRmb2xpbycpO1xuXG4gICAgICAgIGNvbnRhaW5lcl9zZWwuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIHRydWUpO1xuICAgICAgICBodG1sX3NlbC5jbGFzc2VkKCdpbi1saWdodGJveCcsIHRydWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X2NvbnRyb2xzLnNlbGVjdCgnLmNyb3NzLXN2ZycpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGlja0Nsb3NlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgYmxhbmtldFxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xpY2tDbG9zZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgICAgIGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCBmYWxzZSk7XG4gICAgICAgIGh0bWxfc2VsLmNsYXNzZWQoJ2luLWxpZ2h0Ym94JywgZmFsc2UpO1xuXG4gICAgICAgIGNvbnRhaW5lcl9zZWwub24oJ2NsaWNrJywgbnVsbCk7XG4gICAgICAgIFxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubGlnaHRib3gnLCBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfbW9kdWxlcyAoZCwgaSkge1xuICAgICAgICB2YXIgc2VsID0gZDMuc2VsZWN0KHRoaXMpO1xuXG4gICAgICAgIGlmIChkLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIHNlbC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsXG4gICAgICAgICAgICAgICAgICAgIGQuc2l6ZXMubWF4XzEyNDAgPyBkLnNpemVzLm1heF8xMjQwIDogZC5zcmMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgc2VsLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1vZHVsZS10ZXh0JylcbiAgICAgICAgICAgICAgICAudGV4dChkLnRleHRfcGxhaW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoZC50eXBlID09PSAnZW1iZWQnKSB8IChkLnR5cGUgPT09ICd2aWRlbycpKSB7XG4gICAgICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tb2R1bGUtZW1iZWQnKVxuICAgICAgICAgICAgICAgIC5odG1sKGQuZW1iZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2Nyb2xsdG8gKGFyZ3MpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3MgfHwge307XG4gICAgb3B0aW9ucy5kdXJhdGlvbiA9IGFyZ3MuZHVyYXRpb24gfHwgMjAwMDtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdzY3JvbGxFbmQnKTtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbF90d2VlbiAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGQzLmludGVycG9sYXRlTnVtYmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUbygwLCBpKHQpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2VsZi50byA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgICAgIC50d2Vlbignc2Nyb2xsJywgc2Nyb2xsX3R3ZWVuKG9mZnNldCkpXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guc2Nyb2xsRW5kKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ZnQ3Jvc3MgKHNlbCkge1xuICAgIHZhciBidXR0b25fc2l6ZSA9IDI4O1xuXG4gICAgLy8gYWRkIHRoZSBjbG9zaW5nIHggYXMgc3ZnXG4gICAgdmFyIHN2ZyA9IHNlbC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjcm9zcy1zdmcnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCBidXR0b25fc2l6ZSlcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGJ1dHRvbl9zaXplKTtcblxuICAgIHN2Z1xuICAgICAgICAuc2VsZWN0QWxsKCdsaW5lJylcbiAgICAgICAgLmRhdGEoW1xuICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsXG4gICAgICAgICAgICAgIHgyOiBidXR0b25fc2l6ZSwgeTI6IGJ1dHRvbl9zaXplIH0sXG4gICAgICAgICAgICB7IHgxOiBidXR0b25fc2l6ZSwgeTE6IDAsXG4gICAgICAgICAgICAgIHgyOiAwLCB5MjogYnV0dG9uX3NpemUgfVxuICAgICAgICBdKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgICAgIC5hdHRyKCd4MScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueDE7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC55MTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneDInLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLngyO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd5MicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQueTI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDEpO1xuXG4gICAgc3ZnXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnYmxhbmtldCcpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBidXR0b25fc2l6ZSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgYnV0dG9uX3NpemUpO1xufTsiLCIvLyByZXF1aXJlcyBkMy5zY2FsZS5vcmRpbmFsXG5tb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybTtcblxuZnVuY3Rpb24gdHJhbnNmb3JtICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBmb3JtYXR0ZWQgPSBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMoaW5wdXQpO1xuICAgICAgICByZXR1cm4gc2h1ZmZsZShmb3JtYXR0ZWQpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAoZGF0YSkge1xuXG4gICAgdmFyIGZvcm1hdHRlZF9kYXRhID0gW107XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIGV4dGVudCBvZiB3aWR0aHNcbiAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgIGFsbF9tb2R1bGVzLnB1c2gobWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICB2YXIgbW9kdWxlc19mb3JfY292ZXIgPSBbXTtcbiAgICAgICAgdmFyIG1vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXIucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGVzZSBhcmUgYWxsIGNhc2VzIHRoYXQgYXJlXG4gICAgICAgICAgICAvLyBjb3ZlcmVkIGluIGxpZ2h0Ym94LmpzXG4gICAgICAgICAgICBpZiAoKG1kLnR5cGUgPT09ICdpbWFnZScpIHxcbiAgICAgICAgICAgICAgICAobWQudHlwZSA9PT0gJ3RleHQnKSB8XG4gICAgICAgICAgICAgICAgKG1kLnR5cGUgPT09ICdlbWJlZCcpIHxcbiAgICAgICAgICAgICAgICAobWQudHlwZSA9PT0gJ3ZpZGVvJykpIHtcblxuICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJhbmRvbV9jb3ZlcjtcbiAgICAgICAgaWYgKG1vZHVsZXNfZm9yX2NvdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIHJhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgIC8vIGJhc2VkIG9uIGltYWdlcyB0byBpbmNsdWRlXG4gICAgICAgICAgICB2YXIgcmFuZG9tX21vZHVsZSA9XG4gICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXIubGVuZ3RoKV07XG5cbiAgICAgICAgICAgIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogK3JhbmRvbV9tb2R1bGUud2lkdGgsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfaGVpZ2h0OiArcmFuZG9tX21vZHVsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc3JjOiByYW5kb21fbW9kdWxlLnNyY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJhbmRvbV9jb3Zlci5oZWlnaHQgPSAocmFuZG9tX2NvdmVyLndpZHRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLmhlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSwganVzdCB1c2UgYSB0aGUgY292ZXIgdGhhdFxuICAgICAgICAgICAgLy8gaXMgaW5jbHVkZWRcbiAgICAgICAgICAgIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogNDA0LFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogMzE2LFxuICAgICAgICAgICAgICAgIHNyYzogZC5kZXRhaWxzLmNvdmVyc1snNDA0J11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0dGVkX2RhdGEucHVzaCh7XG4gICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW1fY2xhc3MnOlxuICAgICAgICAgICAgICAgIGVzY2FwZV9kZXBhcnRtZW50KGQucmlzZF9wcm9ncmFtKSxcbiAgICAgICAgICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGQuZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHVybDogZC5vd25lcnNbMF0udXJsLFxuICAgICAgICAgICAgcGVyc29uYWxfbGluazogZC5wZXJzb25hbF9saW5rLFxuICAgICAgICAgICAgaWQ6IGQuaWRcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkX2RhdGE7XG59XG5cbmZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgaTtcbiAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgIHJldHVybiBvO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVfZGVwYXJ0bWVudChkKSB7XG4gICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICctJyk7XG59Il19
