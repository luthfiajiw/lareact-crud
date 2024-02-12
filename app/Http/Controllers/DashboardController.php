<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private PostService $postService;

    public function __construct(PostService $postService) {
        $this->postService = $postService;
    }

    public function index(Request $request, ?string $id = null) : Response
    {
        $path = $request->path();

        return Inertia::render('Dashboard', [
            'posts' => fn () => $this->postService->getPosts($request->per_page ?? 10),
            'post' => Inertia::lazy(fn () => $this->postService->getPost($id)),
            'openForm' => Inertia::lazy(fn () => $path === 'dashboard/create' || $path === "dashboard/edit/$id"),
            'confirmDelete' => Inertia::lazy(fn () => $path === "dashboard/delete/$id")
        ]);
    }

    public function store(PostRequest $request)
    {
        $data = $request->validated();
        $user = $request->user();
        
        $this->postService->addPost($data, $user);
    }

    public function update(PostRequest $request, string $id)
    {
        $data = $request->validated();

        $this->postService->updatePost($data, $id);
    }
}
