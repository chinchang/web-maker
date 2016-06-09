;(function () {

	editur = window.editur || {};

	var $ = document.querySelector.bind(document);
	var $all = document.querySelectorAll.bind(document);

	var updateTimer
		, updateDelay = 500
		, currentLayoutMode
		, frame = $('#demo-frame')
		, htmlCode = $('#js-html-code')
		,cssCode = $('#js-css-code')
		, jsCode = $('#js-js-code')
		, layoutBtn1 = $('#js-layout-btn-1')
		, layoutBtn2 = $('#js-layout-btn-2')
		, layoutBtn3 = $('#js-layout-btn-3')
		, helpBtn = $('#js-help-btn')
		, helpModal = $('#js-help-modal')
		, codepenBtn = $('#js-codepen-btn')
		, codepenForm = $('#js-codepen-form')
		, saveHtmlBtn = $('#js-save-html')
		, settingsBtn = $('#js-settings-btn'),
          optionBtns= [].slice.call($all("#js-options-btn")),
          collapseBtns= [].slice.call($all(".btn-collapse"))
		;

	editur.cm = {};
	editur.demoFrameDocument = frame.contentDocument || frame.contentWindow.document;

    
    function removeGutters() {
        var gutters = $all('.gutter');
		for (var i = gutters.length; i--;) {
			gutters[i].remove();
		}
    }
    
	function resetSplitting() {
		
        removeGutters();
        
		$('#js-html-code').setAttribute('style', '');
		$('#js-css-code').setAttribute('style', '');
		$('#js-js-code').setAttribute('style', '');
		$('#js-code-side').setAttribute('style', '');
		$('#js-demo-side').setAttribute('style', '');

		Split(['#js-html-code', '#js-css-code', '#js-js-code'], {
			direction: (currentLayoutMode === 2 ? 'horizontal' : 'vertical')
		});
		Split(['#js-code-side', '#js-demo-side' ], {
			direction: (currentLayoutMode === 2 ? 'vertical' : 'horizontal')
		});
	}
	window.toggleLayout = function (mode) {
		currentLayoutMode = mode;
		$('#js-layout-btn-1').classList.remove('selected');
		$('#js-layout-btn-2').classList.remove('selected');
		$('#js-layout-btn-3').classList.remove('selected');
		$('#js-layout-btn-' + mode).classList.add('selected');
		document.body.classList.remove('layout-1');
		document.body.classList.remove('layout-2');
		document.body.classList.remove('layout-3');
		document.body.classList.add('layout-' + mode);

		resetSplitting();
	}
    

	window.saveSetting = function saveSetting(setting, value) {
		var obj = {};
		obj[setting] = value;
		chrome.storage.local.set(obj, function() {
		});
	};

	function saveCode() {
		var code = {
			html: editur.cm.html.getValue(),
			css: editur.cm.css.getValue(),
			js: editur.cm.js.getValue()
		};
		saveSetting('code', code);
	}

	window.onunload = function () {
		saveCode();
	};

	editur.setPreviewContent = function () {
		var self = this;
		var html = editur.cm.html.getValue();
		var css = editur.cm.css.getValue();
		var js = editur.cm.js.getValue();


		html = '<html>\n<head>\n<style>\n' + css + '\n</style>\n</head>\n<body>\n' + html + '\n<script>\n' + js + '\n</script></body>\n</html>';

		var fileWritten = false;

		var blob = new Blob([ html ], {type : "text/plain;charset=UTF-8"});

		function errorHandler() { console.log(arguments); }

		window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function(fs){
			fs.root.getFile('preview.html', {create: true}, function(fileEntry) {
				fileEntry.createWriter(function(fileWriter) {
					function onWriteComplete() {
						if (fileWritten) {
							frame.src = 'filesystem:chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/temporary/' + 'preview.html';
						}
						else {
							fileWritten = true;
							fileWriter.seek(0);
							fileWriter.write(blob);
						}
					}
					fileWriter.onwriteend = onWriteComplete;
					fileWriter.truncate(0)
				}, errorHandler);
			}, errorHandler);
		}, errorHandler);
	};

	function initEditor(element, options) {
		var cm = CodeMirror(element, {
			mode: options.mode,
			lineNumbers: true,
			lineWrapping: true,
			autofocus: options.autofocus || false,
			autoCloseBrackets: true,
    		matchBrackets: true,
			tabMode: 'indent',
			keyMap: 'sublime',
			theme: 'monokai',
			// cursorScrollMargin: '20', has issue with scrolling
			profile: options.profile || ''
		});
		cm.on('change', function onChange() {
			clearTimeout(updateTimer);
			updateTimer = setTimeout(function () {
				editur.setPreviewContent();
			}, updateDelay);
		});
		return cm;
	}

	editur.cm.html = initEditor(htmlCode, {
		mode: 'htmlmixed',
		autofocus: true,
		profile: 'xhtml'
	});
	emmetCodeMirror(editur.cm.html);
	editur.cm.css = initEditor(cssCode, {
		mode: 'css'
	});
	editur.cm.js = initEditor(jsCode, {
		mode: 'javascript'
	});

	function init () {
		var lastCode;

		layoutBtn1.addEventListener('click', function () { saveSetting('layoutMode', 1); toggleLayout(1); return false; });
		layoutBtn2.addEventListener('click', function () { saveSetting('layoutMode', 2); toggleLayout(2); return false; });
		layoutBtn3.addEventListener('click', function () { saveSetting('layoutMode', 3); toggleLayout(3); return false; });

		helpBtn.addEventListener('click', function () {
			helpModal.classList.toggle('is-modal-visible');
			return false;
		});

		codepenBtn.addEventListener('click', function (e) {
			var json = {
				title: 'A Web Maker experiment',
				html: editur.cm.html.getValue(),
				css: editur.cm.css.getValue(),
				js: editur.cm.js.getValue()
			};
			json = JSON.stringify(json)
				.replace(/"/g, "&​quot;")
				.replace(/'/g, "&apos;")
			codepenForm.querySelector('input').value = json;
			codepenForm.submit();
			e.preventDefault();
		});

		saveHtmlBtn.addEventListener('click', function (e) {
			var html = editur.cm.html.getValue();
			var css = editur.cm.css.getValue();
			var js = editur.cm.js.getValue();

			var fileContent = '<html><head>\n<style>\n'
				+ css + '\n</style>\n</head>\n<body>\n'
				+ html + '\n<script>\n' + js + '\n</script>\n\n</body>\n</html>';

			var d = new Date();
			var fileName = [ 'web-maker', d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() ].join('-');
			fileName += '.html';

			var a = document.createElement('a');
			var blob = new Blob([ fileContent ], {type : "text/html;charset=UTF-8"});
			a.href = window.URL.createObjectURL(blob);
			a.download = fileName;
			a.style.display = 'none';
			document.body.appendChild(a);
			a.click();
			a.remove();
		});

		window.addEventListener('click', function(e) {
			if (typeof e.target.className === 'string' && e.target.className.indexOf('modal-overlay') !== -1) {
				e.target.previousElementSibling.classList.toggle('is-modal-visible');
			}
		});

		settingsBtn.addEventListener('click', function(e) {
			if (!chrome.runtime.openOptionsPage) {
				// New way to open options pages, if supported (Chrome 42+).
				// Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=601997
				// Until this bug fixes, use the
				// fallback.
				chrome.runtime.openOptionsPage();
			} else {
				// Fallback.
				chrome.tabs.create({
					url: 'chrome://extensions?options=' + chrome.i18n.getMessage('@@extension_id')
				});
			}
			return false;
		});
        
        
        var collapser= (function() {
            
        //function to check if only one button of the all is is 'ticked'
            
            function onlyOneIsTicked() {
                var count= 0;
                collapseBtns.forEach(function(collapseBtn) {
                    if(collapseBtn.classList.contains("ticked")) {
                        count += 1;
                    }
                });
                
                return count === 1;
            }
            
            
            function manageCollapse(isTicked, pane) {
                var classAction= isTicked ? "remove": "add",
                    paneType= pane.id.substr(-4),
                    codeSide= $("#js-code-side"),
                    demoSide= $("#js-demo-side"),
                    dimension= currentLayoutMode === 2 ? "height" : "width"; //current main dimension of codeSide & demoSide
                
                  removeGutters();
           
                //handle classes for only '.code-wrap's
                
                if(paneType === "code") {
                    if(classAction === "remove") {
                        pane.classList.contains("is-collapsed") ? pane.classList[classAction]("is-collapsed"): "";
                    } else {
                        !(pane.classList.contains("is-collapsed")) ? pane.classList[classAction]("is-collapsed"): "";
                    }
                    
                }
                
                
                //store left code panes ('.code-wrap's)
                var leftCodePanes= (function() {
                        var codePanes= [].slice.call($all(".code-wrap")),
                            codePanesIds= [];
                        
                     codePanes.forEach(function(codePane) {
                         if(!codePane.classList.contains("is-collapsed")) {
                             codePanesIds.push("#"+ codePane.id);
                         }   
                     });
                    
                        return codePanesIds.length === 0 ? null: codePanesIds;
                    
                    })();
                
                    //if code panes are available, perform a split b/w them otherwise collapse "#js-code-side"
                
                    if(leftCodePanes){
                        
                        if(codeSide.classList.contains("is-collapsed")) {
                            codeSide.justUncollapsed= true;
                            codeSide.classList.remove("is-collapsed");
                        } else {
                            codeSide.justUncollapsed= false;
                        }
                        
                        Split(leftCodePanes, {
                            direction: (currentLayoutMode === 2 ? 'horizontal' : 'vertical')
                        });
                        
                    } else {
                        
                        demoSide.style[dimension]= "100%";
                        codeSide.classList.add("is-collapsed");
                        codeSide.style[dimension]= 0;
                    }
                
                if(paneType === "side") {
                    
                    //if unticked, collapse "#js-demo-side" else perform split with together "#js-code-side"
                    
                    if(!isTicked) {
                        demoSide.classList.add("is-collapsed");
                        demoSide.style[dimension]= "0";
                        codeSide.style[dimension]= "100%";
                    } else {
                        
                           //split if "#js-code-side" is not collapsed
                        if(!codeSide.classList.contains("is-collapsed")) {
                            demoSide.classList.remove("is-collapsed");
                           Split(["#js-code-side", "#js-demo-side"], {
                                direction: (currentLayoutMode === 2 ? 'vertical' : 'horizontal')
                            });
                        }
                        
                    }
                    
                } else {
                    
                    
                    //capture the sizes of codeSide's & demoSide's main dimension before performing the split
                      var codeSideSize= getComputedStyle(codeSide)[dimension],
                          demoSideSize= getComputedStyle(demoSide)[dimension];
            
              //split iff "#js-demo-sode" is not collapsed
                     if(!demoSide.classList.contains("is-collapsed") && leftCodePanes) {
                        Split(["#js-code-side", "#js-demo-side"], {
                            direction: (currentLayoutMode === 2 ? 'vertical' : 'horizontal')
                        });
                       }
                    
                    /**restore the sizes if "#js-code-side" hasn't been 'just uncollapsed' in order to overwrite Split's
                    **behaviour of splitting into two halves                          
                    **/
                    if(!codeSide.justUncollapsed) {
                          codeSide.style[dimension]= codeSideSize;
                          demoSide.style[dimension]= demoSideSize;
                    }
                }
                
            }
            
            function handleCollapse() {
                   var pane= $("#" + this.getAttribute("data-pane")),
                       self= this;
                   var isTicked= (function() {
                       
                       if(self.classList.contains("ticked") && !onlyOneIsTicked()) {
                           self.classList.remove("ticked");
                           return false;
                       } else {
                           self.classList.add("ticked");
                           return true;
                       }
                       
                   })();
                
                   
                   manageCollapse(isTicked, pane);
                   
               }
            
       
        collapseBtns.forEach(function(collapseBtn, index, array) {
               collapseBtn.addEventListener("click", handleCollapse, false); 
        });
            
    /**corresponding behviour of the one that occurs on clicking ".btn-collapse"(s) with digit keys
    **USAGE: ALT+ (1 || 2 || 3 || 4)
    **/
            
            document.addEventListener("keydown", function(e) {
                var collapseBtns= $all(".btn-collapse"),
                    btnIndex= parseInt(e.key)-1;
                
                if(e.altKey) {
                    handleCollapse.call(collapseBtns[btnIndex]);
                }
                
            }, false);
            
        })();
        
        
        optionBtns.forEach(function(optionBtn) {
           optionBtn.addEventListener("click", function(e) {
               if(e.target.nodeName.toLocaleLowerCase() === "svg" || e.target.nodeName.toLocaleLowerCase() === "path") {
               this.classList.toggle("selected");
               }
           });
        });


		chrome.storage.local.get({
			layoutMode: 1,
            
			code: ''
		}, function localGetCallback(result) {
			toggleLayout(result.layoutMode);
			if (result.code) {
				lastCode = result.code;
			}
		});

		// Get synced `preserveLastCode` setting to get back last code (or not).
		chrome.storage.sync.get({
			preserveLastCode: true
		}, function syncGetCallback(result) {
			if (result.preserveLastCode && lastCode) {
				editur.cm.html.setValue(lastCode.html);
				editur.cm.css.setValue(lastCode.css);
				editur.cm.js.setValue(lastCode.js);
				editur.cm.html.refresh();
				editur.cm.css.refresh();
				editur.cm.js.refresh();
			}
		});
	}

	init();

})();