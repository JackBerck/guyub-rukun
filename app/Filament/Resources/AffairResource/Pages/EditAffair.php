<?php

namespace App\Filament\Resources\AffairResource\Pages;

use App\Filament\Resources\AffairResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAffair extends EditRecord
{
    protected static string $resource = AffairResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
