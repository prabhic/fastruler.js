/**
* Ruler on a web page. Targeted for infinite rulers.
* Based on RulersGuides.js Github - https://github.com/mark-rolich/RulersGuides.js
*
* @author Prabhanjana Kumar C <prabhi.c@gmail.com>
*/
var fastruler = function (window,container) {
    this.window = window;
    var parent = container;
    var wrapper = null;
    var hruler = null;
    var vruler = null;
    var hrulerWidth = window.innerWidth-21;
    var vrulerHeight = window.innerHeight-21;
    var pageXOff = 0;
    var pageYOff = 0;
    
    hruler = document.createElement('div');
    hruler.className = 'ruler h unselectable';
    hruler.style.width = hrulerWidth ;
    
    vruler = document.createElement('div');
    vruler.className = 'ruler v unselectable';
    vruler.style.height = vrulerHeight;

    wrapper = document.createElement('div');
    wrapper.className = 'fr-wraper';
    
    wrapper.appendChild(hruler);
    wrapper.appendChild(vruler);
    parent.appendChild(wrapper);
    
    var createHRuler = function() {
        var hrulerContents = createRuler('h',hrulerWidth, pageXOff); 
        
        while (hruler.firstChild) {
            hruler.removeChild(hruler.firstChild);
        }
        
        hruler.appendChild(hrulerContents);
    }

    var createVRuler = function() {
        var vrulerContents = createRuler('v',vrulerHeight, pageYOff);
        
        while (vruler.firstChild) {
            vruler.removeChild(vruler.firstChild);
        }
        
        vruler.appendChild(vrulerContents);
    }
    
    var createRuler       = function (type, size, start) {
        var i           = 0,
            span        = document.createElement('span'),
            label       = null,
            labelTxt    = null,
            spanFrag    = document.createDocumentFragment(),
            cnt         = Math.floor(size),
            leftOver    = start%10,
            pixToFrom   = 0,
            from        = 0;
        
        if (start>0) {
            from        = (leftOver==0)?start:((start - leftOver) + 10);
            pixToFrom   = (leftOver==0)?leftOver:10-leftOver;
        }
        else { 
            from        = (leftOver==0)?start:(start - leftOver);
            pixToFrom   = Math.abs(leftOver);
        }
        
        if (type=="h") {
            console.log(' start: '+start+' pix: '+pixToFrom+'from: '+ from);
        }
        for (i = from; i < cnt+from-15; i = i + 10) {
            span = span.cloneNode(false);
            if (i % 50 === 0) {
                span.className = 'milestone';

                label = span.cloneNode(false);
                label.className = 'label';

                if (i < 50) {
                    label.className += ' l10';
                } else if (i >= 50 && i < 500) {
                    label.className += ' l100';
                } else if (i >= 500) {
                    label.className += ' l1000';
                }

                 labelTxt = document.createTextNode(i);
                label.appendChild(labelTxt);
                span.appendChild(label);

                span.className = 'milestone';
            } else  {
                span.className = 'major';
            }
            spanFrag.appendChild(span);
        }
        
        if (type == 'h')  spanFrag.children[0].style.marginLeft = pixToFrom+'px';
        else  spanFrag.children[0].style.marginTop = pixToFrom+'px';

        return spanFrag;
    }
   
    var resizeHanlder = function () {
        hrulerWidth = window.innerWidth-21;
        vrulerHeight = window.innerHeight-21;

        hruler.style.width = hrulerWidth ;
        vruler.style.height = vrulerHeight;

        createHRuler();
        createVRuler();
    }    
    
    createHRuler();  
    createVRuler();
    window.onresize = resizeHanlder;
    
    this.setScrollOffsets = function(pX,pY) {
        if (pageXOff != pX) {
            pageXOff = pX;
            createHRuler();
        }
        
        if (pageYOff != pY) {
            pageYOff = pY;
            createVRuler();
        }
        
    }
}

