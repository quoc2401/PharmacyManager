<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository implements IRepository
{
    private $categories;

    public function __construct(Category $categories)
    {
        $this->categories = $categories;
    }

    public function get($param)
    {
        $categories = $this->categories->where(function ($query) use ($param) {
            foreach ($param as $key => $value) {
                if ($key !== 'page' && !empty($value))
                    $query->orWhere($key, 'LIKE', '%' . $value . '%');
            }
        })
            ->paginate(env('PAGE_SIZE'));

        return $categories;
    }

    public function find($id)
    {
        $user = $this->users->find($id);

        return $user;
    }

    public function create($data)
    {
        $user = new Category();
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
        foreach ($users as $u) {
            $this->users->destroy($u["id"]);
        }

        return true;
    }
}
