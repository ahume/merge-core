// --------------------------------- dom.js -------------------------------------------

ensurePackage('guardian.r2');

guardian.r2.dom = {
	
	element : new function () {
		var instance = this;
		
		function hasClassNameFunction(className) {
			var classNameRegExp = new RegExp('(^| )' + className + '( |$)');
			return function (inputElement) {
				return classNameRegExp.test(inputElement.className);
			};
		}

		this.hasClassName = function (inputElement, className) {
			return hasClassNameFunction(className)(inputElement);
		};
		
		this.addClassName = function (inputElement, className) {
			if (!instance.hasClassName(inputElement, className)) {
				inputElement.className += ' ' + className;
				inputElement.className = inputElement.className.replace(/^\s|\s$/, '');
			}
		}
		
		this.getElementsByCssSelector = function (cssExpression, parentElement) {
			
			if (isArray(cssExpression)) {
				var results = [];
				var cssExpressionLength = cssExpression.length;
				for (var i = 0; i < cssExpressionLength; i++) {
					results = results.concat(getElementsByIndividualCssSelector(cssExpression[i], parentElement));
				}
				return results;
			}
			return getElementsByIndividualCssSelector(cssExpression, parentElement);
			
		};

		var getElementsByIndividualCssSelector = function (cssExpression, parentElement) {
			var cssParts = cssExpression.split(' ');
			var firstTagAndClassNamePair = cssParts[0];
			var moreTagAndClassNamePairs = cssParts.slice(1).join(' ');
			
			// extract tag and classname
			var firstTagAndClassNamePairSplit = firstTagAndClassNamePair.split('.'); 
			var tagType = firstTagAndClassNamePairSplit[0];
			var className = firstTagAndClassNamePairSplit[1];
			
			var selectedElements = instance.getElementsByClassName(className, tagType, parentElement);

			if (moreTagAndClassNamePairs) { // If this exists, then we want to process the child elements
				var matchingElementList = [];
				var selectedElementsLength = selectedElements.length;
				var getElementsByCssSelector = instance.getElementsByCssSelector;
				for (var i = 0; i < selectedElementsLength; i++) {
					// recurse
					matchingElementList = matchingElementList.concat(getElementsByCssSelector(moreTagAndClassNamePairs, selectedElements[i]));
				}
				return matchingElementList; //This produces the final result.
			}
			return selectedElements;
		};

		this.getElementsByClassName = function(className, tagType, parentElement) {
		
			parentElement = parentElement ? parentElement : document;
			className = className ? className : null;
			
			if (!!document.evaluate && className) {
				var expression;
				if (tagType) {
					expression = ".//" + tagType + "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
				} else {
					expression = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
				}
				var query = document.evaluate(expression, parentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				
				var results = [];
				for (var i = 0, length = query.snapshotLength; i < length; i++) {
					results.push(query.snapshotItem(i));
				}
				
				return results;
			}

			tagType = tagType ? tagType : '*';

			var matchingTags = parentElement.getElementsByTagName(tagType);
			if (className) {
				var matchingElements = [];
				var matchingTagsLength = matchingTags.length;
				var elementHasSuppliedClassName = hasClassNameFunction(className);
				for (var  i = 0; i < matchingTagsLength; i++) {
					if (elementHasSuppliedClassName(matchingTags[i])) {
						matchingElements.push(matchingTags[i])
					}
				}
				return matchingElements;
			}
			return convertNodeListToArray(matchingTags);

		};
		
		var convertNodeListToArray = function (listLikeObject) {
			var currentPlace = listLikeObject.length;
			var results = [];
			while (currentPlace--) {
			    results[currentPlace] = listLikeObject[currentPlace];
			}
			return results;
		}
	},
	
	form : new function () {
		var instance = this;
		var inputTags = ['input', 'textarea', 'select'];
		this.serializeForm = function (domForm) {
			var serializedFields = [];
			for (var i = 0; i <inputTags.length; i++) {
				var fields = domForm.getElementsByTagName(inputTags[i]);
				for (var j = 0; j < fields.length; j++) {
					var field = fields[j];
					if (!field.disabled && field.name) {
						serializedFields.push(instance.serialize(field));
					}
				}
			}
			var formAction = domForm.action;
			return serializedFields.join('&');
		};
		
		this.serialize = function (element) {
			var tagType = element.tagName.toLowerCase();
			var elValue = null;
			switch (tagType) {
			case 'textarea':
				elValue = element.value;
				break;
			case 'input':
				switch (element.type.toLowerCase()) {
				case 'radio':
				case 'checkbox':
					elValue = element.checked ? element.value : null;
					break;
				default:
					elValue = element.value;
					break;
				}
				break;
			case 'select':
				var selectedOptions = [];
				for(var k = 0; k < element.options.length; k++){
					if(element.options[k].selected){
						selectedOptions.push(element.options[k].value ? element.options[k].value : element.options[k].text);
						if(!element.multiple) {
							break;
						}
					}
				}
				if (selectedOptions.length > 0) {
					elValue = selectedOptions.join(',');
				}
			}				
			
			if(elValue !== null){
				return encodeURIComponent(element.name) + "=" + encodeURIComponent(elValue);
			}
			
		}
	}
}
