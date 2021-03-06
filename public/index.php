<?php
include __DIR__ . '/../vendor/autoload.php';

$data = json_decode(file_get_contents(__DIR__ . '/../data/blogs.json'), true);
$version = require __DIR__ . '/build/js/version.php';

$app = new \Slim\Slim();

$app->get('/', function () use ($version) {
    ob_start();
    include __DIR__ . '/layouts/index.html';
    echo str_replace('{{JSMVC-VERSION}}', $version, ob_get_clean());
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
        sleep(1);
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
        sleep(1);
        $post = json_decode($app->request()->getBody(), true);
        $post['id'] = uniqid();
        $data[] = $post;
        file_put_contents(__DIR__ . '/../data/blogs.json', json_encode($data));
        echo json_encode($post);
    });

    $app->post('/contact', function () use ($app) {
        sleep(1);
        $post = json_decode($app->request()->getBody(), true);
        $post['id'] = uniqid();
        echo json_encode($post);
    });

    $app->put('/contact/:id', function ($id) use ($app) {
        sleep(1);
        $put = json_decode($app->request()->getBody(), true);
        $put['id'] = uniqid();
        echo json_encode($put);
    });
});

$app->hook('slim.before', function () use ($app) {
    if (substr($_SERVER['REQUEST_URI'], 0, 5) == '/api/') {
        $app->contentType('application/json;charset=utf-8');
    }
});

$app->run();