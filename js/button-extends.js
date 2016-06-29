var xyz = (function() {
    /* body... */
    'use strict';
    var doc = {
        DOC: document,
        setDOC: function(doc) {
            /* body... */
            this.DOC = doc;
        },
        getCurrentScript: function() {
            return (this.DOC._currentScript || this.DOC.currentScript);
        },
        getOwnerDocument: function() {
            return this.getCurrentScript().ownerDocument;
        },
        querySelector: function(selectors) {
            /* body... */
            return this.getOwnerDocument().querySelector(selectors);
        },
        querySelectorAll: function(selectors) {
            /* body... */
            return this.getOwnerDocument().querySelectorAll(selectors);
        }
    };

    function $(selector) {
        return doc.querySelectorAll(selector);
    }

    function parse(elem) {
        // body...  

        var extend = elem.getAttribute("extend");

        var elemName = elem.getAttribute("name");

        var template = elem.querySelector("template");

        var extendElem = doc.DOC.createElement(extend.toLowerCase());

        var content = template.content;

        var proto = Object.create(extendElem.__proto__);

        proto.createdCallback = function() {
            /* body... */
            var shadowRoot = this.createShadowRoot();

            if ("input".indexOf(extendElem.nodeName.toLowerCase()) < 0) {

                extendElem.innerHTML = "<content></content>";

            }

            content.appendChild(extendElem);

            var clone = document.importNode(content, true);

            shadowRoot.appendChild(clone);
        }

        document.registerElement(elemName, {
            prototype: proto
        });
    }

    return function() {
        /* body... */
        var elems = $("element");
        for (var i = 0; i < elems.length; i++) {
            parse(elems[i]);
        };
    }
}());
