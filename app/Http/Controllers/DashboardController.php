<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request) : Response
    {
        $posts = Post::with(['user' => function ($query) {
            $query->select('id', 'name', 'email');
        }])->select('id', 'title', 'user_id')->paginate($request->per_page ?? 10);

        $posts = $posts->withQueryString();

        $path = $request->path();

        return Inertia::render('Dashboard', [
            // ALWAYS included on first visit...
            // OPTIONALLY included on partial reloads...
            // ONLY evaluated when needed...
            'posts' => fn () => $posts,
            // NEVER included on first visit...
            // OPTIONALLY included on partial reloads...
            // ONLY evaluated when needed...
            'create' => Inertia::lazy(fn () => $path === 'dashboard/create')
        ]);
    }

    public function store(PostRequest $request)
    {
        $data = $request->validated();
        $user = $request->user();
        
        $post = new Post();
        $post->title = $data["title"];
        $post->slug = str($data["title"])->slug('-');
        $post->description = $data["description"];
        $post->user_id = $user["id"];
        $post->save();
    }
}
