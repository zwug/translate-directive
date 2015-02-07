angular.module('anticafe').factory('$translator', () => {
    var translations = {
        'en':{
            'hi':'hello, {{user}}',
            'name': 'zwug'
        }
    };

    var locale = 'en';
    return {
        translate(id, context = {}) {
            var dictionary = translations[locale] || {};
            var translation = dictionary[id] || '';

            return translation;
        },
        addDictionary(locale, translations) {
            translations[locale] = translations;
        }
    };
});

angular.module('anticafe').directive('ngTranslate', ['$translator', '$interpolate', ($translator, $interpolate) => {
    return {
        restrict: 'A',
        scope: {
            id: '@ngTranslate',
            context: '=ngTranslateContext'
        },
        link($scope, $element) {
            $scope.$watch('context', function (context) {

                var toTranslate = $translator.translate($scope.id, context || {});
                $element.text($interpolate(toTranslate)({user:$translator.translate('name', {})}));
            });
        }
    };
}]);
