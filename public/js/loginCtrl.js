
loginApp.controller('loginCtrl',['$scope','$http',($scope,$http) => {


    $scope.login= () =>
    {
        $http.post('/api/login', {email:$scope.email , password:$scope.password}).then(r => {
            $scope.user = r.data;
            console.log(r.session)
        }, e => {
            $scope.errorMessage = e.data.message;
        });
    }
//change password function will send a request to server with the new
//password
	$scope.chngePassword = (newPassword) => {
		$http.post('/api/changePassword', {newPassword:newPassword}).then(res =>{
			$scope.user = res.data;
			$scope.newPasswordMode = false;
			console.log('password chnged',res.data);
		}, err => {
			console.log('you can not change the password',err);
		})

	}



//show and hide change password button
	$scope.showpasswordChanger = () => {
		$scope.newPasswordMode = true;
	}
	$scope.showemailChanger = () =>{
		$scope.newEmailMode = true;
	}
}]);
