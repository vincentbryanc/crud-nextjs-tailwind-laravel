<?php

use App\Http\Controllers\TodosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/todos', [TodosController::class, 'index'])->name('todos');
Route::get('/todo/{id}', [TodosController::class, 'show'])->name('todo.show');
Route::post('/todo', [TodosController::class, 'store'])->name('todo.store');
Route::put('/todo/{id}', [TodosController::class, 'update'])->name('todo.update');
Route::put('/todo/update-status/{id}', [TodosController::class, 'updateStatus'])->name('todo.update-status');
Route::delete('/todo/{id}', [TodosController::class, 'destroy'])->name('todo.destroy');
