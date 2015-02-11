angular.module('projectsManager', [])
    .factory('projectsManager', ['$http','$q', function($http, $q) {
        var projectsManager = {},
        projects            = [],
        currentProject      = {};

        var setCurrentProject = function (project) {
            project.active = true;
            angular.extend(projectsManager.currentProject, json);
        };

        var updateCurrentProject = function (updatedProject) {
            currentProject.name = updatedProject.name;
            currentProject.url = updatedProject.url;
            currentProject.production = currentProject.description;
        };

        var fetch = function () {
            var defer = $q.defer();
            projects.length = 0;
            $http.get('/projects').then(function (result) {
                angular.forEach(result.data, function (item) {
                    projects.push(item);
                });
                defer.resolve(projects);
            });

            return defer.promise
        };

        var createProject = function (project) {
            $http.post('/projects', project).then(function (result) {
                angular.forEach(result.data, function (item) {
                    projects.push(item);
                });

                $rootScope.cancel();
            });
        }



        angular.extend(projectsManager, {
            projects: projects,
            currentProject : currentProject,
            //methods
            setCurrentProject: setCurrentProject,
            updateCurrentProject: updateCurrentProject,
            fetch : fetch,
            createProject : createProject
        });

        return projectsManager;
}]);