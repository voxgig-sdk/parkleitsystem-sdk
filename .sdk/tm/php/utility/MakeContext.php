<?php
declare(strict_types=1);

// Parkleitsystem SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ParkleitsystemMakeContext
{
    public static function call(array $ctxmap, ?ParkleitsystemContext $basectx): ParkleitsystemContext
    {
        return new ParkleitsystemContext($ctxmap, $basectx);
    }
}
