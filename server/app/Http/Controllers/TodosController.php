<?php

namespace App\Http\Controllers;

use App\Models\Todos;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    public function index()
    {
        return Todos::select()->paginate(20);
    }

    public function show($id)
    {
        return Todos::whereId($id)->firstOrFail();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $title = $request->title;
        $description = $request->description;
        $todoData = array(
            'title' => $title,
            'description' => $description,
            'is_completed' => false,
        );
        return Todos::create($todoData);
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $title = $request->title;
        $description = $request->description;
        $todoData = array(
            'title' => $title,
            'description' => $description,
        );
        return Todos::whereId($id)->update($todoData);
    }

    public function updateStatus($id, Request $request)
    {
        $request->validate([
            'is_completed' => 'required|boolean',
        ]);

        $is_completed = $request->is_completed;
        $todoData = array(
            'is_completed' => $is_completed,
        );
        return Todos::whereId($id)->update($todoData);
    }

    public function destroy($id)
    {
        return Todos::whereId($id)->delete();
    }
}
