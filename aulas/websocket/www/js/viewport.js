angular.module('viewport',[]).directive('viewport', function(){
    function link($scope,element,attr){
        var width= window.orientation == 0 ? window.screen.width : window.screen.height;
        var larguraDesejada = parseInt(attr.largura); 
        var scala = width/larguraDesejada;
        $scope.content="user-scalable=no, initial-scale="+scala+", maximum-scale=2, minimum-scale="+scala+", width=device-width";

        function changeOrientation(){
          width = window.orientation==0 ? window.screen.width : window.screen.height;
          scala = width/larguraDesejada;
          $scope.content="user-scalable=no, initial-scale="+scala+", maximum-scale=2, minimum-scale="+scala+", width=device-width";
          $scope.$apply();
        }

        window.addEventListener('orientationchange',changeOrientation);
    }
    
    return {
        link:link, 
        replace:true,
        template:'<meta name="viewport" content="{{ content }}">'
        }
})


