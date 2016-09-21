(function () {
    'use strict';

    angular
        .module('app')
        .controller('CrudController', CrudController);

    CrudController.$inject = ['UserService', '$rootScope'];
    function CrudController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        function updateUser(user) {
            UserService.Update(user)
            .then(function() {
                loadAllUsers();
            });
        }
    }

})();