<?php 

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserRepository implements IRepository{
    private $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }

    public function get($param) {
        
        $users = $this->users->where(function($query) use($param) {
                foreach($param as $key=>$value) {

                    $query->orWhere($key, 'LIKE', '%'.$value.'%');
                }
            })
            ->paginate(env('PAGE_SIZE'));
        
        return $users;
    }

    public function find($id) {
        $user = $this->users->find($id);

        return $user;
    }

    public function create($data) {
        $user = new User();
        $user->fill($data);
        $user->save();

        return $user;
    }

    public function update($id, $data) {
        $user = $this->users->find($id);
        $user->update($data);
        $user->save();

        return $user;
    }

    public function delete($id) {
        $user = $this->users->find($id);
        if ($user == null)
            return true;
        $user->delete();
        
        return true;
    }
}
?>