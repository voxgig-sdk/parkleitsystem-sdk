<?php
declare(strict_types=1);

// Parkleitsystem SDK utility: prepare_body

class ParkleitsystemPrepareBody
{
    public static function call(ParkleitsystemContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
