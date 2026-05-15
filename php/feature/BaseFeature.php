<?php
declare(strict_types=1);

// Parkleitsystem SDK base feature

class ParkleitsystemBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ParkleitsystemContext $ctx, array $options): void {}
    public function PostConstruct(ParkleitsystemContext $ctx): void {}
    public function PostConstructEntity(ParkleitsystemContext $ctx): void {}
    public function SetData(ParkleitsystemContext $ctx): void {}
    public function GetData(ParkleitsystemContext $ctx): void {}
    public function GetMatch(ParkleitsystemContext $ctx): void {}
    public function SetMatch(ParkleitsystemContext $ctx): void {}
    public function PrePoint(ParkleitsystemContext $ctx): void {}
    public function PreSpec(ParkleitsystemContext $ctx): void {}
    public function PreRequest(ParkleitsystemContext $ctx): void {}
    public function PreResponse(ParkleitsystemContext $ctx): void {}
    public function PreResult(ParkleitsystemContext $ctx): void {}
    public function PreDone(ParkleitsystemContext $ctx): void {}
    public function PreUnexpected(ParkleitsystemContext $ctx): void {}
}
