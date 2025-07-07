<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

define('TMDB_API_KEY', '1cf50e6248dc270629e802686245c2c8');
define('KP_API_KEY', 'addf2e7e-78cc-4d22-86aa-b0252044c917');

$tmdbId = (int)($_GET['tmdb_id'] ?? 0);

if ($tmdbId <= 0) {
    http_response_code(400);
    die(json_encode(['error' => 'Invalid TMDB ID']));
}

function searchKinopoisk($title, $originalTitle, $year) {
    $keywords = [
        urlencode($title),
        urlencode($originalTitle),
        urlencode(str_replace(['\'', '"'], '', $title))
    ];
    
    foreach ($keywords as $keyword) {
        $url = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=$keyword&page=1";
        
        $options = [
            'http' => [
                'header' => "X-API-KEY: ".KP_API_KEY."\r\n",
                'method' => 'GET'
            ]
        ];
        
        $response = @file_get_contents($url, false, stream_context_create($options));
        if (!$response) continue;
        
        $data = json_decode($response, true);
        
        foreach ($data['films'] ?? [] as $film) {
            $filmYear = $film['year'] ?? 0;
            if (abs($filmYear - $year) <= 2) {
                return $film['filmId'];
            }
        }
    }
    
    return null;
}

try {
    // Получаем расширенные данные из TMDB
    $tmdbUrl = "https://api.themoviedb.org/3/movie/$tmdbId?".
               "api_key=".TMDB_API_KEY.
               "&language=ru-RU".
               "&append_to_response=alternative_titles";
    
    $tmdbData = json_decode(file_get_contents($tmdbUrl), true);
    
    if (empty($tmdbData)) {
        throw new Exception('TMDB data not found');
    }
    
    $title = $tmdbData['title'] ?? '';
    $originalTitle = $tmdbData['original_title'] ?? '';
    $year = substr($tmdbData['release_date'] ?? '', 0, 4) ?: date('Y');
    
    // Пробуем разные варианты поиска
    $kpId = searchKinopoisk($title, $originalTitle, $year);
    
    if (!$kpId) {
        // Пробуем английское название
        $kpId = searchKinopoisk($originalTitle, $originalTitle, $year);
    }
    
    if (!$kpId && !empty($tmdbData['alternative_titles']['titles'])) {
        // Пробуем альтернативные названия
        foreach ($tmdbData['alternative_titles']['titles'] as $alt) {
            $kpId = searchKinopoisk($alt['title'], $originalTitle, $year);
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
    echo json_encode(['error' => 'Server error: '.$e->getMessage()]);
}
