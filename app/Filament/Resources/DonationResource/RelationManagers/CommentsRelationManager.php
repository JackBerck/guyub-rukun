<?php

namespace App\Filament\Resources\DonationResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CommentsRelationManager extends RelationManager
{
    protected static string $relationship = 'comments';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('User Email')
                    ->relationship('user', 'email')
                    ->searchable()
                    ->preload()
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Textarea::make('body')
                    ->label('Comment Body')
                    ->required()
                    ->columnSpanFull()
                    ->maxLength(255)
                    ->label('Comment'),
                Forms\Components\FileUpload::make('image')
                    ->directory("comment-images")
                    ->label('Image')
                    ->columnSpanFull()
                    ->imageEditor(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('user.email')->label('User Email'),
                Tables\Columns\TextColumn::make('user.name')->label('User'),
                Tables\Columns\TextColumn::make('body')->label('Comment Body'),
                Tables\Columns\ImageColumn::make('image'),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->modifyQueryUsing(fn(Builder $query) => $query->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]))
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

}
