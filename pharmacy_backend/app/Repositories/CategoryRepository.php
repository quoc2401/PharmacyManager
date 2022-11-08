<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Support\Facades\Log;

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
                if ($key !== 'page' && !empty($value)) {
                    $query->orWhere($key, 'LIKE', '%' . $value . '%');
                }
            }
        })->paginate(env('PAGE_SIZE'));

        return $categories;
    }

    public function find($id)
    {
        $user = $this->users->find($id);

        return $user;
    }

    public function create($data)
    {
        $category = new Category();
        $category->fill($data);
        $category->save();

        return $category;
    }

    public function update($id, $data)
    {
        $category = $this->categories->find($id);
        $category->update($data);
        $category->save();

        return $category;
    }

    public function delete($id)
    {
        $this->categories->destroy($id);

        return true;
    }

    public function patchDelete($categories)
    {
        foreach ($categories as $c) {
            $this->categories->destroy($c["id"]);
        }

        return true;
    }
}
