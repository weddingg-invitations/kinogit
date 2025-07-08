<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

define('TMDB_API_KEY', '1cf50e6248dc270629e802686245c2c8');

// Список ключей для Кинопоиска
$kinopoiskApiKeys = [
    'addf2e7e-78cc-4d22-86aa-b0252044c917',
    'c92f9a94-f068-435f-855b-a5acff019cc5',
    '8c5cddf6-0364-4744-a57b-5d13c7f48063',
    '70e0059c-0587-4549-9cbf-8a9c5c4143f6',
    '2c7d0bf6-864e-4403-a497-85dde3bc1c16',
    '4afdb41e-920d-4f23-bb5b-ff9015206a1b',
    'ca3b0d40-c9dc-4950-b32f-d4e29e560d62',
    'b317ee48-fb96-4de5-9fd6-eb95d9598322',
    '187344d2-c8a5-43e9-82e5-f574f97cc045',
    '970d43b9-5361-4a05-919a-2e53b1c80960'
];

$tmdbId = (int)($_GET['tmdb_id'] ?? 0);

if ($tmdbId <= 0) {
    http_response_code(400);
    die(json_encode(['error' => 'Invalid TMDB ID']));
}

function searchKinopoisk($title, $originalTitle, $year, $apiKeys) {
    $keywords = array_filter([
        urlencode($title),
        urlencode($originalTitle),
        urlencode(str_replace(['\'', '"'], '', $title))
    ]);

    foreach ($apiKeys as $key) {
        foreach ($keywords as $keyword) {
            $url = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=$keyword&page=1";

            $options = [
                'http' => [
                    'header' => "X-API-KEY: $key\r\n",
                    'method' => 'GET',
                    'timeout' => 5
                ]
            ];

            $context = stream_context_create($options);
            $response = @file_get_contents($url, false, $context);
            if (!$response) continue;

            $data = json_decode($response, true);
            foreach ($data['films'] ?? [] as $film) {
                $filmYear = $film['year'] ?? 0;
                if (abs($filmYear - $year) <= 2) {
                    return $film['filmId'];
                }
            }
        }
    }

    return null;
}

try {
    $tmdbUrl = "https://api.themoviedb.org/3/movie/$tmdbId?" .
               "api_key=" . TMDB_API_KEY .
               "&language=ru-RU" .
               "&append_to_response=alternative_titles";

    $tmdbData = json_decode(file_get_contents($tmdbUrl), true);

    if (empty($tmdbData)) {
        throw new Exception('TMDB data not found');
    }

    $title = $tmdbData['title'] ?? '';
    $originalTitle = $tmdbData['original_title'] ?? '';
    $year = substr($tmdbData['release_date'] ?? '', 0, 4) ?: date('Y');

    $kpId = searchKinopoisk($title, $originalTitle, $year, $kinopoiskApiKeys);

    if (!$kpId && !empty($tmdbData['alternative_titles']['titles'])) {
        foreach ($tmdbData['alternative_titles']['titles'] as $alt) {
            $kpId = searchKinopoisk($alt['title'], $originalTitle, $year, $kinopoiskApiKeys);
            if ($kpId) break;
        }
    }

    if ($kpId) {
        echo json_encode([
            'tmdb_id' => $tmdbId,
            'kinopoisk_id' => $kpId,
            'success' => true
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'error' => 'Movie not found on Kinopoisk',
            'details' => [
                'tmdb_title' => $title,
                'original_title' => $originalTitle,
                'year' => $year
            ]
        ]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
