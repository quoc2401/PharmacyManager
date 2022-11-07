<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository implements IRepository
{
    private $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function get($param)
    {
        $users = $this->users->where(function ($query) use ($param) {
            foreach ($param as $key => $value) {
                if ($key !== 'page' && !empty($value))
                    $query->orWhere($key, 'LIKE', '%' . $value . '%');
            }
        })
            ->paginate(env('PAGE_SIZE'));

        return $users;
    }

    public function find($id)
    {
        $user = $this->users->find($id);

        return $user;
    }

    public function create($data)
    {
        $user = new User();
        $user->fill($data);
        $user->save();

        return $user;
    }

    public function update($id, $data)
    {
        $user = $this->users->find($id);
        $user->update($data);
        $user->save();

        return $user;
    }

    public function delete($id)
    {
        $this->users->destroy($id);
        // if ($user == null)
        //     return true;
        // $user->delete();

        return true;
    }

    public function patchDelete($users)
    {   
        DB::transaction(function() use($users) {
            foreach ($users as $u) {
                $this->users->destroy($u["id"]);
            }
    
            return true;
        });
    }
}
