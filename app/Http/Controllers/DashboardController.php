<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with(['user' => function ($query) {
            $query->select('id', 'name', 'email');
        }])->select('id', 'title', 'user_id')->paginate($request->perPage ?? 10);

        $posts->appends([
            'page' => $request->page ?? 1,
            'perPage' => $request->perPage ?? 10
        ])->links();

        return Inertia::render('Dashboard', [
            'posts' => $posts
        ]);
    }
}
