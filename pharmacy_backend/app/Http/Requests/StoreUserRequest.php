<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

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
            'user.password' => 'required',
            'user.first_name' => 'required|alpha',
            'user.last_name' => 'required|alpha',
            'user.phone' => 'required|numeric',
            'user.birth_date' => 'required|date'
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
