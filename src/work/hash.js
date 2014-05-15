module.exports = function hashFactory () {
    var index_hash = '#!';

    var self = function (d) {
        // getter
        if (!arguments.length) {
            return parse_hash(window.location.hash);
        }

        // setter
        var hash = index_hash;
        if ('id' in d) {
            hash = format_hash(d);
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
            return {
                id: args[0],
                student_name: args[0],
                project_name: args[2]
            };
        } else {
            return false;
        }
    }

    function format_hash (d) {
        return '#' + [d.id,
                      escape_for_url(d.student_name),
                      escape_for_url(d.project_name)].join('/');
    }

    function escape_for_url (string) {
        return string.replace(/ /g, '-');
    }

    return self;
};