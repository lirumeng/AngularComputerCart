var cartAppMod = angular.module("cartApp",[]);
cartAppMod.controller("cartCtrl",function($scope,$http){
    $scope.limit = 4;  //每次取4组数据
    $scope.index = 0;   //默认0个
    $scope.goods = [];  //声明商品列表空数组
    $scope.more = "加载更多...";

    // 获取数据信息
    $http({
        url:"data/app_data.json",
        method:"GET"
    }).then(function(data){
        if(data.data[$scope.index]!=null){
            for(var i=0;i<4;i++,$scope.index++){
                if(data.data[$scope.index]==null){break;}
                $scope.goods.push(data.data[$scope.index]);
            }
        }
    },function(){});

    //获取焦点图片
    $http({
        url:"data/app_data_img.json",
        method:"GET"
    }).then(function(data){
        $scope.imgs = data.data;
    },function(){});

    // 点击加载更多
    $scope.loadmore = function(){
        $http.get("data/app_data.json").success(function(data){
            if(data[$scope.index] != null){
                for(var i=0;i<$scope.limit;i++,$scope.index++){
                    if(data[$scope.index] == null){
                        break;
                    }
                    $scope.goods.push(data[$scope.index]);
                }
            }
            if(data[$scope.index] == null){
                $scope.more = "没有啦~~(>_<)~~";
            }
        });
    }

    // 滚动加载更多
    $(window).on("scroll",function(){
        $scope.sh = $(window).scrollTop();
        $scope.wh = $(window).height();
        $scope.dh = $(document).height();
        // console.log($scope.sh);
        // console.log($scope.wh);
        // console.log($scope.dh);

        requestAnimationFrame(function(){
            if($scope.sh+$scope.wh >= $scope.dh){
                // setTimeout(function(){
                    $http.get("data/app_data.json").success(function(data){
                        if(data[$scope.index] != null){
                            // setTimeout(function(){
                            for(var i=0;i<$scope.limit;i++,$scope.index++){
                                if(data[$scope.index] == null){
                                    break;
                                }
                                $scope.goods.push(data[$scope.index]);
                            }
                            // }, 3000);
                        }
                        if(data[$scope.index] == null){
                            $scope.more = "没有啦~~(>_<)~~";
                        }
                    });
                // }, 3000); 
            }
        });
    });

    // 购物车列表 购物车需要 商品图片 数量 单价
    $scope.cart = {};
    $scope.total = 0;

    //购买商品
    $scope.buy = function(i){
        var gid = $scope.goods[i].gid;

        if($scope.cart[gid]==null){
            $scope.cart[gid] = {
                // "gid":$scope.goods[i].gid,
                "gid":gid,
                "name":$scope.goods[i].name,
                "price":$scope.goods[i].price,
                "desc":$scope.goods[i].desc,
                "num":1,
                "img":$scope.goods[i].img
            };
        }else{
            $scope.cart[gid].num ++;
        }
    }


    //购物车商品加1
    $scope.jia = function(i){
        $scope.cart[i].num ++;
    };
    //购物车商品减1
    $scope.jian = function(i){
        if($scope.cart[i].num<1){
            return ;
        }
        $scope.cart[i].num --;
        
    };

    $scope.$watch("cart",function(){
        var tnum = 0;   //总计数量
        var total = 0;  //总计金额
        for(var i in $scope.cart){
            total += $scope.cart[i].num*$scope.cart[i].price;
            tnum += $scope.cart[i].num; 
        }
        $scope.total = total;
        $scope.tnum = tnum;
    },true);


    //结算
    $scope.settle = function(){
        if($scope.tnum==0){
            alert("购物车空啦赶紧去添加吧O(∩_∩)O~");
            return false;
        }else{
            var conf = confirm("要结算么O(∩_∩)O？");
            if(conf == true){
                alert("结算总金额：￥"+($scope.total).toFixed(2));
            }
        }
    }

    // 购物车 单项删除事件
    $scope.del = function(i){
        delete $scope.cart[i];
    }

    // 清空购物车
    $scope.delAll = function(){
        if($scope.tnum==0)   {
            alert("还什么都没有呢(>_<)~");
            return false;
        }else{
            var r = confirm("确定清空我么？");
            if(r == true){
                $scope.cart = {};
            }
        }
    }
    
});