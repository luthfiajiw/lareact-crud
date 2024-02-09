<?php

namespace App\Services\Impl;

use App\Models\Post;
use App\Models\User;
use App\Services\PostService;
use Illuminate\Pagination\LengthAwarePaginator;

class PostServiceImpl implements PostService {
  public function getPosts(int $per_page): LengthAwarePaginator
  {
    $posts = Post::with(['user' => function ($query) {
      $query->select('id', 'name', 'email');
    }])->select('id', 'title', 'user_id')->paginate($per_page);

    $posts = $posts->withQueryString();

    return $posts;
  }

  public function getPost(string $id): Post
  {
    return Post::find($id);
  }

  public function addPost(array $data, User $user)
  {
    $post = new Post();
    $post->title = $data["title"];
    $post->slug = str($data["title"])->slug('-');
    $post->description = $data["description"];
    $post->user_id = $user["id"];
    $post->save();
  }

  public function updatePost(array $data, string $id)
  {
    $post = Post::find($id);
    $post->title = $data["title"];
    $post->slug = str($data["title"])->slug('-');
    $post->description = $data["description"];
    $post->save();
  }
}