<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user' => function ($query) {
            $query->select('id', 'name', 'email');
        }])->select('id', 'title', 'description', 'user_id')->paginate(10);
        
        return Inertia::render('Dashboard', [
            'posts' => $posts
        ]);
    }
}
