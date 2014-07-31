<?php
include __DIR__ . '/../vendor/autoload.php';

$data = json_decode(file_get_contents(__DIR__ . '/../data/blogs.json'), true);

$app = new \Slim\Slim();

$app->get('/', function () {
    include __DIR__ . '/layouts/index.html';
});

$app->group('/api', function() use ($app, $data) {
    $app->get('/blogs', function () use ($app, $data) {
        echo json_encode([
            'blogs' => $data
        ]);
    });

    $app->get('/blog/:id', function ($id) use ($app, $data) {
        foreach ($data as $blog) {
            if ($blog['id'] == $id) {
                echo json_encode($blog);
                return;
            }
        }
        $app->response->setStatus(503);
    });

    $app->put('/blog/:id', function ($id) use ($data, $app) {
        sleep(2);
        $put = json_decode($app->request()->getBody(), true);
        foreach ($data as &$blog) {
            if ($blog['id'] == $id) {
                $blog = $put;
                file_put_contents(__DIR__ . '/../data/blogs.json', json_encode($data));
                echo json_encode($put);
                return;
            }
        }
    });

    $app->post('/blog', function () use ($data, $app) {
        sleep(2);
        $post = json_decode($app->request()->getBody(), true);
        $post['id'] = uniqid();
        $data[] = $post;
        file_put_contents(__DIR__ . '/../data/blogs.json', json_encode($data));
        echo json_encode($post);
    });
});

$app->hook('slim.before', function () use ($app) {
    if (substr($_SERVER['REQUEST_URI'], 0, 5) == '/api/') {
        $app->contentType('application/json;charset=utf-8');
    }
});

$app->run();