'use strict';

window.inherit = function(_self, _parent) {
    _self._parent = {};
    for (var key in _parent) {
        if (_self[key] === undefined) {
            _self[key] = _parent[key];
        }
        _self._parent[key] = _parent[key];
    }
    return _self;
};
