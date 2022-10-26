<?php 

namespace App\Services;

use Illuminate\Http\Request;

interface IService {
    public function get(Request $request);

    public function find($id);

    public function create(Request $request);

    public function update($id, Request $request);

    public function delete($id);
}

?>