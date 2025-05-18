<?php

namespace App\Filament\Resources\AffairCategoryResource\Pages;

use App\Filament\Resources\AffairCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAffairCategory extends EditRecord
{
    protected static string $resource = AffairCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
