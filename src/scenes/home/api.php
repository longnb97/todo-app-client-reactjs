<?php

use Illuminate\Http\Request;

Route::get('/index', function () {
    return '<h1>To-do Webservice Api</h1>';
});

Route::group([
    'middleware' => ['cors'],
    'prefix' => 'auth'
], function () {
    Route::post('/test', 'AuthController@loginTest');
    Route::post('/login', 'AuthController@handleLogin');
    Route::get('/check_auth', 'AuthController@me'); // checkout
});

Route::group([
    'middleware' => [ 'cors' , 'jwt.auth'],
    'prefix' => 'accounts'
], function () {
    Route::post('/signup', 'AccountController@createAccount');
    Route::get('/', 'AccountController@getAllAccounts');
    Route::get('/{id}', 'AccountController@getAccountById');
    Route::delete('/{id}', 'AccountController@deleteAccountById');
});

Route::group([
    'middleware' => ['cors'],
    'prefix' => 'projects'
], function () {
    Route::get('/', 'ProjectController@getAllProjects');
    Route::post('/', 'ProjectController@createProject');
    Route::get('/all_projects/user/{userId}', 'ProjectController@getAccountAllProjects');
    Route::get('/{id}', 'ProjectController@getProjectById');
    Route::put('/{id}', 'ProjectController@changeProjectProperties');
    Route::delete('/{id}', 'ProjectController@deleteProjectById');
});


Route::group([
    'middleware' => ['jwt.auth'],
    'prefix' => 'tasks'
], function () {
    Route::get('/', 'TaskController@getAllTasks');
    Route::post('/', 'TaskController@createTask');
    Route::get('/project/{projectId}', 'TaskController@getProjectAllTasks');
    Route::get('/{taskId}', 'TaskController@getTaskById');
    Route::put('/{taskId}', 'TaskController@changeTaskProperties');
    Route::delete('/{taskId}', 'TaskController@deleteTaskById');
});

Route::group([
    'middleware' => ['jwt.auth'],
    'prefix' => 'comments'
], function () {
    Route::get('/', 'CommentController@getAllComments');
    Route::post('/', 'CommentController@createTaskComment');
    Route::get('/all_comments/task/{taskId}', 'CommentController@getTaskAllComments');
    Route::get('/all_comments/user/{userId}', 'CommentController@getAccountAllComments');
    Route::get('/{id}', 'CommentController@getCommentById');
    Route::put('/{id}', 'CommentController@changeCommentProperties');
    Route::delete('/{id}', 'CommentController@deleteCommentById');
});



//// quandev

Route::group([
    'middleware' => ['jwt.auth'],
    'prefix' => 'task-participants'
], function () {
    Route::get('/', 'TaskParticipantsController@getAllTaskParticipants');
    Route::post('/', 'TaskParticipantsController@createTaskParticipants');
    Route::get('/task-filter/{projectId}', 'TaskParticipantsController@getTaskParticipantsByTaskId');
    Route::get('/project-filter/{projectId}', 'TaskParticipantsController@getTaskParticipantsByTaskId');
    Route::get('/{taskId}', 'TaskParticipantsController@getTaskById');
    Route::put('/{taskId}', 'TaskParticipantsController@changeTaskProperties');
    Route::delete('/{taskId}', 'TaskParticipantsController@deleteTaskById');
});
