<?php
declare(strict_types=1);

// Parkleitsystem SDK utility: result_body

class ParkleitsystemResultBody
{
    public static function call(ParkleitsystemContext $ctx): ?ParkleitsystemResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
