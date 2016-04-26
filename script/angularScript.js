var toDoModule = angular.module("ToDo", [])
        toDoModule.controller("ToDoController", ['$scope', '$filter', function ($scope, $filter) {
            $scope.toDo = [{ name: "Learn ECMAScript", state: true}];
            $scope.editBoxState = true;
            $scope.displayMsg = true;
            $scope.addTask = function () {
                if (!$scope.task) { return; }
                else {
                    $scope.displayMsg = true;
                    if ($filter('getIndexByName')($scope.toDo, $scope.task)) {
                        $scope.message = "Item is already in the list";
                        $scope.displayMsg = false;
                    } else {
                        $scope.toDo.push({ name: $scope.task, state: false });
                        $scope.task = '';
                    }
                }
            };

            $scope.removeTask = function (indx) {
                var item = $scope.toDo[indx].name;
                $scope.toDo.splice(indx, 1);
                $scope.message = "Removed item [" + item + "] successfully.";
                $scope.displayMsg = false;
            };

            $scope.updateTask = function (indx) {
                $scope.display = true;
                $scope.updateValue = $scope.toDo[indx].name;
                //$scope.updateValue = '';
                //$scope.editBoxState = true;
            };

            $scope.editBox = function () {
                $scope.editBoxState = false;
                $scope.displayMSg = true;
            };

            $scope.remaining = function () {
                var count = 0;
                angular.forEach($scope.toDo, function (todo) {
                    count += todo.state ? 1 : 0;
                });
                return count;
            };
        } ]);
        toDoModule.filter("getIndexByName", function () {
            return function (obj, value) {
                var i = 0;
                var len = obj.length;
                for (; i < len; i++) {
                    if (obj[i].name === value)
                        return true;
                }
                return false;
            }
        });