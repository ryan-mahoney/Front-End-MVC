<?php
include __DIR__ . '/../vendor/autoload.php';

$app = new \Slim\Slim();

$app->get('/', function () {
    include __DIR__ . '/layouts/index.html';
});

$app->group('/api', function() use ($app) {
	$app->get('/blogs', function () use ($app) {
		$app->contentType('application/json;charset=utf-8');
		echo json_encode([
			'blogs' => [
				['id' => 1, 'title' => 'Blog Post A'],
				['id' => 2, 'title' => 'Blog Post B']
			]
		]);
	});
});
$app->run();