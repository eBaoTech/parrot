(function (window) {
	var $pt = window.$pt;
	if ($pt == null) {
		$pt = {};
		window.$pt = $pt;
	}

	// exceptions
	/**
	 * component exception
	 * @param code {string} exception code
	 * @param message {string} exception message
	 */
	var ComponentException = function (code, message) {
		this.value = code;
		this.message = message;
		this.toString = function () {
			return this.value + ": " + this.message;
		};
	};

	/**
	 * create component exception
	 * @param code {string} exception code
	 * @param message {string} exception message
	 * @returns {ComponentException}
	 */
	$pt.createComponentException = function (code, message) {
		return new ComponentException(code, message);
	};

	// messages
	var messages = {};
	$pt.messages = messages;
	$pt.defineMessage = function (key, message) {
		if (messages[key] != null) {
			window.console.log('Message[' + key + '=' + messages[key] + '] was replaced by [' + message + ']');
		}
		messages[key] = message;
		return $pt;
	};
	$pt.getMessage = function (key) {
		var message = messages[key];
		return message == null ? null : message;
	};
	// components
	$pt.Components = {};
	$pt.exposeComponents = function(context) {
		Object.keys($pt.Components).forEach(function(component) {
			window[component] = $pt.Components[component];
		});
	};
	// component constants
	$pt.ComponentConstants = {
		// component types
		Text: "text",
		TextArea: 'textarea',
		Select: "select",
		Check: "check",
		ArrayCheck: 'acheck',
		Toggle: 'toggle',
		Radio: "radio",
		Table: {type: "table", label: false, popover: false},
		Tree: {type: "tree", label: false, popover: false},
		SelectTree: "seltree",
		Date: "date",
		Search: "search",
		Button: {type: "button", label: false},
		Tab: {type: 'tab', label: false},
		ArrayTab: {type: 'atab', label: false},
		Panel: {type: 'panel', label: false},
		ArrayPanel: {type: 'apanel', label: false},
		Label: {type: 'label', label: false},
		Form: {type: 'form', label: false},
		ButtonFooter: {type: 'buttonfooter', label: false},
		File: "file",
		Nothing: {type: "nothing", label: false},
		// date format
		Default_Date_Format: "YYYY/MM/DD HH:mm:ss.SSS", // see momentjs
		// exception codes
		Err_Unsupported_Component: "PT-00001",
		Err_Unuspported_Column_Sort: "PT-00002",
		Err_Search_Text_Trigger_Digits_Not_Defined: "PT-00003",
		Err_Tab_Index_Out_Of_Bound: "PT-00004",
		// http status
		Http_Status: {
			"0": "Browser Error",
			"400": "Bad Request",
			"401": "Unauthorized",
			"402": "Payment Required",
			"403": "Forbidden",
			"404": "Not Found",
			"405": "Method Not Allowed",
			"406": "Not Acceptable",
			"407": "Proxy Authentication Required",
			"408": "Request Timeout",
			"409": "Conflict",
			"410": "Gone",
			"411": "Length Required",
			"412": "Precondition Failed",
			"413": "Request Entity Too Large",
			"414": "Request-URI Too Long",
			"415": "Unsupported Media Type",
			"416": "Requested Range Not Satisfiable",
			"417": "Expectation Failed",
			"500": "Internal Server Error",
			"501": "Not Implemented",
			"502": "Bad Gateway",
			"503": "Service Unavailable",
			"504": "Gateway Timeout",
			"505": "HTTP Version Not Supported",
			// customize
			"506": "Application Exception"
		}
	};
	$pt.parseJSON = function(object) {
		if (object == null) {
			return null;
		}
		if (typeof object === 'string') {
			return JSON.parse(object);
		} else {
			return object;
		}
	};

	(function() {
		var matched, userAgent = navigator.userAgent || "";

		// merge jquery.browser here
		var uaMatch = function( ua ) {
			ua = ua.toLowerCase();

			var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
				/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
				/(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
				/(msie) ([\w.]+)/.exec( ua ) ||
				ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
				[];

			return {
				browser: match[ 1 ] || "",
				version: match[ 2 ] || "0"
			};
		};
		matched = uaMatch( userAgent );
		$pt.browser = {};
		if (matched.browser) {
			$pt.browser[matched.browser] = true;
			$pt.browser.version = matched.version;
		}
		if ($pt.browser.webkit) {
			$pt.browser.safari = true;
		}
	}());

	var _context = window;
	$pt.getService = function (context, serviceName) {
		var innerContext = context ? context : _context;
		var innerServiceName = serviceName ? serviceName : '$service';
		if (!innerContext[innerServiceName]) {
			innerContext[innerServiceName] = {};
		}
		return innerContext[innerServiceName];
	};
})(window);
