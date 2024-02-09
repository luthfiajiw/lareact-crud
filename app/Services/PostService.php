<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

interface PostService {
  function getPosts(int $per_page): LengthAwarePaginator;
  function getPost(string $id): Post;
  function addPost(array $data, User $user);
  function updatePost(array $data, string $id);
}