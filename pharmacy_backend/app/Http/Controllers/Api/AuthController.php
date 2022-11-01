<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth.role:EMPLOYEE,ADMIN', ['except' => ['login']]);
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'user' => Auth::user()
        ], Response::HTTP_OK);

    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'exists:users,username'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Username doesn't exists!"
            ], 401);
        }

        $credentials = $request->only('username', 'password');
        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'message' => 'Password is incorrect!',
            ], 401);
        }

        return $this->createNewToken($token);
    }

    public function userProfile()
    {
        return response()->json(Auth::user());
    }

    public function refresh()
    {
        return $this->createNewToken(Auth::refresh());
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'User successfully log out'
        ], Response::HTTP_OK);
    }
}
