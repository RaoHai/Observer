angular.module('projectsManager', [])
    .factory('projectsManager', ['$http','$q','$rootScope', function($http, $q, $rootScope) {
        var projectsManager = {},
        projects            = [],
        currentProject      = {};

        var setCurrentProject = function (project) {
            project.active = true;
            angular.extend(projectsManager.currentProject, project);
        };

        var updateCurrentProject = function (updatedProject) {
            currentProject.name = updatedProject.name;
            currentProject.url = updatedProject.url;
            currentProject.production = updatedProject.description;
            
            angular.forEach(projects, function (item) {
                if (item.id == updatedProject.id) {
                    item.name = updatedProject.name;
                    item.url = updatedProject.url;
                    item.production = updatedProject.description;
                }
            });
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

        var updateProject = function (project) {
            return $http.put('/projects/' + project.id, project).then(function (result) {
                updateCurrentProject(result.data);
                $rootScope.$broadcast('project.update');
            });
        };

        var createProject = function (project) {
            return $http.post('/projects', project).then(function (result) {
                angular.forEach(result.data, function (item) {
                    projects.push(item);
                });
                $rootScope.$broadcast('project.created');
            });
        }

        var deleteProject = function (project) {
            return $http.delete('/projects/' + project.id);
        };



        angular.extend(projectsManager, {
            projects: projects,
            currentProject : currentProject,
            //methods
            setCurrentProject: setCurrentProject,
            updateCurrentProject: updateCurrentProject,
            updateProject : updateProject,
            fetch : fetch,
            createProject : createProject,
            deleteProject : deleteProject
        });

        return projectsManager;
}]);