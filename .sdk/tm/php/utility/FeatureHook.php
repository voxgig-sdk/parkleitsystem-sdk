<?php
declare(strict_types=1);

// Parkleitsystem SDK utility: feature_hook

class ParkleitsystemFeatureHook
{
    public static function call(ParkleitsystemContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
