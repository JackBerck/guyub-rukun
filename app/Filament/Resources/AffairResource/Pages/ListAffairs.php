<?php

namespace App\Filament\Resources\AffairResource\Pages;

use App\Filament\Resources\AffairResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAffairs extends ListRecords
{
    protected static string $resource = AffairResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
