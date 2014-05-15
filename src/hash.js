module.exports = function hashFactory () {
    var index_indicator = '!';
    var index_hash = '#' + index_indicator;
    var overlays = ['Go!'];

    var self = function (d) {
        // getter
        if (!arguments.length) {
            return parse_hash(window.location.hash);
        }

        // setter
        var hash = index_hash;
        var keys = Object.keys(d);
        console.log('keys');
        console.log(keys);
        if (keys.indexOf('id') > -1) {
            // { id: 1, student_name: '', project_name: ''}
            hash = format_lightbox_hash(d);
        } else if (keys.indexOf('overlay') > -1) {
            // { overlay: 'Go!' }
            if (overlays.indexOf(d.overlay) > -1) {
                hash = format_overlay_hash(d);
            }
        }
        window.location.replace(hash);

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
            if (args[0] === index_indicator) {
                return false;
            } else {
                // its an overlay
                return {
                    overlay: args[0],
                    type: 'overlay'
                };
            }
        } else {
            return false;
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