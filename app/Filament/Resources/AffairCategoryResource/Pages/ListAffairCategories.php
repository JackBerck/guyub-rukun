<?php

namespace App\Filament\Resources\AffairCategoryResource\Pages;

use App\Filament\Resources\AffairCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAffairCategories extends ListRecords
{
    protected static string $resource = AffairCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
