<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class JWTAuthorization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $token = JWTAuth::getToken();
        try {
            $user = JWTAuth::authenticate($token);
        } catch (TokenExpiredException $e) {
            return response()->json([
                'status' => 'expired',
                'message' => 'Token Expired',
            ], 500);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'message' => 'Token Invalid',
            ], 500);
        } catch (JWTException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

        if ($user && in_array($user->user_role, $roles))
            return $next($request);

        return response()->json([
            'message' => 'You are unauthorized to access this resource',
        ], 401);
    }
}
