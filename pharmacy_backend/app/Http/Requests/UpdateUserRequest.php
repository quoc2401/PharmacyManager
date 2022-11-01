<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateUserRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user' => 'required|array',
            'user.username' => 'required',
            'user.first_name' => 'required|regex:/^[\pL\s\-]+$/u', //alow letters,hyphens and spaces
            'user.last_name' => 'required|regex:/^[\pL\s\-]+$/u',
            'user.phone' => 'required',
            'user.birth_date' => 'required|date',
            'user.user_role' => 'required'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $res = new Response([
            'errors' => $validator->errors()
        ], Response::HTTP_UNPROCESSABLE_ENTITY);

        throw (new ValidationException($validator, $res));
    }
}
