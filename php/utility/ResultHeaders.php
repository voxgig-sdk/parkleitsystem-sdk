<?php
declare(strict_types=1);

// Parkleitsystem SDK utility: result_headers

class ParkleitsystemResultHeaders
{
    public static function call(ParkleitsystemContext $ctx): ?ParkleitsystemResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
