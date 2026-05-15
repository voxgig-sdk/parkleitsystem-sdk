<?php
declare(strict_types=1);

// Parkleitsystem SDK utility: feature_add

class ParkleitsystemFeatureAdd
{
    public static function call(ParkleitsystemContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
