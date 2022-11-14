<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;

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


//User api routes
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::patch('/users/delete', [UserController::class, 'patchDelete']);

//Auth api routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});


//Medicine api routes
Route::get('/medicines', [MedicineController::class, 'index']);
Route::get('/medicines/{id}', [MedicineController::class, 'show'])->where('id', '[0-9]+');
Route::post('/medicines', [MedicineController::class, 'store']);
Route::put('/medicines/{id}', [MedicineController::class, 'update']);
Route::delete('/medicines/{id}', [MedicineController::class, 'destroy']);
Route::patch('/medicines/delete', [MedicineController::class, 'patchDelete']);
Route::get('/medicines/stock-count', [MedicineController::class, 'stockCount']);
Route::get('/medicines/recent-sale', [MedicineController::class, 'recentSale']);

//Category api routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::patch('/categories/delete', [CategoryController::class, 'patchDelete']);

//Order api routes
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/count',[OrderController::class, 'count']);

//Order details api routes
Route::get('/order-details', [OrderDetailController::class, 'index']);
Route::get('/order-details/revenue', [OrderDetailController::class, 'revenue']);
Route::get('/order-details/revenue-monthly/{year}', [OrderDetailController::class, 'revenueMonthly'])
    ->where('year', '[0-9]+');
Route::get('/order-details/count-sale', [OrderDetailController::class, 'countSale']);
Route::get('/order-details/count-sale-monthly/{year}', [OrderDetailController::class, 'countSaleMonthly'])
    ->where('year', '[0-9]+');
