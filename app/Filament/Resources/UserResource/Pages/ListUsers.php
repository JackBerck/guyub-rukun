<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'user' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => $query->whereHas('roles', function ($q) {
                    $q->where('name', 'user');
                })),
            'admin' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => $query->whereHas('roles', function ($q) {
                    $q->where('name', 'admin');
                })),
        ];
    }

}
